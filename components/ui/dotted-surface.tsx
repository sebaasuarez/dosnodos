"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

/**
 * Superficie de puntos animada con three.js (onda senoidal).
 *
 * Encuadre: la referencia original apuntaba la cámara en horizontal, así que
 * el horizonte caía a media altura y la mitad superior quedaba vacía. Aquí la
 * cámara se inclina ~35° hacia el plano para que la rejilla cubra el alto
 * completo del contenedor, de esquina a esquina y en cualquier proporción.
 *
 * La geometría se reescala por K respecto de la referencia (separación 150 →
 * 90 y cámara 0/600/1400 → 0/360/840). Al acercar la cámara en la misma
 * proporción el encuadre no cambia, pero cabe ~2.5× más densidad de puntos:
 * necesario porque estirar la rejilla sobre todo el alto la ralearía.
 *
 * Otras adaptaciones para este sitio:
 * - Se posiciona dentro de su contenedor (el hero), no sobre todo el viewport.
 * - Mide contra el contenedor y lo observa con ResizeObserver: el alto del
 *   hero cambia sin que haya resize de window (carga de fuentes, contenido).
 * - En móvil reduce el ancho de la rejilla y limita el devicePixelRatio.
 * - Respeta prefers-reduced-motion: dibuja un solo fotograma estático.
 */
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme()

  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points[]
    animationId: number
    count: number
  } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.matchMedia("(max-width: 640px)").matches

    // Escala respecto de la referencia (separación 150, cámara 0/600/1400).
    const K = 0.6
    const SEPARATION = 90
    // El ancho de la rejilla se calcula para tapar las esquinas superiores, que
    // es el punto del encuadre más lejano a la cámara. En móvil el viewport es
    // angosto y necesita menos ancho, pero la misma profundidad.
    const AMOUNTX = isMobile ? 44 : 88
    const AMOUNTY = isMobile ? 96 : 104

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 2000 * K, 10000 * K)

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.set(0, 600 * K, 1400 * K)
    // Inclinación hacia el plano: saca el horizonte por encima del encuadre y
    // hace que los puntos lleguen hasta el borde superior del hero.
    camera.lookAt(0, 0, 540 * K)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))
    renderer.setSize(width, height)
    renderer.setClearColor(scene.fog.color, 0)

    container.appendChild(renderer.domElement)

    // Create particles
    const positions: number[] = []
    const colors: number[] = []

    // Puntos oscuros sobre el fondo claro del hero; claros si el tema es oscuro.
    const dot = new THREE.Color(resolvedTheme === "dark" ? "#C9C6DE" : "#141126")

    const geometry = new THREE.BufferGeometry()

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const y = 0 // Se animará
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

        positions.push(x, y, z)
        colors.push(dot.r, dot.g, dot.b)
      }
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 8 * K,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0
    let animationId = 0

    const updateWave = () => {
      const positionAttribute = geometry.attributes.position
      const array = positionAttribute.array as Float32Array

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3
          // El índice va escalado por K para que la longitud de onda en
          // unidades de mundo sea la misma de la referencia pese a la
          // separación más corta; la amplitud se escala igual.
          array[index + 1] =
            (Math.sin((ix * K + count) * 0.3) * 50 + Math.sin((iy * K + count) * 0.5) * 50) * K
          i++
        }
      }

      positionAttribute.needsUpdate = true
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      updateWave()
      renderer.render(scene, camera)
      count += 0.1
      if (sceneRef.current) sceneRef.current.animationId = animationId
    }

    let lastW = width
    let lastH = height

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      // Con reduced-motion no hay bucle de animación: hay que repintar a mano.
      if (prefersReducedMotion) renderer.render(scene, camera)
    }

    window.addEventListener("resize", handleResize)

    // El alto del hero cambia sin resize de window (swap de fuentes, contenido
    // que entra). Sin esto el canvas se queda con la medida del primer frame.
    const observer = new ResizeObserver(handleResize)
    observer.observe(container)

    if (prefersReducedMotion) {
      updateWave()
      renderer.render(scene, camera)
    } else {
      animate()
    }

    sceneRef.current = { scene, camera, renderer, particles: [points], animationId, count }

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose())
            } else {
              object.material.dispose()
            }
          }
        })

        sceneRef.current.renderer.dispose()
        sceneRef.current.renderer.domElement.remove()
      }
      sceneRef.current = null
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    />
  )
}
