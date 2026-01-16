import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    nameEs: "María G.",
    nameEn: "Maria G.",
    serviceEs: "Depilación Láser",
    serviceEn: "Laser Hair Removal",
    reviewEs:
      "Después de 6 sesiones, mi piel está completamente suave. El equipo es muy profesional y el proceso fue cómodo.",
    reviewEn:
      "After 6 sessions, my skin is completely smooth. The team is very professional and the process was comfortable.",
    stars: 5,
  },
  {
    id: 2,
    nameEs: "Carlos M.",
    nameEn: "Carlos M.",
    serviceEs: "Eliminación de Tatuaje",
    serviceEn: "Tattoo Removal",
    reviewEs:
      "Excelente resultado. Mi tatuaje antiguo ya casi no se nota. Muy recomendado.",
    reviewEn:
      "Excellent result. My old tattoo is barely visible now. Highly recommended.",
    stars: 5,
  },
  {
    id: 3,
    nameEs: "Ana L.",
    nameEn: "Ana L.",
    serviceEs: "Hollywood Peel",
    serviceEn: "Hollywood Peel",
    reviewEs:
      "Mi piel nunca había lucido tan radiante. Perfecto para eventos especiales.",
    reviewEn:
      "My skin has never looked so radiant. Perfect for special events.",
    stars: 5,
  },
  {
    id: 4,
    nameEs: "Roberto S.",
    nameEn: "Roberto S.",
    serviceEs: "HIFU Rejuvenecimiento",
    serviceEn: "HIFU Rejuvenation",
    reviewEs:
      "Noté mejoras desde la primera sesión. El lifting es natural y sin cirugía.",
    reviewEn:
      "I noticed improvements from the first session. The lift is natural and non-surgical.",
    stars: 5,
  },
];

export default function TestimonialsSection({ lang = "es", sectionRef }) {
  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <section
      id="TestimonialsSection"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: LINEN }}
    >
      {/* Same premium backdrop language as other sections */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 50% 20%, rgba(201,174,126,0.07), transparent 70%),
            radial-gradient(1000px 520px at 15% 5%, rgba(195,154,139,0.10), transparent 62%),
            linear-gradient(to bottom, rgba(251,248,243,0.42), rgba(241,232,221,0.82))
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header — matches hierarchy style */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ROSE }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: TAUPE }}
            >
              {lang === "es" ? "Testimonios" : "Testimonials"}
            </span>
          </div>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Lo Que Dicen Nuestros Pacientes" : "What Our Patients Say"}
          </h2>

          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            {lang === "es"
              ? "Opiniones reales de personas que han confiado en nuestros tratamientos."
              : "Real feedback from people who trusted our treatments."}
          </p>
        </div>

        {/* Grid — 1/2/4 like others; cards match your glass + border language */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-3xl border p-7 transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(255,252,248,0.92)",
                borderColor: "rgba(42,30,26,0.08)",
                boxShadow: "0 12px 40px rgba(42,30,26,0.06)",
              }}
            >
              {/* Hover glow — same as services cards */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(201,174,126,0.12),transparent_70%)]" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Top row: stars + quote badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        style={{ fill: CHAMPAGNE, color: CHAMPAGNE, opacity: 0.95 }}
                      />
                    ))}
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border"
                    style={{
                      borderColor: "rgba(42,30,26,0.10)",
                      backgroundColor: "rgba(241,232,221,0.55)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                    }}
                    aria-hidden="true"
                  >
                    <Quote className="h-4 w-4" style={{ color: ROSE, opacity: 0.9 }} />
                  </div>
                </div>

                {/* Review */}
                <p
                  className="mt-5 font-body text-sm leading-relaxed"
                  style={{ color: COCOA, opacity: 0.9 }}
                >
                  “{lang === "es" ? t.reviewEs : t.reviewEn}”
                </p>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Bottom: author + service pill */}
                <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(42,30,26,0.08)" }}>
                  <p className="text-sm font-medium" style={{ color: ESPRESSO }}>
                    {lang === "es" ? t.nameEs : t.nameEn}
                  </p>

                  <div className="mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                    <span style={{ color: CHAMPAGNE }}>•</span>
                    <span className="ml-2" style={{ color: TAUPE }}>
                      {lang === "es" ? t.serviceEs : t.serviceEn}
                    </span>

                    <style jsx>{`
                      .inline-flex.items-center.rounded-full.border.px-3.py-1.text-xs.font-medium {
                        border-color: rgba(42, 30, 26, 0.10);
                        background: rgba(255, 252, 248, 0.70);
                        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);
                      }
                    `}</style>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider — same gradient line language */}
        <div
          className="mx-auto mt-16 h-px w-full max-w-5xl"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
            opacity: 0.65,
          }}
        />
      </div>
    </section>
  );
}