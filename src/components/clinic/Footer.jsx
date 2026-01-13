import React from "react";
import { Instagram, Facebook } from "lucide-react";

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

export default function Footer({ lang }) {
  const copy = {
    es: {
      desc: "Especialistas en estética avanzada y tratamientos láser.",
      linksTitle: "Enlaces",
      followTitle: "Síguenos",
      links: [
        { label: "Servicios", href: "#services" },
        { label: "Resultados", href: "#results" },
        { label: "Testimonios", href: "#testimonials" },
        { label: "Contacto", href: "#contact" },
      ],
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      terms: "Términos",
    },
    en: {
      desc: "Specialists in advanced aesthetics and laser treatments.",
      linksTitle: "Links",
      followTitle: "Follow Us",
      links: [
        { label: "Services", href: "#services" },
        { label: "Results", href: "#results" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ],
      rights: "All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
    },
  };

  const t = copy[lang] || copy.es;

  return (
    <footer
      className="relative overflow-hidden py-12 md:py-16"
      style={{ backgroundColor: PALETTE.espresso }}
    >
      {/* Premium glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_20%,rgba(201,174,126,0.18),transparent_58%),radial-gradient(900px_420px_at_80%_10%,rgba(195,154,139,0.14),transparent_60%)]" />

      {/* Top hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,174,126,0.55), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-full border"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background:
                    "radial-gradient(circle at 30% 25%, rgba(201,174,126,0.55), rgba(195,154,139,0.18), rgba(0,0,0,0))",
                }}
              />
              <h3 className="text-xl font-light tracking-[-0.01em] text-white">
                LUMIÈRE
              </h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/65">{t.desc}</p>

            <div className="mt-6 flex items-center gap-3 text-xs text-white/45">
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: "rgba(201,174,126,0.8)" }}
              />
              <span>{lang === "es" ? "Servicio móvil" : "Mobile service"}</span>
              <span className="text-white/25">•</span>
              <span>{lang === "es" ? "Atención premium" : "Premium care"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t.linksTitle}
            </h4>

            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {t.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <span
                      className="h-px w-6"
                      style={{
                        backgroundColor: "rgba(201,174,126,0.45)",
                      }}
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t.followTitle}
            </h4>

            <div className="mt-4 flex gap-3">
              <SocialIcon
                href="#"
                label="Instagram"
                icon={<Instagram className="h-5 w-5 text-white" />}
              />
              <SocialIcon
                href="#"
                label="Facebook"
                icon={<Facebook className="h-5 w-5 text-white" />}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/45">
              {lang === "es"
                ? "Novedades, disponibilidad y resultados recientes."
                : "Updates, availability, and recent results."}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/45">
            © 2024 AIKOPR222 Aesthetic Clinic. {t.rights}
          </p>

          <div className="flex gap-6 text-xs text-white/45">
            <a href="#" className="transition hover:text-white/70">
              {t.privacy}
            </a>
            <a href="#" className="transition hover:text-white/70">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
      style={{
        borderColor: "rgba(255,255,255,0.14)",
        backgroundColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="transition group-hover:opacity-90">{icon}</div>
    </a>
  );
}