import { from, map, catchError, throwError } from "rxjs";
import { API_BASE_URL, getCurrentSession } from "../auth/AuthService";
import {
  CreateTechnologyDto,
  TechnologyResponseDto,
  UpdateTechnologyDto,
} from "../schema/Technology";

/**
 * Crear una nueva tecnología
 * POST /api/technologies
 */
export function createTechnology(createDto: CreateTechnologyDto) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [TechnologiesRepository] No hay token disponible para la autenticación"
    );
    console.error(
      "🔍 [TechnologiesRepository] authSession completo:",
      authSession
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/technologies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al crear tecnología: ${res.statusText}`);
      }
      return res.json();
    })
  ).pipe(
    map((data) => {
      return data as TechnologyResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [TechnologiesRepository] Error al crear tecnología:", error);
      return throwError(() => error);
    })
  );
}

/**
 * Obtener una tecnología por su ID
 * GET /api/technologies/{id}
 */
export function getTechnologyById(id: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [TechnologiesRepository] No hay token disponible para la autenticación"
    );
    console.error(
      "🔍 [TechnologiesRepository] authSession completo:",
      authSession
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/technologies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener tecnología: ${res.statusText}`);
      }
      return res.json();
    })
  ).pipe(
    map((data) => {
      return data as TechnologyResponseDto;
    }),
    catchError((error) => {
      console.error(
        "❌ [TechnologiesRepository] Error al obtener tecnología:",
        error
      );
      return throwError(() => error);
    })
  );
}

/**
 * Obtener todas las tecnologías
 * GET /api/technologies
 */
export function getAllTechnologies() {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [TechnologiesRepository] No hay token disponible para la autenticación"
    );
    console.error(
      "🔍 [TechnologiesRepository] authSession completo:",
      authSession
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/technologies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener tecnologías: ${res.statusText}`);
      }
      return res.json();
    })
  ).pipe(
    map((data) => {
      return data as TechnologyResponseDto[];
    }),
    catchError((error) => {
      console.error(
        "❌ [TechnologiesRepository] Error al obtener tecnologías:",
        error
      );
      return throwError(() => error);
    })
  );
}

/**
 * Obtener una tecnología por su nombre
 * GET /api/technologies/by-name/{name}
 * Retorna null si la tecnología no existe (404)
 */
export function getTechnologyByName(name: string) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [TechnologiesRepository] No hay token disponible para la autenticación"
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/technologies/by-name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // 404 es una respuesta válida (significa que la tecnología no existe)
      if (res.status === 404) {
        return null;
      }
      if (!res.ok) {
        throw new Error(
          `Error al obtener tecnología por nombre: ${res.statusText}`
        );
      }
      return res.json();
    })
  ).pipe(
    map((data) => {
      return data as TechnologyResponseDto | null;
    }),
    catchError((error) => {
      console.error(
        "❌ [TechnologiesRepository] Error al obtener tecnología por nombre:",
        error
      );
      return throwError(() => error);
    })
  );
}

/**
 * Actualizar completamente una tecnología
 * PUT /api/technologies/{id}
 */
export function updateTechnology(
  id: number,
  updateDto: UpdateTechnologyDto
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [TechnologiesRepository] No hay token disponible para la autenticación"
    );
    console.error(
      "🔍 [TechnologiesRepository] authSession completo:",
      authSession
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/technologies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al actualizar tecnología: ${res.statusText}`);
      }
      return res.json();
    })
  ).pipe(
    map((data) => {
      return data as TechnologyResponseDto;
    }),
    catchError((error) => {
      console.error(
        "❌ [TechnologiesRepository] Error al actualizar tecnología:",
        error
      );
      return throwError(() => error);
    })
  );
}
