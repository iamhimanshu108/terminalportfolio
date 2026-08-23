import React from 'react';
import { NavPath } from '../../types';
import { EDUCATION_DATA } from '../../data/educationCertData';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { Typewriter } from '../Typewriter';
import { sound } from '../../lib/sound';

interface EducationViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onOpenDriveModal?: (item: any, type: 'pdf' | 'image') => void;
}

export const EducationView: React.FC<EducationViewProps> = ({
  onNavigate,
  onOpenSsh,
  onOpenDriveModal
}) => {
  return (
    <div className="space-y-6 font-mono text-xs text-slate-200 animate-fadeIn">
      {/* Minimal Top Header Command */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span className="hidden sm:inline">root@iamhimanshu108:~$</span>
          <span className="sm:hidden">~$</span>
          <Typewriter text="cat ~/education.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
      </div>

      {/* Main Education Grid / Cards */}
      <div className="space-y-5">
        {[...EDUCATION_DATA].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)).map((item, idx) => {
          const isPursuing = item.status === 'PURSUING';
          return (
            <div
              key={item.id}
              className="bg-[#070C18] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] space-y-4 group"
            >
              {/* Card Top Title Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold">[{idx + 1}]</span>
                    <h2 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {item.degree}
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                        item.status === 'COMPLETED'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                          : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40'
                      }`}
                    >
                      [{item.status}]
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      {item.institution}
                    </span>
                    <span className="text-slate-600">//</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.year}
                    </span>
                    <span className="text-slate-600">//</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlights Box matching classic terminal aesthetic */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="bg-[#040812] border border-slate-800/80 p-3.5 rounded-lg space-y-2">
                  <ul className="space-y-2 text-slate-300 text-xs font-mono">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start space-x-2">
                        <span className="text-emerald-400 font-bold shrink-0">&gt;</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
