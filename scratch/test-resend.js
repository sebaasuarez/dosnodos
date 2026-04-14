require('dotenv').config({ path: '.env.local' });

async function testResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: RESEND_API_KEY no encontrada en .env.local");
    return;
  }

  console.log("Testing Resend API Key...");
  console.log("Length:", apiKey.trim().length);
  
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "delivered@resend.dev",
        subject: "Test",
        html: "<p>Test</p>"
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log("✅ Éxito! El sistema de Resend aceptó la llave.");
      console.log("ID del mensaje:", data.id);
    } else {
      console.error("❌ Fallo de Resend:");
      console.error(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Error de red:", error.message);
  }
}

testResend();
