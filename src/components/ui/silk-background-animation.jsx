import React, { useEffect, useRef } from 'react';

export function SilkBackground({
  className = 'absolute inset-0 h-full w-full',
  speed = 0.02,
  scale = 2,
  noiseIntensity = 0.8,
  theme = {},
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const t = {
      bg0: theme?.bg0 ?? '#2A1B16',
      bg1: theme?.bg1 ?? '#3A2721',
      bg2: theme?.bg2 ?? '#2A1B16',
      silkR: theme?.silkR ?? 199,
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

    const noise = (x, y) => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

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