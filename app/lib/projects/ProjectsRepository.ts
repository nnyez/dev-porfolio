import { from, map, catchError, throwError } from "rxjs";
import { API_BASE_URL, getCurrentSession } from "../auth/AuthService";
import {
  ProjectResponseDto,
  CreateProjectDto,
  UpdateProjectDto,
  PatchProjectDto,
} from "../schema/Project";

/**
 * Crear un nuevo proyecto
 * POST /api/projects?userId={userId}
 */
export function createProject(
  userId: number,
  createDto: CreateProjectDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al crear proyecto: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProjectResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al crear proyecto:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener un proyecto por su ID
 * GET /api/projects/{id}
 */
export function getProjectById(id: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener proyecto: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProjectResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al obtener proyecto:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener todos los proyectos
 * GET /api/projects
 */
export function getAllProjects() {
  const authSession = getCurrentSession();
  

  return from(
    fetch(`${API_BASE_URL}api/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener proyectos: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return (data as ProjectResponseDto[]);
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al obtener proyectos:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener proyectos de un usuario específico
 * GET /api/projects/user/{userId}
 */
export function getProjectsByUserId(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener proyectos del usuario: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return (data as ProjectResponseDto[]);
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al obtener proyectos del usuario:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar completamente un proyecto
 * PUT /api/projects/{id}
 */
export function updateProject(
  id: number,
  updateDto: UpdateProjectDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al actualizar proyecto: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProjectResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al actualizar proyecto:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar parcialmente un proyecto
 * PATCH /api/projects/{id}
 */
export function patchProject(
  id: number,
  patchDto: PatchProjectDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patchDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar parcialmente proyecto: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProjectResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al actualizar parcialmente proyecto:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Eliminar un proyecto
 * DELETE /api/projects/{id}
 */
export function deleteProject(id: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ProjectsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al eliminar proyecto: ${res.statusText}`);
      }
      return res.status === 204 ? { success: true } : res.json();
    }),
  ).pipe(
    catchError((error) => {
      console.error("❌ [ProjectsRepository] Error al eliminar proyecto:", error);
      return throwError(() => error);
    }),
  );
}
