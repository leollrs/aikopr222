import { createClientFromRequest } from "npm:@base44/sdk@0.8.6";

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Optional: Authenticate user if needed
    // const user = await base44.auth.me();
    // if (!user) {
    //   return Response.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { amountCents, currency = "usd", metadata = {} } = await req.json();

    // Validate amount
    if (!amountCents || amountCents <= 0 || !Number.isInteger(amountCents)) {
      return Response.json(
        { error: "Invalid amount. Must be a positive integer in cents." },
        { status: 400 }
      );
    }

    // Create PaymentIntent using Base44 Stripe integration
    const paymentIntent = await base44.asServiceRole.integrations.Stripe.CreatePaymentIntent({
      amount: amountCents,
      currency: currency.toLowerCase(),
      metadata: {
        ...metadata,
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