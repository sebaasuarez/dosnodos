import "server-only"
import { createAdminSupabase } from "@/lib/supabase/admin"
import { buscarNegocios, hayApify } from "./apify"
import { detectarSenales, puntuar } from "./score"
import { diagnosticar, motivoIaFallida, reiniciarMotivoIa } from "./diagnose"
import type { ResultadoCorrida } from "./types"

/**
 * Motor de prospección.
 *
 * Busca negocios, descarta los que ya están, detecta sus carencias digitales,
 * los puntúa y les escribe un diagnóstico. Todo lo que entra queda marcado
 * como `sin_consentimiento`: son datos de fuente pública y nadie autorizó
 * nada. Lo que sigue —el primer contacto— se hace por anuncios o correo, no
 * por WhatsApp.
 */

/** Búsquedas por defecto del cron: el perfil de cliente de la landing de ventas. */
export const BUSQUEDAS_POR_DEFECTO = [
  "barbería",
  "café",
  "spa",
  "restaurante",
  "hostal",
  "lavandería",
]

export const CIUDAD_POR_DEFECTO = "Medellín, Colombia"

/** Meses que se conserva un prospecto sin relación comercial antes de purgarlo. */
const MESES_RETENCION = 12

function fechaDePurga(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + MESES_RETENCION)
  return d.toISOString().slice(0, 10)
}

export interface OpcionesCorrida {
  consulta: string
  ciudad?: string
  limite?: number
  trigger?: "cron" | "manual"
}

export async function correrProspeccion(op: OpcionesCorrida): Promise<ResultadoCorrida> {
  const supabase = createAdminSupabase()
  if (!supabase) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY para escribir prospectos")

  const ciudad = op.ciudad || CIUDAD_POR_DEFECTO
  const limite = op.limite ?? 20

  const { data: corrida } = await supabase
    .from("prospect_runs")
    .insert({
      status: "corriendo",
      trigger: op.trigger ?? "cron",
      query: op.consulta,
      city: ciudad,
      mode: hayApify() ? "apify" : "simulado",
    })
    .select("id")
    .single()

  const runId = (corrida as { id: string } | null)?.id

  try {
    reiniciarMotivoIa()
    const { negocios, modo } = await buscarNegocios(op.consulta, ciudad, limite)

    // Deduplicación contra lo que ya existe. Se hace en una sola consulta y no
    // uno por uno para no castigar la base con veinte viajes.
    const placeIds = negocios.map((n) => n.placeId).filter(Boolean) as string[]
    const { data: existentes } = await supabase
      .from("leads")
      .select("google_place_id")
      .in("google_place_id", placeIds.length ? placeIds : ["__vacio__"])

    const yaEstan = new Set(
      ((existentes ?? []) as { google_place_id: string | null }[])
        .map((r) => r.google_place_id)
        .filter(Boolean) as string[],
    )

    const nuevos = negocios.filter((n) => !n.placeId || !yaEstan.has(n.placeId))
    // Sube también si el índice único rechaza una inserción más abajo.
    let duplicados = negocios.length - nuevos.length

    let insertados = 0
    let enriquecidos = 0
    let descartados = 0
    let primerFallo: string | null = null

    for (const n of nuevos) {
      const senales = detectarSenales(n)
      const score = puntuar(n, senales)

      // El diagnóstico se pide solo para los prospectos que valen la pena. Sin
      // este filtro cada corrida gastaría veinte llamadas al modelo, la mayoría
      // sobre negocios que no se van a contactar.
      const vale = score.total >= 45
      const diag = vale ? await diagnosticar(n, senales) : null
      if (diag?.porIa) enriquecidos++

      const { error } = await supabase.from("leads").insert({
        name: n.nombre,
        company: n.nombre,
        email: null,
        phone: n.telefono,
        message: null,
        language: "es",
        source: "prospeccion",
        status: "nuevo",
        city: n.ciudad,
        address: n.direccion,
        category: n.categoria,
        website: n.sitioWeb,
        google_maps_url: n.mapsUrl,
        google_place_id: n.placeId,
        rating: n.calificacion,
        reviews_count: n.resenas,
        has_website: senales.tieneSitioWeb,
        has_whatsapp: senales.tieneWhatsapp,
        has_social: senales.tieneRedes,
        score: score.total,
        score_breakdown: score.desglose,
        diagnosis: diag?.resumen ?? null,
        recommended_service: diag?.servicioRecomendado ?? null,
        enriched_at: diag ? new Date().toISOString() : null,
        // Dato de fuente pública: nadie autorizó nada.
        consent: "sin_consentimiento",
        consent_source: "google_maps",
        purge_after: fechaDePurga(),
      })

      if (!error) {
        insertados++
      } else if (error.code === "23505") {
        // Choque de clave única: otra corrida lo insertó primero. No es un
        // fallo, es la deduplicación funcionando.
        duplicados++
      } else {
        // Cualquier otro rechazo sí es una pérdida y tiene que verse.
        descartados++
        primerFallo ??= `${n.nombre}: ${error.message}`
      }
    }

    // Los dos avisos van al mismo campo porque los dos significan lo mismo
    // para quien mira el panel: la corrida salió, pero algo no funcionó como
    // debía. El descarte manda, que es pérdida de prospectos.
    const aviso = primerFallo ?? (enriquecidos === 0 ? motivoIaFallida() : null)

    const resultado: ResultadoCorrida = {
      modo,
      consulta: op.consulta,
      ciudad,
      encontrados: negocios.length,
      insertados,
      duplicados,
      enriquecidos,
      descartados,
      motivoIa: motivoIaFallida(),
    }

    if (runId) {
      await supabase
        .from("prospect_runs")
        .update({
          status: "ok",
          finished_at: new Date().toISOString(),
          found: negocios.length,
          inserted: insertados,
          duplicated: duplicados,
          enriched: enriquecidos,
          discarded: descartados,
          // La corrida terminó, pero si algo se cayó queda escrito con nombre
          // propio en vez de desaparecer entre los números.
          error: aviso ? aviso.slice(0, 500) : null,
          mode: modo,
        })
        .eq("id", runId)
    }

    return resultado
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : String(e)
    if (runId) {
      await supabase
        .from("prospect_runs")
        .update({
          status: "error",
          finished_at: new Date().toISOString(),
          error: mensaje.slice(0, 500),
        })
        .eq("id", runId)
    }
    throw e
  }
}
