import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <SectionWrapper
      id="experience"
      index={4}
      title="Industrial Internship"
      subtitle="Hands-on full stack python development at Approtech Info Tech"
    >
      <div className="space-y-6">
        {experience.map((exp) => (
          <GlassCard key={exp.id} glowColor="cyan" className="space-y-6 p-7 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/30 pb-5">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{exp.company}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{exp.role}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 border border-cyan-500/30">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              {exp.description}
            </p>

            {/* Key Contributions */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white tracking-wider uppercase">
                Key Engineering Contributions:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.keyContributions.map((contrib, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{contrib}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="pt-3 border-t border-cyan-900/30 flex flex-wrap items-center gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900/90 border border-cyan-500/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
