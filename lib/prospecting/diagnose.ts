import "server-only"
import type { Diagnostico, NegocioCrudo, Senales } from "./types"

/**
 * Diagnóstico comercial de cada negocio.
 *
 * Con `OPENAI_API_KEY` lo escribe el modelo; sin ella, un motor de reglas. El
 * respaldo no es un placeholder: el diagnóstico de reglas es correcto y
 * utilizable, solo menos afinado. Así el motor nunca se detiene por falta de
 * una clave ni por una caída del proveedor, que es lo que importa cuando esto
 * corre solo todas las mañanas.
 *
 * La URL base es configurable porque el formato de OpenAI lo hablan varios
 * proveedores (Groq, Together, OpenRouter). Cambiar de uno a otro es mover dos
 * variables, no tocar este archivo.
 */

const BASE = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "")
const MODELO = process.env.OPENAI_MODEL || "gpt-4o-mini"

/** Host real del proveedor, para que los avisos no mientan sobre quién falló. */
const PROVEEDOR = (() => {
  try {
    return new URL(BASE).hostname
  } catch {
    return BASE
  }
})()

/** Servicio que corresponde según lo que le falta al negocio. */
function servicioPara(s: Senales): string {
  if (!s.tieneSitioWeb && !s.tieneWhatsapp) return "Diseño de Páginas Web"
  if (!s.tieneSitioWeb) return "Landing Express con WhatsApp"
  if (!s.tieneRedes) return "Marketing Digital & SEO"
  return "Automatización de Procesos"
}

export function diagnosticoPorReglas(n: NegocioCrudo, s: Senales): Diagnostico {
  const faltas: string[] = []
  if (!s.tieneSitioWeb) faltas.push("no tiene página web")
  if (!s.tieneWhatsapp) faltas.push("no publica un número de WhatsApp")
  if (!s.tieneRedes) faltas.push("no se le ven redes sociales")

  const demanda =
    (n.resenas ?? 0) >= 80
      ? `Tiene ${n.resenas} reseñas${n.calificacion ? ` y ${n.calificacion} de calificación` : ""}, o sea demanda comprobada`
      : (n.resenas ?? 0) >= 20
        ? `Tiene ${n.resenas} reseñas, con clientes recurrentes`
        : "Aún con poca huella en reseñas"

  const resumen =
    faltas.length > 0
      ? `${demanda}, pero ${faltas.join(" y ")}. La venta entra por ahí: ordenar el canal digital sin cambiarle la operación.`
      : `${demanda} y ya tiene presencia digital armada. La oportunidad está en automatizar la atención, no en construir de cero.`

  return { resumen, servicioRecomendado: servicioPara(s), porIa: false }
}

interface RespuestaIa {
  resumen?: string
  servicio?: string
}

/**
 * Primer motivo por el que la IA no pudo diagnosticar en esta corrida. Se
 * guarda para que el motor lo escriba en la bitácora: sin esto, `enriquecidos:
 * 0` no distingue entre "no hay clave", "la clave no sirve" y "el proveedor se
 * cayó", y las tres se arreglan distinto.
 */
let ultimoMotivo: string | null = null

export function motivoIaFallida(): string | null {
  return ultimoMotivo
}

export function reiniciarMotivoIa(): void {
  ultimoMotivo = null
}

function avisar(motivo: string): void {
  ultimoMotivo ??= motivo
  console.error("Prospección · IA:", motivo)
}

/** Llama a OpenAI. Si algo falla devuelve null y el llamador usa las reglas. */
async function diagnosticoPorIa(n: NegocioCrudo, s: Senales): Promise<Diagnostico | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    avisar("falta OPENAI_API_KEY; se usa el motor de reglas")
    return null
  }

  const ficha = [
    `Negocio: ${n.nombre}`,
    n.categoria && `Categoría: ${n.categoria}`,
    n.ciudad && `Ciudad: ${n.ciudad}`,
    `Sitio web: ${s.tieneSitioWeb ? n.sitioWeb : "NO TIENE"}`,
    `WhatsApp visible: ${s.tieneWhatsapp ? "sí" : "no"}`,
    `Redes sociales: ${s.tieneRedes ? "sí" : "no"}`,
    n.resenas != null && `Reseñas: ${n.resenas}`,
    n.calificacion != null && `Calificación: ${n.calificacion}`,
  ]
    .filter(Boolean)
    .join("\n")

  const prompt = `Eres analista comercial de Dos Nodos, empresa de tecnología en Medellín que vende sitios web, e-commerce, automatización y asistentes con IA a negocios locales.

Analiza este prospecto y responde SOLO con un JSON de esta forma, sin texto alrededor:
{"resumen": "...", "servicio": "..."}

- "resumen": dos frases máximo, en español de Colombia, tuteando. Di qué le falta digitalmente y por dónde entra la venta. Concreto, sin relleno ni adjetivos de folleto.
- "servicio": UNO de estos exactamente: "Diseño de Páginas Web", "Landing Express con WhatsApp", "Desarrollo de e-Commerce", "Marketing Digital & SEO", "Automatización de Procesos", "Asistentes Virtuales Inteligentes".

${ficha}`

  try {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODELO,
        max_tokens: 300,
        // Obliga a que la respuesta sea JSON válido, en vez de confiar en que
        // el modelo no adorne el objeto con texto alrededor.
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }],
      }),
      // Una corrida diagnostica hasta veinte negocios seguidos. Sin tope, un
      // proveedor lento se lleva por delante el tiempo de la función entera.
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) {
      // Un respaldo silencioso esconde la causa: la corrida sigue, pero nadie
      // sabe si la IA está caída, la clave es inválida o el modelo no existe.
      avisar(`${PROVEEDOR} respondió ${res.status}: ${(await res.text()).slice(0, 180)}`)
      return null
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
    const texto = data.choices?.[0]?.message?.content ?? ""
    const parsed = JSON.parse(texto) as RespuestaIa
    if (!parsed.resumen) {
      avisar(`${PROVEEDOR} devolvió una respuesta sin resumen: ${texto.slice(0, 180)}`)
      return null
    }

    return {
      resumen: parsed.resumen.trim(),
      servicioRecomendado: parsed.servicio?.trim() || servicioPara(s),
      porIa: true,
    }
  } catch (e) {
    avisar(`Falló la llamada a ${PROVEEDOR}: ${e instanceof Error ? e.message : String(e)}`)
    return null
  }
}

export async function diagnosticar(n: NegocioCrudo, s: Senales): Promise<Diagnostico> {
  return (await diagnosticoPorIa(n, s)) ?? diagnosticoPorReglas(n, s)
}
