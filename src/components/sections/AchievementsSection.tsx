import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { Briefcase, Lightbulb, Palette, Code2, ExternalLink } from 'lucide-react';
import { IconLinkedin } from '../ui/SocialIcons';

export const AchievementsSection: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Briefcase,
    Lightbulb,
    Palette,
    Code2,
  };

  return (
    <SectionWrapper
      id="achievements"
      index={5}
      title="Achievements & Milestones"
      subtitle="Industry internship, hackathons, design showcases, and competitive coding milestones"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {achievements.map((ach) => {
          const IconComponent = iconMap[ach.icon] || Briefcase;
          return (
            <GlassCard
              key={ach.id}
              glowColor="cyan"
              className="space-y-5 p-7 flex flex-col justify-between group hover:scale-[1.01] transition-all duration-300 h-full"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-600/40 to-blue-600/40 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                    {ach.category}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {ach.title}
                </h3>

                <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{ach.issuer}</p>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                  {ach.description}
                </p>
              </div>

              {ach.linkedInUrl && (
                <div className="pt-4 border-t border-cyan-900/30">
                  <a
                    href={ach.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <IconLinkedin className="w-4 h-4 text-blue-400" />
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
