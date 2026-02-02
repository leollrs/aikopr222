import React from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Same premium palette we’re using across pages
const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  sand: "#E7D8C7",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  taupe: "#8B7468",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  lang,
  onRemove,
  onClear,
  onContinue,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(42,30,26,0.45)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-hidden border-l shadow-[0_50px_140px_rgba(42,30,26,0.35)]"
        style={{
          backgroundColor: "rgba(255,252,248,0.92)",
          borderColor: "rgba(42,30,26,0.10)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        {/* Subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_10%,rgba(201,174,126,0.18),transparent_55%),radial-gradient(900px_420px_at_80%_30%,rgba(195,154,139,0.12),transparent_60%)]" />

        {/* Header */}
        <div
          className="relative flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "rgba(42,30,26,0.10)" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{
                backgroundColor: "rgba(241,232,221,0.65)",
                borderColor: "rgba(42,30,26,0.10)",
              }}
            >
              <ShoppingBag className="h-4 w-4" style={{ color: PALETTE.espresso }} />
            </div>
            <div>
              <h3 className="text-lg font-medium" style={{ color: PALETTE.espresso }}>
                {lang === "es" ? "Tu Selección" : "Your Selection"}
              </h3>
              <p className="text-xs" style={{ color: PALETTE.taupe }}>
                {lang === "es"
                  ? "Servicios seleccionados para tu cita"
                  : "Selected services for your appointment"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition"
            style={{
              backgroundColor: "rgba(255,252,248,0.70)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
            aria-label={lang === "es" ? "Cerrar" : "Close"}
          >
            <X className="h-5 w-5" style={{ color: PALETTE.cocoa }} />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="py-14 text-center">
              <div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border"
                style={{
                  backgroundColor: "rgba(241,232,221,0.60)",
                  borderColor: "rgba(42,30,26,0.10)",
                }}
              >
                <ShoppingBag className="h-7 w-7" style={{ color: PALETTE.champagne }} />
              </div>

              <p className="text-sm" style={{ color: PALETTE.cocoa }}>
                {lang === "es" ? "No hay servicios seleccionados." : "No services selected."}
              </p>
              <p className="mt-2 text-xs" style={{ color: PALETTE.taupe }}>
                {lang === "es"
                  ? "Explora servicios y agrega los que te interesen."
                  : "Browse services and add what you need."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((service, idx) => {
                const serviceName = typeof service.name === 'string' 
                  ? service.name 
                  : (lang === 'es' ? service.name?.es : service.name?.en) || service.name?.es || '';
                const serviceDuration = typeof service.duration === 'string'
                  ? service.duration
                  : (lang === 'es' ? service.duration?.es : service.duration?.en) || service.duration?.es || '';

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    className="group flex items-start justify-between rounded-2xl border p-4 transition"
                    style={{
                      backgroundColor: "rgba(241,232,221,0.60)",
                      borderColor: "rgba(42,30,26,0.08)",
                      boxShadow: "0 18px 55px rgba(42,30,26,0.08)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium" style={{ color: PALETTE.espresso }}>
                        {serviceName}
                      </h4>
                      <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: PALETTE.cocoa }}>
                        {serviceDuration && serviceDuration !== "—" && <span>{serviceDuration}</span>}
                        {serviceDuration && serviceDuration !== "—" && service.price && <span>•</span>}
                        {service.price && <span className="font-medium">${service.price}</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemove(idx)}
                      className="ml-3 inline-flex h-10 w-10 items-center justify-center rounded-full border transition shrink-0"
                      style={{
                        backgroundColor: "rgba(255,252,248,0.70)",
                        borderColor: "rgba(42,30,26,0.10)",
                      }}
                      aria-label={lang === "es" ? "Eliminar" : "Remove"}
                    >
                      <Trash2 className="h-4 w-4" style={{ color: PALETTE.rose }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            className="relative px-6 py-5 border-t space-y-3"
            style={{ borderColor: "rgba(42,30,26,0.10)" }}
          >
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: PALETTE.cocoa }}>
                {lang === "es" ? "Servicios" : "Services"}
              </span>
              <span className="font-medium" style={{ color: PALETTE.espresso }}>
                {cart.length}
              </span>
            </div>

            <Button
              onClick={onContinue}
              className="w-full h-11 rounded-2xl font-medium transition"
              style={{
                backgroundColor: PALETTE.rose,
                color: "#FFFFFF",
                boxShadow: "0 22px 70px rgba(195,154,139,0.28)",
              }}
            >
              {lang === "es" ? "Continuar a reserva" : "Continue to booking"}
            </Button>

            <Button
              onClick={onClear}
              variant="outline"
              className="w-full h-11 rounded-2xl text-sm font-medium transition"
              style={{
                backgroundColor: "rgba(255,252,248,0.55)",
                borderColor: "rgba(42,30,26,0.16)",
                color: PALETTE.cocoa,
              }}
            >
              {lang === "es" ? "Limpiar selección" : "Clear selection"}
            </Button>

            <p className="pt-1 text-[11px] text-center" style={{ color: PALETTE.taupe }}>
              {lang === "es"
                ? "Te confirmaremos por mensaje una vez completes la solicitud."
                : "We’ll confirm by message once you complete your request."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}