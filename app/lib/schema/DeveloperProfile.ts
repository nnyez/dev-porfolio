import { UserAuth } from "./UserAuth";
import { Technology } from "./Technology";

/**
 * Response DTO para perfiles DEVELOPER/ADMIN
 * Contiene información completa: skills, experiencia, título y biografía
 */
export interface DeveloperProfileResponseDto {
  id: number;
  userId: number;
  email?: string;
  name?: string;
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  experienceYears?: number;
  skills?: Technology[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * DTO para crear un perfil DEVELOPER/ADMIN
 */
export interface CreateDeveloperProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  experienceYears?: number;
  skills?: Technology[];
}

/**
 * DTO para actualizar completamente un perfil DEVELOPER/ADMIN
 */
export interface UpdateDeveloperProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  experienceYears?: number;
  skills?: Technology[];
}

/**
 * DTO para actualizar parcialmente un perfil DEVELOPER/ADMIN
 */
export interface PatchDeveloperProfileDto {
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  experienceYears?: number;
  skills?: Technology[];
}
