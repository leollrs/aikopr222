import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddedModal({
  isOpen,
  onClose,
  onAddMore,
  onContinue,
  lang,
  serviceName,
}) {
  if (!isOpen) return null;

  // NEW PALETTE
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <>
      {/* Backdrop (no black, still premium) */}
      <div
        className="fixed inset-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: "rgba(42,30,26,0.28)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-sm overflow-hidden rounded-3xl border p-7 text-center shadow-[0_40px_120px_rgba(42,30,26,0.30)] backdrop-blur-xl"
          style={{
            backgroundColor: "rgba(255,252,248,0.92)",
            borderColor: "rgba(42,30,26,0.10)",
          }}
        >
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_70%_0%,rgba(201,174,126,0.22),transparent_58%),radial-gradient(700px_360px_at_20%_20%,rgba(195,154,139,0.14),transparent_62%),linear-gradient(to_bottom,rgba(251,248,243,0.75),rgba(241,232,221,0.70))]" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border p-2 transition"
            style={{
              borderColor: "rgba(42,30,26,0.12)",
              backgroundColor: "rgba(255,252,248,0.70)",
            }}
            aria-label={lang === "es" ? "Cerrar" : "Close"}
          >
            <X className="h-4 w-4" style={{ color: ESPRESSO }} />
          </button>

          <div className="relative">
            {/* Success icon */}
            <div
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border shadow-[0_18px_45px_rgba(42,30,26,0.10)]"
              style={{
                borderColor: "rgba(42,30,26,0.10)",
                backgroundColor: "rgba(241,232,221,0.55)",
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(201,174,126,0.20)" }}
              >
                <Check className="h-7 w-7" style={{ color: ESPRESSO }} />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-lg font-medium tracking-[-0.01em]"
              style={{ color: ESPRESSO }}
            >
              {lang === "es" ? "¡Servicio agregado!" : "Service added!"}
            </h3>

            {/* Service name */}
            <p className="mt-2 text-sm" style={{ color: COCOA }}>
              {serviceName}
            </p>

            {/* Prompt */}
            <p className="mt-5 text-sm leading-relaxed" style={{ color: COCOA }}>
              {lang === "es"
                ? "¿Deseas agregar otro servicio?"
                : "Would you like to add another service?"}
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3">
              <Button
                onClick={onAddMore}
                variant="outline"
                className="h-11 w-full rounded-xl font-medium transition"
                style={{
                  borderColor: "rgba(42,30,26,0.18)",
                  backgroundColor: "rgba(255,252,248,0.65)",
                  color: ESPRESSO,
                }}
              >
                {lang === "es" ? "Agregar otro" : "Add another"}
              </Button>

              <Button
                onClick={onContinue}
                className="h-11 w-full rounded-xl font-medium transition"
                style={{
                  backgroundColor: ROSE,
                  color: "#FFFFFF",
                  boxShadow: "0 18px 55px rgba(195,154,139,0.35)",
                }}
              >
                {lang === "es" ? "Continuar a reserva" : "Continue to booking"}
              </Button>
            </div>

            {/* Divider */}
            <div
              className="mt-8 h-px w-full"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}