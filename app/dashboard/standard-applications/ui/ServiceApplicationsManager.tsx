"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit2, X } from 'lucide-react';

// --- TIPOS ---
export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "completed"
  | "cancelled";

export interface ServiceApplication {
  id: string;
  clientUid: string;
  clientName: string;
  status: ApplicationStatus;
  subject: string;
  scheduledDate: number; // Timestamp
}

export default function ServiceApplicationsManager() {
  // Datos iniciales de prueba
  const [applications, setApplications] = useState<ServiceApplication[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Formulario simplificado
  const [formData, setFormData] = useState({
    subject: "",
    clientName: "",
    date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    status: "pending" as ApplicationStatus,
  });

  // Abrir modal (Crear o Editar)
  const openModal = (app?: ServiceApplication) => {
    if (app) {
      setEditingId(app.id);
      setFormData({
        subject: app.subject,
        clientName: app.clientName,
        date: new Date(app.scheduledDate).toISOString().split("T")[0],
        status: app.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        subject: "",
        clientName: "",
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  // Guardar datos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ServiceApplication = {
      id: editingId || crypto.randomUUID(),
      clientUid: "temp-uid",
      clientName: formData.clientName,
      subject: formData.subject,
      status: formData.status,
      scheduledDate: new Date(formData.date).getTime(),
    };

    if (editingId) {
      setApplications((prev) =>
        prev.map((a) => (a.id === editingId ? payload : a)),
      );
    } else {
      setApplications((prev) => [payload, ...prev]);
    }
    setIsModalOpen(false);
  };

  // Eliminar
  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar solicitud?")) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Renderizar etiqueta de estado
  const getStatusStyle = (status: ApplicationStatus) => {
    const map = {
      pending: "bg-accent/20 text-accent border border-accent/40",
      accepted: "bg-green-500/20 text-green-400 border border-green-500/40",
      rejected: "bg-red-500/20 text-red-400 border border-red-500/40",
      completed: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      cancelled: "bg-accent/10 text-accent/60 border border-accent/20",
    };
    return map[status] || "bg-accent/20";
  };

  return (
    <div className="w-full bg-secondary border border-accent/20 rounded-2xl shadow-lg overflow-hidden">
      {/* Cabecera */}
      <div className="flex justify-between items-center p-6 border-b border-accent/20 bg-primary/50">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Solicitudes</h2>
          <p className="text-accent/80 mt-1">Gestiona tus solicitudes de servicio</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-accent text-secondary px-4 py-2 rounded-lg hover:bg-resalt transition-all duration-200"
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
              <th className="p-4">Cliente</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/10">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-primary/50 transition-colors">
                <td className="p-4 font-medium text-foreground">{app.subject}</td>
                <td className="p-4 text-accent/90">{app.clientName}</td>
                <td className="p-4 text-accent/80">{new Date(app.scheduledDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openModal(app)} className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(app.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-accent/50">Sin solicitudes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-foreground">{editingId ? "Editar" : "Nueva"} Solicitud</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-accent/60 hover:text-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Asunto</label>
                <input
                  required
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Ej: Consultoría Técnica"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Cliente</label>
                <input
                  required
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Fecha</label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Estado</label>
                  <select
                    className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicationStatus })}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="accepted">Aceptada</option>
                    <option value="rejected">Rechazada</option>
                    <option value="completed">Completada</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-accent text-secondary font-semibold py-3 rounded-lg hover:bg-resalt transition-all mt-4">
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
