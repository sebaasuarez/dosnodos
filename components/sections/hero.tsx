import { useState, useEffect } from "react"
import { ArrowRight, Bot, Clock, MessageSquare, Users, Zap, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import AnimatedSection from "@/components/animated-section"
import { trackCTAClick } from "@/lib/gtm"
import { type Translation, type Language } from "@/lib/i18n"

interface Message {
  id: number
  role: "assistant" | "user"
  text: string
}

interface HeroProps {
  t: Translation
  currentLanguage: Language
}

export function Hero({ t, currentLanguage }: HeroProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: t.chat.greeting },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = { id: Date.now(), role: "user", text }
    const newMessages = [...messages, userMessage]
    
    setMessages(newMessages)
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          language: currentLanguage
        })
      })

      if (!response.ok) throw new Error("Fallo en la respuesta de IA")
      
      const data = await response.json()
      
      const botResponse: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: data.message,
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error(error)
      const errorMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: "Lo siento, estamos desconectados temporalmente." 
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <AnimatedSection animation="fadeInUp">
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeInUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t.hero.badge}</Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  {t.hero.title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {t.hero.titleHighlight}
                  </span>{" "}
                  inteligentes
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t.hero.subtitle}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  onClick={() => {
                    trackCTAClick("primary", "hero")
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 bg-transparent"
                  onClick={() => {
                    trackCTAClick("secondary", "hero")
                    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t.hero.ctaSecondary}
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{t.hero.features.support}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{t.hero.features.founded}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>{t.hero.features.results}</span>
                </div>
              </div>
            </div>

            {/* Interactive Chat Demo */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-8 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden flex flex-col h-[400px] shadow-inner">
                  {/* Header del Chat */}
                  <div className="bg-gray-50 p-4 border-b flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm leading-none">{t.chat.assistant}</p>
                      <p className="text-[10px] text-green-500 font-medium mt-1">● {t.chat.online}</p>
                    </div>
                  </div>

                  {/* Área de Mensajes */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                              msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-100 text-gray-700 rounded-tl-none"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input del Chat */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage(inputValue)
                    }}
                    className="p-3 bg-gray-50 border-t flex items-center space-x-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t.chat.greeting}
                      className="flex-1 bg-white border-gray-200 h-9 text-xs focus-visible:ring-blue-500"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="h-9 w-9 bg-blue-600 hover:bg-blue-700 shrink-0"
                      disabled={!inputValue.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hidden sm:flex items-center justify-center shadow-lg animate-pulse">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

