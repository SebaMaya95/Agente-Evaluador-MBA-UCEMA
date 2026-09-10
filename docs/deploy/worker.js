/**
 * Mesa de Corrección — backend
 * Un único archivo. Se despliega en Cloudflare Workers desde el navegador.
 *
 * Qué hace: recibe el pedido armado por la página, se lo manda a la API de
 * Anthropic con la clave del dueño, y devuelve la respuesta a medida que se
 * escribe. Quien usa la página no necesita cuenta de nada.
 *
 * Variables que hay que cargar en el panel de Cloudflare (Settings → Variables):
 *   ANTHROPIC_API_KEY   secreto, obligatorio  — la clave de console.anthropic.com
 *   MODEL               texto, obligatorio    — el id exacto del modelo a usar
 *   ORIGENES            texto, opcional       — dominios permitidos, separados por coma
 *                                               por defecto: https://sebamaya95.github.io
 *
 * Diagnóstico: abrir la URL del Worker en el navegador muestra el estado de la
 * configuración. Agregarle /modelos lista los ids de modelo válidos para tu cuenta,
 * que es de donde sale el valor de MODEL.
 */

const LIMITE_PEDIDO = 400000;   // caracteres del prompt; un trabajo final típico ronda los 30.000
const MAX_TOKENS_SALIDA = 4000;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // --- diagnóstico: lista de modelos válidos para esta clave ---
    if (url.pathname.endsWith("/modelos")) {
      if (!env.ANTHROPIC_API_KEY) return texto("Falta cargar ANTHROPIC_API_KEY.", 500, cors);
      const r = await fetch("https://api.anthropic.com/v1/models?limit=50", {
        headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      });
      const cuerpo = await r.text();
      return new Response(cuerpo, { status: r.status, headers: { ...cors, "content-type": "application/json" } });
    }

    // --- estado, al abrirlo en el navegador ---
    if (request.method === "GET") {
      const partes = [
        "Mesa de Corrección — backend",
        "",
        "ANTHROPIC_API_KEY: " + (env.ANTHROPIC_API_KEY ? "cargada" : "FALTA"),
        "MODEL: " + (env.MODEL || "FALTA"),
        "Orígenes permitidos: " + origenesPermitidos(env).join(", "),
        "",
        env.ANTHROPIC_API_KEY && env.MODEL
          ? "Listo para recibir correcciones."
          : "Cargá lo que falta en Settings → Variables and Secrets, y volvé a desplegar.",
        "",
        "Para ver los ids de modelo válidos, agregale /modelos a esta URL.",
      ];
      return texto(partes.join("\n"), 200, cors);
    }

    if (request.method !== "POST") return texto("Método no permitido.", 405, cors);
    if (!env.ANTHROPIC_API_KEY) return error("config", "El backend no tiene cargada la clave de la API.", 500, cors);
    if (!env.MODEL) return error("config", "El backend no tiene cargado el modelo. Abrí la URL del Worker con /modelos al final para ver los ids válidos.", 500, cors);

    let datos;
    try {
      datos = await request.json();
    } catch {
      return error("pedido_invalido", "El pedido no es JSON válido.", 400, cors);
    }

    const prompt = typeof datos?.prompt === "string" ? datos.prompt : "";
    if (prompt.length < 500) return error("pedido_invalido", "El pedido llegó vacío o demasiado corto.", 400, cors);
    if (prompt.length > LIMITE_PEDIDO) {
      return error(
        "demasiado_grande",
        "El trabajo es más grande de lo que este backend acepta (" +
          Math.round(prompt.length / 1000) + " mil caracteres contra un límite de " +
          Math.round(LIMITE_PEDIDO / 1000) + " mil). Sacá los archivos que no hagan falta y probá de nuevo.",
        413, cors
      );
    }

    const respuesta = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.MODEL,
        max_tokens: MAX_TOKENS_SALIDA,
        temperature: 0,
        stream: true,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      let mensaje = "La API rechazó el pedido.";
      try {
        const j = JSON.parse(detalle);
        if (j?.error?.message) mensaje = j.error.message;
      } catch {}
      if (respuesta.status === 401) mensaje = "La clave de la API no es válida o fue revocada.";
      if (respuesta.status === 404) mensaje = "El modelo configurado no existe para esta cuenta. Abrí la URL del Worker con /modelos al final y corregí la variable MODEL.";
      if (respuesta.status === 429) mensaje = "La cuenta llegó a su límite de uso por ahora. Esperá un momento y volvé a intentar.";
      return error("api", mensaje, respuesta.status, cors);
    }

    return new Response(respuesta.body, {
      headers: {
        ...cors,
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-cache, no-transform",
      },
    });
  },
};

function origenesPermitidos(env) {
  const crudo = (env.ORIGENES || "https://sebamaya95.github.io").split(",");
  return crudo.map((s) => s.trim()).filter(Boolean);
}
function corsHeaders(request, env) {
  const origen = request.headers.get("Origin") || "";
  const permitidos = origenesPermitidos(env);
  const ok = permitidos.includes("*") || permitidos.includes(origen);
  return {
    "access-control-allow-origin": ok ? origen : permitidos[0] || "*",
    "access-control-allow-methods": "POST, GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}
function texto(cuerpo, status, cors) {
  return new Response(cuerpo, { status, headers: { ...cors, "content-type": "text/plain; charset=utf-8" } });
}
function error(codigo, mensaje, status, cors) {
  return new Response(JSON.stringify({ error: { codigo, mensaje } }), {
    status,
    headers: { ...cors, "content-type": "application/json; charset=utf-8" },
  });
}
