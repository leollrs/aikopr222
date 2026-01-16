// ServicesSection.jsx
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
    idealEs: "Ideal para quienes buscan una solución permanente al vello no deseado.",
    idealEn: "Ideal for those seeking a permanent solution to unwanted hair.",
    benefitsEs: ["Resultados duraderos", "Sin dolor significativo", "Apto para todo tipo de piel"],
    benefitsEn: ["Long-lasting results", "Minimal discomfort", "Suitable for all skin types"],
    image: "/services/depilacion-laser.jpg",
    caseStudy: {
      sessions: 6,
      months: 8,
      improvement: "85%",
      beforeImage: "/results/depilacion-laser-before.jpg",
      afterImage: "/results/depilacion-laser-after.jpg",
    },
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
    idealEs: "Perfecto para eventos especiales o mantenimiento regular de la piel.",
    idealEn: "Perfect for special events or regular skin maintenance.",
    benefitsEs: ["Piel luminosa inmediata", "Reduce poros", "Sin tiempo de recuperación"],
    benefitsEn: ["Immediate glowing skin", "Reduces pores", "No downtime"],
    image: "/services/carbon-peel.jpg",
    caseStudy: {
      sessions: 4,
      months: 3,
      improvement: "90%",
      beforeImage: "/results/carbon-peel-before.jpg",
      afterImage: "/results/carbon-peel-after.jpg",
    },
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
    image: "/services/eliminacion-tatuajes.jpg",
    caseStudy: {
      sessions: 8,
      months: 12,
      improvement: "95%",
      beforeImage: "/results/eliminacion-tatuajes-before.jpg",
      afterImage: "/results/eliminacion-tatuajes-after.jpg",
    },
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
    image: "/services/eliminacion-micropigmentacion.jpg",
    caseStudy: {
      sessions: 4,
      months: 4,
      improvement: "88%",
      beforeImage: "/results/eliminacion-micropigmentacion-before.jpg",
      afterImage: "/results/eliminacion-micropigmentacion-after.jpg",
    },
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
    image: "/services/eliminacion-verrugas.jpg",
    caseStudy: {
      sessions: 2,
      months: 1,
      improvement: "100%",
      beforeImage: "/results/eliminacion-verrugas-before.jpg",
      afterImage: "/results/eliminacion-verrugas-after.jpg",
    },
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
    image: "/services/plasma-fibroblast.jpg",
    caseStudy: {
      sessions: 2,
      months: 6,
      improvement: "80%",
      beforeImage: "/results/plasma-fibroblast-before.jpg",
      afterImage: "/results/plasma-fibroblast-after.jpg",
    },
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
    image: "/services/microneedling.jpg",
    caseStudy: {
      sessions: 4,
      months: 4,
      improvement: "75%",
      beforeImage: "/results/microneedling-before.jpg",
      afterImage: "/results/microneedling-after.jpg",
    },
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
    image: "/services/hifu.jpg",
    caseStudy: {
      sessions: 1,
      months: 6,
      improvement: "70%",
      beforeImage: "/results/hifu-before.jpg",
      afterImage: "/results/hifu-after.jpg",
    },
  },
];

export { services };

export default function ServicesSection({ lang = "es", onAddService, onViewDetails, sectionRef }) {
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";

  return (
    <section
      id="ServicesSection"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: LINEN }}
    >
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
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Nuestros Servicios" : "Our Services"}
          </h2>

          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            {lang === "es"
              ? "Tratamientos estéticos de última generación realizados por profesionales certificados."
              : "State-of-the-art aesthetic treatments performed by certified professionals."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              lang={lang}
              onAddService={onAddService}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}