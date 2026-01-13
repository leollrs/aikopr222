"use client";

import React, { useEffect, useRef } from "react";

type SilkBackgroundProps = {
  className?: string;
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  theme?: {
    bg0?: string;
    bg1?: string;
    bg2?: string;
    silkR?: number;
    silkG?: number;
    silkB?: number;
    vignetteInner?: string;
    vignetteOuter?: string;
  };
};

export function SilkBackground({
  className = "fixed inset-0 h-full w-full",
  speed = 0.018,
  scale = 2,
  noiseIntensity = 0.8,
  theme,
}: SilkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const t = {
      bg0: theme?.bg0 ?? "#0C0908",
      bg1: theme?.bg1 ?? "#1A1310",
      bg2: theme?.bg2 ?? "#0C0908",
      silkR: theme?.silkR ?? 214,
      silkG: theme?.silkG ?? 185,
      silkB: theme?.silkB ?? 140,
      vignetteInner: theme?.vignetteInner ?? "rgba(0,0,0,0.12)",
      vignetteOuter: theme?.vignetteOuter ?? "rgba(0,0,0,0.85)",
    };

    let time = 0;

    const noise = (x: number, y: number) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    // ✅ Size to the element itself (not window) so it always covers correctly
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

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

          const r = Math.floor(t.silkR * intensity);
          const g = Math.floor(t.silkG * intensity);
          const b = Math.floor(t.silkB * intensity);

          const idx = (y * width + x) * 4;
          if (idx < data.length) {
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;

            // fill neighbor pixel to avoid “dotted” look
            const idx2 = idx + 4;
            if (idx2 < data.length) {
              data[idx2] = r;
              data[idx2 + 1] = g;
              data[idx2 + 2] = b;
              data[idx2 + 3] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // vignette overlay
      const overlay = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5
      );
      overlay.addColorStop(0, t.vignetteInner);
      overlay.addColorStop(1, t.vignetteOuter);
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, scale, noiseIntensity, theme]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}