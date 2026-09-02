import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { ArrowRight, Mail, Terminal, Cpu, Database, Layout } from 'lucide-react';
import { IconGithub, IconLinkedin } from '../ui/SocialIcons';
import { useScrollScene } from '../../context/ScrollSceneContext';

export const HeroSection: React.FC = () => {
  const { personalInfo } = PORTFOLIO_DATA;
  const { triggerCardTransition } = useScrollScene();

  return (
    <SectionWrapper
      id="hero"
      index={0}
      title={`Hi, I'm ${personalInfo.name}`}
      subtitle="2nd Year CSE Student @ Panimalar Engineering College • Full Stack & AI/ML Developer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-2">
        {/* Left Column: Hero Copy & Prominent Buttons */}
        <div className="lg:col-span-7 space-y-7">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/70 border border-cyan-500/30 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
              CSE Student @ Panimalar Engineering College
            </span>
          </div>

          {/* Hero Statement */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-snug font-heading">
            "{personalInfo.heroMessage}"
          </h3>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            {personalInfo.shortBio}
          </p>

          {/* Floating Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="glass-pill">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Python Full Stack</span>
            </div>
            <div className="glass-pill glass-pill-cyan">
              <Cpu className="w-4 h-4 text-cyan-300" />
              <span>AI / Computer Vision</span>
            </div>
            <div className="glass-pill">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>PostgreSQL & Node.js</span>
            </div>
            <div className="glass-pill glass-pill-cyan">
              <Layout className="w-4 h-4 text-sky-400" />
              <span>React & Vue.js</span>
            </div>
          </div>

          {/* PROMINENT & HIGHLY VISIBLE ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-5 pt-4 pb-2">
            <button
              onClick={() => triggerCardTransition(3)} // Projects Card
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs tracking-widest uppercase shadow-2xl shadow-cyan-600/40 hover:shadow-cyan-400/60 hover:scale-105 transition-all duration-300 flex items-center gap-3 active:scale-95 group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => triggerCardTransition(7)} // Contact Card
              className="px-8 py-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-100 hover:text-white font-bold text-xs tracking-widest uppercase hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 flex items-center gap-2.5 active:scale-95 shadow-lg cursor-pointer"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact Me</span>
            </button>

            {/* Direct Social Links */}
            <div className="flex items-center gap-3 pl-1">
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:scale-110 transition-all shadow-md"
                title="LinkedIn Profile"
              >
                <IconLinkedin className="w-4.5 h-4.5" />
              </a>

              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400 hover:scale-110 transition-all shadow-md"
                title="GitHub Profile"
              >
                <IconGithub className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Code Snippet Profile Card */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#08091A] border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] font-mono text-slate-400">developer.ts</span>
            </div>

            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto p-2">
              <code>
                <span className="text-cyan-400">const</span> <span className="text-cyan-300">student</span> = {'{\n'}
                {'  '}name: <span className="text-emerald-300">'Yuvaakash K'</span>,{'\n'}
                {'  '}college: <span className="text-emerald-300">'Panimalar Eng. College'</span>,{'\n'}
                {'  '}dept: <span className="text-emerald-300">'CSE (2nd Year)'</span>,{'\n'}
                {'  '}focus: [<span className="text-emerald-300">'Python Full Stack'</span>, <span className="text-emerald-300">'AI/ML'</span>]{'\n'}
                {'}'};
              </code>
            </pre>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
