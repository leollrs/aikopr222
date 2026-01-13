import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header({
  lang,
  setLang,
  cartCount,
  onCartClick,
  onBookClick,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Soft halo behind header when at top (keeps it premium on silk) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(900px_180px_at_50%_0%,rgba(201,174,126,0.18),transparent_70%)]" />

      <div
        className={[
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10",
          "transition-all duration-300",
        ].join(" ")}
      >
        <div
          className={[
            "mt-3 md:mt-4",
            "flex h-14 md:h-16 items-center justify-between",
            "rounded-2xl border",
            "px-4 md:px-6",
            "shadow-[0_18px_55px_rgba(0,0,0,0.10)]",
            scrolled
              ? "bg-[#FBF8F3]/85 backdrop-blur-xl border-[rgba(42,30,26,0.14)]"
              : "bg-[#FBF8F3]/55 backdrop-blur-lg border-[rgba(255,255,255,0.18)]",
          ].join(" ")}
        >
          {/* Left: Brand */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-light tracking-[-0.01em] text-[#2A1E1A]">
              AIKOPR222
            </span>
            <span className="hidden sm:inline text-[11px] tracking-[0.22em] uppercase text-[#6E5B50]/80">
              {lang === "es" ? "Estética a domicilio" : "Mobile aesthetics"}
            </span>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Toggle (pill) */}
            <div className="flex items-center rounded-full border border-[rgba(42,30,26,0.12)] bg-white/40 p-1">
              <button
                onClick={() => setLang("es")}
                className={[
                  "px-3 py-1 text-[12px] font-medium rounded-full transition",
                  lang === "es"
                    ? "bg-[#2A1E1A] text-[#FBF8F3] shadow-[0_10px_24px_rgba(42,30,26,0.18)]"
                    : "text-[#6E5B50] hover:text-[#2A1E1A]",
                ].join(" ")}
              >
                ES
              </button>
              <button
                onClick={() => setLang("en")}
                className={[
                  "px-3 py-1 text-[12px] font-medium rounded-full transition",
                  lang === "en"
                    ? "bg-[#2A1E1A] text-[#FBF8F3] shadow-[0_10px_24px_rgba(42,30,26,0.18)]"
                    : "text-[#6E5B50] hover:text-[#2A1E1A]",
                ].join(" ")}
              >
                EN
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(42,30,26,0.12)] bg-white/40 text-[#2A1E1A] transition hover:bg-white/60"
              aria-label={lang === "es" ? "Ver carrito" : "View cart"}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#B07A7A] text-white text-[11px] flex items-center justify-center shadow-[0_10px_22px_rgba(176,122,122,0.30)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA */}
            <Button
              onClick={onBookClick}
              className="h-10 rounded-xl bg-[#B07A7A] px-4 md:px-5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(176,122,122,0.25)] hover:bg-[#9A6969]"
            >
              {lang === "es" ? "Agendar" : "Book"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}