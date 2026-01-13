import React from "react";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer({ lang }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#2A1E1A] py-14 md:py-20">
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(201,174,126,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Brand */}
        <h3 className="text-2xl font-light tracking-[-0.02em] text-[#FBF8F3]">
          AIKOPR222
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-[#FBF8F3]/65">
          {lang === "es"
            ? "Especialistas en estética avanzada y tratamientos láser a domicilio."
            : "Specialists in advanced aesthetics and at-home laser treatments."}
        </p>

        {/* Divider */}
        <div className="mx-auto mt-8 h-px w-24 bg-[#C9AE7E]/40" />

        {/* Navigation */}
        <nav className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-[#FBF8F3]/65">
            <li>
              <button
                onClick={() => scrollToSection("ServicesSection")}
                className="hover:text-[#FBF8F3] transition"
              >
                {lang === "es" ? "Servicios" : "Services"}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("ResultsSection")}
                className="hover:text-[#FBF8F3] transition"
              >
                {lang === "es" ? "Resultados" : "Results"}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("ContactSection")}
                className="hover:text-[#FBF8F3] transition"
              >
                {lang === "es" ? "Contacto" : "Contact"}
              </button>
            </li>
          </ul>
        </nav>

        {/* Social */}
        <div className="mt-8 flex justify-center gap-4">
          <SocialIcon
            href="https://www.instagram.com/aikopr222/"
            icon={<Instagram />}
          />
          <SocialIcon
            href="https://wa.me/7866729528"
            icon={<MessageCircle />}
          />
        </div>

        {/* Bottom copy */}
        <p className="mt-10 text-xs tracking-wide text-[#FBF8F3]/40">
          © 2024 AIKOPR222 ·{" "}
          {lang === "es" ? "Todos los derechos reservados" : "All rights reserved"}
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
      aria-label="Social link"
    >
      {React.cloneElement(icon, {
        className: "h-5 w-5 text-[#FBF8F3]",
      })}
    </a>
  );
}