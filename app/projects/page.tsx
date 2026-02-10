"use client";
import { useEffect, useState } from "react";
import { getAllProjects } from "../lib/projects/ProjectsRepository";
import { getAllDeveloperProfiles } from "../lib/users/UsersRepository";
import { ProjectResponseDto } from "../lib/schema/Project";
import { DeveloperProfileResponseDto } from "../lib/schema/DeveloperProfile";
import { GridCard } from "../ui/shared/GridCard";
import Image from "next/image";

interface Developer {
  id: number;
  name: string;
  photoUrl?: string;
}

// Metadata para la página de proyectos
// NOTA: En componentes "use client", la metadata se define en layout
// Para páginas dinámicas, usa layout.tsx en el mismo directorio

export default function Projects() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDeveloperId, setSelectedDeveloperId] = useState<number | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectResponseDto[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los desarrolladores y proyectos al montar el componente
  useEffect(() => {
    setLoading(true);
    let projectsSubscribed = true;
    let developersSubscribed = true;

    // Obtener todos los desarrolladores desde el endpoint dedicado
    const developersSubscription = getAllDeveloperProfiles().subscribe({
      next: (profilesData: DeveloperProfileResponseDto[]) => {
        if (!developersSubscribed) return;
        
        const developersWithPhotos = profilesData.map((profile) => ({
          id: profile.userId,
          name: profile.name || "Sin nombre",
          photoUrl: profile.photoUrl,
        }));
        
        console.log("📸 Desarrolladores cargados desde /api/profiles/developers:", developersWithPhotos);
        setDevelopers(developersWithPhotos);
      },
      error: (err) => {
        if (!developersSubscribed) return;
        console.error("❌ Error cargando desarrolladores:", err);
        setError("Error al cargar los desarrolladores");
        setLoading(false);
      },
    });

    // Obtener todos los proyectos
    const projectsSubscription = getAllProjects().subscribe({
      next: (data) => {
        if (!projectsSubscribed) return;
        
        setAllProjects(data);
        console.log("✅ Proyectos cargados:", data.length, "proyectos");
      },
      error: (err) => {
        if (!projectsSubscribed) return;
        console.error("❌ Error fetching projects:", err);
        setError("Error al cargar los proyectos");
        setLoading(false);
      },
      complete: () => {
        if (projectsSubscribed) {
          setLoading(false);
        }
      },
    });

    return () => {
      projectsSubscribed = false;
      developersSubscribed = false;
      projectsSubscription.unsubscribe();
      developersSubscription.unsubscribe();
    };
  }, []);

  // Filtrar proyectos según el desarrollador seleccionado
  useEffect(() => {
    if (selectedDeveloperId === null) {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(
        allProjects.filter((project) => project.ownerId === selectedDeveloperId)
      );
    }
  }, [selectedDeveloperId, allProjects]);

  // Debuguear desarrolladores cargados
  useEffect(() => {
    if (developers.length > 0) {
      console.log("👥 Desarrolladores actualizados:", developers);
      developers.forEach((dev) => {
        console.log(`  -> ${dev.name}: photoUrl="${dev.photoUrl}"`);
      });
    }
  }, [developers]);

  const handleSelectDeveloper = (developer: Developer) => {
    if (selectedDeveloperId === developer.id) {
      setSelectedDeveloperId(null); // Deseleccionar si ya está seleccionado
    } else {
      setSelectedDeveloperId(developer.id);
    }
  };

  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans w-full">
      {/* Header */}
      <section className="border-b border-accent/20 px-4 sm:px-6 md:px-8 py-6 md:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Portafolio de Desarrolladores</h1>
        <p className="text-accent/80 mt-2 text-sm md:text-base">Explora los proyectos de nuestros desarrolladores</p>
      </section>

      {/* Filtro de Desarrolladores */}
      <section className="px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">Selecciona un Desarrollador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4">
          {loading ? (
            <div className="col-span-full text-accent/60">Cargando desarrolladores...</div>
          ) : developers.length > 0 ? (
            developers.map((developer) => (
              <button
                key={developer.id}
                onClick={() => handleSelectDeveloper(developer)}
                className={`flex flex-col gap-3 transition-all ${
                  selectedDeveloperId === developer.id ? "opacity-100" : "opacity-90 hover:opacity-100"
                }`}
              >
                {/* Card de imagen */}
                <div
                  className={`relative w-full aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                    selectedDeveloperId === developer.id
                      ? "border-accent shadow-lg shadow-accent/50"
                      : "border-accent/20 hover:border-accent/40"
                  }`}
                >
                  <Image
                    src={developer.photoUrl && developer.photoUrl.trim() ? developer.photoUrl : "/profile.svg"}
                    alt={developer.name}
                    fill
                    className="object-cover"
                    priority={false}
                    onError={(e) => {
                      console.warn(`⚠️ Error cargando imagen para ${developer.name}:`, developer.photoUrl);
                      if (e.currentTarget.src !== "/profile.svg") {
                        e.currentTarget.src = "/profile.svg";
                      }
                    }}
                  />
                  {selectedDeveloperId === developer.id && (
                    <div className="absolute inset-0 bg-accent/20 rounded-lg"></div>
                  )}
                </div>
                {/* Nombre debajo */}
                <p className="text-foreground font-semibold text-sm text-center line-clamp-2 px-1">
                  {developer.name}
                </p>
              </button>
            ))
          ) : (
            <div className="col-span-full text-accent/60">No hay desarrolladores disponibles</div>
          )}
        </div>
      </section>

      {/* Proyectos */}
      <section className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full">
        <div>
          <div className="mb-6 md:mb-8">
            {selectedDeveloperId ? (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Proyectos de <span className="text-accent">{developers.find(d => d.id === selectedDeveloperId)?.name}</span>
                </h2>
                <p className="text-accent/80 mt-2 text-sm md:text-base">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Todos los Proyectos</h2>
                <p className="text-accent/80 mt-2 text-sm md:text-base">
                  {filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
                </p>
              </>
            )}
          </div>

          {error ? (
            <div className="flex items-center justify-center h-64 rounded-2xl border border-error/20 bg-error/10">
              <p className="text-error">{error}</p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-64 rounded-2xl border border-accent/20 bg-secondary/50">
              <p className="text-accent/60">Cargando proyectos...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <GridCard
                  key={project.id}
                  src={project.imageUrl}
                  srcRepo={project.projectUrl}
                  chips={project.technologies.map((tech) => tech.technology)}
                  displayName={project.ownerName}
                >
                  <h3 className="text-xl font-bold text-foreground">{project.project}</h3>
                  <p className="text-accent/80 mt-2">{project.description}</p>
                </GridCard>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 rounded-2xl border border-accent/20 bg-secondary/50">
              <p className="text-accent/60">
                {selectedDeveloperId
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
