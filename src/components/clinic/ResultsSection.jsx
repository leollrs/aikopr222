import React from "react";

const results = [
  {
    id: 1,
    treatmentEn: "Laser Hair Removal",
    treatmentEs: "Depilación Láser",
    areaEn: "Full Legs",
    areaEs: "Piernas Completas",
    beforeImage: "/results/laser-legs-before.jpg",
    afterImage: "/results/laser-legs-after.jpg",
  },
  {
    id: 2,
    treatmentEn: "Carbon Peel",
    treatmentEs: "Peeling de Carbón",
    areaEn: "Face",
    areaEs: "Rostro",
    beforeImage: "/results/carbon-face-before.jpg",
    afterImage: "/results/carbon-face-after.jpg",
  },
  {
    id: 3,
    treatmentEn: "Tattoo Removal",
    treatmentEs: "Remoción de Tatuajes",
    areaEn: "Arm",
    areaEs: "Brazo",
    beforeImage: "/results/tattoo-arm-before.jpg",
    afterImage: "/results/tattoo-arm-after.jpg",
  },
  {
    id: 4,
    treatmentEn: "HIFU",
    treatmentEs: "HIFU",
    areaEn: "Face & Neck",
    areaEs: "Rostro y Cuello",
    beforeImage: "/results/hifu-face-neck-before.jpg",
    afterImage: "/results/hifu-face-neck-after.jpg",
  },
];

export default function ResultsSection({ lang }) {
  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const isEs = lang === "es";

  return (
    <section
      id="ResultsSection"
      className="py-16 md:py-20 lg:py-28"
      style={{ backgroundColor: LINEN }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full border px-5 py-2"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.10)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHAMPAGNE }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: TAUPE }}
            >
              {isEs ? "ANTES / DESPUÉS" : "BEFORE / AFTER"}
            </span>
          </div>

          <h2
            className="mt-6 text-3xl md:text-4xl font-light"
            style={{ color: ESPRESSO }}
          >
            {isEs ? "Resultados Reales" : "Real Results"}
          </h2>

          <p className="mt-3 max-w-2xl mx-auto" style={{ color: COCOA }}>
            {isEs
              ? "Transformaciones auténticas de nuestros pacientes."
              : "Authentic transformations from our patients."}
          </p>

          <div
            className="mx-auto mt-6 h-px w-28"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
              opacity: 0.75,
            }}
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {results.map((result) => {
            const treatment = isEs ? result.treatmentEs : result.treatmentEn;
            const area = isEs ? result.areaEs : result.areaEn;

            return (
              <div
                key={result.id}
                className="group relative overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(42,30,26,0.12)] transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,252,248,0.90)",
                  borderColor: "rgba(42,30,26,0.10)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Soft glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_0%,rgba(201,174,126,0.18),transparent_60%),radial-gradient(900px_420px_at_15%_50%,rgba(195,154,139,0.10),transparent_62%)]" />

                {/* Before/After */}
                <div className="relative p-4">
                  <div
                    className="grid grid-cols-2 overflow-hidden rounded-2xl border"
                    style={{ borderColor: "rgba(42,30,26,0.10)" }}
                  >
                    {/* BEFORE */}
                    <div
                      className="relative aspect-square flex items-center justify-center"
                      style={{ backgroundColor: "rgba(241,232,221,0.85)" }}
                    >
                      {result.beforeImage ? (
                        <img
                          src={result.beforeImage}
                          alt={`${isEs ? "Antes" : "Before"} ${treatment} – ${area}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_55%)]" />
                      )}

                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_55%)]" />

                      <span
                        className="relative text-[11px] font-semibold uppercase tracking-[0.28em]"
                        style={{ color: TAUPE }}
                      >
                        {isEs ? "Antes" : "Before"}
                      </span>

                      <span
                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: "rgba(255,252,248,0.75)",
                          color: ESPRESSO,
                          border: "1px solid rgba(42,30,26,0.10)",
                        }}
                      >
                        A
                      </span>
                    </div>

                    {/* AFTER */}
                    <div
                      className="relative aspect-square flex items-center justify-center"
                      style={{ backgroundColor: "rgba(201,174,126,0.18)" }}
                    >
                      {result.afterImage ? (
                        <img
                          src={result.afterImage}
                          alt={`${isEs ? "Después" : "After"} ${treatment} – ${area}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.25),transparent_55%)]" />
                      )}

                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.25),transparent_55%)]" />

                      <span
                        className="relative text-[11px] font-semibold uppercase tracking-[0.28em]"
                        style={{ color: TAUPE }}
                      >
                        {isEs ? "Después" : "After"}
                      </span>

                      <span
                        className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: "rgba(255,252,248,0.75)",
                          color: ESPRESSO,
                          border: "1px solid rgba(42,30,26,0.10)",
                        }}
                      >
                        B
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4">
                    <p className="text-sm font-medium" style={{ color: ESPRESSO }}>
                      {treatment}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: COCOA }}>
                      {area}
                    </p>

                    <div
                      className="mt-4 h-px w-full"
                      style={{ backgroundColor: "rgba(42,30,26,0.08)" }}
                    />

                    <p
                      className="mt-3 text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: TAUPE }}
                    >
                      {isEs ? "Resultados visibles" : "Visible improvement"}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
                  style={{
                    backgroundImage: `linear-gradient(to right, transparent, ${ROSE}, ${CHAMPAGNE}, transparent)`,
                    opacity: 0.9,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-xs mt-10 italic"
          style={{ color: "rgba(107,90,82,0.75)" }}
        >
          {isEs
            ? "Los resultados pueden variar según cada paciente. Todas las fotos son de pacientes reales con su consentimiento."
            : "Results may vary depending on each patient. All photos are from real patients with their consent."}
        </p>
      </div>
    </section>
  );
}