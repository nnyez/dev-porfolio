"use client";
import { useAuth } from "@/app/context/AuthContext";
import { addProject, updateProject } from "@/app/lib/firebaseRepository";
import { Project } from "@/app/lib/types";
import { db } from "@/firebase.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc } from "firebase/firestore";
import { useState, useEffect } from "react"; // <--- Agregamos useEffect
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

// --- ESQUEMA ZOD ---
const projectSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  projectUrl: z.url("Debe ser una URL válida"), // Cambiado a string().url() para mejor compatibilidad
  imageUrl: z.url("Debe ser una URL válida"),
  technologiesUsed: z
    .array(z.string())
    .min(1, "Debe usar al menos una tecnología"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

// --- PROPS DEL MODAL ---
interface ModalProjectProps {
  isOpen: boolean; // Controla si se ve
  onClose: () => void; // Función para cerrar
  type: "create" | "edit";
  projectData?: Project; // Datos para editar
}

export default function ModalProject({
  isOpen,
  onClose,
  type,
  projectData,
}: ModalProjectProps) {
  const [firebaseError, setFirebaseError] = useState("");
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState("");

  // --- CONFIGURACIÓN DEL FORMULARIO ---
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset, // <--- Importante para limpiar el form
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      technologiesUsed: [],
      name: "",
      description: "",
      projectUrl: "",
      imageUrl: "",
    },
  });

  // --- USE WATCH PARA EL ARRAY ---
  const technologies = useWatch({
    control,
    name: "technologiesUsed",
    defaultValue: [],
  });

  // --- EFECTO PARA CARGAR DATOS O LIMPIAR ---
  useEffect(() => {
    if (isOpen) {
      if (type === "edit" && projectData) {
        // Si es edición, llenamos el form con los datos
        reset({
          name: projectData.name,
          description: projectData.description,
          projectUrl: projectData.projectUrl,
          imageUrl: projectData.imageUrl,
          technologiesUsed: projectData.technologiesUsed,
        });
      } else {
        // Si es crear, limpiamos el form
        reset({
          name: "",
          description: "",
          projectUrl: "",
          imageUrl: "",
          technologiesUsed: [],
        });
      }
    }
  }, [isOpen, type, projectData, reset]);

  // --- MANEJADORES DE TECNOLOGÍAS ---
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = inputValue.trim();
      if (!value) return;

      if (!technologies.includes(value)) {
        setValue("technologiesUsed", [...technologies, value], {
          shouldValidate: true,
        });
      }
      setInputValue("");
    }
  };

  const removeTech = (techToRemove: string) => {
    const newTechs = technologies.filter((tech) => tech !== techToRemove);
    setValue("technologiesUsed", newTechs, { shouldValidate: true });
  };

  // --- SUBMIT ---
  const onSubmit = (data: ProjectFormData) => {
    let uid = "";
    setFirebaseError("");

    // 1. Determinar ID
    if (type === "create") {
      const newDoc = doc(collection(db, "projects"));
      uid = newDoc.id;
    } else {
      uid = projectData?.id || "";
    }

    // 2. Preparar Objeto
    const project: Project = {
      id: uid,
      ownerUid: user?.uid || "",
      ...data, // Spread operator para llenar el resto de campos
    };

    // 3. Ejecutar Observable
    const action$ =
      type === "create" ? addProject(project) : updateProject(uid, project);

    action$.subscribe({
      next: () => {
        console.log("Guardado con éxito");
        onClose(); // <--- Cerramos el modal al terminar
      },
      error: (err) => setFirebaseError(err.message),
    });
  };

  // --- SI NO ESTÁ ABIERTO, NO RENDERIZAR NADA ---
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-secondary border border-accent/20 p-8 shadow-2xl">
        {/* Encabezado */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              {type === "create" ? "Nuevo Proyecto" : "Editar Proyecto"}
            </h2>
            <p className="text-accent/80 mt-1">Completa los detalles del proyecto</p>
          </div>
          <button
            onClick={onClose}
            className="text-accent hover:text-resalt transition-colors text-3xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* URL Proyecto */}
          <div>
            <label
              htmlFor="projectUrl"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              URL del proyecto
            </label>
            <input
              type="text"
              id="projectUrl"
              {...register("projectUrl")}
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="https://..."
            />
            {errors.projectUrl && (
              <p className="mt-2 text-xs text-red-400">
                {errors.projectUrl.message}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Nombre del proyecto
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="Nombre del proyecto"
            />
            {errors.name && (
              <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all resize-none"
              placeholder="Describe tu proyecto..."
            />
            {errors.description && (
              <p className="mt-2 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* URL Imagen */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              URL de la imagen
            </label>
            <input
              type="text"
              id="imageUrl"
              {...register("imageUrl")}
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
              placeholder="https://..."
            />
            {errors.imageUrl && (
              <p className="mt-2 text-xs text-red-400">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Tecnologías (Tag Input) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Tecnologías Usadas
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe una tecnología y presiona Enter..."
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/40 px-4 py-2 text-sm font-medium text-accent"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 text-accent hover:text-resalt transition-colors font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.technologiesUsed && (
              <p className="mt-2 text-xs text-red-400">
                {errors.technologiesUsed.message}
              </p>
            )}
          </div>

          {/* Errores de Firebase */}
          {firebaseError && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/40 p-4 text-sm text-red-300">
              {firebaseError}
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
              disabled={isSubmitting}
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
