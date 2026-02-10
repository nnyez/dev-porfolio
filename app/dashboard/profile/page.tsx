"use client";
import Image from "next/image";
import FormProfile from "./ui/FormProfile";
import { AppUser } from "@/app/lib/config/types";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import { UserProfile } from "@/app/lib/schema/UserProfile";

export default function Profile() {
  const { userData } = useAuth();
  const user = userData as UserProfile;

  return (
    <section className="flex flex-col items-center py-6 md:py-10 px-4 sm:px-6 md:px-8 w-full">
      <div className="w-full max-w-4xl">
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-accent/80 mt-2 text-sm md:text-base">Actualiza tu información personal</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="shrink-0 w-full md:w-auto">
            <div className="bg-linear-to-br from-alt via-primary to-secondary relative w-full md:w-64 aspect-square md:aspect-auto md:h-64 overflow-hidden rounded-2xl border border-accent/20 shadow-lg">
              <Image
                src={userData?.photoUrl || "/profile.svg"}
                alt="User Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 w-full">
            <FormProfile userData={user} />
          </div>
        </div>
      </div>
    </section>
  );
}
