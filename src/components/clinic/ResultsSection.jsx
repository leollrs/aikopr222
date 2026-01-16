import React from "react";

const results = [
  {
    nameEs: "Depilación Láser",
    nameEn: "Laser Hair Removal",
    areaEs: "Piernas completas",
    areaEn: "Full legs",
    before: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop",
  },
  {
    nameEs: "Carbon Peel",
    nameEn: "Carbon Peel",
    areaEs: "Rostro completo",
    areaEn: "Full face",
    before: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop",
  },
  {
    nameEs: "Eliminación de Tatuajes",
    nameEn: "Tattoo Removal",
    areaEs: "Brazo superior",
    areaEn: "Upper arm",
    before: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop",
  },
  {
    nameEs: "Plasma Fibroblast",
    nameEn: "Plasma Fibroblast",
    areaEs: "Párpados superiores",
    areaEn: "Upper eyelids",
    before: "https://images.unsplash.com/photo-1499887142886-791eca5918cd?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=400&fit=crop",
  },
  {
    nameEs: "Microneedling",
    nameEn: "Microneedling",
    areaEs: "Cicatrices de acné",
    areaEn: "Acne scars",
    before: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop",
  },
  {
    nameEs: "HIFU Rejuvenecimiento",
    nameEn: "HIFU Rejuvenation",
    areaEs: "Lifting facial",
    areaEn: "Facial lifting",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    after: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop",
  },
];

export default function ResultsSection({ lang = "es", sectionRef }) {
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <section
      id="ResultsSection"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: CREAM }}
    >
      {/* Clean subtle backdrop */}
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
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: ESPRESSO }}
          >
            {lang === "es" ? "Nuestros Resultados" : "Our Results"}
          </h2>

          <p
            className="font-body text-lg md:text-xl leading-relaxed"
            style={{ color: COCOA, opacity: 0.88 }}
          >
            {lang === "es"
              ? "Casos reales de nuestros clientes. Imágenes sin editar."
              : "Real cases from our clients. Unedited images."}
          </p>
        </div>

        {/* Results Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2"
              style={{
                backgroundColor: "rgba(255,252,248,0.95)",
                border: "1px solid rgba(42,30,26,0.06)",
                boxShadow: "0 8px 32px rgba(42,30,26,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(600px 300px at 50% 0%, rgba(201,174,126,0.08), transparent 70%)",
                }}
              />

              <div className="relative p-6">
                {/* Title */}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-medium tracking-tight mb-1" style={{ color: ESPRESSO }}>
                    {lang === "es" ? result.nameEs : result.nameEn}
                  </h3>
                  <p className="font-body text-sm" style={{ color: TAUPE }}>
                    {lang === "es" ? result.areaEs : result.areaEn}
                  </p>
                </div>

                {/* Before/After with premium framing */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      border: "1px solid rgba(42,30,26,0.08)",
                      boxShadow: "inset 0 2px 8px rgba(42,30,26,0.04)",
                    }}
                  >
                    <img
                      src={result.before}
                      alt={lang === "es" ? "Antes" : "Before"}
                      className="h-52 w-full object-cover"
                    />
                    <div
                      className="absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255,252,248,0.92)",
                        border: "1px solid rgba(42,30,26,0.08)",
                        color: ESPRESSO,
                      }}
                    >
                      {lang === "es" ? "Antes" : "Before"}
                    </div>
                  </div>

                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      border: "1px solid rgba(42,30,26,0.08)",
                      boxShadow: "inset 0 2px 8px rgba(42,30,26,0.04)",
                    }}
                  >
                    <img
                      src={result.after}
                      alt={lang === "es" ? "Después" : "After"}
                      className="h-52 w-full object-cover"
                    />
                    <div
                      className="absolute bottom-3 right-3 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(255,252,248,0.92)",
                        border: "1px solid rgba(42,30,26,0.08)",
                        color: ESPRESSO,
                      }}
                    >
                      {lang === "es" ? "Después" : "After"}
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="font-body text-xs leading-relaxed" style={{ color: TAUPE, opacity: 0.8 }}>
                  {lang === "es"
                    ? "* Los resultados individuales pueden variar. Consulta con nuestro especialista."
                    : "* Individual results may vary. Consult with our specialist."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}