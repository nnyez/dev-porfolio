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
    <section className="from-secondary via-alt to-primary flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-45 font-sans">
      <div className="bg-secondary shadow-alt flex min-w-1/4 flex-col gap-y-5 rounded-2xl p-10 shadow-lg">
        <h1 className="text-center font-bold">Iniciar Sesión</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          {/* Input Email */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              {...register("email")}
              placeholder="ejemplo@ejem.com"
              className={`border-resalt font-roboto-mono rounded-md border-2 p-2 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Input Password */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="*******"
              className={`border-resalt rounded-md border-2 p-2 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Errores Globales */}
          <div>
            {firebaseError && (
              <p className="font-roboto-mono text-center text-sm font-bold text-red-500">
                {firebaseError}
              </p>
            )}
          </div>

          {/* Botón Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt rounded-md p-2 font-bold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <ButtonGoogle isRegister={false} />

          {/* Link para ir a Registro */}
          <div className="mt-2 text-center text-sm">
            <span>¿No tienes cuenta? </span>
            <Link
              href="/auth/register"
              className="text-accent font-bold hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
