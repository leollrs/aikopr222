import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Read JSON safely
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

    // Validate amount (integer cents > 0)
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

    // Stripe metadata values should be strings; keep small
    const safeMetadata = {};
    for (const [k, v] of Object.entries(metadata || {})) {
      safeMetadata[String(k).slice(0, 40)] = String(v).slice(0, 500);
    }

    const paymentIntent =
      await base44.asServiceRole.integrations.Stripe.CreatePaymentIntent({
        amount: amountCents,
        currency: String(currency).toLowerCase(),

        // Payment Element works best with this enabled
        automatic_payment_methods: { enabled: true },

        metadata: {
          ...safeMetadata,
          created_at: new Date().toISOString(),
        },
      });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return Response.json(
      { error: error?.message || "Failed to create payment intent" },
      { status: 500 }
    );
  }
});