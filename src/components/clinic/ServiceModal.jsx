// ServiceModal.jsx (FULL — with temporary placeholder images per service)
// ✅ no top image
// ✅ no bottom "Cerrar"
// ✅ slider works
// ✅ uses service.caseStudy.beforeImage / afterImage
import React, { useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceModal({ service, lang, isOpen, onClose, onAddService }) {
  if (!isOpen || !service) return null;

  // NEW PALETTE (shared)
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const name = lang === "es" ? service.nameEs : service.nameEn;
  const ideal = lang === "es" ? service.idealEs : service.idealEn;
  const benefits = lang === "es" ? service.benefitsEs : service.benefitsEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  // ✅ TEMP PLACEHOLDERS (mapped by service.id)
  const PLACEHOLDER_BY_ID = {
    1: {
      before: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&fit=crop",
      after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&fit=crop",
    },
    2: {
      before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&fit=crop",
    },
    3: {
      before: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=1200&fit=crop",
    },
    4: {
      before: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=1200&fit=crop",
    },
    5: {
      before: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&fit=crop",
    },
    6: {
      before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&fit=crop",
    },
    7: {
      before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&fit=crop",
    },
    8: {
      before: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&fit=crop",
      after: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=1200&fit=crop",
    },
  };

  // Optional — uses real photos if present, otherwise placeholders
  const fallback = PLACEHOLDER_BY_ID?.[service.id] || null;

  const beforeImage =
    service?.caseStudy?.beforeImage && service.caseStudy.beforeImage.trim() !== ""
      ? service.caseStudy.beforeImage
      : fallback?.before || "";

  const afterImage =
    service?.caseStudy?.afterImage && service.caseStudy.afterImage.trim() !== ""
      ? service.caseStudy.afterImage
      : fallback?.after || "";

  const hasBeforeAfter = Boolean(beforeImage) && Boolean(afterImage);

  return (
    <>
      {/* Backdrop */}
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

              <h3
                className="mt-2 truncate text-xl font-medium tracking-[-0.01em]"
                style={{ color: ESPRESSO }}
              >
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

              {/* Price badge */}
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
              <h4
                className="text-xs font-semibold tracking-[0.22em] uppercase"
                style={{ color: ESPRESSO }}
              >
                {lang === "es" ? "Ideal para" : "Ideal for"}
              </h4>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA }}>
                {ideal}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-7">
              <h4
                className="text-xs font-semibold tracking-[0.22em] uppercase"
                style={{ color: ESPRESSO }}
              >
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
                  <div
                    className="text-xs font-semibold tracking-[0.22em] uppercase"
                    style={{ color: ESPRESSO }}
                  >
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
                  {lang === "es" ? "Arrastra para comparar" : "Drag to compare"}
                </div>
              </div>

              <div className="px-5 pb-5">
                {hasBeforeAfter ? (
                  <BeforeAfterSlider
                    lang={lang}
                    beforeSrc={beforeImage}
                    afterSrc={afterImage}
                    containerStyle={{
                      borderColor: "rgba(42,30,26,0.10)",
                      backgroundColor: "rgba(241,232,221,0.75)",
                    }}
                    accent={CHAMPAGNE}
                    textColor={ESPRESSO}
                  />
                ) : (
                  <BeforeAfterPlaceholder lang={lang} />
                )}

                <p className="mt-4 text-xs italic" style={{ color: "rgba(107,90,82,0.78)" }}>
                  {lang === "es"
                    ? "Los resultados pueden variar según cada paciente."
                    : "Results may vary depending on each patient."}
                </p>
              </div>
            </div>

            <div className="h-6" />
          </div>

          {/* Footer (ONLY one button) */}
          <div
            className="sticky bottom-0 z-10 border-t px-6 py-4 backdrop-blur"
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
              className="w-full rounded-xl py-3 font-medium"
              style={{
                backgroundColor: ROSE,
                color: "#fff",
                boxShadow: "0 18px 55px rgba(195,154,139,0.28)",
              }}
            >
              {lang === "es" ? "Agregar a cita" : "Add to appointment"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

/** Placeholder until you have real photos */
function BeforeAfterPlaceholder({ lang }) {
  const isEs = lang === "es";
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border"
      style={{
        borderColor: "rgba(42,30,26,0.10)",
        background:
          "radial-gradient(900px 520px at 20% 0%, rgba(201,174,126,0.18), transparent 60%), radial-gradient(900px 520px at 90% 10%, rgba(195,154,139,0.14), transparent 60%), linear-gradient(to bottom, rgba(255,252,248,0.75), rgba(241,232,221,0.65))",
      }}
    >
      <div className="absolute inset-0 p-4">
        <div
          className="h-full w-full rounded-lg border"
          style={{
            borderColor: "rgba(42,30,26,0.10)",
            backgroundColor: "rgba(255,252,248,0.55)",
          }}
        />
      </div>

      <div
        className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium"
        style={{ backgroundColor: "rgba(42,30,26,0.20)", color: "#fff" }}
      >
        {isEs ? "Antes" : "Before"}
      </div>
      <div
        className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium"
        style={{ backgroundColor: "rgba(42,30,26,0.20)", color: "#fff" }}
      >
        {isEs ? "Después" : "After"}
      </div>

      <div
        className="absolute inset-y-0 left-1/2"
        style={{
          width: "2px",
          backgroundColor: "rgba(255,255,255,0.85)",
          transform: "translateX(-1px)",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-[11px] font-medium backdrop-blur"
        style={{
          borderColor: "rgba(42,30,26,0.12)",
          backgroundColor: "rgba(255,252,248,0.78)",
          color: "rgba(107,90,82,0.92)",
        }}
      >
        {isEs ? "Fotos de resultados pronto" : "Result photos coming soon"}
      </div>

      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] backdrop-blur"
        style={{
          backgroundColor: "rgba(255,252,248,0.72)",
          border: "1px solid rgba(42,30,26,0.12)",
          color: "rgba(107,90,82,0.92)",
        }}
      >
        {isEs ? "Arrastra para comparar" : "Drag to compare"}
      </div>
    </div>
  );
}

/**
 * Before/After slider:
 * - Drag anywhere (mouse/touch)
 * - Invisible range input for accessibility
 */
function BeforeAfterSlider({
  lang,
  beforeSrc,
  afterSrc,
  initial = 50,
  containerStyle = {},
  accent = "#C9AE7E",
  textColor = "#2A1E1A",
}) {
  const [pct, setPct] = useState(clamp(initial, 0, 100));
  const wrapRef = useRef(null);
  const draggingRef = useRef(false);
  const isEs = lang === "es";

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = (x / rect.width) * 100;
    setPct(clamp(next, 0, 100));
  };

  const onPointerDown = (e) => {
    draggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {}
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border select-none"
      style={{
        ...containerStyle,
        position: "relative",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      aria-label={isEs ? "Comparación antes y después" : "Before and after comparison"}
      role="group"
    >
      {/* AFTER (full) */}
      <img
        src={afterSrc}
        alt={isEs ? "Después" : "After"}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }} aria-hidden="true">
        <img
          src={beforeSrc}
          alt={isEs ? "Antes" : "Before"}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Soft top gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16),transparent_60%)]" />

      {/* Labels */}
      <div
        className="pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
        style={{ backgroundColor: "rgba(42,30,26,0.28)", color: "#fff" }}
      >
        {isEs ? "Antes" : "Before"}
      </div>
      <div
        className="pointer-events-none absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
        style={{ backgroundColor: "rgba(42,30,26,0.28)", color: "#fff" }}
      >
        {isEs ? "Después" : "After"}
      </div>

      {/* Divider line */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: `${pct}%`,
          width: "2px",
          backgroundColor: "rgba(255,255,255,0.85)",
          transform: "translateX(-1px)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: `${pct}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_20px_60px_rgba(42,30,26,0.22)]"
          style={{
            backgroundColor: "rgba(255,252,248,0.88)",
            borderColor: "rgba(42,30,26,0.14)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-1">
            <span className="h-3 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.9 }} />
            <span className="h-5 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.9 }} />
            <span className="h-3 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.9 }} />
          </div>
        </div>
      </div>

      {/* Accessible slider (invisible) */}
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        className="absolute inset-0 h-full w-full opacity-0"
        aria-label={isEs ? "Deslizar comparación" : "Slide comparison"}
      />

      {/* Hint */}
      <div
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] backdrop-blur"
        style={{
          backgroundColor: "rgba(255,252,248,0.72)",
          border: "1px solid rgba(42,30,26,0.12)",
          color: textColor,
          opacity: 0.78,
        }}
      >
        {isEs ? "Arrastra para comparar" : "Drag to compare"}
      </div>
    </div>
  );
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}