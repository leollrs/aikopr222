import React from "react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    id: 1,
    nameEs: "Depilación Láser",
    nameEn: "Laser Hair Removal",
    descEs:
      "Eliminación permanente del vello con tecnología láser de última generación para todo tipo de piel.",
    descEn:
      "Permanent hair removal with state-of-the-art laser technology for all skin types.",
    duration: "30-60 min",
    price: 99,
    idealEs:
      "Ideal para quienes buscan una solución permanente al vello no deseado.",
    idealEn: "Ideal for those seeking a permanent solution to unwanted hair.",
    benefitsEs: ["Resultados duraderos", "Sin dolor significativo", "Apto para todo tipo de piel"],
    benefitsEn: ["Long-lasting results", "Minimal discomfort", "Suitable for all skin types"],
    caseStudy: { sessions: 6, months: 8, improvement: "85%" },
  },
  {
    id: 2,
    nameEs: "Carbon Peel (Hollywood Peel)",
    nameEn: "Carbon Peel (Hollywood Peel)",
    descEs:
      "Tratamiento facial rejuvenecedor que utiliza carbón y láser para una piel radiante al instante.",
    descEn:
      "Rejuvenating facial treatment using carbon and laser for instantly radiant skin.",
    duration: "45 min",
    price: 149,
    idealEs:
      "Perfecto para eventos especiales o mantenimiento regular de la piel.",
    idealEn: "Perfect for special events or regular skin maintenance.",
    benefitsEs: ["Piel luminosa inmediata", "Reduce poros", "Sin tiempo de recuperación"],
    benefitsEn: ["Immediate glowing skin", "Reduces pores", "No downtime"],
    caseStudy: { sessions: 4, months: 3, improvement: "90%" },
  },
  {
    id: 3,
    nameEs: "Eliminación de Tatuajes",
    nameEn: "Tattoo Removal",
    descEs:
      "Borrado seguro y efectivo de tatuajes con tecnología láser Q-Switch avanzada.",
    descEn:
      "Safe and effective tattoo removal with advanced Q-Switch laser technology.",
    duration: "30-45 min",
    price: 199,
    idealEs: "Para quienes desean eliminar o aclarar tatuajes no deseados.",
    idealEn: "For those wanting to remove or lighten unwanted tattoos.",
    benefitsEs: ["Elimina todos los colores", "Tratamiento progresivo", "Mínima cicatrización"],
    benefitsEn: ["Removes all colors", "Progressive treatment", "Minimal scarring"],
    caseStudy: { sessions: 8, months: 12, improvement: "95%" },
  },
  {
    id: 4,
    nameEs: "Eliminación de Micropigmentación",
    nameEn: "Micropigmentation Removal",
    descEs:
      "Corrección y eliminación de micropigmentación en cejas, labios y delineado.",
    descEn:
      "Correction and removal of micropigmentation on eyebrows, lips, and eyeliner.",
    duration: "30 min",
    price: 149,
    idealEs: "Ideal para corregir micropigmentación decolorada o mal realizada.",
    idealEn: "Ideal for correcting faded or poorly done micropigmentation.",
    benefitsEs: ["Resultados precisos", "Recuperación rápida", "Técnica especializada"],
    benefitsEn: ["Precise results", "Quick recovery", "Specialized technique"],
    caseStudy: { sessions: 4, months: 4, improvement: "88%" },
  },
  {
    id: 5,
    nameEs: "Eliminación de Verrugas",
    nameEn: "Wart Removal",
    descEs:
      "Tratamiento láser preciso para eliminar verrugas de forma segura y sin cicatrices.",
    descEn:
      "Precise laser treatment to safely remove warts without scarring.",
    duration: "15-30 min",
    price: 79,
    idealEs: "Para eliminar verrugas en cualquier parte del cuerpo.",
    idealEn: "For removing warts anywhere on the body.",
    benefitsEs: ["Procedimiento rápido", "Sin suturas", "Recuperación inmediata"],
    benefitsEn: ["Quick procedure", "No stitches", "Immediate recovery"],
    caseStudy: { sessions: 2, months: 1, improvement: "100%" },
  },
  {
    id: 6,
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    descEs:
      "Rejuvenecimiento no quirúrgico que tensa la piel y reduce arrugas con tecnología de plasma.",
    descEn:
      "Non-surgical rejuvenation that tightens skin and reduces wrinkles with plasma technology.",
    duration: "60-90 min",
    price: 299,
    idealEs: "Para quienes buscan lifting sin cirugía.",
    idealEn: "For those seeking a lift without surgery.",
    benefitsEs: ["Efecto lifting natural", "Estimula colágeno", "Resultados duraderos"],
    benefitsEn: ["Natural lifting effect", "Stimulates collagen", "Long-lasting results"],
    caseStudy: { sessions: 2, months: 6, improvement: "80%" },
  },
  {
    id: 7,
    nameEs: "Microneedling",
    nameEn: "Microneedling",
    descEs:
      "Estimulación de colágeno mediante microagujas para mejorar textura y cicatrices.",
    descEn:
      "Collagen stimulation through microneedles to improve texture and scars.",
    duration: "45-60 min",
    price: 179,
    idealEs: "Ideal para cicatrices de acné, arrugas finas y mejora de textura.",
    idealEn: "Ideal for acne scars, fine lines, and texture improvement.",
    benefitsEs: ["Regenera la piel", "Reduce cicatrices", "Mejora absorción de productos"],
    benefitsEn: ["Regenerates skin", "Reduces scars", "Improves product absorption"],
    caseStudy: { sessions: 4, months: 4, improvement: "75%" },
  },
  {
    id: 8,
    nameEs: "Rejuvenecimiento HIFU",
    nameEn: "HIFU Rejuvenation",
    descEs:
      "Ultrasonido focalizado de alta intensidad para lifting facial profundo sin cirugía.",
    descEn:
      "High-intensity focused ultrasound for deep facial lifting without surgery.",
    duration: "60-90 min",
    price: 399,
    idealEs: "Para quienes desean un lifting profundo sin tiempo de recuperación.",
    idealEn: "For those wanting a deep lift with no recovery time.",
    benefitsEs: ["Lifting profundo", "Sin anestesia", "Resultados progresivos"],
    benefitsEn: ["Deep lifting", "No anesthesia", "Progressive results"],
    caseStudy: { sessions: 1, months: 6, improvement: "70%" },
  },
];

export { services };

export default function ServicesSection({
  lang = "es",
  onAddService,
  onViewDetails,
  sectionRef,
}) {
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
      id="ServicesSection"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-24 lg:py-28"
      style={{ backgroundColor: LINEN }}
    >
      {/* Soft premium backdrop (no black) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1100px 520px at 20% 20%, rgba(201,174,126,0.28), transparent 60%),
            radial-gradient(900px 520px at 80% 10%, rgba(195,154,139,0.18), transparent 62%),
            linear-gradient(to bottom, rgba(251,248,243,0.65), rgba(241,232,221,0.92), rgba(251,248,243,0.78))
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: COCOA }}
            >
              {lang === "es" ? "Servicios premium" : "Premium services"}
            </span>
          </div>

          <h2
            className="text-3xl font-light tracking-[-0.03em] md:text-4xl lg:text-5xl"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Nuestros Servicios" : "Our Services"}
          </h2>

          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: COCOA }}
          >
            {lang === "es"
              ? "Tratamientos estéticos de última generación realizados por profesionales certificados."
              : "State-of-the-art aesthetic treatments performed by certified professionals."}
          </p>

          <div
            className="mx-auto mt-8 h-px w-full max-w-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-3xl border p-1 transition-transform duration-300 hover:-translate-y-1"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(255,252,248,0.55)",
                boxShadow: "0 26px 80px rgba(42,30,26,0.10)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Card glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage: `
                    radial-gradient(700px 340px at 30% 10%, rgba(201,174,126,0.22), transparent 60%),
                    radial-gradient(600px 320px at 80% 20%, rgba(195,154,139,0.16), transparent 62%)
                  `,
                }}
              />

              <div
                className="relative rounded-[22px]"
                style={{ backgroundColor: "rgba(251,248,243,0.72)" }}
              >
                <ServiceCard
                  service={service}
                  lang={lang}
                  onAddService={onAddService}
                  onViewDetails={onViewDetails}
                />
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