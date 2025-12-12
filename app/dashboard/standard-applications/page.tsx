"use client";

import ServiceApplicationsManager from "./ui/ServiceApplicationsManager";
import ProgrammerApplications from "./ui/ProgrammerApplications";
import AvailabilityScheduler from "./ui/AvailabilityScheduler";
import { useAuth } from "@/app/context/AuthContext";
import { AppUser } from "@/app/lib/types";
import { useEffect } from "react";

export default function StandardApplications() {
  const { userData } = useAuth() ;

  useEffect(() => {
    console.log("User role:", userData?.role);
  }, [userData]);
  // Si es cliente, solo ve sus solicitudes creadas (no recibe solicitudes ni tiene calendario)
  if ((userData  as AppUser)?.role === "standard") {
    return (
      <main className="bg-primary flex flex-col min-h-screen font-sans gap-8 py-10 px-8">
        <div className="w-full">
          <ServiceApplicationsManager />
        </div>
      </main>
    );
  }

  // Si es programador, ve las solicitudes que recibe + su disponibilidad
  if ((userData as AppUser)?.role === "programmer") {
    return (
      <main className="bg-primary flex flex-col lg:flex-row min-h-screen font-sans gap-8 py-10 px-8">
        <div className="flex-1">
          <ProgrammerApplications />
        </div>
        <div className="flex-1">
          <AvailabilityScheduler />
        </div>
      </main>
    );
  }

  // Admin ve ambas vistas (solicitudes que envía + solicitudes que recibe) + su disponibilidad
  return (
    <main className="bg-primary flex flex-col min-h-screen font-sans gap-8 py-10 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ServiceApplicationsManager />
        <ProgrammerApplications />
      </div>
      <div>
        <AvailabilityScheduler />
      </div>
    </main>
  );
}
