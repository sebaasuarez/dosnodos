"use client"

import type React from "react"
import { useEffect, useRef } from "react"

type Animation = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: Animation
  delay?: number
  /**
   * Contenido sobre la línea de flotación. Anima con CSS puro apenas se pinta
   * la página, sin esperar a que hidrate el JS. Obligatorio en el hero: su
   * <h1> es el elemento LCP y con la versión anterior (framer-motion, que
   * servía el HTML con opacity:0) tardaba 3,4 s en aparecer.
   */
  immediate?: boolean
}

/**
 * Un único observador para todas las secciones. Con 43 instancias en el home,
 * un IntersectionObserver por componente era trabajo de más en el hilo
 * principal sin ninguna ganancia.
 */
let observer: IntersectionObserver | null = null

function reveal(el: Element) {
  el.classList.add("dn-in")
}

function observe(el: Element) {
  // Sin soporte de IntersectionObserver el contenido se muestra sin animación,
  // nunca oculto.
  if (typeof IntersectionObserver === "undefined") {
    reveal(el)
    return
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          observer?.unobserve(entry.target)
        }
      },
      // Equivale al viewport margin que usaba framer-motion: el elemento tiene
      // que entrar 50px en pantalla antes de revelarse.
      { rootMargin: "-50px" },
    )
  }

  observer.observe(el)
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  immediate = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (immediate) return
    const el = ref.current
    if (el) observe(el)
  }, [immediate])

  const base = immediate
    ? `dn-enter dn-enter-${animation}`
    : `dn-reveal dn-reveal-${animation}`

  return (
    <div
      ref={ref}
      className={className ? `${base} ${className}` : base}
      style={delay ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
