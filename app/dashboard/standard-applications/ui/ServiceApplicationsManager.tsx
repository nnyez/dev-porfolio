"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import {
  addServiceApplication,
  getApplicationsFromClient,
  updateApplicationStatus,
  deleteServiceApplication,
  getAllUsers,
} from "@/app/lib/firebaseRepository";
import { ServiceApplication, UserProgrammer, AppUser } from "@/app/lib/types";
import { useAuth } from "@/app/context/AuthContext";
import { notifyNewApplication } from "@/app/lib/email-actions";

export default function ServiceApplicationsManager() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ServiceApplication[]>([]);
  const [programmers, setProgrammers] = useState<(AppUser & { label: string })[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    programmerUid: "",
    budget: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    durationMinutes: 60,
  });

  // RxJS Observables: Se suscribe en tiempo real a Firebase
  // Cuando cambia user.uid, carga las solicitudes del cliente actual
  useEffect(() => {
    if (!user?.uid) return;
    const subscription = getApplicationsFromClient(user.uid).subscribe({
      next: (data) => setApplications(data),
      error: (err) => console.error("Error fetching applications:", err),
    });
    return () => subscription.unsubscribe();
  }, [user?.uid]);

  // Obtiene lista de programadores/admins y formatea con su rol
  // Esto alimenta el dropdown para seleccionar a quién enviar la solicitud
  useEffect(() => {
    if (!user?.uid) return;
    const subscription = getAllUsers(user.uid, undefined).subscribe({
      next: (data) => {
        const progList = data
          .filter((u) => u.role === "programmer" || u.role === "admin")
          .map((p) => {
            const roleLabel = p.role === "admin" ? "Administrador" : (p as UserProgrammer).title || "Programador";
            return {
              ...p,
              label: `${p.displayName} (${roleLabel})`,
            };
          });
        setProgrammers(progList);
      },
      error: (err) => console.error("Error fetching programmers:", err),
    });
    return () => subscription.unsubscribe();
  }, [user?.uid]);

  // Abre modal para crear nueva solicitud o editar existente
  // Si recibe app, rellena los campos con datos actuales
  const openModal = (app?: ServiceApplication) => {
    if (app) {
      setEditingId(app.id);
      const date = new Date(app.scheduledDate);
      setFormData({
        subject: app.subject,
        description: app.description,
        programmerUid: app.programmerUid,
        budget: app.budget || "",
        date: date.toISOString().split("T")[0],
        time: `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`,
        durationMinutes: app.durationMinutes,
      });
    } else {
      setEditingId(null);
      setFormData({
        subject: "",
        description: "",
        programmerUid: "",
        budget: "",
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
        durationMinutes: 60,
      });
    }
    setIsModalOpen(true);
  };

  // Procesa el formulario: crea objeto ServiceApplication y lo envía a Firebase
  // Luego envía email de notificación al programador seleccionado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const [year, month, day] = formData.date.split("-");
      const [hours, minutes] = formData.time.split(":");
      const scheduledDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes),
      );

      const startTime = scheduledDate.getTime();
      const endTime = startTime + formData.durationMinutes * 60 * 1000;
      const now = Date.now();

      const payload: ServiceApplication = {
        id: editingId || crypto.randomUUID(),
        clientUid: user.uid,
        clientName: user.displayName || "Cliente",
        programmerUid: formData.programmerUid,
        programmerName: programmers.find((p) => p.uid === formData.programmerUid)
          ?.displayName,
        subject: formData.subject,
        description: formData.description,
        budget: formData.budget || "",
        scheduledDate: scheduledDate.getTime(),
        startTime,
        endTime,
        durationMinutes: formData.durationMinutes,
        status: "pending",
        createdAt: editingId ? applications.find((a) => a.id === editingId)?.createdAt || now : now,
        updatedAt: now,
      };

      if (editingId) {
        await updateApplicationStatus(editingId, payload.status, payload).toPromise();
      } else {
        await addServiceApplication(payload).toPromise();
        
        // IMPORTANTE: Notifica al programador por email cuando recibe nueva solicitud
        // Busca el email en la lista de programadores y envía notificación
        const programmer = programmers.find((p) => p.uid === formData.programmerUid);
        if (programmer?.email) {
          await notifyNewApplication(
            programmer.email,
            user.displayName || "Cliente",
            formData.subject,
            formData.description,
            scheduledDate.getTime()
          );
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error al guardar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar
  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar solicitud?")) return;
    setIsLoading(true);
    try {
      await deleteServiceApplication(id).toPromise();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Error al eliminar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar etiqueta de estado
  const getStatusStyle = (status: string) => {
    const map: Record<string, string> = {
      pending:
        "bg-accent/20 text-accent border border-accent/40",
      accepted:
        "bg-green-500/20 text-green-400 border border-green-500/40",
      rejected:
        "bg-red-500/20 text-red-400 border border-red-500/40",
      completed:
        "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      cancelled:
        "bg-accent/10 text-accent/60 border border-accent/20",
    };
    return map[status] || "bg-accent/20";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Pendiente",
      accepted: "Aceptada",
      rejected: "Rechazada",
      completed: "Completada",
      cancelled: "Cancelada",
    };
    return labels[status] || status;
  };

  return (
    <div className="w-full bg-secondary border border-accent/20 rounded-2xl shadow-lg overflow-hidden">
      {/* Cabecera */}
      <div className="flex justify-between items-center p-6 border-b border-accent/20 bg-primary/50">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mis Solicitudes</h2>
          <p className="text-accent/80 mt-1">
            Solicitudes de servicio que envías a programadores y administradores
          </p>
        </div>
        <button
          onClick={() => openModal()}
          disabled={isLoading}
          className="flex items-center gap-2 bg-accent text-secondary px-4 py-2 rounded-lg hover:bg-resalt transition-all duration-200 disabled:opacity-50"
        >
          <Plus size={18} /> Nueva
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="bg-primary/80 border-b border-accent/20 text-accent font-semibold">
            <tr>
              <th className="p-4">Asunto</th>
              <th className="p-4">Programador</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/10">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-primary/50 transition-colors">
                <td className="p-4 font-medium text-foreground">{app.subject}</td>
                <td className="p-4 text-accent/90">{app.programmerName || "No asignado"}</td>
                <td className="p-4 text-accent/80">
                  {new Date(app.scheduledDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}
                  >
                    {getStatusLabel(app.status)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openModal(app)}
                      disabled={isLoading}
                      className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors disabled:opacity-50"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      disabled={isLoading}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-accent/50">
                  Sin solicitudes. ¡Crea una nueva!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">
                {editingId ? "Editar" : "Nueva"} Solicitud
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="text-accent/60 hover:text-accent transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Asunto *
                </label>
                <input
                  required
                  disabled={isLoading}
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Ej: Desarrollo Frontend"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Descripción *
                </label>
                <textarea
                  required
                  disabled={isLoading}
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50 resize-none h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe lo que necesitas..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Programador *
                </label>
                <select
                  required
                  disabled={isLoading}
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                  value={formData.programmerUid}
                  onChange={(e) =>
                    setFormData({ ...formData, programmerUid: e.target.value })
                  }
                >
                  <option value="">Selecciona un programador</option>
                  {programmers.map((p) => (
                    <option key={p.uid} value={p.uid}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Hora *
                  </label>
                  <input
                    type="time"
                    required
                    disabled={isLoading}
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Duración (minutos)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    disabled={isLoading}
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                    value={formData.durationMinutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        durationMinutes: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Presupuesto (opcional)
                  </label>
                  <input
                    type="text"
                    disabled={isLoading}
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    placeholder="Ej: $500 - $1000"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-secondary font-semibold py-3 rounded-lg hover:bg-resalt transition-all mt-4 disabled:opacity-50"
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
