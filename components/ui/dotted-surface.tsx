"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.matchMedia("(max-width: 640px)").matches
    const columns = isMobile ? 25 : 38
    const rows = isMobile ? 34 : 52
    const separation = isMobile ? 165 : 145

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0xffffff, 1800, 9000)

    const camera = new THREE.PerspectiveCamera(58, 1, 1, 10000)
    camera.position.set(0, 350, 1220)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0xffffff, 0)
    container.appendChild(renderer.domElement)

    const positions: number[] = []
    const colors: number[] = []
    const purple = new THREE.Color("#9333EA")
    const blue = new THREE.Color("#2563EB")

    for (let xIndex = 0; xIndex < columns; xIndex++) {
      for (let yIndex = 0; yIndex < rows; yIndex++) {
        positions.push(
          xIndex * separation - (columns * separation) / 2,
          0,
          yIndex * separation - (rows * separation) / 2,
        )
        const color = purple.clone().lerp(blue, yIndex / rows)
        colors.push(color.r, color.g, color.b)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: isMobile ? 7 : 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geometry, material))

    let count = 0
    let animationId = 0

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const render = () => {
      const positionAttribute = geometry.attributes.position
      const values = positionAttribute.array as Float32Array
      let point = 0

      for (let xIndex = 0; xIndex < columns; xIndex++) {
        for (let yIndex = 0; yIndex < rows; yIndex++) {
          values[point * 3 + 1] =
            Math.sin((xIndex + count) * 0.28) * 44 +
            Math.sin((yIndex + count) * 0.42) * 36
          point++
        }
      }

      positionAttribute.needsUpdate = true
      renderer.render(scene, camera)
      count += 0.055
      animationId = requestAnimationFrame(render)
    }

    resize()
    if (prefersReducedMotion) {
      renderer.render(scene, camera)
    } else {
      render()
    }
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    />
  )
}
