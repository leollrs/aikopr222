import React, { useRef, useState } from "react";

/* MUST MATCH SERVICES (8 TOTAL) */
const results = [
  {
    nameEs: "Depilación Láser",
    nameEn: "Laser Hair Removal",
    areaEs: "Piernas completas",
    areaEn: "Full legs",
    before: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&fit=crop",
  },
  {
    nameEs: "Carbon Peel (Hollywood Peel)",
    nameEn: "Carbon Peel (Hollywood Peel)",
    areaEs: "Rostro completo",
    areaEn: "Full face",
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&fit=crop",
  },
  {
    nameEs: "Eliminación de Tatuajes",
    nameEn: "Tattoo Removal",
    areaEs: "Brazo superior",
    areaEn: "Upper arm",
    before: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800&fit=crop",
  },
  {
    nameEs: "Eliminación de Micropigmentación",
    nameEn: "Micropigmentation Removal",
    areaEs: "Cejas",
    areaEn: "Eyebrows",
    before: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=800&fit=crop",
  },
  {
    nameEs: "Eliminación de Verrugas",
    nameEn: "Wart Removal",
    areaEs: "Manos",
    areaEn: "Hands",
    before: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&fit=crop",
  },
  {
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    areaEs: "Párpados superiores",
    areaEn: "Upper eyelids",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&fit=crop",
  },
  {
    nameEs: "Microneedling",
    nameEn: "Microneedling",
    areaEs: "Cicatrices de acné",
    areaEn: "Acne scars",
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&fit=crop",
  },
  {
    nameEs: "Rejuvenecimiento HIFU",
    nameEn: "HIFU Rejuvenation",
    areaEs: "Lifting facial",
    areaEn: "Facial lifting",
    before: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&fit=crop",
  },
];

export default function ResultsSection({ lang = "es", sectionRef }) {
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const CREAM = "#FBF8F3";

  return (
    <section
      ref={sectionRef}
      className="relative py-28"
      style={{ backgroundColor: CREAM }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-medium mb-4" style={{ color: ESPRESSO }}>
            {lang === "es" ? "Nuestros Resultados" : "Our Results"}
          </h2>
          <p className="text-lg" style={{ color: COCOA }}>
            {lang === "es"
              ? "Casos reales. Imágenes sin editar."
              : "Real cases. Unedited images."}
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 bg-white shadow-md"
            >
              <h3 className="text-xl font-medium" style={{ color: ESPRESSO }}>
                {lang === "es" ? r.nameEs : r.nameEn}
              </h3>
              <p className="text-sm mb-4" style={{ color: COCOA }}>
                {lang === "es" ? r.areaEs : r.areaEn}
              </p>

              <BeforeAfterSlider
                before={r.before}
                after={r.after}
                lang={lang}
                accent={CHAMPAGNE}
              />

              <p className="mt-4 text-xs opacity-70">
                {lang === "es"
                  ? "* Resultados pueden variar"
                  : "* Results may vary"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SLIDER ---------------- */

function BeforeAfterSlider({ before, after, lang, accent }) {
  const [pct, setPct] = useState(50);
  const ref = useRef(null);

  const move = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setPct(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => e.buttons === 1 && move(e)}
      onMouseDown={move}
      className="relative aspect-[4/3] rounded-2xl overflow-hidden select-none"
    >
      <img src={after} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
        <img src={before} className="w-full h-full object-cover" />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{ left: `${pct}%`, backgroundColor: "#fff" }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: `${pct}%` }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="flex gap-1">
            <span className="w-[2px] h-5" style={{ backgroundColor: accent }} />
            <span className="w-[2px] h-5" style={{ backgroundColor: accent }} />
          </div>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs bg-black/40 text-white px-2 py-1 rounded-full">
        {lang === "es" ? "Antes" : "Before"}
      </span>
      <span className="absolute top-3 right-3 text-xs bg-black/40 text-white px-2 py-1 rounded-full">
        {lang === "es" ? "Después" : "After"}
      </span>
    </div>
  );
}