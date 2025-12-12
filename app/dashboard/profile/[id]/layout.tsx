import RoleGuard from "@/app/auth/guards/RoleWard";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RoleGuard allowedRoles={["admin"]}>
        {children}
      </RoleGuard>
    </>
  );
}
