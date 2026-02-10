/**
 * DTOs para operaciones CRUD de Proyectos
 */

export interface ProjectResponseDto {
  id: number;
  project: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  ownerId: number;
  ownerName: string;
  technologies: TechnologyDto[];
}

export interface TechnologyDto {
  id: number;
  technology: string;
}

export interface CreateProjectDto {
  project: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  technologyIds?: number[];
}

export interface UpdateProjectDto {
  project: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  technologyIds?: number[];
}

export interface PatchProjectDto {
  project?: string;
  description?: string;
  projectUrl?: string;
  imageUrl?: string;
  technologyIds?: number[];
}
