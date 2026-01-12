/**
 * HERO SILK INTEGRATION (with CTAs)
 *
 * Goal:
 * - Use the silk canvas animation as the Hero background
 * - Keep your clinic CTA buttons + bilingual copy
 * - Keep shadcn + Tailwind + TypeScript friendly structure
 *
 * Files to create:
 * 1) /components/ui/silk-background-animation.tsx   (background-only, reusable)
 * 2) /components/hero/hero-silk.tsx (or wherever your Hero lives)
 *
 * Notes:
 * - Do NOT inject global html/body styles inside the component (it can mess up your app).
 * - Keep the canvas as a background layer.
 * - Put the clinic content ABOVE it (z-index).
 */

////////////////////////////////////////////////////////////
// 1) /components/ui/silk-background-animation.tsx
////////////////////////////////////////////////////////////

'use client';

import React, { useEffect, useRef } from 'react';

type SilkBackgroundProps = {
  /** Tailwind className for positioning / sizing. Default is full-cover absolute. */
  className?: string;
  /** Controls overall motion intensity. */
  speed?: number;
  /** Controls pattern scale. */
  scale?: number;
  /** Controls noise intensity. */
  noiseIntensity?: number;
  /** Warm theme colors (optional override) */
  theme?: {
    // background gradient stops
    bg0?: string;
    bg1?: string;
    bg2?: string;
    // silk tint multiplier (RGB base)
    silkR?: number;
    silkG?: number;
    silkB?: number;
    // vignette overlay
    vignetteInner?: string;
    vignetteOuter?: string;
  };
};

export function SilkBackground({
  className = 'absolute inset-0 h-full w-full',
  speed = 0.02,
  scale = 2,
  noiseIntensity = 0.8,
  theme,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const t = {
      // default: warm premium clinic palette (cream/brown/rose)
      bg0: theme?.bg0 ?? '#2A1B16', // deep espresso
      bg1: theme?.bg1 ?? '#3A2721', // warm brown
      bg2: theme?.bg2 ?? '#2A1B16',
      silkR: theme?.silkR ?? 199, // champagne tint base
      silkG: theme?.silkG ?? 174,
      silkB: theme?.silkB ?? 134,
      vignetteInner: theme?.vignetteInner ?? 'rgba(36, 24, 20, 0.08)',
      vignetteOuter: theme?.vignetteOuter ?? 'rgba(36, 24, 20, 0.45)',
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // simple noise function
    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, t.bg0);
      gradient.addColorStop(0.5, t.bg1);
      gradient.addColorStop(1, t.bg2);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // silk pattern
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern =
            0.6 +
            0.4 *
              Math.sin(
                5.0 *
                  (tex_x +
                    tex_y +
                    Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                    0.02 * tOffset) +
                  Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
              );

          const rnd = noise(x, y);
          const intensity = Math.max(0, pattern - (rnd / 15.0) * noiseIntensity);

          // warm silk tint
          const r = Math.floor(t.silkR * intensity);
          const g = Math.floor(t.silkG * intensity);
          const b = Math.floor(t.silkB * intensity);
          const a = 255;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = a;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // vignette overlay for depth
      const overlayGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.7
      );
      overlayGradient.addColorStop(0, t.vignetteInner);
      overlayGradient.addColorStop(1, t.vignetteOuter);

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed, scale, noiseIntensity, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

////////////////////////////////////////////////////////////
// 2) HERO (uses the silk background + keeps your CTAs)
////////////////////////////////////////////////////////////

import { Button } from '@/components/ui/button';
import { Sparkles, Cpu, UserCheck, Leaf, ArrowRight } from 'lucide-react';

const heroContent = {
  es: {
    title: 'Estética Avanzada y Tratamientos Láser',
    subtitle:
      'Especialistas en depilación láser, tratamientos faciales y rejuvenecimiento con tecnología avanzada.',
    cta1: 'Agendar Cita',
    cta2: 'Ver Servicios',
    chips: [
      { icon: UserCheck, text: 'Evaluación personalizada' },
      { icon: Cpu, text: 'Tecnología avanzada' },
      { icon: Sparkles, text: 'Cuidado profesional' },
      { icon: Leaf, text: 'Resultados naturales' },
    ],
  },
  en: {
    title: 'Advanced Aesthetics & Laser Treatments',
    subtitle:
      'Specialists in laser hair removal, facial treatments, and advanced rejuvenation.',
    cta1: 'Book Appointment',
    cta2: 'View Services',
    chips: [
      { icon: UserCheck, text: 'Personalized evaluation' },
      { icon: Cpu, text: 'Advanced technology' },
      { icon: Sparkles, text: 'Professional care' },
      { icon: Leaf, text: 'Natural results' },
    ],
  },
};

type HeroSilkProps = {
  lang: 'es' | 'en';
  onBookClick?: () => void;
  onServicesClick?: () => void;
};

export function HeroSilk({ lang, onBookClick, onServicesClick }: HeroSilkProps) {
  const t = heroContent[lang];

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Silk animated background */}
      <SilkBackground className="absolute inset-0 h-full w-full" />

      {/* Warm overlay to match clinic brand + keep text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_25%,rgba(176,122,122,0.22),transparent_60%),radial-gradient(900px_520px_at_80%_20%,rgba(199,174,134,0.20),transparent_58%),linear-gradient(to_bottom,rgba(244,238,230,0.65),rgba(233,221,207,0.68),rgba(244,238,230,0.72))]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid min-h-[92vh] items-center gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(36,24,20,0.14)] bg-[#FFFCF8]/70 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#C7AE86]" />
              <span className="text-xs font-medium tracking-[0.18em] text-[#6E5B50] uppercase">
                {lang === 'es' ? 'Clínica estética premium' : 'Premium aesthetics clinic'}
              </span>
            </div>

            <h1 className="text-balance text-4xl font-light leading-[1.05] tracking-[-0.03em] text-[#241814] sm:text-5xl md:text-6xl lg:text-7xl">
              {t.title}
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[#6E5B50] sm:text-lg md:text-xl">
              {t.subtitle}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={onBookClick}
                className="group h-12 rounded-xl bg-[#B07A7A] px-6 text-base font-medium text-white shadow-[0_12px_30px_rgba(176,122,122,0.25)] transition hover:bg-[#9A6969] hover:shadow-[0_16px_40px_rgba(176,122,122,0.28)]"
              >
                {t.cta1}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>

              <Button
                onClick={onServicesClick}
                variant="outline"
                className="h-12 rounded-xl border-[rgba(36,24,20,0.18)] bg-[#FFFCF8]/60 px-6 text-base font-medium text-[#241814] backdrop-blur transition hover:bg-[#FFFCF8]"
              >
                {t.cta2}
              </Button>

              <div className="mt-2 text-xs text-[#6E5B50] sm:mt-0 sm:ml-2">
                <span className="font-medium text-[#241814]">
                  {lang === 'es' ? 'Depósito fijo:' : 'Fixed deposit:'}
                </span>{' '}
                $30 • {lang === 'es' ? 'Confirmación por mensaje' : 'Confirmation by text'}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {t.chips.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-full border border-[rgba(36,24,20,0.10)] bg-[#FFFCF8]/75 px-4 py-2 shadow-[0_12px_30px_rgba(36,24,20,0.06)] backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-[#C7AE86]" />
                    <span className="text-sm text-[#6E5B50]">{chip.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional right-side visual panel (kept simple to avoid breakage) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[rgba(36,24,20,0.14)] bg-[#FFFCF8]/65 shadow-[0_30px_70px_rgba(36,24,20,0.14)] backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1400&q=80"
                alt="Aesthetic clinic"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_60%_20%,rgba(176,122,122,0.18),transparent_55%),linear-gradient(to_top,rgba(36,24,20,0.25),transparent_55%)]" />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgba(199,174,134,0.55),transparent)]" />
    </section>
  );
}

////////////////////////////////////////////////////////////
// 3) Usage (example)
// import { HeroSilk } from "@/components/hero/hero-silk";
////////////////////////////////////////////////////////////

// <HeroSilk lang={lang} onBookClick={() => scrollToBooking()} onServicesClick={() => scrollToServices()} />