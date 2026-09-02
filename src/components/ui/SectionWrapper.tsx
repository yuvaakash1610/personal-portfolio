import React, { useState, useEffect } from 'react';
import { useScrollScene } from '../../context/ScrollSceneContext';

interface SectionWrapperProps {
  id: string;
  index: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

// ─── Typewriter cursor animation for section titles ──────────────────────────
const TypewriterTitle: React.FC<{ title: string; shouldStart: boolean }> = ({
  title,
  shouldStart,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayed('');
      setTyping(false);
      return;
    }
    setDisplayed('');
    setTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      if (i < title.length) {
        setDisplayed(title.slice(0, i + 1));
        i++;
      } else {
        setTyping(false);
        clearInterval(iv);
      }
    }, 35);
    return () => clearInterval(iv);
  }, [shouldStart, title]);

  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight flex items-center gap-2 min-h-[3rem]">
      <span>{displayed}</span>
      {(shouldStart || typing) && (
        <span
          className={`inline-block w-[3px] h-8 md:h-10 bg-cyan-400 rounded-sm shadow-[0_0_12px_#06B6D4] shrink-0 ${
            typing ? 'animate-pulse' : 'opacity-0'
          }`}
        />
      )}
    </h2>
  );
};

// ─── SectionWrapper ─────────────────────────────────────────────────────────
// Layout: fixed inset-0 overlay → navbar-aware top gap → side padding → border card → inner padding → scrollable content
export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  index,
  title,
  subtitle,
  children,
  className = '',
}) => {
  const { activeSection, leavingSection, cardState, reducedMotion } =
    useScrollScene();

  const isActive    = activeSection === index;
  const isLeaving   = leavingSection === index;
  const isCardReady = isActive && cardState === 'CARD_ACTIVE';

  // ── entrance / exit animation classes ──────────────────────────────────────
  const animClass = (() => {
    if (reducedMotion)
      return isActive
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95 pointer-events-none';

    if (isLeaving && cardState === 'CARD_RETURNING')
      return 'opacity-0 scale-[0.03] -translate-y-16 rotate-6 blur-2xl transition-all duration-400 ease-in pointer-events-none';

    if (!isActive) return 'opacity-0 scale-0 pointer-events-none';

    switch (cardState) {
      case 'SWARM_PULSING':     return 'opacity-0 scale-0 blur-3xl';
      case 'PARTICLE_SHOOTING': return 'opacity-0 scale-[0.03] translate-y-16 -rotate-6 blur-2xl';
      case 'CARD_UNFOLDING':    return 'opacity-90 scale-[1.01] blur-[2px] transition-all duration-350 ease-out';
      case 'CARD_ACTIVE':       return 'opacity-100 scale-100 blur-0 transition-all duration-300 ease-out';
      default:                  return 'opacity-0 scale-0 pointer-events-none';
    }
  })();

  const isVisible = isActive || (isLeaving && cardState === 'CARD_RETURNING');

  if (!isVisible && !isActive) return null;

  // ────────────────────────────────────────────────────────────────────────────
  // LAYOUT LAYERS (outermost → innermost):
  //
  //  [L1] fixed inset-0          = viewport-sized backdrop, z-20
  //  [L2] absolute inset values  = outer margin from ALL 4 edges
  //       top: 68px (navbar)     left/right: 24px    bottom: 16px
  //  [L3] 2px gradient border    = the glowing card frame (rounded-3xl)
  //  [L4] glass-panel            = the dark frosted-glass card surface
  //  [L5] overflow-y-auto div    = scrollable inner area
  //       px-8 sm:px-10          = LEFT + RIGHT inner padding (content ≠ border)
  //       pt-8 pb-8              = TOP + BOTTOM inner padding
  //  [L6] children               = section content
  // ────────────────────────────────────────────────────────────────────────────
  return (
    /* [L1] — Full-viewport overlay */
    <div
      id={id}
      aria-label={title}
      className={`fixed z-20 ${isVisible ? '' : 'hidden'}`}
      style={{ inset: 0 }}
    >
      {/* [L2] — Outer margin: keeps card AWAY from all screen edges */}
      <div
        style={{
          position:  'absolute',
          top:    '68px',   /* below fixed navbar */
          bottom: '16px',
          left:   '20px',
          right:  '20px',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        {/* Centering column — max-width constrains the card on wide screens */}
        <div style={{ width: '100%', maxWidth: '1024px', display: 'flex', flexDirection: 'column' }}>

          {/* [L3] — 2px gradient border frame */}
          <div
            style={{
              flex: '1 1 0',
              minHeight: 0,
              padding: '2px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(6,182,212,0.55) 0%, rgba(59,130,246,0.35) 50%, rgba(100,116,139,0.45) 100%)',
              boxShadow: '0 0 60px rgba(6,182,212,0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* [L4] — Glass card surface */}
            <div
              className={`glass-panel relative overflow-hidden transition-all ${animClass} ${className}`}
              style={{
                flex: '1 1 0',
                minHeight: 0,
                borderRadius: '22px',
              }}
            >
              {/* Corner status dot — absolutely placed, always inside card */}
              <div
                style={{ position: 'absolute', top: '16px', right: '20px', zIndex: 20 }}
                className="flex items-center gap-2 pointer-events-none"
              >
                <span className="hidden sm:inline text-[10px] font-mono text-cyan-400/70 tracking-[0.18em] uppercase">
                  3D Swarm Active
                </span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
                </span>
              </div>

              {/* [L5] — Scrollable inner area with LEFT+RIGHT inner padding */}
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  /* LEFT and RIGHT inner padding — content never touches border */
                  paddingLeft:   'clamp(24px, 5vw, 48px)',
                  paddingRight:  'clamp(24px, 5vw, 48px)',
                  paddingTop:    '36px',
                  paddingBottom: '36px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Section header */}
                <div
                  style={{
                    marginBottom: '28px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(6,182,212,0.15)',
                    /* Right padding so title doesn't go behind the "3D Swarm Active" badge */
                    paddingRight: '120px',
                  }}
                >
                  <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Section 0{index + 1}</span>
                  </div>

                  <TypewriterTitle title={title} shouldStart={isCardReady || reducedMotion} />

                  {subtitle && (
                    <p
                      className={`text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mt-2 transition-opacity duration-500 ${
                        isCardReady ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* [L6] — Actual section content */}
                <div className="space-y-6">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
