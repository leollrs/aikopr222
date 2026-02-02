import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, MapPin, Award } from "lucide-react";

const content = {
  es: {
    badge: "Estética premium • Servicio móvil en Puerto Rico",
    title: "Experiencia clínica de lujo, resultados visibles",
    subtitle:
      "Tratamientos estéticos avanzados con protocolos profesionales y tecnología láser para realzar tu belleza natural—desde la comodidad de tu hogar.",
    cta1: "Agendar cita",
    cta2: "Ver servicios",
    trust: ["Tratamientos certificados", "Atención 1:1", "Equipo profesional"],
    signatureLabel: "Tratamiento Signature",
    premium: "Premium",
    cardNote: "Consulta inicial incluida",
    checkAvailability: "Añadir Servicio",
    rec: "Recomendación personalizada",
    priceLabel: "Precio:",
    durationLabel: "Duración:",
    fromLabel: "Desde",
  },
  en: {
    badge: "Premium aesthetics • Mobile service in Puerto Rico",
    title: "Clinical-grade luxury, visible results",
    subtitle:
      "Advanced aesthetic treatments with professional protocols and laser technology—designed to enhance your natural beauty from the comfort of your home.",
    cta1: "Book appointment",
    cta2: "View services",
    trust: ["Certified treatments", "1:1 care", "Pro equipment"],
    signatureLabel: "Signature Treatment",
    premium: "Premium",
    cardNote: "Initial consult included",
    checkAvailability: "Add Service",
    rec: "Personalized recommendation",
    priceLabel: "Price:",
    durationLabel: "Duration:",
    fromLabel: "From",
  },
};

// ---------- helpers ----------
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function rand(a, b) {
  return Math.random() * (b - a) + a;
}
function pick(obj, lang = "es", fallback = "") {
  if (!obj) return fallback;
  return lang === "en" ? obj.en ?? obj.es ?? fallback : obj.es ?? obj.en ?? fallback;
}
function money(n) {
  if (typeof n !== "number") return "";
  if (n <= 0) return "";
  return `$${n}`;
}
// duration can be "—" or {es,en} or string
function durationText(d, lang = "es") {
  if (!d) return "";
  if (typeof d === "string") return d;
  return pick(d, lang, "");
}

export default function Hero({
  lang = "es",
  onBookClick,
  onViewServices,
  onAddService,
  onViewDetails,
  signatureService, // <-- pass the existing service object (e.g., the CO2 one from your ServicesSection data)
}) {
  const t = content[lang] || content.es;
  const reduceMotion = useReducedMotion();

  // Palette
  const CREAM = "#FBF8F3";
  const LINEN = "#F1E8DD";
  const ESPRESSO = "#2A1E1A";
  const COCOA = "#6B5A52";
  const CHAMPAGNE = "#C9AE7E";
  const ROSE = "#C39A8B";
  const TAUPE = "#8B7468";

  // Dynamic background “orbs”
  const [orbs, setOrbs] = useState([
    { x: 18, y: 20, s: 1.0 },
    { x: 78, y: 28, s: 0.9 },
    { x: 48, y: 78, s: 1.1 },
  ]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setOrbs((prev) =>
        prev.map((o) => ({
          x: clamp(o.x + rand(-6, 6), 8, 92),
          y: clamp(o.y + rand(-6, 6), 10, 90),
          s: clamp(o.s + rand(-0.08, 0.08), 0.85, 1.2),
        }))
      );
    }, 2600);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Signature card fields (pulled from your existing service object)
  const sigName = signatureService ? pick(signatureService.name, lang) : "";
  const sigDesc = signatureService ? pick(signatureService.description, lang) : "";
  const sigBadges = signatureService?.badges || [];
  const sigPrice = signatureService?.price;
  const sigDuration = durationText(signatureService?.duration, lang);

  const handleCheckAvailability = () => {
    // ✅ Add the *existing* service to cart (so it’s connected to the cart system you already have)
    if (onAddService && signatureService) onAddService(signatureService);
    if (onBookClick) onBookClick();
  };

  const heroVariants = useMemo(
    () => ({
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.08 },
        },
      },
      item: {
        hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
      },
      card: {
        hidden: { opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: "easeOut", delay: 0.05 },
        },
      },
    }),
    []
  );

  return (
    <section className="relative overflow-hidden">
      {/* Background base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1000px 560px at 50% 15%, rgba(201,174,126,0.18), transparent 60%),
            linear-gradient(to bottom, ${CREAM}, ${LINEN} 55%, ${CREAM})
          `,
        }}
      />

      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0">
        {orbs.map((o, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: 420,
              height: 420,
              borderRadius: 999,
              transform: "translate(-50%, -50%)",
              background:
                i === 0
                  ? "radial-gradient(circle at 30% 30%, rgba(201,174,126,0.30), transparent 62%)"
                  : i === 1
                  ? "radial-gradient(circle at 30% 30%, rgba(195,154,139,0.22), transparent 62%)"
                  : "radial-gradient(circle at 30% 30%, rgba(42,30,26,0.09), transparent 64%)",
              filter: "blur(10px)",
              opacity: 0.9,
            }}
            animate={reduceMotion ? {} : { scale: o.s }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />
        ))}

        {/* Fine grain + vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(1200px 700px at 50% 30%, transparent 55%, rgba(42,30,26,0.10) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"120\" height=\"120\" filter=\"url(%23n)\" opacity=\"0.35\"/></svg>')",
            backgroundSize: "180px 180px",
            mixBlendMode: "soft-light",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="min-h-screen flex items-center py-20 md:py-28">
          <motion.div
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            variants={heroVariants.container}
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "show"}
          >
            {/* Left */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div variants={heroVariants.item}>
                <div
                  className="inline-flex items-center gap-2.5 rounded-full border px-6 py-2.5 backdrop-blur-sm"
                  style={{
                    backgroundColor: "rgba(255,252,248,0.80)",
                    borderColor: "rgba(42,30,26,0.12)",
                    boxShadow: "0 10px 30px rgba(42,30,26,0.06)",
                  }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: CHAMPAGNE }} />
                  <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: COCOA }}>
                    {t.badge}
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={heroVariants.item}
                className="mt-7 font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] text-balance"
                style={{ color: ESPRESSO }}
              >
                {t.title}
              </motion.h1>

              <motion.p
                variants={heroVariants.item}
                className="mt-6 max-w-xl mx-auto lg:mx-0 font-body text-lg md:text-xl leading-relaxed"
                style={{ color: COCOA, opacity: 0.92 }}
              >
                {t.subtitle}
              </motion.p>

              <motion.div
                variants={heroVariants.item}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <motion.button
                  onClick={onBookClick}
                  whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                  className="group h-16 px-10 rounded-2xl text-base font-medium transition-all duration-300 flex items-center gap-3"
                  style={{
                    backgroundColor: ROSE,
                    color: "#FFFFFF",
                    boxShadow: "0 26px 80px rgba(195,154,139,0.34)",
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  <span>{t.cta1}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  onClick={onViewServices}
                  whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
                  whileTap={reduceMotion ? {} : { scale: 0.98 }}
                  className="h-16 px-10 rounded-2xl text-base font-medium border transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,252,248,0.70)",
                    borderColor: "rgba(42,30,26,0.16)",
                    color: ESPRESSO,
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 12px 34px rgba(42,30,26,0.07)",
                  }}
                >
                  {t.cta2}
                </motion.button>
              </motion.div>

              <motion.div variants={heroVariants.item} className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
                {t.trust.map((label, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(255,252,248,0.62)",
                      borderColor: "rgba(42,30,26,0.10)",
                      color: TAUPE,
                      boxShadow: "0 10px 30px rgba(42,30,26,0.05)",
                    }}
                  >
                    {idx === 0 && <Award className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    {idx === 1 && <ShieldCheck className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    {idx === 2 && <MapPin className="h-4 w-4" style={{ color: CHAMPAGNE }} />}
                    <span className="font-medium">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Signature card (CONNECTED to your existing service) */}
            <motion.div className="lg:col-span-5" variants={heroVariants.card}>
              <div className="relative mx-auto max-w-md">
                <div
                  className="pointer-events-none absolute -inset-6 rounded-[2rem]"
                  style={{
                    background: "radial-gradient(520px 300px at 50% 20%, rgba(201,174,126,0.24), transparent 70%)",
                    filter: "blur(12px)",
                    opacity: 0.95,
                  }}
                />

                <div
                  className="relative overflow-hidden rounded-[2rem] border p-7 sm:p-8"
                  style={{
                    backgroundColor: "rgba(255,252,248,0.78)",
                    borderColor: "rgba(42,30,26,0.12)",
                    boxShadow: "0 28px 90px rgba(42,30,26,0.12)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  {/* animated shimmer */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                      background: "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.55) 45%, transparent 65%)",
                      transform: "translateX(-60%)",
                    }}
                    animate={reduceMotion ? {} : { transform: ["translateX(-60%)", "translateX(60%)"] }}
                    transition={
                      reduceMotion
                        ? {}
                        : { duration: 2.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                    }
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-[0.22em]" style={{ color: COCOA }}>
                        {t.signatureLabel}
                      </span>

                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: "rgba(201,174,126,0.14)", color: ESPRESSO }}
                      >
                        <Sparkles className="h-3.5 w-3.5" style={{ color: CHAMPAGNE }} />
                        {t.premium}
                      </span>
                    </div>

                    {/* ✅ Pull name/description from CO2 service */}
                    <h3 className="mt-4 font-display text-2xl font-medium tracking-tight" style={{ color: ESPRESSO }}>
                      {sigName || (lang === "en" ? "Signature Service" : "Servicio Signature")}
                    </h3>

                    {!!sigDesc && (
                      <p className="mt-3 text-base leading-relaxed" style={{ color: COCOA, opacity: 0.92 }}>
                        {sigDesc}
                      </p>
                    )}

                    {/* ✅ Show the badges exactly like in your Services modal */}
                    {!!sigBadges.length && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {sigBadges.slice(0, 2).map((b, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: "rgba(255,252,248,0.70)",
                              borderColor: "rgba(42,30,26,0.10)",
                              color: ESPRESSO,
                            }}
                          >
                            {typeof b === "string" ? b : pick(b, lang)}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* ✅ Price + Duration from the existing service object */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm" style={{ color: TAUPE }}>
                      {typeof sigPrice === "number" && sigPrice > 0 && (
                        <span className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2">
                          <span className="font-semibold" style={{ color: ESPRESSO }}>
                            {t.priceLabel}
                          </span>
                          <span className="font-semibold" style={{ color: ESPRESSO }}>
                            {money(sigPrice)}
                          </span>
                        </span>
                      )}

                      {!!sigDuration && sigDuration !== "—" && (
                        <span className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2">
                          <span className="font-semibold" style={{ color: ESPRESSO }}>
                            {t.durationLabel}
                          </span>
                          <span className="font-semibold" style={{ color: ESPRESSO }}>
                            {sigDuration}
                          </span>
                        </span>
                      )}
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
                      <span style={{ color: COCOA, opacity: 0.9 }}> • {t.rec}</span>
                    </div>

                    {/* ✅ This button adds the CO2 service to cart AND triggers booking */}
                    <motion.button
                      onClick={handleCheckAvailability}
                      whileHover={reduceMotion ? {} : { y: -2, scale: 1.01 }}
                      whileTap={reduceMotion ? {} : { scale: 0.98 }}
                      className="mt-7 w-full h-14 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: ESPRESSO,
                        color: CREAM,
                        boxShadow: "0 18px 55px rgba(42,30,26,0.24)",
                        opacity: signatureService ? 1 : 0.75,
                      }}
                      disabled={!signatureService}
                      title={!signatureService ? (lang === "en" ? "Missing signature service" : "Falta el servicio signature") : ""}
                    >
                      {t.checkAvailability}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* subtle bottom gradient edge */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{ background: "linear-gradient(to top, rgba(201,174,126,0.10), transparent)" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="h-px w-full"
          style={{
            backgroundImage: "linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)",
          }}
        />
      </div>
    </section>
  );
}