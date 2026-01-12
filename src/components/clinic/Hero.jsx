import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SilkBackground } from "@/components/ui/silk-background-animation";

const heroContent = {
  es: {
    badge: "CLÍNICA ESTÉTICA PREMIUM",
    title: "Estética Avanzada\n& Tratamientos Láser",
    subtitle: "Servicio estético premium\nen la comodidad de tu hogar",
    cta1: "Agendar Cita",
    cta2: "Ver Servicios",
  },
  en: {
    badge: "PREMIUM AESTHETICS CLINIC",
    title: "Advanced Aesthetics\n& Laser Treatments",
    subtitle: "Premium aesthetic services\nin the comfort of your home",
    cta1: "Book Appointment",
    cta2: "View Services",
  },
};

export default function Hero({ lang = "es", onBookClick, onServicesClick }) {
  const t = heroContent[lang] || heroContent.es;

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Full-bleed silk background (Option A) */}
      <div className="absolute inset-0 bg-[#0E0A08]" />
      <SilkBackground
        className="absolute inset-0 h-full w-full opacity-[0.95]"
        theme={{
          bg0: "#0B0706",
          bg1: "#1A110E",
          bg2: "#0B0706",
          // warm champagne silk tint
          silkR: 225,
          silkG: 200,
          silkB: 160,
          vignetteInner: "rgba(0,0,0,0.10)",
          vignetteOuter: "rgba(0,0,0,0.72)",
        }}
      />

      {/* Minimal overlays for legibility + luxury depth */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_30%,rgba(199,174,134,0.10),transparent_60%),radial-gradient(900px_520px_at_20%_15%,rgba(176,122,122,0.08),transparent_62%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

      {/* Centered editorial content (NO CARD) */}
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <div className="min-h-[92vh] flex items-center justify-center text-center">
          <div className="w-full max-w-4xl">
            {/* Badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#C7AE86]" />
              <span className="text-[11px] tracking-[0.28em] text-white/80 font-semibold uppercase">
                {t.badge}
              </span>
            </div>

            {/* Title (dominant) */}
            <h1
              className="
                mt-8 whitespace-pre-line text-balance
                font-light leading-[0.98] tracking-[-0.055em]
                text-[#F7F1E8]
                text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              "
              style={{
                textShadow: "0 10px 40px rgba(0,0,0,0.55)",
              }}
            >
              {t.title}
            </h1>

            {/* Subtitle (2 lines, premium, mobile service) */}
            <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-pretty text-base sm:text-lg md:text-xl text-white/72 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Thin divider like the silk demo */}
            <div className="mx-auto mt-10 h-px w-28 bg-white/20" />

            {/* CTAs (kept, but calm) */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={onBookClick}
                className="
                  group h-12 w-full sm:w-auto rounded-xl
                  bg-[#B07A7A] text-white px-8 text-[15px] font-medium
                  shadow-[0_18px_55px_rgba(176,122,122,0.22)]
                  hover:bg-[#9A6969]
                "
              >
                {t.cta1}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>

              <Button
                onClick={onServicesClick}
                variant="outline"
                className="
                  h-12 w-full sm:w-auto rounded-xl
                  border-white/20 bg-white/5 text-white/90
                  px-8 text-[15px] font-medium
                  hover:bg-white/10
                "
              >
                {t.cta2}
              </Button>
            </div>

            {/* Micro text line (optional, no money) */}
            <p className="mt-8 text-xs tracking-[0.24em] uppercase text-white/40">
              {lang === "es"
                ? "Resultados naturales • Atención profesional"
                : "Natural results • Professional care"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom highlight line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.55),transparent)]" />
    </section>
  );
}