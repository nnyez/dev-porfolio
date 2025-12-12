import NavLink from "./Navlink";
import { useAuth } from "@/app/context/AuthContext";

export default function Navigation(v: boolean) {
  const { user } = useAuth();
  return (
    <div
      className={`${
        v
          ? "flex flex-col justify-center gap-y-5"
          : "flex justify-center gap-x-6"
      }`}
    >
      {/* Home */}
      <NavLink
        route="/"
        text="Home"
        className="hover:text-accent hover:scale-130"
      />

      {/* Proyectos */}
      <NavLink
        route="/projects"
        text="Proyectos"
        className="hover:text-accent hover:scale-130"
      />

      {/* Dashboard (Renderizado condicional) */}
      {user && (
        <NavLink
          route="/dashboard"
          text="Dashboard"
          className="hover:text-accent hover:scale-130"
        />
      )}
    </div>
  );
}
