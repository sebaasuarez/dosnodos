"use client"

import dynamic from "next/dynamic"
import AnimatedSection from "@/components/animated-section"
import { FlowDiagram } from "@/components/brand/flow-diagram"
import { trackCtaClick } from "@/lib/gtm"
import { type Translation } from "@/lib/i18n"

// Fondo decorativo con three.js: se carga después del contenido para no
// pesar sobre el LCP ni el bundle inicial del hero.
const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface").then((m) => m.DottedSurface),
  { ssr: false },
)

interface HeroProps {
  t: Translation
}

export function Hero({ t }: HeroProps) {
  return (
    <section
      id="top"
      className="relative"
      style={{
        background:
          "radial-gradient(680px 340px at 15% 0%, rgba(147,51,234,.13), transparent 66%), radial-gradient(720px 360px at 88% 6%, rgba(37,99,235,.13), transparent 68%)",
      }}
    >
      {/* Puntos oscuros: se desvanecen detrás del titular y ganan presencia
          hacia abajo, donde la onda queda encuadrada por la cámara. */}
      <DottedSurface className="opacity-[0.45] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,.35)_28%,black_60%,black_100%)]" />
      <div className="relative z-10 mx-auto flex max-w-[1180px] flex-col items-center gap-[clamp(18px,3vw,26px)] px-[clamp(20px,5vw,40px)] py-[clamp(48px,8vw,92px)] text-center">
        <AnimatedSection animation="fadeInUp">
          <span className="inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[.16em] text-brand-cta">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue" />
            {t.hero.eyebrow}
          </span>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={60}>
          <h1 className="max-w-[16ch] text-[clamp(38px,7vw,68px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {t.hero.titleLead} <span className="dn-grad-text">{t.hero.tech}</span> {t.hero.connector}{" "}
            <span className="dn-grad-text">{t.hero.people}</span>.
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={120}>
          <p className="max-w-[56ch] text-[clamp(16px,2.2vw,20px)] leading-[1.55] text-[#5A5570]">
            {t.hero.subtitle}
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={180}>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#contacto"
              onClick={() => trackCtaClick({ id: "hero_primary", text: t.hero.ctaPrimary, location: "hero" })}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[26px] py-[14px] text-[16px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(124,34,206,.65)] transition-transform hover:-translate-y-px"
            >
              {t.hero.ctaPrimary} <span aria-hidden>→</span>
            </a>
            <a
              href="#servicios"
              onClick={() => trackCtaClick({ id: "hero_secondary", text: t.hero.ctaSecondary, location: "hero" })}
              className="inline-flex items-center rounded-full border border-[#E4E1F0] bg-white px-[26px] py-[14px] text-[16px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={220}>
          <span className="font-mono text-[12px] text-[#6A667E]">{t.hero.note}</span>
        </AnimatedSection>

        <AnimatedSection animation="scaleIn" delay={260} className="w-full">
          <div className="mx-auto mt-2 w-full max-w-[820px] rounded-[20px] border border-[#EDEAF6] bg-surface-2 p-[clamp(16px,3vw,28px)]">
            <FlowDiagram d={t.hero.diagram} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
