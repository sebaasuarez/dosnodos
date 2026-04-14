import { useState, useRef, useEffect } from "react"
import { Bot, Send, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Translation, type Language } from "@/lib/i18n"

interface Message {
  id: number
  role: "assistant" | "user"
  text: string
}

interface ChatInterfaceProps {
  t: Translation
  currentLanguage: Language
}

export function ChatInterface({ t, currentLanguage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: t.chat?.greeting || "Hola, ¿cómo puedo ayudarte hoy?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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
    <div className="w-full flex flex-col h-[400px]">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-600">
                      {t.chat?.assistant || "Asistente AI"}
                    </span>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg rounded-bl-none p-3 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(inputValue)
          }}
          className="flex space-x-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.chat?.placeholder || "Escribe un mensaje..."}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
