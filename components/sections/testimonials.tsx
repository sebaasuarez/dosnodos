import { Card, CardContent } from "@/components/ui/card"
import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface TestimonialsProps {
  t: Translation
}

export function Testimonials({ t }: TestimonialsProps) {
  return (
    <AnimatedSection animation="fadeInUp" delay={100}>
      <section className="py-20 bg-gray-50 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">{t.testimonials.items.laura.text}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">LM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.testimonials.items.laura.name}</p>
                    <p className="text-sm text-gray-500">{t.testimonials.items.laura.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">{t.testimonials.items.roberto.text}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">DR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.testimonials.items.roberto.name}</p>
                    <p className="text-sm text-gray-500">{t.testimonials.items.roberto.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">{t.testimonials.items.camila.text}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">CP</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.testimonials.items.camila.name}</p>
                    <p className="text-sm text-gray-500">{t.testimonials.items.camila.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">{t.testimonials.stats.satisfaction}</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-green-600">75%</p>
              <p className="text-gray-600">{t.testimonials.stats.reduction}</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-purple-600">24/7</p>
              <p className="text-gray-600">{t.testimonials.stats.availability}</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-orange-600">5x</p>
              <p className="text-gray-600">{t.testimonials.stats.leads}</p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
