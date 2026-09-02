import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Zap } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Smooth progress counter from 0 to 100 over ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 6) + 3;
        return Math.min(100, prev + increment);
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Hold for 300ms at 100%, then trigger smooth 1000ms (1s) fade out
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true);
      }, 300);

      // Hide completely after the 1000ms fade transition finishes
      const hideTimeout = setTimeout(() => {
        setIsHidden(true);
      }, 1400);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress]);

  if (isHidden) return null;

  // Dynamic console diagnostic log entries based on progress percentage
  const getLogs = (pct: number) => {
    const logs = [];
    if (pct >= 5) logs.push('SYSTEM: Initializing Yuvaakash Portfolio Core v2.0');
    if (pct >= 30) logs.push('SHADER: Compiling 3D Three.js particle shaders');
    if (pct >= 60) logs.push('MATRIX: Positioning 10,000+ interactive particle nodes');
    if (pct >= 85) logs.push('LAYOUT: Assembling responsive glassmorphism section cards');
    if (pct >= 100) logs.push('STATUS: Systems operational. Welcome to Portfolio Universe.');
    return logs;
  };

  const activeLogs = getLogs(progress);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#020206] text-slate-100 select-none overflow-hidden transition-all duration-1000 ease-in-out ${
        isFadingOut
          ? 'opacity-0 scale-110 blur-md pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Ambient Cosmic Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,rgba(3,7,18,0.95)_75%)] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Futuristic Corner HUD Reticles (Sci-Fi Brackets) */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-sm pointer-events-none drop-shadow-[0_0_8px_#06B6D4]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-sm pointer-events-none drop-shadow-[0_0_8px_#06B6D4]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-sm pointer-events-none drop-shadow-[0_0_8px_#06B6D4]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-400/80 rounded-br-sm pointer-events-none drop-shadow-[0_0_8px_#06B6D4]" />

      {/* Top Telemetry Bar */}
      <div className="relative z-10 w-full max-w-5xl px-8 pt-8 flex items-center justify-between font-mono text-[11px] text-cyan-400/80 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>YUVAAKASH_OS // BOOT_SEQ</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <span>MEM: OK</span>
          <span>GPU: ACCELERATED</span>
          <span>FPS: 60</span>
        </div>
      </div>

      {/* Main Central Loader Unit */}
      <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-6 text-center space-y-8 my-auto">
        {/* Holographic Concentric Orbital Rings Spinner */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Cyan Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin shadow-[0_0_35px_rgba(6,182,212,0.4)]" style={{ animationDuration: '4s' }} />

          {/* Middle Blue Gradient Counter-Ring */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500 border-b-sky-400 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />

          {/* Inner Cyan Hexagon Core */}
          <div className="absolute inset-7 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_#06B6D4] animate-pulse">
            <Zap className="w-8 h-8 text-cyan-300 drop-shadow-[0_0_10px_#06B6D4]" />
          </div>

          {/* Corner Orbiting Spark Indicators */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#06B6D4]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#3B82F6]" />
        </div>

        {/* Brand Name & Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest font-semibold">
              Full Stack &amp; AI Developer
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-widest drop-shadow-[0_2px_20px_rgba(6,182,212,0.4)]">
            YUVAAKASH K
          </h1>

          <p className="text-xs font-mono text-cyan-400 uppercase tracking-[0.3em]">
            Portfolio Universe
          </p>
        </div>

        {/* Interactive Console Log Output Box */}
        <div className="w-full bg-[#050814]/90 border border-cyan-500/30 rounded-xl p-4 text-left font-mono text-[11px] text-slate-300 shadow-xl space-y-1.5 min-h-[95px] flex flex-col justify-end overflow-hidden">
          <div className="flex items-center gap-2 text-xs text-cyan-400 pb-1 border-b border-cyan-900/40 mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>INITIALIZATION TERMINAL</span>
          </div>
          {activeLogs.slice(-3).map((log, idx) => (
            <div key={idx} className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span className="text-slate-200">{log}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar & Percentage Counter */}
        <div className="w-full space-y-3">
          {/* Progress Bar Container */}
          <div className="w-full h-2.5 rounded-full bg-slate-950 border border-cyan-500/40 overflow-hidden p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-300 transition-all duration-150 ease-out shadow-[0_0_16px_#06B6D4]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage & Audio Waves Spectrum Effect */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1">
              {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-cyan-400 rounded-full animate-pulse"
                  style={{ height: `${(h * (progress / 100)) / 6}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">LOADING:</span>
              <span className="text-cyan-300 font-bold text-base tracking-widest drop-shadow-[0_0_10px_#06B6D4]">
                {progress < 10 ? `0${progress}` : progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="relative z-10 w-full max-w-5xl px-8 pb-8 flex items-center justify-between font-mono text-[10px] text-slate-400">
        <span>© 2026 YUVAAKASH K</span>
        <span className="text-cyan-400/80">3D ENGINE: THREE.JS / WEBGL</span>
      </div>
    </div>
  );
};
