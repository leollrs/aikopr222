import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSection from "./PaymentSection";
import { base44 } from "@/api/base44Client";

export default function PaymentSectionWrapper({
  lang,
  bookingData,
  cart = [],
  onConfirm,
  onClearCart,
  onOpenServicePicker,
  sectionRef,
}) {
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const ROSE = "#C39A8B";

  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  // ✅ DEBUG: Confirm env var injection at build time
  console.log("Stripe key present?", Boolean(stripeKey), stripeKey ? stripeKey.slice(0, 8) + "…" : "MISSING");

  if (!bookingData) return null;

  // ✅ Frontend publishable key guard
  if (!stripeKey) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: LINEN }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              backgroundColor: "rgba(195,154,139,0.10)",
              borderColor: "rgba(195,154,139,0.35)",
              color: ESPRESSO,
            }}
          >
            <p className="mb-2 font-medium">
              {lang === "es" ? "Configuración pendiente" : "Configuration required"}
            </p>
            <p className="text-sm" style={{ color: COCOA }}>
              {lang === "es"
                ? "Falta VITE_STRIPE_PUBLISHABLE_KEY en el frontend. Configúrala y redeploy."
                : "Missing VITE_STRIPE_PUBLISHABLE_KEY in the frontend. Set it and redeploy."}
            </p>
            <p className="mt-2 text-xs" style={{ color: COCOA, opacity: 0.7 }}>
              Detected: {Boolean(stripeKey) ? "YES" : "NO"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const stripePromise = useMemo(() => loadStripe(stripeKey), [stripeKey]);

  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  // Compute total in cents
  const totalCents = useMemo(() => {
    const totalDollars = (cart || []).reduce(
      (sum, s) => sum + (Number(s?.price) || 0),
      0
    );
    const cents = Math.round(totalDollars * 100);
    return Number.isFinite(cents) ? cents : 0;
  }, [cart]);

  // Metadata (small + strings only)
  const metadata = useMemo(() => {
    const email = String(bookingData?.email || "").toLowerCase().trim().slice(0, 120);
    const date = String(bookingData?.date || "").trim().slice(0, 40);
    const time = String(bookingData?.time || "").trim().slice(0, 40);

    const services = (cart || [])
      .map((s) => String(s?.id ?? s?.nameEn ?? "").trim())
      .filter(Boolean)
      .slice(0, 20)
      .join(",");

    return { email, date, time, services };
  }, [bookingData, cart]);

  useEffect(() => {
    let cancelled = false;

    async function createIntent() {
      setIsCreatingIntent(true);
      setIntentError("");
      setClientSecret("");

      try {
        // ✅ IMPORTANT: send JSON directly (no { body: ... })
        const res = await base44.functions.invoke("createPaymentIntent", {
          amountCents: totalCents,
          currency: "usd",
          metadata,
        });

        if (cancelled) return;

        // Base44 returns the function JSON under res.data
        const secret = res?.data?.clientSecret;
        if (!secret) {
          const errMsg =
            res?.data?.error ||
            res?.error?.message ||
            res?.error ||
            "Missing clientSecret from server.";
          throw new Error(errMsg);
        }

        setClientSecret(secret);
      } catch (err) {
        if (cancelled) return;
        console.error("createPaymentIntent failed:", err);
        setIntentError(err?.message || "Failed to initialize payment.");
      } finally {
        if (!cancelled) setIsCreatingIntent(false);
      }
    }

    // reset if not ready
    if (!cart?.length || totalCents <= 0) {
      setClientSecret("");
      setIntentError("");
      setIsCreatingIntent(false);
      return () => {
        cancelled = true;
      };
    }

    createIntent();

    return () => {
      cancelled = true;
    };
  }, [cart, totalCents, metadata]);

  if (isCreatingIntent) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: LINEN }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div className="text-center" style={{ color: COCOA }}>
            {lang === "es" ? "Preparando pago..." : "Preparing payment..."}
          </div>
        </div>
      </section>
    );
  }

  if (intentError) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: LINEN }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              backgroundColor: "rgba(195,154,139,0.10)",
              borderColor: "rgba(195,154,139,0.35)",
              color: ESPRESSO,
            }}
          >
            <p className="mb-4">{intentError}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm underline"
              style={{ color: ROSE }}
              type="button"
            >
              {lang === "es" ? "Reintentar" : "Retry"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!clientSecret) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: ROSE,
        colorBackground: "#FBF8F3",
        colorText: ESPRESSO,
        colorDanger: ROSE,
        fontFamily: "system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "12px",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentSection
        lang={lang}
        bookingData={bookingData}
        cart={cart}
        onConfirm={onConfirm}
        onClearCart={onClearCart}
        onOpenServicePicker={onOpenServicePicker}
        sectionRef={sectionRef}
      />
    </Elements>
  );
}