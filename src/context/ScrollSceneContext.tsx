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

  // Wheel & Touch gesture listener for smooth scrolling
  useEffect(() => {
    let isTransitionLocked = false;
    let touchStartY = 0;

    // Check if target is inside a scrollable container that hasn't reached its boundary
    const isScrollingInsideCard = (target: EventTarget | null, direction: number): boolean => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflow = style.overflow + style.overflowY;
        const isScrollable = overflow.includes('auto') || overflow.includes('scroll');
        if (isScrollable && el.scrollHeight > el.clientHeight) {
          // scrolling down but not at bottom, OR scrolling up but not at top
          if (direction > 0 && el.scrollTop < el.scrollHeight - el.clientHeight - 2) return true;
          if (direction < 0 && el.scrollTop > 2) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 18 || isTransitionLocked) return;
      if (isScrollingInsideCard(e.target, e.deltaY)) return;

      isTransitionLocked = true;
      const current = activeSectionRef.current;

      if (e.deltaY > 0) {
        // Scroll DOWN -> Next Section Card or loop back to Swarm (-1) after Contact (7)
        if (current < 7) {
          triggerCardTransitionRef.current(current + 1);
        } else if (current === 7) {
          triggerCardTransitionRef.current(-1);
        }
      } else if (e.deltaY < 0) {
        // Scroll UP -> Previous Section Card
        const prev = current - 1;
        if (prev >= -1) {
          triggerCardTransitionRef.current(prev);
        }
      }

      setTimeout(() => {
        isTransitionLocked = false;
      }, 750); // Cooldown matching complete 4-stage animation
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitionLocked) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffY) > 35) {
        isTransitionLocked = true;
        const current = activeSectionRef.current;

        if (diffY > 0) {
          // Swipe UP / Scroll DOWN -> Next Section Card or loop to Swarm (-1)
          if (current < 7) {
            triggerCardTransitionRef.current(current + 1);
          } else if (current === 7) {
            triggerCardTransitionRef.current(-1);
          }
        } else {
          // Swipe DOWN / Scroll UP -> Previous Section Card
          const prev = current - 1;
          if (prev >= -1) {
            triggerCardTransitionRef.current(prev);
          }
        }

        setTimeout(() => {
          isTransitionLocked = false;
        }, 750);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
