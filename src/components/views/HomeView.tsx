import React from 'react';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { PROJECTS_DATA } from '../../data/projectsData';
import { SKILLS_DATA, SkillCategoryGroup } from '../../data/skillsData';
import { renderSkillIcon } from './StackView';
import { NavPath, Project } from '../../types';
import { GitHubHeatmap } from '../GitHubHeatmap';
import { Typewriter } from '../Typewriter';
import { ArrowRight, Server, Terminal, Linkedin, Github, Database, Cpu, Bot, ExternalLink, Play, Code2, Layers, Zap } from 'lucide-react';
import { sound } from '../../lib/sound';
import myAvatar from '../../assets/My.png';

interface HomeViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onSelectProject: (p: Project) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

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

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSsh,
  onSelectProject,
  searchQuery,
  onSearchChange
}) => {
  const featuredProjects = [...PROJECTS_DATA]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 4);

  const socialButtons = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamhimanshu108', icon: <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> },
    { name: 'GitHub', url: 'https://github.com/iamhimanshu108', icon: <Github className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: 'X', url: 'https://x.com/iamhimanshu108', icon: (
      <svg className="w-3.5 h-3.5 text-slate-300 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ) },
  ];

  const sortedCategories = [...SKILLS_DATA].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  // Search filter lists
  const filteredProjects = featuredProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCategories = sortedCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.skills.some(pill => pill.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Himanshu Yadav Profile Card with Photo */}
      <div className="space-y-4 bg-[#0A0E17] border border-slate-800 p-5 rounded-lg relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Himanshu Photo Avatar Frame */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border-2 border-emerald-500/60 p-1 bg-[#050810] shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-[0_0_28px_rgba(16,185,129,0.4)]">
              <img
                src={myAvatar}
                alt="Himanshu Yadav"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/60 text-emerald-400 text-[9px] font-bold shadow-md flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="flex-1 space-y-3.5 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight font-mono mb-0.5">
                  {SYSTEM_INFO.author}
                </h1>
                <p className="text-slate-300 font-semibold text-xs">
                  // {SYSTEM_INFO.title}
                </p>
              </div>
            </div>

            {/* Social Link Quick Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2.5 border-t border-slate-800/80">
              {socialButtons.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playKeypress()}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 bg-[#050810]/60 hover:bg-[#0c1322] hover:border-slate-700 text-slate-300 hover:text-white flex items-center space-x-1.5 text-xs font-bold transition-all"
                >
                  {s.icon}
                  <span>{s.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bio paragraphs */}
        <div className="border-t border-slate-800/80 pt-4 space-y-2 text-slate-300 text-xs text-left">
          {SYSTEM_INFO.bio.map((line, idx) => (
            <p key={idx} className="font-semibold text-emerald-400/90 leading-relaxed font-mono">
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Dynamic Filter Output Message */}
      {searchQuery && (
        <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-400 font-bold flex items-center justify-between">
          <span>[SEARCH_MODE] Filtering layout by query: "{searchQuery}"</span>
          <button 
            onClick={() => onSearchChange('')}
            className="hover:underline text-[10px]"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Technical Skills Section on Home Page */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 text-sm tracking-wide">TECHNICAL_SKILLS</span>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onNavigate('~/skills');
            }}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 text-xs font-bold hover:underline"
          >
            <span>View All Skills</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((cat) => {
              const sortedSkills = [...cat.skills].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
              return (
                <div key={cat.id || cat.title} className={`p-4 rounded-lg border ${cat.borderColor || 'border-slate-800'} bg-[#080C16] space-y-3.5 shadow-lg`}>
                  <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2.5 text-slate-100 font-bold text-xs">
                    {renderCategoryIcon(cat.iconName)}
                    <span>{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {sortedSkills.map((pill) => (
                      <div
                        key={pill.id || pill.name}
                        onClick={() => sound.playKeypress()}
                        className="flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#050810] border border-slate-800 hover:border-slate-700 hover:bg-[#0A0E1A] transition-all cursor-default select-none shadow-sm group"
                      >
                        <div className="shrink-0 group-hover:scale-110 transition-transform">
                          {renderSkillIcon(pill.iconType)}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-200 group-hover:text-white font-sans tracking-tight">
                          {pill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center text-slate-500">
            [ NO MATCHING SKILL ENTRIES FOUND ]
          </div>
        )}
      </div>
      {/* Featured Projects Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 text-sm tracking-wide">FEATURED_PROJECTS</span>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onNavigate('~/projects');
            }}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 text-xs font-bold hover:underline"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((p) => {
              const isDeployed = p.status === 'DEPLOYED';
              const isRunning = p.status === 'RUNNING';
              return (
                <div
                  key={p.id}
                  className="bg-[#080C16] border border-slate-800/80 rounded-xl overflow-hidden flex flex-col group hover:border-emerald-500/40 transition-all duration-200 shadow-lg relative"
                >
                  <div className="h-28 overflow-hidden relative border-b border-slate-900">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-transparent to-transparent opacity-90" />
                    
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded border ${
                        isDeployed
                          ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/60'
                          : isRunning
                          ? 'bg-cyan-950/90 text-cyan-400 border-cyan-500/60'
                          : 'bg-amber-950/90 text-amber-400 border-amber-500/60'
                      }`}
                    >
                      [ {p.status} ]
                    </span>
                  </div>

                  <div className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span 
                        onClick={() => {
                          sound.playKeypress();
                          onSelectProject(p);
                        }}
                        className="font-bold text-emerald-400 text-sm group-hover:underline flex items-center gap-1.5 cursor-pointer mb-1"
                      >
                        <Terminal className="w-3.5 h-3.5 text-slate-400" />
                        {p.name}
                      </span>

                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-slate-900/90 border border-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-[10px]">
                        {p.repoUrl ? (
                          <a
                            href={p.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sound.playKeypress()}
                            className="text-slate-400 hover:text-white flex items-center space-x-1.5 transition-all duration-150 hover:scale-105 cursor-pointer"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span className="hover:underline">GitHub</span>
                          </a>
                        ) : (
                          <div />
                        )}
                        {p.liveUrl && (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sound.playKeypress()}
                            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1.5 font-bold ml-auto transition-all duration-150 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.7)] active:scale-95 cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Launch</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center text-slate-500">
            [ NO MATCHING PROJECT ENTRIES FOUND ]
          </div>
        )}
      </div>

      {/* GitHub Contributions Matrix Component */}
      <GitHubHeatmap />
    </div>
  );
};
