import { from, map, catchError, throwError } from "rxjs";
import { API_BASE_URL, getCurrentSession } from "../auth/AuthService";
import {
  AvailabilityResponseDto,
  CreateAvailabilityDto,
} from "../schema/Availability";

/**
 * Crear o actualizar la configuración de disponibilidad de un usuario
 * POST /api/availability/{userId}
 */
export function createOrUpdateAvailability(
  userId: number,
  createDto: CreateAvailabilityDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [AvailabilityRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [AvailabilityRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/availability/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al guardar disponibilidad: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as AvailabilityResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [AvailabilityRepository] Error al guardar disponibilidad:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener la configuración de disponibilidad de un usuario
 * GET /api/availability/{userId}
 */
export function getAvailability(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [AvailabilityRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [AvailabilityRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/availability/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener disponibilidad: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as AvailabilityResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [AvailabilityRepository] Error al obtener disponibilidad:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Eliminar la configuración de disponibilidad de un usuario
 * DELETE /api/availability/{userId}
 */
export function deleteAvailability(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [AvailabilityRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/availability/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al eliminar disponibilidad: ${res.statusText}`);
      }
      return res.status === 204 ? { success: true } : res.json();
    }),
  ).pipe(
    catchError((error) => {
      console.error("❌ [AvailabilityRepository] Error al eliminar disponibilidad:", error);
      return throwError(() => error);
    }),
  );
}
