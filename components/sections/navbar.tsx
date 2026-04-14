import Image from "next/image"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import { trackCTAClick } from "@/lib/gtm"
import { type Translation, type Language } from "@/lib/i18n"

interface NavbarProps {
  t: Translation
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export function Navbar({ t, currentLanguage, onLanguageChange }: NavbarProps) {
  return (
    <nav 
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50"
      aria-label="Navegación principal"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo-dosnodos.png"
              alt="DosNodos Logo"
              width={160}
              height={64}
              className="h-10 sm:h-12 md:h-16 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-none"
              priority
            />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.nav.services}
            </a>
            <a href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.nav.benefits}
            </a>
            <a href="#sectores" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.nav.sectors}
            </a>
            <a href="#contacto" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t.nav.contact}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                trackCTAClick("primary", "navigation")
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t.nav.demo}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
