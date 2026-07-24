"use client"

import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface ServicesProps {
  t: Translation
}

function Chip({ children, star = false }: { children: React.ReactNode; star?: boolean }) {
  return (
    <span
      className={
        star
          ? "rounded-full border border-[#E4D4F7] bg-white px-2.5 py-1 font-mono text-[11px] text-brand-cta"
          : "rounded-full border border-[#E4E1F0] px-2.5 py-1 font-mono text-[11px] text-[#6A667E]"
      }
    >
      {children}
    </span>
  )
}

const IconPlatforms = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C22CE" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M3 8h18M8 21h8" />
  </svg>
)
const IconApps = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C22CE" strokeWidth="1.8">
    <rect x="7" y="3" width="10" height="18" rx="2" />
    <path d="M11 18h2" />
  </svg>
)
const IconAI = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C22CE" strokeWidth="1.8">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
  </svg>
)

export function Services({ t }: ServicesProps) {
  return (
    <section id="servicios">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInUp">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
              {t.services.eyebrow}
            </span>
            <h2 className="text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {t.services.title}{" "}
              <span className="font-serif italic font-normal">{t.services.titleAccent}</span>
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#5A5570]">{t.services.subtitle}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {/* Platforms */}
          <AnimatedSection animation="fadeInUp" delay={60} className="h-full">
            <article className="flex h-full flex-col gap-3.5 rounded-[20px] border border-[#E4E1F0] bg-white p-7">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#E4E1F0] bg-surface-3">
                {IconPlatforms}
              </div>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{t.services.platforms.title}</h3>
              <p className="text-[14.5px] leading-[1.5] text-[#5A5570]">{t.services.platforms.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {t.services.platforms.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </article>
          </AnimatedSection>

          {/* Apps */}
          <AnimatedSection animation="fadeInUp" delay={120} className="h-full">
            <article className="flex h-full flex-col gap-3.5 rounded-[20px] border border-[#E4E1F0] bg-white p-7">
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#E4E1F0] bg-surface-3">
                {IconApps}
              </div>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{t.services.apps.title}</h3>
              <p className="text-[14.5px] leading-[1.5] text-[#5A5570]">{t.services.apps.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {t.services.apps.chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </article>
          </AnimatedSection>

          {/* AI — star */}
          <AnimatedSection animation="fadeInUp" delay={180} className="h-full">
            <article
              className="relative flex h-full flex-col gap-3.5 rounded-[20px] border border-brand-purple p-7 shadow-[0_20px_44px_-30px_rgba(147,51,234,.6)]"
              style={{ background: "linear-gradient(160deg,#fff,#F6F1FE)" }}
            >
              {t.services.ai.badge && (
                <span className="absolute right-[18px] top-[18px] rounded-full bg-brand-purple px-2.5 py-1 font-mono text-[10px] tracking-[.1em] text-white">
                  {t.services.ai.badge}
                </span>
              )}
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#E4D4F7] bg-white">
                {IconAI}
              </div>
              <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{t.services.ai.title}</h3>
              <p className="text-[14.5px] leading-[1.5] text-[#3A3550]">{t.services.ai.description}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {t.services.ai.chips.map((c) => (
                  <Chip key={c} star>
                    {c}
                  </Chip>
                ))}
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
