import RoleGuard from "@/app/auth/guards/RoleWard";
import { Role } from "@/app/lib/schema/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Proyectos - ProyectApp",
  description: "Gestiona y administra tus proyectos en ProyectApp",
  robots: { index: false }, // No indexar páginas autenticadas
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-w-full">
      <RoleGuard allowedRoles={[Role.ADMIN, Role.PROGRAMMER]}>{children}</RoleGuard>
    </section>
  );
}
