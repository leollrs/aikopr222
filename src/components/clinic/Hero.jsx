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
    micro: "Resultados naturales • Atención profesional",
  },
  en: {
    badge: "PREMIUM AESTHETICS CLINIC",
    title: "Advanced Aesthetics\n& Laser Treatments",
    subtitle: "Premium aesthetic services\nin the comfort of your home",
    cta1: "Book Appointment",
    cta2: "View Services",
    micro: "Natural results • Professional care",
  },
};

export default function Hero({ lang = "es", onBookClick, onServicesClick }) {
  const t = heroContent[lang] || heroContent.es;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* TRUE full-bleed background */}
      <div className="absolute inset-0 bg-[#0C0908]" />

      <SilkBackground
        className="absolute inset-0 h-full w-full"
        theme={{
          bg0: "#0C0908",
          bg1: "#1A1310",
          bg2: "#0C0908",
          silkR: 214,
          silkG: 185,
          silkB: 140,
          vignetteInner: "rgba(0,0,0,0.15)",
          vignetteOuter: "rgba(0,0,0,0.85)",
        }}
      />

      {/* Cinematic vignette (single, controlled) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_35%,rgba(214,185,140,0.08),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#D6B98C]" />
            <span className="text-[11px] tracking-[0.28em] text-white/80 font-semibold uppercase">
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              mt-8 whitespace-pre-line text-balance
              font-light leading-[0.98] tracking-[-0.055em]
              text-[#F5EFE6]
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            "
            style={{ textShadow: "0 12px 50px rgba(0,0,0,0.75)" }}
          >
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="mt-8 whitespace-pre-line text-base sm:text-lg md:text-xl text-[#F5EFE6]/70 leading-relaxed">
            {t.subtitle}
          </p>

          {/* Divider */}
          <div className="mt-10 h-px w-28 bg-[#D6B98C]/35" />

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={onBookClick}
              className="
                h-12 rounded-xl bg-[#B07A7A] text-white px-8 text-[15px] font-medium
                shadow-[0_20px_60px_rgba(176,122,122,0.30)]
                hover:bg-[#9A6969]
              "
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              onClick={onServicesClick}
              variant="outline"
              className="
                h-12 rounded-xl border-white/20 bg-white/5 text-white/90
                px-8 text-[15px] font-medium hover:bg-white/10
              "
            >
              {t.cta2}
            </Button>
          </div>

          {/* Micro */}
          <p className="mt-8 text-xs tracking-[0.26em] uppercase text-white/45">
            {t.micro}
          </p>
        </div>
      </div>
    </section>
  );
}