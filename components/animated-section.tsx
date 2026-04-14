"use client"

import type React from "react"
import { motion } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn"
  delay?: number
}

const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
  },
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
}: AnimatedSectionProps) {
  const config = animations[animation]

  return (
    <motion.div
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom cubic-bezier for "premium" feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
