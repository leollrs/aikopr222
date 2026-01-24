import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

function corsHeaders() {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-intake-secret",
    "access-control-allow-methods": "POST, OPTIONS",
  };
}

function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders(), "content-type": "application/json" },
  });
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  // Optional: enforce POST only
  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    // Base44 client (ok to keep even if you don't use it)
    createClientFromRequest(req);

    // Parse JSON safely
    let body;
    try {
      body = await req.json();
    } catch {
      return jsonResponse(400, { error: "Invalid JSON body" });
    }

    const formData = body?.formData ?? null;
    const lang = body?.lang === "en" ? "en" : "es";

    if (!formData?.fullName || !formData?.email || !formData?.phone) {
      return jsonResponse(400, {
        error: "Missing required fields (fullName, email, phone)",
      });
    }

    // IMPORTANT:
    // In Base44, values shown under "Configured Secrets" are still env vars in runtime.
    // You retrieve them with Deno.env.get("NAME").
    const webhookUrl = Deno.env.get("N8N_INTAKE_WEBHOOK_URL");
    const secret = Deno.env.get("N8N_INTAKE_SECRET") || ""; // optional

    if (!webhookUrl) {
      return jsonResponse(500, {
        error:
          "Missing env var: N8N_INTAKE_WEBHOOK_URL (check correct environment + redeploy)",
      });
    }

    // Payload to n8n
    const payload = {
      event: "intake_submitted",
      lang,
      formData,
      meta: {
        source: "base44",
        ts: new Date().toISOString(),
        // helpful debugging:
        requestId: crypto?.randomUUID?.() ?? undefined,
      },
    };

    const headers = {
      "content-type": "application/json",
      // If you don't set a secret, we simply won't send the header
      ...(secret ? { "x-intake-secret": secret } : {}),
    };

    // Call n8n webhook
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const raw = await res.text();

    if (!res.ok) {
      return jsonResponse(502, {
        error: "n8n webhook failed",
        status: res.status,
        details: raw,
      });
    }

    // Parse JSON response from n8n if possible
    let n8nData;
    try {
      n8nData = raw ? JSON.parse(raw) : { ok: true };
    } catch {
      n8nData = { ok: true, raw };
    }

    return jsonResponse(200, { success: true, n8n: n8nData });
  } catch (error) {
    console.error("[submitIntakeToN8n] error:", error);
    return jsonResponse(500, {
      error: error?.message ? error.message : "Unknown error",
    });
  }
});