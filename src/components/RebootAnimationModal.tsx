import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import { RefreshCw, ShieldCheck, UserCheck, Lock } from 'lucide-react';
import myAvatar from '../assets/My.png';

interface RebootAnimationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const RebootAnimationModal: React.FC<RebootAnimationModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    `Initializing Kernel ${SYSTEM_INFO.version}...`,
    "Authenticating root session...",
    "Mounting microservice backends & AI pipelines...",
    "Verifying security certificates & encryption keys...",
    "Session verified. Welcome to Himanshu Yadav's Portfolio."
  ];

  useEffect(() => {
    if (!isOpen) {
      setBootStep(0);
      setProgress(0);
      return;
    }

    sound.playExecute();

    // Fast progress bar fill (1.5 seconds)
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    // Typing boot step logs
    const logInterval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < bootLogs.length - 1) {
          sound.playKeypress();
          return prev + 1;
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            sound.playSshConnect();
            onComplete();
          }, 500);
          return prev;
        }
      });
    }, 280);

    return () => {
      clearInterval(progInterval);
      clearInterval(logInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#03060C] flex flex-col items-center justify-center p-4 font-mono text-xs select-none">
      {/* Background radial atmosphere overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-sm space-y-6 text-center z-10 animate-fadeIn">
        {/* Profile Avatar Block (Windows & Linux Login Screen Style) */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative group">
            {/* Outer Spinning Glow Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 opacity-75 blur-sm animate-spin" />
            
            <div className="relative">
              <img
                src={myAvatar}
                alt={SYSTEM_INFO.author}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-emerald-400 object-cover shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#03060C] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide font-mono">
              {SYSTEM_INFO.author}
            </h1>
            <div className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>root@iamhimanshu108</span>
            </div>
          </div>
        </div>

        {/* Progress Bar & Loader */}
        <div className="space-y-2 px-6">
          <div className="flex items-center justify-center space-x-2 text-emerald-400 font-bold text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span className="tracking-widest uppercase text-[11px]">LOGGING IN...</span>
          </div>

          <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-slate-800/80 shadow-inner">
            <div
              className="bg-emerald-400 h-full transition-all duration-150 shadow-[0_0_12px_rgba(16,185,129,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
            <span className="tracking-wider">KERNEL {SYSTEM_INFO.version}</span>
            <span className="text-emerald-400">{progress}%</span>
          </div>
        </div>

        {/* Typing Boot Status Message */}
        <div className="min-h-[20px] bg-[#060B16] border border-slate-800/80 px-3 py-2 rounded-lg text-[11px] text-slate-300 font-mono flex items-center justify-center gap-2 shadow-sm">
          <span className="text-emerald-400 font-bold">&gt;</span>
          <span className="text-slate-200 font-medium truncate">{bootLogs[bootStep]}</span>
        </div>

        {/* Footer OS Tag */}
        <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>AUTHENTICATED SESSION</span>
        </div>
      </div>
    </div>
  );
};
