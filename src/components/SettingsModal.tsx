import React, { useEffect } from 'react';
import { Sliders, Volume2, Tv, Palette, RefreshCw } from 'lucide-react';
import { sound } from '../lib/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  theme: string;
  onChangeTheme: (t: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
  theme,
  onChangeTheme
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const themes = [
    { id: 'jetbrains', name: 'JetBrains Dark Navy (Default)', preview: 'bg-[#0B0F19] border-emerald-500' },
    { id: 'ubuntu', name: 'Ubuntu Linux Aubergine & Orange', preview: 'bg-[#1d0b1a] border-[#E95420]' },
    { id: 'kali', name: 'Kali Linux Dragon Cyan', preview: 'bg-[#080d16] border-[#00E5FF]' },
    { id: 'parrot', name: 'Parrot Security Cyber Mint', preview: 'bg-[#051114] border-[#05D69E]' },
    { id: 'mac', name: 'macOS Dark Graphite & Apple Blue', preview: 'bg-[#141416] border-[#0A84FF]' },
    { id: 'windows', name: 'Windows Terminal Azure Blue', preview: 'bg-[#0b0f14] border-[#0078D4]' },
    { id: 'matrix', name: 'Matrix Phosphor Green', preview: 'bg-[#020B04] border-emerald-400' },
    { id: 'cyber', name: 'Cyber Neon Cyan', preview: 'bg-[#030914] border-cyan-400' },
    { id: 'amber', name: 'Amber Vintage Monospaced', preview: 'bg-[#0E0700] border-amber-500' },
    { id: 'dracula', name: 'Dracula Purple & Pink', preview: 'bg-[#0F0E17] border-purple-400' },
    { id: 'nord', name: 'Nordic Polar Ice', preview: 'bg-[#0E141D] border-sky-400' },
    { id: 'gruvbox', name: 'Gruvbox Retro Gold', preview: 'bg-[#1d2021] border-[#fabd2f]' },
    { id: 'monokai', name: 'Monokai Vibrant Pink', preview: 'bg-[#272822] border-[#F92672]' },
    { id: 'rose-pine', name: 'Rose Pine Rosy Dusk', preview: 'bg-[#1f1d2e] border-[#ebbcba]' }
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 font-mono text-xs animate-fadeIn">
      <div className="bg-[#050810] border border-emerald-500/40 rounded-xl w-full max-w-md overflow-hidden shadow-[0_0_35px_rgba(16,185,129,0.18)]">
        {/* Terminal Header with Mac / Linux Traffic Lights */}
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

            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Sliders className="w-4 h-4" />
              <span>TERMINAL_SETTINGS</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-5 space-y-5">
          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold text-slate-200 block">AUDIO SYNTHESIZER</span>
                <span className="text-[10px] text-slate-500 block">Play retro keypress & exec sound tones</span>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                sound.enabled = !soundEnabled;
              }}
              className={`px-3 py-1 rounded font-bold text-xs ${
                soundEnabled ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* CRT Scanline Toggle */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-bold text-slate-200 block">CRT SCANLINE EFFECT</span>
                <span className="text-[10px] text-slate-500 block">Add subtle phosphor CRT monitor lines</span>
              </div>
            </div>
            <button
              onClick={onToggleCrt}
              className={`px-3 py-1 rounded font-bold text-xs ${
                crtEnabled ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {crtEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Theme selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-400 font-bold text-[11px]">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>TERMINAL PALETTE</span>
            </div>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playKeypress();
                    onChangeTheme(t.id);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded border text-left transition-all ${
                    theme === t.id
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-[#080C16] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{t.name}</span>
                  <div className={`w-3 h-3 rounded-full border ${t.preview}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
