import React, { useMemo, useState, useEffect } from "react";
import { Lock, Check, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { base44 } from "@/api/base44Client";
import confetti from "canvas-confetti";

const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  taupe: "#8B7468",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

export default function PaymentSection({
  lang,
  bookingData,
  intakeData,
  cart = [],
  onConfirm,
  onClearCart,
  onOpenServicePicker,
  sectionRef,
  webhookUrl = "https://leollrs.app.n8n.cloud/webhook/254eed6d-ac1d-4db6-81a4-8da3479bfa8a",
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [confirmed, setConfirmed] = useState(false);
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const DEPOSIT_AMOUNT = 1;

  if (!bookingData) return null;

  const copy = {
    es: {
      badge: "Checkout seguro",
      title: "Confirma tu Cita",
      subtitle: "Pago seguro para confirmar tu horario. Atención móvil en tu hogar.",
      secure: "Pago seguro y encriptado",
      summary: "Resumen",
      servicesTotal: "Servicios seleccionados",
      depositToday: "Depósito requerido hoy",
      remainingBalance: "Balance restante",
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
      hint: "Puedes agregar más servicios antes de confirmar.",
      balanceNote: "El resto del balance se paga el día de la cita.",
    },
    en: {
      badge: "Secure checkout",
      title: "Confirm Your Appointment",
      subtitle: "Secure checkout to confirm your time. Mobile service at your home.",
      secure: "Secure and encrypted payment",
      summary: "Summary",
      servicesTotal: "Selected services",
      depositToday: "Deposit due today",
      remainingBalance: "Remaining balance",
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
      hint: "You can add more services before confirming.",
      balanceNote: "The remaining balance is paid on the day of your appointment.",
    },
  };

  const t = copy[lang] || copy.es;

  const totalServices = useMemo(() => {
    return (cart || []).reduce((sum, s) => sum + (Number(s?.price) || 0), 0);
  }, [cart]);

  const sendConfirmationWebhook = async () => {
    if (!webhookUrl) throw new Error(t.webhookMissing);

    const sanitizedBooking = {
      fullName: String(bookingData?.fullName || "").trim().slice(0, 100),
      email: String(bookingData?.email || "").toLowerCase().trim().slice(0, 120),
      phone: String(bookingData?.phone || "")
        .replace(/[^\d\s+\-()]/g, "")
        .trim()
        .slice(0, 20),
      date: String(bookingData?.date || "").trim(),
      time: String(bookingData?.time || "").trim(),
    };

    const validServiceIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const sanitizedServices = (cart || [])
      .filter((s) => validServiceIds.includes(Number(s?.id)))
      .map((s) => ({
        id: Number(s.id),
        nameEs: String(s.nameEs || "").slice(0, 100),
        nameEn: String(s.nameEn || "").slice(0, 100),
        duration: String(s.duration || "").slice(0, 20),
        price: Number(s.price) || 0,
      }));

    const payload = {
      type: "appointment_confirmed",
      status: "paid",
      createdAt: new Date().toISOString(),
      payment: {
        deposit: DEPOSIT_AMOUNT,
        total: Number(totalServices) || 0,
        remaining: Math.max(0, (Number(totalServices) || 0) - DEPOSIT_AMOUNT),
      },
      serviceType: bookingData?.serviceType || "unknown",
      ...(bookingData?.serviceType === "mobile" && bookingData?.address ? { address: bookingData.address } : {}),
      booking: { ...sanitizedBooking, services: sanitizedServices },
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(t.errorGeneric);
    return true;
  };

  const durationToMinutes = (duration) => {
    const s = String(duration || "").toLowerCase().trim();
    const hrMatch = s.match(/(\d+)\s*(h|hr|hrs|hour|hours)\b/);
    const minMatch = s.match(/(\d+)\s*(m|min|mins|minute|minutes)\b/);
    if (hrMatch || minMatch) {
      const h = hrMatch ? parseInt(hrMatch[1], 10) : 0;
      const m = minMatch ? parseInt(minMatch[1], 10) : 0;
      const total = h * 60 + m;
      return Number.isFinite(total) ? total : 0;
    }
    const nums = s.match(/\d+/g) || [];
    if (nums.length === 1) return Number(nums[0]) || 0;
    if (nums.length >= 2) return (Number(nums[0]) || 0) * 60 + (Number(nums[1]) || 0);
    return 0;
  };

  const handleConfirm = async () => {
    setErrorMsg("");

    if (!stripe || !elements) {
      setErrorMsg(t.errorGeneric);
      return;
    }

    try {
      setIsSubmitting(true);

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: { return_url: window.location.href },
      });

      if (error) {
        setErrorMsg(error.message || t.errorGeneric);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Create calendar event after successful payment
        const totalMinutes = cart.reduce((sum, s) => sum + durationToMinutes(s?.duration), 0);
        const start = new Date(`${bookingData.date}T${bookingData.time}:00`);
        const end = new Date(start.getTime() + totalMinutes * 60 * 1000);
        const endTime = end.toTimeString().slice(0, 5);

        await base44.functions.invoke("calendarSync", {
          action: "createEvent",
          date: bookingData.date,
          startTime: bookingData.time,
          endTime,
          services: cart,
          clientName: bookingData.name,
          clientEmail: bookingData.email,
          clientPhone: bookingData.phone,
          serviceType: bookingData.serviceType,
          address: bookingData.address,
        });

        // Submit intake form data to webhook AFTER successful payment
        if (intakeData) {
          await base44.functions.invoke("submitIntake", { formData: intakeData, lang });
        }

        await sendConfirmationWebhook();
        onClearCart?.();
        
        // Payment successful - trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        setConfirmed(true);
        setPaymentSessionId(paymentIntent.id);
        
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

  // Check URL for session_id on mount (in case user refreshes after payment)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && !confirmed) {
      base44.functions.invoke("verifyPayment", { sessionId })
        .then(({ data }) => {
          if (data.isPaid) {
            setConfirmed(true);
            setPaymentSessionId(sessionId);
          }
        })
        .catch(err => console.error("Error verifying payment on mount:", err));
    }
  }, [confirmed]);

  if (confirmed) {
    return (
      <section
          ref={sectionRef}
          className="relative overflow-hidden py-20 md:py-24 lg:py-28"
          style={{ backgroundColor: PALETTE.linen }}
        >
        {/* Subtle premium backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 600px at 50% 20%, rgba(201,174,126,0.12), transparent 70%),
              radial-gradient(900px 520px at 85% 10%, rgba(195,154,139,0.10), transparent 62%),
              linear-gradient(to bottom, rgba(251,248,243,0.35), rgba(241,232,221,0.85))
            `,
          }}
        />

        <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-10">
          <div
            className="relative overflow-hidden rounded-3xl border p-8 text-center shadow-[0_40px_120px_rgba(42,30,26,0.18)]"
            style={{
              backgroundColor: "rgba(255,252,248,0.88)",
              borderColor: "rgba(42,30,26,0.10)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_0%,rgba(201,174,126,0.20),transparent_62%),radial-gradient(900px_520px_at_90%_10%,rgba(195,154,139,0.14),transparent_62%)]" />

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
                  <Check className="h-8 w-8" style={{ color: PALETTE.espresso }} />
                </div>
              </div>

              <h2 className="text-2xl font-light" style={{ color: PALETTE.espresso }}>
                {t.confirmedTitle}
              </h2>
              <p className="mt-3" style={{ color: PALETTE.cocoa }}>
                {t.confirmedBody}
              </p>

              <div
                className="mt-7 rounded-2xl border p-5 text-left"
                style={{
                  backgroundColor: "rgba(241,232,221,0.55)",
                  borderColor: "rgba(42,30,26,0.10)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase" style={{ color: PALETTE.taupe }}>
                      {t.date}
                    </p>
                    <p className="mt-1 font-medium" style={{ color: PALETTE.espresso }}>
                      {bookingData?.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.18em] uppercase" style={{ color: PALETTE.taupe }}>
                      {t.time}
                    </p>
                    <p className="mt-1 font-medium" style={{ color: PALETTE.espresso }}>
                      {bookingData?.time}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenServicePicker}
                className="mt-7 inline-flex items-center justify-center gap-2 text-xs font-medium underline decoration-[rgba(201,174,126,0.65)] underline-offset-4 transition hover:no-underline"
                style={{ color: "rgba(251,248,243,0.75)" }}
                type="button"
              />

              <button
                onClick={onOpenServicePicker}
                className="mt-7 text-xs underline decoration-[rgba(201,174,126,0.65)] underline-offset-4 transition hover:no-underline"
                style={{ color: PALETTE.taupe }}
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
        className="relative overflow-hidden py-20 md:py-24 lg:py-28"
        style={{ backgroundColor: PALETTE.linen }}
      >
      {/* Premium backdrop consistent with other sections */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 50% 15%, rgba(201,174,126,0.10), transparent 70%),
            radial-gradient(900px 520px at 85% 10%, rgba(195,154,139,0.08), transparent 62%),
            linear-gradient(to bottom, rgba(251,248,243,0.40), rgba(241,232,221,0.90))
          `,
        }}
      />

      <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: PALETTE.champagne }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: PALETTE.taupe }}
            >
              {t.badge}
            </span>
          </div>

          <h2 className="text-3xl font-light tracking-[-0.02em] md:text-4xl" style={{ color: PALETTE.espresso }}>
            {t.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed" style={{ color: PALETTE.cocoa }}>
            {t.subtitle}
          </p>

          <div
            className="mx-auto mt-8 h-px w-full max-w-md"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${PALETTE.champagne}, transparent)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-3xl border p-6 shadow-[0_40px_120px_rgba(42,30,26,0.16)] md:p-8"
          style={{
            backgroundColor: "rgba(255,252,248,0.88)",
            borderColor: "rgba(42,30,26,0.10)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* internal glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_620px_at_20%_0%,rgba(201,174,126,0.20),transparent_62%),radial-gradient(900px_520px_at_90%_10%,rgba(195,154,139,0.14),transparent_62%)]" />

          <div className="relative">
            {/* Summary */}
            <div className="mb-6 border-b pb-6" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: PALETTE.espresso }}>
                  {t.summary}
                </h3>

                <button
                  onClick={onOpenServicePicker}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(195,154,139,0.14)",
                    borderColor: "rgba(195,154,139,0.32)",
                    color: PALETTE.rose,
                  }}
                  type="button"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t.add}
                </button>
              </div>

              <p className="mt-3 text-xs" style={{ color: PALETTE.taupe }}>
                {t.hint}
              </p>

              {(!cart || cart.length === 0) ? (
                <div
                  className="mt-5 rounded-2xl border px-4 py-4 text-sm"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(241,232,221,0.40)",
                    color: PALETTE.taupe,
                  }}
                >
                  {t.noServices}
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {cart.map((service, idx) => (
                    <div
                      key={`${service.id}-${idx}`}
                      className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm"
                      style={{
                        borderColor: "rgba(42,30,26,0.08)",
                        backgroundColor: "rgba(255,252,248,0.55)",
                      }}
                    >
                      <span style={{ color: PALETTE.cocoa }}>
                        {lang === "es" ? service.nameEs : service.nameEn}
                      </span>
                      <span className="font-medium" style={{ color: PALETTE.espresso }}>
                        ${Number(service.price) || 0}
                      </span>
                    </div>
                  ))}

                  <div className="mt-3 space-y-2 pt-3 border-t" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
                    <div className="flex items-center justify-between px-4 py-2 text-sm">
                      <span style={{ color: PALETTE.cocoa }}>{t.servicesTotal}</span>
                      <span className="font-medium" style={{ color: PALETTE.espresso }}>
                        ${Number(totalServices) || 0}
                      </span>
                    </div>

                    <div
                      className="flex items-center justify-between rounded-xl border px-4 py-3"
                      style={{
                        borderColor: "rgba(201,174,126,0.35)",
                        backgroundColor: "rgba(201,174,126,0.10)",
                      }}
                    >
                      <span className="font-semibold" style={{ color: PALETTE.espresso }}>{t.depositToday}</span>
                      <span className="text-lg font-bold" style={{ color: PALETTE.espresso }}>
                        ${DEPOSIT_AMOUNT}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2 text-sm">
                      <span style={{ color: PALETTE.taupe }}>{t.remainingBalance}</span>
                      <span className="font-medium" style={{ color: PALETTE.cocoa }}>
                        ${Math.max(0, totalServices - DEPOSIT_AMOUNT)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stripe Payment */}
            <div
              className="rounded-2xl border p-4 md:p-5"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(255,252,248,0.55)",
              }}
            >
              <PaymentElement />
            </div>

            {errorMsg ? (
              <div
                className="mt-5 rounded-2xl border px-4 py-3 text-sm"
                style={{
                  borderColor: "rgba(195,154,139,0.45)",
                  backgroundColor: "rgba(195,154,139,0.10)",
                  color: PALETTE.espresso,
                }}
              >
                {errorMsg}
              </div>
            ) : null}

            <div className="my-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: PALETTE.taupe }}>
                <Lock className="h-3 w-3" />
                {t.secure}
              </div>
              <p className="text-center text-sm font-medium" style={{ color: PALETTE.cocoa }}>
                {t.balanceNote}
              </p>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={!stripe || !elements || isSubmitting || cart.length === 0}
              className="h-12 w-full rounded-xl text-base font-medium"
              style={{
                backgroundColor: PALETTE.rose,
                color: "#FFFFFF",
                boxShadow: "0 22px 70px rgba(195,154,139,0.32)",
                opacity: !stripe || !elements || isSubmitting || cart.length === 0 ? 0.7 : 1,
              }}
            >
              {isSubmitting ? t.sending : t.confirm}
            </Button>

            <div className="mt-4 text-center">
              <button
                onClick={onOpenServicePicker}
                className="text-xs underline decoration-[rgba(201,174,126,0.65)] underline-offset-4 transition hover:no-underline"
                style={{ color: PALETTE.taupe }}
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