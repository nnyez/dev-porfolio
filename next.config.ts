/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... otras configuraciones si las tienes

  images: {
    // Aquí es donde defines los patrones de dominio permitidos
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com" ,
      },
  
      {
        protocol: "https",
        hostname: "nnyez.github.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },

};

module.exports = nextConfig;
