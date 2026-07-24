"use client"

import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"
import {
  AppWindow,
  CodeXml,
  LayoutTemplate,
  PanelsTopLeft,
  ShoppingBag,
  Smartphone,
} from "lucide-react"

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

const webIcons = [ShoppingBag, LayoutTemplate, PanelsTopLeft, Smartphone, AppWindow, CodeXml]

export function Services({ t }: ServicesProps) {
  const serviceCards = [
    {
      title: t.services.platforms.title,
      description: t.services.platforms.description,
      chips: t.services.platforms.chips,
      icon: IconPlatforms,
      badge: t.services.platforms.badge,
    },
    {
      title: t.services.apps.title,
      description: t.services.apps.description,
      chips: t.services.apps.chips,
      icon: IconApps,
      badge: t.services.apps.badge,
    },
    {
      title: t.services.ai.title,
      description: t.services.ai.description,
      chips: t.services.ai.chips,
      icon: IconAI,
      badge: t.services.ai.badge,
    },
    ...t.services.webDevelopment.items.map((service, index) => {
      const Icon = webIcons[index]
      return {
        ...service,
        chips: [],
        icon: <Icon width={24} height={24} strokeWidth={1.8} />,
        badge: undefined,
      }
    }),
  ]

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
            <p className="font-serif text-[18px] italic leading-[1.5] text-brand-cta">
              {t.services.webDevelopment.title}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {serviceCards.map((service, index) => (
            <AnimatedSection
              key={service.title}
              animation="fadeInUp"
              delay={Math.min(index * 45, 270)}
              className="h-full"
            >
              <article className="relative flex h-full flex-col gap-3.5 rounded-[20px] border border-[#E4E1F0] bg-white p-7 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-[#CDB8EA] hover:shadow-[0_18px_38px_-30px_rgba(124,34,206,.55)]">
                {service.badge && (
                <span className="absolute right-[18px] top-[18px] rounded-full bg-brand-purple px-2.5 py-1 font-mono text-[10px] tracking-[.1em] text-white">
                    {service.badge}
                </span>
              )}
                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-[#E4E1F0] bg-surface-3 text-brand-cta [&_svg]:stroke-current">
                  {service.icon}
              </div>
                <h3 className="text-[21px] font-semibold tracking-[-0.01em]">{service.title}</h3>
                <p className="text-[14.5px] leading-[1.5] text-[#5A5570]">{service.description}</p>
                {service.chips.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {service.chips.map((chip) => (
                      <Chip key={chip} star={Boolean(service.badge)}>
                        {chip}
                      </Chip>
                    ))}
                  </div>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
