import React from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceModal({
  service,
  lang,
  isOpen,
  onClose,
  onAddService,
}) {
  if (!isOpen || !service) return null;

  const name = lang === "es" ? service.nameEs : service.nameEn;
  const ideal = lang === "es" ? service.idealEs : service.idealEn;
  const benefits = lang === "es" ? service.benefitsEs : service.benefitsEn;
  const desc = lang === "es" ? service.descEs : service.descEn;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        {/* Modal shell */}
        <div className="relative w-full max-w-xl overflow-hidden rounded-t-[26px] border border-white/10 bg-[#F4EEE6]/95 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl md:rounded-[28px]">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_10%,rgba(199,174,134,0.18),transparent_60%),radial-gradient(900px_520px_at_80%_0%,rgba(176,122,122,0.14),transparent_62%)]" />

          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[rgba(36,24,20,0.10)] bg-[#F4EEE6]/92 px-6 py-4 backdrop-blur">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#C7AE86]" />
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#6E5B50]">
                  {lang === "es" ? "Detalles del servicio" : "Service details"}
                </span>
              </div>
              <h3 className="mt-2 truncate text-xl font-medium tracking-[-0.01em] text-[#241814]">
                {name}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-[rgba(36,24,20,0.12)] bg-white/40 p-2 transition hover:bg-white/60"
              aria-label={lang === "es" ? "Cerrar" : "Close"}
            >
              <X className="h-5 w-5 text-[#241814]" />
            </button>
          </div>

          {/* Content */}
          <div className="relative max-h-[72vh] overflow-y-auto px-6 py-6 md:max-h-[75vh]">
            {/* Meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(36,24,20,0.12)] bg-white/45 px-4 py-2">
                <span className="text-xs font-medium text-[#241814]">
                  {service.duration}
                </span>
                <span className="text-[#C7AE86]">•</span>
                <span className="text-xs text-[#6E5B50]">
                  {lang === "es" ? "Servicio premium" : "Premium service"}
                </span>
              </div>

              {/* Optional price badge (keep if you want; remove if you want no pricing) */}
              <div className="inline-flex items-center rounded-full border border-[rgba(36,24,20,0.12)] bg-white/35 px-4 py-2">
                <span className="text-xs text-[#6E5B50]">
                  {lang === "es" ? "Desde" : "From"}
                </span>
                <span className="ml-2 text-xs font-semibold text-[#241814]">
                  ${service.price}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <p className="text-[15px] leading-relaxed text-[#6E5B50]">
                {desc}
              </p>
            </div>

            {/* Ideal for */}
            <div className="mt-7 rounded-2xl border border-[rgba(36,24,20,0.10)] bg-white/35 p-5">
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase text-[#241814]">
                {lang === "es" ? "Ideal para" : "Ideal for"}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#6E5B50]">
                {ideal}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-7">
              <h4 className="text-xs font-semibold tracking-[0.22em] uppercase text-[#241814]">
                {lang === "es" ? "Beneficios" : "Benefits"}
              </h4>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-2xl border border-[rgba(36,24,20,0.10)] bg-white/40 px-4 py-3"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#C7AE86]/20">
                      <Check className="h-4 w-4 text-[#C7AE86]" />
                    </span>
                    <span className="text-sm leading-relaxed text-[#6E5B50]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Case Study */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[rgba(36,24,20,0.10)] bg-[#241814]/5">
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.22em] uppercase text-[#241814]">
                    {lang === "es" ? "Caso real" : "Real case"}
                  </div>
                  <div className="mt-1 text-sm text-[#6E5B50]">
                    {service.caseStudy.sessions}{" "}
                    {lang === "es" ? "sesiones" : "sessions"} ·{" "}
                    {service.caseStudy.months}{" "}
                    {lang === "es" ? "meses" : "months"} · ~
                    {service.caseStudy.improvement}{" "}
                    {lang === "es" ? "mejora" : "improvement"}
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center rounded-full border border-[rgba(36,24,20,0.12)] bg-white/40 px-3 py-1 text-xs font-medium text-[#241814]">
                  {lang === "es" ? "Antes / Después" : "Before / After"}
                </div>
              </div>

              {/* Images */}
              <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(36,24,20,0.10)] bg-[#E9DDCF]">
                  <div className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    {lang === "es" ? "Antes" : "Before"}
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs text-[#6E5B50]">
                      {lang === "es"
                        ? "Imagen de referencia"
                        : "Reference image"}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(36,24,20,0.10)] bg-[#DBCAB6]">
                  <div className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    {lang === "es" ? "Después" : "After"}
                  </div>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-xs text-[#6E5B50]">
                      {lang === "es"
                        ? "Imagen de referencia"
                        : "Reference image"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <p className="text-xs italic text-[#6E5B50]/75">
                  {lang === "es"
                    ? "Los resultados pueden variar según cada paciente."
                    : "Results may vary depending on each patient."}
                </p>
              </div>
            </div>

            {/* Bottom spacing so footer doesn't cover content */}
            <div className="h-6" />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 z-10 flex gap-3 border-t border-[rgba(36,24,20,0.10)] bg-[#F4EEE6]/92 px-6 py-4 backdrop-blur">
            <Button
              onClick={() => {
                onAddService(service);
                onClose();
              }}
              className="flex-1 rounded-xl bg-[#241814] py-3 font-medium text-[#FFFCF8] shadow-[0_14px_40px_rgba(36,24,20,0.25)] hover:bg-[#1A110E]"
            >
              {lang === "es" ? "Agregar a cita" : "Add to appointment"}
            </Button>

            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-xl border-[rgba(36,24,20,0.18)] bg-white/40 px-6 py-3 font-medium text-[#241814] hover:bg-white/65"
            >
              {lang === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}