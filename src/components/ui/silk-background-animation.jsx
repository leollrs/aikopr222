import React, { useEffect, useRef } from "react";

export function SilkBackground({
  // IMPORTANT: keep inset-0 but also force block + full coverage
  className = "absolute inset-0 block h-full w-full",
  speed = 0.02,
  scale = 2,
  noiseIntensity = 0.8,
  theme = {},
  quality = 0.7, // allow override
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let time = 0;

    const t = {
      bg0: theme?.bg0 ?? "#2A1B16",
      bg1: theme?.bg1 ?? "#3A2721",
      bg2: theme?.bg2 ?? "#2A1B16",
      silkR: theme?.silkR ?? 199,
      silkG: theme?.silkG ?? 174,
      silkB: theme?.silkB ?? 134,
      vignetteInner: theme?.vignetteInner ?? "rgba(36, 24, 20, 0.08)",
      vignetteOuter: theme?.vignetteOuter ?? "rgba(36, 24, 20, 0.45)",
    };

    const QUALITY = Math.min(Math.max(quality, 0.45), 1); // clamp

    let cssW = 0;
    let cssH = 0;
    let bufW = 0;
    let bufH = 0;
    let running = true;

    const getTargetRect = () => {
      // Use offsetParent when possible; fall back to parentElement; last resort window.
      const host = canvas.offsetParent || canvas.parentElement;
      if (host && host instanceof HTMLElement) {
        const rect = host.getBoundingClientRect();
        return { w: rect.width, h: rect.height };
      }
      return { w: window.innerWidth, h: window.innerHeight };
    };

    const resize = () => {
      const { w, h } = getTargetRect();

      cssW = Math.max(1, Math.floor(w));
      cssH = Math.max(1, Math.floor(h));

      // Force fill the container
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      bufW = Math.max(1, Math.floor(cssW * dpr * QUALITY));
      bufH = Math.max(1, Math.floor(cssH * dpr * QUALITY));

      // Only touch the backing store if changed (avoids flicker/jank)
      if (canvas.width !== bufW) canvas.width = bufW;
      if (canvas.height !== bufH) canvas.height = bufH;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    // Watch size changes on the nearest container
    const host = canvas.offsetParent || canvas.parentElement;
    const ro = new ResizeObserver(() => resize());
    if (host && host instanceof HTMLElement) ro.observe(host);

    // Also handle orientation change / address bar changes / scrollbars
    window.addEventListener("resize", resize, { passive: true });

    resize();

    const noise = (x, y) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      if (!running) return;

      const width = bufW;
      const height = bufH;

      // If zero (can happen during layout), try again next frame
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, t.bg0);
      gradient.addColorStop(0.5, t.bg1);
      gradient.addColorStop(1, t.bg2);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

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

          const r = (t.silkR * intensity) | 0;
          const g = (t.silkG * intensity) | 0;
          const b = (t.silkB * intensity) | 0;

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Vignette
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

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      ro.disconnect();
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speed, scale, noiseIntensity, theme, quality]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}