export interface Technology {
  id: number;
  technology: string;
}

/**
 * DTO para crear una nueva tecnología
 */
export interface CreateTechnologyDto {
  technology: string;
}

/**
 * DTO para la respuesta de tecnología
 */
export interface TechnologyResponseDto {
  id: number;
  technology: string;
}

/**
 * DTO para actualizar una tecnología
 */
export interface UpdateTechnologyDto {
  technology: string;
}