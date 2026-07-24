"use client"

import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface MetricsProps {
  t: Translation
}

export function Metrics({ t }: MetricsProps) {
  const items = [t.metrics.responseTime, t.metrics.availability, t.metrics.quotes, t.metrics.speed]

  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[clamp(16px,3vw,28px)] px-[clamp(20px,5vw,40px)] py-[clamp(40px,6vw,64px)]">
        {items.map((m, i) => (
          <AnimatedSection key={m.value + i} animation="fadeInUp" delay={i * 80}>
            <div className="flex flex-col gap-1.5">
              <b className="dn-grad-text text-[clamp(34px,5vw,48px)] font-semibold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
                {m.value}
              </b>
              <span className="text-[14.5px] leading-[1.4] text-[#A29FBE]">{m.label}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
