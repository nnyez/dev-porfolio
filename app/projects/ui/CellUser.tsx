"use client";
import { AppUser } from "@/app/lib/types";
import OptimizedImage from "@/app/ui/shared/OptimizedImage";

export function CellUser({
  programmer,
  onSelect,
  selected,
}: {
  programmer: AppUser;
  onSelect: (programmer: AppUser) => void;
  selected: boolean;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(programmer);
      }}
      className={`group bg-secondary border-accent/20 cursor-pointer rounded-2xl border p-6 shadow-lg transition-all duration-300 ${
        selected
          ? "ring-accent border-accent/50 scale-105 shadow-lg ring-2"
          : "hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      {/* Foto */}
      <div className="relative mx-auto mb-4 h-32 w-32 overflow-hidden rounded-xl">
        <OptimizedImage
          src={programmer.photoURL ? programmer.photoURL : "/profile.svg"}
          alt={programmer.displayName || "Profile Picture"}
          fill
          objectFit="fill"
        />
      </div>

      {/* Información */}
      <div className="text-center">
        <h3 className="text-foreground line-clamp-2 text-lg font-bold">
          {programmer.displayName}
        </h3>
        <p className="text-accent/80 mt-1 text-sm font-semibold capitalize">
          {programmer.role}
        </p>

        {programmer.title && (
          <p className="text-accent/70 mt-2 text-xs">{programmer.title}</p>
        )}

        {programmer.bio && (
          <p className="text-accent/60 mt-2 line-clamp-2 text-xs">
            {programmer.bio}
          </p>
        )}

        {/* Experiencia */}
        {programmer.experienceYears !== undefined && (
          <div className="bg-accent/20 border-accent/40 text-accent mt-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold">
            {programmer.experienceYears} años exp.
          </div>
        )}

        {/* Lenguajes */}
        {programmer.programmingLanguages &&
          programmer.programmingLanguages.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {programmer.programmingLanguages.map((lang) => (
                <span
                  key={lang}
                  className="bg-accent/20 border-accent/40 text-accent rounded-full border px-2 py-1 text-xs font-semibold"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
      </div>

      {/* Indicador de selección */}
      {selected && (
        <div className="bg-accent text-secondary mt-4 w-full rounded-lg py-2 text-center text-xs font-bold">
          ✓ Seleccionado
        </div>
      )}
    </div>
  );
}
