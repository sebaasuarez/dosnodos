import type { MetadataRoute } from "next"

const SITE = "https://dosnodos.com.co"

/**
 * Permite explícitamente los rastreadores de motores de IA (GEO) además de
 * los buscadores tradicionales, y bloquea el panel de administración.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "Google-Extended",
    "Applebot",
    "Applebot-Extended",
    "MistralAI-User",
    "Bingbot",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
