import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface SectionInfo {
  id: string;
  name: string;
  index: number;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'hero', name: 'Home', index: 0 },
  { id: 'about', name: 'About', index: 1 },
  { id: 'skills', name: 'Skills', index: 2 },
  { id: 'projects', name: 'Projects', index: 3 },
  { id: 'experience', name: 'Experience', index: 4 },
  { id: 'achievements', name: 'Achievements', index: 5 },
  { id: 'education', name: 'Education', index: 6 },
  { id: 'contact', name: 'Contact', index: 7 },
];

export type CardState =
  | 'INTRO_UNIVERSE'   // pure 3D particle universe initially
  | 'CARD_RETURNING'   // old card shrinking & flying BACK INTO 3D swirl core
  | 'SWARM_PULSING'    // swarm core pulsing energy
  | 'PARTICLE_SHOOTING'// new particle shooting OUT from 3D swirl core
  | 'CARD_UNFOLDING'   // new card expanding out from particle
  | 'CARD_ACTIVE';     // card fully open & interactive

interface ScrollSceneContextType {
  activeSection: number; // -1 for initial universe, 0 to 7 for cards
  leavingSection: number; // section index currently flying into swarm
  setActiveSection: (index: number) => void;
  cardState: CardState;
  setCardState: (state: CardState) => void;
  particlePos: [number, number, number];
  reducedMotion: boolean;
  mousePos: { x: number; y: number };
  triggerCardTransition: (targetIndex: number) => void;
}

const ScrollSceneContext = createContext<ScrollSceneContextType | undefined>(undefined);

export const ScrollSceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<number>(-1); // -1 = start empty universe!
  const [leavingSection, setLeavingSection] = useState<number>(-1);
  const [cardState, setCardState] = useState<CardState>('INTRO_UNIVERSE');
  const [particlePos] = useState<[number, number, number]>([0, 0, 0]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeSectionRef = useRef(activeSection);
  const cardStateRef = useRef(cardState);

  useEffect(() => {
    activeSectionRef.current = activeSection;
    cardStateRef.current = cardState;
  }, [activeSection, cardState]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 4-Stage Transition Engine (Fast – reduced by 0.3s):
  // 1. Current Card flies BACK INTO 3D swirl core (CARD_RETURNING, 200ms)
  // 2. Swarm Core Pulses (SWARM_PULSING, 100ms)
  // 3. New particle shoots OUT towards viewer (PARTICLE_SHOOTING, 100ms)
  // 4. New Card unfolds (CARD_UNFOLDING -> CARD_ACTIVE, 150ms + 100ms)
  const triggerCardTransition = (targetIndex: number) => {
    if (targetIndex === activeSectionRef.current && cardStateRef.current === 'CARD_ACTIVE') return;

    // Sync URL hash for browser history & bookmarking without reloading
    const targetHash = targetIndex === -1 ? '#universe' : `#${SECTIONS[targetIndex]?.id || 'hero'}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({ sectionIndex: targetIndex }, '', targetHash);
    }

    if (reducedMotion) {
      setActiveSection(targetIndex);
      setLeavingSection(-1);
      setCardState(targetIndex === -1 ? 'INTRO_UNIVERSE' : 'CARD_ACTIVE');
      return;
    }

    const currentSection = activeSectionRef.current;
    setLeavingSection(currentSection);

    // Stage 1: Current card shrinks & flies back into 3D swirl core
    if (currentSection !== -1) {
      setCardState('CARD_RETURNING');
    } else {
      setCardState('PARTICLE_SHOOTING');
    }

    // Stage 2: Swarm Core absorbs card particle & pulses
    setTimeout(() => {
      setCardState('SWARM_PULSING');
      setLeavingSection(-1);

      if (targetIndex === -1) {
        setActiveSection(-1);
        setTimeout(() => {
          setCardState('INTRO_UNIVERSE');
        }, 100);
        return;
      }

      // Stage 3: Particle shoots out from swarm core towards viewer
      setTimeout(() => {
        setActiveSection(targetIndex);
        setCardState('PARTICLE_SHOOTING');

        // Stage 4: New Card unfolds from particle
        setTimeout(() => {
          setCardState('CARD_UNFOLDING');

          setTimeout(() => {
            setCardState('CARD_ACTIVE');
          }, 100);
        }, 150);
      }, 100);
    }, currentSection !== -1 ? 200 : 0);
  };

  const triggerCardTransitionRef = useRef(triggerCardTransition);
  useEffect(() => {
    triggerCardTransitionRef.current = triggerCardTransition;
  });

  // Keyboard navigation & browser Back/Forward (popstate) listener
  useEffect(() => {
    // 1. Initial Hash check on page mount
    const initialHash = window.location.hash.replace('#', '').toLowerCase();
    if (initialHash && initialHash !== 'universe' && initialHash !== 'swarm') {
      const match = SECTIONS.find((s) => s.id === initialHash);
      if (match) {
        triggerCardTransitionRef.current(match.index);
      }
    }

    // 2. Browser Back / Forward navigation handling
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash || hash === 'universe' || hash === 'swarm') {
        triggerCardTransitionRef.current(-1);
      } else {
        const match = SECTIONS.find((s) => s.id === hash);
        if (match) {
          triggerCardTransitionRef.current(match.index);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // 3. Accessible Keyboard Navigation controls
    let isKeyLocked = false;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept keystrokes when typing inside inputs, textareas or contenteditables
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (isKeyLocked) return;

      const current = activeSectionRef.current;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        isKeyLocked = true;
        if (current < SECTIONS.length - 1) {
          triggerCardTransitionRef.current(current + 1);
        } else if (current === SECTIONS.length - 1) {
          triggerCardTransitionRef.current(-1);
        }
        setTimeout(() => {
          isKeyLocked = false;
        }, 750);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        isKeyLocked = true;
        if (current > 0) {
          triggerCardTransitionRef.current(current - 1);
        } else if (current === 0) {
          triggerCardTransitionRef.current(-1);
        } else if (current === -1) {
          triggerCardTransitionRef.current(SECTIONS.length - 1);
        }
        setTimeout(() => {
          isKeyLocked = false;
        }, 750);
      } else if (e.key === 'Home') {
        e.preventDefault();
        triggerCardTransitionRef.current(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        triggerCardTransitionRef.current(SECTIONS.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ScrollSceneContext.Provider
      value={{
        activeSection,
        leavingSection,
        setActiveSection,
        cardState,
        setCardState,
        particlePos,
        reducedMotion,
        mousePos,
        triggerCardTransition,
      }}
    >
      {children}
    </ScrollSceneContext.Provider>
  );
};

export const useScrollScene = () => {
  const context = useContext(ScrollSceneContext);
  if (!context) {
    throw new Error('useScrollScene must be used within a ScrollSceneProvider');
  }
  return context;
};
