"use client"

import { useState } from "react"
import { SelectorNecesidad, type OpcionSelector } from "./selector"
import { FormularioHostinger } from "./formulario"

/**
 * Une el selector con el formulario.
 *
 * Existe solo para que la necesidad elegida arriba llegue abajo ya
 * seleccionada. Sin esto el visitante elige "migrar un sitio", baja, y tiene
 * que volver a decir lo mismo — que es la fricción que hace abandonar.
 */
export function SeccionHostinger({
  opciones,
  necesidades,
  whatsapp,
  contactEmail,
  cupon,
}: {
  opciones: OpcionSelector[]
  necesidades: { id: string; titulo: string }[]
  whatsapp: string
  contactEmail: string
  cupon: string | null
}) {
  const [necesidad, setNecesidad] = useState("")

  return (
    <>
      <section id="que-necesito" className="px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#6A667E]">
              <span className="text-brand-cta">01</span> ¿Qué necesito?
            </span>
            <h2 className="max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-.02em] text-ink">
              Cuéntanos qué necesitas y te orientamos.
            </h2>
          </div>
          <SelectorNecesidad
            opciones={opciones}
            seleccionada={necesidad}
            onSeleccion={setNecesidad}
          />
        </div>
      </section>

      <section id="contacto" className="border-t border-[#EDEAF6] bg-[#F9F8FD] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#6A667E]">
              <span className="text-brand-cta">02</span> Hablemos
            </span>
            <h2 className="max-w-[18ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-.02em] text-ink">
              Cuéntanos qué necesitas. Te ayudamos a elegir el siguiente paso.
            </h2>
            <p className="max-w-[48ch] text-[15.5px] leading-[1.55] text-[#5A5570]">
              Los productos de Hostinger se contratan y pagan directamente con ellos. Lo que
              cotizamos aparte es el diagnóstico, la configuración, el desarrollo, la migración y el
              acompañamiento.
            </p>

            {/* El cupón va acá y no en el encabezado: arriba convertiría la
                página en un sitio de descuentos y atraería a quien busca
                precio, no a quien necesita que le implementen algo. */}
            {cupon && (
              <div className="mt-2 max-w-[44ch] rounded-[14px] border border-[#E4D4F7] bg-white p-4">
                <p className="text-[13.5px] leading-[1.5] text-[#5A5570]">
                  Cuando vayas a contratar, aplica este código de socio en el checkout de Hostinger:
                </p>
                <p className="mt-2 font-mono text-[18px] font-semibold tracking-[.06em] text-brand-cta">
                  {cupon}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-[18px] border border-[#E4E1F0] bg-white p-6 md:p-7">
            <FormularioHostinger
              whatsapp={whatsapp}
              contactEmail={contactEmail}
              necesidad={necesidad}
              onNecesidadChange={setNecesidad}
              necesidades={necesidades}
            />
          </div>
        </div>
      </section>
    </>
  )
}
