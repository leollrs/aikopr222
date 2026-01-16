import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Same premium palette (cream/linen/champagne/rose/espresso)
const PALETTE = {
  cream: "#FBF8F3",
  linen: "#F1E8DD",
  sand: "#E7D8C7",
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  taupe: "#8B7468",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

export default function ContactSection({ lang = "es", sectionRef }) {
  return (
    <section
      id="ContactSection"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
      style={{ backgroundColor: PALETTE.cream }}
    >
      {/* Match other sections: subtle luxury backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 50% 20%, rgba(201,174,126,0.06), transparent 70%),
            radial-gradient(1000px 520px at 15% 5%, rgba(195,154,139,0.08), transparent 62%),
            linear-gradient(to bottom, rgba(251,248,243,0.45), rgba(241,232,221,0.82))
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header (same hierarchy language) */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          {/* Badge */}
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,252,248,0.72)",
              borderColor: "rgba(42,30,26,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: PALETTE.rose }} />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: PALETTE.taupe }}
            >
              {lang === "es" ? "Contacto" : "Contact"}
            </span>
          </div>

          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
            style={{ color: PALETTE.espresso }}
          >
            {lang === "es" ? "Contáctanos" : "Contact Us"}
          </h2>

          <p
            className="font-body text-lg md:text-xl leading-relaxed"
            style={{ color: PALETTE.cocoa, opacity: 0.88 }}
          >
            {lang === "es"
              ? "Estamos aquí para responder tus preguntas y coordinar tu cita."
              : "We’re here to answer your questions and help you book your appointment."}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={MapPin}
            title={lang === "es" ? "Ubicación" : "Location"}
            lines={[lang === "es" ? "Servicio a domicilio en Puerto Rico" : "Mobile service across Puerto Rico"]}
          />

          <ContactCard
            icon={Phone}
            title={lang === "es" ? "Teléfono" : "Phone"}
            lines={["+1 (786) 672-9528"]}
            href="tel:+17866729528"
          />

          <ContactCard
            icon={Mail}
            title={lang === "es" ? "Correo" : "Email"}
            lines={["Aikopr222@gmail.com"]}
            href="mailto:Aikopr222@gmail.com"
          />

          <ContactCard
            icon={Clock}
            title={lang === "es" ? "Horario" : "Hours"}
            lines={[lang === "es" ? "Lun - Sáb: 9am - 6pm" : "Mon - Sat: 9am - 6pm"]}
          />
        </div>

        {/* Bottom divider like other sections */}
        <div
          className="mx-auto mt-16 h-px w-full max-w-5xl"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${PALETTE.champagne}, transparent)`,
            opacity: 0.6,
          }}
        />
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }) {
  const cardInner = (
    <div
      className="group relative h-full overflow-hidden rounded-3xl border p-8 text-center transition-all duration-500 hover:-translate-y-2"
      style={{
        backgroundColor: "rgba(255,252,248,0.92)",
        borderColor: "rgba(42,30,26,0.08)",
        boxShadow: "0 12px 40px rgba(42,30,26,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Hover glow (same as cards elsewhere) */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_300px_at_50%_0%,rgba(201,174,126,0.12),transparent_70%)]" />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border"
          style={{
            backgroundColor: "rgba(241,232,221,0.60)",
            borderColor: "rgba(42,30,26,0.10)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
          }}
        >
          <Icon className="h-5 w-5" style={{ color: PALETTE.rose }} />
        </div>

        {/* Title */}
        <h3
          className="mb-2 text-[12px] font-semibold tracking-[0.26em] uppercase"
          style={{ color: PALETTE.espresso }}
        >
          {title}
        </h3>

        {/* Lines */}
        <div className="space-y-1">
          {lines.map((line, i) => (
            <p key={i} className="font-body text-sm leading-relaxed" style={{ color: PALETTE.cocoa, opacity: 0.9 }}>
              {line}
            </p>
          ))}
        </div>

        {/* Bottom accent line */}
        <div
          className="mt-6 h-px w-full"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)`,
            opacity: 0.65,
          }}
        />
      </div>
    </div>
  );

  // Optional: make phone/email clickable without changing styling
  if (href) {
    return (
      <a href={href} className="block focus:outline-none" aria-label={title}>
        {cardInner}
      </a>
    );
  }

  return cardInner;
}