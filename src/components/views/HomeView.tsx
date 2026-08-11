import React from 'react';
import { SYSTEM_INFO, PROJECTS_DATA } from '../../data/portfolioData';
import { NavPath, Project } from '../../types';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { GitHubHeatmap } from '../GitHubHeatmap';
import { Typewriter } from '../Typewriter';
import { ArrowRight, Server, Terminal, ShieldCheck, Linkedin, Github, Twitter, Globe, Code2, Database, Cpu, Bot, ExternalLink, Play } from 'lucide-react';
import { sound } from '../../lib/sound';
import myAvatar from '../../assets/My.png';

interface HomeViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onSelectProject: (p: Project) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSsh,
  onSelectProject
}) => {
  const featuredProjects = PROJECTS_DATA.slice(0, 4);

  const socialButtons = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamhimanshu108', icon: <Linkedin className="w-3.5 h-3.5 text-cyan-400" /> },
    { name: 'GitHub', url: 'https://github.com/iamhimanshu108', icon: <Github className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: 'X / Twitter', url: 'https://x.com/iamhimanshu108', icon: <Twitter className="w-3.5 h-3.5 text-sky-400" /> },
    { name: 'iamhimanshu.in', url: 'https://www.iamhimanshu.in', icon: <Globe className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  const techStackCategories = [
    {
      title: 'Backend & Systems Architecture',
      icon: <Server className="w-4 h-4 text-emerald-400" />,
      items: ['Java Spring Boot', 'Spring Security', 'FastAPI', 'Node.js', 'REST APIs', 'JWT Auth'],
      color: 'border-emerald-500/30 bg-emerald-950/10'
    },
    {
      title: 'Frontend & Interactive Web UI',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'TailwindCSS', 'MaterialUI'],
      color: 'border-cyan-500/30 bg-cyan-950/10'
    },
    {
      title: 'Databases & Infrastructure DevOps',
      icon: <Database className="w-4 h-4 text-amber-400" />,
      items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Linux / Bash'],
      color: 'border-amber-500/30 bg-amber-950/10'
    },
    {
      title: 'Backend AI & Enterprise Automation',
      icon: <Bot className="w-4 h-4 text-sky-400" />,
      items: ['Gemini API', 'WhatsApp Automation', 'Telegram Bots', 'Google Apps Script', 'AppSheet'],
      color: 'border-sky-500/30 bg-sky-950/10'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Primary Terminal Prompt Line */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@Himanshu:~$</span>
          <Typewriter text="cat ~/profile.md" className="text-slate-300 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
            v2026.8.12
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

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight font-mono mb-0.5">
                  {SYSTEM_INFO.author}
                </h1>
                <p className="text-slate-300 font-semibold text-xs">
                  // {SYSTEM_INFO.title}
                </p>
              </div>
              <div className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-[0_0_8px_rgba(16,185,129,0.2)] self-center sm:self-start">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ROOT_AUTHENTICATED</span>
              </div>
            </div>

            {/* Quick Host Badge */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                HOST: root@Himanshu
              </span>
              <span className="text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                KERNEL: v2026.8.12
              </span>
              <span className="text-amber-400 font-bold bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                LOC: 45.8k LOC
              </span>
            </div>

            {/* Social Link Quick Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-slate-800/80">
              {socialButtons.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playKeypress()}
                  className="px-2.5 py-1 rounded bg-[#050810] border border-slate-800 hover:border-emerald-500/50 transition-colors text-[11px] text-slate-200 font-semibold flex items-center space-x-1.5 group"
                >
                  {s.icon}
                  <span className="group-hover:text-emerald-400">{s.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-emerald-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bio Bullets */}
        <div className="space-y-1.5 text-slate-300 text-xs sm:text-sm pl-2 border-l-2 border-emerald-500/60 mt-3">
          {SYSTEM_INFO.bio.map((line, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Organized Tech Stack Section on Home Page */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 text-sm tracking-wide">ORGANIZED_TECH_STACK</span>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onNavigate('~/stack');
            }}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 text-xs font-bold hover:underline"
          >
            <span>Full System Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techStackCategories.map((cat) => (
            <div key={cat.title} className={`p-4 rounded-lg border ${cat.color} space-y-2.5`}>
              <div className="flex items-center space-x-2 text-slate-100 font-bold text-xs">
                {cat.icon}
                <span>{cat.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="bg-[#050810] border border-slate-800 text-slate-300 text-[11px] px-2.5 py-1 rounded font-mono font-medium shadow-sm hover:border-emerald-500/40 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Contribution Heatmap Grid */}
      <GitHubHeatmap />

      {/* Featured Projects Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200 text-sm tracking-wide">ACTIVE_DEPLOYMENTS</span>
          </div>
          <button
            onClick={() => {
              sound.playKeypress();
              onNavigate('~/projects');
            }}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 text-xs font-bold hover:underline"
          >
            <span>View All Projects ({PROJECTS_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map((p) => {
            const isDeployed = p.status === 'DEPLOYED';
            const isRunning = p.status === 'RUNNING';
            return (
              <div
                key={p.id}
                className="bg-[#0A0E1A] border border-slate-800 hover:border-emerald-500/50 rounded-lg transition-all hover:bg-[#0E1424] space-y-3 group overflow-hidden flex flex-col justify-between"
              >
                {/* Project Photo Preview Banner */}
                <div 
                  onClick={() => {
                    sound.playKeypress();
                    onSelectProject(p);
                  }}
                  className="relative h-36 bg-slate-900 overflow-hidden cursor-pointer border-b border-slate-800/80"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-transparent" />
                  
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

                    {/* Action Links: GitHub & Live Demo */}
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-2.5">
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playKeypress();
                        }}
                        className="px-2.5 py-1 rounded bg-[#050810] border border-slate-700 hover:border-emerald-400 text-slate-200 hover:text-emerald-400 font-bold text-[11px] flex items-center space-x-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                      </a>

                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playKeypress();
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 hover:text-white font-bold text-[11px] flex items-center space-x-1.5 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Terminal Command Prompt at Bottom */}
      <div className="pt-2">
        <InteractiveTerminal
          currentPath="~/home"
          onNavigate={onNavigate}
          onOpenSsh={onOpenSsh}
          promptUser="root@Himanshu:~$"
        />
      </div>
    </div>
  );
};

