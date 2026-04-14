import { Bot, Code, Palette, Target } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import { type Translation, type Language } from "@/lib/i18n"

interface TeamProps {
  t: Translation
  currentLanguage: Language
}

export function Team({ t, currentLanguage }: TeamProps) {
  return (
    <AnimatedSection animation="scaleIn" delay={200}>
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.team.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.team.subtitle}</p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">{t.team.description}</p>

            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {currentLanguage === "es"
                    ? "Desarrolladores"
                    : currentLanguage === "en"
                      ? "Developers"
                      : "Desenvolvedores"}
                </h3>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Palette className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {currentLanguage === "es" ? "Diseñadores" : currentLanguage === "en" ? "Designers" : "Designers"}
                </h3>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {currentLanguage === "es"
                    ? "Especialistas IA"
                    : currentLanguage === "en"
                      ? "AI Specialists"
                      : "Especialistas IA"}
                </h3>
              </div>

              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {currentLanguage === "es"
                    ? "Consultores"
                    : currentLanguage === "en"
                      ? "Consultants"
                      : "Consultores"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
