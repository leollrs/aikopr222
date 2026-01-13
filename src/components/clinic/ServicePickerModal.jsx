import React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "./ServicesSection";

export default function ServicePickerModal({
  isOpen,
  onClose,
  lang,
  onAddService,
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:inset-0 md:flex md:items-center md:justify-center md:p-6">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl md:rounded-3xl bg-[#FFFCF8]/95 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {/* Soft inner glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_0%,rgba(199,174,134,0.16),transparent_55%)]" />

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-[rgba(36,24,20,0.08)] px-6 py-4">
            <h3 className="text-lg font-medium tracking-[-0.01em] text-[#241814]">
              {lang === "es" ? "Agregar servicio" : "Add service"}
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-[#F4EEE6]"
            >
              <X className="h-5 w-5 text-[#6E5B50]" />
            </button>
          </div>

          {/* Services */}
          <div className="relative max-h-[65vh] overflow-y-auto px-6 py-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group flex items-center justify-between rounded-2xl border border-[rgba(36,24,20,0.08)] bg-white/60 px-4 py-4 shadow-[0_14px_40px_rgba(36,24,20,0.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(36,24,20,0.14)]"
                >
                  <div>
                    <h4 className="text-sm font-medium text-[#241814]">
                      {lang === "es" ? service.nameEs : service.nameEn}
                    </h4>
                    <p className="mt-1 text-xs text-[#6E5B50]">
                      {service.duration} ·{" "}
                      {lang === "es"
                        ? "Servicio profesional"
                        : "Professional service"}
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      onAddService(service);
                      onClose();
                    }}
                    size="sm"
                    className="h-9 w-9 rounded-full bg-[#241814] p-0 text-[#FFFCF8] shadow-[0_10px_28px_rgba(36,24,20,0.25)] transition hover:bg-[#1A110E]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,#FFFCF8,transparent)]" />
        </div>
      </div>
    </>
  );
}