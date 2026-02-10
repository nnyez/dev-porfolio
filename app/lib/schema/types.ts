export enum Role {
  STANDARD = "STANDARD",
  PROGRAMMER = "PROGRAMMER",
  ADMIN = "ROLE_ADMIN",
}

export interface ProfileExists {
  exists: boolean;
  profileId: number;
}

/**
 * DTO unificado para respuesta de perfiles de usuario
 * Usado por el endpoint GET /api/profiles/all (solo ADMIN)
 */
export interface UserProfileResponseDto {
  id: number;
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  skillIds?: number[];
  experienceYears?: number;
  userName?: string;
  userEmail?: string;
  role?: string;
}
