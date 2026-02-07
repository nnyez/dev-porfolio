"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ButtonGoogle from "../ui/ButtonGoogle";
import Link from "next/link"; // Para navegar al registro si no tiene cuenta
import { useRouter } from "next/navigation"; // Para redirigir al éxito
import { loginEmailUser } from "@/app/lib/firebaseAuth";

// 1. Esquema simplificado (Solo Email y Password)
const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo válido" }),
  password: z.string().min(1, "Ingresa tu contraseña"), // En login no validamos longitud mínima estricta para no dar pistas, pero debe haber algo
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [firebaseError, setFirebaseError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFirebaseError("");

    try {
      await loginEmailUser(data.email, data.password);

      console.log("¡Login exitoso!");
      // Redirección al dashboard o home
      router.push("/dashboard/profile");
    } catch (erro) {
      const error = erro as Error; // 'any' para acceder a .message o .message fácilmente
      console.error("Error login:", error);

      // Manejo de errores específicos de Login
      if (
        error.message === "auth/user-not-found" ||
        error.message === "auth/wrong-password" ||
        error.message === "auth/invalid-credential" // Firebase moderno unifica estos errores por seguridad
      ) {
        setFirebaseError("Correo o contraseña incorrectos.");
      } else if (error.message === "auth/too-many-requests") {
        setFirebaseError("Demasiados intentos fallidos. Intenta más tarde.");
      } else {
        setFirebaseError("Error al iniciar sesión. Intenta nuevamente.");
      }
    }
  };

  return (
    <section className="flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-to-r from-secondary via-alt to-primary font-sans px-4 py-8">
      <div className="bg-secondary border border-accent/20 flex w-full max-w-md flex-col gap-y-4 md:gap-y-5 rounded-2xl p-6 md:p-10 shadow-xl">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-foreground">Iniciar Sesión</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 md:gap-y-5"
        >
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

          {/* Errores Globales */}
          <div>
            {firebaseError && (
              <p className="font-roboto-mono text-center text-xs md:text-sm font-bold text-error bg-error/10 p-3 rounded-lg border border-error/30">
                {firebaseError}
              </p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt rounded-lg px-4 py-3 text-base md:text-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <ButtonGoogle isRegister={false} />

          {/* Link para ir a Registro */}
          <div className="mt-2 text-center text-xs md:text-sm text-foreground">
            <span>¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-accent font-bold hover:text-resalt hover:underline transition-colors"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
