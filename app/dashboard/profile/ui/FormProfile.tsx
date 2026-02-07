"use client";
import { updateUserData } from "@/app/lib/firebaseRepository";
import { AppUser } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
      const user = userData as AppUser;

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
      className={`bg-secondary border-2 border-accent/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl w-full ${
        userData?.role === "programmer" || userData?.role === "admin"
          ? "grid grid-cols-1 md:grid-cols-2"
          : "grid grid-cols-1"
      } gap-4 md:gap-6`}
    >
      {/* Display Name */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="displayName">
          Nombre
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("displayName")}
          type="text"
          id="displayName"
          placeholder="Tu nombre"
          className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
        />
        {errors.displayName && (
          <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.displayName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="email">
          Email
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("email")}
          type="email"
          id="email"
          placeholder="tu@email.com"
          className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
        />
        {errors.email && (
          <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="phoneNumber">
          Teléfono
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("phoneNumber")}
          type="tel"
          id="phoneNumber"
          placeholder="+1 (555) 000-0000"
          className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
        />
        {errors.phoneNumber && (
          <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Photo URL */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="photoURL">
          Foto URL
        </label>
        <input
          disabled={!isEditing || !canEdit}
          {...register("photoURL")}
          type="url"
          id="photoURL"
          placeholder="https://..."
          className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
        />
        {errors.photoURL && (
          <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.photoURL.message}</p>
        )}
      </div>

      {/* Programmer/Admin Fields */}
      {userData?.role === "programmer" || userData?.role === "admin" ? (
        <>
          {/* Title */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="title">
              Título
            </label>
            <input
              disabled={!isEditing || !canEdit}
              {...register("title")}
              type="text"
              id="title"
              placeholder="e.g., Full Stack Developer"
              className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
            />
            {errors.title && (
              <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.title.message}</p>
            )}
          </div>

          {/* Experience Years */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="experienceYears">
              Años de Experiencia
            </label>
            <input
              disabled={!isEditing || !canEdit}
              {...register("experienceYears", { valueAsNumber: true })}
              type="number"
              id="experienceYears"
              placeholder="0"
              className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
            />
            {errors.experienceYears && (
              <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.experienceYears.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2" htmlFor="bio">
              Biografía
            </label>
            <textarea
              disabled={!isEditing || !canEdit}
              {...register("bio")}
              id="bio"
              rows={3}
              placeholder="Cuéntanos sobre ti..."
              className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/50 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60 resize-none"
            />
            {errors.bio && (
              <p className="mt-1 sm:mt-2 text-xs text-error font-medium">{errors.bio.message}</p>
            )}
          </div>
        </>
      ) : null}

      {/* Error Message */}
      {firebaseError && (
        <div className="md:col-span-2 rounded-lg bg-error/10 border-2 border-error/40 p-4 text-sm text-error font-medium">
          {firebaseError}
        </div>
      )}

      {/* Action Buttons */}
      {!canEdit ? null : (
        <div className={`flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-accent/20 ${userData?.role === "programmer" || userData?.role === "admin" ? "md:col-span-2" : ""}`}>
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-lg border border-accent/30 bg-transparent px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-accent hover:bg-accent/10 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-accent text-secondary px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-resalt transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              className="w-full rounded-lg bg-accent text-secondary px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-resalt transition-all"
            >
              Editar Perfil
            </button>
          )}
        </div>
      )}
    </form>
  );
}
