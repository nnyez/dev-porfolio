import type { Metadata } from 'next';
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: 'Autenticación - ProyectApp',
  description: 'Inicia sesión o crea tu cuenta profesional en ProyectApp para conectar con programadores y clientes',
  robots: { index: false }, // No indexar páginas de auth
};

export default function Auth({ children }: { children: ReactNode }) {
  return (
    <main className="bg-primary flex min-h-screen flex-col font-sans justify-center items-center">
      {children}
    </main>
  );
}
