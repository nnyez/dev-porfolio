/**
 * DTOs para operaciones de Solicitudes de Servicio
 */

/**
 * Estados posibles de una solicitud
 */
export enum ApplicationStatus {
  PENDING = "PENDING",     // Pendiente de respuesta
  ACCEPTED = "ACCEPTED",   // Aceptada por el programador
  REJECTED = "REJECTED",   // Rechazada por el programador
  COMPLETED = "COMPLETED", // Completada/finalizada
  CANCELLED = "CANCELLED"  // Cancelada por el cliente
}

/**
 * DTO de respuesta de una solicitud de servicio
 */
export interface ApplicationResponseDto {
  id: number;
  
  // Relación
  clientUid: number;
  clientName: string;
  programmerUid: number;
  programmerName: string;
  
  // Estado
  status: ApplicationStatus;
  
  // Detalles de la solicitud
  subject: string;
  description: string;
  budget?: string;
  
  // Agendamiento
  scheduledDate: number;  // timestamp
  durationMinutes: number;
  startTime: number;      // timestamp
  endTime: number;        // timestamp
  
  // Metadatos
  createdAt: number;      // timestamp
  updatedAt: number;      // timestamp
  
  // Respuesta
  meetingLink?: string;
  rejectionReason?: string;
}

/**
 * DTO para crear una nueva solicitud de servicio
 */
export interface CreateApplicationDto {
  programmerUid: number;
  subject: string;
  description: string;
  budget?: string;
  scheduledDate: number;  // timestamp
  durationMinutes: number;
  startTime: number;      // timestamp
  endTime: number;        // timestamp
}

/**
 * DTO para actualizar el estado de una solicitud
 */
export interface UpdateApplicationStatusDto {
  status?: ApplicationStatus;
  meetingLink?: string;
  rejectionReason?: string;
}
