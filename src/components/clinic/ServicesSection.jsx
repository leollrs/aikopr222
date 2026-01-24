// ServicesSection.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useCart } from "./CartProvider";

/**
 * FIXES IN THIS VERSION:
 * ✅ Mobile layout: price badge no longer overlaps titles (wraps + stacks on small screens)
 * ✅ Aesthetic: cleaner premium cards, consistent spacing, stronger hierarchy, better tap targets
 * ✅ Card actions: "Ver detalles" + "Añadir" behave correctly on mobile
 * ✅ Modal: full-height scroll on mobile, sticky footer CTA, safer spacing
 * ✅ Cart integration preserved (adapter tries common APIs)
 */

// ==========================
// THEME
// ==========================
const LINEN = "#F1E8DD";
const ESPRESSO = "#2A1E1A";
const COCOA = "#6B5A52";
const GOLD = "#C9AE7E";

const BORDER = "rgba(42,30,26,0.14)";
const BORDER_SOFT = "rgba(42,30,26,0.10)";
const SHADOW = "0 18px 60px rgba(42,30,26,0.18)";
const SHADOW_SOFT = "0 12px 40px rgba(42,30,26,0.12)";

// ==========================
// HELPERS
// ==========================
function money(n) {
  if (typeof n !== "number") return "";
  if (n <= 0) return "";
  return `$${n}`;
}

function addServiceToCart(cart, svc) {
  if (!cart) {
    console.warn("[ServicesSection] Cart not available. Check CartProvider wiring.");
    return false;
  }

  const lineItem = {
    id: svc.id,
    type: "service",
    name: svc.nameEs,
    price: typeof svc.price === "number" ? svc.price : 0,
    qty: 1,
    meta: {
      categoryKey: svc._categoryKey,
      duration: svc.duration || "",
    },
  };

  const candidates = [
    cart.addItem,
    cart.addToCart,
    cart.addLineItem,
    cart.add,
    cart.addProduct,
    cart.addOrder,
  ].filter(Boolean);

  for (const fn of candidates) {
    try {
      fn(lineItem);
      return true;
    } catch (e) {
      // keep trying
    }
  }

  console.warn(
    "[ServicesSection] Could not add to cart. CartProvider API not recognized. Available keys:",
    Object.keys(cart || {})
  );
  return false;
}

// ==========================
// DATA
// ==========================
const LASER_MODAL = {
  sections: [
    {
      title: "Por qué la gente lo hace",
      bullets: [
        "Menos vello con el tiempo (según evaluación estética)",
        "Menos irritación por rasurar/depilar constantemente",
        "Piel más suave y cómoda",
      ],
    },
    {
      title: "Sesiones",
      text: "Varía por zona, tipo de vello y objetivo. Te orientamos en tu evaluación.",
    },
  ],
};

const CATEGORIES = [
  {
    key: "advanced",
    titleEs: "SERVICIOS DE ESTÉTICA AVANZADA",
    items: [
      {
        id: "co2-laser-fraccionado",
        nameEs: "CO₂ LÁSER FRACCIONADO",
        price: 230,
        duration: "45–60 minutos",
        badges: ["Servicios Profesionales", "Evaluación previa obligatoria (estética)"],
        descriptionEs:
          "Piel más lisa, poros más finos y un look más rejuvenecido desde las primeras semanas. Ideal si sientes la textura irregular, marcas visibles o tu piel se ve cansada.",
        extraEs:
          "Trabajamos con microzonas controladas para estimular renovación y colágeno de forma progresiva. Resultados que se ven mejor con el tiempo — y se sienten como un upgrade real en tu piel.",
        modal: {
          sections: [
            {
              title: "Lo que vas a notar",
              bullets: [
                "Textura más suave y uniforme",
                "Poros visualmente más finos",
                "Piel con más firmeza y glow",
                "Líneas finas menos marcadas",
                "Marcas visibles de acné más difuminadas (según evaluación estética)",
                "Tono más parejo y piel menos apagada",
              ],
            },
            {
              title: "Ideal para ti si…",
              bullets: [
                "Sientes tu piel con textura irregular o poros marcados",
                "Tienes marcas visibles (acné / procedimientos estéticos previos)",
                "Quieres un rejuvenecimiento de alto impacto (sin cirugía)",
                "Tu piel se ve cansada, opaca o fotoenvejecida",
              ],
            },
            {
              title: "Sesiones recomendadas",
              text: "1 a 3 sesiones. Intervalos de 4 a 6 semanas (según evaluación estética).",
            },
            {
              title: "Resultados",
              bullets: [
                "Muchos clientes notan cambios desde las primeras semanas",
                "El resultado se vuelve más evidente de forma progresiva",
                "La consistencia + cuidados post = resultados más duraderos",
              ],
            },
            {
              title: "Tiempo & cuidados post",
              bullets: [
                "Evita sol directo y usa protector solar todos los días",
                "Hidratación profunda",
                "No maquillaje por varios días (según tu caso)",
                "No manipular costritas o piel en recuperación",
              ],
            },
            {
              title: "Importante",
              text: "Servicio dentro del alcance estético. Evaluación previa obligatoria para asegurar que este tratamiento sea el indicado para tu piel.",
            },
          ],
        },
      },
    ],
  },

  {
    key: "home",
    titleEs: "SERVICIOS EXCLUSIVOS A DOMICILIO",
    subtitleEs: "Servicio a domicilio y en cabina",
    items: [
      {
        id: "rf-microagujas-rostro-cuello-escote",
        nameEs: "RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Rostro, cuello y escote",
        price: 149,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Un tightening real: ayuda a mejorar firmeza, textura y poros. Si quieres piel más smooth sin procedimientos invasivos, este es de los favoritos.",
        modal: {
          sections: [
            {
              title: "Lo que este tratamiento mejora",
              bullets: [
                "Firmeza y elasticidad (look más tenso)",
                "Textura irregular",
                "Poros visibles",
                "Apariencia general de la piel (más uniforme)",
              ],
            },
            { title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)." },
            {
              title: "Por qué les encanta",
              bullets: [
                "Se siente como un reset de la piel",
                "Resultados progresivos (mejoran con el tiempo)",
                "Perfecto para mantenimiento y skin upgrade",
              ],
            },
          ],
        },
      },
      {
        id: "rf-microagujas-corporal",
        nameEs: "RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Corporal (abdomen, brazos o entrepiernas)",
        price: 199,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Un tightening real: ayuda a mejorar firmeza y textura. Ideal si buscas una piel más firme y uniforme en zonas específicas.",
        modal: {
          sections: [
            {
              title: "Lo que este tratamiento mejora",
              bullets: [
                "Firmeza y elasticidad (look más tenso)",
                "Textura irregular",
                "Apariencia más uniforme en la zona",
                "Mejor aspecto general de la piel",
              ],
            },
            { title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)." },
            {
              title: "Por qué les encanta",
              bullets: ["Resultados progresivos", "Excelente para mantenimiento", "Upgrade corporal real"],
            },
          ],
        },
      },

      {
        id: "hifu-rostro-cuello-escote",
        nameEs: "HIFU — Rostro, cuello y escote",
        price: 120,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Lift sin cirugía. Ayuda a tensar y redefinir la zona — ideal si quieres verte más firme y definida con un tratamiento no invasivo.",
        modal: {
          sections: [
            {
              title: "Lo que vas a buscar con HIFU",
              bullets: ["Más firmeza", "Mejor definición", "Apariencia más lifted"],
            },
            { title: "Sesiones", text: "1 sesión cada 6–12 meses (según evaluación estética)." },
            { title: "Resultados", text: "Progresivos con el paso de las semanas. Ideal como mantenimiento 1–2 veces al año." },
          ],
        },
      },
      {
        id: "hifu-corporal",
        nameEs: "HIFU — Corporal (abdomen, brazos o entrepiernas)",
        price: 180,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Lift sin cirugía. Ayuda a tensar y redefinir la zona — ideal si quieres verte más firme y definida con un tratamiento no invasivo.",
        modal: {
          sections: [
            {
              title: "Lo que vas a buscar con HIFU",
              bullets: ["Más firmeza", "Mejor definición en la zona", "Apariencia más lifted"],
            },
            { title: "Sesiones", text: "1 sesión cada 6–12 meses (según evaluación estética)." },
            { title: "Resultados", text: "Progresivos con el paso de las semanas. Ideal como mantenimiento 1–2 veces al año." },
          ],
        },
      },

      {
        id: "microagujas-manchas-rostro",
        nameEs: "MICROAGUJAS PARA MANCHAS — Rostro",
        price: 120,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Para un tono más parejo y piel más luminosa. Excelente si sientes manchas visibles, piel opaca o quieres un glow más uniforme.",
        modal: {
          sections: [
            {
              title: "Beneficios principales",
              bullets: ["Ayuda a uniformar el tono", "Mejora luminosidad", "Textura más suave", "Se integra perfecto con tu rutina"],
            },
            {
              title: "Ideal para ti si…",
              bullets: [
                "Quieres mejorar manchas visibles (según evaluación estética)",
                "Quieres verte más glowy y pareja",
                "Buscas un upgrade constante sin algo agresivo",
              ],
            },
          ],
        },
      },

      {
        id: "plasma-fibroblast-verrugas-desde",
        nameEs: "PLASMA FIBROBLAST — Remoción de verrugas (desde)",
        price: 60,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Remoción estética localizada (desde $60). Perfecto para tratar áreas pequeñas que te molestan visualmente y quieres mejorar de forma precisa.",
        modal: {
          sections: [
            {
              title: "Qué puedes esperar",
              bullets: ["Trabajo localizado por zona", "Evaluación previa para determinar costo final", "Ideal para áreas pequeñas y específicas"],
            },
            { title: "Precio", text: "Desde $60. El costo final depende del tamaño y la cantidad de áreas (se confirma en evaluación)." },
          ],
        },
      },
    ],
  },

  {
    key: "laser",
    titleEs: "DEPILACIÓN LÁSER DIODO",
    items: [
      { id: "laser-bozo", nameEs: "Bozo", price: 35, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-axilas", nameEs: "Axilas", price: 45, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-bikini", nameEs: "Bikini", price: 75, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-brazilian", nameEs: "Brazilian", price: 95, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-media-pierna", nameEs: "Media Pierna", price: 120, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-piernas-completas", nameEs: "Piernas Completas", price: 150, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },
      { id: "laser-espalda", nameEs: "Espalda", price: 150, duration: "—", descriptionEs: "Piel más suave y sin irritación por afeitado constante. Sesiones recomendadas según evaluación.", modal: LASER_MODAL },

      { id: "laser-area-8", nameEs: "Área 8 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
      { id: "laser-area-9", nameEs: "Área 9 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
      { id: "laser-area-10", nameEs: "Área 10 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
      { id: "laser-area-11", nameEs: "Área 11 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
      { id: "laser-area-12", nameEs: "Área 12 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
      { id: "laser-area-13", nameEs: "Área 13 (editar)", price: 0, duration: "—", descriptionEs: "Reemplaza con el área real y su precio.", modal: LASER_MODAL },
    ],
  },

  {
    key: "faciales",
    titleEs: "FACIALES",
    subtitleEs: "Servicio a domicilio y en cabina",
    items: [
      {
        id: "facial-limpieza",
        nameEs: "Limpieza facial",
        price: 65,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "El reset clásico: limpieza + extracción suave (según piel) + hidratación para que salgas con la piel fresh y cómoda.",
        modal: {
          sections: [
            { title: "Ideal si…", bullets: ["Te sientes cargada/o", "Quieres mantenimiento mensual", "Buscas piel más limpia y uniforme"] },
            { title: "Frecuencia", text: "Cada 4–6 semanas (ideal para mantenimiento)." },
          ],
        },
      },
      {
        id: "facial-hidrafacial",
        nameEs: "Limpieza profunda con Hidrafacial",
        price: 90,
        duration: "—",
        badges: ["Servicio a domicilio y en cabina"],
        descriptionEs:
          "Glow inmediato. Limpieza profunda con hidratación para un look más luminoso y uniforme desde el mismo día.",
        modal: {
          sections: [
            { title: "Lo que vas a notar", bullets: ["Glow", "Piel más hidratada", "Textura más smooth", "Poros menos visibles"] },
            { title: "Perfecto antes de", text: "Eventos, fotos, vacaciones o cuando quieras verte on point." },
          ],
        },
      },
    ],
  },
];

// ==========================
// MODAL
// ==========================
function ServiceModal({ open, service, onClose, onAdd }) {
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

  const canAdd = typeof service.price === "number" && service.price > 0;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        className="absolute inset-0 w-full h-full"
        aria-label="Cerrar modal"
        onClick={onClose}
        style={{ background: "rgba(0,0,0,0.64)" }}
      />

      {/* Mobile-safe container */}
      <div className="relative mx-auto w-full max-w-3xl px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6 sm:pb-10">
        <div
          className="rounded-3xl border overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.44))",
            borderColor: BORDER,
            boxShadow: SHADOW,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          {/* Header */}
          <div
            className="p-5 sm:p-7 border-b"
            style={{
              borderColor: "rgba(42,30,26,0.10)",
              background:
                "radial-gradient(900px 260px at 18% 0%, rgba(201,174,126,0.18), transparent 55%)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className="font-display text-xl sm:text-3xl font-medium tracking-tight"
                  style={{ color: ESPRESSO, letterSpacing: "-0.02em" }}
                >
                  {service.nameEs}
                </h3>

                {service.descriptionEs && (
                  <p className="mt-2 text-sm sm:text-lg leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                    {service.descriptionEs}
                  </p>
                )}

                {!!service.badges?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.badges.map((b, idx) => (
                      <span
                        key={`${b}-${idx}`}
                        className="px-3 py-1 rounded-full text-xs sm:text-sm border"
                        style={{
                          background: "rgba(201,174,126,0.16)",
                          borderColor: "rgba(201,174,126,0.32)",
                          color: ESPRESSO,
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {canAdd && (
                    <span
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs sm:text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.62)",
                        borderColor: BORDER_SOFT,
                        color: ESPRESSO,
                      }}
                    >
                      <span className="font-semibold">Precio:</span>
                      <span className="font-semibold">{money(service.price)}</span>
                    </span>
                  )}

                  {service.duration && service.duration !== "—" && (
                    <span
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-xs sm:text-sm border"
                      style={{
                        background: "rgba(255,255,255,0.62)",
                        borderColor: BORDER_SOFT,
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
                className="shrink-0 rounded-full px-3 py-2 text-xs sm:text-sm border hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.68)",
                  borderColor: BORDER,
                  color: ESPRESSO,
                }}
              >
                Cerrar
              </button>
            </div>
          </div>

          {/* Body (scrollable on mobile) */}
          <div className="max-h-[62vh] sm:max-h-none overflow-y-auto">
            <div className="p-5 sm:p-7 space-y-7">
              {!!service.extraEs && (
                <p className="leading-relaxed text-sm sm:text-base" style={{ color: COCOA, opacity: 0.92 }}>
                  {service.extraEs}
                </p>
              )}

              {!!service.modal?.sections?.length &&
                service.modal.sections.map((sec, idx) => (
                  <section key={`${sec.title}-${idx}`} className="pt-1">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-px w-10"
                        style={{
                          background: `linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.78))`,
                        }}
                      />
                      <h4 className="text-sm sm:text-base font-semibold" style={{ color: ESPRESSO }}>
                        {sec.title}
                      </h4>
                    </div>

                    {!!sec.text && (
                      <p className="mt-2 leading-relaxed text-sm sm:text-base" style={{ color: COCOA, opacity: 0.92 }}>
                        {sec.text}
                      </p>
                    )}

                    {!!sec.bullets?.length && (
                      <ul className="mt-3 space-y-2.5">
                        {sec.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(42,30,26,0.55)" }} />
                            <span className="text-sm sm:text-base" style={{ color: COCOA, opacity: 0.92 }}>
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
            </div>
          </div>

          {/* Sticky footer CTA (best UX on mobile) */}
          <div
            className="border-t p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{
              borderColor: "rgba(42,30,26,0.10)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.46))",
            }}
          >
            <div>
              <div className="font-semibold text-sm sm:text-base" style={{ color: ESPRESSO }}>
                ¿Lista/o para reservar?
              </div>
              <div className="text-xs sm:text-sm" style={{ color: COCOA, opacity: 0.9 }}>
                Añade el servicio al carrito o llámanos para coordinar.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => onAdd?.(service)}
                disabled={!canAdd}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border hover:opacity-90 disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.70)",
                  borderColor: BORDER,
                  color: ESPRESSO,
                }}
                title={!canAdd ? "Edita el precio para habilitar" : "Añadir al carrito"}
              >
                Añadir al carrito
              </button>

              <a
                href="tel:+17866729528"
                className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold border hover:opacity-90"
                style={{
                  background: "linear-gradient(180deg, rgba(42,30,26,0.92), rgba(42,30,26,0.80))",
                  borderColor: "rgba(42,30,26,0.18)",
                  color: LINEN,
                  boxShadow: "0 10px 28px rgba(42,30,26,0.20)",
                }}
              >
                Llamar
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -top-6 -right-6 h-40 w-40 rounded-full blur-3xl" style={{ background: "rgba(201,174,126,0.22)" }} />
      </div>
    </div>
  );
}

// ==========================
// CARD
// ==========================
function ServiceCard({ item, onOpen, onAdd }) {
  const showPrice = typeof item.price === "number" && item.price > 0;

  return (
    <div
      className="group relative rounded-3xl border overflow-hidden"
      style={{
        borderColor: BORDER_SOFT,
        background: "linear-gradient(180deg, rgba(255,255,255,0.70), rgba(255,255,255,0.42))",
        boxShadow: SHADOW_SOFT,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* top sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background: "radial-gradient(900px 260px at 18% 0%, rgba(201,174,126,0.18), transparent 60%)",
        }}
      />

      {/* CONTENT CLICK AREA */}
      <button
        onClick={() => onOpen(item)}
        className="relative w-full text-left p-5 sm:p-6"
      >
        {/* ✅ Mobile fix: stack price under title on small screens */}
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h4
              className="font-display text-lg sm:text-xl font-medium leading-snug"
              style={{ color: ESPRESSO, letterSpacing: "-0.01em" }}
            >
              {item.nameEs}
            </h4>

            {item.descriptionEs && (
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
                {item.descriptionEs}
              </p>
            )}
          </div>

          {/* Price badge: fixed width + no overlap */}
          <div className="sm:shrink-0 sm:self-start">
            <div
              className="inline-flex max-w-full items-center rounded-2xl px-3.5 py-2 text-sm border"
              style={{
                background: showPrice
                  ? "linear-gradient(180deg, rgba(201,174,126,0.26), rgba(201,174,126,0.12))"
                  : "rgba(255,255,255,0.55)",
                borderColor: showPrice ? "rgba(201,174,126,0.35)" : BORDER_SOFT,
                color: ESPRESSO,
              }}
            >
              <span className="font-semibold whitespace-nowrap">
                {showPrice ? money(item.price) : "Ver"}
              </span>
            </div>
          </div>
        </div>

        {!!item.badges?.length && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {item.badges.slice(0, 2).map((b, idx) => (
              <span
                key={`${b}-${idx}`}
                className="px-3 py-1 rounded-full text-xs border"
                style={{
                  background: "rgba(255,255,255,0.66)",
                  borderColor: BORDER_SOFT,
                  color: ESPRESSO,
                }}
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </button>

      {/* ACTIONS ROW */}
      <div
        className="relative px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 flex items-center justify-between gap-3"
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen(item);
          }}
          className="text-sm font-semibold hover:opacity-90"
          style={{ color: ESPRESSO, opacity: 0.92 }}
        >
          Ver detalles <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd?.(item);
          }}
          disabled={!showPrice}
          className="rounded-2xl px-3.5 py-2 text-xs sm:text-sm font-semibold border hover:opacity-90 disabled:opacity-40"
          style={{
            background: "rgba(255,255,255,0.70)",
            borderColor: BORDER_SOFT,
            color: ESPRESSO,
          }}
          title={!showPrice ? "Edita el precio para habilitar" : "Añadir al carrito"}
        >
          Añadir
        </button>
      </div>

      {/* bottom accent line */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.55), rgba(201,174,126,0.0))`,
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// ==========================
// EXPORT FOR OTHER COMPONENTS
// ==========================
export function getAllServices() {
  return CATEGORIES.flatMap((c) => c.items);
}

// ==========================
// MAIN
// ==========================
export default function ServicesSection({ sectionRef }) {
  const cart = useCart();

  const flat = useMemo(() => {
    return CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, _categoryKey: c.key })));
  }, []);

  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => flat.find((x) => x.id === selectedId) || null, [flat, selectedId]);

  const handleAdd = (svc) => addServiceToCart(cart, svc);

  return (
    <section
      id="ServicesSection"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: LINEN }}
    >
      {/* background depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1000px 600px at 50% 0%, rgba(201,174,126,0.10), transparent 70%),
            radial-gradient(900px 520px at 20% 30%, rgba(201,174,126,0.06), transparent 70%),
            radial-gradient(900px 520px at 80% 35%, rgba(201,174,126,0.05), transparent 70%),
            linear-gradient(to bottom, rgba(251,248,243,0.55), rgba(241,232,221,0.92))
          `,
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(42,30,26,0.10)" }} />

      {/* subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto mb-12 sm:mb-16 max-w-2xl text-center">
          <div
            className="mx-auto mb-5 inline-flex items-center rounded-full border px-4 py-2 text-xs sm:text-sm"
            style={{
              background: "rgba(255,255,255,0.55)",
              borderColor: "rgba(201,174,126,0.35)",
              color: ESPRESSO,
            }}
          >
            Tratamientos estéticos • A domicilio y en cabina
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-5 sm:mb-6" style={{ color: ESPRESSO, letterSpacing: "-0.03em" }}>
            Nuestros Servicios
          </h2>

          <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            Elige una categoría, revisa los detalles y añade tu servicio al carrito.
          </p>

          <div
            className="mx-auto mt-7 sm:mt-8 h-px w-44 sm:w-48"
            style={{
              background: `linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.75), rgba(201,174,126,0.0))`,
            }}
          />
        </div>

        <div className="space-y-14 sm:space-y-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.key}>
              <div className="mb-5 sm:mb-6">
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight" style={{ color: ESPRESSO, letterSpacing: "-0.02em" }}>
                  {cat.titleEs}
                </h3>

                {(cat.subtitleEs || (cat.items?.length ?? 0) > 0) && (
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

                <div
                  className="mt-4 h-px w-36 sm:w-40"
                  style={{
                    background: `linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.65), rgba(201,174,126,0.0))`,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    onOpen={(svc) => setSelectedId(svc.id)}
                    onAdd={handleAdd}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal
        open={!!selected}
        service={selected}
        onClose={() => setSelectedId(null)}
        onAdd={handleAdd}
      />
    </section>
  );
}