import { Briefcase, Building2, GraduationCap, Heart, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface SectorsProps {
  t: Translation
}

export function Sectors({ t }: SectorsProps) {
  return (
    <AnimatedSection animation="fadeInRight" delay={200}>
      <section id="sectores" className="py-20 bg-white animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectors.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.sectors.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.ecommerce.title}</h3>
                <p className="text-gray-600">{t.sectors.items.ecommerce.description}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.education.title}</h3>
                <p className="text-gray-600">{t.sectors.items.education.description}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.startups.title}</h3>
                <p className="text-gray-600">{t.sectors.items.startups.description}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.health.title}</h3>
                <p className="text-gray-600">{t.sectors.items.health.description}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.sales.title}</h3>
                <p className="text-gray-600">{t.sectors.items.sales.description}</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.realestate.title}</h3>
                <p className="text-gray-600">{t.sectors.items.realestate.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}
