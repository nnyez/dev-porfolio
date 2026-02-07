"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { AppUser } from "@/app/lib/types";
import FormProfile from "../ui/FormProfile";
import { use, useEffect, useState } from "react";
import { getUserData } from "@/app/lib/firebaseRepository";
import AvailabilityScheduler from "../../standard-applications/ui/AvailabilityScheduler";

export default function Profile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [userD, setUserD] = useState<AppUser | null>(null);
  const { userData } = useAuth();

  useEffect(() => {
    const data = getUserData(id);
    const subscription = data.subscribe({
      next: (data) => setUserD(data as AppUser),
      error: (err) => console.error("Error fetching user data:", err),
    });
    return () => subscription.unsubscribe();
  }, [id]);
  return (
    <section className="bg-secondary m-4 sm:m-6 md:m-10 mt-4 sm:mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-2 items-start justify-center gap-6 md:gap-8 p-4 sm:p-6 md:p-10 rounded-2xl">
      {userD ? (
        <>
          <div>
            <h1 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">Perfil de Usuario</h1>
            <div className="bg-alt relative mb-4 md:mb-6 aspect-square w-full sm:w-64 md:w-72 overflow-hidden rounded-full mx-auto lg:mx-0">
              <Image
                src={userD?.photoURL || "/profile.svg"}
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
            <FormProfile userData={userD} canEdit={userData?.uid === id} />
          </div>
          <div className="w-full">
            <AvailabilityScheduler onlyView={userData?.uid !== id} />
          </div>
        </>
      ) : (
        <p className="text-center col-span-full">Cargando...</p>
      )}
    </section>
  );
}
