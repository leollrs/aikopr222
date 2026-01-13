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

  // NEW PALETTE (shared)
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed premium light base */}
      <div className="absolute inset-0" style={{ backgroundColor: CREAM }} />

      {/* Silk background tuned to warm, airy clinic look (no black) */}
      <SilkBackground
        className="absolute inset-0 h-full w-full opacity-[0.95]"
        theme={{
          // airy gradient (cream -> linen -> cream)
          bg0: CREAM,
          bg1: LINEN,
          bg2: CREAM,
          // warm champagne silk tint
          silkR: 201,
          silkG: 174,
          silkB: 126,
          // soft vignette for depth (not dark)
          vignetteInner: "rgba(42,30,26,0.04)",
          vignetteOuter: "rgba(42,30,26,0.14)",
        }}
      />

      {/* Controlled premium overlays: warmth + subtle contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_50%_28%,rgba(201,174,126,0.22),transparent_60%),radial-gradient(900px_520px_at_18%_48%,rgba(195,154,139,0.14),transparent_62%),linear-gradient(to_bottom,rgba(251,248,243,0.55),rgba(241,232,221,0.62),rgba(251,248,243,0.70))]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.72)",
              borderColor: "rgba(42,30,26,0.12)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CHAMPAGNE }}
            />
            <span
              className="text-[11px] tracking-[0.28em] font-semibold uppercase"
              style={{ color: COCOA }}
            >
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              mt-8 whitespace-pre-line text-balance
              font-light leading-[0.98] tracking-[-0.055em]
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            "
            style={{
              color: ESPRESSO,
              textShadow: "0 18px 60px rgba(42,30,26,0.18)",
            }}
          >
            {t.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-7 whitespace-pre-line text-base sm:text-lg md:text-xl leading-relaxed"
            style={{ color: COCOA }}
          >
            {t.subtitle}
          </p>

          {/* Divider */}
          <div
            className="mt-10 h-px w-28"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${CHAMPAGNE}, transparent)`,
              opacity: 0.65,
            }}
          />

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Button
              onClick={onBookClick}
              className="h-12 rounded-xl px-8 text-[15px] font-medium"
              style={{
                backgroundColor: ROSE,
                color: "#FFFFFF",
                boxShadow: "0 22px 70px rgba(195,154,139,0.35)",
              }}
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              onClick={onServicesClick}
              variant="outline"
              className="h-12 rounded-xl px-8 text-[15px] font-medium"
              style={{
                backgroundColor: "rgba(255,252,248,0.55)",
                borderColor: "rgba(42,30,26,0.18)",
                color: ESPRESSO,
              }}
            >
              {t.cta2}
            </Button>
          </div>

          {/* Micro */}
          <p
            className="mt-8 text-xs tracking-[0.26em] uppercase"
            style={{ color: TAUPE }}
          >
            {t.micro}
          </p>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(201,174,126,0.70),transparent)]" />
    </section>
  );
}