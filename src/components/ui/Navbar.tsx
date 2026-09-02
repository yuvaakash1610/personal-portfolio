import React, { useState } from 'react';
import { useScrollScene, SECTIONS } from '../../context/ScrollSceneContext';
import { Menu, X, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeSection, triggerCardTransition } = useScrollScene();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (index: number) => {
    setMobileMenuOpen(false);
    triggerCardTransition(index);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 bg-[#030308]/80 backdrop-blur-xl border-b border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick(-1)}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-slate-600 flex items-center justify-center p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-[#070714] rounded-[11px] flex items-center justify-center">
              <Code2 className="w-4.5 h-4.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="hidden min-[360px]:block">
            <span className="font-heading font-bold text-base sm:text-lg text-white tracking-wider group-hover:text-cyan-400 transition-colors">
              YUVA AKASH
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] text-slate-400 tracking-widest uppercase">Swarm Core</span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Items — compact flex container with responsive font sizing */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#0A0B1E]/80 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-full shadow-2xl shrink max-w-full overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleNavClick(-1)}
            className={`px-2.5 py-1 rounded-full text-[11px] xl:text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
              activeSection === -1
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🌌 Swarm
          </button>
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.index;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.index)}
                className={`relative px-2.5 py-1 rounded-full text-[11px] xl:text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/80 to-slate-500/80 rounded-full -z-10 shadow-lg shadow-cyan-500/30" />
                )}
                {sec.name}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white shrink-0"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-4 p-4 rounded-2xl bg-[#0A0B1E]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-300 max-w-full">
          <button
            onClick={() => handleNavClick(-1)}
            className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
          >
            🌌 Portfolio Universe
          </button>
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.index;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.index)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/60 to-slate-500/60 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {sec.name}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
