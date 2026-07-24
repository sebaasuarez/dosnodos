"use client"

import AnimatedSection from "@/components/animated-section"
import ContactForm from "@/components/contact-form"
import { trackWhatsAppClick, trackEmailClick } from "@/lib/gtm"
import { type Language, type Translation } from "@/lib/i18n"

interface ContactProps {
  t: Translation
  currentLanguage: Language
}

const WA_NUMBER = "573127344026"

export function Contact({ t, currentLanguage }: ContactProps) {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(500px 260px at 12% 0%, rgba(147,51,234,.22), transparent 62%), radial-gradient(520px 280px at 90% 100%, rgba(37,99,235,.2), transparent 64%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(28px,5vw,56px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInLeft">
          <div className="flex flex-col gap-[18px]">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-[#C4A6F5]">
              {t.contact.eyebrow}
            </span>
            <h2 className="text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#ECEAF7]">
              {t.contact.titleLead}{" "}
              <span
                className="font-serif italic font-normal"
                style={{
                  background: "linear-gradient(120deg,#C084FC,#60A5FA)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.contact.titleAccent}
              </span>
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-[1.55] text-[#A29FBE]">{t.contact.subtitle}</p>

            <div className="mt-1 flex flex-col gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="flex items-center gap-2.5 text-[14.5px] text-[#ECEAF7] transition-colors hover:text-white"
              >
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white/[0.06]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2z" />
                  </svg>
                </span>
                {t.contact.whatsapp}
              </a>
              <a
                href={`mailto:${t.contact.email}`}
                onClick={() => trackEmailClick()}
                className="flex items-center gap-2.5 text-[14.5px] text-[#ECEAF7] transition-colors hover:text-white"
              >
                <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-white/[0.06]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4A6F5" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </span>
                {t.contact.email}
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInRight">
          <ContactForm language={currentLanguage} />
        </AnimatedSection>
      </div>
    </section>
  )
}
