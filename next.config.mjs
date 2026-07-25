/** @type {import('next').NextConfig} */
const nextConfig = {
  // La validación de tipos corre en el build: `tsc --noEmit` pasa limpio y así
  // un error de tipos no llega a producción.
  typescript: {
    ignoreBuildErrors: false,
  },
  // Optimización de imágenes activa (Vercel): el logo pasa de ~152 KB PNG a
  // unos pocos KB en WebP/AVIF según el navegador.
  images: {
    formats: ["image/avif", "image/webp"],
    // Hosts permitidos para los pantallazos de proyectos. Se listan de forma
    // explícita: un comodín abierto permitiría que cualquiera use el
    // optimizador de imágenes del sitio.
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "dosnodos.com.co" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
