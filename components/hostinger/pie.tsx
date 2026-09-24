import Image from "next/image"
import Link from "next/link"

/**
 * Pie de la landing.
 *
 * Lleva la divulgación de enlaces de referido, que no es un detalle de
 * cortesía: si la página gana comisión por una recomendación, el visitante
 * tiene que poder saberlo antes de hacer clic.
 */
export function PieHostinger({
  contactEmail,
  whatsapp,
}: {
  contactEmail: string
  whatsapp: string
}) {
  return (
    <footer className="bg-ink-3 px-6 py-14">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex max-w-[32ch] flex-col gap-3">
            <Image
              src="/dosnodos-logo.png"
              alt="Dos Nodos"
              width={150}
              height={30}
              className="dn-logo-white h-auto w-[150px] object-contain"
            />
            <span className="font-serif text-[15px] italic text-[#A29FBE]">
              Conectamos tecnología con personas
            </span>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-6">
            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="mb-0.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#807CA0]">
                Dos Nodos
              </span>
              <Link href="/" className="text-[#C9C6DE] transition-colors hover:text-white">
                Sitio principal
              </Link>
              <Link href="/servicios" className="text-[#C9C6DE] transition-colors hover:text-white">
                Servicios
              </Link>
              <a
                href="https://ventas.dosnodos.com.co"
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                Páginas desde $650k
              </a>
              <Link
                href="/privacidad"
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                Tratamiento de datos
              </Link>
              <Link
                href="/terminos"
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                Términos y condiciones
              </Link>
            </div>

            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="mb-0.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#807CA0]">
                Contacto
              </span>
              <a
                href={`mailto:${contactEmail}`}
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                {contactEmail}
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                WhatsApp
              </a>
              <span className="text-[#807CA0]">Medellín, Colombia</span>
            </div>
          </div>
        </div>

        <p className="max-w-[80ch] border-t border-[#2A2542] pt-6 text-[12.5px] leading-[1.6] text-[#807CA0]">
          Dos Nodos participa en el programa de socios de Hostinger. Algunos enlaces hacia Hostinger
          son de referido: si contratas a través de ellos podemos recibir una comisión, sin que eso
          cambie el precio que pagas. Los productos, precios, renovaciones y condiciones los define
          Hostinger directamente, y el servicio de implementación de Dos Nodos se cotiza aparte.
        </p>
      </div>
    </footer>
  )
}
