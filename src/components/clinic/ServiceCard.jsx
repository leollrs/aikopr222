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
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "rgba(255,252,248,0.86)",
        borderColor: "rgba(42,30,26,0.10)",
        boxShadow: "0 22px 70px rgba(42,30,26,0.10)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(700px_360px_at_80%_0%,rgba(201,174,126,0.22),transparent_60%),radial-gradient(700px_360px_at_20%_55%,rgba(195,154,139,0.14),transparent_62%)]" />

      {/* Subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.45),transparent)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Title */}
        <h3 className="text-lg font-medium tracking-[-0.01em]" style={{ color: ESPRESSO }}>
          {name}
        </h3>

        {/* Meta pill */}
        <div
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5"
          style={{
            backgroundColor: "rgba(251,248,243,0.70)",
            borderColor: "rgba(42,30,26,0.10)",
          }}
        >
          <span className="text-xs font-medium" style={{ color: ESPRESSO }}>
            {service.duration}
          </span>
          <span style={{ color: CHAMPAGNE }}>•</span>
          <span className="text-xs" style={{ color: TAUPE }}>
            {lang === "es" ? "Servicio premium" : "Premium service"}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 flex-grow text-sm leading-relaxed" style={{ color: COCOA }}>
          {desc}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <Button
            onClick={() => onAddService(service)}
            className="h-11 rounded-xl text-sm font-medium"
            style={{
              backgroundColor: ROSE,
              color: "#FFFFFF",
              boxShadow: "0 18px 55px rgba(195,154,139,0.30)",
            }}
          >
            {lang === "es" ? "Quiero este servicio" : "I want this service"}
          </Button>

          <Button
            onClick={() => onViewDetails(service)}
            variant="outline"
            className="h-11 rounded-xl text-sm font-medium"
            style={{
              backgroundColor: "rgba(251,248,243,0.55)",
              borderColor: "rgba(42,30,26,0.18)",
              color: ESPRESSO,
            }}
          >
            {lang === "es" ? "Ver detalles" : "View details"}
          </Button>
        </div>

        {/* Bottom accent */}
        <div
          className="mt-6 h-px w-full"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}