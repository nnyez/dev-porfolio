"use client";
import Navigation from "./shared/Navigation";
import SignUpButton from "./shared/SignUpButton";
import { useAuth } from "../lib/context/Auth/AuthContext";
import { logout } from "../lib/auth/AuthService";

export default function Navbar() {
  const { user  } = useAuth();
  const handleLogout = async () => {
    logout();
  };
  return (
    <header className="bg-secondary border-accent/10 flex flex-col items-center gap-4 border-b px-4 py-4 sm:px-8 md:grid md:grid-cols-3 md:gap-0 md:px-10 md:py-5">
      <div className="font-quicksand flex w-full text-center md:w-auto md:text-left">
        <h3 className="hover:text-resalt transform text-xl transition-all duration-100 ease-out hover:scale-110 hover:font-bold sm:text-2xl md:hover:scale-150">
          nnyez
        </h3>
      </div>
      <nav className="flex flex-wrap justify-center gap-x-3 sm:gap-x-4 md:gap-x-6">
        {Navigation(false)}
      </nav>
      <div className="w-full md:w-auto">
        {user ? (
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-right md:justify-end">
            <span className="truncate text-sm sm:text-base">
              Hola, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="w-full rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700 sm:w-auto sm:text-base"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row sm:gap-3 md:justify-end md:gap-x-5">
            <SignUpButton text="Sign Up" href="/auth/register" />
            <SignUpButton text="Sign In" href="/auth/login" />
          </div>
        )}
      </div>
    </header>
  );
}
