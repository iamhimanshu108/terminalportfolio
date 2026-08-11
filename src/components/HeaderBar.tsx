import React from 'react';
import { HeaderTab, NavPath } from '../types';
import { sound } from '../lib/sound';
import { Search, Volume2, VolumeX, Tv, SlidersHorizontal, Power } from 'lucide-react';

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
  onTriggerReboot
}) => {
  const tabs: HeaderTab[] = ['SESSION', 'EXECUTE', 'DEBUG'];

  return (
    <header className="h-12 bg-[#0A0E17] border-b border-slate-800/80 px-4 flex items-center justify-between font-mono text-xs select-none z-10 shrink-0">
      {/* Left Title & Tabs */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-emerald-400 tracking-widest text-xs uppercase flex items-center gap-1.5">
            ROOT@HIMANSHU
            <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded">
              v2026.8.12
            </span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            // {currentPath}
          </span>
        </div>

        {/* Header Mode Tabs */}
        <div className="flex items-center space-x-1 border-l border-slate-800 pl-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => {
                  sound.playKeypress();
                  onSelectTab(tab);
                }}
                className={`px-3 py-1 uppercase tracking-wider font-semibold rounded transition-all ${
                  isActive
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-950/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Search Input & Quick Controls */}
      <div className="flex items-center space-x-3">
        {/* Quick Search Field */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="> Search stack, logs, projects..."
            className="w-48 bg-[#060911] border border-slate-800 rounded pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
            >
              ×
            </button>
          )}
        </div>

        {/* Audio Toggle */}
        <button
          id="btn-toggle-sound"
          onClick={() => {
            onToggleSound();
            sound.enabled = !soundEnabled;
            if (!soundEnabled) sound.playExecute();
          }}
          title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          className={`p-1.5 rounded transition-colors ${
            soundEnabled ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Quick Settings */}
        <button
          id="btn-header-settings"
          onClick={() => {
            sound.playKeypress();
            onOpenSettings();
          }}
          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60 rounded transition-colors"
          title="Terminal Settings"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* Quick Reboot */}
        <button
          id="btn-header-reboot"
          onClick={() => {
            sound.playExecute();
            onTriggerReboot();
          }}
          className="p-1.5 text-rose-400 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 rounded transition-colors"
          title="Reboot System v2026.8.12"
        >
          <Power className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
