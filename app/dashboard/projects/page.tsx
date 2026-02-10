"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllProjects, getProjectsByUserId } from "@/app/lib/projects/ProjectsRepository";
import { ProjectResponseDto } from "@/app/lib/schema/Project";
import { useEffect, useState } from "react";
import { CellProject } from "./ui/CellProject";
import ModalProject from "./ui/ModalProject";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import { Role } from "@/app/lib/schema/types";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userData } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ProjectResponseDto | undefined>(undefined);
  const [modalType, setModalType] = useState<"create" | "edit">("create");

  const openCreate = () => {
    setModalType("create");
    setEditData(undefined);
    setIsModalOpen(true);
  };

  const openEdit = (project: ProjectResponseDto) => {
    setModalType("edit");
    setEditData(project);
    setIsModalOpen(true);
  };

  const refreshProjects = () => {
    setLoading(true);
    if (!userData) return;
    if (userData.auth?.rol === Role.PROGRAMMER) {
      const subscription = getProjectsByUserId(userData.auth?.userId || 0).subscribe({
        next: (data) => {
          setProjects(data);
          setError(null);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
          setError("Error al cargar los proyectos");
          setLoading(false);
        },
      });
      return () => subscription.unsubscribe();
    } else if (userData.auth?.rol === Role.ADMIN) {
      const subscription = getAllProjects().subscribe({
        next: (data) => {
          setProjects(data);
          setError(null);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error fetching projects:", err);
          setError("Error al cargar los proyectos");
          setLoading(false);
        },
      });
      return () => subscription.unsubscribe();
    }
  };

  useEffect(() => {
    refreshProjects();
  }, [userData]);

  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans w-full">
      <div className="border-accent/20 flex flex-col md:flex-row items-start md:items-center justify-between border-b px-4 sm:px-6 md:px-8 py-6 md:py-8 gap-4">
        <div>
          <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl font-bold">Proyectos</h2>
          <p className="text-accent/80 mt-1 text-sm md:text-base">
            Gestiona y visualiza tus proyectos
          </p>
        </div>
        <button
          onClick={openCreate}
          className="w-full md:w-auto bg-accent text-secondary hover:bg-resalt rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Crear nuevo proyecto"
        >
          <AddCircleIcon className="text-2xl md:text-3xl!" />
        </button>
      </div>
      <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-10 w-full">
        {error && (
          <div className="rounded-lg bg-error/10 border-2 border-error/40 p-4 text-sm text-error font-medium mb-6">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <p className="text-accent/60 text-lg md:text-xl">Cargando proyectos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <p className="text-accent/60 text-lg md:text-xl">Aún no tienes proyectos</p>
            <button
              onClick={openCreate}
              className="bg-accent text-secondary hover:bg-resalt mt-6 rounded-full px-4 sm:px-6 py-2 text-sm md:text-base font-semibold transition-all duration-300"
            >
              Crear tu primer proyecto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
            {projects.map((project: ProjectResponseDto) => (
              <CellProject
                key={project.id}
                project={project}
                modalOpen={() => openEdit(project)}
              />
            ))}
          </div>
        )}
      </div>
      <ModalProject
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        projectData={editData}
        onSuccess={refreshProjects}
      />
    </main>
  );
}
