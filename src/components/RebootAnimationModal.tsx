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
    `[ INITIALIZING ] DevSys Kernel ${SYSTEM_INFO.version}...`,
    `[ AUTHENTICATED ] Welcome to Himanshu Yadav's Developer Terminal System`,
    `[ SYSTEM ] Loading Spring Boot Microservices & AI Pipeline Modules...`,
    `[ SUCCESS ] All systems nominal. Mounting Interactive UI...`,
    `[ WELCOME ] System Online. Welcome visitor@iamhimanshu108!`
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
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-xl bg-[#060912] border border-emerald-500/60 rounded-xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] space-y-5 relative overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
          <div className="flex items-center space-x-2.5 text-emerald-400 font-bold text-sm">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>[ SYSTEM BOOT: root@iamhimanshu108 ]</span>
          </div>
          <span className="text-cyan-400 text-xs font-bold border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/60 font-mono">
            {SYSTEM_INFO.version}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 bg-[#03060E] border border-slate-800 p-3 rounded-lg">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>SYSTEM INITIALIZATION</span>
            <span className="text-emerald-400 font-bold">{progress}% READY</span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Welcoming Console Logs */}
        <div className="bg-[#020409] border border-slate-800/80 p-4 rounded-lg font-mono text-[11px] text-slate-300 space-y-2 min-h-[150px] shadow-inner">
          {bootLogs.slice(0, bootStep + 1).map((log, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                index === bootStep ? 'text-emerald-300 font-bold' : 'text-slate-400'
              }`}
            >
              <span className="text-emerald-500 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          {bootStep < bootLogs.length - 1 && (
            <div className="flex items-center space-x-2 text-emerald-400 animate-pulse pt-1">
              <span className="w-1.5 h-3 bg-emerald-400 inline-block" />
              <span className="text-[10px]">Mounting system components...</span>
            </div>
          )}
        </div>

        {/* Welcoming Footer Notice */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
          <div className="flex items-center space-x-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Host: <strong className="text-slate-200">root@iamhimanshu108</strong></span>
          </div>
          <span className="text-emerald-400 font-bold animate-pulse">
            WELCOME TO HIMANSHU'S PORTFOLIO
          </span>
        </div>
      </div>
    </div>
  );
};
