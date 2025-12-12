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
  // 👇 Aquí es donde ocurre la magia. 
  // Next.js usará este dominio para completar la ruta de tu imagen "/port.jpeg"
  metadataBase: new URL("https://dev-porfolio-git-main-nnyezs-projects.vercel.app"),

  title: "nnyez - El portafolio de los desarrolladores",
  description: "Plataforma que recopila portafolios de programadores y facilita asesorías con clientes.",
  keywords: ["portafolio", "desarrolladores", "proyectos", "asesoría", "programación"],
  authors: [{ name: "nnyez" }],

  openGraph: {
    title: "nnyez - Encuentra a tu desarrollador ideal",
    description: "Explora los mejores portafolios y conecta con talento tech.",
    url: "/", 
    siteName: "nnyez",
    images: [
      {
        url: "/port.jpeg", // Gracias al metadataBase, esto se leerá como: https://.../port.jpeg
        width: 1200,
        height: 630,
        alt: "Vista previa del portafolio nnyez",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "nnyez - El portafolio de los desarrolladores",
    description: "Encuentra y conecta con los mejores programadores.",
    images: ["/port.jpeg"], 
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
