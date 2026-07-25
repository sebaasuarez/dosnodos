"use client"

import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"
import { trackFaqOpen } from "@/lib/gtm"

interface FaqProps {
  t: Translation
}

export function Faq({ t }: FaqProps) {
  return (
    <section id="faq" className="border-t border-[#EDEAF6] bg-surface-2">
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInUp">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
              {t.faq.eyebrow}
            </span>
            <h2 className="text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {t.faq.title}{" "}
              <span className="font-serif italic font-normal">{t.faq.titleAccent}</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={80}>
          <div className="w-full overflow-hidden rounded-[20px] border border-[#E4E1F0] bg-white">
            {t.faq.items.map((item, i) => (
              <details
                key={item.question}
                className="group border-b border-[#EDEAF6] last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
                onToggle={(e) => {
                  if ((e.currentTarget as HTMLDetailsElement).open) {
                    trackFaqOpen(item.question, "home_faq")
                  }
                }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[clamp(18px,3vw,26px)] py-5 text-[16.5px] font-semibold leading-snug tracking-[-0.01em] transition-colors hover:text-brand-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50">
                  <h3 className="text-[16.5px] font-semibold">{item.question}</h3>
                  <span
                    aria-hidden
                    className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E4E1F0] text-brand-cta transition-transform duration-200 group-open:rotate-45"
                  >
                    <span className="absolute h-[1.5px] w-[11px] rounded bg-current" />
                    <span className="absolute h-[11px] w-[1.5px] rounded bg-current" />
                  </span>
                </summary>
                <p className="px-[clamp(18px,3vw,26px)] pb-5 text-[15px] leading-[1.6] text-[#5A5570]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
