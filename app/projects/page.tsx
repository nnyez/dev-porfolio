"use client";
import { useEffect, useState } from "react";
import { getAllProjects, getAllUsers } from "../lib/firebaseRepository";
import { useAuth } from "../context/AuthContext";
import { where } from "firebase/firestore";
import { GridCard } from "../ui/shared/GridCard";
import { Project, UserProgrammer } from "../lib/types";
import { CellUser } from "./ui/CellUser";

// Metadata para la página de proyectos
// NOTA: En componentes "use client", la metadata se define en layout
// Para páginas dinámicas, usa layout.tsx en el mismo directorio

export default function Projects() {
  const [programmers, setProgrammers] = useState<UserProgrammer[]>();
  const [programer, setProgramer] = useState<UserProgrammer | null>(null);
  const [projects, setProjects] = useState<Project[]>();
  const { userData } = useAuth();

  useEffect(() => {
    const q = where("role", "!=", "standard");

    const subscribe = getAllUsers(userData?.uid || "", q).subscribe({
      next: (data) => {
        setProgrammers(data as UserProgrammer[]);
      },
      error: (err) => console.error("Error fetching programmers:", err),
    });
    return () => subscribe.unsubscribe();
  }, [userData?.uid]);

  useEffect(() => {
    let q;
    if (programer) {
      q = where("ownerUid", "==", programer.uid);
    }

    const subscribe = getAllProjects(q).subscribe({
      next: (data) => {
        setProjects(data);
      },
      error: (err) => console.error("Error fetching projects:", err),
    });
    return () => subscribe.unsubscribe();
  }, [programer]);

  const handleSelectProgrammer = (programmer: UserProgrammer) => {
    setProgramer(programmer);
  };

  return (
    <main
      onClick={() => setProgramer(null)}
      className="bg-primary flex min-h-screen flex-col font-sans"
    >
      {/* Header */}
      <section className="border-b border-accent/20 px-8 py-10">
        <h1 className="text-4xl font-bold text-foreground">Portafolio de Desarrolladores</h1>
        <p className="text-accent/80 mt-2">Explora los proyectos de nuestros desarrolladores</p>
      </section>

      {/* Filtro de Programadores */}
      <section className="px-8 py-8">
        <h2 className="text-lg font-semibold text-foreground mb-6">Selecciona un Desarrollador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {programmers?.map((programmer) => (
            <CellUser
              key={programmer.uid}
              programmer={programmer}
              onSelect={handleSelectProgrammer}
              selected={programer?.uid === programmer.uid}
            />
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section className="flex-1 px-8 py-8">
        <div>
          <div className="mb-8">
            {programer ? (
              <>
                <h2 className="text-2xl font-bold text-foreground">
                  Proyectos de <span className="text-accent">{programer.displayName}</span>
                </h2>
                <p className="text-accent/80 mt-2">
                  {projects?.length || 0} {projects?.length === 1 ? "proyecto" : "proyectos"}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground">Todos los Proyectos</h2>
                <p className="text-accent/80 mt-2">
                  {projects?.length || 0} {projects?.length === 1 ? "proyecto" : "proyectos"}
                </p>
              </>
            )}
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <GridCard
                  key={project.id}
                  src={project.imageUrl || ""}
                  srcRepo={project.projectUrl || ""}
                  chips={project.technologiesUsed || []}
                  displayName={programmers?.find((p) => p.uid === project.ownerUid)?.displayName}
                >
                  <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                  <p className="text-accent/80 mt-2">{project.description}</p>
                </GridCard>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 rounded-2xl border border-accent/20 bg-secondary/50">
              <p className="text-accent/60">
                {programer
                  ? "No hay proyectos disponibles para este desarrollador"
                  : "No hay proyectos disponibles"}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
