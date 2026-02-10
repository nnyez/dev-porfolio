import { UserAuth } from "@/app/lib/schema/UserAuth";
import { BehaviorSubject, from } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { RegisterUserParams } from "../models/RegisterUserParams";
import { LoginUserParams } from "../models/LoginUserParams";

export const API_BASE_URL = /*process.env.NEXT_PUBLIC_API_BASE_URL ||*/ "http://localhost:8080/";
const USER_KEY = "USER_DATA";

interface authStatus {
  user: UserAuth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

const authSubject = new BehaviorSubject<authStatus | null>(null);

export const authState$ = authSubject.asObservable();

if (typeof window !== "undefined") {
  const token = localStorage.getItem(USER_KEY);

  if (token) {
    const data = JSON.parse(token);

    authSubject.next({
      isAuthenticated: true,
      error: null,
      isLoading: false,
      user: data,
    });
  } else {
    console.log("📋 [AuthService] No hay datos en localStorage");
  }
}

export const getCurrentSession = () => authSubject.value;

export function registerUser(
  params: RegisterUserParams,
  isProgrammer?: boolean,
) {
  const url = isProgrammer ? "-programmer" : "";

  return from(
    fetch(`${API_BASE_URL}api/auth/register${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => {
      if (!res.ok) throw new Error("Error en el registro");
      return res.json();
    }),
  ).pipe(
    map((data) => {
      const user: UserAuth = data;
      // Guardar en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        authSubject.next({
          isAuthenticated: true,
          error: null,
          isLoading: false,
          user,
        });
      }
      return user;
    }),
    catchError((error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido en el registro";
      if (typeof window !== "undefined") {
        authSubject.next({
          isAuthenticated: false,
          error: new Error(errorMessage),
          isLoading: false,
          user: null,
        });
      }
      return throwError(() => new Error(errorMessage));
    }),
  );
}

export function loginUser(params: LoginUserParams) {
  return from(
    fetch(`${API_BASE_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then((res) => {
      if (!res.ok) throw new Error("Error al iniciar sesión");

      return res.json();
    }),
  ).pipe(
    map((data) => {
      const user: UserAuth = data;

      if (typeof window !== "undefined") {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        authSubject.next({
          error: null,
          isAuthenticated: true,
          isLoading: false,
          user: user,
        });
      }
      return user;
    }),
    catchError((error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al iniciar sesión";
      if (typeof window !== "undefined") {
        authSubject.next({
          isAuthenticated: false,
          error: new Error(errorMessage),
          isLoading: false,
          user: null,
        });
      }
      return throwError(() => new Error(errorMessage));
    }),
  );
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  authSubject.next({
    error: null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
  });
}
