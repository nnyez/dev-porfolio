"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import ButtonGoogle from "../ui/ButtonGoogle";
import Link from "next/link"; // Para navegar al registro si no tiene cuenta
import { useRouter } from "next/navigation"; // Para redirigir al éxito
import { loginUser } from "@/app/lib/auth/AuthService";
import { firstValueFrom } from "rxjs";

// 1. Esquema simplificado (Solo Email y Password)
const loginSchema = z.object({
  email: z.email({ message: "Ingresa un correo válido" }),
  password: z.string().min(1, "Ingresa tu contraseña"), // En login no validamos longitud mínima estricta para no dar pistas, pero debe haber algo
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const user = await firstValueFrom(
        loginUser({ email: data.email, password: data.password })
      );

      router.push("/dashboard/profile");
    } catch (erro) {
      const error = erro as Error;
      console.error("Error login:", error);

      if (
        error.message === "auth/user-not-found" ||
        error.message === "auth/wrong-password" ||
        error.message === "auth/invalid-credential"
      ) {
        setError("Correo o contraseña incorrectos.");
      } else if (error.message === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Intenta más tarde.");
      } else {
        setError(error.message || "Error al iniciar sesión. Intenta nuevamente.");
      }
    }
  };

  return (
    <section className="from-secondary via-alt to-primary flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-to-r px-4 py-8 font-sans">
      <div className="bg-secondary border-accent/20 flex w-full max-w-md flex-col gap-y-4 rounded-2xl border p-6 shadow-xl md:gap-y-5 md:p-10">
        <h1 className="text-foreground text-center text-2xl font-bold md:text-3xl">
          Iniciar Sesión
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 md:gap-y-5"
        >
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

          {/* Errores Globales */}
          <div>
            {error && (
              <p className="font-roboto-mono text-error bg-error/10 border-error/30 rounded-lg border p-3 text-center text-xs font-bold md:text-sm">
                {error}
              </p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt mt-2 w-full rounded-lg px-4 py-3 text-base font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <ButtonGoogle isRegister={false} />

          {/* Link para ir a Registro */}
          <div className="text-foreground mt-2 text-center text-xs md:text-sm">
            <span>¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-accent hover:text-resalt font-bold transition-colors hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
