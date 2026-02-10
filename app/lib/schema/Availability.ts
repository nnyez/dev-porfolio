/**
 * DTOs para operaciones de Disponibilidad de Usuarios
 */

export interface TimeSlot {
  start: string;  // formato HH:mm
  end: string;    // formato HH:mm
}

/**
 * DTO para enviar disponibilidad de un día
 */
export interface DayAvailability {
  day: string;                    // "monday" | "tuesday" | ... | "sunday"
  slots: TimeSlot;
}

/**
 * DTO para crear/actualizar disponibilidad
 */
export interface CreateAvailabilityDto {
  weeklySchedule: DayAvailability[];
}

/**
 * DTO para respuesta de disponibilidad de un día
 */
export interface DayAvailabilityResponse {
  id: number;
  day: string;
  slots: TimeSlot;
}

/**
 * DTO de respuesta para la disponibilidad completa de un usuario
 */
export interface AvailabilityResponseDto {
  uid: number;
  weeklySchedule: DayAvailabilityResponse[];
}
