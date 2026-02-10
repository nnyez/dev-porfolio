import { from, map, catchError, switchMap, of } from "rxjs";
import { throwError } from "rxjs";
import { API_BASE_URL, getCurrentSession } from "../auth/AuthService";
import { UserProfile } from "../schema/UserProfile";
import { ProfileExists, Role, UserProfileResponseDto } from "../schema/types";
import {
  StandardProfileResponseDto,
  CreateStandardProfileDto,
  UpdateStandardProfileDto,
  PatchStandardProfileDto,
} from "../schema/StandardProfile";
import {
  DeveloperProfileResponseDto,
  CreateDeveloperProfileDto,
  UpdateDeveloperProfileDto,
  PatchDeveloperProfileDto,
} from "../schema/DeveloperProfile";

export function getStandardUserProfileById(id: number) {
  const authSession = getCurrentSession();

  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [UsersRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener perfil: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as UserProfile;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error:", error);
      return throwError(() => error);
    }),
  );
}
export function getProgrammerUserProfileById(id: number) {
  const authSession = getCurrentSession();

  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [UsersRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al obtener perfil: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as UserProfile;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error:", error);
      return throwError(() => error);
    }),
  );
}

export function profileExistsById(id: number) {
  const authSession = getCurrentSession();

  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    console.error("🔍 [UsersRepository] authSession completo:", authSession);
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/${id}/exists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al verificar perfil: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProfileExists;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al verificar:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtiene el perfil del usuario SOLO si existe.
 * Primero verifica si existe, luego lo obtiene.
 * @param id - El userId
 * @returns Observable<UserProfile> o null si no existe
 */
export function getStandardUserProfileByIdIfExists(id: number) {
  return profileExistsById(id).pipe(
    switchMap((profileExists) => {
      // Verifica si existe según la respuesta
      if (!profileExists || !profileExists.exists) {
        console.warn(
          "⚠️ [UsersRepository] El perfil no existe para userId:",
          id,
        );
        return of(null);
      }

      // Si existe, obtén el perfil completo
      const authSession = getCurrentSession();

      if (
        authSession?.user?.rol === Role.PROGRAMMER ||
        authSession?.user?.rol === Role.ADMIN
      ) {
        return getProgrammerUserProfileById(id);
      } else {
        return getStandardUserProfileById(id);
      }
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error:", error);
      return throwError(() => error);
    }),
  );
}


export function userExistsById(id: number) {
  return from(
    fetch(`${API_BASE_URL}api/auth/users/${id}/exists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error al verificar perfil: ${res.statusText}`);
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as ProfileExists;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al verificar:", error);
      return throwError(() => error);
    }),
  );
}

// ============ STANDARD PROFILE ENDPOINTS ============

/**
 * Crear un perfil STANDARD
 * POST /api/profiles/standard
 */
export function createStandardProfile(
  userId: number,
  createDto: CreateStandardProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al crear perfil STANDARD: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as StandardProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al crear perfil STANDARD:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener perfil STANDARD de un usuario
 * GET /api/profiles/standard/{userId}
 */
export function getStandardProfile(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener perfil STANDARD: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as StandardProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al obtener perfil STANDARD:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar completamente un perfil STANDARD
 * PUT /api/profiles/standard/{userId}
 */
export function updateStandardProfile(
  userId: number,
  updateDto: UpdateStandardProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar perfil STANDARD: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as StandardProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al actualizar perfil STANDARD:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar parcialmente un perfil STANDARD
 * PATCH /api/profiles/standard
 */
export function patchStandardProfile(
  userId: number,
  patchDto: PatchStandardProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patchDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar parcialmente perfil STANDARD: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as StandardProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al actualizar parcialmente perfil STANDARD:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Eliminar un perfil STANDARD
 * DELETE /api/profiles/standard
 */
export function deleteStandardProfile(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/standard?userId=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al eliminar perfil STANDARD: ${res.statusText}`,
        );
      }
      return res.status === 204 ? { success: true } : res.json();
    }),
  ).pipe(
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al eliminar perfil STANDARD:", error);
      return throwError(() => error);
    }),
  );
}

// ============ DEVELOPER PROFILE ENDPOINTS ============

/**
 * Crear un perfil DEVELOPER/ADMIN
 * POST /api/profiles/developer
 */
export function createDeveloperProfile(
  userId: number,
  createDto: CreateDeveloperProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al crear perfil DEVELOPER: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as DeveloperProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al crear perfil DEVELOPER:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener perfil DEVELOPER/ADMIN de un usuario
 * GET /api/profiles/developer/{userId}
 */
export function getDeveloperProfile(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener perfil DEVELOPER: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as DeveloperProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al obtener perfil DEVELOPER:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar completamente un perfil DEVELOPER/ADMIN
 * PUT /api/profiles/developer
 */
export function updateDeveloperProfile(
  userId: number,
  updateDto: UpdateDeveloperProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer?userId=${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar perfil DEVELOPER: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as DeveloperProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al actualizar perfil DEVELOPER:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Actualizar parcialmente un perfil DEVELOPER/ADMIN
 * PATCH /api/profiles/developer
 */
export function patchDeveloperProfile(
  userId: number,
  patchDto: PatchDeveloperProfileDto,
) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer?userId=${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patchDto),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al actualizar parcialmente perfil DEVELOPER: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      console.log(data);
      return data as DeveloperProfileResponseDto;
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al actualizar parcialmente perfil DEVELOPER:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Eliminar un perfil DEVELOPER/ADMIN
 * DELETE /api/profiles/developer
 */
export function deleteDeveloperProfile(userId: number) {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/developer?userId=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al eliminar perfil DEVELOPER: ${res.statusText}`,
        );
      }
      return res.status === 204 ? { success: true } : res.json();
    }),
  ).pipe(
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al eliminar perfil DEVELOPER:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener todos los perfiles de desarrolladores
 * GET /api/profiles/developers
 */
export function getAllDeveloperProfiles() {
  const authSession = getCurrentSession();


  return from(
    fetch(`${API_BASE_URL}api/profiles/developers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener perfiles de desarrolladores: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as DeveloperProfileResponseDto[];
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al obtener perfiles de desarrolladores:", error);
      return throwError(() => error);
    }),
  );
}

/**
 * Obtener lista de programadores y administradores disponibles
 * GET /api/users?role=PROGRAMMER,ADMIN
 */
export function getProgrammers() {
  return getAllDeveloperProfiles();
}

/**
 * Obtener todos los perfiles de usuarios independiente del rol
 * GET /api/profiles/all (Solo ADMIN)
 */
export function getAllProfiles() {
  const authSession = getCurrentSession();
  const token = authSession?.user?.token;

  if (!token) {
    console.error(
      "❌ [UsersRepository] No hay token disponible para la autenticación",
    );
    return throwError(() => new Error("No hay token de autenticación"));
  }

  return from(
    fetch(`${API_BASE_URL}api/profiles/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(
          `Error al obtener todos los perfiles: ${res.statusText}`,
        );
      }
      return res.json();
    }),
  ).pipe(
    map((data) => {
      return data as UserProfileResponseDto[];
    }),
    catchError((error) => {
      console.error("❌ [UsersRepository] Error al obtener todos los perfiles:", error);
      return throwError(() => error);
    }),
  );
}
