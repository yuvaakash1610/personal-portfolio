import React from 'react';
import { ScrollSceneProvider } from './context/ScrollSceneContext';
import { MainCanvas } from './components/3d/MainCanvas';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { UniverseIntroPrompt } from './components/ui/UniverseIntroPrompt';

import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { EducationSection } from './components/sections/EducationSection';
import { ContactSection } from './components/sections/ContactSection';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { useScrollScene } from './context/ScrollSceneContext';

import { LoadingScreen } from './components/ui/LoadingScreen';

// Inner component has access to context
const AppInner: React.FC = () => {
  const { activeSection } = useScrollScene();
  const isSwarm = activeSection === -1;

  return (
    <div className="relative w-full min-h-screen bg-[#030308] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-clip">
      {/* Sci-Fi Loading Screen Preloader */}
      <LoadingScreen />

      {/* Custom comet-trail cursor */}
      <CustomCursor />

      {/* 3D WebGL Background — fixed, behind everything */}
      <MainCanvas />

      {/* Fixed navbar — always on top */}
      <Navbar />

      {/* Swarm intro overlay — only shows when activeSection === -1 */}
      <UniverseIntroPrompt />

      {/*
       * Section portal — all sections render as fixed overlays.
       * Each SectionWrapper is fixed inset-0 and shows/hides itself.
       * No layout flow here; the main tag is just a React mount point.
       */}
      <main aria-label="Portfolio sections">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/*
       * Footer — only visible on swarm page (index === -1).
       * When a section card is open, it overlays the entire viewport,
       * so the footer is visually hidden behind the card overlay anyway.
       * We hide it explicitly on non-swarm states to avoid z-index confusion.
       */}
      {isSwarm && (
        <footer className="fixed bottom-0 left-0 right-0 z-10 py-3 px-4 sm:px-6 bg-transparent">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-pulse" />
            <span>
              © {new Date().getFullYear()} {PORTFOLIO_DATA.personalInfo.name} — All Rights Reserved
            </span>
          </div>
        </footer>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ScrollSceneProvider>
      <AppInner />
    </ScrollSceneProvider>
  );
};

export default App;
