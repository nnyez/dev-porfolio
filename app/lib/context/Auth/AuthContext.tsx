"use client";

import { UserAuth } from "@/app/lib/schema/UserAuth";
import { UserProfile } from "@/app/lib/schema/UserProfile";
import { createContext, useContext, useEffect, useState } from "react";
// Importamos RxJS
import { authState$ } from "../../auth/AuthService";
import { getStandardUserProfileByIdIfExists as getdUserProfileByIdIfExists } from "../../users/UsersRepository";
import { firstValueFrom } from "rxjs";

interface AuthContextType {
  user: UserAuth | null;
  userData: UserProfile | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    if (user?.userId) {
      try {
        console.log("🔄 [AuthContext] Recargando perfil del usuario...");
        const userProfile = await firstValueFrom(
          getdUserProfileByIdIfExists(user.userId),
        );

        if (userProfile) {
          userProfile.auth = user;
          setUserData(userProfile);
          console.log("✅ [AuthContext] Perfil recargado exitosamente");
        } else {
          console.warn("⚠️ [AuthContext] El perfil no existe para este usuario");
          setUserData(null);
        }
      } catch (error) {
        console.error("❌ [AuthContext] Error al recargar perfil:", error);
      }
    }
  };

  useEffect(() => {
    const subscription = authState$.subscribe({
      next: async (authStatus) => {
        if (authStatus) {
          setUser(authStatus.user);
          setLoading(authStatus.isLoading);

          if (authStatus.user?.userId) {
            try {
              const userProfile = await firstValueFrom(
                getdUserProfileByIdIfExists(authStatus.user.userId),
              );

              if (userProfile) {
                userProfile.auth = authStatus.user;
                setUserData(userProfile);
              } else {
                console.warn("⚠️ [AuthContext] El perfil no existe para este usuario");
                setUserData(null);
              }
            } catch (error) {
              console.error("❌ [AuthContext] Error al cargar perfil:", error);
              setUserData(null);
            }
          }
        }
      },
      error: (error) => {
        console.error("❌ Error en la suscripción de autenticación:", error);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
