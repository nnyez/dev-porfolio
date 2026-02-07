"use client";
import { useAuth } from "@/app/context/AuthContext";
import NavlinkDashboard from "./NavlinkDashboard";

export default function NavbarDashboard() {
  const { userData } = useAuth();
  return (
    <nav className="border-b border-accent/20 flex flex-col md:flex-row w-full justify-start px-4 sm:px-6 md:px-8 py-4 md:py-6 gap-4 md:gap-8 bg-secondary overflow-x-auto">
      {userData?.role === "admin" ? (
        <NavlinkDashboard href="/dashboard/users" text="Usuarios" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "programmer" ? (
        <NavlinkDashboard href="/dashboard/projects" text="Proyectos" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "programmer" || userData?.role === "standard" ? (
        <NavlinkDashboard href="/dashboard/profile" text="Perfil" />
      ) : null}
      {userData?.role === "admin" || userData?.role === "standard"  || userData?.role === "programmer" ? (
        <NavlinkDashboard
          href="/dashboard/standard-applications"
          text="Solicitudes"
        />
      ) : null}
    </nav>
  );
}
