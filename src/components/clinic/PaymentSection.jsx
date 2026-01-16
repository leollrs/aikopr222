import React, { useMemo, useState } from "react";
import { Lock, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function PaymentSection({
  lang,
  bookingData,
  cart = [], // ✅ source of truth for services
  onConfirm,
  onClearCart,
  onOpenServicePicker,
  sectionRef,
  webhookUrl = "https://leollrs.app.n8n.cloud/webhook/254eed6d-ac1d-4db6-81a4-8da3479bfa8a",
}) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  if (!bookingData) return null;

  const copy = {
    es: {
      title: "Confirma tu Cita",
      subtitle: "Pago seguro para confirmar tu horario. Atención móvil en tu hogar.",
      secure: "Pago seguro y encriptado",
      summary: "Resumen",
      servicesTotal: "Total servicios",
      confirm: "Confirmar cita",
      confirmedTitle: "¡Cita Confirmada!",
      confirmedBody: "Te hemos enviado un correo con los detalles de tu cita.",
      date: "Fecha",
      time: "Hora",
      sending: "Confirmando...",
      errorGeneric: "Ocurrió un error. Intenta nuevamente.",
      webhookMissing: "Falta configurar el webhook.",
      add: "Agregar",
      noServices: "No hay servicios seleccionados.",
      addMore: "Agregar más servicios",
    },
    en: {
      title: "Confirm Your Appointment",
      subtitle: "Secure checkout to confirm your time. Mobile service at your home.",
      secure: "Secure and encrypted payment",
      summary: "Summary",
      servicesTotal: "Services total",
      confirm: "Confirm appointment",
      confirmedTitle: "Appointment Confirmed!",
      confirmedBody: "We’ve emailed you your appointment details.",
      date: "Date",
      time: "Time",
      sending: "Confirming...",
      errorGeneric: "Something went wrong. Please try again.",
      webhookMissing: "Webhook is not configured.",
      add: "Add",
      noServices: "No services selected.",
      addMore: "Add more services",
    },
  };

  const t = copy[lang] || copy.es;

  const totalServices = useMemo(() => {
    return (cart || []).reduce((sum, s) => sum + (Number(s?.price) || 0), 0);
  }, [cart]);

  // ✅ IMPORTANT: no card data sent
  const sendConfirmationWebhook = async () => {
    if (!webhookUrl) throw new Error(t.webhookMissing);

    // Sanitize booking data before sending
    const sanitizedBooking = {
      fullName: String(bookingData?.fullName || '').trim().slice(0, 100),
      email: String(bookingData?.email || '').toLowerCase().trim().slice(0, 120),
      phone: String(bookingData?.phone || '').replace(/[^\d\s+\-()]/g, '').trim().slice(0, 20),
      date: String(bookingData?.date || '').trim(),
      time: String(bookingData?.time || '').trim(),
    };

    // Validate services (only allow known service IDs)
    const validServiceIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const sanitizedServices = (cart || [])
      .filter(s => validServiceIds.includes(Number(s?.id)))
      .map((s) => ({
        id: Number(s.id),
        nameEs: String(s.nameEs || '').slice(0, 100),
        nameEn: String(s.nameEn || '').slice(0, 100),
        duration: String(s.duration || '').slice(0, 20),
        price: Number(s.price) || 0,
      }));

    const payload = {
      type: "appointment_confirmed",
      status: "paid",
      createdAt: new Date().toISOString(),
      totals: { 
        servicesTotal: Number(totalServices) || 0, 
        currency: "USD" 
      },
      booking: {
        ...sanitizedBooking,
        services: sanitizedServices,
      },
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(t.errorGeneric);
    }

    return true;
  };

  const handleConfirm = async () => {
    setErrorMsg("");
    
    if (!stripe || !elements) {
      setErrorMsg(t.errorGeneric);
      return;
    }

    try {
      setIsSubmitting(true);

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.href,
        },
      });

      if (error) {
        setErrorMsg(error.message || t.errorGeneric);
        return;
      }

      // Only proceed if payment succeeded
      if (paymentIntent?.status === "succeeded") {
        // Now call webhook (no card data sent)
        await sendConfirmationWebhook();
        onClearCart?.();
        setConfirmed(true);
        onConfirm?.();
      } else {
        setErrorMsg(t.errorGeneric);
      }
    } catch (err) {
      setErrorMsg(err?.message || t.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <section
        ref={sectionRef}
        className="py-16 md:py-20 lg:py-28"
        style={{ backgroundColor: LINEN }}
      >
        <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
          <div
            className="relative overflow-hidden rounded-3xl border p-8 text-center shadow-[0_36px_110px_rgba(42,30,26,0.18)]"
            style={{
              backgroundColor: "rgba(255,252,248,0.92)",
              borderColor: "rgba(42,30,26,0.10)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="relative">
              <div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border"
                style={{
                  borderColor: "rgba(42,30,26,0.10)",
                  backgroundColor: "rgba(201,174,126,0.10)",
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(195,154,139,0.18)" }}
                >
                  <Check className="h-8 w-8" style={{ color: ESPRESSO }} />
                </div>
              </div>

              <h2 className="text-2xl font-light" style={{ color: ESPRESSO }}>
                {t.confirmedTitle}
              </h2>
              <p className="mt-3" style={{ color: COCOA }}>
                {t.confirmedBody}
              </p>

              <div
                className="mt-6 rounded-2xl p-4 text-left"
                style={{ backgroundColor: "rgba(241,232,221,0.70)" }}
              >
                <p className="text-sm" style={{ color: TAUPE }}>
                  {t.date}
                </p>
                <p className="font-medium" style={{ color: ESPRESSO }}>
                  {bookingData?.date}
                </p>

                <p className="mt-3 text-sm" style={{ color: TAUPE }}>
                  {t.time}
                </p>
                <p className="font-medium" style={{ color: ESPRESSO }}>
                  {bookingData?.time}
                </p>
              </div>

              <button
                onClick={onOpenServicePicker}
                className="mt-6 text-xs underline transition hover:no-underline"
                style={{ color: TAUPE }}
                type="button"
              >
                {t.addMore}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-28"
      style={{ backgroundColor: LINEN }}
    >
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 md:mb-12">
          <h2
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ color: ESPRESSO }}
          >
            {t.title}
          </h2>
          <p style={{ color: COCOA }}>{t.subtitle}</p>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border p-6 md:p-8 shadow-[0_36px_110px_rgba(42,30,26,0.16)]"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            borderColor: "rgba(42,30,26,0.10)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="relative">
            {/* Summary */}
            <div
              className="mb-6 pb-6 border-b"
              style={{ borderColor: "rgba(42,30,26,0.10)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium" style={{ color: ESPRESSO }}>
                  {t.summary}
                </h3>

                <button
                  onClick={onOpenServicePicker}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:scale-105"
                  style={{
                    backgroundColor: "rgba(195,154,139,0.15)",
                    borderColor: "rgba(195,154,139,0.35)",
                    color: ROSE,
                  }}
                  type="button"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t.add}
                </button>
              </div>

              {(!cart || cart.length === 0) ? (
                <div className="text-sm" style={{ color: TAUPE }}>
                  {t.noServices}
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((service, idx) => (
                    <div
                      key={`${service.id}-${idx}`}
                      className="flex justify-between text-sm"
                    >
                      <span style={{ color: COCOA }}>
                        {lang === "es" ? service.nameEs : service.nameEn}
                      </span>
                      <span style={{ color: ESPRESSO }}>${service.price}</span>
                    </div>
                  ))}

                  <div
                    className="flex justify-between text-sm pt-2 border-t"
                    style={{ borderColor: "rgba(42,30,26,0.10)" }}
                  >
                    <span style={{ color: COCOA }}>{t.servicesTotal}</span>
                    <span style={{ color: ESPRESSO }}>${totalServices}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stripe Payment Element */}
            <div className="py-4">
              <PaymentElement />
            </div>

            {errorMsg ? (
              <div
                className="mt-4 rounded-2xl border px-4 py-3 text-sm"
                style={{
                  borderColor: "rgba(195,154,139,0.45)",
                  backgroundColor: "rgba(195,154,139,0.10)",
                  color: ESPRESSO,
                }}
              >
                {errorMsg}
              </div>
            ) : null}

            <div
              className="my-6 flex items-center justify-center gap-2 text-xs"
              style={{ color: TAUPE }}
            >
              <Lock className="h-3 w-3" />
              {t.secure}
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!stripe || !elements || isSubmitting || cart.length === 0}
              className="w-full h-12 rounded-xl text-base font-medium"
              style={{
                backgroundColor: ROSE,
                color: "#FFFFFF",
                boxShadow: "0 22px 70px rgba(195,154,139,0.32)",
                opacity: !stripe || !elements || isSubmitting || cart.length === 0 ? 0.7 : 1,
              }}
            >
              {isSubmitting ? t.sending : t.confirm}
            </Button>

            <div className="text-center mt-3">
              <button
                onClick={onOpenServicePicker}
                className="text-xs underline transition hover:no-underline"
                style={{ color: TAUPE }}
                type="button"
              >
                {t.addMore}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}