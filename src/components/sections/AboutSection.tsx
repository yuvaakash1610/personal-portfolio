import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Code2, Server, Brain, GraduationCap, Building2, User } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { personalInfo } = PORTFOLIO_DATA;

  return (
    <SectionWrapper
      id="about"
      index={1}
      title="About Me"
      subtitle="Full Stack Engineering & Artificial Intelligence"
    >
      <div className="space-y-8">
        {/* Intro */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-semibold">
            <User className="w-4 h-4" />
            <span>Developer Bio — {personalInfo.name}</span>
          </div>
          <p className="text-slate-100 text-base md:text-lg leading-relaxed font-light">
            I'm <strong className="text-white font-bold">{personalInfo.name}</strong>, a {personalInfo.shortBio}
          </p>
        </div>

        {/* Capability Cards Grid — 2-column layout as specified in requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <GlassCard glowColor="cyan" className="flex flex-col gap-4 p-6 sm:p-7 h-full">
            <div className="p-3 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 w-fit">
              <Code2 className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-white">Frontend Development</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Expert in React, Vue.js, HTML5, CSS3, JavaScript, and TypeScript. Building responsive,
                accessible user interfaces with modern frameworks and pixel-perfect designs.
              </p>
            </div>
          </GlassCard>

          <GlassCard glowColor="cyan" className="flex flex-col gap-4 p-6 sm:p-7 h-full">
            <div className="p-3 rounded-xl bg-slate-600/20 border border-slate-400/30 text-slate-300 w-fit">
              <Server className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-white">Backend Engineering</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Experienced in Python, Node.js, Express.js, Django/Flask, RESTful APIs, and database
                design. Building robust server-side applications focused on scalability.
              </p>
            </div>
          </GlassCard>

          <GlassCard glowColor="cyan" className="flex flex-col gap-4 p-6 sm:p-7 h-full md:col-span-2 lg:col-span-1">
            <div className="p-3 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 w-fit">
              <Brain className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-white">AI / ML &amp; Computer Vision</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Specialized in machine learning, deep learning, and computer vision. Developed the
                National Marine Oil Spill Detection system using satellite image processing and AI models.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* 2 Stat / Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 shadow-lg">
            <div className="p-3.5 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400 shrink-0">
              <GraduationCap className="w-6.5 h-6.5" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-white">2nd Year B.E.</h4>
              <p className="text-xs text-cyan-300 font-mono uppercase tracking-wider">Computer Science &amp; Engineering</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 shadow-lg">
            <div className="p-3.5 rounded-xl bg-slate-600/20 border border-slate-400/30 text-slate-300 shrink-0">
              <Building2 className="w-6.5 h-6.5" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-white">Panimalar</h4>
              <p className="text-xs text-slate-300 font-mono uppercase tracking-wider">Engineering College, Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
