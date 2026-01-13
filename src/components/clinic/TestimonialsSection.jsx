import React from "react";
import { Star } from "lucide-react";

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

export default function TestimonialsSection({ lang }) {
  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-28" style={{ backgroundColor: CREAM }}>
      {/* Soft premium backdrop (no black) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1100px 520px at 20% 18%, rgba(201,174,126,0.22), transparent 60%),
            radial-gradient(900px 520px at 78% 12%, rgba(195,154,139,0.16), transparent 62%),
            linear-gradient(to bottom, rgba(251,248,243,0.55), rgba(241,232,221,0.75), rgba(251,248,243,0.70))
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          {/* Centered badge for aesthetic hierarchy */}
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ROSE }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: COCOA }}
            >
              {lang === "es" ? "Testimonios" : "Testimonials"}
            </span>
          </div>

          <h2
            className="text-3xl font-light tracking-[-0.02em] md:text-4xl"
            style={{ color: ESPRESSO }}
          >
            {lang === "es"
              ? "Lo Que Dicen Nuestros Pacientes"
              : "What Our Patients Say"}
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: COCOA }}
          >
            {lang === "es"
              ? "Testimonios reales de quienes han confiado en nosotros."
              : "Real testimonials from those who have trusted us."}
          </p>

          <div
            className="mx-auto mt-8 h-px w-full max-w-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(255,252,248,0.72)",
                boxShadow: "0 22px 70px rgba(42,30,26,0.10)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Soft glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage: `
                    radial-gradient(700px 340px at 25% 0%, rgba(201,174,126,0.20), transparent 60%),
                    radial-gradient(700px 340px at 85% 10%, rgba(195,154,139,0.14), transparent 62%)
                  `,
                }}
              />

              <div className="relative">
                {/* Stars */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{ fill: CHAMPAGNE, color: CHAMPAGNE }}
                    />
                  ))}
                </div>

                {/* Review */}
                <p
                  className="mt-4 text-center text-sm leading-relaxed"
                  style={{ color: COCOA }}
                >
                  “{lang === "es" ? testimonial.reviewEs : testimonial.reviewEn}”
                </p>

                {/* Divider */}
                <div
                  className="mx-auto mt-5 h-px w-16"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
                    opacity: 0.8,
                  }}
                />

                {/* Author */}
                <div className="mt-5 text-center">
                  <p className="text-sm font-medium" style={{ color: ESPRESSO }}>
                    {lang === "es" ? testimonial.nameEs : testimonial.nameEn}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: TAUPE }}>
                    {lang === "es" ? testimonial.serviceEs : testimonial.serviceEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="mx-auto mt-14 h-px w-full max-w-4xl"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
            opacity: 0.65,
          }}
        />
      </div>
    </section>
  );
}