import React, { useState } from 'react';
import { NavPath } from '../../types';
import { 
  Code2, 
  Server, 
  Database, 
  Bot, 
  Search, 
  Sparkles,
  Layers,
  Wrench,
  Cpu,
  Globe,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Zap,
  Flame,
  Boxes
} from 'lucide-react';
import { Typewriter } from '../Typewriter';
import { sound } from '../../lib/sound';

interface StackViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
}

interface TechPill {
  name: string;
  icon: React.ReactNode;
}

interface TechCategory {
  category: string;
  pills: TechPill[];
}

export const StackView: React.FC<StackViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: TechCategory[] = [
    {
      category: 'Languages',
      pills: [
        {
          name: 'HTML',
          icon: (
            <span className="w-4 h-4 bg-[#E34F26] text-white font-black text-[9px] rounded flex items-center justify-center tracking-tighter shrink-0">
              H5
            </span>
          )
        },
        {
          name: 'CSS',
          icon: (
            <span className="w-4 h-4 bg-[#1572B6] text-white font-black text-[9px] rounded flex items-center justify-center tracking-tighter shrink-0">
              C3
            </span>
          )
        },
        {
          name: 'SQL',
          icon: (
            <svg className="w-4 h-4 text-[#00758F] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c3.87 0 7 1.34 7 2s-3.13 2-7 2-7-1.34-7-2 3.13-2 7-2zm0 14c-3.87 0-7-1.34-7-2v-2.15c1.78 1.09 4.26 1.65 7 1.65s5.22-.56 7-1.65V17c0 .66-3.13 2-7 2z" />
            </svg>
          )
        },
        {
          name: 'Java',
          icon: (
            <svg className="w-4 h-4 text-[#E76F00] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 19h16v2H4zm12-4H8c-2.21 0-4-1.79-4-4V5h16v6c0 2.21-1.79 4-4 4zm2-8H6v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </svg>
          )
        },
        {
          name: 'JavaScript',
          icon: (
            <span className="w-4 h-4 bg-[#F7DF1E] text-black font-black text-[9px] rounded flex items-center justify-center tracking-tighter shrink-0">
              JS
            </span>
          )
        },
        {
          name: 'TypeScript',
          icon: (
            <span className="w-4 h-4 bg-[#3178C6] text-white font-black text-[9px] rounded flex items-center justify-center tracking-tighter shrink-0">
              TS
            </span>
          )
        },
        {
          name: 'Python',
          icon: (
            <svg className="w-4 h-4 text-[#3776AB] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-3.5 0-4 .5-4 2v2h4v1H6C4 7 3 8.5 3 11s1 4 3 4h1v-2c0-1.5 1-3 3-3h4c1.5 0 3-1 3-3V6c0-1.5-.5-4-5-4zm-2 2a1 1 0 110 2 1 1 0 010-2zm4 18c3.5 0 4-.5 4-2v-2h-4v-1h6c2 0 3-1.5 3-4s-1-4-3-4h-1v2c0 1.5-1 3-3 3h-4c-1.5 0-3 1-3 3v3c0 1.5.5 4 5 4zm2-2a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          )
        },
        {
          name: 'POSIX Bash & C++',
          icon: <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
        }
      ]
    },
    {
      category: 'Frameworks & Architecture',
      pills: [
        {
          name: 'Spring Boot',
          icon: (
            <svg className="w-4 h-4 text-[#6DB33F] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          )
        },
        {
          name: 'React.js',
          icon: (
            <svg className="w-4 h-4 text-[#61DAFB] shrink-0 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="2" fill="#61DAFB" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
              <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            </svg>
          )
        },
        {
          name: 'Node.js',
          icon: (
            <svg className="w-4 h-4 text-[#339933] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1v7.2L12 19.7l-7.5-4.1V8.4L12 4.3z" />
            </svg>
          )
        },
        {
          name: 'Express.js',
          icon: <Server className="w-4 h-4 text-slate-200 shrink-0" />
        },
        {
          name: 'TypeScript',
          icon: (
            <span className="w-4 h-4 bg-[#3178C6] text-white font-black text-[9px] rounded flex items-center justify-center tracking-tighter shrink-0">
              TS
            </span>
          )
        },
        {
          name: 'Spring Security & JWT',
          icon: <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        },
        {
          name: 'Microservices',
          icon: (
            <svg className="w-4 h-4 text-[#2B88D8] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          )
        },
        {
          name: 'GSAP Animations',
          icon: <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
        }
      ]
    },
    {
      category: 'Tools & DevOps',
      pills: [
        {
          name: 'Postman',
          icon: (
            <svg className="w-4 h-4 text-[#FF6C37] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          )
        },
        {
          name: 'Git',
          icon: (
            <svg className="w-4 h-4 text-[#F05032] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          )
        },
        {
          name: 'GitHub',
          icon: <Code2 className="w-4 h-4 text-slate-200 shrink-0" />
        },
        {
          name: 'Docker',
          icon: (
            <svg className="w-4 h-4 text-[#2496ED] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.98 11.08h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm-2.38 0h1.89v1.9H6.84zm7.14-2.38h1.89v1.9h-1.89zm-2.38 0h1.89v1.9h-1.89zm-2.38 0h1.89v1.9H9.22zm7.14-2.38h1.89v1.9h-1.89z" />
            </svg>
          )
        },
        {
          name: 'VS Code',
          icon: (
            <svg className="w-4 h-4 text-[#007ACC] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.999.999 0 0 0-1.276.06L.33 7.29a1 1 0 0 0-.02 1.43l3.64 3.73-3.64 3.73a1 1 0 0 0 .02 1.43l1.319 1.22a.999.999 0 0 0 1.276.06l4.12-3.12 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.92V3.08a1.5 1.5 0 0 0-.85-1.353z" />
            </svg>
          )
        },
        {
          name: 'Linux',
          icon: (
            <svg className="w-4 h-4 text-[#FCC624] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C9.5 2 8 3.5 8 6v4c-1.5 0-3 1.5-3 3v4c0 1.5 1.5 3 3 3h8c1.5 0 3-1.5 3-3v-4c0-1.5-1.5-3-3-3V6c0-2.5-1.5-4-4-4zm-2 4h4v3h-4V6z" />
            </svg>
          )
        },
        {
          name: 'Maven',
          icon: (
            <svg className="w-4 h-4 text-[#C71A36] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )
        },
        {
          name: 'Firebase',
          icon: (
            <svg className="w-4 h-4 text-[#FFCA28] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.89 15.67L6.82 2.89a.74.74 0 011.37-.21l2.42 4.54L3.89 15.67zm16.53-2.14l-2.02-12.21a.75.75 0 00-1.38-.28L12 8.78l3.19 3.19 5.23 1.56z" />
            </svg>
          )
        },
        {
          name: 'MySQL & PostgreSQL',
          icon: <Database className="w-4 h-4 text-cyan-400 shrink-0" />
        },
        {
          name: 'MongoDB & Redis',
          icon: <Database className="w-4 h-4 text-emerald-400 shrink-0" />
        }
      ]
    },
    {
      category: 'Automation & Integration',
      pills: [
        {
          name: 'FastAPI',
          icon: (
            <svg className="w-4 h-4 text-[#009688] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 13h7v9l9-11h-7V2z" />
            </svg>
          )
        },
        {
          name: 'Next.js',
          icon: <Globe className="w-4 h-4 text-slate-100 shrink-0" />
        },
        {
          name: 'Microservices',
          icon: (
            <svg className="w-4 h-4 text-[#2B88D8] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
            </svg>
          )
        },
        {
          name: 'CI/CD Pipelines',
          icon: <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
        },
        {
          name: 'Google Apps Script',
          icon: <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
        },
        {
          name: 'AppSheet',
          icon: <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
        },
        {
          name: 'WhatsApp & Telegram Bots',
          icon: <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
        }
      ]
    },
    {
      category: 'AI & Future / LLMs',
      pills: [
        {
          name: 'ChatGPT',
          icon: (
            <svg className="w-4 h-4 text-[#10A37F] shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.04 6.04 0 00-6.51-2.9 6.06 6.06 0 00-4.63-2.01c-3.3 0-6 2.67-6 5.96 0 .28.02.55.07.82A6.02 6.02 0 002.3 9.47a6.04 6.04 0 001.37 7.02 6.04 6.04 0 00.52 4.9 6.04 6.04 0 006.51 2.9 6.06 6.06 0 004.63 2.01c3.3 0 6-2.67 6-5.96 0-.28-.02-.55-.07-.82a6.02 6.02 0 002.39-2.69 6.03 6.03 0 00-1.36-7.02z" />
            </svg>
          )
        },
        {
          name: 'DeepSeek',
          icon: <Bot className="w-4 h-4 text-blue-400 shrink-0" />
        },
        {
          name: 'Google AI Studio',
          icon: <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
        },
        {
          name: 'LLMs & Prompt Eng.',
          icon: <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
        },
        {
          name: 'Gemini AI API',
          icon: <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        }
      ]
    }
  ];

  const filteredCategories = categories.map((group) => {
    const filteredPills = group.pills.filter((p) =>
      !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, pills: filteredPills };
  }).filter((group) => group.pills.length > 0);

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Top Header Command */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@Himanshu:~$</span>
          <Typewriter text="cat ~/stack.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <span className="text-[10px] text-slate-500 font-bold">SYSTEM_STACK_v2026.8.12</span>
      </div>

      {/* Main Container Card matching screenshot dark theme */}
      <div className="bg-[#080C16] border border-slate-800/90 rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight">
              Tech Stack
            </h2>
            <p className="text-slate-400 text-xs font-mono mt-0.5">
              Categorized technologies, frameworks & developer toolsets
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search stack skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 bg-[#050810] border border-slate-800 text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Categorized Tech Pill Groups */}
        <div className="space-y-6">
          {filteredCategories.map((group) => (
            <div key={group.category} className="space-y-3">
              {/* Pill Category Header Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-[#131929] border border-slate-800 text-slate-200 font-semibold text-xs tracking-wide">
                {group.category}
              </div>

              {/* Flex wrap container of technology badges with custom brand icons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {group.pills.map((pill) => (
                  <div
                    key={pill.name}
                    onClick={() => sound.playKeypress()}
                    className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#0A0E1A] border border-slate-800/90 hover:border-slate-700 hover:bg-[#0E1424] transition-all cursor-default select-none shadow-sm group"
                  >
                    <div className="shrink-0 group-hover:scale-105 transition-transform">
                      {pill.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-white font-sans tracking-tight">
                      {pill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
