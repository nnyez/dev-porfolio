"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAllProjects } from "@/app/lib/firebaseRepository";
import { Project } from "@/app/lib/types";
import { use, useEffect, useState } from "react";
import { CellProject } from "./ui/CellProject";
import ModalProject from "./ui/ModalProject";
import { useAuth } from "@/app/context/AuthContext";
import { where } from "firebase/firestore";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { userData } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<Project | undefined>(undefined);
  const [modalType, setModalType] = useState<"create" | "edit">("create");

  const openCreate = () => {
    setModalType("create");
    setEditData(undefined);
    setIsModalOpen(true);
  };

  const openEdit = (project: Project) => {
    setModalType("edit");
    setEditData(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!userData) return;
    if (userData.role === "programmer") {
      const q = where("ownerUid", "==", userData.uid);
      const subscription = getAllProjects(q).subscribe({
        next: (data) => setProjects(data),
        error: (err) => console.error("Error fetching projects:", err),
      });
      return () => subscription.unsubscribe();
    } else if (userData.role === "admin") {
      const subscription = getAllProjects().subscribe({
        next: (data) => setProjects(data),
        error: (err) => console.error("Error fetching projects:", err),
      });
      return () => subscription.unsubscribe();
    }
  }, [userData]);

  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans">
      <div className="border-accent/20 flex items-center justify-between border-b px-8 py-8">
        <div>
          <h2 className="text-foreground text-4xl font-bold">Proyectos</h2>
          <p className="text-accent/80 mt-1">
            Gestiona y visualiza tus proyectos
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-accent text-secondary hover:bg-resalt rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Crear nuevo proyecto"
        >
          <AddCircleIcon className="text-3xl!" />
        </button>
      </div>
      <div className="flex-1 px-8 py-10">
        {projects.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <p className="text-accent/60 text-xl">Aún no tienes proyectos</p>
            <button
              onClick={openCreate}
              className="bg-accent text-secondary hover:bg-resalt mt-6 rounded-full px-6 py-2 font-semibold transition-all duration-300"
            >
              Crear tu primer proyecto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {projects.map((project: Project) => (
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
      />
    </main>
  );
}
