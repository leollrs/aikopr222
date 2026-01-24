import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-intake-secret",
    "access-control-allow-methods": "POST, OPTIONS",
  };
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  try {
    // Create Base44 client (ok to keep even if unused)
    createClientFromRequest(req);

    // Parse JSON safely
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...corsHeaders(), "content-type": "application/json" } }
      );
    }

    const formData = body && body.formData ? body.formData : null;
    const lang = body && body.lang === "en" ? "en" : "es";

    if (!formData || !formData.fullName || !formData.email || !formData.phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (fullName, email, phone)" }),
        { status: 400, headers: { ...corsHeaders(), "content-type": "application/json" } }
      );
    }

    // ENV VARS in Base44 Settings → Environment
    // N8N_INTAKE_WEBHOOK_URL = https://xxxx.app.n8n.cloud/webhook/intake
    // (Optional) N8N_INTAKE_SECRET = long-random-string
    const webhookUrl = Deno.env.get("N8N_INTAKE_WEBHOOK_URL");
    const secret = Deno.env.get("N8N_INTAKE_SECRET") || "";

    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: "Missing env var: N8N_INTAKE_WEBHOOK_URL" }),
        { status: 500, headers: { ...corsHeaders(), "content-type": "application/json" } }
      );
    }

    const payload = {
      event: "intake_submitted",
      lang: lang,
      formData: formData,
      meta: {
        source: "base44",
        ts: new Date().toISOString(),
      },
    };

    const headers = { "content-type": "application/json" };
    if (secret) headers["x-intake-secret"] = secret;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    const raw = await res.text();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "n8n webhook failed", status: res.status, details: raw }),
        { status: 502, headers: { ...corsHeaders(), "content-type": "application/json" } }
      );
    }

    // Try to parse JSON response from n8n (fallback to raw text)
    let n8nData;
    try {
      n8nData = raw ? JSON.parse(raw) : { ok: true };
    } catch (e) {
      n8nData = { ok: true, raw: raw };
    }

    return new Response(
      JSON.stringify({ success: true, n8n: n8nData }),
      { status: 200, headers: { ...corsHeaders(), "content-type": "application/json" } }
    );
  } catch (error) {
    console.error("[submitIntakeToN8n] error:", error);
    return new Response(
      JSON.stringify({ error: error && error.message ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders(), "content-type": "application/json" } }
    );
  }
});