"use client";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import FormProfile from "./ui/FormProfile";
import { AppUser } from "@/app/lib/types";

export default function Profile() {
  const { userData } = useAuth();
  const user = userData as AppUser;

  return (
    <section className="flex flex-col items-center py-10 px-8 w-full">
      <div className="w-full max-w-4xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-accent/80 mt-2">Actualiza tu información personal</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0">
            <div className="bg-linear-to-br from-alt via-primary to-secondary relative w-64 h-64 overflow-hidden rounded-2xl border border-accent/20 shadow-lg">
              <Image
                src={userData?.photoURL || "/profile.svg"}
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
