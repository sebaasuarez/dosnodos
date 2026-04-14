import { BarChart3, Building2, Clock, DollarSign, Globe, MessageSquare, Scale, Zap } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface BenefitsProps {
  t: Translation
}

export function Benefits({ t }: BenefitsProps) {
  return (
    <AnimatedSection animation="fadeInLeft" delay={100}>
      <section id="beneficios" className="py-20 bg-gray-50 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.benefits.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.benefits.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.immediate.title}</h3>
              <p className="text-gray-600">{t.benefits.items.immediate.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.cost.title}</h3>
              <p className="text-gray-600">{t.benefits.items.cost.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Scale className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.scalability.title}</h3>
              <p className="text-gray-600">{t.benefits.items.scalability.description}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.integration.title}</h3>
              <p className="text-gray-600">{t.benefits.items.integration.description}</p>
            </div>
          </div>

          {/* Integration Channels */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{t.benefits.channels.title}</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-semibold text-gray-900">{t.benefits.channels.whatsapp}</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-900">{t.benefits.channels.website}</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <p className="font-semibold text-gray-900">{t.benefits.channels.ecommerce}</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <p className="font-semibold text-gray-900">{t.benefits.channels.crm}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
