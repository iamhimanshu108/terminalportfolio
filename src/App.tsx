import React, { useState, useEffect } from 'react';
import { NavPath, HeaderTab, Project } from './types';
import { Sidebar } from './components/Sidebar';
import { HeaderBar } from './components/HeaderBar';
import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { StackView } from './components/views/StackView';
import { ExperienceView } from './components/views/ExperienceView';
import { ResumeView } from './components/views/ResumeView';
import { ContactView } from './components/views/ContactView';
import { SSHModal } from './components/SSHModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { RebootAnimationModal } from './components/RebootAnimationModal';
import { sound } from './lib/sound';
import { Terminal, Bug, Activity, Cpu, Play, CheckCircle2, X, RefreshCw, Send } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavPath>('~/home');
  const [activeTab, setActiveTab] = useState<HeaderTab>('SESSION');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [theme, setTheme] = useState('jetbrains');

  const [isSshOpen, setIsSshOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Execute Mode Quick Command State
  const [execCmd, setExecCmd] = useState('');
  const [execLogs, setExecLogs] = useState<string[]>([
    'EXECUTE_ENGINE: Interactive shell mounted.',
    'Type commands (e.g., "projects", "stack", "contact", "clear", "help") or click quick triggers.'
  ]);

  // Debug Mode State
  const [debugCpu, setDebugCpu] = useState(14);
  const [debugMem, setDebugMem] = useState(142);
  const [debugPaused, setDebugPaused] = useState(false);

  useEffect(() => {
    if (debugPaused) return;
    const interval = setInterval(() => {
      setDebugCpu(Math.floor(8 + Math.random() * 22));
      setDebugMem(Math.floor(138 + Math.random() * 12));
    }, 1500);
    return () => clearInterval(interval);
  }, [debugPaused]);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;
    sound.playExecute();

    let output = '';
    if (trimmed === 'clear') {
      setExecLogs(['EXECUTE_ENGINE: Console cleared.']);
      setExecCmd('');
      return;
    } else if (trimmed === 'help') {
      output = 'AVAILABLE COMMANDS: projects, stack, experience, resume, contact, clear, status, ssh';
    } else if (trimmed === 'experience') {
      setCurrentPath('~/experience');
      output = 'Navigated to ~/experience. Professional experience timeline loaded.';
    } else if (trimmed === 'projects') {
      setCurrentPath('~/projects');
      output = 'Navigated to ~/projects. 7 Microservices active.';
    } else if (trimmed === 'stack') {
      setCurrentPath('~/stack');
      output = 'Navigated to ~/stack. Java Spring Boot + React + Gemini AI stack loaded.';
    } else if (trimmed === 'contact') {
      setCurrentPath('~/contact');
      output = 'Navigated to ~/contact. Direct dispatch pipeline ready.';
    } else if (trimmed === 'ssh') {
      setIsSshOpen(true);
      output = 'Opened interactive SSH Terminal Session.';
    } else {
      output = `Command executed: "${cmdStr}". Result: [200 OK] Task completed successfully.`;
    }

    setExecLogs((prev) => [`> ${cmdStr}`, output, ...prev.slice(0, 10)]);
    setExecCmd('');
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'matrix':
        return 'bg-[#000A03] text-emerald-400 font-mono';
      case 'cyber':
        return 'bg-[#030914] text-cyan-300 font-mono';
      case 'amber':
        return 'bg-[#0A0500] text-amber-400 font-mono';
      default:
        return 'bg-[#0B0F19] text-slate-100 font-mono';
    }
  };

  return (
    <div data-theme={theme} className={`min-h-screen h-screen flex flex-col overflow-hidden select-none theme-bg-app text-slate-100 font-mono relative transition-colors duration-200`}>
      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Terminal Sidebar */}
        <Sidebar
          currentPath={currentPath}
          onNavigate={(path) => setCurrentPath(path)}
          onOpenSsh={() => setIsSshOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onTriggerReboot={() => setIsRebooting(true)}
          statusOnline={true}
        />

        {/* Right Main Terminal Canvas */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
          {/* Header Bar */}
          <HeaderBar
            currentPath={currentPath}
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            crtEnabled={crtEnabled}
            onToggleCrt={() => setCrtEnabled(!crtEnabled)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onTriggerReboot={() => setIsRebooting(true)}
          />

          {/* Active Mode Banner for EXECUTE Tab */}
          {activeTab === 'EXECUTE' && (
            <div className="bg-[#050A14] border-b border-emerald-500/50 p-3 text-xs font-mono space-y-2 animate-fadeIn shrink-0">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>[ MODE: EXECUTE ] Interactive Instant Command Execution Engine</span>
                </div>
                <button
                  onClick={() => setActiveTab('SESSION')}
                  className="text-slate-400 hover:text-white p-1"
                  title="Return to Session Mode"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={execCmd}
                  onChange={(e) => setExecCmd(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunCommand(execCmd)}
                  placeholder="Type shell command (e.g. projects, stack, contact, help)..."
                  className="flex-1 bg-[#091020] border border-slate-700 rounded px-2.5 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs font-mono"
                />
                <button
                  onClick={() => handleRunCommand(execCmd)}
                  className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Run</span>
                </button>
              </div>

              {/* Output log drawer */}
              <div className="bg-[#03060E] p-2 rounded border border-slate-800 text-[11px] space-y-0.5 max-h-24 overflow-y-auto text-slate-300">
                {execLogs.map((log, i) => (
                  <div key={i} className="font-mono">{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Active Mode Banner for DEBUG Tab */}
          {activeTab === 'DEBUG' && (
            <div className="bg-[#080512] border-b border-cyan-500/50 p-3 text-xs font-mono space-y-2 animate-fadeIn shrink-0">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <div className="flex items-center space-x-2">
                  <Bug className="w-4 h-4 text-cyan-400" />
                  <span>[ MODE: DEBUG ] System Telemetry & Kernel Process Inspector</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDebugPaused(!debugPaused)}
                    className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold text-[10px]"
                  >
                    {debugPaused ? 'RESUME STREAM' : 'PAUSE TELEMETRY'}
                  </button>
                  <button
                    onClick={() => setActiveTab('SESSION')}
                    className="text-slate-400 hover:text-white p-1"
                    title="Return to Session Mode"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div className="bg-[#040814] p-2 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold block">CPU THREAD LOAD</span>
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>{debugCpu}% Utilization</span>
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="bg-[#040814] p-2 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold block">HEAP MEMORY</span>
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span>{debugMem} MB / 512 MB</span>
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>

                <div className="bg-[#040814] p-2 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold block">GARBAGE COLLECTOR</span>
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>0.4ms Sweep Latency</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                <div className="bg-[#040814] p-2 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-500 font-bold block">THREAD POOL</span>
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>16 Active Workers</span>
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Scrollable Content View */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
            {currentPath === '~/home' && (
              <HomeView
                onNavigate={(path) => setCurrentPath(path)}
                onOpenSsh={() => setIsSshOpen(true)}
                onSelectProject={(p) => setSelectedProject(p)}
              />
            )}

            {currentPath === '~/projects' && (
              <ProjectsView
                onSelectProject={(p) => setSelectedProject(p)}
                searchQuery={searchQuery}
                onNavigate={(path) => setCurrentPath(path)}
              />
            )}

            {currentPath === '~/stack' && (
              <StackView
                onNavigate={(path) => setCurrentPath(path)}
                onOpenSsh={() => setIsSshOpen(true)}
              />
            )}

            {currentPath === '~/experience' && (
              <ExperienceView
                onNavigate={(path) => setCurrentPath(path)}
                onOpenSsh={() => setIsSshOpen(true)}
              />
            )}

            {currentPath === '~/resume' && <ResumeView />}

            {currentPath === '~/contact' && (
              <ContactView onOpenSsh={() => setIsSshOpen(true)} />
            )}
          </main>

          {/* Bottom Terminal Status Footer matching screenshots */}
          <footer className="h-7 bg-[#060911] border-t border-slate-800/80 px-4 flex items-center justify-between text-[11px] text-slate-500 font-mono select-none shrink-0">
            <div className="flex items-center space-x-3">
              <span className="text-cyan-400 font-bold hidden sm:inline">(C) 2026 root@Himanshu</span>
              <span className="text-slate-600">//</span>
              <span className="text-emerald-400 font-bold">v2026.8.12</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">UTF-8</span>
              <span className="hidden md:inline text-emerald-400 font-bold">main*</span>
              <span>Ln 1, Col 1</span>
              <span className="text-slate-400 hidden sm:inline">UPTIME: 99.9%</span>
              <span className="text-emerald-400 font-bold">LATENCY: 24ms</span>
              <span className="text-slate-400 hidden lg:inline">LOC: 45.8k</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Modals */}
      <RebootAnimationModal
        isOpen={isRebooting}
        onComplete={() => {
          setIsRebooting(false);
          setCurrentPath('~/home');
          setActiveTab('SESSION');
          setExecLogs(['EXECUTE_ENGINE: System reloaded successfully.', 'Kernel version v2026.8.12 online.']);
        }}
      />

      <SSHModal isOpen={isSshOpen} onClose={() => setIsSshOpen(false)} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        crtEnabled={crtEnabled}
        onToggleCrt={() => setCrtEnabled(!crtEnabled)}
        theme={theme}
        onChangeTheme={(t) => setTheme(t)}
      />
    </div>
  );
}

