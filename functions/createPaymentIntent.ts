Deno.serve(async (req) => {
  try {
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    
    if (!stripeSecretKey) {
      return Response.json(
        { error: "Stripe secret key is not configured on the server." },
        { status: 500 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { amountCents, currency = "usd", metadata = {} } = body;

    // Validate amountCents
    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      return Response.json(
        { error: "amountCents must be a positive integer" },
        { status: 400 }
      );
    }

    // Prepare form data for Stripe API
    const formData = new URLSearchParams();
    formData.append("amount", amountCents.toString());
    formData.append("currency", currency.toLowerCase());
    formData.append("automatic_payment_methods[enabled]", "true");

    // Add metadata with truncation
    const sanitizedMetadata = {
      created_at: new Date().toISOString(),
    };

    for (const [key, value] of Object.entries(metadata)) {
      const truncatedKey = String(key).slice(0, 40);
      const truncatedValue = String(value).slice(0, 500);
      sanitizedMetadata[truncatedKey] = truncatedValue;
    }

    for (const [key, value] of Object.entries(sanitizedMetadata)) {
      formData.append(`metadata[${key}]`, value);
    }

    // Call Stripe API
    const stripeResponse = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      return Response.json(
        { error: stripeData.error?.message || "Stripe API error" },
        { status: 500 }
      );
    }

    // Return clientSecret and paymentIntentId
    return Response.json({
      clientSecret: stripeData.client_secret,
      paymentIntentId: stripeData.id,
    });

  } catch (error) {
    return Response.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
});