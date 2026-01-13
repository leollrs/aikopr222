import React from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceModal({ service, lang, isOpen, onClose, onAddService }) {
  if (!isOpen || !service) return null;

  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const name = lang === "es" ? service.nameEs : service.nameEn;
  const ideal = lang === "es" ? service.idealEs : service.idealEn;
  const benefits = lang === "es" ? service.benefitsEs : service.benefitsEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  return (
    <>
      {/* Backdrop (no harsh black) */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.28)" }}
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        {/* Modal shell */}
        <div
          className="relative w-full max-w-xl overflow-hidden rounded-t-[26px] border shadow-[0_40px_120px_rgba(42,30,26,0.22)] md:rounded-[28px]"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            borderColor: "rgba(42,30,26,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_620px_at_20%_0%,rgba(201,174,126,0.22),transparent_62%),radial-gradient(900px_520px_at_90%_10%,rgba(195,154,139,0.16),transparent_62%)]" />

          {/* Header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur"
            style={{
              backgroundColor: "rgba(251,248,243,0.80)",
              borderColor: "rgba(42,30,26,0.10)",
            }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
                <span
                  className="text-[11px] font-semibold tracking-[0.28em] uppercase"
                  style={{ color: TAUPE }}
                >
                  {lang === "es" ? "Detalles del servicio" : "Service details"}
                </span>
              </div>
              <h3 className="mt-2 truncate text-xl font-medium tracking-[-0.01em]" style={{ color: ESPRESSO }}>
                {name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border p-2 transition"
              style={{
                borderColor: "rgba(42,30,26,0.14)",
                backgroundColor: "rgba(255,252,248,0.65)",
              }}
              aria-label={lang === "es" ? "Cerrar" : "Close"}
            >
              <X className="h-5 w-5" style={{ color: ESPRESSO }} />
            </button>
          </div>

          {/* Content */}
          <div className="relative max-h-[72vh] overflow-y-auto px-6 py-6 md:max-h-[75vh]">
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  borderColor: "rgba(42,30,26,0.10)",
                  backgroundColor: "rgba(251,248,243,0.75)",
                }}
              >
                <span className="text-xs font-medium" style={{ color: ESPRESSO }}>
                  {service.duration}
                </span>
                <span style={{ color: CHAMPAGNE }}>•</span>
                <span className="text-xs" style={{ color: TAUPE }}>
                  {lang === "es" ? "Servicio premium" : "Premium service"}
                </span>
              </div>

              {/* Price badge (remove if you don’t want pricing anywhere) */}
              <div
                className="inline-flex items-center rounded-full border px-4 py-2"
                style={{
                  borderColor: "rgba(42,30,26,0.10)",
                  backgroundColor: "rgba(255,252,248,0.55)",
                }}
              >
                <span className="text-xs" style={{ color: TAUPE }}>
                  {lang === "es" ? "Desde" : "From"}
                </span>
                <span className="ml-2 text-xs font-semibold" style={{ color: ESPRESSO }}>
                  ${service.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-[15px] leading-relaxed" style={{ color: COCOA }}>
                {desc}
              </p>
            </div>

            {/* Ideal for */}
            <div
              className="mt-7 rounded-2xl border p-5"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(241,232,221,0.55)",
              }}
            >
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ESPRESSO }}>
                {lang === "es" ? "Ideal para" : "Ideal for"}
              </h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA }}>
                {ideal}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-7">
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ESPRESSO }}>
                {lang === "es" ? "Beneficios" : "Benefits"}
              </h4>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-2xl border px-4 py-3"
                    style={{
                      borderColor: "rgba(42,30,26,0.10)",
                      backgroundColor: "rgba(255,252,248,0.65)",
                    }}
                  >
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(201,174,126,0.18)" }}
                    >
                      <Check className="h-4 w-4" style={{ color: CHAMPAGNE }} />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: COCOA }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case study */}
            <div
              className="mt-8 overflow-hidden rounded-2xl border"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(241,232,221,0.45)",
              }}
            >
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: ESPRESSO }}>
                    {lang === "es" ? "Caso real" : "Real case"}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: COCOA }}>
                    {service.caseStudy.sessions} {lang === "es" ? "sesiones" : "sessions"} ·{" "}
                    {service.caseStudy.months} {lang === "es" ? "meses" : "months"} · ~
                    {service.caseStudy.improvement} {lang === "es" ? "mejora" : "improvement"}
                  </div>
                </div>

                <div
                  className="hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "rgba(42,30,26,0.12)",
                    backgroundColor: "rgba(255,252,248,0.60)",
                    color: ESPRESSO,
                  }}
                >
                  {lang === "es" ? "Antes / Después" : "Before / After"}
                </div>
              </div>

              <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(241,232,221,0.75)",
                  }}
                >
                  <div
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
                    style={{ backgroundColor: "rgba(42,30,26,0.28)", color: "#fff" }}
                  >
                    {lang === "es" ? "Antes" : "Before"}
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs" style={{ color: TAUPE }}>
                      {lang === "es" ? "Imagen de referencia" : "Reference image"}
                    </span>
                  </div>
                </div>

                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(201,174,126,0.22)",
                  }}
                >
                  <div
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
                    style={{ backgroundColor: "rgba(42,30,26,0.28)", color: "#fff" }}
                  >
                    {lang === "es" ? "Después" : "After"}
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs" style={{ color: TAUPE }}>
                      {lang === "es" ? "Imagen de referencia" : "Reference image"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <p className="text-xs italic" style={{ color: "rgba(107,90,82,0.78)" }}>
                  {lang === "es"
                    ? "Los resultados pueden variar según cada paciente."
                    : "Results may vary depending on each patient."}
                </p>
              </div>
            </div>

            <div className="h-6" />
          </div>

          {/* Footer */}
          <div
            className="sticky bottom-0 z-10 flex gap-3 border-t px-6 py-4 backdrop-blur"
            style={{
              backgroundColor: "rgba(251,248,243,0.82)",
              borderColor: "rgba(42,30,26,0.10)",
            }}
          >
            <Button
              onClick={() => {
                onAddService(service);
                onClose();
              }}
              className="flex-1 rounded-xl py-3 font-medium"
              style={{
                backgroundColor: ROSE,
                color: "#fff",
                boxShadow: "0 18px 55px rgba(195,154,139,0.28)",
              }}
            >
              {lang === "es" ? "Agregar a cita" : "Add to appointment"}
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-xl px-6 py-3 font-medium"
              style={{
                backgroundColor: "rgba(255,252,248,0.55)",
                borderColor: "rgba(42,30,26,0.18)",
                color: ESPRESSO,
              }}
            >
              {lang === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}