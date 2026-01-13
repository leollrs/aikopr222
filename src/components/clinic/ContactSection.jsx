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

export default function ContactSection({ lang }) {
  return (
    <section
      className="py-16 md:py-20 lg:py-28"
      style={{ backgroundColor: PALETTE.cream }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-12">
          <h2
            className="mb-4 text-3xl font-light md:text-4xl"
            style={{ color: PALETTE.espresso }}
          >
            {lang === "es" ? "Contáctanos" : "Contact Us"}
          </h2>
          <p className="mx-auto max-w-2xl" style={{ color: PALETTE.cocoa }}>
            {lang === "es"
              ? "Estamos aquí para responder tus preguntas."
              : "We are here to answer your questions."}
          </p>

          {/* subtle divider */}
          <div
            className="mx-auto mt-6 h-px w-32"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)",
            }}
          />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <ContactCard
            icon={MapPin}
            title={lang === "es" ? "Ubicación" : "Location"}
            lines={["Av. Principal #123", "Ciudad, CP 12345"]}
          />

          <ContactCard
            icon={Phone}
            title={lang === "es" ? "Teléfono" : "Phone"}
            lines={["+1 (555) 123-4567"]}
          />

          <ContactCard
            icon={Mail}
            title={lang === "es" ? "Correo" : "Email"}
            lines={["info@aikopr222.clinic"]}
          />

          <ContactCard
            icon={Clock}
            title={lang === "es" ? "Horario" : "Hours"}
            lines={[lang === "es" ? "Lun - Sáb: 9am - 6pm" : "Mon - Sat: 9am - 6pm"]}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines }) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl border p-6 text-center shadow-[0_22px_70px_rgba(42,30,26,0.10)] transition hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(255,252,248,0.88)",
        borderColor: "rgba(42,30,26,0.10)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* soft premium glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_20%_10%,rgba(201,174,126,0.18),transparent_55%),radial-gradient(700px_320px_at_80%_30%,rgba(195,154,139,0.12),transparent_60%)]" />

      {/* Icon */}
      <div
        className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "rgba(241,232,221,0.65)",
          borderColor: "rgba(42,30,26,0.10)",
        }}
      >
        <Icon className="h-5 w-5" style={{ color: PALETTE.rose }} />
      </div>

      {/* Title */}
      <h3
        className="relative mb-2 text-sm font-semibold tracking-[0.08em] uppercase"
        style={{ color: PALETTE.espresso }}
      >
        {title}
      </h3>

      {/* Lines */}
      <div className="relative space-y-1">
        {lines.map((line, i) => (
          <p key={i} className="text-sm" style={{ color: PALETTE.cocoa }}>
            {line}
          </p>
        ))}
      </div>

      {/* bottom accent line */}
      <div
        className="pointer-events-none absolute inset-x-10 bottom-0 h-px opacity-80"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)",
        }}
      />
    </div>
  );
}