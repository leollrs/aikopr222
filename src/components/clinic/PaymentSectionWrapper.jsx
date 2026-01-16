import React, { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSection from "./PaymentSection";
import { base44 } from "@/api/base44Client";

// Load Stripe (replace with your actual publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

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

  // Calculate total in cents
  const totalCents = useMemo(() => {
    const totalDollars = (cart || []).reduce((sum, s) => sum + (Number(s?.price) || 0), 0);
    return Math.round(totalDollars * 100);
  }, [cart]);

  // Create PaymentIntent when bookingData and cart are valid
  useEffect(() => {
    if (!bookingData || !cart || cart.length === 0 || totalCents <= 0) {
      setClientSecret("");
      return;
    }

    const createIntent = async () => {
      setIsCreatingIntent(true);
      setIntentError("");

      try {
        const response = await base44.functions.invoke("createPaymentIntent", {
          amountCents: totalCents,
          currency: "usd",
          metadata: {
            email: bookingData.email || "",
            date: bookingData.date || "",
            time: bookingData.time || "",
            services: cart.map(s => s.id || s.nameEn).join(","),
          },
        });

        if (response?.data?.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          setIntentError("Failed to initialize payment");
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setIntentError(error?.message || "Failed to initialize payment");
      } finally {
        setIsCreatingIntent(false);
      }
    };

    createIntent();
  }, [bookingData, cart, totalCents]);

  if (!bookingData) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: "#C39A8B",
        colorBackground: "#FBF8F3",
        colorText: "#2A1E1A",
        colorDanger: "#C39A8B",
        fontFamily: "system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "12px",
      },
    },
  };

  // Show loading state while creating intent
  if (isCreatingIntent) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: "#F1E8DD" }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div className="text-center" style={{ color: "#6B5A52" }}>
            {lang === "es" ? "Preparando pago..." : "Preparing payment..."}
          </div>
        </div>
      </section>
    );
  }

  // Show error if intent creation failed
  if (intentError) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: "#F1E8DD" }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div
            className="rounded-2xl border p-6 text-center"
            style={{
              backgroundColor: "rgba(195,154,139,0.10)",
              borderColor: "rgba(195,154,139,0.35)",
              color: "#2A1E1A",
            }}
          >
            <p className="mb-4">{intentError}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm underline"
              style={{ color: "#6B5A52" }}
            >
              {lang === "es" ? "Reintentar" : "Retry"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Render PaymentSection with Stripe Elements
  if (!clientSecret) {
    return null;
  }

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