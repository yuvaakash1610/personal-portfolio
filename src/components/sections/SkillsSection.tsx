import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Code2, Cpu, Brain, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const categoryIcons = [Code2, Cpu, Brain, Wrench];

  return (
    <SectionWrapper
      id="skills"
      index={2}
      title="Skills & Technologies"
      subtitle="Categorized engineering proficiencies with practical hands-on experience"
    >
      <div className="space-y-8">
        {/* Category Tabs Group */}
        <div className="flex flex-wrap items-center gap-3">
          {skillCategories.map((cat, idx) => {
            const IconComponent = categoryIcons[idx % categoryIcons.length];
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 scale-105 border border-cyan-400/50'
                    : 'bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400/50'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0 text-cyan-300" />
                <span className="whitespace-nowrap">{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid — Responsive 2-3 Columns Desktop, 2 Tablet, 1 Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skillCategories[activeCategory].skills.map((skill) => (
            <GlassCard
              key={skill.name}
              glowColor="cyan"
              className="p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:scale-[1.02] transition-transform duration-300 h-full"
            >
              <div className="space-y-4">
                {/* Header with Visual Tech Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-lg leading-snug">{skill.name}</h4>
                  </div>
                  <span className="text-sm font-mono text-cyan-300 font-extrabold px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/40 shrink-0">
                    {skill.level}%
                  </span>
                </div>

                {skill.description && (
                  <p className="text-sm text-slate-200 leading-relaxed font-light">
                    {skill.description}
                  </p>
                )}
              </div>

              {/* Progress Bar & Level Indicator Tag */}
              <div className="space-y-3 pt-4 border-t border-cyan-900/30">
                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-[1px] border border-cyan-500/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-1000 shadow-[0_0_12px_#06B6D4]"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-widest text-[10px]">Verified Proficiency</span>
                  </div>
                  <span className="text-white uppercase font-bold tracking-wider text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {skill.level && skill.level >= 90 ? 'Expert' : skill.level && skill.level >= 84 ? 'Advanced' : 'Intermediate'}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
