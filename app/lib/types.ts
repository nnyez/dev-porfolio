/**
 * TIPOS Y INTERFACES PARA FIRESTORE
 * Las fechas se usan como 'number' (timestamps) para evitar
 * errores de "Non-serializable data" en componentes Next.js
 */

// Tipos de usuario en el sistema
export type UserRole = 'standard' | 'programmer' | 'admin';

// Estados posibles de una solicitud
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed';

// ===== USUARIOS (Discriminated Unions) =====

// Base común para todos los usuarios
export interface UserBase {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: UserRole;
}

// Cliente estándar (quien solicita servicios)
export interface UserStandard extends UserBase {
  role: 'standard';
  companyName?: string;
}

// Programador (ofrece servicios de desarrollo)
export interface UserProgrammer extends UserBase {
  role: 'programmer';
  title: string; // Ej: "Senior Fullstack Dev"
  bio?: string;
  programmingLanguages: string[]; // ["JavaScript", "Python"]
  skills: string[]; // ["React", "Firebase", "Scrum"]
  experienceYears: number;
}

// Administrador del sistema
export interface UserAdmin extends UserBase {
  role: 'admin';
  permissions: string[]; // ["manage_users", "view_reports"]
}

// Tipo unificado para usar en la aplicación
export type AppUser = UserStandard | UserProgrammer | UserAdmin;


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
  slots: TimeSlotConfig[];
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