"use client";
import RoleGuard from "@/app/auth/guards/RoleWard";
import { getAllUsers } from "@/app/lib/firebaseRepository";
import { AppUser } from "@/app/lib/types";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RoleSelecter from "../ui/RoleSelecter";
import { useAuth } from "@/app/context/AuthContext";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Link from "next/link";
export default function Users() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const subscription = getAllUsers(user?.uid || "").subscribe({
      next: (data) => setUsers(data),
      error: (err) => console.error("Error fetching users:", err),
    });
    return () => subscription.unsubscribe();
  }, [user?.uid]);
  return (
    <RoleGuard allowedRoles={["admin"]} src="/dashboard/profile">
      <div className="flex flex-col w-full py-10 px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-accent/80 mt-2">Administra los roles y permisos de los usuarios</p>
        </div>

        <div className="bg-secondary border border-accent/20 rounded-2xl overflow-hidden shadow-lg">
          {users.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-accent/60 text-lg">No hay usuarios registrados</p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 border-b border-accent/20 bg-primary/50 flex items-center gap-4">
                <PersonSearchIcon className="text-accent text-2xl!" />
                <span className="text-sm font-semibold text-foreground">Total de usuarios: {users.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-accent/20">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-accent">Nombre</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-accent">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-accent">Rol</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-accent">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.uid} className="border-b border-accent/10 hover:bg-primary/50 transition-colors">
                        <td className="px-6 py-4 text-foreground font-medium">{user.displayName}</td>
                        <td className="px-6 py-4 text-accent/80 text-sm">{user.email}</td>
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
