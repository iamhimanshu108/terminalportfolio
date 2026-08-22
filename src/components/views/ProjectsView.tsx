import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { Project, ProjectStatus, NavPath } from '../../types';
import { FileCode, Terminal, AlertCircle, RefreshCw, Cpu, ExternalLink, Github, CheckCircle2, Clock, Globe } from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';

interface ProjectsViewProps {
  onSelectProject: (p: Project) => void;
  searchQuery?: string;
  onNavigate: (path: NavPath) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onSelectProject,
  searchQuery = '',
  onNavigate
}) => {
  const [wasmProgress, setWasmProgress] = useState<number>(60);

  // Dynamic WASM build compilation animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWasmProgress((prev) => (prev >= 100 ? 15 : prev + 5));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    return (
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'DEPLOYED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950/90 text-emerald-400 border border-emerald-500/50 flex items-center gap-1 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-3 h-3" />
            [ DEPLOYED ]
          </span>
        );
      case 'RUNNING':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-cyan-950/90 text-cyan-400 border border-cyan-500/50 flex items-center gap-1 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.2)]">
            <Globe className="w-3 h-3 text-cyan-400" />
            [ RUNNING ]
          </span>
        );
      case 'FAILED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-950/90 text-rose-400 border border-rose-500/60 flex items-center gap-1 shadow-[0_0_8px_rgba(239,68,68,0.2)]">
            <AlertCircle className="w-3 h-3" />
            [ FAILED ]
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-900 text-slate-400 border border-slate-700 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            [ ARCHIVED ]
          </span>
        );
      case 'BUILD':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-950/90 text-amber-400 border border-amber-500/50 flex items-center gap-1 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
            <RefreshCw className="w-3 h-3 animate-spin" />
            [ BUILD ]
          </span>
        );
    }
  };

  const getCardBorderStyle = (status: ProjectStatus) => {
    switch (status) {
      case 'FAILED':
        return 'border-rose-500/50 hover:border-rose-400 bg-[#120B13]';
      case 'BUILD':
        return 'border-amber-500/40 hover:border-amber-400 bg-[#0E0C18]';
      case 'RUNNING':
        return 'border-cyan-500/40 hover:border-cyan-400 bg-[#090F1E]';
      case 'DEPLOYED':
        return 'border-emerald-500/30 hover:border-emerald-400 bg-[#070D18]';
      default:
        return 'border-slate-800 hover:border-slate-600 bg-[#090D18]';
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Command prompt header with Typewriter effect */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span className="hidden sm:inline">root@portfolio:~$</span>
          <span className="sm:hidden">~$</span>
          <Typewriter text="ls -la ~/projects" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <span className="text-[10px] text-slate-500">TOTAL: {filteredProjects.length} MICROSERVICES</span>
      </div>

      {/* Grid of Microservices Cards with Project Photos & Direct Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const isBuild = project.status === 'BUILD';
          const isFailed = project.status === 'FAILED';

          return (
            <div
              key={project.id}
              className={`border rounded-lg overflow-hidden transition-all hover:scale-[1.01] flex flex-col justify-between shadow-md ${getCardBorderStyle(
                project.status
              )}`}
            >
              {/* Project Image Preview Banner */}
              {project.imageUrl && (
                <div className="relative h-36 w-full overflow-hidden bg-slate-900 border-b border-slate-800/80 group">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-black/40" />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(project.status)}
                  </div>
                  <div className="absolute bottom-2 left-3 flex items-center space-x-2 bg-black/70 backdrop-blur px-2 py-1 rounded border border-emerald-500/40">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-bold text-emerald-300 text-xs">{project.name}</span>
                  </div>
                </div>
              )}

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                {!project.imageUrl && (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-bold text-emerald-400 text-sm tracking-tight">
                        {project.name}
                      </span>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                )}

                {/* Description */}
                <p className="text-slate-300 text-xs leading-relaxed">
                  {project.description}
                </p>

                {/* Build progress bar if status is BUILD */}
                {isBuild && (
                  <div className="bg-[#050812] p-3 rounded border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 animate-spin" />
                        Compiling target...
                      </span>
                      <span>{wasmProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded overflow-hidden border border-slate-800">
                      <div
                        className="bg-amber-400 h-full transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                        style={{ width: `${wasmProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Failed notice */}
                {isFailed && (
                  <div className="text-[10px] text-rose-300 bg-rose-950/40 border border-rose-800/40 p-2 rounded">
                    ⚠️ Alert: High latency / loop lag observed under load.
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="bg-slate-900/90 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links Bar: Live Link, GitHub Link, Terminal Inspect */}
                <div className="border-t border-slate-800/80 pt-3 mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playKeypress();
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black font-bold text-[11px] flex items-center gap-1 transition-colors shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playKeypress();
                        }}
                        className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      sound.playKeypress();
                      onSelectProject(project);
                    }}
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

