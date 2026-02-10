"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase.config";
import {  UserBase } from "../../config/types";
// Importamos RxJS
import { Observable, of, switchMap, map } from "rxjs";
import { getUserData } from "../../deprecated/firebase/firebaseRepository";

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

/**
 * @deprecated This hook is deprecated. Use `useAuth()` from '@/app/lib/auth/AuthService' instead.
 * 
 * This hook will be removed in a future version. Please migrate to the new authentication system.
 * 
 * @returns {AuthContextType} The deprecated auth context
 */
export const useAuth = () => {

  return useContext(AuthContext);
};

/**
 * @deprecated This component is deprecated. Use the new AuthProvider from '@/app/lib/context/Auth/AuthContext' instead.
 * 
 * This provider will be removed in a future version. Please migrate to the new authentication system.
 * Migration guide: See /docs/SETUP_Y_DEPLOYMENT.md
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The deprecated auth provider
 */
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
