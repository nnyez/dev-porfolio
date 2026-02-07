"use client";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import Navigation from "./shared/Navigation";
import SignUpButton from "./shared/SignUpButton";
import { auth } from "@/firebase.config";
import Link from "next/link";

export default function Navbar() {
  const { user, loading } = useAuth();
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <header className="flex flex-col md:grid md:grid-cols-3 items-center gap-4 md:gap-0 px-4 sm:px-8 md:px-10 py-4 md:py-5 bg-secondary border-b border-accent/10">
      <div className="font-quicksand flex text-center md:text-left w-full md:w-auto">
        <h3 className="text-xl sm:text-2xl hover:text-resalt transform transition-all duration-100 ease-out hover:scale-110 md:hover:scale-150 hover:font-bold">
          nnyez
        </h3>
      </div>
      <nav className="flex justify-center gap-x-3 sm:gap-x-4 md:gap-x-6 flex-wrap">{Navigation(false)}</nav>
      <div className="w-full md:w-auto">
        {user || loading ? (
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-2 sm:gap-4 text-center sm:text-right">
            <span className="text-sm sm:text-base truncate">Hola, {user?.displayName || user?.email}</span>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto rounded bg-red-500 px-3 py-1 text-sm sm:text-base text-white hover:bg-red-700 transition-colors"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-2 sm:gap-3 md:gap-x-5 w-full">
            <SignUpButton text="Sign Up" href="/auth/register" />
            <SignUpButton text="Sign In" href="/auth/login" />
          </div>
        )}
      </div>
    </header>
  );
}
