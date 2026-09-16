"use client"

import { useState } from "react"
import { gtmEvent } from "@/lib/gtm"

/**
 * Formulario de la landing de Hostinger.
 *
 * Hace dos cosas en el mismo envío: guarda el lead en el CRM con
 * `source: "hostinger"` y abre WhatsApp con el contexto ya escrito. El orden
 * importa — primero se guarda y después se abre el chat — porque si el
 * navegador bloquea la ventana emergente el lead ya quedó registrado.
 */

const ESTADOS = [
  { id: "si", texto: "Sí, ya tengo cuenta" },
  { id: "no", texto: "No, todavía no" },
  { id: "no-seguro", texto: "No estoy seguro" },
]

export function FormularioHostinger({
  whatsapp,
  contactEmail,
  necesidadInicial,
  necesidades,
}: {
  whatsapp: string
  contactEmail: string
  necesidadInicial?: string | null
  necesidades: { id: string; titulo: string }[]
}) {
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState("")
  const [empezado, setEmpezado] = useState(false)

  function alEscribir() {
    if (empezado) return
    setEmpezado(true)
    gtmEvent("form_started", { ubicacion: "hostinger" })
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) ?? "").trim()

    const nombre = v("nombre")
    const telefono = v("telefono")
    if (!nombre || !telefono) {
      setError("Necesitamos tu nombre y un WhatsApp para responderte.")
      return
    }
    if (!fd.get("autoriza")) {
      setError("Necesitamos tu autorización para tratar los datos.")
      return
    }

    setError("")
    setEnviando(true)

    const necesidad = v("necesidad")
    const titulo = necesidades.find((n) => n.id === necesidad)?.titulo ?? necesidad
    const estado = ESTADOS.find((x) => x.id === v("estado"))?.texto ?? "No indicó"

    const mensaje = [
      `Necesidad: ${titulo || "sin especificar"}`,
      `Hostinger: ${estado}`,
      v("empresa") && `Empresa: ${v("empresa")}`,
      v("sitio") && `Sitio actual: ${v("sitio")}`,
      v("mensaje"),
    ]
      .filter(Boolean)
      .join("\n")

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre,
          email: v("email") || null,
          phone: telefono,
          company: v("empresa") || null,
          message: mensaje,
          language: "es",
          source: "hostinger",
        }),
        // Si la pestaña se cierra al abrir WhatsApp, la petición igual se
        // completa en segundo plano.
        keepalive: true,
      })
      gtmEvent("form_submit", { ubicacion: "hostinger", necesidad, estado_hostinger: v("estado") })
    } catch {
      // Un fallo guardando no puede costarnos la conversación: seguimos a
      // WhatsApp igual y el lead se recupera desde el chat.
      gtmEvent("form_submit_error", { ubicacion: "hostinger" })
    }

    const texto = `Hola, llegué desde la página de soluciones Hostinger de Dos Nodos.\n${mensaje}\nQuiero recibir orientación.`
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener")
    setEnviando(false)
  }

  const campo =
    "rounded-[10px] border border-[#E4E1F0] bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-brand-purple"
  const etiqueta = "flex flex-col gap-1.5 text-[13.5px] font-semibold text-ink"

  return (
    <form onSubmit={enviar} onInput={alEscribir} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={etiqueta}>
          Nombre
          <input name="nombre" required autoComplete="name" className={campo} />
        </label>
        <label className={etiqueta}>
          Empresa o negocio
          <input name="empresa" autoComplete="organization" className={campo} />
        </label>
        <label className={etiqueta}>
          WhatsApp
          <input name="telefono" required inputMode="tel" autoComplete="tel" className={campo} />
        </label>
        <label className={etiqueta}>
          Correo
          <input name="email" type="email" autoComplete="email" className={campo} />
        </label>
      </div>

      <label className={etiqueta}>
        ¿Ya tienes una cuenta de Hostinger?
        <select name="estado" defaultValue="no-seguro" className={campo}>
          {ESTADOS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.texto}
            </option>
          ))}
        </select>
      </label>

      <label className={etiqueta}>
        ¿Qué necesitas?
        <select name="necesidad" defaultValue={necesidadInicial ?? ""} className={campo}>
          <option value="">Elige una opción</option>
          {necesidades.map((n) => (
            <option key={n.id} value={n.id}>
              {n.titulo}
            </option>
          ))}
        </select>
      </label>

      <label className={etiqueta}>
        Tu sitio actual, si tienes
        <input name="sitio" inputMode="url" placeholder="minegocio.com" className={campo} />
      </label>

      <label className={etiqueta}>
        Cuéntanos un poco más
        <textarea name="mensaje" rows={3} className={campo} />
      </label>

      {/* La Ley 1581 pide finalidad explícita y un canal para revocar. Mientras
          no exista la política publicada, el texto dice ambas cosas en vez de
          enlazar a una página que no existe. */}
      <label className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-[#5A5570]">
        <input name="autoriza" type="checkbox" className="mt-0.5 h-4 w-4 accent-[#7C22CE]" />
        <span>
          Autorizo a Dos Nodos a tratar mis datos de contacto con la única finalidad de responder
          esta solicitud. Puedo pedir que los eliminen escribiendo a{" "}
          <a href={`mailto:${contactEmail}`} className="underline">
            {contactEmail}
          </a>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="text-[13.5px] text-[#B91C1C]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="self-start rounded-[10px] bg-gradient-to-r from-brand-cta to-brand-blue px-5 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Recibir orientación"}
      </button>

      <p className="text-[12.5px] text-[#6A667E]">
        Orientación inicial sin costo. Te respondemos por WhatsApp.
      </p>
    </form>
  )
}
