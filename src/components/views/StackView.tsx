import React from 'react';
import { NavPath } from '../../types';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { SKILLS_DATA, SkillCategoryGroup } from '../../data/skillsData';
import { 
  Code2, 
  Server, 
  Database, 
  Bot, 
  Sparkles,
  Layers,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Boxes,
  Workflow
} from 'lucide-react';
import { Typewriter } from '../Typewriter';
import { sound } from '../../lib/sound';

interface StackViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
}

export const renderSkillIcon = (iconType?: string) => {
  switch (iconType) {
    case 'spring':
      return (
        <svg className="w-3.5 h-3.5 text-[#E76F00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 19h16v2H4zm12-4H8c-2.21 0-4-1.79-4-4V5h16v6c0 2.21-1.79 4-4 4zm2-8H6v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
        </svg>
      );
    case 'shield':
      return <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    case 'nodejs':
      return (
        <svg className="w-3.5 h-3.5 text-[#339933] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1v7.2L12 19.7l-7.5-4.1V8.4L12 4.3z" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg className="w-3.5 h-3.5 text-[#009688] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L3 13h7v9l9-11h-7V2z" />
        </svg>
      );
    case 'boxes':
      return <Boxes className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    case 'postgres':
      return (
        <svg className="w-3.5 h-3.5 text-[#336791] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className="w-3.5 h-3.5 text-[#00758F] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c3.87 0 7 1.34 7 2s-3.13 2-7 2-7-1.34-7-2 3.13-2 7-2zm0 14c-3.87 0-7-1.34-7-2v-2.15c1.78 1.09 4.26 1.65 7 1.65s5.22-.56 7-1.65V17c0 .66-3.13 2-7 2z" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg className="w-3.5 h-3.5 text-[#47A248] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2V13h2v3.5zm0-5.5h-2V7h2v4z" />
        </svg>
      );
    case 'redis':
      return (
        <svg className="w-3.5 h-3.5 text-[#DC382D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zm-10 8l10 5 10-5M2 15l10 5 10-5" />
        </svg>
      );
    case 'docker':
      return (
        <svg className="w-3.5 h-3.5 text-[#2496ED] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.98 11.08h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm-2.38 0h1.89v1.9H6.84zm7.14-2.38h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm7.14-2.38h1.89v1.9h-1.89z" />
        </svg>
      );
    case 'bash':
      return <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    case 'git':
      return (
        <svg className="w-3.5 h-3.5 text-[#F05032] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
    case 'maven':
      return (
        <svg className="w-3.5 h-3.5 text-[#C71A36] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'postman':
      return (
        <svg className="w-3.5 h-3.5 text-[#FF6C37] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      );
    case 'workflow':
      return <Workflow className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
    case 'sparkles':
      return <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    case 'cpu':
      return <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
    case 'code':
      return <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    case 'layers':
      return <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    case 'bot':
      return <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    case 'react':
      return (
        <svg className="w-3.5 h-3.5 text-[#61DAFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'next':
      return <Globe className="w-3.5 h-3.5 text-slate-100 shrink-0" />;
    case 'typescript':
      return (
        <span className="w-3.5 h-3.5 bg-[#3178C6] text-white font-black text-[8px] rounded flex items-center justify-center tracking-tighter shrink-0">
          TS
        </span>
      );
    case 'javascript':
      return (
        <span className="w-3.5 h-3.5 bg-[#F7DF1E] text-black font-black text-[8px] rounded flex items-center justify-center tracking-tighter shrink-0">
          JS
        </span>
      );
    case 'tailwind':
      return <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    default:
      return <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
  }
};

const renderCategoryIcon = (iconName: SkillCategoryGroup['iconName']) => {
  switch (iconName) {
    case 'server':
      return <Server className="w-4 h-4 text-emerald-400" />;
    case 'database':
      return <Database className="w-4 h-4 text-cyan-400" />;
    case 'cpu':
      return <Cpu className="w-4 h-4 text-amber-400" />;
    case 'bot':
      return <Bot className="w-4 h-4 text-purple-400" />;
    case 'code':
      return <Code2 className="w-4 h-4 text-sky-400" />;
    case 'layers':
      return <Layers className="w-4 h-4 text-cyan-400" />;
    case 'zap':
      return <Zap className="w-4 h-4 text-emerald-400" />;
    default:
      return <Code2 className="w-4 h-4 text-emerald-400" />;
  }
};

export const StackView: React.FC<StackViewProps> = () => {
  const sortedCategories = [...SKILLS_DATA].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <div className="space-y-5 font-mono text-xs text-slate-200">
      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCategories.map((cat) => {
          const sortedSkills = [...cat.skills].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          return (
            <div
              key={cat.id || cat.title}
              className={`p-4 sm:p-5 rounded-xl border bg-[#080C16] ${cat.borderColor || 'border-slate-800'} transition-all duration-200 space-y-3.5 shadow-lg`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2.5">
                {renderCategoryIcon(cat.iconName)}
                <h3 className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight font-sans">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Pills Container */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {sortedSkills.map((pill) => (
                  <div
                    key={pill.id || pill.name}
                    onClick={() => sound.playKeypress()}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#050810] border border-slate-800 hover:border-slate-700 hover:bg-[#0A0E1A] transition-all cursor-default select-none shadow-sm group"
                  >
                    <div className="shrink-0 group-hover:scale-110 transition-transform">
                      {renderSkillIcon(pill.iconType)}
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white font-sans tracking-tight">
                      {pill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
