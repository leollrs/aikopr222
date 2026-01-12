import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SilkBackground } from "@/components/ui/silk-background-animation";

const heroContent = {
  es: {
    badge: "CLÍNICA ESTÉTICA PREMIUM",
    title: "Estética Avanzada\n& Tratamientos Láser",
    subtitle:
      "Depilación láser, tratamientos faciales y rejuvenecimiento con tecnología avanzada.",
    micro: "Resultados naturales • Atención profesional • Depósito fijo $30",
    cta1: "Agendar Cita",
    cta2: "Ver Servicios",
  },
  en: {
    badge: "PREMIUM AESTHETICS CLINIC",
    title: "Advanced Aesthetics\n& Laser Treatments",
    subtitle:
      "Laser hair removal, facial treatments, and advanced rejuvenation with advanced technology.",
    micro: "Natural results • Professional care • Fixed $30 deposit",
    cta1: "Book Appointment",
    cta2: "View Services",
  },
};

export default function Hero({ lang = "es", onBookClick, onServicesClick }) {
  const t = heroContent[lang] || heroContent.es;

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1B1210]" />
      <SilkBackground
        className="absolute inset-0 h-full w-full opacity-[0.92]"
        theme={{
          bg0: "#140E0C",
          bg1: "#241814",
          bg2: "#140E0C",
          silkR: 210,
          silkG: 185,
          silkB: 145,
          vignetteInner: "rgba(0,0,0,0.05)",
          vignetteOuter: "rgba(0,0,0,0.60)",
        }}
      />

      {/* Accent overlay (keep subtle so it feels premium) */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_20%,rgba(199,174,134,0.16),transparent_58%),radial-gradient(900px_520px_at_20%_35%,rgba(176,122,122,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="min-h-[92vh] py-16 sm:py-20 lg:py-24 flex items-center justify-center">
          {/* Centered card */}
          <div className="w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#F4EEE6]/88 px-7 py-12 sm:px-12 sm:py-16 shadow-[0_36px_110px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              {/* Inner glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_10%,rgba(199,174,134,0.18),transparent_55%),radial-gradient(900px_420px_at_20%_50%,rgba(176,122,122,0.10),transparent_60%)]" />

              <div className="relative text-center">
                {/* Badge */}
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[rgba(36,24,20,0.14)] bg-white/55 px-5 py-2 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#C7AE86]" />
                  <span className="text-[11px] tracking-[0.26em] text-[#6E5B50] font-semibold uppercase">
                    {t.badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mt-8 whitespace-pre-line text-balance font-light leading-[1.02] tracking-[-0.05em] text-[#241814] text-4xl sm:text-5xl lg:text-6xl">
                  {t.title}
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-[#6E5B50] leading-relaxed text-base sm:text-lg">
                  {t.subtitle}
                </p>

                {/* Micro line */}
                <p className="mx-auto mt-5 max-w-xl text-sm text-[#6E5B50]">
                  {t.micro}
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    onClick={onBookClick}
                    className="group h-12 w-full sm:w-auto rounded-xl bg-[#241814] text-[#FFFCF8] px-8 text-[15px] font-medium shadow-[0_14px_45px_rgba(36,24,20,0.28)] hover:bg-[#1A110E]"
                  >
                    {t.cta1}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>

                  <Button
                    onClick={onServicesClick}
                    variant="outline"
                    className="h-12 w-full sm:w-auto rounded-xl border-[rgba(36,24,20,0.22)] bg-white/45 text-[#241814] px-8 text-[15px] font-medium hover:bg-white/70"
                  >
                    {t.cta2}
                  </Button>
                </div>

                {/* Divider (subtle) */}
                <div className="mt-12 h-px w-full bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.55),transparent)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.65),transparent)]" />
    </section>
  );
}