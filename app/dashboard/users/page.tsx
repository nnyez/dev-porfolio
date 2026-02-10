"use client";
import RoleGuard from "@/app/auth/guards/RoleWard";
import { getAllUsers } from "@/app/lib/deprecated/firebase/firebaseRepository";
import { AppUser } from "@/app/lib/config/types";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RoleSelecter from "../ui/RoleSelecter";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Link from "next/link";
import { Role } from "@/app/lib/schema/types";
export default function Users() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const subscription = getAllUsers(user?.userId?.toString() || "").subscribe({
      next: (data) => setUsers(data),
      error: (err) => console.error("Error fetching users:", err),
    });
    return () => subscription.unsubscribe();
  }, [user?.userId]);
  return (
    <RoleGuard allowedRoles={[Role.ADMIN]} src="/dashboard/profile">
      <div className="flex flex-col w-full py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-accent/80 mt-2 text-sm md:text-base">Administra los roles y permisos de los usuarios</p>
        </div>

        <div className="bg-secondary border border-accent/20 rounded-2xl overflow-hidden shadow-lg w-full">
          {users.length === 0 ? (
            <div className="p-6 md:p-12 text-center">
              <p className="text-accent/60 text-base md:text-lg">No hay usuarios registrados</p>
            </div>
          ) : (
            <>
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-accent/20 bg-primary/50 flex items-center gap-3 md:gap-4">
                <PersonSearchIcon className="text-accent text-lg md:text-2xl!" />
                <span className="text-xs md:text-sm font-semibold text-foreground">Total de usuarios: {users.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b border-accent/20">
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-accent">Nombre</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-accent hidden md:table-cell">Email</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-accent">Rol</th>
                      <th className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-accent">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.uid} className="border-b border-accent/10 hover:bg-primary/50 transition-colors">
                        <td className="px-3 md:px-6 py-3 md:py-4 text-foreground font-medium text-xs md:text-base">{user.displayName}</td>
                        <td className="px-3 md:px-6 py-3 md:py-4 text-accent/80 text-xs hidden md:table-cell">{user.email}</td>
                        <RoleRowActions user={user} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}

export function RoleRowActions({ user }: { user: AppUser }) {
  const [isEdditing, setIsEditing] = useState<boolean | null>(null);

  return (
    <>
      <td className="px-6 py-4">
        {isEdditing ? (
          <RoleSelecter userId={user.uid} currentRole={user.role} />
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-accent/20 border border-accent/40 text-accent">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        )}
      </td>
      <td className="px-6 py-4 flex justify-center gap-3">
        <button
          onClick={() => {
            setIsEditing(!isEdditing);
          }}
          className="p-2 rounded-lg bg-accent text-secondary hover:bg-resalt transition-all duration-200 disabled:opacity-60"
          title={isEdditing ? "Guardar" : "Editar"}
        >
          {isEdditing ? <SaveIcon className="text-lg!" /> : <EditIcon className="text-lg!" />}
        </button>
        <button
          className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
          title="Eliminar"
        >
          <DeleteIcon className="text-lg!" />
        </button>
        <Link
          href={`/dashboard/profile/${user.uid}`}
          className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/40 transition-all duration-200"
          title="Ver perfil"
        >
          <PersonSearchIcon className="text-lg!" />
        </Link>
      </td>
    </>
  );
}
