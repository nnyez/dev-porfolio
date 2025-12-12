"use client";
import { updateUserData } from "@/app/lib/firebaseRepository";
import { AppUser, UserProgrammer } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { ErrorSpan } from "./ErrorSpan";

const userProfileSchema = z.object({
  displayName: z.string().min(1, "Display Name is required"),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().optional().or(z.literal("")),
  photoURL: z.string().url("Invalid URL").optional().or(z.literal("")),
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
  canEdit=true,
}: {
  userData: AppUser;
  canEdit?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

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
      photoURL: "",
      title: "",
      bio: "",
      experienceYears: 0,
    },
  });

  useEffect(() => {
    if (userData?.role === "programmer" || userData?.role === "admin") {
      const user = userData as UserProgrammer;

      reset({
        displayName: user?.displayName,
        email: user?.email,
        phoneNumber: user?.phoneNumber || "",
        photoURL: user?.photoURL || "",
        title: user?.title,
        experienceYears: user?.experienceYears,
        bio: user?.bio,
      });
    } else if (userData) {
      reset({
        displayName: userData?.displayName,
        email: userData?.email,
        phoneNumber: userData?.phoneNumber || "",
        photoURL: userData?.photoURL || "",
      });
    }
  }, [userData, reset]);

  const handleSubmitProfile = (data: UserProfileData) => {
    console.log("Submitting profile data:", data);

    const action$ = updateUserData(userData!.uid, data);

    action$.subscribe({
      next: (result) => {
        if (result.success) {
          console.log("Profile updated successfully");
          setIsEditing(false);
        } else {
          setFirebaseError(result.message || "Error updating profile");
        }
      },
      error: (err) => {
        console.error("Error updating profile:", err);
        setFirebaseError("Error updating profile");
      },
    });
  };

  return (

    <form
      onSubmit={handleSubmit(handleSubmitProfile)}
      className={`bg-secondary border border-accent/20 rounded-2xl p-8 shadow-lg w-full ${
        userData?.role === "programmer" || userData?.role === "admin"
          ? "grid grid-cols-1 md:grid-cols-2"
          : "grid grid-cols-1"
      } gap-6`}
    >
      {/* Display Name */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="displayName">
          Nombre
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("displayName")}
          type="text"
          id="displayName"
          placeholder="Tu nombre"
          className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {errors.displayName && (
          <p className="mt-2 text-xs text-red-400">{errors.displayName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="email">
          Email
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("email")}
          type="email"
          id="email"
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="phoneNumber">
          Teléfono
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("phoneNumber")}
          type="tel"
          id="phoneNumber"
          placeholder="+1 (555) 000-0000"
          className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {errors.phoneNumber && (
          <p className="mt-2 text-xs text-red-400">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Photo URL */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="photoURL">
          Foto URL
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("photoURL")}
          type="url"
          id="photoURL"
          placeholder="https://..."
          className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        />
        {errors.photoURL && (
          <p className="mt-2 text-xs text-red-400">{errors.photoURL.message}</p>
        )}
      </div>

      {/* Programmer/Admin Fields */}
      {userData?.role === "programmer" || userData?.role === "admin" ? (
        <>
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="title">
              Título
            </label>
            <input
              disabled={!isEditing || !canEdit}
              {...register("title")}
              type="text"
              id="title"
              placeholder="e.g., Full Stack Developer"
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {errors.title && (
              <p className="mt-2 text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Experience Years */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="experienceYears">
              Años de Experiencia
            </label>
            <input
              disabled={!isEditing || !canEdit}
              {...register("experienceYears", { valueAsNumber: true })}
              type="number"
              id="experienceYears"
              placeholder="0"
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
            {errors.experienceYears && (
              <p className="mt-2 text-xs text-red-400">{errors.experienceYears.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-foreground mb-2" htmlFor="bio">
              Biografía
            </label>
            <textarea
              disabled={!isEditing || !canEdit}
              {...register("bio")}
              id="bio"
              rows={4}
              placeholder="Cuéntanos sobre ti..."
              className="w-full rounded-lg border border-accent/30 bg-primary px-4 py-3 text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed resize-none"
            />
            {errors.bio && (
              <p className="mt-2 text-xs text-red-400">{errors.bio.message}</p>
            )}
          </div>
        </>
      ) : null}

      {/* Error Message */}
      {firebaseError && (
        <div className="md:col-span-2 rounded-lg bg-red-500/20 border border-red-500/40 p-4 text-sm text-red-300">
          {firebaseError}
        </div>
      )}

      {/* Action Buttons */}
      {!canEdit ? null : (
        <div className={`flex gap-3 pt-4 border-t border-accent/20 ${userData?.role === "programmer" || userData?.role === "admin" ? "md:col-span-2" : ""}`}>
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-lg border border-accent/30 bg-transparent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent/10 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-accent text-secondary px-6 py-3 text-sm font-semibold hover:bg-resalt transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary border-t-transparent"></div>
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
              className="w-full rounded-lg bg-accent text-secondary px-6 py-3 text-sm font-semibold hover:bg-resalt transition-all"
            >
              Editar Perfil
            </button>
          )}
        </div>
      )}
    </form>
  );
}
