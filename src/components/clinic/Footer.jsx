import React from "react";
import { Instagram, MessageCircle } from "lucide-react";

const PALETTE = {
  espresso: "#2A1E1A",
  cocoa: "#6B5A52",
  cream: "#FBF8F3",
  champagne: "#C9AE7E",
  rose: "#C39A8B",
};

export default function Footer({ lang }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 500px at 50% 0%, rgba(201,174,126,0.22), transparent 60%),
            radial-gradient(900px 420px at 80% 10%, rgba(195,154,139,0.18), transparent 62%),
            linear-gradient(to bottom, #2A1E1A, #1F1512)
          `,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
        {/* Brand */}
        <h3
          className="text-3xl font-light tracking-[-0.02em]"
          style={{ color: PALETTE.cream }}
        >
          AIKOPR222
        </h3>

        <p
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed"
          style={{ color: "rgba(251,248,243,0.70)" }}
        >
          {lang === "es"
            ? "Especialistas en estética avanzada y tratamientos láser a domicilio."
            : "Specialists in advanced aesthetics and at-home laser treatments."}
        </p>

        {/* Divider */}
        <div
          className="mx-auto mt-10 h-px w-40"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${PALETTE.champagne}, transparent)`,
            opacity: 0.7,
          }}
        />

        {/* Navigation */}
        <nav className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
            <FooterLink onClick={() => scrollToSection("ServicesSection")}>
              {lang === "es" ? "Servicios" : "Services"}
            </FooterLink>

            <FooterLink onClick={() => scrollToSection("ResultsSection")}>
              {lang === "es" ? "Resultados" : "Results"}
            </FooterLink>

            <FooterLink onClick={() => scrollToSection("ContactSection")}>
              {lang === "es" ? "Contacto" : "Contact"}
            </FooterLink>
          </ul>
        </nav>

        {/* Social */}
        <div className="mt-10 flex justify-center gap-5">
          <SocialIcon
            href="https://www.instagram.com/aikopr222/"
            icon={Instagram}
          />
          <SocialIcon
            href="https://wa.me/17866729528"
            icon={MessageCircle}
          />
        </div>

        {/* Bottom copy */}
        <p
          className="mt-12 text-xs tracking-wide"
          style={{ color: "rgba(251,248,243,0.45)" }}
        >
          © 2024 AIKOPR222 ·{" "}
          {lang === "es"
            ? "Todos los derechos reservados"
            : "All rights reserved"}
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Components ---------------- */

function FooterLink({ children, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="relative text-[rgba(251,248,243,0.70)] transition hover:text-[#FBF8F3]"
      >
        {children}
      </button>
    </li>
  );
}

function SocialIcon({ icon: Icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Social link"
      className="group relative flex h-12 w-12 items-center justify-center rounded-full border transition"
      style={{
        borderColor: "rgba(251,248,243,0.18)",
        backgroundColor: "rgba(251,248,243,0.05)",
      }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(120px_120px_at_50%_0%,rgba(201,174,126,0.35),transparent_60%)]" />

      <Icon className="relative h-5 w-5 text-[#FBF8F3]" />
    </a>
  );
}