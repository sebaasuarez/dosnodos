import Image from "next/image"
import Link from "next/link"

/** Navegación corta: cinco destinos como máximo, que es lo que se recorre de un vistazo. */
const ENLACES = [
  { href: "#que-necesito", texto: "¿Qué necesito?" },
  { href: "#soluciones", texto: "Soluciones" },
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#preguntas", texto: "Preguntas" },
]

export function NavHostinger() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EDEAF6] bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Dos Nodos — inicio">
          <Image
            src="/dosnodos-logo.png"
            alt="Dos Nodos"
            width={150}
            height={30}
            priority
            className="h-[26px] w-auto object-contain"
          />
        </Link>

        <nav aria-label="Secciones" className="hidden items-center gap-6 md:flex">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-[14px] text-[#5A5570] transition-colors hover:text-brand-cta"
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="shrink-0 rounded-[10px] bg-gradient-to-r from-brand-cta to-brand-blue px-4 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px"
        >
          Quiero una recomendación
        </a>
      </div>
    </header>
  )
}
