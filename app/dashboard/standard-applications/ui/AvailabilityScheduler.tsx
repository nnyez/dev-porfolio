"use client";

"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SaveIcon from "@mui/icons-material/Save";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import {
  createOrUpdateAvailability,
  getAvailability,
} from "@/app/lib/availability/AvailabilityRepository";
import {
  CreateAvailabilityDto,
  DayAvailability,
  AvailabilityResponseDto,
} from "@/app/lib/schema/Availability";

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

export default function AvailabilityScheduler({
  onlyView = false,
}: {
  onlyView?: boolean;
}) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: DAYS_CONFIG.map((d) => ({
        day: d.key,
        enabled: !["saturday", "sunday"].includes(d.key),
        slots: { start: "09:00", end: "17:00" },
      })),
    },
  });

  // Cargar disponibilidad existente cuando el componente se monta
  useEffect(() => {
    if (!user?.userId) return;
    
    setIsLoading(true);
    const subscription = getAvailability(user.userId).subscribe({
      next: (data: AvailabilityResponseDto) => {
        console.log("✅ Disponibilidad cargada:", data);
        
        // Transformar response a formato del formulario
        const formattedSchedule = DAYS_CONFIG.map((dayConfig) => {
          const existingDay = data.weeklySchedule.find(
            (d) => d.day === dayConfig.key
          );
          
          return {
            day: dayConfig.key,
            enabled: !!existingDay,
            slots: existingDay?.slots || { start: "09:00", end: "17:00" },
          };
        });
        
        reset({ schedule: formattedSchedule });
        setIsLoading(false);
      },
      error: (err) => {
        console.log("ℹ️ No hay disponibilidad guardada aún:", err);
        setIsLoading(false);
        // No mostrar error si no existe disponibilidad, es normal en primera creación
      },
    });
    
    return () => subscription.unsubscribe();
  }, [user?.userId, reset]);

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
    setError("");

    if (!user?.userId) {
      setError("Usuario no autenticado");
      return;
    }

    // Transformar datos de UI a formato de API
    const payload: CreateAvailabilityDto = {
      weeklySchedule: data.schedule
        .filter((day) => day.enabled) // Solo enviamos días habilitados
        .map((day) => ({
          day: day.day,
          slots: {
            start: day.slots.start,
            end: day.slots.end,
          },
        })) as DayAvailability[],
    };

    console.log("📅 Enviando disponibilidad:", payload);

    const subscription = createOrUpdateAvailability(user.userId, payload).subscribe({
      next: (response) => {
        console.log("✅ Disponibilidad guardada:", response);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      },
      error: (err) => {
        console.error("❌ Error al guardar disponibilidad:", err);
        setError(err?.message || "Error al guardar la disponibilidad");
      },
    });

    return () => subscription.unsubscribe();
  };

  return (
    <section className="bg-secondary border-accent/20 w-full overflow-hidden rounded-2xl border shadow-lg">
      <div className="border-accent/20 bg-primary/50 border-b p-6">
        <div>
          <h1 className="text-foreground flex items-center gap-3 text-2xl font-bold">
            <AccessTimeIcon className="text-accent text-2xl!" />
            Calendario de Disponibilidad
          </h1>
          <p className="text-accent/80 mt-2">
            Configura tus franjas horarias semanales.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
        {isLoading && (
          <div className="bg-accent/10 border-accent/30 text-accent rounded-lg border p-4 text-center">
            Cargando disponibilidad...
          </div>
        )}

        {error && (
          <div className="bg-error/10 border-error/30 text-error rounded-lg border p-4">
            {error}
          </div>
        )}
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
                    <div className="peer bg-accent/30 peer-checked:bg-accent peer-focus:ring-accent/30 after:border-accent/40 after:bg-primary peer-checked:after:border-accent peer-checked:after:bg-secondary h-6 w-11 rounded-full peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                  </label>
                  <span
                    className={`pr-5 font-semibold capitalize ${
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
                      <span className="text-accent text-xs font-semibold uppercase">
                        Desde
                      </span>
                      <input
                        type="time"
                        className={`bg-primary text-base text-foreground focus:ring-accent/30 rounded-lg border-2 px-3 py-2 transition-all focus:ring-2 focus:outline-none ${
                          itemErrors?.slots?.start
                            ? "border-error/60"
                            : "border-resalt"
                        }`}
                        {...register(`schedule.${index}.slots.start`)}
                      />
                    </div>

                    <span className="text-accent/30 hidden sm:block">|</span>

                    <div className="flex items-center gap-2">
                      <span className="text-accent text-xs font-semibold uppercase">
                        Hasta
                      </span>
                      <input
                        type="time"
                        className={`bg-primary text-base text-foreground focus:ring-accent/30 rounded-lg border-2 px-3 py-2 transition-all focus:ring-2 focus:outline-none ${
                          itemErrors?.slots?.end
                            ? "border-error/60"
                            : "border-resalt"
                        }`}
                        {...register(`schedule.${index}.slots.end`)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-accent/40 flex-1 text-sm italic">
                    No disponible
                  </div>
                )}
              </div>

              {/* Mensaje de Error */}
              {isEnabled && timeError && (
                <div className="mt-2 ml-1 flex animate-pulse items-center gap-1 text-xs text-error font-medium">
                  <ErrorIcon className="h-3 w-3" />
                  {timeError}
                </div>
              )}
            </div>
          );
        })}

        {!onlyView ? (
          <div className="border-accent/20 mt-8 flex justify-end border-t pt-6">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`text-secondary flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                isSubmitting || isLoading
                  ? "bg-accent/60 cursor-not-allowed"
                  : saveSuccess
                    ? "bg-green-600/80 hover:bg-green-700"
                    : "bg-accent hover:bg-resalt shadow-lg"
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
        ) : null}
      </form>
    </section>
  );
}
