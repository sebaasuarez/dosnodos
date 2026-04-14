import { BarChart3, Bot, Globe, Target, Palette, Settings } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface ServicesProps {
  t: Translation
}

export function Services({ t }: ServicesProps) {
  return (
    <AnimatedSection animation="fadeInUp" delay={100}>
      <section id="servicios" className="py-20 bg-white animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.services.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-white hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-blue-900">{t.services.items.ai.title}</CardTitle>
                <CardDescription className="text-gray-700">{t.services.items.ai.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t.services.items.web.title}</CardTitle>
                <CardDescription>{t.services.items.web.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">{t.services.items.automation.title}</CardTitle>
                <CardDescription>{t.services.items.automation.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">{t.services.items.marketing.title}</CardTitle>
                <CardDescription>{t.services.items.marketing.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                  <Palette className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle className="text-xl">{t.services.items.branding.title}</CardTitle>
                <CardDescription>{t.services.items.branding.description}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">{t.services.items.integration.title}</CardTitle>
                <CardDescription>{t.services.items.integration.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
