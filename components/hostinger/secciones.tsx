import { PRODUCTOS, SOLUCIONES, TROPIEZOS, REPARTO, PASOS, enlaceProducto } from "@/lib/hostinger"

/**
 * Secciones narrativas de la landing.
 *
 * Todas se renderizan en el servidor: no hay estado ni interacción, así que
 * no tienen por qué costar JavaScript. Viven aparte de las piezas cliente
 * para que esa frontera quede evidente al leer el archivo.
 */

function Kicker({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#6A667E]">
      <span className="text-brand-cta">{n}</span> {children}
    </span>
  )
}

function Titulo({ children, claro }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <h2
      className={`max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.1] tracking-[-.02em] ${
        claro ? "text-white" : "text-ink"
      }`}
    >
      {children}
    </h2>
  )
}

export function SeccionProblema() {
  return (
    <section className="border-t border-[#EDEAF6] px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <Kicker n="02">El problema</Kicker>
          <Titulo>Comprar el plan es solo el comienzo.</Titulo>
          <p className="max-w-[44ch] text-[15.5px] leading-[1.55] text-[#5A5570]">
            Hostinger te entrega la infraestructura lista. Lo que sigue —conectarla, publicar,
            migrar sin perder nada— es donde la mayoría se queda.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {TROPIEZOS.map((t) => (
            <li
              key={t}
              className="border-l-2 border-[#E4D4F7] pl-3.5 text-[14.5px] leading-[1.45] text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SeccionSoluciones({ referral }: { referral: string | null }) {
  return (
    <section id="soluciones" className="border-t border-[#EDEAF6] bg-[#F9F8FD] px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Kicker n="03">Soluciones</Kicker>
          <Titulo>Lo que hacemos sobre tu infraestructura.</Titulo>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SOLUCIONES.map((s) => {
            const producto = PRODUCTOS[s.producto]
            const href = enlaceProducto(referral, s.producto)
            return (
              <article
                key={s.titulo}
                className="flex flex-col gap-3 rounded-[16px] border border-[#E4E1F0] bg-white p-5"
              >
                <h3 className="text-[16.5px] font-semibold leading-[1.25] text-ink">{s.titulo}</h3>
                <p className="text-[14px] leading-[1.5] text-[#5A5570]">{s.problema}</p>
                <p className="mt-auto border-t border-[#EDEAF6] pt-3 text-[14px] leading-[1.5] text-ink">
                  {s.resultado}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#F1EFFA] px-2.5 py-1 font-mono text-[11px] text-[#5A5570]">
                    {producto.nombre}
                  </span>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="text-[13px] font-semibold text-brand-cta underline-offset-2 hover:underline"
                    >
                      Ver en Hostinger
                    </a>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function SeccionReparto() {
  return (
    <section className="bg-ink px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#A29FBE]">
            <span className="text-brand-purple-soft">04</span> Quién hace qué
          </span>
          <Titulo claro>Tú contratas la infraestructura. Nosotros la dejamos funcionando.</Titulo>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(
            [
              ["Lo pone Hostinger", REPARTO.hostinger, "#A29FBE"],
              ["Lo ponemos nosotros", REPARTO.dosnodos, "#FFFFFF"],
            ] as const
          ).map(([titulo, items, color]) => (
            <div
              key={titulo}
              className="rounded-[18px] border border-[#2A2542] bg-ink-2 p-6 md:p-7"
            >
              <h3 className="mb-4 font-mono text-[12px] uppercase tracking-[.1em] text-[#807CA0]">
                {titulo}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {items.map((i) => (
                  <li key={i} className="text-[15px] leading-[1.45]" style={{ color }}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="max-w-[70ch] text-[14.5px] leading-[1.6] text-[#A29FBE]">
          Los productos de Hostinger se contratan y se pagan directamente con ellos, y quedan a tu
          nombre. Los servicios de Dos Nodos —diagnóstico, configuración, desarrollo, migración y
          acompañamiento— se cotizan aparte.
        </p>
      </div>
    </section>
  )
}

export function SeccionProceso() {
  return (
    <section id="como-funciona" className="border-t border-[#EDEAF6] px-6 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-9">
        <div className="flex flex-col gap-3">
          <Kicker n="05">Cómo funciona</Kicker>
          <Titulo>De la necesidad a una solución funcionando.</Titulo>
        </div>
        <ol className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {PASOS.map((p) => (
            <li key={p.n} className="flex flex-col gap-1.5 border-t border-[#E4E1F0] pt-4">
              <span className="font-mono text-[12px] tracking-[.1em] text-brand-cta">{p.n}</span>
              <h3 className="text-[16.5px] font-semibold leading-[1.25] text-ink">{p.titulo}</h3>
              <p className="text-[14px] leading-[1.5] text-[#5A5570]">{p.texto}</p>
            </li>
          ))}
        </ol>
        <p className="text-[13.5px] text-[#6A667E]">
          Los tiempos dependen del alcance. Te los decimos cuando sepamos qué hay que hacer, no
          antes.
        </p>
      </div>
    </section>
  )
}

export function SeccionPreguntas({ children }: { children: React.ReactNode }) {
  return (
    <section id="preguntas" className="border-t border-[#EDEAF6] bg-[#F9F8FD] px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <Kicker n="06">Preguntas</Kicker>
          <Titulo>Lo que más nos preguntan.</Titulo>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}
