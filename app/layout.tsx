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
  title: "nnyez - El portafolio de los desarrolladores",
  description: "Plataforma que recopila portafolios de programadores y facilita asesorías con clientes.",
  keywords: ["portafolio", "desarrolladores", "proyectos", "asesoría", "programación"],
  authors: [{ name: "nnyez" }],
  openGraph: {
    title: "nnyez - Encuentra a tu desarrollador ideal",
    description: "Explora los mejores portafolios y conecta con talento tech.",
    url: "", // <--- Pon aquí tu URL real de GitHub Pages cuando la tengas
    siteName: "nnyez",
    images: [
      {
        url: "/port.png", // Puedes crear una imagen de 1200x630px en /public para cuando compartan tu link
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "nnyez - El portafolio de los desarrolladores", // <--- Corregido
    description: "Encuentra y conecta con los mejores programadores.", // <--- Corregido
    images: ["/port.png"], // Opcional
  },
  // Si usas la Opción 1 (automática), borra este bloque de icons:
  /* icons: {
    icon: "/icon.png",
  }, */
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
