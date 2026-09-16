/**
 * Datos de la Política de Tratamiento de Datos Personales.
 *
 * Vive aparte de la página para tener un solo sitio donde actualizar la fecha
 * de vigencia, los datos del responsable y la lista de encargados cuando
 * cambie un proveedor. El texto legal se apoya en la Ley 1581 de 2012 y el
 * Decreto 1074 de 2015.
 *
 * IMPORTANTE: es un borrador conforme a la normativa general. Antes de operar
 * a volumen debe validarlo un abogado colombiano y confirmarse la razón
 * social, el NIT y la dirección física, además de la eventual inscripción de
 * las bases de datos en el RNBD de la SIC.
 */

export const POLITICA_VIGENCIA = "16 de septiembre de 2026"

/** Datos del responsable. Los marcados como PENDIENTE los confirma el cliente. */
export const RESPONSABLE = {
  nombre: "Dos Nodos",
  // PENDIENTE: razón social y NIT reales para la versión definitiva.
  razonSocial: "Dos Nodos",
  domicilio: "Medellín, Antioquia, Colombia",
  email: "hola@dosnodos.com.co",
  telefono: "+57 312 734 4026",
}

/**
 * Encargados a los que se transfieren o transmiten datos, con su finalidad.
 * Es la parte que hace honesta la cláusula de transferencia internacional: en
 * vez de un "podríamos compartir con terceros", se nombra para qué.
 */
export const ENCARGADOS: { nombre: string; proposito: string; pais: string }[] = [
  {
    nombre: "Supabase",
    proposito: "Base de datos donde se guardan los contactos",
    pais: "Estados Unidos",
  },
  {
    nombre: "Vercel",
    proposito: "Servidor donde funcionan los sitios web",
    pais: "Estados Unidos",
  },
  { nombre: "Resend", proposito: "Envío de correos de notificación", pais: "Estados Unidos" },
  {
    nombre: "Meta (WhatsApp)",
    proposito: "Canal de conversación con el cliente",
    pais: "Estados Unidos",
  },
  { nombre: "Google", proposito: "Analítica y medición del sitio", pais: "Estados Unidos" },
]
