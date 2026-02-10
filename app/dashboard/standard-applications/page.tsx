"use client";

import ServiceApplicationsManager from "./ui/ServiceApplicationsManager";
import ProgrammerApplications from "./ui/ProgrammerApplications";
import AvailabilityScheduler from "./ui/AvailabilityScheduler";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import { Role } from "@/app/lib/schema/types";
import { useEffect } from "react";

export default function StandardApplications() {
  const { userData } = useAuth() ;

  useEffect(() => {
  }, [userData]);
  // Si es cliente, solo ve sus solicitudes creadas (no recibe solicitudes ni tiene calendario)
  if (userData?.auth?.rol === Role.STANDARD) {
    return (
      <main className="bg-primary flex flex-col min-h-screen font-sans gap-6 md:gap-8 py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="w-full">
          <ServiceApplicationsManager />
        </div>
      </main>
    );
  }

  // Si es programador, ve las solicitudes que recibe + su disponibilidad
  if (userData?.auth?.rol === Role.PROGRAMMER) {
    return (
      <main className="bg-primary flex flex-col lg:flex-row min-h-screen font-sans gap-6 md:gap-8 py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="flex-1 w-full">
          <ProgrammerApplications />
        </div>
        <div className="flex-1 w-full">
          <AvailabilityScheduler />
        </div>
      </main>
    );
  }

  // Admin ve ambas vistas (solicitudes que envía + solicitudes que recibe) + su disponibilidad
  return (
    <main className="bg-primary flex flex-col min-h-screen font-sans gap-6 md:gap-8 py-6 md:py-10 px-4 sm:px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <ServiceApplicationsManager />
        <ProgrammerApplications />
      </div>
      <div>
        <AvailabilityScheduler />
      </div>
    </main>
  );
}
