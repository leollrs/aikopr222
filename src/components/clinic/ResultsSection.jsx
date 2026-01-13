import React from "react";

const results = [
  { id: 1, treatment: "Laser Hair Removal", area: "Full Legs" },
  { id: 2, treatment: "Carbon Peel", area: "Face" },
  { id: 3, treatment: "Tattoo Removal", area: "Arm" },
  { id: 4, treatment: "HIFU", area: "Face & Neck" },
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

  return (
    <section id="ResultsSection" className="py-16 md:py-20 lg:py-28" style={{ backgroundColor: LINEN }}>
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
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: TAUPE }}
            >
              {lang === "es" ? "ANTES / DESPUÉS" : "BEFORE / AFTER"}
            </span>
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-light" style={{ color: ESPRESSO }}>
            {lang === "es" ? "Resultados Reales" : "Real Results"}
          </h2>

          <p className="mt-3 max-w-2xl mx-auto" style={{ color: COCOA }}>
            {lang === "es"
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
          {results.map((result) => (
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
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35),transparent_55%)]" />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: TAUPE }}
                    >
                      {lang === "es" ? "Antes" : "Before"}
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
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.25),transparent_55%)]" />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                      style={{ color: TAUPE }}
                    >
                      {lang === "es" ? "Después" : "After"}
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
                    {result.treatment}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: COCOA }}>
                    {result.area}
                  </p>

                  <div className="mt-4 h-px w-full" style={{ backgroundColor: "rgba(42,30,26,0.08)" }} />

                  <p className="mt-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: TAUPE }}>
                    {lang === "es" ? "Resultados visibles" : "Visible improvement"}
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
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs mt-10 italic" style={{ color: "rgba(107,90,82,0.75)" }}>
          {lang === "es"
            ? "Los resultados pueden variar según cada paciente. Todas las fotos son de pacientes reales con su consentimiento."
            : "Results may vary depending on each patient. All photos are from real patients with their consent."}
        </p>
      </div>
    </section>
  );
}