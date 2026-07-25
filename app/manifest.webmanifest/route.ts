/** Manifest del sitio (instalación en móvil y icono de app). */
export function GET() {
  const manifest = {
    name: "Dos Nodos",
    short_name: "Dos Nodos",
    description: "Conectamos tecnología con personas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9333EA",
    lang: "es",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "maskable" },
    ],
  }

  return new Response(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
