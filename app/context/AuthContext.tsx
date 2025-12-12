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
    // 1. Creamos un Observable base que escucha a Firebase Auth
    const authState$ = new Observable<User | null>((observer) => {
      // onAuthStateChanged devuelve la función unsubscribe, perfecto para el return del Observable
      return onAuthStateChanged(
        auth,
        (u) => observer.next(u),
        (e) => observer.error(e),
      );
    });

    // 2. Construimos el pipeline
    const subscription = authState$
      .pipe(
        // switchMap: Si llega un nuevo usuario, cancela la suscripción anterior de Firestore
        switchMap((currentUser) => {
          if (!currentUser) {
            // Si no hay usuario, emitimos null para ambos valores
            return of({ user: null, userData: null });
          }

          // Si hay usuario, creamos un Observable de Firestore (Tiempo real)
          const userDoc$ = getUserData(currentUser.uid);

          // Combinamos el usuario de Auth con la data de Firestore
          return userDoc$.pipe(
            map((data) => ({ user: currentUser, userData: data })),
          );
        }),
      )
      .subscribe({
        next: (result) => {
          // Actualizamos todos los estados de React de una vez
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

    // Limpieza al desmontar el componente
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
