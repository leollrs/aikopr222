import React, { useState } from "react";
import { CreditCard, Lock, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PaymentSection({
  lang,
  bookingData,
  onConfirm,
  onOpenServicePicker,
  sectionRef,
}) {
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const handleConfirm = () => {
    if (cardData.number && cardData.expiry && cardData.cvv && cardData.name) {
      setConfirmed(true);
      onConfirm();
    }
  };

  const totalServices =
    bookingData?.services?.reduce((sum, s) => sum + (s?.price || 0), 0) || 0;

  if (!bookingData) return null;

  // Text changes: no money talk in headline/subtext + button label
  const copy = {
    es: {
      title: "Confirma tu Cita",
      subtitle: "Pago seguro para confirmar tu horario. Atención móvil en tu hogar.",
      secure: "Pago seguro y encriptado",
      summary: "Resumen",
      servicesTotal: "Total servicios",
      confirm: "Confirmar cita",
      addMore: "Agregar más servicios",
      confirmedTitle: "¡Cita Confirmada!",
      confirmedBody: "Te hemos enviado un correo con los detalles de tu cita.",
      date: "Fecha",
      time: "Hora",
    },
    en: {
      title: "Confirm Your Appointment",
      subtitle: "Secure checkout to confirm your time. Mobile service at your home.",
      secure: "Secure and encrypted payment",
      summary: "Summary",
      servicesTotal: "Services total",
      confirm: "Confirm appointment",
      addMore: "Add more services",
      confirmedTitle: "Appointment Confirmed!",
      confirmedBody: "We’ve emailed you your appointment details.",
      date: "Date",
      time: "Time",
    },
  };

  const t = copy[lang] || copy.es;

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
            {/* Soft glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_0%,rgba(201,174,126,0.22),transparent_60%),radial-gradient(900px_420px_at_15%_35%,rgba(195,154,139,0.14),transparent_62%)]" />

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

              <h2
                className="text-2xl font-light"
                style={{ color: ESPRESSO }}
              >
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
        {/* Section Header */}
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
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_0%,rgba(201,174,126,0.20),transparent_60%),radial-gradient(900px_420px_at_15%_35%,rgba(195,154,139,0.12),transparent_62%)]" />

          <div className="relative">
            {/* Summary */}
            <div className="mb-6 pb-6 border-b" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: ESPRESSO }}
                >
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
                >
                  <Plus className="h-3.5 w-3.5" />
                  {lang === "es" ? "Agregar" : "Add"}
                </button>
              </div>

              <div className="space-y-2">
                {bookingData?.services?.map((service, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
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

              {/* Decorative highlight (no money copy) */}
              <div
                className="mt-5 rounded-2xl px-4 py-3 flex items-center justify-between"
                style={{
                  backgroundColor: "rgba(201,174,126,0.12)",
                  border: "1px solid rgba(42,30,26,0.08)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: ESPRESSO }}>
                  {lang === "es" ? "Confirmación segura" : "Secure confirmation"}
                </span>
                <span className="text-sm" style={{ color: TAUPE }}>
                  {lang === "es" ? "Servicio móvil" : "Mobile service"}
                </span>
              </div>
            </div>

            {/* Card Form */}
            <div className="space-y-4">
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: TAUPE }}
                />
                <Input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData({ ...cardData, number: e.target.value })
                  }
                  className="pl-10"
                  style={{
                    backgroundColor: "rgba(241,232,221,0.70)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: ESPRESSO,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) =>
                    setCardData({ ...cardData, expiry: e.target.value })
                  }
                  style={{
                    backgroundColor: "rgba(241,232,221,0.70)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: ESPRESSO,
                  }}
                />
                <Input
                  type="text"
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={(e) =>
                    setCardData({ ...cardData, cvv: e.target.value })
                  }
                  style={{
                    backgroundColor: "rgba(241,232,221,0.70)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: ESPRESSO,
                  }}
                />
              </div>

              <Input
                type="text"
                placeholder={lang === "es" ? "Nombre en la tarjeta" : "Name on card"}
                value={cardData.name}
                onChange={(e) =>
                  setCardData({ ...cardData, name: e.target.value })
                }
                style={{
                  backgroundColor: "rgba(241,232,221,0.70)",
                  borderColor: "rgba(42,30,26,0.12)",
                  color: ESPRESSO,
                }}
              />
            </div>

            {/* Secure Notice */}
            <div className="my-6 flex items-center justify-center gap-2 text-xs" style={{ color: TAUPE }}>
              <Lock className="h-3 w-3" />
              {t.secure}
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              className="w-full h-12 rounded-xl text-base font-medium"
              style={{
                backgroundColor: ROSE,
                color: "#FFFFFF",
                boxShadow: "0 22px 70px rgba(195,154,139,0.32)",
              }}
            >
              {t.confirm}
            </Button>

            {/* Subtle add more link */}
            <div className="text-center mt-3">
              <button
                onClick={onOpenServicePicker}
                className="text-xs underline transition hover:no-underline"
                style={{ color: TAUPE }}
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