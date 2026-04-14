import Image from "next/image"
import { trackEmailClick, trackWhatsAppClick } from "@/lib/gtm"
import { type Translation } from "@/lib/i18n"

interface FooterProps {
  t: Translation
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/logo-dosnodos.png"
              alt="DosNodos Logo"
              width={120}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="text-gray-400">{t.footer.description}</p>
            <p className="text-sm text-blue-400">dosnodos.com.co</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t.footer.services}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t.services.items.ai.title}</li>
              <li>{t.services.items.web.title}</li>
              <li>{t.services.items.marketing.title}</li>
              <li>{t.services.items.automation.title}</li>
              <li>{t.services.items.branding.title}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t.footer.sectors}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t.sectors.items.ecommerce.title}</li>
              <li>{t.sectors.items.education.title}</li>
              <li>{t.sectors.items.health.title}</li>
              <li>{t.sectors.items.realestate.title}</li>
              <li>{t.sectors.items.startups.title}</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t.footer.contact}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:hola@dosnodos.com.co"
                  className="hover:text-white transition-colors"
                  onClick={trackEmailClick}
                >
                  hola@dosnodos.com.co
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573127344026?text=Hola,%20vengo%20desde%20su%20sitio%20Dos%20Nodos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  onClick={trackWhatsAppClick}
                >
                  +57 3127344026
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573127344026?text=Hola,%20vengo%20desde%20su%20sitio%20Dos%20Nodos."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  onClick={trackWhatsAppClick}
                >
                  WhatsApp: +57 3127344026
                </a>
              </li>
              <li>Medellín, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 DosNodos. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
