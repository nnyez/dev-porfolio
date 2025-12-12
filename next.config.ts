/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizado para Vercel (no usar output: 'export')

  images: {
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
      {
        protocol: "https",
        hostname: "dev-porfolio-theta.vercel.app",
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
