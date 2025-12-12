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
    <header className="grid grid-cols-3 items-center px-10 py-5">
      <div className="font-quicksand flex">
        <h3 className="hover:text-resalt transform transition-all duration-100 ease-out hover:scale-150 hover:font-bold">
          nnyez
        </h3>
      </div>
      <nav className="flex justify-center gap-x-6">{Navigation(false)}</nav>
      <div>
        {user || loading ? (
          <div className="flex items-center gap-4">
            <span>Hola, {user?.displayName || user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-x-5">
            <SignUpButton text="Sign Up" href="/auth/register" />
            <SignUpButton text="Sign In" href="/auth/login" />
          </div>
        )}
      </div>{" "}
    </header>
  );
}
