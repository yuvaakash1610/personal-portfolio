import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { IconGithub } from '../ui/SocialIcons';

export const ProjectsSection: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <SectionWrapper
      id="projects"
      index={3}
      title="Featured Projects"
      subtitle="Key projects demonstrating full-stack engineering and AI/computer-vision innovation"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {projects.map((project) => (
          <GlassCard
            key={project.id}
            glowColor="cyan"
            className="flex flex-col justify-between space-y-6 p-7 sm:p-8 group hover:-translate-y-1 transition-all duration-300 h-full"
          >
            <div className="space-y-4">
              {/* Category Badge & Links */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full border bg-cyan-950/40 border-cyan-500/30 text-cyan-300">
                  {project.category}
                </span>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-2 text-xs"
                    title="View Source Code on GitHub"
                  >
                    <IconGithub className="w-4 h-4" />
                    <span className="font-mono">GitHub Repo</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                )}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium pt-1">{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-200 leading-relaxed">
                {project.longDescription}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Key Features & Architecture:</h4>
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-4 border-t border-cyan-900/30">
              <div className="flex flex-wrap items-center gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900/90 border border-slate-700 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
};
