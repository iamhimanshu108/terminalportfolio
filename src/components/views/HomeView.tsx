import React from 'react';
import { SYSTEM_INFO, PROJECTS_DATA } from '../../data/portfolioData';
import { NavPath, Project } from '../../types';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { GitHubHeatmap } from '../GitHubHeatmap';
import { Typewriter } from '../Typewriter';
import { ArrowRight, Server, Terminal, Linkedin, Github, Twitter, Database, Cpu, Bot, ExternalLink, Play } from 'lucide-react';
import { sound } from '../../lib/sound';
import myAvatar from '../../assets/My.png';

interface HomeViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onSelectProject: (p: Project) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSsh,
  onSelectProject,
  searchQuery,
  onSearchChange
}) => {
  const featuredProjects = PROJECTS_DATA.slice(0, 4);

  const socialButtons = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamhimanshu108', icon: <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> },
    { name: 'GitHub', url: 'https://github.com/iamhimanshu108', icon: <Github className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: 'X / Twitter', url: 'https://x.com/iamhimanshu108', icon: <Twitter className="w-3.5 h-3.5 text-sky-400" /> },
  ];

  const techStackCategories = [
    {
      title: 'Backend Core & Microservices',
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      items: ['Java Spring Boot', 'Spring Security & JWT', 'Node.js & Express', 'FastAPI & Python', 'REST Microservices'],
      color: 'border-emerald-500/30 bg-emerald-950/10'
    },
    {
      title: 'Databases & Caching Layer',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
      color: 'border-cyan-500/30 bg-cyan-950/10'
    },
    {
      title: 'DevOps & Infrastructure',
      icon: <Cpu className="w-4 h-4 text-amber-400" />,
      items: ['Docker Containers', 'Linux & POSIX Bash', 'Git & GitHub', 'Maven', 'Postman', 'CI/CD Pipelines'],
      color: 'border-amber-500/30 bg-amber-950/10'
    },
    {
      title: 'AI & Multi-Channel Automation',
      icon: <Bot className="w-4 h-4 text-purple-400" />,
      items: ['Gemini AI API', 'LLMs & Prompt Eng.', 'Google Apps Script', 'AppSheet', 'WhatsApp & Telegram Bots'],
      color: 'border-purple-500/30 bg-purple-950/10'
    }
  ];

  // Search filter lists
  const filteredProjects = featuredProjects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCategories = techStackCategories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Primary Terminal Prompt Line */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@iamhimanshu108:~$</span>
          <Typewriter text="cat ~/profile.md" className="text-slate-300 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
            {SYSTEM_INFO.version}
          </span>
          <span className="text-[10px] text-slate-500">TTY: /dev/pts/0</span>
        </div>
      </div>

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
            {filteredCategories.map((cat) => (
              <div key={cat.title} className={`p-4 rounded-lg border ${cat.color} space-y-2.5`}>
                <div className="flex items-center space-x-2 text-slate-100 font-bold text-xs">
                  {cat.icon}
                  <span>{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="bg-[#050810]/80 border border-slate-800/80 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 border border-dashed border-slate-800 rounded-lg text-center text-slate-500">
            [ NO MATCHING SKILL ENTRIES FOUND ]
          </div>
        )}
      </div>

      {/* Interactive Microservices Terminal Block */}
      <div className="space-y-2.5">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200 text-sm tracking-wide">INTERACTIVE_TERMINAL_SESSION</span>
        </div>
        <InteractiveTerminal
          currentPath="~/home"
          onNavigate={onNavigate}
          onOpenSsh={onOpenSsh}
        />
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
                        <button
                          onClick={() => {
                            sound.playKeypress();
                            onSelectProject(p);
                          }}
                          className="text-slate-400 hover:text-white flex items-center space-x-1"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Console Info</span>
                        </button>
                        {p.demoUrl && (
                          <a
                            href={p.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => sound.playKeypress()}
                            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-bold"
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
