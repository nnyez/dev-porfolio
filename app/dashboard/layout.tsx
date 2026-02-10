import RoleGuard from "../auth/guards/RoleWard";
import { Role } from "../lib/schema/types";
import NavbarDashboard from "./ui/NavbarDashboard";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-primary flex min-h-screen w-full flex-col font-sans">
      <NavbarDashboard />
      <RoleGuard allowedRoles={[Role.STANDARD, Role.ADMIN, Role.PROGRAMMER]}>
        {children}
      </RoleGuard>
    </main>
  );
}
