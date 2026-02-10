"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export function GridCard({
  children,
  src,
  chips,
  srcRepo,
  displayName,
  className
}: {
  children?: ReactNode;
  className?: string;
  src: string;
  chips: string[];
  classNameImg?: string;
  srcRepo: string;
  displayName?: string;
}) {
  const router = useRouter();
  
  return (
    <div className={`group bg-secondary border border-accent/20 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/40 flex flex-col h-full ${className || ""}`}>
      {/* Imagen */}
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-primary/50">
        <Image
          src={src}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          alt={src}
          onClick={() => {
            router.push(srcRepo);
          }}
        />
        
        {/* Overlay con información */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 md:p-4">
          {/* Desarrollador */}
          {displayName && (
            <div className="text-right">
              <span className="inline-block bg-accent text-secondary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                {displayName}
              </span>
            </div>
          )}
          
          {/* Tecnologías */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {chips.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="inline-flex items-center gap-1 rounded-full bg-accent/20 border border-accent/40 px-2 py-1 text-xs md:text-sm font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-4 md:p-6 flex flex-col gap-3">
        <div className="text-sm md:text-base">
          {children}
        </div>
        
        {/* Botón de acción */}
        <button
          onClick={() => router.push(srcRepo)}
          className="mt-4 md:mt-6 w-full bg-accent text-secondary hover:bg-resalt py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base"
        >
          Ver Proyecto
        </button>
      </div>
    </div>
  );
}
