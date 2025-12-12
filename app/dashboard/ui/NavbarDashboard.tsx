"use client";
import { useAuth } from "@/app/context/AuthContext";
import NavlinkDashboard from "./NavlinkDashboard";

export default function NavbarDashboard() {
  const { userData } = useAuth();
  return (
    <nav className="border-b border-accent/20 flex w-full justify-start px-8 py-6 gap-8 bg-secondary">
      {userData?.role === "admin" ? (
        <NavlinkDashboard href="/dashboard/users" text="Usuarios" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "programmer" ? (
        <NavlinkDashboard href="/dashboard/projects" text="Proyectos" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "programmer" || userData?.role === "standard" ? (
        <NavlinkDashboard href="/dashboard/profile" text="Perfil" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "standard" ? (
        <NavlinkDashboard
          href="/dashboard/standard-applications"
          text="Solicitudes"
        />
      ) : null}
    </nav>
  );
}
