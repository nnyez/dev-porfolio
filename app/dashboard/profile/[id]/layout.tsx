import RoleGuard from "@/app/auth/guards/RoleWard";
import { Role } from "@/app/lib/schema/types";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RoleGuard allowedRoles={[Role.ADMIN]}>
        {children}
      </RoleGuard>
    </>
  );
}
