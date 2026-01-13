import React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "./ServicesSection";

export default function ServicePickerModal({ isOpen, onClose, lang, onAddService }) {
  if (!isOpen) return null;

  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <>
      {/* Backdrop (soft, not black) */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.26)" }}
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl md:rounded-3xl shadow-[0_40px_120px_rgba(42,30,26,0.20)]"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            border: "1px solid rgba(42,30,26,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_70%_0%,rgba(201,174,126,0.22),transparent_60%),radial-gradient(900px_520px_at_15%_20%,rgba(195,154,139,0.14),transparent_62%)]" />

          {/* Header */}
          <div
            className="relative flex items-center justify-between border-b px-6 py-4"
            style={{
              borderColor: "rgba(42,30,26,0.10)",
              backgroundColor: "rgba(251,248,243,0.80)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
              <h3 className="text-lg font-medium tracking-[-0.01em]" style={{ color: ESPRESSO }}>
                {lang === "es" ? "Agregar servicio" : "Add service"}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border p-2 transition"
              style={{
                borderColor: "rgba(42,30,26,0.14)",
                backgroundColor: "rgba(255,252,248,0.55)",
              }}
              aria-label={lang === "es" ? "Cerrar" : "Close"}
            >
              <X className="h-5 w-5" style={{ color: ESPRESSO }} />
            </button>
          </div>

          {/* Services */}
          <div className="relative max-h-[65vh] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex items-center justify-between rounded-2xl border px-4 py-4 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(251,248,243,0.70)",
                    boxShadow: "0 14px 40px rgba(42,30,26,0.08)",
                  }}
                >
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-medium" style={{ color: ESPRESSO }}>
                      {lang === "es" ? service.nameEs : service.nameEn}
                    </h4>
                    <p className="mt-1 text-xs" style={{ color: TAUPE }}>
                      {service.duration} ·{" "}
                      {lang === "es" ? "Servicio profesional" : "Professional service"}
                    </p>

                    {/* Optional subtle chip */}
                    <div className="mt-2 inline-flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: ROSE, opacity: 0.8 }}
                      />
                      <span className="text-[11px]" style={{ color: COCOA }}>
                        {lang === "es" ? "Selección rápida" : "Quick add"}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      onAddService(service);
                      onClose();
                    }}
                    size="sm"
                    className="h-9 w-9 rounded-full p-0"
                    style={{
                      backgroundColor: ROSE,
                      color: "#FFFFFF",
                      boxShadow: "0 14px 40px rgba(195,154,139,0.28)",
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade (cream) */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(255,252,248,0.98), rgba(255,252,248,0.00))`,
            }}
          />

          {/* Thin bottom line */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    </>
  );
}