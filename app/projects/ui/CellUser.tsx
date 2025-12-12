"use client";
import { UserProgrammer } from "@/app/lib/types";
import Image from "next/image";


export function CellUser({
  programmer,
  onSelect,
  selected,
}: {
  programmer: UserProgrammer;
  onSelect: (programmer: UserProgrammer) => void;
  selected: boolean;
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(programmer);
      }}
      className={`group cursor-pointer bg-secondary border border-accent/20 rounded-2xl p-6 shadow-lg transition-all duration-300 ${
        selected
          ? "ring-2 ring-accent border-accent/50 shadow-lg scale-105"
          : "hover:shadow-xl hover:border-accent/40 hover:-translate-y-1"
      }`}
    >
      {/* Foto */}
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl">
        <Image
          src={programmer.photoURL || "/profile.svg"}
          fill
          alt={programmer.displayName || "Profile Picture"}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Información */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-foreground line-clamp-2">
          {programmer.displayName}
        </h3>
        <p className="text-sm text-accent/80 mt-1 capitalize font-semibold">
          {programmer.role}
        </p>
        
        {programmer.title && (
          <p className="text-accent/70 text-xs mt-2">{programmer.title}</p>
        )}

        {programmer.bio && (
          <p className="text-accent/60 text-xs mt-2 line-clamp-2">
            {programmer.bio}
          </p>
        )}

        {/* Experiencia */}
        {programmer.experienceYears !== undefined && (
          <div className="mt-3 inline-block bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-full text-xs font-semibold">
            {programmer.experienceYears} años exp.
          </div>
        )}

        {/* Lenguajes */}
        {programmer.programmingLanguages && programmer.programmingLanguages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {programmer.programmingLanguages.map((lang) => (
              <span
                key={lang}
                className="bg-accent/20 border border-accent/40 text-accent px-2 py-1 rounded-full text-xs font-semibold"
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Indicador de selección */}
      {selected && (
        <div className="mt-4 w-full bg-accent text-secondary py-2 rounded-lg text-xs font-bold text-center">
          ✓ Seleccionado
        </div>
      )}
    </div>
  );
}
