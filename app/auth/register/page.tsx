"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ButtonGoogle from "../ui/ButtonGoogle";
import { registerEmailUser } from "@/app/lib/firebaseAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 1. Definimos el esquema de validación (Reglas)
const registerSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 letras"),
  email: z.email({ message: "Por favor ingresa un correo electrónico válido" }),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Inferimos el tipo de datos automáticamente
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState("");

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
    setFirebaseError(""); // Limpiar errores previos

    try {
      const userData = {
        nombre: data.nombre,
      };

      await registerEmailUser(data.email, data.password, userData);

      console.log("¡Usuario registrado!");

      router.push("/dashboard/profile");
      // Aquí podrías redirigir: router.push('/dashboard')
    } catch (erro) {
      const error = erro as Error;
      console.log("Error capturado:", error);

      // Tu lógica original de errores
      if (error.message === "auth/email-already-in-use") {
        setFirebaseError(
          "Este correo ya está registrado. ¿Quieres iniciar sesión?",
        );
      } else if (error.message === "auth/weak-password") {
        setFirebaseError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setFirebaseError("Ocurrió un error al registrarse. Intenta de nuevo.");
      }
    }
  };

  return (
    <section className="flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-to-r from-secondary via-alt to-primary font-sans px-4 py-8">
      <div className="bg-secondary border border-accent/20 flex w-full max-w-md flex-col gap-y-4 md:gap-y-5 rounded-2xl p-6 md:p-10 shadow-xl">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-foreground">Registrarse</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 md:gap-y-5"
        >
          {/* Input Nombre (Nuevo, para los datos de Firestore) */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="nombre" className="text-sm md:text-base font-semibold text-foreground">Nombre:</label>
            <input
              id="nombre"
              type="text"
              {...register("nombre")}
              placeholder="Tu nombre"
              className={`rounded-lg border-2 bg-primary px-3 md:px-4 py-2 md:py-3 text-base text-foreground placeholder-accent/40 font-roboto-mono focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all ${
                errors.nombre ? "border-error" : "border-resalt"
              }`}
            />
            {errors.nombre && (
              <span className="text-xs md:text-sm text-error font-medium">
                {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Input Email */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-sm md:text-base font-semibold text-foreground">Email:</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="ejemplo@ejem.com"
              className={`rounded-lg border-2 bg-primary px-3 md:px-4 py-2 md:py-3 text-base text-foreground placeholder-accent/40 font-roboto-mono focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all ${
                errors.email ? "border-error" : "border-resalt"
              }`}
            />
            {errors.email && (
              <span className="text-xs md:text-sm text-error font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-sm md:text-base font-semibold text-foreground">Password:</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`rounded-lg border-2 bg-primary px-3 md:px-4 py-2 md:py-3 text-base text-foreground placeholder-accent/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all ${
                errors.password ? "border-error" : "border-resalt"
              }`}
            />
            {errors.password && (
              <span className="text-xs md:text-sm text-error font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Errores Globales (Firebase) */}
          <div>
            {firebaseError && (
              <p className="font-roboto-mono font-bold text-xs md:text-sm text-error bg-error/10 p-3 rounded-lg border border-error/30">
                {firebaseError}
              </p>
            )}
          </div>

          {/* Botones */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt rounded-lg px-4 py-3 text-base md:text-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
          >
            {isSubmitting ? "Registrando..." : "Registrarte"}
          </button>

          <ButtonGoogle />
          <div className="mt-2 text-center text-xs md:text-sm text-foreground">
            <span>¿Tienes cuenta? </span>
            <Link
              href="/auth/login"
              className="text-accent font-bold hover:text-resalt hover:underline transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
