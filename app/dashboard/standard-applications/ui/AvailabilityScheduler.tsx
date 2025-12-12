"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SaveIcon from "@mui/icons-material/Save";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DayAvailability, UserAvailabilityConfig } from "@/app/lib/types";
import { useAuth } from "@/app/context/AuthContext";
import { addSchedule } from "@/app/lib/firebaseRepository";

const DAYS_CONFIG = [
  { key: "monday", label: "Lunes" },
  { key: "tuesday", label: "Martes" },
  { key: "wednesday", label: "Miércoles" },
  { key: "thursday", label: "Jueves" },
  { key: "friday", label: "Viernes" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
] as const;

// 1. Schema para validación del formulario (UI State)
// Incluimos 'enabled' para manejar los checkboxes
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const daySchema = z
  .object({
    day: z.string(),
    enabled: z.boolean(),
    slots: z.object({
      start: z.string().regex(timeRegex, "Hora inválida"),
      end: z.string().regex(timeRegex, "Hora inválida"),
    }),
  })
  .refine(
    (data) => {
      if (!data.enabled) return true;
      return data.slots.start < data.slots.end;
    },
    {
      message: "La hora final debe ser posterior a la inicial",
      path: ["slots", "end"], // El error se marca en el input 'end'
    },
  );

const formSchema = z.object({
  schedule: z.array(daySchema),
});

// Tipo inferido del formulario
type ScheduleFormData = z.infer<typeof formSchema>;

export default function AvailabilityScheduler() {
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: DAYS_CONFIG.map((d) => ({
        day: d.key,
        enabled: !["saturday", "sunday"].includes(d.key), // Fin de semana desactivado por defecto
        slots: { start: "09:00", end: "17:00" },
      })),
    },
  });

  // Usamos useFieldArray para manejar el array de días correctamente
  const { fields } = useFieldArray({
    control,
    name: "schedule",
  });

  // Observamos los valores para renderizado condicional (estilos de disabled)
  // Nota: en formularios grandes, considera optimizar esto, pero para 7 campos está bien.
  const scheduleValues = useWatch({ control, name: "schedule" });

  const onSubmit = async (data: ScheduleFormData) => {
    setSaveSuccess(false);

    // Transformar datos de UI a formato de API
    const apiPayload: UserAvailabilityConfig = {
      uid: user?.uid + "",
      weeklySchedule: data.schedule
        .filter((day) => day.enabled) // Solo enviamos días habilitados
        .map((day: DayAvailability) => ({
          day: day.day,
          slots: {
            start: day.slots.start,
            end: day.slots.end,
          },
        })),
    };

    const subscribe = addSchedule(apiPayload);
    subscribe.subscribe({
      next: (result) => {
        if (result.success) {
          setSaveSuccess(true);
        }
      },
      error: (err) => {
        console.error("Error saving schedule:", err);
      },
    });
  };

  return (
    <section className="w-full bg-secondary border border-accent/20 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-accent/20 bg-primary/50">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-foreground">
            <AccessTimeIcon className="text-accent text-2xl!" />
            Calendario de Disponibilidad
          </h1>
          <p className="mt-2 text-accent/80">
            Configura tus franjas horarias semanales.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        {fields.map((field, index) => {
          const isEnabled = scheduleValues?.[index]?.enabled;
          const label =
            DAYS_CONFIG.find((d) => d.key === field.day)?.label || field.day;

          const itemErrors = errors.schedule?.[index];
          const timeError =
            itemErrors?.slots?.end?.message ||
            itemErrors?.slots?.start?.message;

          return (
            <div
              key={field.id}
              className={`rounded-lg border p-4 transition-all duration-200 ${
                isEnabled
                  ? "border-accent/30 bg-primary/50"
                  : "border-accent/10 bg-primary/30 opacity-60"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Toggle y Nombre del día */}
                <div className="flex w-32 items-center gap-3">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      {...register(`schedule.${index}.enabled`)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-accent/30 peer-checked:bg-accent peer-focus:ring-4 peer-focus:ring-accent/30 peer-focus:outline-none after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-accent/40 after:bg-primary after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-accent peer-checked:after:bg-secondary"></div>
                  </label>
                  <span
                    className={`font-semibold capitalize pr-5 ${
                      isEnabled ? "text-foreground" : "text-accent/40"
                    }`}
                  >
                    {label}
                  </span>
                  <input type="hidden" {...register(`schedule.${index}.day`)} />
                </div>

                {/* Inputs de Tiempo */}
                {isEnabled ? (
                  <div className="flex flex-1 flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent uppercase">
                        Desde
                      </span>
                      <input
                        type="time"
                        className={`rounded-lg border bg-primary px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all ${
                          itemErrors?.slots?.start
                            ? "border-red-500/60"
                            : "border-accent/30"
                        }`}
                        {...register(`schedule.${index}.slots.start`)}
                      />
                    </div>

                    <span className="hidden text-accent/30 sm:block">|</span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-accent uppercase">
                        Hasta
                      </span>
                      <input
                        type="time"
                        className={`rounded-lg border bg-primary px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all ${
                          itemErrors?.slots?.end
                            ? "border-red-500/60"
                            : "border-accent/30"
                        }`}
                        {...register(`schedule.${index}.slots.end`)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 text-sm text-accent/40 italic">
                    No disponible
                  </div>
                )}
              </div>

              {/* Mensaje de Error */}
              {isEnabled && timeError && (
                <div className="mt-2 ml-1 flex animate-pulse items-center gap-1 text-xs text-red-400">
                  <ErrorIcon className="h-3 w-3" />
                  {timeError}
                </div>
              )}
            </div>
          );
        })}

        <div className="flex justify-end border-t border-accent/20 pt-6 mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-secondary transition-all ${
              isSubmitting
                ? "cursor-not-allowed bg-accent/60"
                : saveSuccess
                  ? "bg-green-600/80 hover:bg-green-700"
                  : "bg-accent shadow-lg hover:bg-resalt"
            }`}
          >
            {isSubmitting ? (
              "Guardando..."
            ) : saveSuccess ? (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                ¡Guardado!
              </>
            ) : (
              <>
                <SaveIcon className="h-5 w-5" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
