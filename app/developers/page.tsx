"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { AppUser } from "@/app/lib/types";
import FormProfile from "../dashboard/profile/ui/FormProfile";
import { useEffect, useState } from "react";
import { getUserData } from "@/app/lib/firebaseRepository";
import AvailabilityScheduler from "../dashboard/standard-applications/ui/AvailabilityScheduler";
import { useSearchParams } from "next/navigation";

export default function DeveloperProfile() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  
  const [userD, setUserD] = useState<AppUser | null>(null);
  const { userData } = useAuth();
  const [loading, setLoading] = useState(!!!userId);

useEffect(() => {
  // Si no hay userId, simplemente nos detenemos.
  // Ya no hace falta setLoading(false) porque ya se inició en false.
  if (!userId) {
    return; 
  }

  const data = getUserData(userId);
  const subscription = data.subscribe({
    next: (data) => {
      setUserD(data as AppUser);
      setLoading(false);
    },
    error: (err) => {
      console.error("Error fetching user data:", err);
      setLoading(false);
    },
  });

  return () => subscription.unsubscribe();
}, [userId]);

  if (!userId) {
    return (
      <section className="bg-secondary m-10 mt-10 p-10">
        <p className="text-center text-lg">Por favor proporciona un ID de desarrollador</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="bg-secondary m-10 mt-10 p-10">
        <p className="text-center">Cargando...</p>
      </section>
    );
  }

  return (
    <section className="bg-secondary m-10 mt-10 grid grid-cols-2 items-center justify-center p-10">
      {userD ? (
        <>
          <div>
            <h1 className="mb-6 text-4xl font-bold">Developer Profile</h1>
            <div className="bg-alt relative mb-6 aspect-square w-72 overflow-hidden rounded-full">
              <Image
                src={userD?.photoURL || "/profile.svg"}
                alt="Developer Profile"
                fill
                className="object-cover"
              />
            </div>
            <FormProfile userData={userD} canEdit={userData?.uid === userId} />
          </div>
          <AvailabilityScheduler onlyView={userData?.uid !== userId} />
        </>
      ) : (
        <p>Desarrollador no encontrado</p>
      )}
    </section>
  );
}
