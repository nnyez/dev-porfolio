import RoleGuard from "../auth/guards/RoleWard";
import NavbarDashboard from "./ui/NavbarDashboard";


export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans w-full">
      <NavbarDashboard />
      <RoleGuard allowedRoles={["standard", "admin", "programmer"]}>
        {children}
      </RoleGuard>
    </main>
  );
}
