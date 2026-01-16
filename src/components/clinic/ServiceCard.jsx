import React from "react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({ service, lang, onAddService, onViewDetails }) {
  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const name = lang === "es" ? service.nameEs : service.nameEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-2"
      style={{
        backgroundColor: "rgba(255,252,248,0.92)",
        borderColor: "rgba(42,30,26,0.08)",
        boxShadow: "0 12px 40px rgba(42,30,26,0.06)",
      }}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(201,174,126,0.12),transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Title */}
        <h3 className="font-display text-xl font-medium tracking-tight mb-4" style={{ color: ESPRESSO }}>
          {name}
        </h3>

        {/* Meta */}
        <div className="mb-6 flex items-center gap-3 text-sm" style={{ color: TAUPE }}>
          <span className="font-medium">{service.duration}</span>
          <span style={{ color: CHAMPAGNE }}>•</span>
          <span className="font-semibold" style={{ color: ESPRESSO }}>${service.price}</span>
        </div>

        {/* Description */}
        <p className="font-body flex-grow text-base leading-relaxed mb-8" style={{ color: COCOA, opacity: 0.88 }}>
          {desc}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => onAddService(service)}
            className="h-12 rounded-xl text-sm font-medium transition-all hover:shadow-lg"
            style={{
              backgroundColor: ROSE,
              color: "#FFFFFF",
              boxShadow: "0 12px 32px rgba(195,154,139,0.24)",
            }}
          >
            {lang === "es" ? "Agregar" : "Add"}
          </Button>

          <button
            onClick={() => onViewDetails(service)}
            className="h-12 rounded-xl text-sm font-medium transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: "transparent",
              color: TAUPE,
            }}
          >
            {lang === "es" ? "Ver detalles" : "View details"}
          </button>
        </div>
      </div>
    </div>
  );
}