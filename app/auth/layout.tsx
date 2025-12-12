"use client";
import { ReactNode } from "react";

export default function Auth({ children }: { children: ReactNode }) {
  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans justify-center items-center">
      {children}
    </main>
  );
}
