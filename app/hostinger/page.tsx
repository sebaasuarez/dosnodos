import type { Metadata } from "next"
import Image from "next/image"
import { getSiteSettings } from "@/lib/data"
import { SITE } from "@/lib/seo"
import { NECESIDADES, PRODUCTOS, enlaceProducto } from "@/lib/hostinger"
import { SeccionHostinger } from "@/components/hostinger/seccion"

export const dynamic = "force-dynamic"

const TITULO = "Soluciones Hostinger en Colombia | Implementación y soporte | Dos Nodos"
const DESCRIPCION =
  "Te ayudamos a elegir, configurar e implementar hosting, cloud, VPS, correo empresarial, sitios web, automatización e IA sobre Hostinger."

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE}/hostinger` },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: `${SITE}/hostinger`,
    type: "website",
    locale: "es_CO",
  },
}

export default async function HostingerPage() {
  const settings = await getSiteSettings()
  const referral = settings.hostinger_referral_url
  const esSocio = settings.hostinger_partner_approved

  const opciones = NECESIDADES.map((n) => ({
    id: n.id,
    titulo: n.titulo,
    producto: PRODUCTOS[n.producto],
    implementamos: n.implementamos,
    enlaceProducto: enlaceProducto(referral, n.producto),
  }))

  return (
    <main className="bg-white">
      {/* La insignia va en monocromo a propósito: el morado de Hostinger
          (#673DE6) está a ΔE 11.7 de nuestro acento, o sea que en esta página
          se leería como decoración nuestra y no como el sello de un tercero. */}
      <section className="border-b border-[#EDEAF6] bg-[#F9F8FD] px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6">
          <span className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#6A667E]">
            Hosting · Cloud · VPS · Correo · IA
          </span>
          <h1 className="max-w-[16ch] text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-.02em] text-ink">
            Elige Hostinger. Nosotros lo dejamos funcionando.
          </h1>
          <p className="max-w-[58ch] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.55] text-[#5A5570]">
            Te ayudamos a elegir la solución adecuada y nos encargamos de configurarla, conectarla y
            convertirla en una plataforma lista para tu negocio.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contacto"
              className="rounded-[10px] bg-gradient-to-r from-brand-cta to-brand-blue px-5 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Quiero una recomendación
            </a>
            <a
              href="#que-necesito"
              className="rounded-[10px] border border-[#8B84A8] px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-brand-cta hover:text-brand-cta"
            >
              Ya tengo Hostinger y necesito ayuda
            </a>
          </div>

          <p className="text-[13px] text-[#6A667E]">
            Orientación inicial sin costo · Sin compromiso · Atención desde Medellín
          </p>

          {esSocio && (
            <div className="flex items-center gap-3 pt-2">
              <Image
                src="/hostinger/hostinger-partner-light.svg"
                alt="Dos Nodos es socio de Hostinger"
                width={160}
                height={60}
                priority
              />
              <span className="max-w-[30ch] text-[12.5px] leading-[1.45] text-[#6A667E]">
                Socio verificado de Hostinger. Los productos se contratan directamente con ellos.
              </span>
            </div>
          )}
        </div>
      </section>

      <SeccionHostinger
        opciones={opciones}
        necesidades={NECESIDADES.map((n) => ({ id: n.id, titulo: n.titulo }))}
        whatsapp={settings.whatsapp_number || "573127344026"}
        contactEmail={settings.contact_email || "hola@dosnodos.com.co"}
        cupon={settings.hostinger_coupon_code}
      />
    </main>
  )
}
