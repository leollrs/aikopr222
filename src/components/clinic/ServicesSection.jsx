// ServicesSection.jsx
import React, { useMemo, useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";

/**
 * ✅ What this version does (based ONLY on the info you gave):
 * 1) Divides the page by categories/sections:
 *    - "Servicios de Estética Avanzada"  -> shows 1 card (CO₂)
 *    - "Servicios Exclusivos a Domicilio" -> shows 4 cards (RF, HIFU, Microagujas Manchas, Plasma)
 *    - "Depilación Láser Diodo" -> shows ALL area-items as their own services (you said 13; see note below)
 *    - "Faciales" -> shows 2 services (Limpieza facial, Hidrafacial)
 *
 * 2) Adds a modal per item (service). Clicking "details" should call onViewDetails(service)
 *    If your ServiceCard doesn't call onViewDetails, you can still open by wiring it there.
 *
 * 3) If a service has "pricingOptions" (areas), the modal shows the list (areas & price).
 *    If a service has a single price, modal shows a single "Precio" chip.
 *
 * ⚠️ IMPORTANT:
 * - From the text you pasted, Depilación has 7 unique areas, duplicated twice due to formatting.
 *   You also said "depilación has 13 services". You did NOT provide 13 unique items.
 *   So this code will:
 *     - de-duplicate exact duplicates
 *     - create individual services for each unique area found in your text (7)
 *   If you truly have 13, just add them to LASER_ITEMS below.
 */

// ---------------------------
// RAW lists (as given)
// ---------------------------
const LASER_ITEMS = [
  { nameEs: "Bozo", price: 35 },
  { nameEs: "Axilas", price: 45 },
  { nameEs: "Bikini", price: 75 },
  { nameEs: "Brazilian", price: 95 },
  { nameEs: "Media Pierna", price: 120 },
  { nameEs: "Piernas Completas", price: 150 }, // cleaned "$$150" -> 150
  { nameEs: "Espalda", price: 150 },
  // Add the missing 6 here if you truly have 13 total:
  // { nameEs: "Pecho", price: 0 },
  // ...
];

const FACIALES_ITEMS = [
  { nameEs: "✨ Limpieza facial", price: 65 },
  { nameEs: "💦 Limpieza profunda con Hidrafacial", price: 90 },
];

// ---------------------------
// SERVICES (category cards)
// ---------------------------
const services = [
  {
    id: "co2",
    category: "SERVICIOS DE ESTÉTICA AVANZADA",
    nameEs: "CO₂ Láser Fraccionado",
    nameEn: "Fractional CO₂ Laser",
    descEs:
      "Tratamiento de estética avanzada que mejora visiblemente la calidad de la piel mediante microzonas térmicas controladas que estimulan renovación cutánea, colágeno y elastina.",
    descEn:
      "Advanced aesthetic treatment that uses controlled micro-thermal zones to stimulate skin renewal, collagen, and elastin.",
    duration: "45–60 min",
    price: 230,
    image: "/services/co2-laser-fraccionado.jpg",
    modal: {
      badges: ["Servicios Profesionales", "Evaluación Previa", "✔️ Evaluación previa obligatoria (estética)"],
      titleEs: "CO₂ Láser Fraccionado",
      priceLabelEs: "Precio por sesión",
      conceptEs:
        "El CO₂ Láser Fraccionado es un tratamiento de estética avanzada que mejora visiblemente la calidad de la piel mediante la creación de microzonas térmicas controladas. Estas microzonas estimulan de forma natural la renovación cutánea, el colágeno y la elastina, logrando una piel más uniforme, firme y rejuvenecida.",
      extraEs:
        "Es uno de los tratamientos más efectivos dentro de la estética para mejorar textura, marcas visibles y signos de envejecimiento, con resultados progresivos y duraderos.",
      scopeEs: "(Siempre dentro del alcance estético, no médico)",
      sections: [
        {
          headingEs: "Afecciones estéticas que mejora",
          bullets: [
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
        },
        {
          headingEs: "Duración de la sesión",
          textEs: "45–60 minutos",
        },
        {
          headingEs: "Cantidad de sesiones",
          textEs: "1 a 3 sesiones (intervalos de 4 a 6 semanas, según evaluación estética)",
        },
        {
          headingEs: "Cliente ideal",
          bullets: [
            "Personas que desean rejuvenecer la piel",
            "Clientes con marcas visibles de acné",
            "Piel con textura irregular o envejecida",
            "Personas que buscan un tratamiento estético de alto impacto",
          ],
        },
        {
          headingEs: "Profesional y técnica",
          textEs:
            "Tratamiento realizado por profesional en estética avanzada capacitado en tecnología CO₂ láser, bajo protocolos estéticos y evaluación personalizada.",
        },
        {
          headingEs: "Contraindicaciones estéticas",
          bullets: [
            "Embarazo",
            "Piel con infecciones activas",
            "Exposición solar reciente",
            "Piel extremadamente sensible",
            "Tendencia a cicatrización anormal (evaluación previa)",
          ],
        },
        {
          headingEs: "Cuidados post",
          bullets: [
            "Evitar sol directo",
            "Uso constante de protector solar",
            "No maquillaje por varios días",
            "Hidratación profunda",
            "No manipular la piel tratada",
          ],
        },
        {
          headingEs: "Recomendaciones para prolongar resultados",
          bullets: [
            "Fotoprotección diaria",
            "Rutina cosmética adecuada",
            "Tratamientos de mantenimiento",
            "Hábitos saludables de cuidado de la piel",
          ],
        },
      ],
    },
  },

  // ---------------------------
  // DOMICILIO (as given)
  // ---------------------------
  {
    id: "rf-microagujas",
    category: "SERVICIOS EXCLUSIVOS A DOMICILIO",
    nameEs: "Radiofrecuencia Fraccionada con Microagujas",
    nameEn: "Fractional RF Microneedling",
    descEs:
      "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
    descEn:
      "Aesthetic treatment combining microneedles and radiofrequency to improve firmness, texture, pores and skin quality via collagen stimulation.",
    duration: "—",
    price: 149, // starting
    image: "/services/rf-microagujas.jpg",
    pricingOptions: [
      { labelEs: "Rostro, cuello y escote", price: 149 },
      { labelEs: "Corporal (abdomen, brazos o entrepiernas)", price: 199 },
    ],
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptHeadingEs: "Concepto",
      conceptEs:
        "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
      sessionsHeadingEs: "Sesiones",
      sessionsEs: "3–4 sesiones (cada 4 semanas)",
      pricesHeadingEs: "Zonas y precios",
    },
  },
  {
    id: "hifu",
    category: "SERVICIOS EXCLUSIVOS A DOMICILIO",
    nameEs: "HIFU",
    nameEn: "HIFU",
    descEs:
      "Ultrasonido Focalizado de Alta Intensidad que ayuda a reafirmar, tensar y redefinir el rostro y zonas corporales.",
    descEn:
      "High-Intensity Focused Ultrasound to help firm, tighten and redefine face and body areas.",
    duration: "—",
    price: 120, // starting
    image: "/services/hifu.jpg",
    pricingOptions: [
      { labelEs: "Rostro, cuello y escote", price: 120 },
      { labelEs: "Corporal (abdomen, brazos o entrepiernas)", price: 180 },
    ],
    modal: {
      badges: ["Ultrasonido Focalizado de Alta Intensidad", "🏡 Servicio a domicilio y en cabina"],
      conceptHeadingEs: "Concepto",
      conceptEs:
        "Tratamiento estético no invasivo que ayuda a reafirmar, tensar y redefinir el rostro y zonas corporales.",
      sessionsHeadingEs: "Sesiones",
      sessionsEs: "1 sesión cada 6–12 meses",
      pricesHeadingEs: "Zonas y precios",
    },
  },
  {
    id: "microagujas-manchas",
    category: "SERVICIOS EXCLUSIVOS A DOMICILIO",
    nameEs: "Microagujas para Manchas",
    nameEn: "Microneedling for Dark Spots",
    descEs:
      "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono y luminosidad de la piel.",
    descEn:
      "Aesthetic collagen induction with brightening actives to improve tone and radiance.",
    duration: "—",
    price: 120,
    image: "/services/microagujas-manchas.jpg",
    pricingOptions: [{ labelEs: "Rostro", price: 120 }],
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptHeadingEs: "Concepto",
      conceptEs:
        "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono y luminosidad de la piel.",
      pricesHeadingEs: "Precio",
    },
  },
  {
    id: "plasma-fibroblast",
    category: "SERVICIOS EXCLUSIVOS A DOMICILIO",
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    descEs:
      "Tecnología estética que trabaja de forma localizada para mejorar la apariencia de la piel y tratar lesiones superficiales.",
    descEn:
      "Localized aesthetic technology to improve skin appearance and address superficial lesions.",
    duration: "—",
    price: 60, // from
    image: "/services/plasma-fibroblast.jpg",
    pricingOptions: [{ labelEs: "Remoción de verrugas (desde)", price: 60 }],
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      conceptHeadingEs: "Concepto",
      conceptEs:
        "Tecnología estética que trabaja de forma localizada para mejorar la apariencia de la piel y tratar lesiones superficiales.",
      pricesHeadingEs: "Precio",
    },
  },
];

// ---------------------------
// Expand Depilación into individual services (areas as services)
// ---------------------------
function buildLaserServices() {
  const seen = new Set();
  const out = [];

  LASER_ITEMS.forEach((item, idx) => {
    const key = `${item.nameEs}`.trim().toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    out.push({
      id: `laser-${idx}-${key.replace(/\s+/g, "-")}`,
      category: "DEPILACIÓN LÁSER DIODO",
      nameEs: item.nameEs,
      nameEn: item.nameEs,
      descEs: "Depilación láser diodo por zona.",
      descEn: "Diode laser hair removal by area.",
      duration: "—",
      price: item.price,
      image: "/services/laser-diodo.jpg",
      modal: {
        badges: ["💡 Depilación Láser Diodo"],
        priceLabelEs: "Precio",
        conceptEs:
          "Servicio de depilación láser diodo por zona. El plan de sesiones puede variar según evaluación estética.",
      },
    });
  });

  return out;
}

// ---------------------------
// Expand Faciales into 2 services
// ---------------------------
function buildFacialesServices() {
  return FACIALES_ITEMS.map((item, idx) => ({
    id: `facial-${idx}-${item.nameEs.replace(/\s+/g, "-").toLowerCase()}`,
    category: "FACIALES",
    nameEs: item.nameEs,
    nameEn: item.nameEs,
    descEs: "Servicio facial estético.",
    descEn: "Aesthetic facial service.",
    duration: "—",
    price: item.price,
    image: "/services/faciales.jpg",
    modal: {
      badges: ["🏡 Servicio a domicilio y en cabina"],
      priceLabelEs: "Precio",
      conceptEs: "Servicio facial estético disponible a domicilio y en cabina.",
    },
  }));
}

// ===========================
// MODAL
// ===========================
function ServiceModal({ open, onClose, service, lang = "es" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
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
  const options = service.pricingOptions || [];

  const showSinglePrice = typeof service.price === "number" && options.length === 0;

  return (
    <div className="fixed inset-0 z-[90]">
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 w-full h-full"
        style={{ background: "rgba(0,0,0,0.60)" }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div
          className="relative overflow-hidden rounded-3xl border shadow-2xl"
          style={{
            backgroundColor: LINEN,
            borderColor: "rgba(42,30,26,0.14)",
          }}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b" style={{ borderColor: "rgba(42,30,26,0.12)" }}>
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
                  {title}
                </h3>
                <p className="mt-2 text-base sm:text-lg leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
                  {desc}
                </p>

                {badges.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {badges.map((b, idx) => (
                      <span
                        key={`${b}-${idx}`}
                        className="px-3 py-1 rounded-full text-sm border"
                        style={{
                          background: "rgba(201,174,126,0.18)",
                          borderColor: "rgba(42,30,26,0.10)",
                          color: ESPRESSO,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price Chip */}
                {(showSinglePrice || options.length > 0) && (
                  <div className="mt-5">
                    <div
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.50)",
                        borderColor: "rgba(42,30,26,0.12)",
                        color: ESPRESSO,
                      }}
                    >
                      <span className="font-semibold">
                        {m.priceLabelEs ? `${m.priceLabelEs}:` : "Precio:"}
                      </span>
                      <span className="font-semibold">
                        {options.length > 0 ? `desde $${service.price}` : `$${service.price}`}
                      </span>
                    </div>
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
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Concept */}
            {m.conceptEs && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {m.conceptHeadingEs || "Concepto"}
                </h4>
                <p className="mt-2 leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                  {m.conceptEs}
                </p>
                {m.extraEs && (
                  <p className="mt-3 leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
                    {m.extraEs}
                  </p>
                )}
                {m.scopeEs && (
                  <p className="mt-3 text-sm" style={{ color: COCOA, opacity: 0.75 }}>
                    {m.scopeEs}
                  </p>
                )}
              </section>
            )}

            {/* Options table (areas/prices) */}
            {options.length > 0 && (
              <section>
                <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                  {m.pricesHeadingEs || "Zonas y precios"}
                </h4>

                <div className="mt-3 overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(42,30,26,0.12)" }}>
                  <div className="divide-y" style={{ borderColor: "rgba(42,30,26,0.10)" }}>
                    {options.map((opt) => (
                      <div
                        key={`${opt.labelEs}-${opt.price}`}
                        className="flex items-center justify-between gap-4 px-4 py-3"
                        style={{ background: "rgba(255,255,255,0.48)" }}
                      >
                        <div className="text-sm" style={{ color: ESPRESSO }}>
                          {opt.labelEs}
                        </div>
                        <div className="text-sm font-semibold" style={{ color: ESPRESSO }}>
                          ${opt.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Long-form sections */}
            {Array.isArray(m.sections) &&
              m.sections.map((sec, idx) => (
                <section key={`${sec.headingEs}-${idx}`}>
                  {sec.headingEs && (
                    <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                      {sec.headingEs}
                    </h4>
                  )}
                  {sec.textEs && (
                    <p className="mt-2 leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                      {sec.textEs}
                    </p>
                  )}
                  {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(42,30,26,0.55)" }} />
                          <span style={{ color: COCOA, opacity: 0.92 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================
// MAIN SECTION
// ===========================
export default function ServicesSection({ lang = "es", onAddService, onViewDetails, sectionRef }) {
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const allServices = useMemo(() => {
    const laser = buildLaserServices();
    const faciales = buildFacialesServices();
    return [...services, ...laser, ...faciales];
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    allServices.forEach((s) => {
      const key = s.category || "Servicios";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(s);
    });
    return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
  }, [allServices]);

  const handleViewDetails = (service) => {
    onViewDetails?.(service);
    setSelected(service);
    setOpen(true);
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
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Nuestros Servicios" : "Our Services"}
          </h2>

          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            {lang === "es"
              ? "Servicios organizados por categoría. Abre cualquier servicio para ver detalles y precios."
              : "Services organized by category. Open any service to see details and pricing."}
          </p>
        </div>

        <div className="space-y-16">
          {grouped.map(({ category, items }) => (
            <div key={category}>
              <div className="mb-7 flex items-end justify-between gap-6">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
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
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal open={open} onClose={() => setOpen(false)} service={selected} lang={lang} />
    </section>
  );
}