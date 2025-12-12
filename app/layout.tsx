import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Open_Sans,
  Quicksand,
  Roboto_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";
import Footbar from "./ui/Footbar";
import AuthProvider from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const getQuicksand = Quicksand({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const getOpenSands = Open_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-opensans",
});
const getRobotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});
export const metadata: Metadata = {
  title: "Tu Empresa - Descripción clara y con palabras clave",
  description: "Descripción concisa del contenido, máximo 160 caracteres para SEO",
  keywords: ["palabra1", "palabra2", "palabra3"],
  authors: [{ name: "Tu nombre" }],
  openGraph: {
    title: "Tu Empresa",
    description: "Descripción para redes sociales",
    url: "https://tudominio.com",
    siteName: "Tu Empresa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu Empresa",
    description: "Descripción para Twitter",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${getRobotoMono.variable} ${getOpenSands.variable} ${getQuicksand.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footbar />
        </AuthProvider>
      </body>
    </html>
  );
}
