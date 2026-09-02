import React from 'react';
import { useScrollScene } from '../../context/ScrollSceneContext';

export const UniverseIntroPrompt: React.FC = () => {
  const { activeSection } = useScrollScene();

  if (activeSection !== -1) return null;

  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none">
      <div className="max-w-3xl space-y-5 animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
        {/* Status Badge — Enhanced contrast & crisp text shadow */}
        <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-slate-950/85 border border-cyan-400/50 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.35)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span
            className="text-xs font-mono text-cyan-200 tracking-[0.2em] uppercase font-bold"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 10px rgba(6,182,212,0.4)' }}
          >
            PORTFOLIO UNIVERSE ACTIVE
          </span>
        </div>

        {/* Title Group with Local Text-Specific Radial Backdrop */}
        <div className="relative py-3 px-8 rounded-3xl flex flex-col items-center justify-center">
          {/* Local Dark Radial Backdrop — Sitting directly behind text ONLY */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none rounded-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 80%)',
            }}
          />

          {/* Hero Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight font-heading"
            style={{
              textShadow:
                '0 0 12px rgba(0, 220, 255, 0.45), 0 0 28px rgba(120, 70, 255, 0.30), 0 3px 12px rgba(0, 0, 0, 0.85)',
            }}
          >
            <span className="text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
              Yuvaakash's
            </span>{' '}
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
              Portfolio Universe
            </span>
          </h1>
        </div>

        {/* Subtitle — Brighter, bold weight, dark drop shadow */}
        <p
          className="text-slate-100 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-semibold leading-relaxed tracking-wide"
          style={{
            textShadow:
              '0 2px 10px rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.9)',
          }}
        >
          Yuvaakash's origin-centered algorithmic particle universe
        </p>
      </div>
    </div>
  );
};
