// ServicesSection.jsx
import React, { useMemo, useState, useEffect } from "react";

/**
 * FIXES IN THIS VERSION:
 * ✅ Card header: switched to CSS GRID so price badge never overlaps long titles
 * ✅ Title wrapping: break-words + better line height so long service names behave
 * ✅ Removed placeholder laser areas (Área 8–13)
 * ✅ Modal: same as before (mobile scroll + sticky footer)
 */

// ==========================
// THEME
// ==========================
const LINEN = "#F1E8DD";
const ESPRESSO = "#2A1E1A";
const COCOA = "#6B5A52";

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
        badges: ["Servicios profesionales", "Evaluación previa obligatoria (estética)"],
        descriptionEs:
          "Piel más lisa, poros más finos y una apariencia más rejuvenecida. Diseñado para mejorar textura, tono y marcas visibles dentro del alcance estético.",
        extraEs:
          "Trabaja con microzonas térmicas controladas que estimulan renovación cutánea y colágeno de forma progresiva. El resultado se vuelve más evidente con el paso de las semanas.",
        modal: {
          sections: [
            {
              title: "Lo que puedes notar",
              bullets: [
                "Textura más suave y uniforme",
                "Poros visualmente más finos",
                "Piel con mejor firmeza y apariencia general",
                "Tono más parejo y piel menos apagada",
                "Marcas visibles más difuminadas (según evaluación estética)",
              ],
            },
            {
              title: "Ideal para ti si…",
              bullets: [
                "Sientes textura irregular o poros marcados",
                "Tienes marcas visibles (acné / procedimientos estéticos previos)",
                "Quieres un cambio notable sin cirugía",
                "Tu piel se ve cansada, opaca o fotoenvejecida",
              ],
            },
            {
              title: "Sesiones recomendadas",
              text: "1 a 3 sesiones. Intervalos de 4 a 6 semanas (según evaluación estética).",
            },
            {
              title: "Duración",
              text: "45–60 minutos.",
            },
            {
              title: "Cuidados post",
              bullets: [
                "Evitar sol directo y usar protector solar diariamente",
                "Hidratación profunda",
                "Evitar maquillaje por varios días (según tu caso)",
                "No manipular la piel durante la recuperación",
              ],
            },
            {
              title: "Importante",
              text: "Evaluación previa obligatoria (estética). Servicio dentro del alcance estético, no médico.",
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
          "Para mejorar firmeza, textura y poros. Ideal si buscas una piel más uniforme y con mejor calidad sin procedimientos invasivos.",
        extraEs:
          "Combina microagujas + radiofrecuencia para estimular colágeno de forma progresiva. Los cambios suelen mejorar con la constancia.",
        modal: {
          sections: [
            {
              title: "Lo que ayuda a mejorar",
              bullets: [
                "Firmeza y elasticidad",
                "Textura irregular",
                "Poros visibles",
                "Apariencia general más uniforme",
              ],
            },
            { title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)." },
            { title: "Importante", text: "Recomendación final según evaluación estética y condición de la piel." },
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
          "Enfocado en zonas específicas para mejorar firmeza y textura. Ideal si buscas una apariencia más uniforme en la zona tratada.",
        extraEs:
          "Estimula colágeno de manera progresiva y se trabaja por zona. Perfecto como tratamiento puntual o mantenimiento estético.",
        modal: {
          sections: [
            {
              title: "Lo que ayuda a mejorar",
              bullets: [
                "Firmeza y elasticidad",
                "Textura irregular",
                "Apariencia más uniforme en la zona",
                "Mejor aspecto general de la piel",
              ],
            },
            { title: "Sesiones", text: "3–4 sesiones (cada 4 semanas)." },
            { title: "Importante", text: "El plan exacto depende de la zona y la evaluación estética." },
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
          "Tratamiento estético no invasivo para ayudar a tensar y redefinir. Ideal si buscas una apariencia más firme sin cirugía.",
        extraEs:
          "Los resultados se desarrollan de manera progresiva. Muchas personas lo usan como mantenimiento estético 1–2 veces al año.",
        modal: {
          sections: [
            { title: "Lo que vas a buscar con HIFU", bullets: ["Más firmeza", "Mejor definición", "Apariencia más lifted"] },
            { title: "Sesiones", text: "1 sesión cada 6–12 meses (según evaluación estética)." },
            { title: "Resultados", text: "Progresivos con el paso de las semanas. Ideal como mantenimiento." },
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
          "Ayuda a tensar y redefinir zonas corporales. Ideal si quieres verte más firme y definida con un tratamiento no invasivo.",
        extraEs:
          "Se trabaja por zona, y el resultado se aprecia de forma progresiva. Perfecto para mantenimiento estético.",
        modal: {
          sections: [
            { title: "Lo que vas a buscar con HIFU", bullets: ["Más firmeza", "Mejor definición en la zona", "Apariencia más lifted"] },
            { title: "Sesiones", text: "1 sesión cada 6–12 meses (según evaluación estética)." },
            { title: "Resultados", text: "Progresivos con el paso de las semanas. Ideal como mantenimiento." },
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
          "Para mejorar tono y luminosidad. Ideal si tienes manchas visibles, tono desigual o piel opaca y quieres un look más uniforme.",
        extraEs:
          "Inducción de colágeno con activos despigmentantes (dentro del alcance estético). Perfecto para un upgrade constante en tu piel.",
        modal: {
          sections: [
            {
              title: "Beneficios principales",
              bullets: [
                "Ayuda a uniformar el tono",
                "Mejora luminosidad",
                "Textura más suave",
                "Apariencia más fresca y pareja",
              ],
            },
            {
              title: "Ideal para ti si…",
              bullets: [
                "Quieres mejorar manchas visibles (según evaluación estética)",
                "Buscas una piel más glowy y uniforme",
                "Quieres un tratamiento constante sin algo agresivo",
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
          "Trabajo estético localizado para mejorar áreas específicas. Ideal para tratar zonas pequeñas que te molestan visualmente.",
        extraEs: "Se evalúa el tamaño y la cantidad de áreas para definir el alcance y el costo final.",
        modal: {
          sections: [
            {
              title: "Qué puedes esperar",
              bullets: [
                "Trabajo localizado por zona",
                "Evaluación previa para definir costo final",
                "Ideal para áreas pequeñas y específicas",
              ],
            },
            { title: "Precio", text: "Desde $60. El costo final depende del tamaño y la cantidad de áreas." },
          ],
        },
      },
    ],
  },

  {
    key: "laser",
    titleEs: "DEPILACIÓN LÁSER DIODO",
    items: [
      { id: "laser-bozo", nameEs: "Bozo", price: 35, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-axilas", nameEs: "Axilas", price: 45, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-bikini", nameEs: "Bikini", price: 75, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-brazilian", nameEs: "Brazilian", price: 95, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-media-pierna", nameEs: "Media Pierna", price: 120, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-piernas-completas", nameEs: "Piernas Completas", price: 150, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
      { id: "laser-espalda", nameEs: "Espalda", price: 150, duration: "—", descriptionEs: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", extraEs: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", modal: LASER_MODAL },
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
        descriptionEs: "El reset clásico para sentir la piel limpia, fresca y cómoda. Ideal como mantenimiento regular.",
        extraEs: "Enfocado en limpieza profunda, remoción de impurezas e hidratación para mejorar la apariencia general de la piel.",
        modal: {
          sections: [
            { title: "Ideal si…", bullets: ["Te sientes cargada/o o con la piel pesada", "Quieres mantenimiento mensual", "Buscas piel más limpia y uniforme"] },
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
        descriptionEs: "Glow inmediato. Limpieza profunda + hidratación para una piel más luminosa y uniforme desde el mismo día.",
        extraEs: "Perfecto antes de eventos o cuando quieres verte on point con una piel más fresca y revitalizada.",
        modal: {
          sections: [
            { title: "Lo que vas a notar", bullets: ["Glow", "Piel más hidratada", "Textura más smooth", "Poros menos visibles"] },
            { title: "Perfecto antes de", text: "Eventos, fotos, vacaciones o cuando quieras un reset visible." },
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

      <div className="relative mx-auto w-full max-w-3xl px-3 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-y-auto" style={{ maxHeight: "95vh" }}>
        <div
          className="rounded-3xl border"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.44))",
            borderColor: BORDER,
            boxShadow: SHADOW,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
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
                  className="font-display text-xl sm:text-3xl font-medium tracking-tight break-words"
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
function ServiceCard({ item, onOpen, onAdd, onAskInfo }) {
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
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{
          background: "radial-gradient(900px 260px at 18% 0%, rgba(201,174,126,0.18), transparent 60%)",
        }}
      />

      {/* CONTENT CLICK AREA */}
      <button onClick={() => onOpen(item)} className="relative w-full text-left p-5 sm:p-6">
        {/* ✅ HARD FIX: GRID prevents overlap always */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-4 items-start">
          <div className="min-w-0">
            <h4
              className="font-display text-lg sm:text-xl font-medium leading-snug break-words"
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

          {/* Badge stays in its own grid column */}
          <div className="sm:justify-self-end">
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
      <div className="relative px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAskInfo?.(item);
          }}
          className="flex-1 rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold border hover:opacity-90 transition"
          style={{
            background: "rgba(255,255,255,0.70)",
            borderColor: BORDER_SOFT,
            color: ESPRESSO,
          }}
        >
          Preguntar
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd?.(item);
          }}
          disabled={!showPrice}
          className="flex-1 rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold border hover:opacity-90 disabled:opacity-40 transition"
          style={{
            background: showPrice ? "rgba(195,154,139,0.20)" : "rgba(255,255,255,0.70)",
            borderColor: showPrice ? "rgba(195,154,139,0.35)" : BORDER_SOFT,
            color: ESPRESSO,
          }}
          title={!showPrice ? "Edita el precio para habilitar" : "Añadir al carrito"}
        >
          Añadir
        </button>
      </div>

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
// EXPORT
// ==========================
export function getAllServices() {
  return CATEGORIES.flatMap((c) => c.items);
}

// ==========================
// MAIN
// ==========================
export default function ServicesSection({ sectionRef, onAddToCart, onAskAboutService }) {
  const flat = useMemo(() => {
    return CATEGORIES.flatMap((c) => c.items.map((i) => ({ ...i, _categoryKey: c.key })));
  }, []);

  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => flat.find((x) => x.id === selectedId) || null, [flat, selectedId]);

  const handleAdd = (svc) => {
    onAddToCart?.(svc);
  };

  const handleAskInfo = (svc) => {
    onAskAboutService?.(svc);
  };

  return (
    <section
      id="ServicesSection"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: LINEN }}
    >
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

      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(42,30,26,0.10)" }} />

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
                    onAskInfo={handleAskInfo}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal open={!!selected} service={selected} onClose={() => setSelectedId(null)} onAdd={handleAdd} />
    </section>
  );
}