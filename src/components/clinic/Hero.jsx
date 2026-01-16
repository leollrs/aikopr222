import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Award,
} from "lucide-react";

const content = {
  es: {
    badge: "Estética premium • Servicio móvil en Puerto Rico",
    title: "Experiencia clínica de lujo, resultados visibles",
    subtitle:
      "Tratamientos estéticos avanzados con protocolos profesionales y tecnología láser para realzar tu belleza natural—desde la comodidad de tu hogar.",
    cta1: "Agendar cita",
    cta2: "Ver servicios",
    microproof: ["Servicio a domicilio", "Protocolos profesionales", "Resultados naturales"],
    trust: ["Tratamientos certificados", "Atención 1:1", "Equipo profesional"],

    // ✅ bilingual label + premium pill
    signatureLabel: "Tratamiento Signature",
    premium: "Premium",

    cardName: "Láser Rejuvenation",
    cardDesc:
      "Sesión personalizada para mejorar textura, tono y luminosidad. Plan diseñado según tu piel.",
    cardMeta1: "60–75 min",
    cardMeta2: "Desde $99",
    cardNote: "Consulta inicial incluida",
    checkAvailability: "Consultar disponibilidad",
  },
  en: {
    badge: "Premium aesthetics • Mobile service in Puerto Rico",
    title: "Clinical-grade luxury, visible results",
    subtitle:
      "Advanced aesthetic treatments with professional protocols and laser technology—designed to enhance your natural beauty from the comfort of your home.",
    cta1: "Book appointment",
    cta2: "View services",
    microproof: ["At-home service", "Professional protocols", "Natural results"],
    trust: ["Certified treatments", "1:1 care", "Pro equipment"],

    // ✅ bilingual label + premium pill
    signatureLabel: "Signature Treatment",
    premium: "Premium",

    cardName: "Laser Rejuvenation",
    cardDesc:
      "A tailored session to improve texture, tone, and glow. Your plan is designed around your skin.",
    cardMeta1: "60–75 min",
    cardMeta2: "From $___",
    cardNote: "Initial consult included",
    checkAvailability: "Check availability",
  },
};

export default function Hero({
  lang = "es",
  onBookClick,
  onViewServices,

  // cart hook-in
  onAddService,
  signatureService,
}) {
  const t = content[lang] || content.es;

  // Palette
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  const handleCheckAvailability = () => {
    // add signature service to cart automatically
    if (onAddService && signatureService) onAddService(signatureService);
    // then proceed to booking flow
    if (onBookClick) onBookClick();
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1100px 620px at 20% 15%, rgba(201,174,126,0.16), transparent 65%),
            radial-gradient(900px 520px at 85% 35%, rgba(195,154,139,0.10), transparent 60%),
            radial-gradient(900px 520px at 50% 90%, rgba(42,30,26,0.06), transparent 70%),
            linear-gradient(to bottom, ${CREAM}, ${LINEN} 55%, ${CREAM})
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% 30%, transparent 55%, rgba(42,30,26,0.08) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="min-h-screen flex items-center py-20 md:py-28">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left */}
            <motion.div
              className="lg:col-span-7 text-center lg:text-left"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2.5 rounded-full border px-6 py-2.5 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(255,252,248,0.78)",
                  borderColor: "rgba(42,30,26,0.10)",
                  boxShadow: "0 6px 24px rgba(42,30,26,0.05)",
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: CHAMPAGNE }} />
                <span
                  className="text-xs font-medium uppercase tracking-[0.22em]"
                  style={{ color: COCOA }}
                >
                  {t.badge}
                </span>
              </div>

              <h1
                className="mt-7 font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.035em] leading-[1.06] text-balance"
                style={{ color: ESPRESSO }}
              >
                {t.title}
              </h1>

              <p
                className="mt-6 max-w-xl mx-auto lg:mx-0 font-body text-lg md:text-xl leading-relaxed"
                style={{ color: COCOA, opacity: 0.92 }}
              >
                {t.subtitle}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <motion.button
                  onClick={onBookClick}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-16 px-10 rounded-2xl text-base font-medium transition-all duration-300 flex items-center gap-3"
                  style={{
                    backgroundColor: ROSE,
                    color: "#FFFFFF",
                    boxShadow: "0 24px 70px rgba(195,154,139,0.30)",
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  <span>{t.cta1}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  onClick={onViewServices}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-16 px-10 rounded-2xl text-base font-medium border transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(251,248,243,0.72)",
                    borderColor: "rgba(42,30,26,0.14)",
                    color: ESPRESSO,
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 10px 30px rgba(42,30,26,0.06)",
                  }}
                >
                  {t.cta2}
                </motion.button>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
                {t.trust.map((label, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(255,252,248,0.62)",
                      borderColor: "rgba(42,30,26,0.10)",
                      color: TAUPE,
                    }}
                  >
                    {idx === 0 && <Award className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    {idx === 1 && <ShieldCheck className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    {idx === 2 && <MapPin className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Signature card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
            >
              <div className="relative mx-auto max-w-md">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[2rem]"
                  style={{
                    background:
                      "radial-gradient(480px 280px at 50% 20%, rgba(201,174,126,0.22), transparent 70%)",
                    filter: "blur(10px)",
                    opacity: 0.9,
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-8"
                  style={{
                    backgroundColor: "rgba(255,252,248,0.78)",
                    borderColor: "rgba(42,30,26,0.12)",
                    boxShadow: "0 26px 80px rgba(42,30,26,0.10)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      {/* ✅ NOW bilingual */}
                      <span
                        className="text-xs font-medium uppercase tracking-[0.22em]"
                        style={{ color: COCOA }}
                      >
                        {t.signatureLabel}
                      </span>

                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: "rgba(201,174,126,0.14)",
                          color: ESPRESSO,
                        }}
                      >
                        <Sparkles className="h-3.5 w-3.5" style={{ color: CHAMPAGNE }} />
                        {t.premium}
                      </span>
                    </div>

                    <h3
                      className="mt-4 font-display text-2xl font-medium tracking-tight"
                      style={{ color: ESPRESSO }}
                    >
                      {t.cardName}
                    </h3>

                    <p
                      className="mt-3 text-base leading-relaxed"
                      style={{ color: COCOA, opacity: 0.92 }}
                    >
                      {t.cardDesc}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-sm" style={{ color: TAUPE }}>
                      <span className="font-medium">{t.cardMeta1}</span>
                      <span style={{ color: CHAMPAGNE }}>•</span>
                      <span className="font-semibold" style={{ color: ESPRESSO }}>
                        {t.cardMeta2}
                      </span>
                    </div>

                    <div
                      className="mt-6 rounded-2xl border px-4 py-3 text-sm"
                      style={{
                        borderColor: "rgba(42,30,26,0.10)",
                        backgroundColor: "rgba(251,248,243,0.65)",
                        color: TAUPE,
                      }}
                    >
                      <span className="font-medium" style={{ color: ESPRESSO }}>
                        {t.cardNote}
                      </span>
                      <span style={{ color: COCOA, opacity: 0.9 }}>
                        {" "}
                        • {lang === "es" ? "Recomendación personalizada" : "Personalized recommendation"}
                      </span>
                    </div>

                    <motion.button
                      onClick={handleCheckAvailability}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-7 w-full h-14 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: ESPRESSO,
                        color: CREAM,
                        boxShadow: "0 18px 50px rgba(42,30,26,0.22)",
                      }}
                    >
                      {t.checkAvailability}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          className="h-px w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)",
          }}
        />
      </div>
    </section>
  );
}