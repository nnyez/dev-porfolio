"use client";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";
import { createProject, updateProject } from "@/app/lib/projects/ProjectsRepository";
import { 
  createTechnology, 
  getTechnologyByName 
} from "@/app/lib/technologies/TechnologiesRepository";
import { ProjectResponseDto, CreateProjectDto, UpdateProjectDto } from "@/app/lib/schema/Project";
import { TechnologyResponseDto } from "@/app/lib/schema/Technology";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

// --- ESQUEMA ZOD ---
const projectSchema = z.object({
  project: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  projectUrl: z.string().min(1, "La URL del proyecto es requerida"),
  imageUrl: z.string().min(1, "La URL de la imagen es requerida"),
  technologyIds: z
    .array(z.number())
    .min(1, "Debe usar al menos una tecnología"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// --- PROPS DEL MODAL ---
interface ModalProjectProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "edit";
  projectData?: ProjectResponseDto;
  onSuccess?: () => void;
}

export default function ModalProject({
  isOpen,
  onClose,
  type,
  projectData,
  onSuccess,
}: ModalProjectProps) {
  const [error, setError] = useState("");
  const [isLoadingTechnology, setIsLoadingTechnology] = useState(false);
  const { userData } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<{ id: number; technology: string }[]>([]);

  // --- CONFIGURACIÓN DEL FORMULARIO ---
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      technologyIds: [],
      project: "",
      description: "",
      projectUrl: "",
      imageUrl: "",
    },
  });

  // --- USE WATCH PARA EL ARRAY ---
  const technologyIds = useWatch({
    control,
    name: "technologyIds",
    defaultValue: [],
  });

  // --- EFECTO PARA CARGAR DATOS O LIMPIAR ---
  useEffect(() => {
    if (isOpen) {
      if (type === "edit" && projectData) {
        const techs = projectData.technologies.map((t) => ({
          id: t.id,
          technology: t.technology,
        }));
        setSelectedTechnologies(techs);
        reset({
          project: projectData.project,
          description: projectData.description,
          projectUrl: projectData.projectUrl,
          imageUrl: projectData.imageUrl,
          technologyIds: techs.map((t) => t.id),
        });
      } else {
        reset({
          project: "",
          description: "",
          projectUrl: "",
          imageUrl: "",
          technologyIds: [],
        });
        setSelectedTechnologies([]);
      }
      setError("");
    }
  }, [isOpen, type, projectData, reset]);

  // --- MANEJADORES DE TECNOLOGÍAS ---
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = inputValue.trim();
      if (!value) return;

      // Verificar si ya existe en el array
      if (selectedTechnologies.some((tech) => tech.technology.toLowerCase() === value.toLowerCase())) {
        setError("Esta tecnología ya está agregada");
        return;
      }

      setIsLoadingTechnology(true);
      setError("");

      try {
        // 1. Intentar obtener la tecnología existente
        const getTechSub = getTechnologyByName(value).subscribe({
          next: (existingTech) => {
            // Si es null, la tecnología no existe, crear nueva
            if (existingTech === null) {
              const createTechSub = createTechnology({ technology: value }).subscribe({
                next: (newTech) => {
                  const newSelectedTechs = [
                    ...selectedTechnologies,
                    { id: newTech.id, technology: newTech.technology },
                  ];
                  setSelectedTechnologies(newSelectedTechs);
                  setValue(
                    "technologyIds",
                    newSelectedTechs.map((t) => t.id),
                    { shouldValidate: true }
                  );
                  setInputValue("");
                  setIsLoadingTechnology(false);
                },
                error: (createError) => {
                  console.error("Error creating technology:", createError);
                  setError("Error al crear la tecnología");
                  setIsLoadingTechnology(false);
                },
              });
            } else {
              // Tecnología existe, agregarla
              const newSelectedTechs = [
                ...selectedTechnologies,
                { id: existingTech.id, technology: existingTech.technology },
              ];
              setSelectedTechnologies(newSelectedTechs);
              setValue(
                "technologyIds",
                newSelectedTechs.map((t) => t.id),
                { shouldValidate: true }
              );
              setInputValue("");
              setIsLoadingTechnology(false);
            }
          },
          error: (err) => {
            // Error real al obtener la tecnología
            console.error("Error obtaining technology:", err);
            setError("Error al obtener la tecnología");
            setIsLoadingTechnology(false);
          },
        });
      } catch (err) {
        console.error("Error processing technology:", err);
        setError("Error al procesar la tecnología");
        setIsLoadingTechnology(false);
      }
    }
  };

  const removeTech = (techIdToRemove: number) => {
    const newSelectedTechs = selectedTechnologies.filter((tech) => tech.id !== techIdToRemove);
    setSelectedTechnologies(newSelectedTechs);
    setValue(
      "technologyIds",
      newSelectedTechs.map((t) => t.id),
      { shouldValidate: true }
    );
  };

  // --- SUBMIT ---
  const onSubmit = (data: ProjectFormData) => {
    setError("");

    try {
      const userId = userData?.auth?.userId || 0;

      if (type === "create") {
        const createDto: CreateProjectDto = {
          project: data.project,
          description: data.description,
          projectUrl: data.projectUrl,
          imageUrl: data.imageUrl,
          technologyIds: data.technologyIds,
        };

        const action$ = createProject(userId, createDto);

        action$.subscribe({
          next: () => {
            console.log("Proyecto creado con éxito");
            onClose();
            onSuccess?.();
          },
          error: (err) => {
            console.error("Error creating project:", err);
            setError(err.message || "Error al crear el proyecto");
          },
        });
      } else {
        const updateDto: UpdateProjectDto = {
          project: data.project,
          description: data.description,
          projectUrl: data.projectUrl,
          imageUrl: data.imageUrl,
          technologyIds: data.technologyIds,
        };

        const action$ = updateProject(projectData?.id || 0, updateDto);

        action$.subscribe({
          next: () => {
            console.log("Proyecto actualizado con éxito");
            onClose();
            onSuccess?.();
          },
          error: (err) => {
            console.error("Error updating project:", err);
            setError(err.message || "Error al actualizar el proyecto");
          },
        });
      }
    } catch (err: any) {
      console.error("Error in onSubmit:", err);
      setError(err.message || "Error al guardar el proyecto");
    }
  };

  // --- SI NO ESTÁ ABIERTO, NO RENDERIZAR NADA ---
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-secondary border border-accent/20 p-4 sm:p-6 md:p-8 shadow-2xl">
        {/* Encabezado */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {type === "create" ? "Nuevo Proyecto" : "Editar Proyecto"}
            </h2>
            <p className="text-accent/80 mt-1 text-xs sm:text-sm">Completa los detalles del proyecto</p>
          </div>
          <button
            onClick={onClose}
            className="text-accent hover:text-resalt transition-colors text-2xl md:text-3xl font-bold shrink-0"
          >
            ×
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
          {/* Nombre del Proyecto */}
          <div>
            <label
              htmlFor="project"
              className="block text-xs sm:text-sm font-semibold text-foreground mb-2"
            >
              Nombre del proyecto
            </label>
            <input
              type="text"
              id="project"
              {...register("project")}
              className="w-full rounded-lg border-2 border-resalt bg-primary px-4 py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="Nombre del proyecto"
            />
            {errors.project && (
              <p className="mt-2 text-xs text-error font-medium">{errors.project.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs sm:text-sm font-semibold text-foreground mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className="w-full rounded-lg border-2 border-resalt bg-primary px-4 py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none"
              placeholder="Describe tu proyecto..."
            />
            {errors.description && (
              <p className="mt-2 text-xs text-error font-medium">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* URL Repositorio */}
          {/* URL del Proyecto */}
          <div>
            <label
              htmlFor="projectUrl"
              className="block text-xs sm:text-sm font-semibold text-foreground mb-2"
            >
              URL del proyecto
            </label>
            <input
              type="text"
              id="projectUrl"
              {...register("projectUrl")}
              className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="https://github.com/..."
            />
            {errors.projectUrl && (
              <p className="mt-1 sm:mt-2 text-xs text-error font-medium">
                {errors.projectUrl.message}
              </p>
            )}
          </div>

          {/* URL de la Imagen */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-xs sm:text-sm font-semibold text-foreground mb-2"
            >
              URL de la imagen
            </label>
            <input
              type="text"
              id="imageUrl"
              {...register("imageUrl")}
              className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="https://..."
            />
            {errors.imageUrl && (
              <p className="mt-1 sm:mt-2 text-xs text-error font-medium">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Tecnologías (Tag Input) */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              Tecnologías Usadas
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoadingTechnology}
              placeholder="Escribe una tecnología y presiona Enter..."
              className="w-full rounded-lg border-2 border-resalt bg-primary px-4 py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-50"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedTechnologies.map((tech) => (
                <span
                  key={tech.id}
                  className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-2 text-sm font-medium text-foreground"
                >
                  {tech.technology}
                  <button
                    type="button"
                    onClick={() => removeTech(tech.id)}
                    className="ml-1 text-accent hover:text-resalt transition-colors font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.technologyIds && (
              <p className="mt-2 text-xs text-error font-medium">
                {errors.technologyIds.message}
              </p>
            )}
          </div>

          {/* Errores */}
          {error && (
            <div className="rounded-lg bg-error/10 border-2 border-error/40 p-4 text-sm text-error font-medium">
              {error}
            </div>
          )}

          {/* Botones de Acción */}
          <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-accent/20">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-accent/30 bg-transparent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent/10 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoadingTechnology}
              className="rounded-lg bg-accent text-secondary px-6 py-3 text-sm font-semibold hover:bg-resalt transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Guardando..." : "Guardar Proyecto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
