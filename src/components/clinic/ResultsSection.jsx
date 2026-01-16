// ResultsSection.jsx (FULL — uses a premium before/after slider per result)
import React, { useRef, useState } from "react";

const results = [
  {
    nameEs: "Depilación Láser",
    nameEn: "Laser Hair Removal",
    areaEs: "Piernas completas",
    areaEn: "Full legs",
    before: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=800&fit=crop",
  },
  {
    nameEs: "Carbon Peel",
    nameEn: "Carbon Peel",
    areaEs: "Rostro completo",
    areaEn: "Full face",
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop",
  },
  {
    nameEs: "Eliminación de Tatuajes",
    nameEn: "Tattoo Removal",
    areaEs: "Brazo superior",
    areaEn: "Upper arm",
    before: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800&h=800&fit=crop",
  },
  {
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    areaEs: "Párpados superiores",
    areaEn: "Upper eyelids",
    before: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&h=800&fit=crop",
  },
  {
    nameEs: "Microneedling",
    nameEn: "Microneedling",
    areaEs: "Cicatrices de acné",
    areaEn: "Acne scars",
    before: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=800&fit=crop",
  },
  {
    nameEs: "HIFU Rejuvenecimiento",
    nameEn: "HIFU Rejuvenation",
    areaEs: "Lifting facial",
    areaEn: "Facial lifting",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop",
    after: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop",
  },
];

export default function ResultsSection({ lang = "es", sectionRef }) {
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const TAUPE = "#8B7468";

  return (
    <section
      id="ResultsSection"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: CREAM }}
    >
      {/* Clean subtle backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 50% 20%, rgba(201,174,126,0.06), transparent 70%),
            linear-gradient(to bottom, rgba(251,248,243,0.4), rgba(241,232,221,0.8))
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Nuestros Resultados" : "Our Results"}
          </h2>

          <p
            className="font-body text-lg md:text-xl leading-relaxed"
            style={{ color: COCOA, opacity: 0.88 }}
          >
            {lang === "es"
              ? "Casos reales de nuestros clientes. Imágenes sin editar."
              : "Real cases from our clients. Unedited images."}
          </p>
        </div>

        {/* Results Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(255,252,248,0.95)",
                border: "1px solid rgba(42,30,26,0.06)",
                boxShadow: "0 8px 32px rgba(42,30,26,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px 300px at 50% 0%, rgba(201,174,126,0.08), transparent 70%)",
                }}
              />

              <div className="relative p-6">
                {/* Title */}
                <div className="mb-6">
                  <h3
                    className="font-display text-xl font-medium tracking-tight mb-1"
                    style={{ color: ESPRESSO }}
                  >
                    {lang === "es" ? result.nameEs : result.nameEn}
                  </h3>
                  <p className="font-body text-sm" style={{ color: TAUPE }}>
                    {lang === "es" ? result.areaEs : result.areaEn}
                  </p>
                </div>

                {/* Slider */}
                <BeforeAfterSlider
                  lang={lang}
                  beforeSrc={result.before}
                  afterSrc={result.after}
                  initial={50}
                  accent={CHAMPAGNE}
                  textColor={ESPRESSO}
                  containerStyle={{
                    border: "1px solid rgba(42,30,26,0.08)",
                    backgroundColor: "rgba(241,232,221,0.35)",
                    boxShadow: "inset 0 2px 8px rgba(42,30,26,0.04)",
                  }}
                />

                {/* Disclaimer */}
                <p
                  className="mt-5 font-body text-xs leading-relaxed"
                  style={{ color: TAUPE, opacity: 0.8 }}
                >
                  {lang === "es"
                    ? "* Los resultados individuales pueden variar. Consulta con nuestro especialista."
                    : "* Individual results may vary. Consult with our specialist."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Before/After slider:
 * - Drag anywhere (mouse/touch)
 * - Has an invisible range input for accessibility
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
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl select-none"
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
        loading="lazy"
      />

      {/* BEFORE (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }} aria-hidden="true">
        <img
          src={beforeSrc}
          alt={isEs ? "Antes" : "Before"}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent_60%)]" />

      {/* Labels */}
      <div
        className="pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
        style={{ backgroundColor: "rgba(42,30,26,0.30)", color: "#fff" }}
      >
        {isEs ? "Antes" : "Before"}
      </div>
      <div
        className="pointer-events-none absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium backdrop-blur"
        style={{ backgroundColor: "rgba(42,30,26,0.30)", color: "#fff" }}
      >
        {isEs ? "Después" : "After"}
      </div>

      {/* Divider */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{
          left: `${pct}%`,
          width: "2px",
          backgroundColor: "rgba(255,255,255,0.9)",
          transform: "translateX(-1px)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2"
        style={{
          left: `${pct}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_20px_60px_rgba(42,30,26,0.22)]"
          style={{
            backgroundColor: "rgba(255,252,248,0.90)",
            borderColor: "rgba(42,30,26,0.14)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-1">
            <span className="h-3 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.92 }} />
            <span className="h-5 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.92 }} />
            <span className="h-3 w-[2px] rounded" style={{ backgroundColor: accent, opacity: 0.92 }} />
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
          opacity: 0.8,
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