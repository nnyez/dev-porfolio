// components/UserRoleSelect.tsx
"use client";

import { useState, useEffect } from "react";
import { updateUserRole } from "@/app/lib/firebaseRepository";
interface Props {
  userId: string;
  currentRole: string;
}

const ROLES = ["admin", "standard", "programmer"];

export default function RoleSelecter({ userId, currentRole }: Props) {
  const [internalRole, setInternalRole] = useState(currentRole);
  const [updating, setUpdating] = useState(false);

  // Sincronizar si cambia desde fuera
  useEffect(() => {
    setInternalRole(currentRole);
  }, [currentRole]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    const oldRole = internalRole;

    // 1. UI Optimista (Cambio visual inmediato)
    setInternalRole(newRole);
    setUpdating(true);

    // 2. Llamada Reactiva con Observables
    // Guardamos la suscripción por si necesitamos cancelarla (aunque update suele ser rápido)
    const subscription = updateUserRole(userId, newRole).subscribe({
      next: (result) => {
        // RxJS emite el resultado aquí
        setUpdating(false);

        if (result.success) {
          console.log("✅ Actualización exitosa vía Observable");
          // Aquí podrías lanzar un toast.success("Rol actualizado")
        } else {
          // Si falló, revertimos
          console.error("❌ Fallo:", result.message);
          setInternalRole(oldRole);
          alert(`Error: ${result.message}`);
        }
      },
      // Como usamos catchError en el servicio, el error "fatal" raramente llegará aquí,
      // llegará como success: false en 'next', pero es buena práctica tenerlo.
      error: (err) => {
        setUpdating(false);
        setInternalRole(oldRole);
        console.error("Error crítico:", err);
      },
    });
  };

  return (
    <div className="relative">
      <select
        value={internalRole}
        onChange={handleChange}
        disabled={updating}
        className={`block w-full rounded-lg border border-accent/30 bg-primary text-foreground px-4 py-2 text-sm font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all ${
          updating ? "cursor-wait opacity-60" : ""
        }`}
      >
        {ROLES.map((role) => (
          <option key={role} value={role} className="bg-secondary">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
      {updating && (
        <span className="absolute top-3 right-3 h-2 w-2 animate-pulse rounded-full bg-accent" />
      )}
    </div>
  );
}
