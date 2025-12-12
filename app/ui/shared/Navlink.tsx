"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  route: string;
  text: string;
  className?: string; // Hacemos className opcional
}

export default function NavLink({ route, text, className = "" }: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    route === "/" ? pathname === "/" : pathname.startsWith(route);

  const activeClass = isActive
    ? "text-accent font-bold scale-110" // Estilo cuando está activo
    : `text-gray-500 ${className}`; // Estilo normal + tus clases hover

  return (
    <Link
      href={route}
      className={`font-quicksand transition-all duration-200 ease-in-out ${activeClass}`}
    >
      {text}
    </Link>
  );
}
