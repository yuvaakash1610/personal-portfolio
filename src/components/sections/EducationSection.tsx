import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SectionWrapper } from '../ui/SectionWrapper';
import { GlassCard } from '../ui/GlassCard';
import { GraduationCap, MapPin, Calendar, BookOpen, CheckCircle } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education } = PORTFOLIO_DATA.personalInfo;

  return (
    <SectionWrapper
      id="education"
      index={6}
      title="Education & Academic Timeline"
      subtitle="B.E. Computer Science & Engineering — Panimalar Engineering College"
    >
      <div className="space-y-6">
        <GlassCard glowColor="cyan" className="space-y-6 p-7 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-900/30 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/30 shrink-0">
                <div className="w-full h-full bg-[#070714] rounded-[15px] flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{education.degree}</h3>
                <p className="text-cyan-400 font-semibold text-sm mt-0.5">
                  {education.institution}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-cyan-500/30">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{education.year}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{education.location}</span>
              </div>
            </div>
          </div>

          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Currently pursuing 2nd year B.E. in Computer Science & Engineering. Deepening skills in Data Structures, Algorithms, Web Engineering, Database Systems, Computer Networks, and Machine Learning.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Core Academic Subjects & Specializations:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Data Structures & Algorithms</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Web Engineering</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Database Systems (SQL)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Operating Systems & Linux Shell</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Computer Networks</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Machine Learning Systems</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
