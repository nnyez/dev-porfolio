"use client";
import { updateUserData } from "@/app/lib/deprecated/firebase/firebaseRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { UserProfile } from "@/app/lib/schema/UserProfile";
import { Role } from "@/app/lib/schema/types";
import {
  patchStandardProfile,
  patchDeveloperProfile,
} from "@/app/lib/users/UsersRepository";
import {
  CreateStandardProfileDto,
  UpdateStandardProfileDto,
  PatchStandardProfileDto,
} from "@/app/lib/schema/StandardProfile";
import {
  CreateDeveloperProfileDto,
  UpdateDeveloperProfileDto,
  PatchDeveloperProfileDto,
} from "@/app/lib/schema/DeveloperProfile";
import { useAuth } from "@/app/lib/context/Auth/AuthContext";

const userProfileSchema = z.object({
  displayName: z.string().min(1, "Display Name is required"),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().optional().or(z.literal("")),
  photoUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || z.string().url().safeParse(val).success,
      { message: "Invalid URL" }
    ),
  title: z.string().min(1, "Title is required").optional().or(z.literal("")),
  bio: z.string().min(1, "Bio is required").optional().or(z.literal("")),
  experienceYears: z.coerce
    .number()
    .min(0, "Experience Years must be non-negative")
    .optional(),
});
type UserProfileData = z.infer<typeof userProfileSchema>;

export default function Profile({
  userData,
  canEdit = true,
}: {
  userData: UserProfile;
  canEdit?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const { refreshUserData } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",  
      photoUrl: "",
      title: "",
      bio: "",
      experienceYears: 0,
    },
  });

  useEffect(() => {
    if (
      userData?.auth.rol === Role.PROGRAMMER ||
      userData?.auth.rol === Role.ADMIN
    ) {
      const user = userData as UserProfile;

      reset({
        displayName: user?.auth.name,
        email: user?.auth.email,
        phoneNumber: user?.phoneNumber || "",
        photoUrl: user?.photoUrl || "",
        title: user?.title,
        experienceYears: user?.experienceYears,
        bio: user?.bio,
      });
    } else if (userData) {
      reset({
        displayName: userData?.auth.name,
        email: userData?.auth.email,
        phoneNumber: userData?.phoneNumber || "",
        photoUrl: userData?.photoUrl || "",
      });
    }
  }, [userData, reset]);

  const handleSubmitProfile = (data: UserProfileData) => {
    setFirebaseError("");

    console.log("📝 Datos del formulario recibidos:", data);

    const isProgrammer =
      userData?.auth.rol === Role.PROGRAMMER ||
      userData?.auth.rol === Role.ADMIN;

    try {
      if (isProgrammer) {
        // Crear DTO para Developer Profile - solo con campos que tienen valor
        const developerDto: PatchDeveloperProfileDto = {};
        
        if (data.photoUrl && data.photoUrl.trim()) {
          developerDto.photoUrl = data.photoUrl.trim();
        }
        if (data.phoneNumber && data.phoneNumber.trim()) {
          developerDto.phoneNumber = data.phoneNumber.trim();
        }
        if (data.title && data.title.trim()) {
          developerDto.title = data.title.trim();
        }
        if (data.bio && data.bio.trim()) {
          developerDto.bio = data.bio.trim();
        }
        if (data.experienceYears !== undefined && data.experienceYears > 0) {
          developerDto.experienceYears = data.experienceYears;
        }

        console.log("📤 Enviando DTO Developer:", developerDto);

        // Usar PATCH para actualizar/crear
        patchDeveloperProfile(userData.id, developerDto).subscribe({
          next: async (response) => {
            setIsEditing(false);
            console.log("✅ Perfil DEVELOPER actualizado:", response);
            await refreshUserData();
            // Aquí puedes mostrar un toast de éxito si lo deseas
          },
          error: (error) => {
            console.error("❌ Error al actualizar perfil DEVELOPER:", error);
            setFirebaseError(
              error?.message ||
                "Error al actualizar el perfil. Por favor, intenta de nuevo.",
            );
          },
        });
      } else {
        // Crear DTO para Standard Profile - solo con campos que tienen valor
        const standardDto: PatchStandardProfileDto = {};
        
        if (data.photoUrl && data.photoUrl.trim()) {
          standardDto.photoUrl = data.photoUrl.trim();
        }
        if (data.phoneNumber && data.phoneNumber.trim()) {
          standardDto.phoneNumber = data.phoneNumber.trim();
        }

        console.log("📤 Enviando DTO Standard:", standardDto);

        // Usar PATCH para actualizar/crear
        patchStandardProfile(userData.id, standardDto).subscribe({
          next: async (response) => {
            setIsEditing(false);
            console.log("✅ Perfil STANDARD actualizado:", response);
            await refreshUserData();
            // Aquí puedes mostrar un toast de éxito si lo deseas
          },
          error: (error) => {
            console.error("❌ Error al actualizar perfil STANDARD:", error);
            setFirebaseError(
              error?.message ||
                "Error al actualizar el perfil. Por favor, intenta de nuevo.",
            );
          },
        });
      }
    } catch (err) {
      console.error("❌ Error inesperado:", err);
      setFirebaseError(
        "Error inesperado. Por favor, intenta de nuevo más tarde.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitProfile)}
      className={`bg-secondary border-accent/20 w-full rounded-2xl border-2 p-4 shadow-xl sm:p-6 md:p-8 ${
        userData?.auth.rol === Role.PROGRAMMER ||
        userData?.auth.rol === Role.ADMIN
          ? "grid grid-cols-1 md:grid-cols-2"
          : "grid grid-cols-1"
      } gap-4 md:gap-6`}
    >
        {/* Display Name */}
        <div>
          <label
            className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
            htmlFor="displayName"
          >
            Nombre
          </label>
          <input
            disabled={!isEditing || !canEdit}
            {...register("displayName")}
            type="text"
            id="displayName"
            placeholder="Tu nombre"
            className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
          />
          {errors.displayName && (
            <p className="text-error mt-1 text-xs font-medium sm:mt-2">
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
            htmlFor="email"
          >
            Email
          </label>
          <input
            disabled={!isEditing || !canEdit}
            {...register("email")}
            type="email"
            id="email"
            placeholder="tu@email.com"
            className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
          />
          {errors.email && (
            <p className="text-error mt-1 text-xs font-medium sm:mt-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
            htmlFor="phoneNumber"
          >
            Teléfono
          </label>
          <input
            disabled={!isEditing || !canEdit}
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            placeholder="+1 (555) 000-0000"
            className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
          />
          {errors.phoneNumber && (
            <p className="text-error mt-1 text-xs font-medium sm:mt-2">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label
            className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
            htmlFor="photoUrl"
          >
            Foto URL
          </label>
          <input
            disabled={!isEditing || !canEdit}
            {...register("photoUrl")}
            type="url"
            id="photoUrl"
            placeholder="https://..."
            className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
          />
          {errors.photoUrl && (
            <p className="text-error mt-1 text-xs font-medium sm:mt-2">
              {errors.photoUrl.message}
            </p>
          )}
        </div>

        {/* Programmer/Admin Fields */}
        {userData?.auth.rol === Role.PROGRAMMER ||
        userData?.auth.rol === Role.ADMIN ? (
          <>
            {/* Title */}
            <div>
              <label
                className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
                htmlFor="title"
              >
                Título
              </label>
              <input
                disabled={!isEditing || !canEdit}
                {...register("title")}
                type="text"
                id="title"
                placeholder="e.g., Full Stack Developer"
                className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
              />
              {errors.title && (
                <p className="text-error mt-1 text-xs font-medium sm:mt-2">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Experience Years */}
            <div>
              <label
                className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
                htmlFor="experienceYears"
              >
                Años de Experiencia
              </label>
              <input
                disabled={!isEditing || !canEdit}
                {...register("experienceYears", { valueAsNumber: true })}
                type="number"
                id="experienceYears"
                placeholder="0"
                className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
              />
              {errors.experienceYears && (
                <p className="text-error mt-1 text-xs font-medium sm:mt-2">
                  {errors.experienceYears.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label
                className="text-foreground mb-2 block text-xs font-semibold sm:text-sm"
                htmlFor="bio"
              >
                Biografía
              </label>
              <textarea
                disabled={!isEditing || !canEdit}
                {...register("bio")}
                id="bio"
                rows={3}
                placeholder="Cuéntanos sobre ti..."
                className="border-resalt bg-primary text-foreground placeholder-accent/50 focus:border-accent focus:ring-accent/30 disabled:bg-primary/60 w-full resize-none rounded-lg border-2 px-3 py-2 text-base transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-3"
              />
              {errors.bio && (
                <p className="text-error mt-1 text-xs font-medium sm:mt-2">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </>
        ) : null}

        {/* Error Message */}
        {firebaseError && (
          <div className="bg-error/10 border-error/40 text-error rounded-lg border-2 p-4 text-sm font-medium md:col-span-2">
            {firebaseError}
          </div>
        )}

        {/* Action Buttons */}
        {!canEdit ? null : (
          <div
            className={`border-accent/20 flex flex-col gap-2 border-t pt-3 sm:flex-row sm:gap-3 sm:pt-4 ${userData?.auth.rol === Role.PROGRAMMER || userData?.auth.rol === Role.ADMIN ? "md:col-span-2" : ""}`}
          >
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border-accent/30 text-accent hover:bg-accent/10 flex-1 rounded-lg border bg-transparent px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-3 sm:text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-secondary hover:bg-resalt flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="border-secondary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-accent text-secondary hover:bg-resalt w-full rounded-lg px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-3 sm:text-sm"
              >
                Editar Perfil
              </button>
            )}
          </div>
        )}
      </form>
    );
}
