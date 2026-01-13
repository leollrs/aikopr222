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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#FFFCF8]/95 p-7 text-center shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {/* Soft glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_70%_0%,rgba(199,174,134,0.18),transparent_58%),radial-gradient(700px_360px_at_25%_20%,rgba(176,122,122,0.12),transparent_62%)]" />

          {/* Close (top-right) */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-[rgba(36,24,20,0.12)] bg-white/45 p-2 transition hover:bg-white/70"
            aria-label={lang === "es" ? "Cerrar" : "Close"}
          >
            <X className="h-4 w-4 text-[#241814]" />
          </button>

          <div className="relative">
            {/* Success icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(36,24,20,0.10)] bg-[#241814]/5 shadow-[0_18px_45px_rgba(36,24,20,0.10)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C7AE86]/18">
                <Check className="h-7 w-7 text-[#241814]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-medium tracking-[-0.01em] text-[#241814]">
              {lang === "es" ? "¡Servicio agregado!" : "Service added!"}
            </h3>

            {/* Service name */}
            <p className="mt-2 text-sm text-[#6E5B50]">{serviceName}</p>

            {/* Prompt */}
            <p className="mt-5 text-sm leading-relaxed text-[#6E5B50]">
              {lang === "es"
                ? "¿Deseas agregar otro servicio?"
                : "Would you like to add another service?"}
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3">
              <Button
                onClick={onAddMore}
                variant="outline"
                className="h-11 w-full rounded-xl border-[rgba(36,24,20,0.18)] bg-white/45 font-medium text-[#241814] transition hover:bg-white/70"
              >
                {lang === "es" ? "Agregar otro" : "Add another"}
              </Button>

              <Button
                onClick={onContinue}
                className="h-11 w-full rounded-xl bg-[#241814] font-medium text-[#FFFCF8] shadow-[0_14px_40px_rgba(36,24,20,0.25)] transition hover:bg-[#1A110E]"
              >
                {lang === "es" ? "Continuar a reserva" : "Continue to booking"}
              </Button>
            </div>

            {/* Subtle divider */}
            <div className="mt-8 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.55),transparent)]" />
          </div>
        </div>
      </div>
    </>
  );
}