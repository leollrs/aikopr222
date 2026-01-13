import React from "react";
import { Button } from "@/components/ui/button";

export default function ServiceCard({
  service,
  lang,
  onAddService,
  onViewDetails,
}) {
  const name = lang === "es" ? service.nameEs : service.nameEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(36,24,20,0.08)] bg-[#FFFCF8]/90 p-6 shadow-[0_18px_50px_rgba(36,24,20,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(36,24,20,0.14)]">
      {/* Soft inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_80%_0%,rgba(199,174,134,0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Title */}
        <h3 className="text-lg font-medium tracking-[-0.01em] text-[#241814]">
          {name}
        </h3>

        {/* Meta */}
        <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(36,24,20,0.10)] bg-white/50 px-3 py-1">
          <span className="text-xs font-medium text-[#241814]">
            {service.duration}
          </span>
          <span className="text-[#C7AE86]">•</span>
          <span className="text-xs text-[#6E5B50]">
            {lang === "es" ? "Servicio premium" : "Premium service"}
          </span>
        </div>

        {/* Description */}
        <p className="mt-4 flex-grow text-sm leading-relaxed text-[#6E5B50]">
          {desc}
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-2">
          <Button
            onClick={() => onAddService(service)}
            className="h-11 rounded-xl bg-[#241814] text-sm font-medium text-[#FFFCF8] shadow-[0_12px_32px_rgba(36,24,20,0.25)] transition hover:bg-[#1A110E]"
          >
            {lang === "es" ? "Quiero este servicio" : "I want this service"}
          </Button>

          <Button
            onClick={() => onViewDetails(service)}
            variant="outline"
            className="h-11 rounded-xl border-[rgba(36,24,20,0.18)] bg-white/40 text-sm font-medium text-[#241814] transition hover:bg-white/70"
          >
            {lang === "es" ? "Ver detalles" : "View details"}
          </Button>
        </div>
      </div>
    </div>
  );
}