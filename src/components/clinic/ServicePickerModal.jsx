import React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllServices } from "./ServicesSection";

// Pick localized string from { es, en } object
function pick(obj, lang = "es", fallback = "") {
  if (!obj) return fallback;
  if (typeof obj === "string") return obj;
  return lang === "en" ? obj.en ?? obj.es ?? fallback : obj.es ?? obj.en ?? fallback;
}

export default function ServicePickerModal({
  isOpen,
  onClose,
  lang,
  onAddService,
}) {
  if (!isOpen) return null;

  const services = getAllServices();

  // PALETTE
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(42,30,26,0.26)" }}
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center md:p-6">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl md:rounded-3xl shadow-[0_40px_120px_rgba(42,30,26,0.20)]"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            border: "1px solid rgba(42,30,26,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_50%_0%,rgba(201,174,126,0.22),transparent_60%)]" />

          {/* Header */}
          <div
            className="relative flex items-center justify-center border-b px-6 py-4"
            style={{
              borderColor: "rgba(42,30,26,0.10)",
              backgroundColor: "rgba(251,248,243,0.80)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: CHAMPAGNE }}
              />
              <h3
                className="text-lg font-medium tracking-[-0.01em]"
                style={{ color: ESPRESSO }}
              >
                {lang === "es" ? "Agregar servicio" : "Add service"}
              </h3>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 rounded-full border p-2 transition"
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
          <div className="relative max-h-[65vh] overflow-y-auto px-6 py-8">
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex items-center justify-between rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(42,30,26,0.10)",
                    backgroundColor: "rgba(251,248,243,0.72)",
                    boxShadow: "0 14px 40px rgba(42,30,26,0.08)",
                  }}
                >
                  {/* Text */}
                  <div className="min-w-0">
                    <h4
                      className="truncate text-sm font-medium"
                      style={{ color: ESPRESSO }}
                    >
                      {pick(service.name, lang)}
                    </h4>

                    <p className="mt-1 text-xs" style={{ color: TAUPE }}>
                      ${service.price}
                      {service.duration && pick(service.duration, lang) !== "—" && ` · ${pick(service.duration, lang)}`}
                    </p>
                  </div>

                  {/* Action */}
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
                      boxShadow:
                        "0 14px 40px rgba(195,154,139,0.28)",
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(255,252,248,0.98), transparent)",
            }}
          />

          {/* Divider */}
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