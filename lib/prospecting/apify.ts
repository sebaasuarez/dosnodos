import "server-only"
import type { NegocioCrudo } from "./types"

/**
 * Cliente del scraper de Google Maps en Apify.
 *
 * Sin `APIFY_TOKEN` el motor corre en modo simulado y genera negocios
 * plausibles. No es un adorno: permite probar el flujo completo —
 * deduplicación, puntaje, diagnóstico y panel— antes de pagar la suscripción,
 * y deja el sistema utilizable si algún día se corta el servicio.
 */

const ACTOR = process.env.APIFY_GOOGLE_MAPS_ACTOR_ID || "compass~crawler-google-places"
const API = "https://api.apify.com/v2"

export function hayApify(): boolean {
  return Boolean(process.env.APIFY_TOKEN)
}

interface ApifyItem {
  title?: string
  phone?: string
  phoneUnformatted?: string
  website?: string
  address?: string
  city?: string
  categoryName?: string
  placeId?: string
  url?: string
  totalScore?: number
  reviewsCount?: number
  instagrams?: string[]
  facebooks?: string[]
  tiktoks?: string[]
}

function mapear(item: ApifyItem): NegocioCrudo {
  const redes = [...(item.instagrams ?? []), ...(item.facebooks ?? []), ...(item.tiktoks ?? [])]
  return {
    nombre: item.title?.trim() || "Sin nombre",
    telefono: item.phoneUnformatted || item.phone || null,
    sitioWeb: item.website || null,
    direccion: item.address || null,
    ciudad: item.city || null,
    categoria: item.categoryName || null,
    placeId: item.placeId || null,
    mapsUrl: item.url || null,
    calificacion: typeof item.totalScore === "number" ? item.totalScore : null,
    resenas: typeof item.reviewsCount === "number" ? item.reviewsCount : null,
    redes,
  }
}

/**
 * Lanza el actor y espera el resultado. `run-sync-get-dataset-items` evita
 * tener que sondear el estado de la corrida.
 */
export async function buscarEnApify(
  consulta: string,
  ciudad: string,
  limite: number,
): Promise<NegocioCrudo[]> {
  const token = process.env.APIFY_TOKEN
  if (!token) throw new Error("APIFY_TOKEN no configurado")

  const res = await fetch(`${API}/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchStringsArray: [consulta],
      locationQuery: ciudad,
      maxCrawledPlacesPerSearch: limite,
      language: "es",
      skipClosedPlaces: true,
      scrapeContacts: true,
    }),
    // El actor tarda; sin esto Next podría cachear la respuesta.
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Apify respondió ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }

  const items = (await res.json()) as ApifyItem[]
  return items.map(mapear)
}

// ---------------------------------------------------------------------------
// Modo simulado
// ---------------------------------------------------------------------------

const NOMBRES: Record<string, string[]> = {
  barberia: ["Barbería El Corte", "Studio Barber", "La Navaja", "Barbería Central", "Don Bigote"],
  cafe: ["Café de la Esquina", "Tostado", "Grano & Co", "La Cafetera", "Origen Café"],
  spa: ["Spa Serena", "Bienestar Studio", "Aura Spa", "Casa Relax", "Piel & Alma"],
  restaurante: ["Sazón Paisa", "La Mesa", "Fogón & Brasa", "Cocina 14", "El Buen Sabor"],
  hostal: ["Hostal Verde", "Casa Viajera", "Nómada Hostel", "El Refugio", "Poblado Stay"],
  lavadero: ["Lavaseco Express", "Burbujas", "Clean Car", "Lavandería 24", "Agua Clara"],
}

const BARRIOS = ["El Poblado", "Laureles", "Envigado", "Belén", "Sabaneta", "La América", "Itagüí"]

/**
 * Prefijo del place id de los negocios inventados. Es la única marca que
 * distingue un dato de prueba de uno real una vez está en la base, así que la
 * exportación a Meta y el panel se apoyan en ella.
 */
export const SIMULADO = "simulado-"

/** Sin quitar tildes, "café" no coincide con la clave "cafe". */
function sinTildes(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function claveCategoria(consulta: string): string {
  const c = sinTildes(consulta)
  for (const k of Object.keys(NOMBRES)) if (c.includes(k)) return k
  return "barberia"
}

/**
 * Genera negocios de prueba con la misma forma que devuelve Apify. La mezcla
 * de señales es deliberada: la mayoría sin sitio web, que es justo el perfil
 * que le sirve a Dos Nodos.
 */
export function buscarSimulado(consulta: string, ciudad: string, limite: number): NegocioCrudo[] {
  const clave = claveCategoria(consulta)
  const base = NOMBRES[clave] ?? NOMBRES.barberia
  const salida: NegocioCrudo[] = []

  for (let i = 0; i < Math.min(limite, 24); i++) {
    const barrio = BARRIOS[i % BARRIOS.length]
    const nombre = `${base[i % base.length]} ${barrio}`
    // Semilla estable por índice: la misma corrida da los mismos datos.
    const tieneWeb = i % 5 === 0
    const tieneRedes = i % 3 !== 0
    const telefono =
      i % 7 === 0 ? null : `3${10 + (i % 9)}${String(1000000 + i * 7919).slice(0, 7)}`

    salida.push({
      nombre,
      telefono,
      sitioWeb: tieneWeb ? `https://ejemplo-${i}.com` : null,
      direccion: `Calle ${10 + i} #${20 + i}-${30 + i}, ${barrio}`,
      ciudad,
      categoria: consulta,
      placeId: `${SIMULADO}${clave}-${ciudad}-${i}`.toLowerCase().replace(/\s+/g, "-"),
      mapsUrl: `https://maps.google.com/?q=${encodeURIComponent(nombre)}`,
      calificacion: Number((3.6 + (i % 14) / 10).toFixed(1)),
      resenas: 5 + ((i * 13) % 220),
      redes: tieneRedes ? [`https://instagram.com/ejemplo${i}`] : [],
    })
  }

  return salida
}

export async function buscarNegocios(
  consulta: string,
  ciudad: string,
  limite: number,
): Promise<{ negocios: NegocioCrudo[]; modo: "apify" | "simulado" }> {
  if (!hayApify()) {
    return { negocios: buscarSimulado(consulta, ciudad, limite), modo: "simulado" }
  }
  return { negocios: await buscarEnApify(consulta, ciudad, limite), modo: "apify" }
}
