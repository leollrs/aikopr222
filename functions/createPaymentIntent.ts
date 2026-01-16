import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

Deno.serve(async (req) => {
  try {
    // Keep Base44 context (safe even if unused)
    createClientFromRequest(req);

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeSecretKey) {
      return Response.json(
        { error: "STRIPE_SECRET_KEY is missing in server environment variables." },
        { status: 500 }
      );
    }

    // Parse JSON body
    let body = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    if (!body) {
      return Response.json({ error: "Missing or invalid JSON body." }, { status: 400 });
    }

    const { amountCents, currency = "usd", metadata = {} } = body;

    // Validate cents
    if (
      typeof amountCents !== "number" ||
      !Number.isInteger(amountCents) ||
      amountCents <= 0
    ) {
      return Response.json(
        { error: "amountCents must be a positive integer." },
        { status: 400 }
      );
    }

    // Stripe form encoding
    const form = new URLSearchParams();
    form.set("amount", String(amountCents));
    form.set("currency", String(currency).toLowerCase());
    form.set("automatic_payment_methods[enabled]", "true");

    // Metadata must be strings
    form.set("metadata[created_at]", new Date().toISOString());

    for (const [k, v] of Object.entries(metadata || {})) {
      const key = String(k).slice(0, 40);
      const val = String(v).slice(0, 500);
      if (key) form.set(`metadata[${key}]`, val);
    }

    const stripeRes = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      return Response.json(
        { error: data?.error?.message || "Stripe API error creating PaymentIntent." },
        { status: 500 }
      );
    }

    return Response.json({
      clientSecret: data.client_secret,
      paymentIntentId: data.id,
    });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Internal server error." },
      { status: 500 }
    );
  }
});