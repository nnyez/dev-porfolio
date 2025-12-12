"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Definimos los roles posibles
type AllowedRoles = "admin" | "programmer" | "standard";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AllowedRoles[]; // Array de roles permitidos
  src?: string; // Ruta opcional para redireccionar en caso de no tener permiso
}

export default function RoleGuard({
  children,
  allowedRoles,
  src,
}: RoleGuardProps) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Si sigue cargando, no hacemos nada aún
    if (loading) return;

    // 2. Si no está logueado, mandar al Login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // 3. Si está logueado pero NO tiene el rol correcto
    // (userData puede ser null momentáneamente, protegemos con '?')
    if (userData && !allowedRoles.includes(userData.role)) {
      console.warn(
        `Acceso denegado. Rol usuario: ${userData.role}, Requerido: ${allowedRoles}`,
      );
      router.push(src ?? "/"); // Redirigir a la ruta especificada o al dashboard
    }
  }, [user, userData, loading, allowedRoles, router, src]);

  // Mientras carga o verificamos permisos, mostramos un spinner o nada
  if (loading || !userData || !allowedRoles.includes(userData.role)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Verificando permisos...</p>
      </div>
    );
  }

  // Si pasó todas las pruebas, mostramos la página
  return <>{children}</>;
}
