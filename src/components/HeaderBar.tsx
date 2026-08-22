import React from 'react';
import { HeaderTab, NavPath } from '../types';
import { SYSTEM_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import { Search, Volume2, VolumeX, Tv, SlidersHorizontal, Power, Menu } from 'lucide-react';

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
  const tabs: HeaderTab[] = ['SESSION', 'EXECUTE', 'DEBUG'];

  return (
    <header className="h-12 bg-[#0A0E17] border-b border-slate-800/80 px-4 flex items-center justify-between font-mono text-xs select-none z-10 shrink-0">
      {/* Left Title & Tabs */}
      <div className="flex items-center space-x-3">
        {/* Hamburger Menu Toggle for Mobile/Tablet */}
        <button
          onClick={() => {
            sound.playKeypress();
            onToggleSidebar();
          }}
          className="lg:hidden p-1.5 rounded hover:bg-slate-800/80 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-emerald-400 tracking-widest text-[11px] sm:text-xs lowercase flex items-center gap-1.5">
            root@iamhimanshu108
            <span className="text-[9px] sm:text-[10px] text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
              {SYSTEM_INFO.version}
            </span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
            // {currentPath}
          </span>
        </div>
      </div>

      {/* Right Search Bar Input */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-24 xs:w-32 sm:w-48 bg-[#060911] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold font-sans"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
