// ServicesSection.jsx
import React, { useMemo, useState, useEffect } from "react";

/**
 * ✅ Correct model (per your clarification):
 * - "Multiple prices" = MULTIPLE SERVICES (multiple cards, multiple modals).
 * - NO multi-price options inside a single modal.
 *
 * ✅ Categories:
 * 1) Estética avanzada (CO₂ only -> 1 service)
 * 2) Servicios exclusivos a domicilio (RF 2 + HIFU 2 + Microagujas 1 + Plasma 1 = 6 services)
 * 3) Depilación Láser Diodo (13 services)
 * 4) Faciales (2 services)
 *
 * ✅ Modal:
 * - One modal per service item (card).
 * - Each modal has single price + details text.
 *
 * This file is self-contained (no ServiceCard dependency).
 */

// ==========================
// THEME
// ==========================
const LINEN = "#F1E8DD";
const ESPRESSO = "#2A1E1A";
const COCOA = "#6B5A52";

// ==========================
// HELPERS
// ==========================
function money(n) {
  if (typeof n !== "number") return "";
  return `$${n}`;
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ==========================
// DATA (PER SERVICE = PER MODAL)
// ==========================
const CATEGORIES = [
  {
    key: "advanced",
    titleEs: "✨ SERVICIOS DE ESTÉTICA AVANZADA",
    items: [
      {
        id: "co2-laser-fraccionado",
        nameEs: "⭐ CO₂ LÁSER FRACCIONADO",
        price: 230,
        duration: "45–60 minutos",
        badges: ["Servicios Profesionales", "Evaluación Previa", "✔️ Evaluación previa obligatoria (estética)"],
        descriptionEs:
          "El CO₂ Láser Fraccionado es un tratamiento de estética avanzada que mejora visiblemente la calidad de la piel mediante la creación de microzonas térmicas controladas. Estas microzonas estimulan de forma natural la renovación cutánea, el colágeno y la elastina, logrando una piel más uniforme, firme y rejuvenecida.",
        extraEs:
          "Es uno de los tratamientos más efectivos dentro de la estética para mejorar textura, marcas visibles y signos de envejecimiento, con resultados progresivos y duraderos.",
        modal: {
          sections: [
            {
              title: "Afecciones estéticas que mejora",
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
            { title: "Alcance", text: "(Siempre dentro del alcance estético, no médico)" },
            { title: "Cantidad de sesiones", text: "1 a 3 sesiones (intervalos de 4 a 6 semanas, según evaluación estética)" },
            {
              title: "Cliente ideal",
              bullets: [
                "Personas que desean rejuvenecer la piel",
                "Clientes con marcas visibles de acné",
                "Piel con textura irregular o envejecida",
                "Personas que buscan un tratamiento estético de alto impacto",
              ],
            },
            {
              title: "Profesional y técnica",
              text:
                "Tratamiento realizado por profesional en estética avanzada capacitado en tecnología CO₂ láser, bajo protocolos estéticos y evaluación personalizada.",
            },
            {
              title: "Contraindicaciones estéticas",
              bullets: [
                "Embarazo",
                "Piel con infecciones activas",
                "Exposición solar reciente",
                "Piel extremadamente sensible",
                "Tendencia a cicatrización anormal (evaluación previa)",
              ],
            },
            {
              title: "Cuidados post",
              bullets: [
                "Evitar sol directo",
                "Uso constante de protector solar",
                "No maquillaje por varios días",
                "Hidratación profunda",
                "No manipular la piel tratada",
              ],
            },
            {
              title: "Recomendaciones para prolongar resultados",
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
    ],
  },

  {
    key: "home",
    titleEs: "🏡 SERVICIOS EXCLUSIVOS A DOMICILIO",
    subtitleEs: "🏡 Servicio a domicilio y en cabina",
    items: [
      // RF => 2 SERVICES (2 modals)
      {
        id: "rf-microagujas-rostro-cuello-escote",
        nameEs: "🔬 RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Rostro, cuello y escote",
        price: 149,
        duration: "—",
        badges: ["🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
        modal: {
          sections: [{ title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)" }],
        },
      },
      {
        id: "rf-microagujas-corporal",
        nameEs: "🔬 RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Corporal (abdomen, brazos o entrepiernas)",
        price: 199,
        duration: "—",
        badges: ["🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tratamiento estético que combina microagujas con radiofrecuencia para mejorar firmeza, textura, poros y calidad de la piel mediante estimulación de colágeno.",
        modal: {
          sections: [{ title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)" }],
        },
      },

      // HIFU => 2 SERVICES
      {
        id: "hifu-rostro-cuello-escote",
        nameEs: "🔊 HIFU — Rostro, cuello y escote",
        price: 120,
        duration: "—",
        badges: ["Ultrasonido Focalizado de Alta Intensidad", "🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tratamiento estético no invasivo que ayuda a reafirmar, tensar y redefinir el rostro y zonas corporales.",
        modal: {
          sections: [{ title: "Sesiones", text: "1 sesión cada 6–12 meses" }],
        },
      },
      {
        id: "hifu-corporal",
        nameEs: "🔊 HIFU — Corporal (abdomen, brazos o entrepiernas)",
        price: 180,
        duration: "—",
        badges: ["Ultrasonido Focalizado de Alta Intensidad", "🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tratamiento estético no invasivo que ayuda a reafirmar, tensar y redefinir el rostro y zonas corporales.",
        modal: {
          sections: [{ title: "Sesiones", text: "1 sesión cada 6–12 meses" }],
        },
      },

      // Microagujas manchas => 1 SERVICE
      {
        id: "microagujas-manchas-rostro",
        nameEs: "✒️ MICROAGUJAS PARA MANCHAS — Rostro",
        price: 120,
        duration: "—",
        badges: ["🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono y luminosidad de la piel.",
        modal: {
          sections: [{ title: "Concepto", text: "Tratamiento estético de inducción de colágeno con activos despigmentantes para mejorar el tono y luminosidad de la piel." }],
        },
      },

      // Plasma => 1 SERVICE
      {
        id: "plasma-fibroblast-verrugas-desde",
        nameEs: "⚡ PLASMA FIBROBLAST — Remoción de verrugas (desde)",
        price: 60,
        duration: "—",
        badges: ["🏡 Servicio a domicilio y en cabina"],
        descriptionEs:
          "Tecnología estética que trabaja de forma localizada para mejorar la apariencia de la piel y tratar lesiones superficiales.",
        modal: {
          sections: [{ title: "Concepto", text: "Tecnología estética que trabaja de forma localizada para mejorar la apariencia de la piel y tratar lesiones superficiales." }],
        },
      },
    ],
  },

  {
    key: "laser",
    titleEs: "💡 DEPILACIÓN LÁSER DIODO",
    items: [
      // You said 13 services. Your text shows 7 unique, duplicated.
      // I’m giving you 13 service cards (each = its own modal).
      { id: "laser-bozo", nameEs: "Bozo", price: 35, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-axilas", nameEs: "Axilas", price: 45, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-bikini", nameEs: "Bikini", price: 75, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-brazilian", nameEs: "Brazilian", price: 95, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-media-pierna", nameEs: "Media Pierna", price: 120, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-piernas-completas", nameEs: "Piernas Completas", price: 150, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },
      { id: "laser-espalda", nameEs: "Espalda", price: 150, duration: "—", descriptionEs: "Depilación Láser Diodo por zona." },

      // 6 placeholders to reach 13 — replace with your real remaining areas/prices
      { id: "laser-area-8", nameEs: "Área 8 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
      { id: "laser-area-9", nameEs: "Área 9 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
      { id: "laser-area-10", nameEs: "Área 10 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
      { id: "laser-area-11", nameEs: "Área 11 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
      { id: "laser-area-12", nameEs: "Área 12 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
      { id: "laser-area-13", nameEs: "Área 13 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio." },
    ],
  },

  {
    key: "faciales",
    titleEs: "FACIALES",
    subtitleEs: "🏡 Servicio a domicilio y en cabina",
    items: [
      { id: "facial-limpieza", nameEs: "✨ Limpieza facial", price: 65, duration: "—", descriptionEs: "Servicio facial estético." },
      { id: "facial-hidrafacial", nameEs: "💦 Limpieza profunda con Hidrafacial", price: 90, duration: "—", descriptionEs: "Servicio facial estético." },
    ],
  },
];

// ==========================
// MODAL
// ==========================
function ServiceModal({ open, service, onClose }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        className="absolute inset-0 w-full h-full"
        aria-label="Close"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.60)" }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div
          className="rounded-3xl border shadow-2xl overflow-hidden"
          style={{ backgroundColor: LINEN, borderColor: "rgba(42,30,26,0.14)" }}
        >
          <div className="p-6 sm:p-8 border-b" style={{ borderColor: "rgba(42,30,26,0.12)" }}>
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
                  {service.nameEs}
                </h3>

                {service.descriptionEs && (
                  <p className="mt-2 text-base sm:text-lg leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                    {service.descriptionEs}
                  </p>
                )}

                {!!service.badges?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.badges.map((b, idx) => (
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

                <div className="mt-5 flex flex-wrap gap-2">
                  {typeof service.price === "number" && (
                    <span
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.50)",
                        borderColor: "rgba(42,30,26,0.12)",
                        color: ESPRESSO,
                      }}
                    >
                      <span className="font-semibold">Precio por sesión:</span>
                      <span className="font-semibold">{money(service.price)}</span>
                    </span>
                  )}

                  {service.duration && service.duration !== "—" && (
                    <span
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.50)",
                        borderColor: "rgba(42,30,26,0.12)",
                        color: ESPRESSO,
                      }}
                    >
                      <span className="font-semibold">Duración:</span>
                      <span className="font-semibold">{service.duration}</span>
                    </span>
                  )}
                </div>
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

          <div className="p-6 sm:p-8 space-y-6">
            {!!service.extraEs && (
              <p className="leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
                {service.extraEs}
              </p>
            )}

            {!!service.modal?.paragraphs?.length && (
              <div className="space-y-4">
                {service.modal.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                    {p}
                  </p>
                ))}
              </div>
            )}

            {!!service.modal?.sections?.length &&
              service.modal.sections.map((sec, idx) => (
                <section key={`${sec.title}-${idx}`}>
                  <h4 className="text-base font-semibold" style={{ color: ESPRESSO }}>
                    {sec.title}
                  </h4>
                  {!!sec.text && (
                    <p className="mt-2 leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                      {sec.text}
                    </p>
                  )}
                  {!!sec.bullets?.length && (
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

// ==========================
// CARD
// ==========================
function ServiceCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item)}
      className="text-left rounded-3xl border p-5 sm:p-6 hover:opacity-[0.98] active:opacity-100 transition"
      style={{
        background: "rgba(255,255,255,0.45)",
        borderColor: "rgba(42,30,26,0.12)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="font-display text-lg sm:text-xl font-medium leading-snug" style={{ color: ESPRESSO }}>
            {item.nameEs}
          </h4>
          {item.descriptionEs && (
            <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
              {item.descriptionEs}
            </p>
          )}
        </div>

        {typeof item.price === "number" && (
          <div
            className="shrink-0 rounded-2xl px-3 py-2 text-sm border"
            style={{
              background: "rgba(201,174,126,0.18)",
              borderColor: "rgba(42,30,26,0.10)",
              color: ESPRESSO,
            }}
          >
            {item.price === 0 ? "Editar" : money(item.price)}
          </div>
        )}
      </div>

      {!!item.badges?.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.badges.slice(0, 2).map((b, idx) => (
            <span
              key={`${b}-${idx}`}
              className="px-3 py-1 rounded-full text-xs border"
              style={{
                background: "rgba(255,255,255,0.55)",
                borderColor: "rgba(42,30,26,0.10)",
                color: ESPRESSO,
              }}
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 text-sm font-semibold" style={{ color: ESPRESSO }}>
        Ver detalles →
      </div>
    </button>
  );
}

// ==========================
// MAIN
// ==========================
export default function ServicesSection({ sectionRef }) {
  const flat = useMemo(() => {
    return CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, _categoryKey: c.key })));
  }, []);

  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => flat.find((x) => x.id === selectedId) || null, [flat, selectedId]);

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
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6" style={{ color: ESPRESSO }}>
            Nuestros Servicios
          </h2>
          <p className="font-body text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            Servicios organizados por categoría. Toca cualquier servicio para ver su modal.
          </p>
        </div>

        <div className="space-y-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.key}>
              <div className="mb-6">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
                  {cat.titleEs}
                </h3>
                {(cat.subtitleEs || cat.items?.length >= 0) && (
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {cat.subtitleEs && (
                      <span className="text-sm" style={{ color: COCOA, opacity: 0.9 }}>
                        {cat.subtitleEs}
                      </span>
                    )}
                    <span className="text-sm" style={{ color: COCOA, opacity: 0.75 }}>
                      • {cat.items.length} servicios
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((item) => (
                  <ServiceCard key={item.id} item={item} onOpen={(svc) => setSelectedId(svc.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal open={!!selected} service={selected} onClose={() => setSelectedId(null)} />
    </section>
  );
}