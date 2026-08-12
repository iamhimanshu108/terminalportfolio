import React from 'react';
import { NavPath } from '../../types';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { 
  Code2, 
  Server, 
  Database, 
  Bot, 
  Sparkles,
  Layers,
  Wrench,
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

interface TechPill {
  name: string;
  badge?: string;
  icon: React.ReactNode;
}

interface TechCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  pills: TechPill[];
}

export const StackView: React.FC<StackViewProps> = () => {
  const categories: TechCategory[] = [
    {
      title: 'Backend Core & Microservices',
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      color: 'bg-emerald-950/20 text-emerald-400',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      pills: [
        {
          name: 'Java Spring Boot',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#E76F00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 19h16v2H4zm12-4H8c-2.21 0-4-1.79-4-4V5h16v6c0 2.21-1.79 4-4 4zm2-8H6v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
          )
        },
        {
          name: 'Spring Security & JWT',
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        },
        {
          name: 'Node.js & Express',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#339933] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1v7.2L12 19.7l-7.5-4.1V8.4L12 4.3z" />
            </svg>
          )
        },
        {
          name: 'FastAPI & Python',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#009688] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 13h7v9l9-11h-7V2z" />
            </svg>
          )
        },
        {
          name: 'REST Microservices',
          icon: <Boxes className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        }
      ]
    },
    {
      title: 'Databases & Caching Layer',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      color: 'bg-cyan-950/20 text-cyan-400',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      pills: [
        {
          name: 'PostgreSQL',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#336791] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          )
        },
        {
          name: 'MySQL',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#00758F] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c3.87 0 7 1.34 7 2s-3.13 2-7 2-7-1.34-7-2 3.13-2 7-2zm0 14c-3.87 0-7-1.34-7-2v-2.15c1.78 1.09 4.26 1.65 7 1.65s5.22-.56 7-1.65V17c0 .66-3.13 2-7 2z" />
            </svg>
          )
        },
        {
          name: 'MongoDB',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#47A248] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2V13h2v3.5zm0-5.5h-2V7h2v4z" />
            </svg>
          )
        },
        {
          name: 'Redis',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#DC382D] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zm-10 8l10 5 10-5M2 15l10 5 10-5" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'DevOps & Infrastructure',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      color: 'bg-amber-950/20 text-amber-400',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      pills: [
        {
          name: 'Docker Containers',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#2496ED] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.98 11.08h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm-2.38 0h1.89v1.9H6.84zm7.14-2.38h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm7.14-2.38h1.89v1.9h-1.89z" />
            </svg>
          )
        },
        {
          name: 'Linux & POSIX Bash',
          icon: <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        },
        {
          name: 'Git & GitHub',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#F05032] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          )
        },
        {
          name: 'Maven',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#C71A36] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )
        },
        {
          name: 'Postman',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#FF6C37] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          )
        },
        {
          name: 'CI/CD Pipelines',
          icon: <Workflow className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        }
      ]
    },
    {
      title: 'AI & Multi-Channel Automation',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      color: 'bg-purple-950/20 text-purple-400',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      pills: [
        {
          name: 'Gemini AI API',
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        },
        {
          name: 'LLMs & Prompt Eng.',
          icon: <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        },
        {
          name: 'Google Apps Script',
          icon: <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        },
        {
          name: 'AppSheet',
          icon: <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        },
        {
          name: 'WhatsApp & Telegram Bots',
          icon: <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        }
      ]
    },
    {
      title: 'Frontend & Interactive UI',
      icon: <Code2 className="w-4 h-4 text-sky-400" />,
      color: 'bg-sky-950/20 text-sky-400',
      borderColor: 'border-sky-500/40 hover:border-sky-400',
      pills: [
        {
          name: 'React.js',
          icon: (
            <svg className="w-3.5 h-3.5 text-[#61DAFB] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="2" fill="#61DAFB" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            </svg>
          )
        },
        {
          name: 'Next.js',
          icon: <Globe className="w-3.5 h-3.5 text-slate-100 shrink-0" />
        },
        {
          name: 'TypeScript',
          icon: (
            <span className="w-3.5 h-3.5 bg-[#3178C6] text-white font-black text-[8px] rounded flex items-center justify-center tracking-tighter shrink-0">
              TS
            </span>
          )
        },
        {
          name: 'JavaScript',
          icon: (
            <span className="w-3.5 h-3.5 bg-[#F7DF1E] text-black font-black text-[8px] rounded flex items-center justify-center tracking-tighter shrink-0">
              JS
            </span>
          )
        },
        {
          name: 'TailwindCSS',
          icon: <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        },
        {
          name: 'Motion & GSAP',
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        }
      ]
    }
  ];

  return (
    <div className="space-y-5 font-mono text-xs text-slate-200">
      {/* Top Header Command Line */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@iamhimanshu108:~$</span>
          <Typewriter text="cat ~/skills.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">SYSTEM_SKILLS_{SYSTEM_INFO.version}</span>
      </div>

      {/* Skills Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className={`p-4 sm:p-5 rounded-xl border bg-[#080C16] ${cat.borderColor} transition-all duration-200 space-y-3.5 shadow-lg`}
          >
            {/* Category Header */}
            <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2.5">
              {cat.icon}
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight font-sans">
                {cat.title}
              </h3>
            </div>

            {/* Skills Pills Container matching Image 2 */}
            <div className="flex flex-wrap gap-2 pt-0.5">
              {cat.pills.map((pill) => (
                <div
                  key={pill.name}
                  onClick={() => sound.playKeypress()}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#050810] border border-slate-800 hover:border-slate-700 hover:bg-[#0A0E1A] transition-all cursor-default select-none shadow-sm group"
                >
                  <div className="shrink-0 group-hover:scale-110 transition-transform">
                    {pill.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white font-sans tracking-tight">
                    {pill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
