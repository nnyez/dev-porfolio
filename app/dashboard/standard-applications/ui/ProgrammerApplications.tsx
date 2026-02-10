"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Eye } from "lucide-react";
import {
  getApplicationsByProgrammer,
  updateApplicationStatus,
} from "@/app/lib/applications/ApplicationsRepository";
import {
  ApplicationResponseDto,
  ApplicationStatus,
  UpdateApplicationStatusDto,
} from "@/app/lib/schema/ServiceApplication";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";

export default function ProgrammerApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ApplicationResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<ApplicationResponseDto | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  // Carga solicitudes dirigidas al programador actual
  useEffect(() => {
    if (!user?.userId) return;
    const subscription = getApplicationsByProgrammer(user.userId).subscribe({
      next: (data) => setApplications(data),
      error: (err) => console.error("❌ Error al cargar solicitudes:", err),
    });
    return () => subscription.unsubscribe();
  }, [user?.userId]);

  // Aceptar solicitud
  const handleAccept = async () => {
    if (!selectedApp) return;
    setIsLoading(true);
    try {
      const updateDto: UpdateApplicationStatusDto = {
        status: ApplicationStatus.ACCEPTED,
        meetingLink: meetingLink || undefined,
      };
      
      await updateApplicationStatus(selectedApp.id, updateDto).toPromise();
      
      // TODO: Enviar email de notificación (mover al backend)
      
      setShowAcceptModal(false);
      setMeetingLink("");
      setSelectedApp(null);
    } catch (error) {
      console.error("❌ Error al aceptar solicitud:", error);
      alert("Error al aceptar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  // Rechazar solicitud
  const handleReject = async () => {
    if (!selectedApp) return;
    setIsLoading(true);
    try {
      const updateDto: UpdateApplicationStatusDto = {
        status: ApplicationStatus.REJECTED,
        rejectionReason: rejectReason || undefined,
      };
      
      await updateApplicationStatus(selectedApp.id, updateDto).toPromise();
      
      // TODO: Enviar email de notificación (mover al backend)
      
      setShowRejectModal(false);
      setRejectReason("");
      setSelectedApp(null);
    } catch (error) {
      console.error("❌ Error al rechazar solicitud:", error);
      alert("Error al rechazar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: ApplicationStatus) => {
    const map: Record<ApplicationStatus, string> = {
      [ApplicationStatus.PENDING]: "bg-accent/20 text-accent border border-accent/40",
      [ApplicationStatus.ACCEPTED]: "bg-green-500/20 text-green-400 border border-green-500/40",
      [ApplicationStatus.REJECTED]: "bg-red-500/20 text-red-400 border border-red-500/40",
      [ApplicationStatus.COMPLETED]: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      [ApplicationStatus.CANCELLED]: "bg-accent/10 text-accent/60 border border-accent/20",
    };
    return map[status] || "bg-accent/20";
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    const labels: Record<ApplicationStatus, string> = {
      [ApplicationStatus.PENDING]: "Pendiente",
      [ApplicationStatus.ACCEPTED]: "Aceptada",
      [ApplicationStatus.REJECTED]: "Rechazada",
      [ApplicationStatus.COMPLETED]: "Completada",
      [ApplicationStatus.CANCELLED]: "Cancelada",
    };
    return labels[status] || status;
  };

  const getPendingCount = () => applications.filter((a) => a.status === ApplicationStatus.PENDING).length;

  return (
    <div className="w-full bg-secondary border border-accent/20 rounded-2xl shadow-lg overflow-hidden">
      {/* Cabecera */}
      <div className="p-6 border-b border-accent/20 bg-primary/50">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Solicitudes Recibidas</h2>
          <p className="text-accent/80 mt-1">
            Solicitudes de clientes que desean tus servicios - Aquí puedes aceptarlas o rechazarlas
            {getPendingCount() > 0 && (
              <span className="ml-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                {getPendingCount()} pendiente{getPendingCount() !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="bg-primary/80 border-b border-accent/20 text-accent font-semibold">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Asunto</th>
              <th className="p-4">Fecha</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-accent/10">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-primary/50 transition-colors">
                <td className="p-4 font-medium text-foreground">{app.clientName}</td>
                <td className="p-4 text-accent/90 truncate">{app.subject}</td>
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
                      onClick={() => setSelectedApp(app)}
                      className="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    {app.status === ApplicationStatus.PENDING && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowAcceptModal(true);
                          }}
                          disabled={isLoading}
                          className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
                          title="Aceptar"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setShowRejectModal(true);
                          }}
                          disabled={isLoading}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                          title="Rechazar"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-accent/50">
                  No hay solicitudes aún. ¡Espera a que los clientes te contacten!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles */}
      {selectedApp && !showRejectModal && !showAcceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Detalles de Solicitud</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-accent/60 hover:text-accent transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-accent/60 uppercase">Cliente</label>
                <p className="text-foreground mt-1">{selectedApp.clientName}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent/60 uppercase">Asunto</label>
                <p className="text-foreground mt-1">{selectedApp.subject}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent/60 uppercase">Descripción</label>
                <p className="text-foreground mt-1 bg-primary/30 p-3 rounded-lg">
                  {selectedApp.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Fecha</label>
                  <p className="text-foreground mt-1">
                    {new Date(selectedApp.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Hora</label>
                  <p className="text-foreground mt-1">
                    {new Date(selectedApp.scheduledDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Duración</label>
                  <p className="text-foreground mt-1">{selectedApp.durationMinutes} minutos</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Presupuesto</label>
                  <p className="text-foreground mt-1">{selectedApp.budget || "No especificado"}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-accent/60 uppercase">Estado</label>
                <div className="mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(selectedApp.status)}`}
                  >
                    {getStatusLabel(selectedApp.status)}
                  </span>
                </div>
              </div>

              {selectedApp.status === ApplicationStatus.ACCEPTED && selectedApp.meetingLink && (
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Link de Reunión</label>
                  <a
                    href={selectedApp.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline mt-1 break-all"
                  >
                    {selectedApp.meetingLink}
                  </a>
                </div>
              )}

              {selectedApp.status === ApplicationStatus.REJECTED && selectedApp.rejectionReason && (
                <div>
                  <label className="block text-xs font-semibold text-accent/60 uppercase">Razón de Rechazo</label>
                  <p className="text-foreground mt-1 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                    {selectedApp.rejectionReason}
                  </p>
                </div>
              )}

              {selectedApp.status === ApplicationStatus.PENDING && (
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-accent/20">
                  <button
                    onClick={() => {
                      setShowAcceptModal(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 border border-green-500/40 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    <Check size={16} /> Aceptar
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectModal(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/40 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <X size={16} /> Rechazar
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedApp(null)}
                className="w-full bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors mt-4"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de aceptar */}
      {showAcceptModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Aceptar Solicitud</h3>
              <button
                onClick={() => {
                  setShowAcceptModal(false);
                  setMeetingLink("");
                }}
                disabled={isLoading}
                className="text-accent/60 hover:text-accent transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-accent/80">
                ¿Aceptas la solicitud de <strong>{selectedApp.clientName}</strong> para{" "}
                <strong>{selectedApp.subject}</strong>?
              </p>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Link de Reunión (opcional)
                </label>
                <input
                  type="url"
                  disabled={isLoading}
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Ej: https://meet.google.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-accent/20">
                <button
                  onClick={() => {
                    setShowAcceptModal(false);
                    setMeetingLink("");
                  }}
                  disabled={isLoading}
                  className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 border border-green-500/40 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  <Check size={16} /> {isLoading ? "Aceptando..." : "Aceptar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de rechazar */}
      {showRejectModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-secondary border border-accent/20 w-full max-w-md rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Rechazar Solicitud</h3>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                }}
                disabled={isLoading}
                className="text-accent/60 hover:text-accent transition-colors disabled:opacity-50"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-accent/80">
                ¿Rechazas la solicitud de <strong>{selectedApp.clientName}</strong> para{" "}
                <strong>{selectedApp.subject}</strong>?
              </p>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Razón del Rechazo (opcional)
                </label>
                <textarea
                  disabled={isLoading}
                  className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50 resize-none h-20"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Cuéntale al cliente por qué no puedes aceptar..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-accent/20">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  disabled={isLoading}
                  className="bg-accent/10 text-accent px-4 py-2 rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReject}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/40 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  <X size={16} /> {isLoading ? "Rechazando..." : "Rechazar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
