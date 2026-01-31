import React from "react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ service, lang, onAddService, onViewDetails }) {
  // PALETTE
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const name = lang === "es" ? service.nameEs : service.nameEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  return (
    <div
      className="
        group relative flex h-full flex-col overflow-hidden rounded-3xl border
        p-7 sm:p-8 transition-all duration-500 hover:-translate-y-2
        min-w-[280px]
      "
      style={{
        backgroundColor: "rgba(255,252,248,0.92)",
        borderColor: "rgba(42,30,26,0.08)",
        boxShadow: "0 12px 40px rgba(42,30,26,0.06)",
      }}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(201,174,126,0.12),transparent_70%)]" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header: title + price pill */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              font-display text-xl sm:text-2xl font-medium tracking-tight leading-tight
              break-keep hyphens-none
              pr-2
            "
            style={{ color: ESPRESSO }}
          >
            {name}
          </h3>

          <div
            className="shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: "rgba(201,174,126,0.18)",
              border: "1px solid rgba(42,30,26,0.10)",
              color: ESPRESSO,
              boxShadow: "0 10px 24px rgba(42,30,26,0.06)",
            }}
          >
            ${service.price}
          </div>
        </div>

        {/* Duration (optional, subtle) */}
        {service.duration ? (
          <div className="mt-3 text-sm font-medium" style={{ color: TAUPE }}>
            {service.duration}
          </div>
        ) : null}

        {/* Description */}
        <p
          className="mt-4 flex-grow text-[15px] leading-relaxed"
          style={{ color: COCOA, opacity: 0.9 }}
        >
          {desc}
        </p>

        {/* Tags / chips (optional) */}
        {(service.tags?.length ?? 0) > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {service.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "rgba(42,30,26,0.04)",
                  border: "1px solid rgba(42,30,26,0.08)",
                  color: ESPRESSO,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Actions: side-by-side */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => onViewDetails(service)}
            className="h-12 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: "rgba(42,30,26,0.04)",
              border: "1px solid rgba(42,30,26,0.10)",
              color: ESPRESSO,
            }}
          >
            {lang === "es" ? "Preguntar" : "Ask"}
          </button>

          <Button
            onClick={() => onAddService(service)}
            className="h-12 rounded-xl text-sm font-semibold transition-all hover:shadow-lg"
            style={{
              backgroundColor: ROSE,
              color: "#FFFFFF",
              boxShadow: "0 12px 32px rgba(195,154,139,0.24)",
            }}
          >
            {lang === "es" ? "Añadir" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}