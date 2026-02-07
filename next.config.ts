/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizado para Vercel (no usar output: 'export')

  // Optimizar source maps en desarrollo
  productionBrowserSourceMaps: false,

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.lh.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nnyez.github.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-porfolio-theta.vercel.app",
        pathname: "/**",
      },
      // Otros servicios comunes
      {
        protocol: "https",
        hostname: "imgur.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh.google.com",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
    // Permitir URLs sin optimización para servicios con CORS restrictivos
    dangerouslyAllowSVG: true,
  },

  // Headers para mejor caché
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

module.exports = nextConfig;
