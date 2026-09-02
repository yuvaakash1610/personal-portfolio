import React, { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 18;

interface TrailDot {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef<TrailDot[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const rafRef = useRef<number>(0);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Detect touch-only devices — hide cursor on them
    if (window.matchMedia('(hover: none)').matches) {
      isTouchRef.current = true;
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const canvas = canvasRef.current!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const draw = () => {
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shift trail: fastest interpolation for head
      const trail = trailRef.current;
      trail[0].x += (posRef.current.x - trail[0].x) * 0.45;
      trail[0].y += (posRef.current.y - trail[0].y) * 0.45;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.38;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.38;
      }

      // Draw trail segments — comet tail from oldest to newest
      for (let i = TRAIL_LENGTH - 1; i >= 1; i--) {
        const ratio = 1 - i / TRAIL_LENGTH;
        const radius = 2.5 * ratio + 0.5;
        const alpha = ratio * 0.85;
        // cyan → white gradient along trail
        const r = Math.round(6 + (255 - 6) * ratio);
        const g = Math.round(182 + (255 - 182) * ratio);
        const b = Math.round(212 + (255 - 212) * ratio);
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      // Draw bright dot at cursor tip
      ctx.beginPath();
      ctx.arc(trail[0].x, trail[0].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#06B6D4';
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="hidden lg:block fixed inset-0 z-[9999] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
