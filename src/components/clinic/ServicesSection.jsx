// ServicesSection.jsx
import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";

// ===========================
// SERVICES DATA (UPDATED)
// ===========================
const services = [
  // ✨ SERVICIOS DE ESTÉTICA AVANZADA
  {
    id: 1,
    category: "Estética avanzada",
    nameEs: "CO₂ Láser Fraccionado",
    nameEn: "Fractional CO₂ Laser",
    descEs:
      "Tratamiento de estética avanzada que mejora textura, marcas visibles y signos de envejecimiento con resultados progresivos.",
    descEn:
      "Advanced aesthetic treatment to improve texture, visible marks, and signs of aging with progressive results.",
    duration: "45–60 min",
    price: 230,
    image: "/services/co2-laser-fraccionado.jpg",
    benefitsEs: ["Mejora textura", "Estimula colágeno", "Resultados progresivos", "Rejuvenecimiento global"],
    benefitsEn: ["Improves texture", "Stimulates collagen", "Progressive results", "Overall rejuvenation"],
    idealEs:
      "Personas que desean rejuvenecer la piel, mejorar marcas visibles y textura irregular o envejecida.",
    idealEn:
      "People seeking skin rejuvenation and improvement of visible marks and uneven/aged texture.",
    // everything for the modal:
    modal: {
      badges: ["Servicios Profesionales", "Evaluación Previa"],
      headlineEs: "Precio por sesión: $230",
      headlineEn: "Per session: $230",
      conceptEs:
        "El CO₂ Láser Fraccionado es un tratamiento de estética avanzada que mejora visiblemente la calidad de la piel mediante la creación de microzonas térmicas controladas. Estas microzonas estimulan de forma natural la renovación cutánea, el colágeno y la elastina, logrando una piel más uniforme, firme y rejuvenecida.",
      conceptEn:
        "Fractional CO₂ laser creates controlled micro-thermal zones to stimulate skin renewal, collagen and elastin for a more even, firm, rejuvenated look.",
      extraEs:
        "Es uno de los tratamientos más efectivos dentro de la estética para mejorar textura, marcas visibles y signos de envejecimiento, con resultados progresivos y duraderos.",
      scopeNoteEs: "(Siempre dentro del alcance estético, no médico)",
      improvesTitleEs: "Afecciones estéticas que mejora",
      improves: [
        "Cicatrices de acné (aspecto superficial e irregular)",
        "Marcas y cicatrices post procedimientos estéticos",
        "Arrugas finas y medias",
        "Líneas de expresión",
        "Poros dilatados",
        "Manchas y tono desigual",
        "Rejuvenecimiento facial global",
        "Textura áspera o envejecida",
        "Piel opaca o fotoenvejecida",
      ],
      sessionDurationEs: "Duración de la sesión: 45–60 minutos",
      sessionsEs: "Cantidad de sesiones: 1 a 3 sesiones",
      intervalsEs: "(intervalos de 4 a 6 semanas, según evaluación estética)",
      idealTitleEs: "Cliente ideal",
      idealBullets: [
        "Personas que desean rejuvenecer la piel",
        "Clientes con marcas visibles de acné",
        "Piel con textura irregular o envejecida",
        "Personas que buscan un tratamiento estético de alto impacto",
      ],
      professionalTitleEs: "Profesional y técnica",
      professionalEs:
        "Tratamiento realizado por profesional en estética avanzada capacitado en tecnología CO₂ láser, bajo protocolos estéticos y evaluación personalizada.",
      contraindicationsTitleEs: "Contraindicaciones estéticas",
      contraindications: [
        "Embarazo",
        "Piel con infecciones activas",
        "Exposición solar reciente",
        "Piel extremadamente sensible",
        "Tendencia a cicatrización anormal (evaluación previa)",
      ],
      postCareTitleEs: "Cuidados post",
      postCare: [
        "Evitar sol directo",
        "Uso constante de protector solar",
        "No maquillaje por varios días",
        "Hidratación profunda",
        "No manipular la piel tratada",
      ],
      prolongTitleEs: "Recomendaciones para prolongar resultados",
      prolong: [
        "Fotoprotección diaria",
        "Rutina cosmética adecuada",
        "Tratamientos de mantenimiento",
        "Hábitos saludables de cuidado de la piel",
      ],
      evaluationEs: "Evaluación previa: ✔️ Obligatoria (estética)",
    },
  },

  // 🏡 SERVICIOS EXCLUSIVOS A DOMICILIO (pero también en cabina según tu texto)
  {
    id: 2,
    category: "A domicilio / En cabina",
    nameEs: "Radiofrecuencia Fraccionada con Microagujas",
    nameEn: "Fractional RF Microneedling",
    descEs:
      "Microagujas + radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel estimulando colágeno.",
    descEn:
      "Microneedles + radiofrequency to improve firmness, texture, pores, and skin quality via collagen stimulation.",
    duration: "—",
    price: 149, // starting (face/neck/chest)
    image: "/services/rf-microagujas.jpg",
    benefitsEs: ["Estimula colágeno", "Mejora poros", "Mejora firmeza", "Mejora textura"],
    benefitsEn: ["Stimulates collagen", "Refines pores", "Improves firmness", "Improves texture"],
    idealEs: "Ideal para mejorar firmeza y textura con estimulación de colágeno.",
    idealEn: "Ideal for firmness and texture improvement through collagen stimulation.",
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptTitleEs: "Concepto",
      conceptEs:
        "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
      sessionsTitleEs: "Sesiones",
      sessionsEs: "3–4 sesiones (cada 4 semanas)",
      pricesTitleEs: "Zonas y precios",
      pricingOptions: [
        { labelEs: "Rostro, cuello y escote", price: 149 },
        { labelEs: "Corporal (abdomen, brazos o entrepiernas)", price: 199 },
      ],
    },
  },

  {
    id: 3,
    category: "A domicilio / En cabina",
    nameEs: "HIFU",
    nameEn: "HIFU",
    descEs:
      "Ultrasonido focalizado de alta intensidad para reafirmar, tensar y redefinir rostro y zonas corporales.",
    descEn:
      "High-intensity focused ultrasound to firm, tighten, and redefine face and body areas.",
    duration: "—",
    price: 120, // starting
    image: "/services/hifu.jpg",
    benefitsEs: ["No invasivo", "Reafirma", "Tensa", "Redefine"],
    benefitsEn: ["Non-invasive", "Firms", "Tightens", "Redefines"],
    idealEs: "Ideal para reafirmar y tensar sin procedimientos invasivos.",
    idealEn: "Ideal for firmness and tightening without invasive procedures.",
    modal: {
      badges: ["Ultrasonido Focalizado de Alta Intensidad", "🏡 Servicio a domicilio y en cabina"],
      conceptTitleEs: "Concepto",
      conceptEs:
        "Tratamiento estético no invasivo que ayuda a reafirmar, tensar y redefinir el rostro y zonas corporales.",
      sessionsTitleEs: "Sesiones",
      sessionsEs: "1 sesión cada 6–12 meses",
      pricesTitleEs: "Zonas y precios",
      pricingOptions: [
        { labelEs: "Rostro, cuello y escote", price: 120 },
        { labelEs: "Corporal (abdomen, brazos o entrepiernas)", price: 180 },
      ],
    },
  },

  {
    id: 4,
    category: "A domicilio / En cabina",
    nameEs: "Microagujas para Manchas",
    nameEn: "Microneedling for Dark Spots",
    descEs:
      "Inducción de colágeno con activos despigmentantes para mejorar tono y luminosidad.",
    descEn:
      "Collagen induction with brightening actives to improve tone and radiance.",
    duration: "—",
    price: 120,
    image: "/services/microagujas-manchas.jpg",
    benefitsEs: ["Mejora tono", "Mejora luminosidad", "Estimula colágeno"],
    benefitsEn: ["Improves tone", "Improves radiance", "Stimulates collagen"],
    idealEs: "Ideal para mejorar tono y luminosidad con enfoque estético.",
    idealEn: "Ideal for tone and radiance improvement (aesthetic).",
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptTitleEs: "Concepto",
      conceptEs:
        "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono y luminosidad de la piel.",
      pricesTitleEs: "Precio",
      pricingOptions: [{ labelEs: "Rostro", price: 120 }],
    },
  },

  {
    id: 5,
    category: "A domicilio / En cabina",
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    descEs:
      "Tecnología estética localizada para mejorar apariencia de la piel y tratar lesiones superficiales.",
    descEn:
      "Localized aesthetic technology to improve skin appearance and address superficial lesions.",
    duration: "—",
    price: 60, // from
    image: "/services/plasma-fibroblast.jpg",
    benefitsEs: ["Localizado", "Preciso", "Rápida recuperación (según evaluación)"],
    benefitsEn: ["Localized", "Precise", "Quick recovery (based on evaluation)"],
    idealEs: "Ideal para tratamientos localizados según evaluación estética.",
    idealEn: "Ideal for localized treatments based on aesthetic evaluation.",
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptTitleEs: "Concepto",
      conceptEs:
        "Tecnología estética que trabaja de forma localizada para mejorar la apariencia de la piel y tratar lesiones superficiales.",
      pricesTitleEs: "Precio",
      pricingOptions: [{ labelEs: "Remoción de verrugas (desde)", price: 60 }],
    },
  },

  {
    id: 6,
    category: "Depilación láser",
    nameEs: "Depilación Láser Diodo",
    nameEn: "Diode Laser Hair Removal",
    descEs: "Depilación láser por zonas con precios claros por área.",
    descEn: "Zone-based laser hair removal with clear pricing per area.",
    duration: "—",
    price: 35, // lowest option
    image: "/services/laser-diodo.jpg",
    benefitsEs: ["Por zonas", "Precios claros", "Resultados progresivos"],
    benefitsEn: ["By area", "Clear pricing", "Progressive results"],
    idealEs: "Ideal para reducir vello en zonas específicas.",
    idealEn: "Ideal for reducing hair in specific areas.",
    modal: {
      badges: ["💡 Láser Diodo"],
      pricesTitleEs: "Zonas y precios",
      pricingOptions: [
        { labelEs: "Bozo", price: 35 },
        { labelEs: "Axilas", price: 45 },
        { labelEs: "Bikini", price: 75 },
        { labelEs: "Brazilian", price: 95 },
        { labelEs: "Media Pierna", price: 120 },
        { labelEs: "Piernas Completas", price: 150 },
        { labelEs: "Espalda", price: 150 },
      ],
      noteEs: "Los precios pueden variar según evaluación y plan de sesiones.",
    },
  },

  {
    id: 7,
    category: "Faciales",
    nameEs: "Faciales",
    nameEn: "Facials",
    descEs: "Limpieza facial y limpieza profunda con Hidrafacial.",
    descEn: "Facial cleansing and deep cleansing with Hydrafacial.",
    duration: "—",
    price: 65, // starting
    image: "/services/faciales.jpg",
    benefitsEs: ["Piel más limpia", "Mejora apariencia", "Mejora luminosidad"],
    benefitsEn: ["Cleaner skin", "Improves appearance", "Improves radiance"],
    idealEs: "Ideal para mantenimiento regular de la piel.",
    idealEn: "Ideal for regular skin maintenance.",
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      pricesTitleEs: "Opciones y precios",
      pricingOptions: [
        { labelEs: "✨ Limpieza facial", price: 65 },
        { labelEs: "💦 Limpieza profunda con Hidrafacial", price: 90 },
      ],
    },
  },
];

export { services };

// ===========================
// MODAL COMPONENT
// ===========================
function ServiceModal({ open, onClose, service, lang = "es" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !service) return null;

  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";

  const title = lang === "es" ? service.nameEs : service.nameEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  const m = service.modal || {};
  const badges = m.badges || [];
  const pricingOptions = m.pricingOptions || [];

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 w-full h-full"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />

      {/* Panel */}
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div
          className="relative rounded-3xl shadow-2xl overflow-hidden border"
          style={{
            backgroundColor: LINEN,
            borderColor: "rgba(42,30,26,0.12)",
          }}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b" style={{ borderColor: "rgba(42,30,26,0.12)" }}>
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h3
                  className="font-display text-2xl sm:text-3xl font-medium tracking-tight"
                  style={{ color: ESPRESSO }}
                >
                  {title}
                </h3>
                <p className="mt-2 text-base sm:text-lg leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
                  {desc}
                </p>

                {!!badges.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {badges.map((b, idx) => (
                      <span
                        key={`${b}-${idx}`}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: "rgba(201,174,126,0.20)",
                          color: ESPRESSO,
                          border: "1px solid rgba(42,30,26,0.10)",
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="shrink-0 rounded-full px-3 py-2 text-sm border hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  borderColor: "rgba(42,30,26,0.16)",
                  color: ESPRESSO,
                }}
              >
                Close
              </button>
            </div>

            {(m.headlineEs || m.headlineEn) && (
              <div className="mt-5">
                <div
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border"
                  style={{
                    background: "rgba(255,255,255,0.45)",
                    borderColor: "rgba(42,30,26,0.12)",
                    color: ESPRESSO,
                  }}
                >
                  <span className="font-medium">
                    {lang === "es" ? m.headlineEs : m.headlineEn}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Concept */}
            {(m.conceptEs || m.conceptEn) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {m.conceptTitleEs && lang === "es" ? m.conceptTitleEs : "Concept"}
                </h4>
                <p className="mt-2 leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                  {lang === "es" ? m.conceptEs : m.conceptEn}
                </p>
                {m.extraEs && lang === "es" && (
                  <p className="mt-3 leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
                    {m.extraEs}
                  </p>
                )}
                {m.scopeNoteEs && lang === "es" && (
                  <p className="mt-3 text-sm" style={{ color: COCOA, opacity: 0.75 }}>
                    {m.scopeNoteEs}
                  </p>
                )}
              </section>
            )}

            {/* Improves */}
            {!!(m.improves && m.improves.length) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.improvesTitleEs || "Afecciones estéticas que mejora" : "What it helps"}
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {m.improves.map((x) => (
                    <li
                      key={x}
                      className="rounded-2xl px-4 py-3 text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.45)",
                        borderColor: "rgba(42,30,26,0.10)",
                        color: ESPRESSO,
                      }}
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Session info */}
            {(m.sessionDurationEs || m.sessionsEs || m.intervalsEs) && lang === "es" && (
              <section className="space-y-2">
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  Sesiones
                </h4>
                {m.sessionDurationEs && <p style={{ color: COCOA, opacity: 0.92 }}>{m.sessionDurationEs}</p>}
                {m.sessionsEs && <p style={{ color: COCOA, opacity: 0.92 }}>{m.sessionsEs}</p>}
                {m.intervalsEs && <p className="text-sm" style={{ color: COCOA, opacity: 0.78 }}>{m.intervalsEs}</p>}
              </section>
            )}

            {/* Ideal client */}
            {!!(m.idealBullets && m.idealBullets.length) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.idealTitleEs || "Cliente ideal" : "Ideal client"}
                </h4>
                <ul className="mt-3 space-y-2">
                  {m.idealBullets.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full"
                        style={{ backgroundColor: "rgba(42,30,26,0.55)" }}
                      />
                      <span style={{ color: COCOA, opacity: 0.92 }}>{x}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Professional */}
            {m.professionalEs && lang === "es" && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {m.professionalTitleEs || "Profesional y técnica"}
                </h4>
                <p className="mt-2 leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                  {m.professionalEs}
                </p>
              </section>
            )}

            {/* Pricing */}
            {!!pricingOptions.length && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.pricesTitleEs || "Precios" : "Pricing"}
                </h4>

                <div className="mt-3 overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(42,30,26,0.12)" }}>
                  <div className="divide-y" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
                    {pricingOptions.map((opt) => (
                      <div
                        key={`${opt.labelEs}-${opt.price}`}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.45)" }}
                      >
                        <div className="text-sm" style={{ color: ESPRESSO }}>
                          {lang === "es" ? opt.labelEs : opt.labelEn || opt.labelEs}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: ESPRESSO }}>
                          ${opt.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {m.noteEs && lang === "es" && (
                  <p className="mt-3 text-sm" style={{ color: COCOA, opacity: 0.78 }}>
                    {m.noteEs}
                  </p>
                )}
              </section>
            )}

            {/* Contraindications */}
            {!!(m.contraindications && m.contraindications.length) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.contraindicationsTitleEs || "Contraindicaciones" : "Contraindications"}
                </h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {m.contraindications.map((x) => (
                    <li
                      key={x}
                      className="rounded-2xl px-4 py-3 text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.45)",
                        borderColor: "rgba(42,30,26,0.10)",
                        color: ESPRESSO,
                      }}
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Post care */}
            {!!(m.postCare && m.postCare.length) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.postCareTitleEs || "Cuidados post" : "Aftercare"}
                </h4>
                <ul className="mt-3 space-y-2">
                  {m.postCare.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full"
                        style={{ backgroundColor: "rgba(42,30,26,0.55)" }}
                      />
                      <span style={{ color: COCOA, opacity: 0.92 }}>{x}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Prolong results */}
            {!!(m.prolong && m.prolong.length) && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? m.prolongTitleEs || "Recomendaciones" : "Recommendations"}
                </h4>
                <ul className="mt-3 space-y-2">
                  {m.prolong.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span
                        className="mt-2 h-2 w-2 rounded-full"
                        style={{ backgroundColor: "rgba(42,30,26,0.55)" }}
                      />
                      <span style={{ color: COCOA, opacity: 0.92 }}>{x}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Evaluation */}
            {m.evaluationEs && lang === "es" && (
              <section>
                <div
                  className="rounded-2xl px-4 py-3 border"
                  style={{
                    background: "rgba(201,174,126,0.18)",
                    borderColor: "rgba(42,30,26,0.10)",
                    color: ESPRESSO,
                  }}
                >
                  <span className="font-semibold">{m.evaluationEs}</span>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================
// SECTION COMPONENT
// ===========================
export default function ServicesSection({
  lang = "es",
  onAddService,
  onViewDetails,
  sectionRef,
}) {
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";

  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map();
    services.forEach((s) => {
      const key = s.category || "Servicios";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    });
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, []);

  const handleViewDetails = (service) => {
    // keep your external callback if you want analytics etc.
    onViewDetails?.(service);
    setSelectedService(service);
    setModalOpen(true);
  };

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
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
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
              ? "Servicios de estética avanzada, faciales y depilación. Toca cualquier servicio para ver detalles."
              : "Advanced aesthetics, facials, and laser hair removal. Tap any service to view details."}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {grouped.map(({ category, items }) => (
            <div key={category}>
              <div className="mb-7 flex items-end justify-between gap-6">
                <h3
                  className="font-display text-2xl md:text-3xl font-medium tracking-tight"
                  style={{ color: ESPRESSO }}
                >
                  {category}
                </h3>

                <div className="hidden sm:block text-sm" style={{ color: COCOA, opacity: 0.8 }}>
                  {lang === "es" ? `${items.length} servicios` : `${items.length} services`}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    lang={lang}
                    onAddService={onAddService}
                    // IMPORTANT: this is the modal trigger
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
        lang={lang}
      />
    </section>
  );
}