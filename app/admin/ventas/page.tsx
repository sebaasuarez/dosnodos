"use client"

import { useState } from "react"
import { Send, CheckCircle, Mail, Building, User, Info, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminVentasPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    company: "",
    subject: "Hablemos sobre optimizar la tecnología de tu empresa",
    message: "",
    sellerName: "Sebastián Suarez",
    type: "cold" as "cold" | "followup"
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.details || result.error || "No se pudo enviar el correo.")
      }

      setStatus("success")
      setFormData({ ...formData, clientName: "", clientEmail: "", company: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error desconocido")
      setStatus("error")
    }
  }

  const templates = {
    cold: `He estado analizando la presencia digital de ${formData.company || 'tu empresa'} y noté grandes oportunidades de optimización en su atención al cliente e infraestructura web.

Me encantaría mostrarte, sin compromiso, cómo nuestras soluciones de Inteligencia Artificial y Paid Media pueden reducir costos operativos y acelerar la captación de prospectos.`,
    followup: `Espero que estés teniendo un excelente día.

Te escribo para darle seguimiento a nuestra conversación anterior sobre cómo Dos Nodos puede apoyar el crecimiento tecnológico de ${formData.company || 'tu empresa'}. Me encantaría saber si pudiste revisar la información.`
  }

  const applyTemplate = (type: "cold" | "followup") => {
    setFormData(prev => ({
      ...prev,
      type,
      message: templates[type]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-3xl space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
            <Mail className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dos Nodos Outreach</h1>
          <p className="text-gray-500">Herramienta interna de prospección B2B.</p>
        </div>

        <div className="bg-white px-6 py-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  Nombre del Contacto
                </label>
                <Input required placeholder="Ej. Juan Pérez" value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Correo Destino
                </label>
                <Input required type="email" placeholder="juan@empresa.com" value={formData.clientEmail} onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} className="bg-gray-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  Empresa del Cliente
                </label>
                <Input required placeholder="Ej. Acme Corp" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  Vendedor (Firma)
                </label>
                <Input required placeholder="Tu Nombre" value={formData.sellerName} onChange={(e) => setFormData({...formData, sellerName: e.target.value})} className="bg-gray-50" />
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Asunto</label>
              <Input required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="bg-gray-50 font-medium" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  Cuerpo
                </label>
                <div className="space-x-2">
                  <button type="button" onClick={() => applyTemplate("cold")} className={`text-xs px-3 py-1 rounded-full border ${formData.type === 'cold' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-500'}`}>Primer Contacto</button>
                  <button type="button" onClick={() => applyTemplate("followup")} className={`text-xs px-3 py-1 rounded-full border ${formData.type === 'followup' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-500'}`}>Seguimiento</button>
                </div>
              </div>
              <Textarea required rows={7} placeholder="Mensaje..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-gray-50" />
            </div>

            {status === "error" && (
              <div className="p-4 bg-red-50 text-red-800 text-sm rounded-lg flex items-start gap-3 border border-red-100">
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                    <p className="font-bold border-b border-red-200 mb-1 pb-1">Error al enviar:</p>
                    <p>{errorMessage}</p>
                    <p className="mt-2 text-xs opacity-80 italic">Tip: Revisa tu RESEND_API_KEY en el archivo .env.local</p>
                </div>
              </div>
            )}
            
            {status === "success" && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center justify-center font-bold gap-2 border border-green-100">
                <CheckCircle className="h-5 w-5" />
                ¡Correo enviado con éxito!
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600" disabled={status === "loading"}>
              {status === "loading" ? "Procesando..." : "Enviar Correo Diseñado"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
