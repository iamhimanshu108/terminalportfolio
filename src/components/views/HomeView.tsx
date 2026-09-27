import React from 'react';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { PROJECTS_DATA } from '../../data/projectsData';
import { SKILLS_DATA, SkillCategoryGroup } from '../../data/skillsData';
import { renderSkillIcon } from './StackView';
import { NavPath, Project } from '../../types';
import { GitHubHeatmap } from '../GitHubHeatmap';
import { Typewriter } from '../Typewriter';
import { ArrowRight, Server, Terminal, Linkedin, Github, Database, Cpu, Bot, ExternalLink, Play, Code2, Layers, Zap, Download } from 'lucide-react';
import { sound } from '../../lib/sound';
import NeuralNetworkBackground from '../NeuralNetworkBackground';
import { ProfilePhotoCard } from '../ProfilePhotoCard';
import myAvatar from '../../assets/My.png';
import resumePdfFallback from '../../assets/Himanshu_Resume-CbhZoejc.pdf';

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
  const handleResumeDownload = () => {
    sound.playExecute();
    const link = document.createElement('a');
    link.href = resumePdfFallback;
    link.download = 'Himanshu_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <div className="space-y-6 font-sans text-base text-slate-200">
      {/* Himanshu Yadav Profile Card with Photo */}
      <div className="space-y-4 bg-[#0A0E17] border border-slate-800 p-5 rounded-lg relative overflow-hidden shadow-lg">
        <NeuralNetworkBackground className="opacity-30" nodeCount={28} connectionDistance={150} speed={0.12} particleCount={3} />
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          {/* Himanshu Photo Avatar Frame */}
          <ProfilePhotoCard src={myAvatar} alt="Himanshu Yadav" />

          <div className="relative z-10 w-full max-w-3xl space-y-4 text-center sm:text-left order-1 sm:order-1">
            <div className="flex flex-col items-start justify-between gap-3">
              <div>
                <div className="mb-5 flex items-center gap-2 text-xs font-medium tracking-[0.08em] text-[#A1A1AA]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  AVAILABLE FOR OPPORTUNITIES
                </div>
                <h1 className="max-w-3xl text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[.95] tracking-[-0.045em] text-[#FAFAFA] font-sans">
                  {SYSTEM_INFO.author}
                </h1>
                <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.035em] bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">
                  AI &amp; Full Stack Developer
                </h2>
              </div>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              I build intelligent, scalable web applications that combine modern full-stack engineering with Generative AI.
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-[#71717A]">
              Focused on MERN, Python, FastAPI, RAG pipelines, AI integrations, and automation.
            </p>

            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-1 font-mono text-[11px] font-semibold tracking-[0.06em] text-[#A78BFA] sm:justify-start">
              {['MERN', 'PYTHON', 'FASTAPI', 'GEN AI', 'RAG'].map((tech) => (
                <React.Fragment key={tech}>
                  <span className="transition-colors duration-200 hover:text-[#A78BFA]">{tech}</span>
                  {tech !== 'RAG' && <span className="text-[#27272A]">·</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-3 sm:justify-start">
              <button
                onClick={() => { sound.playKeypress(); onNavigate('~/projects'); }}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/20"
              >
                <Terminal className="w-3.5 h-3.5" />
                View Projects <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-transparent px-4 py-2.5 text-sm font-semibold text-[#FAFAFA] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B5CF6]/70 hover:bg-white/[0.03]"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </button>
            </div>

            <div className="hidden">
              <button
                onClick={() => { sound.playKeypress(); onNavigate('~/projects'); }}
                className="inline-flex items-center gap-1.5 rounded border border-emerald-500/60 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-emerald-400"
              >
                <Terminal className="w-3.5 h-3.5" />
                View Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                <Download className="w-3.5 h-3.5" />
                Download Resume
              </button>
            </div>

            {/* Social Link Quick Badges */}
            <div className="hidden">
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
        <div className="hidden">
          {SYSTEM_INFO.bio.map((line, idx) => (
            <p key={idx} className="font-semibold text-emerald-400/90 leading-relaxed font-mono">
              {line}
            </p>
          ))}
          <button
            onClick={handleResumeDownload}
            className="mt-2 inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </button>
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

      <div className="space-y-1 rounded-lg border border-slate-800/80 bg-[#050810] p-4 text-xs shadow-inner">
        <div className="text-emerald-400 font-bold">&gt; Currently building...</div>
        <div className="text-slate-300">&gt; MERN / Full Stack / Python / FastAPI / React / Next.js</div>
        <div className="text-slate-400">&gt; AI / GenAI / RAG / DevOps / Automation</div>
      </div>

      {/* Technical Skills Section on Home Page */}
      <div className="hidden">
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
      <div className="hidden">
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
