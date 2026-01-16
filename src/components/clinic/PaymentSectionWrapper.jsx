import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSection from "./PaymentSection";
import { base44 } from "@/api/base44Client";

// IMPORTANT:
// Set VITE_STRIPE_PUBLISHABLE_KEY in your Base44 env to your real Stripe publishable key.
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export default function PaymentSectionWrapper({
  lang,
  bookingData,
  cart = [],
  onConfirm,
  onClearCart,
  onOpenServicePicker,
  sectionRef,
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  // Compute total in cents (Stripe requires integer cents)
  const totalCents = useMemo(() => {
    const totalDollars = (cart || []).reduce(
      (sum, s) => sum + (Number(s?.price) || 0),
      0
    );
    const cents = Math.round(Number(totalDollars) * 100);
    return Number.isFinite(cents) ? cents : 0;
  }, [cart]);

  // Light, safe metadata (Stripe metadata values should be strings)
  const metadata = useMemo(() => {
    const email = String(bookingData?.email || "").toLowerCase().trim().slice(0, 120);
    const date = String(bookingData?.date || "").trim().slice(0, 40);
    const time = String(bookingData?.time || "").trim().slice(0, 40);

    // Keep short; avoid huge metadata payloads
    const services = (cart || [])
      .map((s) => String(s?.id ?? s?.nameEn ?? "").trim())
      .filter(Boolean)
      .slice(0, 20)
      .join(",");

    return { email, date, time, services };
  }, [bookingData, cart]);

  // Create PaymentIntent when we have bookingData + non-empty cart + valid amount
  useEffect(() => {
    let cancelled = false;

    async function createIntent() {
      setIsCreatingIntent(true);
      setIntentError("");

      try {
        const response = await base44.functions.invoke("createPaymentIntent", {
          body: {
            amountCents: totalCents,
            currency: "usd",
            metadata,
          },
        });

        if (cancelled) return;

        if (response?.error) {
          throw new Error(
            response.error?.message || response.error || "Failed to initialize payment"
          );
        }

        const secret = response?.data?.clientSecret;
        if (!secret) {
          throw new Error("Missing clientSecret from server.");
        }

        setClientSecret(secret);
      } catch (err) {
        if (cancelled) return;
        console.error("Error creating payment intent:", err);
        setClientSecret("");
        setIntentError(err?.message || "Failed to initialize payment");
      } finally {
        if (!cancelled) setIsCreatingIntent(false);
      }
    }

    // Reset if not ready
    if (!bookingData || !cart?.length || totalCents <= 0) {
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
  }, [bookingData, cart, totalCents, metadata]);

  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const ROSE = "#C39A8B";

  if (!bookingData) return null;

  // Check if Stripe key is configured
  if (!stripePromise) {
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
                ? "La clave de Stripe no está configurada. Por favor contacta al administrador."
                : "Stripe key is not configured. Please contact the administrator."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Loading UI while creating intent
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

  // Error UI if intent creation failed
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

  // If we still don't have a clientSecret, don't render Elements.
  // (This prevents Stripe Element initialization errors.)
  if (!clientSecret) return null;

  // Stripe Elements appearance (optional)
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