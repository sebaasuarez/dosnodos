import { NextResponse } from "next/server"
import { requireUser } from "@/lib/supabase/auth"
import { SIMULADO } from "@/lib/prospecting/apify"
import type { Lead } from "@/lib/types"

/**
 * Exporta los prospectos como audiencia personalizada de Meta.
 *
 * Este archivo es el puente entre el scraping y la conversación. La lista NO
 * sirve para escribirle a nadie: sirve para que Meta muestre anuncios
 * Click-to-WhatsApp a esos negocios. Cuando uno hace clic, es él quien inicia
 * el chat, y ahí el contacto queda habilitado.
 *
 * Los teléfonos van en E.164 sin el "+", que es lo que espera Meta. El propio
 * Meta los convierte a hash antes de subirlos; nunca viajan en claro a sus
 * servidores desde el navegador.
 */

export const dynamic = "force-dynamic"

function e164(telefono: string | null): string {
  if (!telefono) return ""
  const d = telefono.replace(/\D/g, "")
  if (!d) return ""
  // Los números colombianos sin indicativo se normalizan a 57.
  if (d.length === 10 && d.startsWith("3")) return `57${d}`
  return d
}

/** Escapa un campo para CSV. */
function celda(valor: string): string {
  return /[",\n]/.test(valor) ? `"${valor.replace(/"/g, '""')}"` : valor
}

export async function GET() {
  const { supabase } = await requireUser()

  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("source", "prospeccion")
    // Los que revocaron nunca salen en una audiencia. Es el punto donde el
    // opt-out tiene que valer también fuera de WhatsApp.
    .neq("consent", "opt_out")
    // Los negocios del modo simulado tienen teléfonos inventados. Subirlos a
    // Meta ensucia la audiencia y baja la tasa de coincidencia de toda la
    // cuenta, así que se filtran acá y no en la confianza de quien exporta.
    // La rama `is.null` es necesaria: un NOT LIKE sobre NULL da NULL y dejaría
    // fuera a los prospectos legítimos que llegaron sin place id.
    // El comodín va como `*` y no como `%`: PostgREST lo traduce, y un `%`
    // suelto en la query string es un escape inválido que se pierde por el
    // camino — con `%` el filtro no llega a aplicarse y se exporta todo.
    .or(`google_place_id.is.null,google_place_id.not.like.${SIMULADO}*`)
    .order("score", { ascending: false })

  const leads = (data ?? []) as Lead[]

  // Cabeceras con los nombres que reconoce el importador de Meta.
  const filas = [
    ["phone", "city", "country", "score", "categoria", "servicio_sugerido", "negocio"].join(","),
  ]

  for (const l of leads) {
    const phone = e164(l.phone)
    // Sin teléfono no hay coincidencia posible en la audiencia.
    if (!phone) continue
    filas.push(
      [
        phone,
        celda(l.city ?? ""),
        "CO",
        String(l.score),
        celda(l.category ?? ""),
        celda(l.recommended_service ?? ""),
        celda(l.name ?? ""),
      ].join(","),
    )
  }

  const fecha = new Date().toISOString().slice(0, 10)
  return new NextResponse(filas.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="prospectos-dosnodos-${fecha}.csv"`,
      "Cache-Control": "no-store",
    },
  })
}
