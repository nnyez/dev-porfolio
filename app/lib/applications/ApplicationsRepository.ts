import { from, map, catchError, throwError } from "rxjs";
import { API_BASE_URL, getCurrentSession } from "../auth/AuthService";
import {
  ApplicationResponseDto,
  CreateApplicationDto,
  UpdateApplicationStatusDto,
  ApplicationStatus,
} from "../schema/ServiceApplication";

/**
 * Crear una nueva solicitud de servicio como cliente
 * POST /api/applications/client/{clientId}
 */
export function createApplication(
  clientId: number,
  createDto: CreateApplicationDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [ApplicationsRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/applications/client/${clientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al crear solicitud: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ApplicationResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ApplicationsRepository] Error al crear solicitud:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener una solicitud por su ID
 * GET /api/applications/{id}
 */
export function getApplicationById(id: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [ApplicationsRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/applications/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener solicitud: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ApplicationResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [ApplicationsRepository] Error al obtener solicitud:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener todas las solicitudes creadas por un cliente
 * GET /api/applications/client/{clientId}
 * @param clientId - ID del cliente
 * @param status - Filtro opcional por estado
 */
export function getApplicationsByClient(
  clientId: number,
  status?: ApplicationStatus,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [ApplicationsRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  const url = status
    ? `${API_BASE_URL}api/applications/client/${clientId}?status=${status}`
    : `${API_BASE_URL}api/applications/client/${clientId}`;

  return from(
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener solicitudes del cliente: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ApplicationResponseDto[];
    }),
    catchError((error) => {
      console.error(
        "❌ [ApplicationsRepository] Error al obtener solicitudes del cliente:",
        error,
      );
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener todas las solicitudes dirigidas a un programador
 * GET /api/applications/programmer/{programmerId}
 * @param programmerId - ID del programador
 * @param status - Filtro opcional por estado
 */
export function getApplicationsByProgrammer(
  programmerId: number,
  status?: ApplicationStatus,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [ApplicationsRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  const url = status
    ? `${API_BASE_URL}api/applications/programmer/${programmerId}?status=${status}`
    : `${API_BASE_URL}api/applications/programmer/${programmerId}`;

  return from(
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener solicitudes del programador: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ApplicationResponseDto[];
    }),
    catchError((error) => {
      console.error(
        "❌ [ApplicationsRepository] Error al obtener solicitudes del programador:",
        error,
      );
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar el estado de una solicitud (aceptar/rechazar/completar/cancelar)
 * PATCH /api/applications/{id}/status
 */
export function updateApplicationStatus(
  id: number,
  updateDto: UpdateApplicationStatusDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/applications/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar estado de solicitud: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ApplicationResponseDto;
    }),
    catchError((error) => {
      console.error(
        "❌ [ApplicationsRepository] Error al actualizar estado de solicitud:",
        error,
      );
      return throwError(() => error);
    }),
  );
}

/**
 * Eliminar una solicitud
 * DELETE /api/applications/{id}
 */
export function deleteApplication(id: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [ApplicationsRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al eliminar solicitud: ${res.statusText}`);
      }
      return res.status === 204 ? { success: true } : res.json();
    }),
  ).pipe(
    catchError((error) => {
      console.error("❌ [ApplicationsRepository] Error al eliminar solicitud:", error);
      return throwError(() => error);
    }),
  );
}
