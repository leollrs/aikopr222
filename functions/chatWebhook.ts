import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Read the webhook URL from secrets
    const webhookUrl = Deno.env.get("WEBHOOKS_CHATWIDGET");
    
    if (!webhookUrl) {
      return Response.json({ 
        error: "Webhook URL not configured" 
      }, { status: 500 });
    }

    // Parse the incoming request body
    const body = await req.json();
    
    // Forward the request to the n8n webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "AIKOPR222-Chat/1.0"
      },
      body: JSON.stringify(body),
    });

    // Read response as text first (n8n sometimes returns non-JSON)
    const responseText = await response.text();
    
    if (!response.ok) {
      return Response.json({ 
        error: `Webhook error ${response.status}`,
        details: responseText 
      }, { status: response.status });
    }

    // Try to parse as JSON, otherwise return as text
    try {
      const data = JSON.parse(responseText);
      return Response.json(data);
    } catch {
      // If not JSON, wrap the text response
      return Response.json({ reply: responseText });
    }
    
  } catch (error) {
    console.error("[chatWebhook] Error:", error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});