import React from 'react';
import { HeaderTab, NavPath } from '../types';
import { SYSTEM_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import { Search, Terminal, Menu, Folder } from 'lucide-react';

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
  onToggleSidebar
}) => {
  return (
    <header className="h-11 bg-[#070A12]/95 backdrop-blur border-b border-slate-800/90 px-3.5 flex items-center justify-between font-mono text-xs select-none z-10 shrink-0 shadow-sm">
      {/* Left: Mobile Hamburger & Terminal Info */}
      <div className="flex items-center space-x-3">

        {/* Hamburger Menu Toggle for Mobile/Tablet */}
        <button
          onClick={() => {
            sound.playKeypress();
            onToggleSidebar();
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
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
            (zsh)
          </span>
        </div>
      </div>

      {/* Center/Right: Fast Search Input with macOS Badge */}
      <div className="flex items-center space-x-2.5">
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
    </header>
  );
};

