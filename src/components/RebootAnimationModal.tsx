import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../data/portfolioData';
import { sound } from '../lib/sound';
import { RefreshCw, ShieldCheck } from 'lucide-react';

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
    `Initializing DevSys Kernel ${SYSTEM_INFO.version}...`,
    "Loading Spring Boot microservices...",
    "Securing AI engine dispatch pipeline...",
    "Mounting terminal interactive dashboard...",
    "System online. Mounting portfolio interface."
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
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-xs space-y-5 text-center">
        {/* Spinner & Welcome Title */}
        <div className="flex flex-col items-center space-y-2">
          <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
          <h2 className="text-emerald-400 font-bold text-[11px] tracking-[0.2em] mt-2 font-mono uppercase">
            BOOT_INIT_SYSTEM
          </h2>
          <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider font-mono">
            root@iamhimanshu108 v{SYSTEM_INFO.version}
          </span>
        </div>

        {/* Sleek Minimal Progress Line */}
        <div className="space-y-1.5 px-3">
          <div className="w-full bg-slate-900/60 h-[2px] rounded-full overflow-hidden border border-slate-800/10">
            <div
              className="bg-emerald-400 h-full transition-all duration-150 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[8px] font-bold text-slate-500 px-0.5">
            <span className="tracking-wider">SYSTEM_CHECK</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Minimal Single status line */}
        <div className="min-h-[16px] flex items-center justify-center text-[10px] text-slate-400 font-mono font-medium">
          <span className="text-emerald-500 font-bold mr-1.5">&gt;</span>
          <span className="text-slate-300 font-bold">{bootLogs[bootStep]}</span>
        </div>

        {/* Centered Welcome Banner */}
        <div className="pt-3 text-[10px] text-emerald-400/80 font-bold tracking-wider uppercase border-t border-slate-900/40 w-4/5 mx-auto">
          Welcome to Himanshu's Portfolio
        </div>
      </div>
    </div>
  );
};
