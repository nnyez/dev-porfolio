"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase.config";
import { AppUser, UserBase } from "../lib/types";
// Importamos RxJS
import { Observable, of, switchMap, map } from "rxjs";
import { getUserData } from "../lib/firebaseRepository";

interface AuthContextType {
  user: User | null;
  userData: UserBase | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserBase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // IMPORTANTE: Usa RxJS Observables para sincronizar auth en tiempo real
    // onAuthStateChanged escucha cambios en Firebase Authentication
    const authState$ = new Observable<User | null>((observer) => {
      return onAuthStateChanged(
        auth,
        (u) => observer.next(u),
        (e) => observer.error(e),
      );
    });

    // switchMap: Si usuario cambia, cancela suscripción anterior y carga nuevos datos
    // Esto previene fugas de memoria y datos de usuarios anteriores
    const subscription = authState$
      .pipe(
        switchMap((currentUser) => {
          if (!currentUser) {
            return of({ user: null, userData: null });
          }

          // Obtiene perfil del usuario desde Firestore en tiempo real
          const userDoc$ = getUserData(currentUser.uid);

          return userDoc$.pipe(
            map((data) => ({ user: currentUser, userData: data })),
          );
        }),
      )
      .subscribe({
        next: (result) => {
          // Actualiza estados de React de una vez (más eficiente)
          setUser(result.user);
          setUserData(result.userData);
          setLoading(false);
        },
        error: (error) => {
          console.error("Error en el stream de Auth:", error);
          setUser(null);
          setUserData(null);
          setLoading(false);
        },
      });

    // Limpia suscripciones al desmontar para evitar memory leaks
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
