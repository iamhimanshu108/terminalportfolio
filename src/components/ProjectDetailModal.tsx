import React, { useEffect } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import { sound } from '../lib/sound';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 font-mono text-xs animate-fadeIn">
      <div className="bg-[#050810] border border-emerald-500/40 rounded-xl w-full max-w-2xl overflow-hidden shadow-[0_0_35px_rgba(16,185,129,0.18)] flex flex-col max-h-[90vh]">
        {/* Terminal Header Bar with Mac style buttons */}
        <div className="bg-[#040711] border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="flex items-center space-x-1.5">
              <button 
                onClick={() => { sound.playKeypress(); onClose(); }}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer block"
                title="Close (Esc)"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="h-4 w-[1px] bg-slate-800 mx-1" />

            <div className="flex items-center space-x-2 truncate">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold text-emerald-400 text-sm truncate">{project.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold shrink-0">
                [ {project.status} ]
              </span>
            </div>
          </div>
        </div>

        {/* Project Image Banner if available */}
        {project.imageUrl && (
          <div className="relative h-48 w-full bg-slate-900 border-b border-slate-800 overflow-hidden shrink-0">
            <img
              src={project.imageUrl}
              alt={project.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-black/30" />
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playKeypress()}
                className="px-3 py-1.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch Live Demo</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playKeypress()}
                className="px-3 py-1.5 rounded bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View GitHub Repository</span>
              </a>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">MICROSERVICE DESCRIPTION</span>
            <p className="text-slate-200 text-xs leading-relaxed bg-[#080C16] p-3 rounded border border-slate-800">
              {project.description}
            </p>
          </div>

          {project.architecture && (
            <div className="space-y-2">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">ARCHITECTURE LAYOUT</span>
              <div className="bg-[#080C16] p-3 rounded border border-slate-800 text-cyan-300 font-bold">
                {project.architecture}
              </div>
            </div>
          )}

          {project.metrics && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#080C16] p-3 rounded border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">LATENCY</span>
                <span className="text-emerald-400 font-bold">{project.metrics.latency}</span>
              </div>
              <div className="bg-[#080C16] p-3 rounded border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">THROUGHPUT</span>
                <span className="text-cyan-400 font-bold">{project.metrics.throughput}</span>
              </div>
              <div className="bg-[#080C16] p-3 rounded border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] block">UPTIME</span>
                <span className="text-amber-400 font-bold">{project.metrics.uptime}</span>
              </div>
            </div>
          )}

          {/* Logs */}
          {project.logs && project.logs.length > 0 && (
            <div className="space-y-2">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">EXECUTION & TELEMETRY LOGS</span>
              <div className="bg-[#03050A] p-3 rounded border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                {project.logs.map((log, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech tags */}
          <div className="space-y-2">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">TECH STACK</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="bg-slate-900 border border-slate-800 text-emerald-400 text-xs px-2.5 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

