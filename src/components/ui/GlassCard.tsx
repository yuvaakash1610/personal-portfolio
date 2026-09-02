import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'violet' | 'cyan' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick,
}) => {
  const glowClasses = {
    violet: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.35)] hover:border-cyan-400/60',
    cyan: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] hover:border-cyan-400/60',
    none: 'hover:border-slate-500/50',
  };

  return (
    <div className="p-[2px] rounded-[22px] bg-gradient-to-r from-cyan-500/30 via-slate-400/20 to-blue-500/30 transition-all duration-300">
      <div
        onClick={onClick}
        className={`glass-panel p-6 sm:p-7 md:p-8 px-6 sm:px-7 md:px-8 rounded-[20px] relative overflow-hidden transition-all duration-300 ${glowClasses[glowColor]} ${className}`}
      >
        {/* Background radial glow highlight */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">{children}</div>
      </div>
    </div>
  );
};
