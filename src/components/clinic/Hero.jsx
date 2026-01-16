import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

const content = {
  es: {
    badge: "Tratamientos premium a domicilio",
    title: "Belleza avanzada con tecnología láser de última generación",
    subtitle:
      "Tratamientos estéticos certificados diseñados para realzar tu belleza natural. Servicio móvil profesional en Puerto Rico.",
    cta1: "Agendar cita",
    cta2: "Ver servicios",
    microproof: ["Atención a domicilio", "Resultados naturales", "Equipos profesionales"],
  },
  en: {
    badge: "Premium at-home treatments",
    title: "Advanced aesthetics with state-of-the-art laser technology",
    subtitle:
      "Certified aesthetic treatments designed to enhance your natural beauty. Professional mobile service in Puerto Rico.",
    cta1: "Book appointment",
    cta2: "View services",
    microproof: ["Home service", "Natural results", "Professional equipment"],
  },
};

export default function Hero({ lang = "es", onBookClick, onViewServices }) {
  const t = content[lang] || content.es;

  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean luxury background - subtle gradient only */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1400px 700px at 50% 20%, rgba(201,174,126,0.08), transparent 70%),
            radial-gradient(1200px 600px at 80% 50%, rgba(195,154,139,0.05), transparent 65%),
            linear-gradient(to bottom, #FBF8F3, #F1E8DD 50%, #FBF8F3)
          `,
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div
            className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border px-6 py-2.5 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.85)",
              borderColor: "rgba(42,30,26,0.08)",
              boxShadow: "0 4px 16px rgba(42,30,26,0.04)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: CHAMPAGNE }} />
            <span
              className="text-xs font-medium uppercase tracking-[0.24em]"
              style={{ color: COCOA }}
            >
              {t.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.08] mb-8 text-balance"
            style={{ color: ESPRESSO }}
          >
            {t.title}
          </h1>

          {/* Subtitle */}
          <p
            className="font-body mx-auto max-w-xl text-lg md:text-xl leading-relaxed mb-12"
            style={{ color: COCOA, opacity: 0.92 }}
          >
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              onClick={onBookClick}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group h-16 px-10 rounded-2xl text-base font-medium transition-all duration-300 flex items-center gap-3"
              style={{
                backgroundColor: ROSE,
                color: "#FFFFFF",
                boxShadow: "0 20px 60px rgba(195,154,139,0.28)",
              }}
            >
              <Calendar className="h-5 w-5" />
              <span>{t.cta1}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              onClick={onViewServices}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="h-16 px-10 rounded-2xl text-base font-medium border transition-all duration-300"
              style={{
                backgroundColor: "rgba(251,248,243,0.85)",
                borderColor: "rgba(42,30,26,0.12)",
                color: ESPRESSO,
                backdropFilter: "blur(12px)",
              }}
            >
              {t.cta2}
            </motion.button>
          </div>

          {/* Microproof */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm" style={{ color: TAUPE }}>
            {t.microproof.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CHAMPAGNE }} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          backgroundImage: "linear-gradient(to right, transparent, rgba(201,174,126,0.4), transparent)",
        }}
      />
    </section>
  );
}