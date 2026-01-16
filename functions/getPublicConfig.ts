Deno.serve(async (req) => {
  try {
    const pk = Deno.env.get("STRIPE_PUBLISHABLE_KEY");

    if (!pk) {
      return Response.json(
        { ok: false, error: "Missing STRIPE_PUBLISHABLE_KEY" },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      stripePublishableKey: pk,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
});