import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

Deno.serve(async (req) => {
  try {
    // Keeps Base44 request context (optional but fine)
    createClientFromRequest(req);

    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    if (!STRIPE_SECRET_KEY) {
      return Response.json(
        { error: "Stripe secret key is not configured on the server." },
        { status: 500 }
      );
    }

    let body = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    if (!body) {
      return Response.json({ error: "Missing JSON body" }, { status: 400 });
    }

    const { amountCents, currency = "usd", metadata = {} } = body;

    if (
      typeof amountCents !== "number" ||
      !Number.isInteger(amountCents) ||
      amountCents <= 0
    ) {
      return Response.json(
        { error: "Invalid amount. Must be a positive integer in cents." },
        { status: 400 }
      );
    }

    // Stripe requires x-www-form-urlencoded
    const form = new URLSearchParams();
    form.set("amount", String(amountCents));
    form.set("currency", String(currency).toLowerCase());
    form.set("automatic_payment_methods[enabled]", "true");

    for (const [k, v] of Object.entries(metadata || {})) {
      form.set(
        `metadata[${String(k).slice(0, 40)}]`,
        String(v).slice(0, 500)
      );
    }

    form.set("metadata[created_at]", new Date().toISOString());

    const stripeRes = await fetch(
      "https://api.stripe.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form,
      }
    );

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      return Response.json(
        { error: data?.error?.message || "Stripe error" },
        { status: 500 }
      );
    }

    return Response.json({
      clientSecret: data.client_secret,
      paymentIntentId: data.id,
    });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
});