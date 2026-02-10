"use client";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import NavlinkDashboard from "./NavlinkDashboard";
import { Role } from "@/app/lib/schema/types";

export default function NavbarDashboard() {
  const { user } = useAuth();
  return (
    <nav className="border-b border-accent/20 flex flex-col md:flex-row w-full justify-start px-4 sm:px-6 md:px-8 py-4 md:py-6 gap-4 md:gap-8 bg-secondary overflow-x-auto">
      {user?.rol === Role.ADMIN ? (
        <NavlinkDashboard href="/dashboard/users" text="Usuarios" />
      ) : null}
      {user?.rol === Role.ADMIN || user?.rol === Role.PROGRAMMER ? (
        <NavlinkDashboard href="/dashboard/projects" text="Proyectos" />
      ) : null}
      {user?.rol === Role.ADMIN || user?.rol === Role.PROGRAMMER || user?.rol === Role.STANDARD ? (
        <NavlinkDashboard href="/dashboard/profile" text="Perfil" />
      ) : null}
      {user?.rol === Role.ADMIN || user?.rol === Role.STANDARD  || user?.rol === Role.PROGRAMMER ? (
        <NavlinkDashboard
          href="/dashboard/standard-applications"
          text="Solicitudes"
        />
      ) : null}
    </nav>
  );
}
