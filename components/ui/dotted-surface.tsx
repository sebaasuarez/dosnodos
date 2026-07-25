"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

/**
 * Superficie de puntos animada con three.js (onda senoidal).
 *
 * Mantiene el diseño de referencia: rejilla 40×60, separación 150, tamaño 8,
 * cámara en 0/355/1220 con fov 60 y ondas 0.3/0.5 de amplitud 50.
 * Adaptaciones para este sitio:
 * - Se posiciona dentro de su contenedor (el hero), no sobre todo el viewport.
 * - Mide contra el contenedor, no contra window.
 * - En móvil reduce partículas y limita el devicePixelRatio.
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

    const SEPARATION = 150
    const AMOUNTX = isMobile ? 26 : 40
    const AMOUNTY = isMobile ? 40 : 60

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 2000, 10000)

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000)
    camera.position.set(0, 355, 1220)

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
      size: 8,
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
          array[index + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
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

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    if (prefersReducedMotion) {
      updateWave()
      renderer.render(scene, camera)
    } else {
      animate()
    }

    sceneRef.current = { scene, camera, renderer, particles: [points], animationId, count }

    return () => {
      window.removeEventListener("resize", handleResize)

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
