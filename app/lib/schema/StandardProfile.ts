import { UserAuth } from "./UserAuth";
import { Technology } from "./Technology";

/**
 * Response DTO para perfiles STANDARD
 * Contiene solo photoUrl y phoneNumber
 */
export interface StandardProfileResponseDto {
  id: number;
  userId: number;
  photoUrl?: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTO para crear un perfil STANDARD
 */
export interface CreateStandardProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
}

/**
 * DTO para actualizar completamente un perfil STANDARD
 */
export interface UpdateStandardProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
}

/**
 * DTO para actualizar parcialmente un perfil STANDARD
 */
export interface PatchStandardProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
}
