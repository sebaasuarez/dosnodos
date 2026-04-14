"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import PhoneInput from "@/components/phone-input"
import { type Language, translations } from "@/lib/i18n"
import { trackFormSubmit } from "@/lib/gtm"

interface ContactFormProps {
  language: Language
}

// Validación de teléfono
const phoneRegex = /^\+[1-9]\d{1,14}$/

export default function ContactForm({ language }: ContactFormProps) {
  const t = translations[language]

  // Esquema reactivo a las traducciones
  const formSchema = z.object({
    name: z.string().min(2, { message: t.cta.form.validation.nameMin }),
    email: z
      .string()
      .min(1, { message: t.cta.form.validation.emailRequired })
      .email({ message: t.cta.form.validation.emailInvalid }),
    company: z.string().min(1, { message: t.cta.form.validation.companyRequired }),
    phone: z.string().refine(
      (val) => {
        const cleanPhone = val.replace(/\s/g, "")
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 8
      },
      { message: t.cta.form.validation.phoneInvalid },
    ),
    message: z.string().min(10, { message: t.cta.form.validation.messageMin }),
  })

  type FormData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
    },
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  const values = watch()

  const calculateProgress = () => {
    let filledValidFields = 0
    const totalFields = 5

    if (values.name?.length >= 2 && !errors.name) filledValidFields++
    if (values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && !errors.email) filledValidFields++
    if (values.company?.length > 0 && !errors.company) filledValidFields++
    
    // Custom phone check for progress
    const cleanPhone = (values.phone || "").replace(/\s/g, "")
    if (phoneRegex.test(cleanPhone) && cleanPhone.length >= 8 && !errors.phone) filledValidFields++
    
    if (values.message?.length >= 10 && !errors.message) filledValidFields++

    return Math.round((filledValidFields / totalFields) * 100)
  }

  const progress = calculateProgress()

  const onSubmit = async (data: FormData) => {
    setSubmitError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          language: language,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || t.cta.form.errors.submitError)
      }

      setIsSubmitted(true)
      reset() // Limpiamos formulario
      
      // Track form submission
      trackFormSubmit(language, data.company)
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setSubmitError(t.cta.form.errors.submitError)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t.cta.form.success.title}</h3>
          <p className="text-blue-100">{t.cta.form.success.message}</p>
          <div className="bg-white/10 rounded-lg p-4 text-sm text-blue-100">
            <p>{t.cta.form.confirmationNote}</p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {t.cta.form.success.button}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {submitError && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-200 text-sm">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.name}
                {...register("name")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.name
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touchedFields.name && !errors.name
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.name && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name.message as string}</span>
                </div>
              )}
              {touchedFields.name && !errors.name && values.name && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.perfect}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.email}
                type="email"
                {...register("email")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touchedFields.email && !errors.email
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email.message as string}</span>
                </div>
              )}
              {touchedFields.email && !errors.email && values.email && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.validEmail}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.company}
                {...register("company")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.company
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touchedFields.company && !errors.company
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.company && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.company.message as string}</span>
                </div>
              )}
              {touchedFields.company && !errors.company && values.company && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.excellent}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    language={language}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={
                      language === "es" ? "Número de teléfono" : language === "en" ? "Phone number" : "Número de telefone"
                    }
                    disabled={isSubmitting}
                    error={!!errors.phone}
                    className="w-full"
                  />
                )}
              />
              
              {errors.phone && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.phone.message as string}</span>
                </div>
              )}
              {touchedFields.phone && !errors.phone && values.phone && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.validPhone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder={t.cta.form.message}
              {...register("message")}
              disabled={isSubmitting}
              className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-[100px] transition-all duration-200 resize-none ${
                errors.message
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                  : touchedFields.message && !errors.message
                    ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                    : "focus:border-white/50 focus:ring-white/20"
              }`}
            />
            <div className="flex justify-between items-center">
              <div>
                {errors.message && (
                  <div className="flex items-center space-x-1 text-red-300 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.message.message as string}</span>
                  </div>
                )}
                {touchedFields.message && !errors.message && values.message && (
                  <div className="flex items-center space-x-1 text-green-300 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t.cta.form.validation.complete}</span>
                  </div>
                )}
              </div>
              <span className={`text-sm ${values.message?.length < 10 ? "text-white/50" : "text-green-300"}`}>
                {values.message?.length || 0}/10 min
              </span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !isValid}
            className={`w-full text-lg py-3 transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
                {t.cta.form.submitting}
              </>
            ) : (
              <>
                {t.cta.form.submit}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-100">
              <span>{t.cta.form.progress}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
