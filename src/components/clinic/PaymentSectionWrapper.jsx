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

  const [stripeKey, setStripeKey] = useState("");
  const [isLoadingKey, setIsLoadingKey] = useState(true);
  const [keyError, setKeyError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  // Fetch Stripe publishable key from backend
  useEffect(() => {
    let cancelled = false;

    async function fetchKey() {
      setIsLoadingKey(true);
      setKeyError("");

      try {
        const res = await base44.functions.invoke("getPublicConfig");
        if (cancelled) return;

        const data = res?.data || res;
        if (!data.ok) {
          throw new Error(data.error || "Failed to load configuration");
        }

        const pk = data.stripePublishableKey;
        if (!pk) {
          throw new Error("Missing stripePublishableKey in response");
        }

        setStripeKey(pk);
      } catch (err) {
        if (cancelled) return;
        console.error("getPublicConfig failed:", err);
        setKeyError(err?.message || "Failed to load Stripe configuration");
      } finally {
        if (!cancelled) setIsLoadingKey(false);
      }
    }

    fetchKey();

    return () => {
      cancelled = true;
    };
  }, []);

  const stripePromise = useMemo(() => {
    if (!stripeKey) return null;
    return loadStripe(stripeKey);
  }, [stripeKey]);

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
        const res = await base44.functions.invoke("createPaymentIntent", {
          amountCents: totalCents,
          currency: "usd",
          metadata,
        });

        if (cancelled) return;

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

  if (!bookingData) return null;

  // Loading Stripe key
  if (isLoadingKey) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: LINEN }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div className="text-center" style={{ color: COCOA }}>
            {lang === "es" ? "Cargando configuración..." : "Loading configuration..."}
          </div>
        </div>
      </section>
    );
  }

  // Error loading Stripe key
  if (keyError) {
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
            <p className="mb-4">{keyError}</p>
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

  if (!clientSecret || !stripePromise) return null;

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