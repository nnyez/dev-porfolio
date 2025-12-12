/**
 * ARCHIVO: types.ts
 * * Estructura de datos optimizada para Firestore y Next.js.
 * NOTA: Las fechas se manejan como 'number' (timestamps) para evitar 
 * errores de "Non-serializable data" en componentes de cliente de Next.js.
 */

// ==========================================
// 1. ENUMS Y TIPOS AUXILIARES
// ==========================================

export type UserRole = 'standard' | 'programmer' | 'admin';

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed';

// ==========================================
// 2. USUARIOS (Discriminated Unions)
// ==========================================

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

// Programador (quien ofrece servicios)
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


// ==========================================
// 3. PROYECTOS (Subcolección)
// ==========================================
// Ruta en Firestore: users/{programmerUid}/projects/{projectId}

export interface Project {
  id: string;
  ownerUid: string; // ID del programador
  name: string;
  description: string;
  projectUrl?: string;
  imageUrl?: string;
  technologiesUsed?: string[];
  
}


// ==========================================
// 4. DISPONIBILIDAD (Configuración)
// ==========================================
// Ruta sugerida: users/{programmerUid}/settings/availability

export interface TimeSlotConfig {
  start: string; // Formato "HH:mm" ej: "09:00"
  end: string;   // Formato "HH:mm" ej: "12:00"
}

export interface DayAvailability {
  day: string;
  slots: TimeSlotConfig;
}

export interface UserAvailabilityConfig {
  uid: string;
  // timezone: string; // Ej: "America/Guayaquil"
  weeklySchedule: DayAvailability[];
}


// ==========================================
// 5. SOLICITUDES Y CITAS (Transacciones)
// ==========================================
// Ruta sugerida: coleccion raiz "applications" o "appointments"

export interface ServiceApplication {
  id: string;
  
  // Relación
  clientUid: string;      // Quien pide
  programmerUid: string;  // Quien recibe
  
  // Estado
  status: ApplicationStatus;
  
  // Detalles de la solicitud
  subject: string;        // Título breve
  description: string;    // Detalle de lo que necesita
  budget?: string;        // Opcional
  
  // Agendamiento propuesto
  scheduledDate: number;  // Timestamp de la fecha
  durationMinutes: number; // Ej: 60
  startTime: number;      // Timestamp exacto de inicio
  endTime: number;        // Timestamp exacto de fin
  
  // Metadatos
  
  
  
  // Respuesta (si aplica)
  meetingLink?: string;   // Google Meet / Zoom
  rejectionReason?: string;

}