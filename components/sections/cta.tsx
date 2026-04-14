import { MessageSquare } from "lucide-react"
import ContactForm from "@/components/contact-form"
import { ChatInterface } from "@/components/chat-interface"
import { type Translation, type Language } from "@/lib/i18n"

interface CTAProps {
  t: Translation
  currentLanguage: Language
}

export function CTA({ t, currentLanguage }: CTAProps) {
  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">{t.cta.title}</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t.cta.subtitle}</p>
          </div>

          <ContactForm language={currentLanguage} />

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden mt-12 max-w-2xl mx-auto border border-blue-100">
            <ChatInterface t={t} currentLanguage={currentLanguage} />
          </div>
        </div>
      </div>
    </section>
  )
}
