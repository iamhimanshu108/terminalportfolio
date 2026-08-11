import React from 'react';
import { X, Sliders, Volume2, Tv, Palette, RefreshCw } from 'lucide-react';
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
  if (!isOpen) return null;

  const themes = [
    { id: 'jetbrains', name: 'JetBrains Dark Navy (Default)', preview: 'bg-[#0B0F19] border-emerald-500' },
    { id: 'matrix', name: 'Matrix Phosphor Green', preview: 'bg-[#001100] border-emerald-400' },
    { id: 'cyber', name: 'Cyber Neon Cyan', preview: 'bg-[#050D1A] border-cyan-400' },
    { id: 'amber', name: 'Amber Vintage Monospaced', preview: 'bg-[#140A00] border-amber-500' },
    { id: 'dracula', name: 'Dracula Purple & Pink', preview: 'bg-[#0F0E17] border-purple-400' },
    { id: 'nord', name: 'Nordic Polar Ice', preview: 'bg-[#0E141D] border-sky-400' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono text-xs">
      <div className="bg-[#050810] border border-slate-700 rounded-lg w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="bg-[#080C16] border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Sliders className="w-4 h-4" />
            <span>TERMINAL_SETTINGS</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded">
            <X className="w-4 h-4" />
          </button>
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
            <div className="space-y-1.5">
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
