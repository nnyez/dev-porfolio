"use client";
import { deleteProject } from "@/app/lib/projects/ProjectsRepository";
import { ProjectResponseDto } from "@/app/lib/schema/Project";
import Image from "next/image";

export function CellProject({
  project,
  modalOpen,
}: {
  project: ProjectResponseDto;
  modalOpen?: () => void;
}) {
  const onDelete = (projectId: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      const sub = deleteProject(projectId);
      sub.subscribe({
        next: (res) => {
          console.log("Project deleted:", res);
          window.location.reload(); // Recargar la página para actualizar la lista
        },
        error: (err) => {
          console.error("Error deleting project:", err);
          alert("Error al eliminar el proyecto");
        },
      });
    }
  };

  // Usar la URL de imagen del proyecto o una imagen por defecto
  const displayImageUrl = project.imageUrl || "https://via.placeholder.com/400x400?text=Proyecto";

  return (
    <div className="group from-alt via-primary to-secondary bg-linear-to-br rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-accent/10">
      <div className="relative aspect-square overflow-hidden bg-primary">
        <Image
          src={displayImageUrl}
          fill
          alt={project.project}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x400?text=Proyecto";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col h-40">
        <h3 className="text-xl font-bold text-foreground line-clamp-1">{project.project}</h3>
        <p className="text-accent/80 text-sm mt-1 flex-1 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mt-2 mb-3">
          {project.technologies && project.technologies.slice(0, 2).map((tech: any) => (
            <span
              key={tech.id}
              className="inline-block bg-accent/20 text-accent text-xs px-2 py-1 rounded"
            >
              {tech.technology || tech.name}
            </span>
          ))}
          {project.technologies && project.technologies.length > 2 && (
            <span className="inline-block bg-accent/20 text-accent text-xs px-2 py-1 rounded">
              +{project.technologies.length - 2}
            </span>
          )}
        </div>
        {modalOpen ? (
          <div className="flex gap-3 mt-4 pt-3 border-t border-accent/20">
            <button
              onClick={modalOpen}
              className="flex-1 bg-accent text-secondary hover:bg-resalt py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="flex-1 bg-accent/20 text-accent hover:bg-red-500/20 hover:text-red-400 py-2 rounded-lg font-semibold transition-all duration-200 text-sm"
            >
              Eliminar
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
