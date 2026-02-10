"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ButtonGoogle from "../ui/ButtonGoogle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/lib/auth/AuthService";
import { firstValueFrom } from "rxjs";

// 1. Definimos el esquema de validación (Reglas)
const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 letras"),
  email: z.email({ message: "Por favor ingresa un correo electrónico válido" }),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  isProgrammer: z.boolean(),
});

// Inferimos el tipo de datos automáticamente
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");

  // 2. Inicializamos el hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // 3. Esta función SOLO se ejecuta si la validación de Zod es correcta
  const onSubmit = async (data: RegisterFormData) => {
    setError(""); // Limpiar errores previos

    try {
      const user = await firstValueFrom(
        registerUser(
          {
            email: data.email,
            name: data.nombre,
            password: data.password,
          },
          data.isProgrammer,
        ),
      );

      router.push("/dashboard/profile");
      // Aquí podrías redirigir: router.push('/dashboard')
    } catch (erro) {
      const error = erro as Error;
      console.error("Error capturado:", error);

      // Tu lógica original de errores
      if (error.message === "auth/email-already-in-use") {
        setError("Este correo ya está registrado. ¿Quieres iniciar sesión?");
      } else if (error.message === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Ocurrió un error al registrarse. Intenta de nuevo.");
      }
    }
  };

  return (
    <section className="from-secondary via-alt to-primary flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-to-r px-4 py-8 font-sans">
      <div className="bg-secondary border-accent/20 flex w-full max-w-md flex-col gap-y-4 rounded-2xl border p-6 shadow-xl md:gap-y-5 md:p-10">
        <h1 className="text-foreground text-center text-2xl font-bold md:text-3xl">
          Registrarse
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 md:gap-y-5"
        >
          {/* Input Nombre (Nuevo, para los datos de Firestore) */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="nombre"
              className="text-foreground text-sm font-semibold md:text-base"
            >
              Nombre:
            </label>
            <input
              id="nombre"
              type="text"
              {...register("nombre")}
              placeholder="Tu nombre"
              className={`bg-primary text-foreground placeholder-accent/40 font-roboto-mono focus:border-accent focus:ring-accent/30 rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 focus:outline-none md:px-4 md:py-3 ${
                errors.nombre ? "border-error" : "border-resalt"
              }`}
            />
            {errors.nombre && (
              <span className="text-error text-xs font-medium md:text-sm">
                {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Input Email */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="email"
              className="text-foreground text-sm font-semibold md:text-base"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="ejemplo@ejem.com"
              className={`bg-primary text-foreground placeholder-accent/40 font-roboto-mono focus:border-accent focus:ring-accent/30 rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 focus:outline-none md:px-4 md:py-3 ${
                errors.email ? "border-error" : "border-resalt"
              }`}
            />
            {errors.email && (
              <span className="text-error text-xs font-medium md:text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="password"
              className="text-foreground text-sm font-semibold md:text-base"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`bg-primary text-foreground placeholder-accent/40 focus:border-accent focus:ring-accent/30 rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 focus:outline-none md:px-4 md:py-3 ${
                errors.password ? "border-error" : "border-resalt"
              }`}
            />
            {errors.password && (
              <span className="text-error text-xs font-medium md:text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Checkbox para Programador */}
          <div className="flex items-center gap-x-2">
            <input
              id="isProgrammer"
              type="checkbox"
              {...register("isProgrammer")}
              className="bg-primary border-resalt focus:ring-accent/30 h-4 w-4 cursor-pointer rounded border-2 transition-all focus:ring-2 focus:outline-none"
            />
            <label
              htmlFor="isProgrammer"
              className="text-foreground cursor-pointer text-sm font-medium md:text-base"
            >
              Quiero ser programador
            </label>
          </div>

          {/* Errores Globales (Firebase) */}
          <div>
            {error && (
              <p className="font-roboto-mono text-error bg-error/10 border-error/30 rounded-lg border p-3 text-xs font-bold md:text-sm">
                {error}
              </p>
            )}
          </div>

          {/* Botones */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt mt-2 w-full rounded-lg px-4 py-3 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
          >
            {isSubmitting ? "Registrando..." : "Registrarte"}
          </button>

          <ButtonGoogle />
          <div className="text-foreground mt-2 text-center text-xs md:text-sm">
            <span>¿Tienes cuenta? </span>
            <Link
              href="/auth/login"
              className="text-accent hover:text-resalt font-bold transition-colors hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
