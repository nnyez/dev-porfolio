/**
 * TIPOS Y INTERFACES PARA FIRESTORE
 * Las fechas se usan como 'number' (timestamps) para evitar
 * errores de "Non-serializable data" en componentes Next.js
 */

// Tipos de usuario en el sistema
export type UserRole = 'standard' | 'programmer' | 'admin';

// Estados posibles de una solicitud
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed';

// ===== USUARIOS =====

/**
 * Estructura unificada de usuario
 * Los campos opcionales dependen del rol:
 * - standard: solo campos base
 * - programmer: title, bio, programmingLanguages, experienceYears
 * - admin: title (opcional)
 */
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: UserRole;
  
  // Campos opcionales por rol (principalmente programadores)
  title?: string;                    // Ej: "Senior Fullstack Dev"
  bio?: string;                      // Descripción profesional
  programmingLanguages?: string[];   // ["JavaScript", "Python", "C#"]
  experienceYears?: number;          // Años de experiencia
}

// Alias para mantener compatibilidad si se usa en componentes
export type UserBase = AppUser;
export type UserStandard = AppUser;
export type UserProgrammer = AppUser;
export type UserAdmin = AppUser;


// ===== PROYECTOS =====

export interface Project {
  id: string;
  ownerUid: string; // ID del programador propietario
  name: string;
  description: string;
  projectUrl?: string;
  imageUrl?: string;
  technologiesUsed?: string[];
}


// ===== DISPONIBILIDAD (Configuración) =====

export interface TimeSlotConfig {
  start: string; // Formato "HH:mm" ej: "09:00"
  end: string;   // Formato "HH:mm" ej: "18:00"
}

export interface DayAvailability {
  day: string;        // Lunes, Martes, etc
  slots: TimeSlotConfig;
}

export interface UserAvailabilityConfig {
  uid: string;
  weeklySchedule: DayAvailability[];
}


// ===== SOLICITUDES Y CITAS =====

export interface ServiceApplication {
  id: string;
  
  // Relación
  clientUid: string;       // Quien pide
  clientName: string;      // Nombre del cliente
  programmerUid: string;   // Quien recibe
  programmerName?: string; // Nombre del programador
  
  // Estado
  status: ApplicationStatus;
  
  // Detalles de la solicitud
  subject: string;         // Título breve
  description: string;     // Detalle de lo que necesita
  budget?: string;         // Opcional
  
  // Agendamiento propuesto
  scheduledDate: number;   // Timestamp de la fecha
  durationMinutes: number; // Ej: 60
  startTime: number;       // Timestamp exacto de inicio
  endTime: number;         // Timestamp exacto de fin
  
  // Metadatos
  createdAt: number;       // Timestamp de creación
  updatedAt: number;       // Timestamp de última actualización
  
  // Respuesta (si aplica)
  meetingLink?: string;    // Google Meet / Zoom
  rejectionReason?: string;
}