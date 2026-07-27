"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { Language } from "@/lib/i18n"

/**
 * Carrusel con avance automático, sobre scroll-snap nativo.
 *
 * Se implementa con CSS (`scroll-snap`) en vez de una librería: el arrastre
 * táctil, la inercia y el teclado ya los da el navegador, y no suma JavaScript
 * al bundle.
 *
 * Un carrusel que se mueve solo es un riesgo de accesibilidad conocido
 * (WCAG 2.2.2 "Pause, Stop, Hide"), así que:
 * - Se pausa al pasar el mouse, al mover el foco adentro y con la pestaña
 *   en segundo plano.
 * - Tiene botón de pausa visible, que es justo lo que exige el criterio.
 * - Con `prefers-reduced-motion` no arranca solo ni anima el desplazamiento.
 * - Flechas y puntos son botones reales, operables con teclado.
 */

interface AutoCarouselProps {
  children: React.ReactNode[]
  /** Milisegundos entre avances. */
  interval?: number
  lang?: Language
  /** Nombre de la región, para lectores de pantalla. */
  label: string
  className?: string
}

const T: Record<Language, { prev: string; next: string; play: string; pause: string; go: string }> = {
  es: { prev: "Anterior", next: "Siguiente", play: "Reanudar", pause: "Pausar", go: "Ir a la página" },
  en: { prev: "Previous", next: "Next", play: "Resume", pause: "Pause", go: "Go to page" },
  pt: { prev: "Anterior", next: "Próximo", play: "Retomar", pause: "Pausar", go: "Ir para a página" },
}

export function AutoCarousel({
  children,
  interval = 3000,
  lang = "es",
  label,
  className = "",
}: AutoCarouselProps) {
  const t = T[lang] ?? T.es
  const trackRef = useRef<HTMLDivElement>(null)

  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const [playing, setPlaying] = useState(true)
  /** Pausa temporal: mouse encima, foco adentro o pestaña oculta. */
  const [held, setHeld] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  /**
   * Cuántas posiciones distintas hay. Se cuenta en tarjetas y no en "pantallas
   * completas": con 4 tarjetas y 3 visibles hay 2 posiciones, no 1,33. Cuántas
   * caben depende del ancho, así que se mide contra el elemento y no contra la
   * ventana.
   */
  const measure = useCallback(() => {
    const el = trackRef.current
    const first = el?.children[0] as HTMLElement | undefined
    if (!el || !first || el.clientWidth === 0) return
    const cardWidth = first.getBoundingClientRect().width
    if (cardWidth === 0) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const perView = Math.max(1, Math.round((el.clientWidth + gap) / (cardWidth + gap)))
    setPages(Math.max(1, el.children.length - perView + 1))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure, children.length])

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1))
  }, [pages])

  useEffect(() => {
    const onVisibility = () => setHeld(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  /**
   * Se desplaza hasta la tarjeta indicada, no hasta una posición calculada.
   * Es la diferencia que hace que funcione: con `scroll-snap-type: mandatory`
   * el navegador reajusta a su punto de anclaje más cercano, así que pedirle
   * una posición intermedia lo deja peleando contra sí mismo y el carrusel
   * apenas se movía unos pocos píxeles.
   */
  const scrollToIndex = useCallback((target: number, smooth: boolean) => {
    const el = trackRef.current
    const child = el?.children[target] as HTMLElement | undefined
    if (!el || !child) return
    const left = child.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft
    el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" })
  }, [])

  const goTo = useCallback(
    (next: number) => {
      const target = ((next % pages) + pages) % pages
      setPage(target)
      scrollToIndex(target, !reduced)
    },
    [pages, reduced, scrollToIndex],
  )

  useEffect(() => {
    if (reduced || !playing || held || pages <= 1) return
    const timer = window.setInterval(() => {
      setPage((p) => {
        const next = (p + 1) % pages
        scrollToIndex(next, true)
        return next
      })
    }, interval)
    return () => window.clearInterval(timer)
  }, [reduced, playing, held, pages, interval, scrollToIndex])

  // Si la persona arrastra, el indicador tiene que seguirla. Se espera a que
  // el desplazamiento se detenga: durante un scroll suave el evento se dispara
  // decenas de veces y leer una posición intermedia desincronizaba el
  // indicador con la página a la que se estaba yendo.
  const settleRef = useRef<number | undefined>(undefined)

  const onScroll = useCallback(() => {
    if (pages <= 1) return
    window.clearTimeout(settleRef.current)
    settleRef.current = window.setTimeout(() => {
      const el = trackRef.current
      if (!el) return
      // Gana la tarjeta cuyo borde izquierdo esté más cerca del del carril.
      const origin = el.getBoundingClientRect().left
      let best = 0
      let bestDistance = Infinity
      for (let i = 0; i < Math.min(el.children.length, pages); i++) {
        const d = Math.abs((el.children[i] as HTMLElement).getBoundingClientRect().left - origin)
        if (d < bestDistance) {
          bestDistance = d
          best = i
        }
      }
      setPage(best)
    }, 120)
  }, [pages])

  useEffect(() => () => window.clearTimeout(settleRef.current), [])

  const single = pages <= 1

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={`flex flex-col gap-5 ${className}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false)
      }}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            goTo(page + 1)
          } else if (e.key === "ArrowLeft") {
            e.preventDefault()
            goTo(page - 1)
          }
        }}
        // El carril es una región con scroll y sus tarjetas no contienen nada
        // enfocable, así que sin tabindex quedaba fuera del alcance del
        // teclado (WCAG 2.1.1). Con foco propio se recorre con las flechas.
        // Lighthouse no lo reporta; axe sí.
        tabIndex={single ? -1 : 0}
        role="group"
        aria-label={label}
        // Con avance automático se deja en "off": anunciar un cambio cada 3
        // segundos sería ruido constante en un lector de pantalla.
        aria-live={playing && !single && !reduced ? "off" : "polite"}
        className="dn-no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1 outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:ring-offset-2"
      >
        {children.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${children.length}`}
            className="w-full shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            {child}
          </div>
        ))}
      </div>

      {!single && (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            aria-label={t.prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E1F0] bg-white text-ink transition-colors hover:bg-surface-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.go} ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                onClick={() => goTo(i)}
                className={
                  i === page
                    ? "h-2 w-6 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue transition-all"
                    : "h-2 w-2 rounded-full bg-[#C7C2DC] transition-all hover:bg-[#9C96BC]"
                }
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            aria-label={t.next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E1F0] bg-white text-ink transition-colors hover:bg-surface-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* WCAG 2.2.2: si algo se mueve solo por más de 5 segundos tiene que
              haber una forma visible de detenerlo. Con reduced-motion el
              carrusel no avanza solo, así que el control sobra. */}
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="ml-1 flex h-9 items-center gap-1.5 rounded-full border border-[#E4E1F0] bg-white px-3 text-[12.5px] text-[#5A5570] transition-colors hover:bg-surface-2"
            >
              {playing ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5l11 7-11 7z" />
                </svg>
              )}
              {playing ? t.pause : t.play}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
