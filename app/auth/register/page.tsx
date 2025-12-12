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
    <section className="from-secondary via-alt to-primary flex min-h-screen min-w-full flex-col items-center justify-center bg-linear-45 font-sans">
      <div className="bg-secondary shadow-alt flex min-w-1/4 flex-col gap-y-5 rounded-2xl p-10 shadow-lg">
        <h1 className="text-center font-bold">Register</h1>

        <form
          onSubmit={handleSubmit(onSubmit)} // Conectamos el manejador de Hook Form
          className="flex flex-col gap-y-5"
        >
          {/* Input Nombre (Nuevo, para los datos de Firestore) */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              {...register("nombre")} // <-- Así conectamos el input
              placeholder="Tu nombre"
              className={`border-resalt rounded-md border-2 p-2 font-roboto-mono${errors.nombre ? "border-red-500" : ""}`}
            />
            {errors.nombre && (
              <span className="text-sm text-red-500">
                {errors.nombre.message}
              </span>
            )}
          </div>

          {/* Input Email */}
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text" // Puedes usar 'email' pero text está bien con Zod
              {...register("email")}
              placeholder="ejemplo@ejem.com"
              className={`border-resalt font-roboto-mono rounded-md border-2 p-2 ${errors.email ? "border-red-500" : ""}`}
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
              className={`border-resalt rounded-md border-2 p-2 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Errores Globales (Firebase) */}
          <div>
            {firebaseError && (
              <p className="font-roboto-mono font-bold text-red-500">
                {firebaseError}
              </p>
            )}
          </div>

          {/* Botones */}
          {/* NOTA: Tu ButtonEmail debe tener type="submit" internamente o ser un <button type="submit"> */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-secondary hover:bg-resalt rounded-md p-2 disabled:opacity-50"
          >
            {isSubmitting ? "Registrando..." : "Registrarte"}
          </button>

          <ButtonGoogle />
          <div className="mt-2 text-center text-sm">
            <span>¿Tienes cuenta? </span>
            <Link
              href="/auth/login"
              className="text-accent font-bold hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
