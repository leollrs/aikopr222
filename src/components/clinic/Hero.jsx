import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, UserCheck, Leaf } from "lucide-react";
import { SilkBackground } from "@/components/ui/silk-background-animation";

const heroContent = {
  es: {
    brand: "AIKOPR222",
    badge: "CLÍNICA ESTÉTICA PREMIUM",
    title: "Estética Avanzada\n& Tratamientos Láser",
    subtitle:
      "Depilación láser, tratamientos faciales y rejuvenecimiento con tecnología avanzada. Resultados naturales, atención profesional.",
    cta1: "Agendar Cita",
    cta2: "Ver Servicios",
    chips: [
      { icon: UserCheck, text: "Evaluación personalizada" },
      { icon: Cpu, text: "Tecnología avanzada" },
      { icon: Sparkles, text: "Cuidado profesional" },
      { icon: Leaf, text: "Resultados naturales" },
    ],
  },
  en: {
    brand: "AIKOPR222",
    badge: "PREMIUM AESTHETICS CLINIC",
    title: "Advanced Aesthetics\n& Laser Treatments",
    subtitle:
      "Laser hair removal, facial treatments, and advanced rejuvenation. Natural-looking results with professional care.",
    cta1: "Book Appointment",
    cta2: "View Services",
    chips: [
      { icon: UserCheck, text: "Personalized evaluation" },
      { icon: Cpu, text: "Advanced technology" },
      { icon: Sparkles, text: "Professional care" },
      { icon: Leaf, text: "Natural results" },
    ],
  },
};

export default function Hero({ lang = "es", onBookClick, onServicesClick }) {
  const t = heroContent[lang] || heroContent.es;

  return (
    <section className="relative overflow-hidden">
      {/* DARK, LUXURY BACKGROUND */}
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
          vignetteOuter: "rgba(0,0,0,0.55)",
        }}
      />

      {/* CONTROLLED OVERLAY */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_25%_20%,rgba(176,122,122,0.18),transparent_60%),radial-gradient(900px_520px_at_80%_10%,rgba(199,174,134,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="min-h-[92vh] py-16 sm:py-20 lg:py-24 flex items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12">
            {/* LEFT */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#F4EEE6]/92 p-7 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_20%,rgba(199,174,134,0.18),transparent_55%),radial-gradient(800px_420px_at_70%_10%,rgba(176,122,122,0.16),transparent_55%)]" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm tracking-[0.22em] text-[#241814] font-medium uppercase">
                      {t.brand}
                    </div>

                    <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[rgba(36,24,20,0.14)] bg-white/60 px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-[#C7AE86]" />
                      <span className="text-[11px] tracking-[0.22em] text-[#6E5B50] font-semibold uppercase">
                        {t.badge}
                      </span>
                    </div>
                  </div>

                  <h1 className="mt-6 whitespace-pre-line text-balance font-light leading-[1.02] tracking-[-0.04em] text-[#241814] text-4xl sm:text-5xl lg:text-6xl">
                    {t.title}
                  </h1>

                  <p className="mt-5 max-w-2xl text-pretty text-[#6E5B50] leading-relaxed text-base sm:text-lg">
                    {t.subtitle}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={onBookClick}
                      className="group h-12 rounded-xl bg-[#241814] text-[#FFFCF8] px-6 text-[15px] font-medium shadow-[0_14px_40px_rgba(36,24,20,0.25)] hover:bg-[#1A110E]"
                    >
                      {t.cta1}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>

                    <Button
                      onClick={onServicesClick}
                      variant="outline"
                      className="h-12 rounded-xl border-[rgba(36,24,20,0.20)] bg-white/50 text-[#241814] px-6 text-[15px] font-medium hover:bg-white/70"
                    >
                      {t.cta2}
                    </Button>
                  </div>

                  <div className="mt-5 text-sm text-[#6E5B50]">
                    <span className="font-semibold text-[#241814]">
                      {lang === "es" ? "Depósito fijo:" : "Fixed deposit:"}
                    </span>{" "}
                    $30 <span className="mx-2 text-[#C7AE86]">•</span>{" "}
                    {lang === "es"
                      ? "Confirmación por mensaje"
                      : "Confirmation by text"}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                    {t.chips.map((chip, idx) => {
                      const Icon = chip.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-xl border border-[rgba(36,24,20,0.10)] bg-white/55 px-4 py-3"
                        >
                          <Icon className="h-4 w-4 text-[#C7AE86]" />
                          <span className="text-[13px] text-[#6E5B50]">
                            {chip.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT (desktop only) */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)] z-10" />
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1600&q=80"
                  alt="Aesthetic clinic"
                  className="h-[540px] w-full object-cover"
                />
                <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-white">
                        {lang === "es" ? "Agenda en minutos" : "Book in minutes"}
                      </div>
                      <div className="mt-1 text-xs text-white/75">
                        {lang === "es"
                          ? "Selecciona servicio → elige horario → depósito $30"
                          : "Choose service → pick a slot → $30 deposit"}
                      </div>
                    </div>
                    <div className="rounded-full bg-[#C7AE86]/25 px-3 py-1 text-xs font-semibold text-white">
                      Premium
                    </div>
                  </div>
                </div>
                <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[#C7AE86]/25 blur-3xl z-0" />
                <div className="absolute -left-24 -bottom-24 h-60 w-60 rounded-full bg-[#B07A7A]/20 blur-3xl z-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.65),transparent)]" />
    </section>
  );
}