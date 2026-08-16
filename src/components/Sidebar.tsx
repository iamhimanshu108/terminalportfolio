import React from 'react';
import { NavPath } from '../types';
import { sound } from '../lib/sound';
import { 
  Home, 
  FolderGit2, 
  Layers, 
  Briefcase, 
  FileCode2,
  Mail, 
  Terminal, 
  Settings, 
  Power
} from 'lucide-react';

import myAvatar from '../assets/My.png';
import { SYSTEM_INFO } from '../data/portfolioData';

interface SidebarProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onOpenSettings: () => void;
  onTriggerReboot: () => void;
  statusOnline: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  onOpenSsh,
  onOpenSettings,
  onTriggerReboot,
  statusOnline
}) => {
  const navItems: { path: NavPath; label: string; icon: React.ReactNode }[] = [
    { path: '~/home', label: '~/home', icon: <Home className="w-4 h-4" /> },
    { path: '~/projects', label: '~/projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { path: '~/skills', label: '~/skills', icon: <Layers className="w-4 h-4" /> },
    { path: '~/experience', label: '~/experience', icon: <Briefcase className="w-4 h-4" /> },
    { path: '~/resume', label: '~/resume', icon: <FileCode2 className="w-4 h-4" /> },
    { path: '~/contact', label: '~/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleSelect = (path: NavPath) => {
    sound.playKeypress();
    onNavigate(path);
  };

  return (
    <aside className="w-64 min-w-64 bg-[#080C16] border-r border-slate-800/80 flex flex-col justify-between select-none font-mono text-sm z-20">
      <div>
        {/* Header Branding */}
        <div className="p-4 border-b border-slate-800/80 bg-[#060911]">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative">
              <img
                src={myAvatar}
                alt="Himanshu Yadav"
                className="w-9 h-9 rounded-lg border-2 border-emerald-500/60 object-cover shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              />
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-black ${statusOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            </div>
            <div>
              <div className="font-bold text-emerald-400 tracking-wider text-xs lowercase flex items-center gap-1.5">
                root@iamhimanshu108
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-tight">
                STATUS: {statusOnline ? 'ONLINE' : 'MAINTENANCE'}
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1">
            <span className="text-emerald-400 font-bold">{SYSTEM_INFO.version}</span>
            <span className="text-slate-400">iamhimanshu.in</span>
          </div>
        </div>

        {/* Directory Navigation List */}
        <nav className="p-3 space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">
            DIRECTORY
          </div>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                id={`nav-item-${item.path.replace('~/', '')}`}
                onClick={() => handleSelect(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-xs font-mono transition-all duration-150 rounded ${
                  isActive
                    ? 'bg-[#10B981] text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900/80'
                }`}
              >
                <span className={`${isActive ? 'text-black' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span className="flex-1 text-left tracking-wide">
                  {isActive ? `[ ${item.label} ]` : item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-3 bg-black animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Action Area */}
      <div className="p-3 border-t border-slate-800/80 bg-[#060911] space-y-2">
        {/* Action Controls */}
        <div className="flex items-center justify-between pt-1 text-slate-400">
          <button
            id="btn-open-settings"
            onClick={() => {
              sound.playKeypress();
              onOpenSettings();
            }}
            className="flex items-center space-x-1.5 px-2 py-1 hover:text-emerald-400 hover:bg-slate-800/50 rounded transition-colors text-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>SETTINGS</span>
          </button>
          <button
            id="btn-power-reboot"
            onClick={() => {
              sound.playExecute();
              onTriggerReboot();
            }}
            title={`Reboot System ${SYSTEM_INFO.version}`}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors flex items-center space-x-1"
          >
            <Power className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[10px] font-bold text-rose-400 hidden sm:inline">REBOOT</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
