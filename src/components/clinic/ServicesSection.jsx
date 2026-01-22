// ServicesSection.jsx
import React from "react";
import ServiceCard from "./ServiceCard";

/**
 * Updated services to match your latest menu.
 * Notes:
 * - Kept your original field names (nameEs/nameEn/descEs/descEn/duration/price/ideal/benefits/image/caseStudy)
 *   so your existing <ServiceCard /> doesn’t break.
 * - For services with multiple zones/options, I added `pricingOptions` (array). Your ServiceCard can ignore it,
 *   or you can enhance the UI later to show options in the modal/details view.
 * - Prices: `price` is the “starting / main” number for quick display on the card.
 */

const services = [
  // =========================================================
  // ⭐ CO2 LASER FRACCIONADO
  // =========================================================
  {
    id: 1,
    nameEs: "CO₂ Láser Fraccionado",
    nameEn: "Fractional CO₂ Laser",
    descEs:
      "Tratamiento de estética avanzada que mejora visiblemente la calidad de la piel creando microzonas térmicas controladas para estimular renovación cutánea, colágeno y elastina.",
    descEn:
      "Advanced aesthetic treatment that improves skin quality by creating controlled micro-thermal zones to stimulate renewal, collagen, and elastin.",
    duration: "45–60 min",
    price: 230,
    idealEs:
      "Personas que desean rejuvenecer la piel, mejorar textura, poros, marcas visibles y signos de envejecimiento (dentro del alcance estético, no médico).",
    idealEn:
      "Ideal for those seeking aesthetic skin rejuvenation: texture, pores, visible marks, and signs of aging (aesthetic scope, not medical).",
    benefitsEs: [
      "Estimula colágeno y elastina",
      "Mejora textura y poros",
      "Resultados progresivos y duraderos",
      "Uniforma tono y luminosidad",
    ],
    benefitsEn: [
      "Stimulates collagen and elastin",
      "Improves texture and pores",
      "Progressive, long-lasting results",
      "More even tone and glow",
    ],
    image: "/services/co2-laser-fraccionado.jpg",
    // Keep as structured detail for your modal/details view
    details: {
      evaluationRequired: true,
      sessions: "1 a 3 sesiones",
      interval: "Cada 4 a 6 semanas (según evaluación estética)",
      improves: [
        "Cicatrices de acné (superficial e irregular)",
        "Marcas y cicatrices post procedimientos estéticos",
        "Arrugas finas y medias",
        "Líneas de expresión",
        "Poros dilatados",
        "Manchas y tono desigual",
        "Rejuvenecimiento facial global",
        "Textura áspera o envejecida",
        "Piel opaca o fotoenvejecida",
      ],
      contraindications: [
        "Embarazo",
        "Infecciones activas en la piel",
        "Exposición solar reciente",
        "Piel extremadamente sensible",
        "Tendencia a cicatrización anormal (evaluación previa)",
      ],
      postCare: [
        "Evitar sol directo",
        "Uso constante de protector solar",
        "No maquillaje por varios días",
        "Hidratación profunda",
        "No manipular la piel tratada",
      ],
      recommendations: [
        "Fotoprotección diaria",
        "Rutina cosmética adecuada",
        "Tratamientos de mantenimiento",
        "Hábitos saludables de cuidado de la piel",
      ],
    },
    caseStudy: {
      sessions: 2,
      months: 3,
      improvement: "—",
      beforeImage: "/results/co2-laser-before.jpg",
      afterImage: "/results/co2-laser-after.jpg",
    },
    tags: ["Servicios Profesionales", "Evaluación Previa", "Estética Avanzada"],
  },

  // =========================================================
  // 🔬 RF FRACCIONADA CON MICROAGUJAS
  // =========================================================
  {
    id: 2,
    nameEs: "Radiofrecuencia Fraccionada con Microagujas",
    nameEn: "Fractional RF Microneedling",
    descEs:
      "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
    descEn:
      "Aesthetic treatment combining microneedles with radiofrequency to improve firmness, texture, pores, and overall skin quality through collagen stimulation.",
    duration: "—",
    price: 149, // starting price (face/neck/chest)
    idealEs:
      "Ideal para quienes buscan mejorar firmeza, poros y textura con estimulación de colágeno.",
    idealEn:
      "Ideal for improving firmness, pores, and texture via collagen stimulation.",
    benefitsEs: ["Mejora firmeza", "Mejora poros", "Mejora textura", "Estimula colágeno"],
    benefitsEn: ["Improves firmness", "Refines pores", "Improves texture", "Stimulates collagen"],
    image: "/services/rf-microagujas.jpg",
    pricingOptions: [
      { labelEs: "Rostro, cuello y escote", labelEn: "Face, neck & chest", price: 149 },
      { labelEs: "Corporal (abdomen, brazos o entrepiernas)", labelEn: "Body (abdomen, arms, or bikini area)", price: 199 },
    ],
    details: {
      sessions: "3–4 sesiones",
      interval: "Cada 4 semanas",
      availability: ["A domicilio", "En cabina"],
    },
    caseStudy: {
      sessions: 3,
      months: 3,
      improvement: "—",
      beforeImage: "/results/rf-microagujas-before.jpg",
      afterImage: "/results/rf-microagujas-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },

  // =========================================================
  // 🔊 HIFU
  // =========================================================
  {
    id: 3,
    nameEs: "HIFU",
    nameEn: "HIFU",
    descEs:
      "Ultrasonido focalizado de alta intensidad (HIFU) para ayudar a reafirmar, tensar y redefinir el rostro y zonas corporales sin cirugía.",
    descEn:
      "High-intensity focused ultrasound (HIFU) to help firm, tighten, and redefine facial and body areas without surgery.",
    duration: "—",
    price: 120, // starting price (face/neck/chest)
    idealEs:
      "Para quienes desean reafirmar y tensar con un tratamiento no invasivo.",
    idealEn:
      "For those seeking firmness and tightening with a non-invasive treatment.",
    benefitsEs: ["No invasivo", "Reafirma y tensa", "Definición visible", "Mantenimiento 6–12 meses"],
    benefitsEn: ["Non-invasive", "Firms & tightens", "Visible definition", "Maintenance every 6–12 months"],
    image: "/services/hifu.jpg",
    pricingOptions: [
      { labelEs: "Rostro, cuello y escote", labelEn: "Face, neck & chest", price: 120 },
      { labelEs: "Corporal (abdomen, brazos o entrepiernas)", labelEn: "Body (abdomen, arms, or bikini area)", price: 180 },
    ],
    details: {
      sessions: "1 sesión",
      interval: "Cada 6–12 meses",
      availability: ["A domicilio", "En cabina"],
    },
    caseStudy: {
      sessions: 1,
      months: 6,
      improvement: "—",
      beforeImage: "/results/hifu-before.jpg",
      afterImage: "/results/hifu-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },

  // =========================================================
  // ✒️ MICROAGUJAS PARA MANCHAS
  // =========================================================
  {
    id: 4,
    nameEs: "Microagujas para Manchas",
    nameEn: "Microneedling for Dark Spots",
    descEs:
      "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono, la luminosidad y la apariencia de manchas.",
    descEn:
      "Aesthetic collagen induction treatment with brightening actives to improve tone, glow, and the appearance of dark spots.",
    duration: "—",
    price: 120,
    idealEs:
      "Ideal para quienes buscan mejorar manchas y unificar el tono con un protocolo estético.",
    idealEn:
      "Ideal for improving dark spots and evening tone with an aesthetic protocol.",
    benefitsEs: ["Mejora tono", "Aumenta luminosidad", "Estimula colágeno", "Mejora textura"],
    benefitsEn: ["Improves tone", "Boosts glow", "Stimulates collagen", "Improves texture"],
    image: "/services/microagujas-manchas.jpg",
    pricingOptions: [{ labelEs: "Rostro", labelEn: "Face", price: 120 }],
    details: { availability: ["A domicilio", "En cabina"] },
    caseStudy: {
      sessions: 3,
      months: 3,
      improvement: "—",
      beforeImage: "/results/microagujas-manchas-before.jpg",
      afterImage: "/results/microagujas-manchas-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },

  // =========================================================
  // ⚡ PLASMA FIBROBLAST (incluye remoción de verrugas desde $60)
  // =========================================================
  {
    id: 5,
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    descEs:
      "Tecnología estética localizada para mejorar la apariencia de la piel y tratar lesiones superficiales dentro del alcance estético.",
    descEn:
      "Localized aesthetic technology to improve the appearance of skin and address superficial lesions within aesthetic scope.",
    duration: "—",
    price: 60, // from
    idealEs:
      "Ideal para quienes buscan un tratamiento localizado estético de alta precisión.",
    idealEn:
      "Ideal for those seeking a precise, localized aesthetic treatment.",
    benefitsEs: ["Trabajo localizado", "Precisión", "Mejora apariencia", "Opciones según evaluación"],
    benefitsEn: ["Targeted approach", "Precision", "Improves appearance", "Options based on evaluation"],
    image: "/services/plasma-fibroblast.jpg",
    pricingOptions: [
      { labelEs: "Remoción de verrugas (desde)", labelEn: "Wart removal (from)", price: 60 },
    ],
    details: { availability: ["A domicilio", "En cabina"] },
    caseStudy: {
      sessions: 1,
      months: 1,
      improvement: "—",
      beforeImage: "/results/plasma-before.jpg",
      afterImage: "/results/plasma-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },

  // =========================================================
  // 💡 DEPILACIÓN LÁSER DIODO (por zonas)
  // =========================================================
  {
    id: 6,
    nameEs: "Depilación Láser Diodo",
    nameEn: "Diode Laser Hair Removal",
    descEs:
      "Depilación láser por zonas con tecnología diodo para reducir el vello no deseado de forma progresiva.",
    descEn:
      "Zone-based diode laser hair removal for progressive reduction of unwanted hair.",
    duration: "—",
    price: 35, // lowest zone price
    idealEs:
      "Ideal para quienes buscan reducir el vello por zonas con un plan de sesiones personalizado.",
    idealEn:
      "Ideal for those looking to reduce hair by area with a personalized session plan.",
    benefitsEs: ["Tratamiento por zonas", "Resultados progresivos", "Plan personalizado", "Tecnología diodo"],
    benefitsEn: ["Area-based treatment", "Progressive results", "Personalized plan", "Diode technology"],
    image: "/services/laser-diodo.jpg",
    pricingOptions: [
      { labelEs: "Bozo", labelEn: "Upper lip", price: 35 },
      { labelEs: "Axilas", labelEn: "Underarms", price: 45 },
      { labelEs: "Bikini", labelEn: "Bikini", price: 75 },
      { labelEs: "Brazilian", labelEn: "Brazilian", price: 95 },
      { labelEs: "Media pierna", labelEn: "Half legs", price: 120 },
      { labelEs: "Piernas completas", labelEn: "Full legs", price: 150 },
      { labelEs: "Espalda", labelEn: "Back", price: 150 },
    ],
    details: { availability: ["A domicilio", "En cabina"] },
    caseStudy: {
      sessions: 6,
      months: 8,
      improvement: "—",
      beforeImage: "/results/laser-diodo-before.jpg",
      afterImage: "/results/laser-diodo-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },

  // =========================================================
  // ✨ FACIALES (2 opciones)
  // =========================================================
  {
    id: 7,
    nameEs: "Faciales",
    nameEn: "Facials",
    descEs:
      "Protocolos de limpieza y cuidado facial para mejorar apariencia, luminosidad y salud estética de la piel.",
    descEn:
      "Cleansing and skincare protocols to improve appearance, glow, and aesthetic skin health.",
    duration: "—",
    price: 65, // starting
    idealEs:
      "Ideal para mantenimiento regular de la piel y mejora de luminosidad.",
    idealEn:
      "Ideal for regular skin maintenance and improved glow.",
    benefitsEs: ["Piel más limpia", "Mejora luminosidad", "Mantenimiento estético", "Opciones según necesidad"],
    benefitsEn: ["Cleaner skin", "Improved glow", "Aesthetic maintenance", "Options based on needs"],
    image: "/services/faciales.jpg",
    pricingOptions: [
      { labelEs: "Limpieza facial", labelEn: "Facial cleansing", price: 65 },
      { labelEs: "Limpieza profunda con Hidrafacial", labelEn: "Deep cleansing with Hydrafacial", price: 90 },
    ],
    details: { availability: ["A domicilio", "En cabina"] },
    caseStudy: {
      sessions: 1,
      months: 0,
      improvement: "—",
      beforeImage: "/results/facial-before.jpg",
      afterImage: "/results/facial-after.jpg",
    },
    tags: ["A domicilio", "En cabina"],
  },
];

export { services };

export default function ServicesSection({
  lang = "es",
  onAddService,
  onViewDetails,
  sectionRef,
}) {
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

          <p
            className="font-body text-lg md:text-xl leading-relaxed"
            style={{ color: COCOA, opacity: 0.88 }}
          >
            {lang === "es"
              ? "Estética avanzada y faciales — con evaluación previa cuando aplique."
              : "Advanced aesthetics and facials — with prior evaluation when applicable."}
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