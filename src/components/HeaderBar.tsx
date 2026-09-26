import React, { useState } from 'react';
import { HeaderTab, NavPath } from '../types';
import { SYSTEM_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import { Search, Terminal, Menu, Folder, Settings, Power } from 'lucide-react';

interface HeaderBarProps {
  currentPath: NavPath;
  activeTab: HeaderTab;
  onSelectTab: (tab: HeaderTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onOpenSettings: () => void;
  onTriggerReboot: () => void;
  onToggleSidebar: () => void;
  onNavigate: (path: NavPath) => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentPath,
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
  onOpenSettings,
  onTriggerReboot,
  onToggleSidebar,
  onNavigate
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navItems: NavPath[] = ['~/home', '~/about', '~/skills', '~/projects', '~/experience', '~/contact'];
  return (
    <header className="relative h-11 bg-[#070A12]/95 backdrop-blur border-b border-slate-800/90 px-3.5 flex items-center justify-between font-mono text-xs select-none z-10 shrink-0 shadow-sm">
      {/* Left: Mobile Hamburger & Terminal Info */}
      <div className="flex items-center space-x-3">

        {/* Hamburger Menu Toggle for Mobile/Tablet */}
        <button
          onClick={() => {
            sound.playKeypress();
            setIsMobileNavOpen((open) => !open);
          }}
          className="lg:hidden p-1 rounded hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Terminal Shell Info */}
        <div className="flex items-center space-x-2 text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-bold text-emerald-400 text-xs tracking-tight lowercase">
            root@iamhimanshu108:
          </span>
          <span className="text-cyan-400 font-bold text-xs flex items-center gap-1">
            <Folder className="w-3 h-3 text-cyan-400 inline" />
            {currentPath}
          </span>
        </div>
      </div>

      {/* Center/Right: Fast Search Input with macOS Badge */}
      <div className="hidden">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search commands..."
            className="w-28 xs:w-36 sm:w-56 bg-[#040711] border border-slate-800 hover:border-slate-700 rounded-lg pl-8 pr-7 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:bg-[#060A17] transition-all font-mono"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold font-sans"
            >
              ×
            </button>
          ) : (
            <span className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-600 bg-slate-900 border border-slate-800 px-1 rounded font-sans">
              ⌘K
            </span>
          )}
        </div>
      </div>

      <nav className="ml-auto mr-8 hidden items-center gap-2 lg:flex" aria-label="Directory">
        {navItems.map((path) => (
          <button key={path} onClick={() => { sound.playKeypress(); onNavigate(path); }} className={`rounded px-2.5 py-1 text-[11px] transition-colors ${currentPath === path ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:bg-slate-800 hover:text-emerald-400'}`}>
            {path.replace('~/', '')}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-slate-800" />
        <button onClick={onOpenSettings} title="Settings" className="rounded p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-400">
          <Settings className="h-3.5 w-3.5" />
        </button>
        <button onClick={onTriggerReboot} title="Reboot" className="rounded p-1.5 text-rose-400 transition-colors hover:bg-rose-950/40 hover:text-rose-300">
          <Power className="h-3.5 w-3.5" />
        </button>
      </nav>

      {isMobileNavOpen && (
        <nav className="absolute left-2 right-2 top-10 z-50 rounded-lg border border-slate-800 bg-[#070A12] p-2 shadow-2xl lg:hidden" aria-label="Mobile directory">
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((path) => (
              <button
                key={path}
                onClick={() => { sound.playKeypress(); onNavigate(path); setIsMobileNavOpen(false); }}
                className={`rounded px-3 py-2 text-left text-xs transition-colors ${currentPath === path ? 'bg-emerald-500 text-black font-bold' : 'text-slate-300 hover:bg-slate-800 hover:text-emerald-400'}`}
              >
                ~/ {path.replace('~/', '')}
              </button>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-end gap-2 border-t border-slate-800 pt-2">
            <button onClick={() => { onOpenSettings(); setIsMobileNavOpen(false); }} className="rounded px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-400">SETTINGS</button>
            <button onClick={() => { onTriggerReboot(); setIsMobileNavOpen(false); }} className="rounded px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40">REBOOT</button>
          </div>
        </nav>
      )}
    </header>
  );
};

