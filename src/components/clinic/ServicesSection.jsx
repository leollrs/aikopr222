// ServicesSection.jsx
import React, { useMemo, useState, useEffect } from "react";

/**
 * BILINGUAL VERSION (ES/EN)
 * ✅ Keeps your premium layout + grid badge fix
 * ✅ Adds lang prop support: 'es' | 'en'
 * ✅ All copy is stored in both languages
 * ✅ Modal + cards + category titles bilingual
 */

// ==========================
// THEME
// ==========================
const LINEN = "#F1E8DD";
const ESPRESSO = "#2A1E1A";
const COCOA = "#6B5A52";
const CHAMPAGNE = "#C9AE7E";
const ROSE = "#C39A8B";
const TAUPE = "#8B7468";

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

// Pick a localized string from { es, en }
function pick(obj, lang = "es", fallback = "") {
  if (!obj) return fallback;
  return lang === "en" ? obj.en ?? obj.es ?? fallback : obj.es ?? obj.en ?? fallback;
}

// ==========================
// DATA
// ==========================
const LASER_MODAL = {
  sections: [
    {
      title: { es: "Por qué la gente lo hace", en: "Why people love it" },
      bullets: [
        { es: "Menos vello con el tiempo (según evaluación estética)", en: "Less hair over time (based on aesthetic evaluation)" },
        { es: "Menos irritación por rasurar/depilar constantemente", en: "Less irritation from constant shaving/waxing" },
        { es: "Piel más suave y cómoda", en: "Smoother, more comfortable skin" },
      ],
    },
    {
      title: { es: "Sesiones", en: "Sessions" },
      text: {
        es: "Varía por zona, tipo de vello y objetivo. Te orientamos en tu evaluación.",
        en: "It varies by area, hair type, and your goals. We’ll guide you during your evaluation.",
      },
    },
  ],
};

const CATEGORIES = [
  {
    key: "advanced",
    title: { es: "SERVICIOS DE ESTÉTICA AVANZADA", en: "ADVANCED AESTHETIC SERVICES" },
    items: [
      {
        id: "co2-laser-fraccionado",
        name: { es: "CO₂ LÁSER FRACCIONADO", en: "FRACTIONAL CO₂ LASER" },
        price: 230,
        duration: { es: "45–60 minutos", en: "45–60 minutes" },
        badges: [
          { es: "Servicios profesionales", en: "Professional service" },
          { es: "Evaluación previa obligatoria (estética)", en: "Pre-evaluation required (aesthetic)" },
        ],
        description: {
          es: "Piel más lisa, poros más finos y una apariencia más rejuvenecida. Diseñado para mejorar textura, tono y marcas visibles dentro del alcance estético.",
          en: "Smoother skin, refined pores, and a more refreshed look. Designed to improve texture, tone, and visible marks within the aesthetic scope.",
        },
        extra: {
          es: "Trabaja con microzonas térmicas controladas que estimulan renovación cutánea y colágeno de forma progresiva. El resultado se vuelve más evidente con el paso de las semanas.",
          en: "Uses controlled micro-thermal zones to stimulate skin renewal and collagen progressively. Results become more noticeable over the following weeks.",
        },
        videoUrl: "https://drive.google.com/file/d/15Fk2QpUU-Kv4-Ok7uhxSi12DghTishwv/preview",
        modal: {
          sections: [
            {
              title: { es: "Lo que puedes notar", en: "What you may notice" },
              bullets: [
                { es: "Textura más suave y uniforme", en: "Smoother, more even texture" },
                { es: "Poros visualmente más finos", en: "Pores look more refined" },
                { es: "Piel con mejor firmeza y apariencia general", en: "Improved firmness and overall look" },
                { es: "Tono más parejo y piel menos apagada", en: "More even tone and less dullness" },
                { es: "Marcas visibles más difuminadas (según evaluación estética)", en: "Visible marks appear softer (based on evaluation)" },
              ],
            },
            {
              title: { es: "Ideal para ti si…", en: "Ideal for you if…" },
              bullets: [
                { es: "Sientes textura irregular o poros marcados", en: "You feel uneven texture or noticeable pores" },
                { es: "Tienes marcas visibles (acné / procedimientos estéticos previos)", en: "You have visible marks (acne / prior aesthetic procedures)" },
                { es: "Quieres un cambio notable sin cirugía", en: "You want a noticeable change without surgery" },
                { es: "Tu piel se ve cansada, opaca o fotoenvejecida", en: "Your skin looks tired, dull, or sun-aged" },
              ],
            },
            {
              title: { es: "Sesiones recomendadas", en: "Recommended sessions" },
              text: {
                es: "1 a 3 sesiones. Intervalos de 4 a 6 semanas (según evaluación estética).",
                en: "1 to 3 sessions. Spaced 4 to 6 weeks apart (based on aesthetic evaluation).",
              },
            },
            { title: { es: "Duración", en: "Duration" }, text: { es: "45–60 minutos.", en: "45–60 minutes." } },
            {
              title: { es: "Cuidados post", en: "Aftercare" },
              bullets: [
                { es: "Evitar sol directo y usar protector solar diariamente", en: "Avoid direct sun and use sunscreen daily" },
                { es: "Hidratación profunda", en: "Deep hydration" },
                { es: "Evitar maquillaje por varios días (según tu caso)", en: "Avoid makeup for a few days (case-dependent)" },
                { es: "No manipular la piel durante la recuperación", en: "Do not pick or manipulate healing skin" },
              ],
            },
            {
              title: { es: "Importante", en: "Important" },
              text: {
                es: "Evaluación previa obligatoria (estética). Servicio dentro del alcance estético, no médico.",
                en: "Pre-evaluation required (aesthetic). Service within the aesthetic scope, not medical.",
              },
            },
          ],
        },
      },
    ],
  },

  {
    key: "home",
    title: { es: "SERVICIOS EXCLUSIVOS A DOMICILIO", en: "EXCLUSIVE MOBILE SERVICES" },
    subtitle: { es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" },
    items: [
      {
        id: "rf-microagujas-rostro-cuello-escote",
        name: { es: "RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Rostro, cuello y escote", en: "FRACTIONAL RF MICRONEEDLING — Face, neck & décolleté" },
        price: 149,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Para mejorar firmeza, textura y poros. Ideal si buscas una piel más uniforme y con mejor calidad sin procedimientos invasivos.",
          en: "Helps improve firmness, texture, and pores. Ideal if you want smoother-looking skin without invasive procedures.",
        },
        extra: {
          es: "Combina microagujas + radiofrecuencia para estimular colágeno de forma progresiva. Los cambios suelen mejorar con la constancia.",
          en: "Combines microneedling + radiofrequency to stimulate collagen progressively. Results typically improve with consistency.",
        },
        videoUrl: "https://drive.google.com/file/d/1ngOuLg55F_caEa6GUmMPWvs9gDPB5soX/preview",
        modal: {
          sections: [
            {
              title: { es: "Lo que ayuda a mejorar", en: "What it helps improve" },
              bullets: [
                { es: "Firmeza y elasticidad", en: "Firmness and elasticity" },
                { es: "Textura irregular", en: "Uneven texture" },
                { es: "Poros visibles", en: "Visible pores" },
                { es: "Apariencia general más uniforme", en: "More even overall appearance" },
              ],
            },
            { title: { es: "Sesiones", en: "Sessions" }, text: { es: "3–4 sesiones (cada 4 semanas).", en: "3–4 sessions (every 4 weeks)." } },
            { title: { es: "Importante", en: "Important" }, text: { es: "Recomendación final según evaluación estética y condición de la piel.", en: "Final recommendation depends on evaluation and skin condition." } },
          ],
        },
      },
      {
        id: "rf-microagujas-corporal",
        name: { es: "RADIOFRECUENCIA FRACCIONADA CON MICROAGUJAS — Corporal (abdomen, brazos o entrepiernas)", en: "FRACTIONAL RF MICRONEEDLING — Body (abdomen, arms or inner thighs)" },
        price: 199,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Enfocado en zonas específicas para mejorar firmeza y textura. Ideal si buscas una apariencia más uniforme en la zona tratada.",
          en: "Focused on specific areas to improve firmness and texture. Ideal if you want a more even-looking appearance in the treated area.",
        },
        extra: {
          es: "Estimula colágeno de manera progresiva y se trabaja por zona. Perfecto como tratamiento puntual o mantenimiento estético.",
          en: "Stimulates collagen progressively and is performed per area. Great for targeted improvement or aesthetic maintenance.",
        },
        modal: {
          sections: [
            {
              title: { es: "Lo que ayuda a mejorar", en: "What it helps improve" },
              bullets: [
                { es: "Firmeza y elasticidad", en: "Firmness and elasticity" },
                { es: "Textura irregular", en: "Uneven texture" },
                { es: "Apariencia más uniforme en la zona", en: "More even appearance in the area" },
                { es: "Mejor aspecto general de la piel", en: "Improved overall skin look" },
              ],
            },
            { title: { es: "Sesiones", en: "Sessions" }, text: { es: "3–4 sesiones (cada 4 semanas).", en: "3–4 sessions (every 4 weeks)." } },
            { title: { es: "Importante", en: "Important" }, text: { es: "El plan exacto depende de la zona y la evaluación estética.", en: "The exact plan depends on the area and evaluation." } },
          ],
        },
      },
      {
        id: "hifu-rostro-cuello-escote",
        name: { es: "HIFU — Rostro, cuello y escote", en: "HIFU — Face, neck & décolleté" },
        price: 120,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Tratamiento estético no invasivo para ayudar a tensar y redefinir. Ideal si buscas una apariencia más firme sin cirugía.",
          en: "A non-invasive aesthetic treatment to help tighten and redefine. Ideal if you want a firmer look without surgery.",
        },
        extra: {
          es: "Los resultados se desarrollan de manera progresiva. Muchas personas lo usan como mantenimiento estético 1–2 veces al año.",
          en: "Results develop progressively. Many people use it as maintenance 1–2 times per year.",
        },
        videoUrl: "https://drive.google.com/file/d/1K7eNXxJoLISwfcHmERKDaCwa1zrpODKK/preview",
        modal: {
          sections: [
            {
              title: { es: "Lo que vas a buscar con HIFU", en: "What you’re aiming for with HIFU" },
              bullets: [
                { es: "Más firmeza", en: "More firmness" },
                { es: "Mejor definición", en: "Better definition" },
                { es: "Apariencia más lifted", en: "A more lifted look" },
              ],
            },
            { title: { es: "Sesiones", en: "Sessions" }, text: { es: "1 sesión cada 6–12 meses (según evaluación estética).", en: "1 session every 6–12 months (based on evaluation)." } },
            { title: { es: "Resultados", en: "Results" }, text: { es: "Progresivos con el paso de las semanas. Ideal como mantenimiento.", en: "Progressive over the weeks. Great for maintenance." } },
          ],
        },
      },
      {
        id: "hifu-corporal",
        name: { es: "HIFU — Corporal (abdomen, brazos o entrepiernas)", en: "HIFU — Body (abdomen, arms or inner thighs)" },
        price: 180,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Ayuda a tensar y redefinir zonas corporales. Ideal si quieres verte más firme y definida con un tratamiento no invasivo.",
          en: "Helps tighten and redefine body areas. Ideal if you want a firmer, more defined look with a non-invasive treatment.",
        },
        extra: {
          es: "Se trabaja por zona, y el resultado se aprecia de forma progresiva. Perfecto para mantenimiento estético.",
          en: "Performed per area, and results are progressive. Perfect for aesthetic maintenance.",
        },
        modal: {
          sections: [
            {
              title: { es: "Lo que vas a buscar con HIFU", en: "What you’re aiming for with HIFU" },
              bullets: [
                { es: "Más firmeza", en: "More firmness" },
                { es: "Mejor definición en la zona", en: "Better definition in the area" },
                { es: "Apariencia más lifted", en: "A more lifted look" },
              ],
            },
            { title: { es: "Sesiones", en: "Sessions" }, text: { es: "1 sesión cada 6–12 meses (según evaluación estética).", en: "1 session every 6–12 months (based on evaluation)." } },
            { title: { es: "Resultados", en: "Results" }, text: { es: "Progresivos con el paso de las semanas. Ideal como mantenimiento.", en: "Progressive over the weeks. Great for maintenance." } },
          ],
        },
      },
      {
        id: "microagujas-manchas-rostro",
        name: { es: "MICROAGUJAS PARA MANCHAS — Rostro", en: "MICRONEEDLING FOR DARK SPOTS — Face" },
        price: 120,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Para mejorar tono y luminosidad. Ideal si tienes manchas visibles, tono desigual o piel opaca y quieres un look más uniforme.",
          en: "For improved tone and brightness. Ideal if you have visible dark spots, uneven tone, or dullness and want a more even look.",
        },
        extra: {
          es: "Inducción de colágeno con activos despigmentantes (dentro del alcance estético). Perfecto para un upgrade constante en tu piel.",
          en: "Collagen induction with brightening actives (within the aesthetic scope). Great for consistent skin improvement.",
        },
        modal: {
          sections: [
            {
              title: { es: "Beneficios principales", en: "Main benefits" },
              bullets: [
                { es: "Ayuda a uniformar el tono", en: "Helps even out skin tone" },
                { es: "Mejora luminosidad", en: "Boosts brightness" },
                { es: "Textura más suave", en: "Smoother texture" },
                { es: "Apariencia más fresca y pareja", en: "Fresher, more even appearance" },
              ],
            },
            {
              title: { es: "Ideal para ti si…", en: "Ideal for you if…" },
              bullets: [
                { es: "Quieres mejorar manchas visibles (según evaluación estética)", en: "You want to improve visible spots (based on evaluation)" },
                { es: "Buscas una piel más glowy y uniforme", en: "You want a glowier, more even look" },
                { es: "Quieres un tratamiento constante sin algo agresivo", en: "You want consistency without something aggressive" },
              ],
            },
          ],
        },
      },
      {
        id: "plasma-fibroblast-verrugas-desde",
        name: { es: "PLASMA FIBROBLAST — Remoción de verrugas (desde)", en: "PLASMA FIBROBLAST — Wart removal (from)" },
        price: 60,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: {
          es: "Trabajo estético localizado para mejorar áreas específicas. Ideal para tratar zonas pequeñas que te molestan visualmente.",
          en: "Localized aesthetic work for specific areas. Ideal for small spots that bother you visually.",
        },
        extra: {
          es: "Se evalúa el tamaño y la cantidad de áreas para definir el alcance y el costo final.",
          en: "We evaluate size and number of areas to confirm scope and final cost.",
        },
        modal: {
          sections: [
            {
              title: { es: "Qué puedes esperar", en: "What to expect" },
              bullets: [
                { es: "Trabajo localizado por zona", en: "Localized work per area" },
                { es: "Evaluación previa para definir costo final", en: "Pre-evaluation to confirm final cost" },
                { es: "Ideal para áreas pequeñas y específicas", en: "Ideal for small, specific areas" },
              ],
            },
            { title: { es: "Precio", en: "Price" }, text: { es: "Desde $60. El costo final depende del tamaño y la cantidad de áreas.", en: "From $60. Final cost depends on size and number of areas." } },
          ],
        },
      },
    ],
  },

  {
    key: "laser",
    title: { es: "DEPILACIÓN LÁSER DIODO", en: "DIODE LASER HAIR REMOVAL" },
    items: [
      { id: "laser-bozo", name: { es: "Bozo", en: "Upper Lip" }, price: 35, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-axilas", name: { es: "Axilas", en: "Underarms" }, price: 45, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-bikini", name: { es: "Bikini", en: "Bikini" }, price: 75, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-brazilian", name: { es: "Brazilian", en: "Brazilian" }, price: 95, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-media-pierna", name: { es: "Media Pierna", en: "Half Legs" }, price: 120, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-piernas-completas", name: { es: "Piernas Completas", en: "Full Legs" }, price: 150, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
      { id: "laser-espalda", name: { es: "Espalda", en: "Back" }, price: 150, duration: { es: "—", en: "—" }, description: { es: "Tratamiento estético para reducir progresivamente el crecimiento del vello y mantener la piel más suave.", en: "Aesthetic treatment to progressively reduce hair growth and keep skin smoother." }, extra: { es: "La cantidad de sesiones varía según la zona y el tipo de vello. Te orientamos en tu evaluación.", en: "Session count varies by area and hair type. We’ll guide you during your evaluation." }, modal: LASER_MODAL },
    ],
  },

  {
    key: "faciales",
    title: { es: "FACIALES", en: "FACIALS" },
    subtitle: { es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" },
    items: [
      {
        id: "facial-limpieza",
        name: { es: "Limpieza facial", en: "Facial Cleanse" },
        price: 65,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: { es: "El reset clásico para sentir la piel limpia, fresca y cómoda. Ideal como mantenimiento regular.", en: "A classic reset for clean, fresh, comfortable skin. Ideal for regular maintenance." },
        extra: { es: "Enfocado en limpieza profunda, remoción de impurezas e hidratación para mejorar la apariencia general de la piel.", en: "Focused on deep cleansing, impurity removal, and hydration to improve overall skin appearance." },
        modal: {
          sections: [
            { title: { es: "Ideal si…", en: "Ideal if…" }, bullets: [{ es: "Te sientes cargada/o o con la piel pesada", en: "Your skin feels congested/heavy" }, { es: "Quieres mantenimiento mensual", en: "You want monthly maintenance" }, { es: "Buscas piel más limpia y uniforme", en: "You want cleaner, more even-looking skin" }] },
            { title: { es: "Frecuencia", en: "Frequency" }, text: { es: "Cada 4–6 semanas (ideal para mantenimiento).", en: "Every 4–6 weeks (ideal for maintenance)." } },
          ],
        },
      },
      {
        id: "facial-hidrafacial",
        name: { es: "Limpieza profunda con Hidrafacial", en: "Deep Cleanse with Hydrafacial" },
        price: 90,
        duration: { es: "—", en: "—" },
        badges: [{ es: "Servicio a domicilio y en cabina", en: "Mobile service & in-studio" }],
        description: { es: "Glow inmediato. Limpieza profunda + hidratación para una piel más luminosa y uniforme desde el mismo día.", en: "Instant glow. Deep cleanse + hydration for brighter, more even-looking skin the same day." },
        extra: { es: "Perfecto antes de eventos o cuando quieres verte on point con una piel más fresca y revitalizada.", en: "Perfect before events or anytime you want your skin to look extra refreshed." },
        modal: {
          sections: [
            { title: { es: "Lo que vas a notar", en: "What you’ll notice" }, bullets: [{ es: "Glow", en: "Glow" }, { es: "Piel más hidratada", en: "More hydrated skin" }, { es: "Textura más smooth", en: "Smoother texture" }, { es: "Poros menos visibles", en: "Less visible pores" }] },
            { title: { es: "Perfecto antes de", en: "Perfect before" }, text: { es: "Eventos, fotos, vacaciones o cuando quieras un reset visible.", en: "Events, photos, vacations—or anytime you want a visible reset." } },
          ],
        },
      },
    ],
  },
];

// ==========================
// VIDEO PLAYER
// ==========================
function VideoAutoPlayer({ src }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: "rgba(42,30,26,0.10)",
        backgroundColor: "rgba(251,248,243,0.55)",
        boxShadow: "0 18px 55px rgba(42,30,26,0.10)",
      }}
    >
      <iframe
        src={src}
        className="w-full aspect-[9/16]"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
}

// ==========================
// MODAL
// ==========================
function ServiceModal({ open, service, onClose, onAdd, lang = "es" }) {
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

  const name = pick(service.name, lang);
  const description = pick(service.description, lang);
  const extra = pick(service.extra, lang);
  const duration = typeof service.duration === "string" ? service.duration : pick(service.duration, lang);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.28)" }}
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        {/* Modal shell */}
        <div
          className="relative w-full max-w-xl overflow-hidden rounded-t-[26px] border shadow-[0_40px_120px_rgba(42,30,26,0.22)] md:rounded-[28px]"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            borderColor: "rgba(42,30,26,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_620px_at_20%_0%,rgba(201,174,126,0.22),transparent_62%),radial-gradient(900px_520px_at_90%_10%,rgba(195,154,139,0.16),transparent_62%)]" />

          {/* Header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur"
            style={{
              backgroundColor: "rgba(251,248,243,0.80)",
              borderColor: "rgba(42,30,26,0.10)",
            }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
                <span
                  className="text-[11px] font-semibold tracking-[0.28em] uppercase"
                  style={{ color: TAUPE }}
                >
                  {lang === "es" ? "Detalles del servicio" : "Service details"}
                </span>
              </div>

              <h3
                className="mt-2 truncate text-xl font-medium tracking-[-0.01em]"
                style={{ color: ESPRESSO }}
              >
                {name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border p-2 transition"
              style={{
                borderColor: "rgba(42,30,26,0.14)",
                backgroundColor: "rgba(255,252,248,0.65)",
              }}
              aria-label={lang === "es" ? "Cerrar" : "Close"}
            >
              <svg className="h-5 w-5" style={{ color: ESPRESSO }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="relative max-h-[72vh] overflow-y-auto px-6 py-6 md:max-h-[75vh]">
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {duration && duration !== "—" && (
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(251,248,243,0.75)",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: ESPRESSO }}>
                    {duration}
                  </span>
                  <span style={{ color: CHAMPAGNE }}>•</span>
                  <span className="text-xs" style={{ color: TAUPE }}>
                    {lang === "es" ? "Servicio premium" : "Premium service"}
                  </span>
                </div>
              )}

              {/* Price badge */}
              {canAdd && (
                <div
                  className="inline-flex items-center rounded-full border px-4 py-2"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(255,252,248,0.55)",
                  }}
                >
                  <span className="text-xs" style={{ color: TAUPE }}>
                    {lang === "es" ? "Desde" : "From"}
                  </span>
                  <span className="ml-2 text-xs font-semibold" style={{ color: ESPRESSO }}>
                    ${service.price}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <div className="mt-6">
                <p className="text-[15px] leading-relaxed" style={{ color: COCOA }}>
                  {description}
                </p>
              </div>
            )}

            {/* Extra info */}
            {extra && (
              <div className="mt-6">
                <p className="text-[15px] leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                  {extra}
                </p>
              </div>
            )}

            {/* Badges */}
            {service.badges?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {service.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      background: "rgba(201,174,126,0.16)",
                      borderColor: "rgba(201,174,126,0.32)",
                      color: ESPRESSO,
                    }}
                  >
                    {typeof b === "string" ? b : pick(b, lang)}
                  </span>
                ))}
              </div>
            )}

          {/* ✅ AUTO-PLAY VIDEO (tap to pause/play) */}
          {service.videoUrl && (
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-px w-10"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.78))",
                  }}
                />
                <h4 className="text-sm font-semibold" style={{ color: ESPRESSO }}>
                  {lang === "es" ? "Video del tratamiento" : "Treatment video"}
                </h4>
              </div>

              <div className="mx-auto w-full max-w-[380px]">
                <VideoAutoPlayer src={service.videoUrl} />
              </div>
            </div>
          )}

            {/* Modal sections */}
            {service.modal?.sections?.length > 0 && (
              <div className="mt-8 space-y-7">
                {service.modal.sections.map((sec, idx) => {
                  const title = pick(sec.title, lang, "");
                  const text = pick(sec.text, lang, "");
                  const bullets = (sec.bullets || []).map((b) => (typeof b === "string" ? b : pick(b, lang)));

                  return (
                    <div key={idx}>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-px w-10"
                          style={{
                            background: "linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.78))",
                          }}
                        />
                        <h4 className="text-sm font-semibold" style={{ color: ESPRESSO }}>
                          {title}
                        </h4>
                      </div>

                      {text && (
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                          {text}
                        </p>
                      )}

                      {bullets.length > 0 && (
                        <div className="mt-4 space-y-2.5">
                          {bullets.map((b, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 rounded-full" style={{ backgroundColor: "rgba(42,30,26,0.55)" }} />
                              <span className="text-sm" style={{ color: COCOA, opacity: 0.92 }}>
                                {b}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="h-6" />
          </div>

          {/* Footer */}
          <div
            className="sticky bottom-0 z-10 border-t px-6 py-4 backdrop-blur"
            style={{
              backgroundColor: "rgba(251,248,243,0.82)",
              borderColor: "rgba(42,30,26,0.10)",
            }}
          >
            <button
              onClick={() => {
                onAdd?.(service);
                onClose();
              }}
              disabled={!canAdd}
              className="w-full rounded-xl py-3 font-medium hover:opacity-90 disabled:opacity-40 transition"
              style={{
                backgroundColor: ROSE,
                color: "#fff",
                boxShadow: "0 18px 55px rgba(195,154,139,0.28)",
              }}
            >
              {lang === "es" ? "Añadir al carrito" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================
// CARD
// ==========================
function ServiceCard({ item, onOpen, onAdd, onAskInfo, lang = "es", cart = [] }) {
  const showPrice = typeof item.price === "number" && item.price > 0;
  const isInCart = cart.some(cartItem => cartItem.id === item.id);

  const name = pick(item.name, lang);
  const description = pick(item.description, lang);

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

      <button onClick={() => onOpen(item)} className="relative w-full text-left p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-4 items-start">
          <div className="min-w-0">
            <h4
              className="font-display text-lg sm:text-xl font-medium leading-snug whitespace-normal break-normal hyphens-none [overflow-wrap:normal] [word-break:normal]"
              style={{ color: ESPRESSO, letterSpacing: "-0.01em", overflowWrap: "normal", wordBreak: "normal", hyphens: "none" }}
            >
              {name}
            </h4>

            {description && (
              <p className="mt-2 text-sm leading-relaxed" style={{ color: COCOA, opacity: 0.9 }}>
                {description}
              </p>
            )}
          </div>

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
                {showPrice ? money(item.price) : lang === "en" ? "View" : "Ver"}
              </span>
            </div>
          </div>
        </div>

        {!!item.badges?.length && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {item.badges.slice(0, 2).map((b, idx) => (
              <span
                key={`${idx}`}
                className="px-3 py-1 rounded-full text-xs border"
                style={{
                  background: "rgba(255,255,255,0.66)",
                  borderColor: BORDER_SOFT,
                  color: ESPRESSO,
                }}
              >
                {typeof b === "string" ? b : pick(b, lang)}
              </span>
            ))}
          </div>
        )}
      </button>

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
          {lang === "en" ? "Ask" : "Preguntar"}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd?.(item);
          }}
          disabled={!showPrice || isInCart}
          className="flex-1 rounded-2xl px-3 py-2 text-xs sm:text-sm font-semibold border hover:opacity-90 disabled:opacity-40 transition"
          style={{
            background: isInCart ? "rgba(76,175,80,0.15)" : showPrice ? "rgba(195,154,139,0.20)" : "rgba(255,255,255,0.70)",
            borderColor: isInCart ? "rgba(76,175,80,0.35)" : showPrice ? "rgba(195,154,139,0.35)" : BORDER_SOFT,
            color: ESPRESSO,
          }}
          title={
            isInCart
              ? lang === "en"
                ? "Already added"
                : "Ya añadido"
              : !showPrice
              ? lang === "en"
                ? "Set a price to enable"
                : "Edita el precio para habilitar"
              : lang === "en"
              ? "Add to cart"
              : "Añadir al carrito"
          }
        >
          {isInCart ? (lang === "en" ? "Added ✓" : "Añadido ✓") : (lang === "en" ? "Add" : "Añadir")}
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
export default function ServicesSection({ sectionRef, onAddToCart, onAskAboutService, lang = "es", cart = [] }) {
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
            {lang === "en" ? "Aesthetic treatments • Mobile & in-studio" : "Tratamientos estéticos • A domicilio y en cabina"}
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-5 sm:mb-6" style={{ color: ESPRESSO, letterSpacing: "-0.03em" }}>
            {lang === "en" ? "Our Services" : "Nuestros Servicios"}
          </h2>

          <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed" style={{ color: COCOA, opacity: 0.88 }}>
            {lang === "en" ? "Choose a category, review the details, and add your service to your cart." : "Elige una categoría, revisa los detalles y añade tu servicio al carrito."}
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
                  {pick(cat.title, lang)}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {cat.subtitle && (
                    <span className="text-sm" style={{ color: COCOA, opacity: 0.9 }}>
                      {pick(cat.subtitle, lang)}
                    </span>
                  )}
                  <span className="text-sm" style={{ color: COCOA, opacity: 0.75 }}>
                    • {cat.items.length} {lang === "en" ? "services" : "servicios"}
                  </span>
                </div>

                <div
                  className="mt-4 h-px w-36 sm:w-40"
                  style={{
                    background: `linear-gradient(90deg, rgba(201,174,126,0.0), rgba(201,174,126,0.65), rgba(201,174,126,0.0))`,
                  }}
                />
              </div>

              {/* ✅ FIX: NO 4-COLUMN LAYOUT. MAX 3 COLUMNS ON LARGE SCREENS */}
              <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
                {cat.items.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    cart={cart}
                    onOpen={(svc) => setSelectedId(svc.id)}
                    onAdd={handleAdd}
                    onAskInfo={handleAskInfo}
                  />
                ))}
              </div>

              {/*
              // OPTIONAL (best for “never too small cards”):
              // Swap the grid above with this if you want auto-fit:
              <div className="grid gap-6 sm:gap-7 lg:gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
                ...
              </div>
              */}
            </div>
          ))}
        </div>
      </div>

      <ServiceModal open={!!selected} service={selected} lang={lang} onClose={() => setSelectedId(null)} onAdd={handleAdd} />
    </section>
  );
}