import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
})

export async function POST(req: Request) {
  try {
    const { messages, language } = await req.json()

    // Preparar el contexto de DosNodos según el idioma
    let systemPrompt = ""
    switch (language) {
      case "en":
        systemPrompt = `You are Dos Nodos Assistant, an AI expert at Dos Nodos. 
Dos Nodos is an innovation agency providing intelligent virtual assistants, modern web development, and digital automation. 
Keep your answers brief, friendly, and under 3 sentences. Emphasize that AI bots run 24/7. 
Encourage users gently to use the contact form.`
        break
      case "pt":
        systemPrompt = `Você é o Assistente Dos Nodos, um especialista em IA na Dos Nodos. 
A Dos Nodos é uma agência de inovação que oferece assistentes virtuais inteligentes, desenvolvimento web moderno e automação digital. 
Mantenha suas respostas curtas (máximo 3 frases) e amigáveis. Destaque que os bots de IA funcionam 24/7. 
Incentive gentilmente os usuários a usarem o formulário de contato.`
        break
      default: // "es"
        systemPrompt = `Eres el Asistente de Dos Nodos, un experto en IA. 
Dos Nodos es una agencia de innovación tecnológica que ofrece asistentes virtuales inteligentes (chatbots), desarrollo web moderno y automatización de procesos empresariales. 
Responde de forma amable, persuasiva y siempre breve (máximo 3 oraciones). 
Menciona beneficios clave como soporte 24/7 sin descanso, integración con WhatsApp o páginas web. 
Invitalos a llenar el formulario de contacto para que el equipo comercial se ponga en contacto.`
        break
    }

    // Formatear los mensajes al estilo de OpenAI
    const openAiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.text,
      })),
    ]

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Modelo Groq potente y veloz
      messages: openAiMessages,
      temperature: 0.7,
      max_tokens: 150,
    })

    const botMessage = completion.choices[0]?.message?.content || "Lo siento, tuve un error procesando tu solicitud."

    return NextResponse.json({ message: botMessage })
  } catch (error) {
    console.error("Error en API de OpenAI:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
