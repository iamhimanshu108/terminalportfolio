import React, { useState, useEffect } from 'react';
import { sound } from '../lib/sound';
import { RefreshCw, CheckCircle2, ShieldAlert, Cpu, Terminal, Sparkles } from 'lucide-react';

interface RebootAnimationModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const RebootAnimationModal: React.FC<RebootAnimationModalProps> = ({
  isOpen,
  onComplete
}) => {
  const [bootStep, setBootStep] = useState(0);
  const [memCheck, setMemCheck] = useState(0);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "[ POWER ] SIGTERM received. Initiating System Reboot Sequence...",
    "[ SHUTDOWN ] Stopping background telemetry workers & express proxies...",
    "[ BIOS ] Phoenix Trusted Core (TM) v2026.8.12 Initialized.",
    "[ KERNEL ] Loading Linux root@Himanshu (x86_64-devsys-kernel)...",
    "[ ACPI ] Initializing 16 Logical CPU Threads...",
    "[ MEMORY ] RAM Self-Test: 16384 MB OK (Zero Parity Errors)",
    "[ FS ] Mounting /dev/root on / (root@Himanshu, ext4, rw)...",
    "[ SYSTEMD ] Starting Spring Boot Java Backend Router... [ OK ]",
    "[ SYSTEMD ] Starting React SPA Front-End Interface... [ OK ]",
    "[ SYSTEMD ] Mounting Gemini AI Proxy Pipelines... [ OK ]",
    "[ DATABASE ] Synchronizing MySQL & MongoDB Schemas... [ OK ]",
    "[ REBOOT ] System reload complete. Returning control to root@Himanshu..."
  ];

  useEffect(() => {
    if (!isOpen) {
      setBootStep(0);
      setMemCheck(0);
      setProgress(0);
      return;
    }

    sound.playExecute();

    // Memory test increment
    const memInterval = setInterval(() => {
      setMemCheck((prev) => {
        if (prev >= 16384) {
          clearInterval(memInterval);
          return 16384;
        }
        return prev + 1024;
      });
    }, 100);

    // Progress bar fill
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Step-by-step logs typing out
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
          }, 600);
          return prev;
        }
      });
    }, 200);

    return () => {
      clearInterval(memInterval);
      clearInterval(progInterval);
      clearInterval(logInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#03060C] flex flex-col items-center justify-center p-4 font-mono text-xs select-none">
      {/* Scanline background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-3xl bg-[#060912] border-2 border-emerald-500/60 rounded-xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)] space-y-6 relative overflow-hidden">
        {/* Glowing header bar */}
        <div className="flex items-center justify-between border-b border-emerald-500/40 pb-3">
          <div className="flex items-center space-x-3 text-emerald-400 font-bold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
            <span>[ SYSTEM REBOOT IN PROGRESS: root@Himanshu ]</span>
          </div>
          <span className="text-slate-400 text-xs font-bold border border-slate-800 px-2.5 py-1 rounded bg-[#090F1C]">
            VERSION: v2026.8.12
          </span>
        </div>

        {/* Boot Progress & RAM Gauge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#03060E] border border-slate-800 p-3 rounded space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>SYSTEM MEMORY DIAGNOSTIC</span>
              <span className="text-emerald-400">{memCheck} / 16384 MB</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-100"
                style={{ width: `${(memCheck / 16384) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-[#03060E] border border-slate-800 p-3 rounded space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>KERNEL RELOAD PROGRESS</span>
              <span className="text-cyan-400">{progress}% COMPLETE</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded overflow-hidden">
              <div
                className="bg-cyan-400 h-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live BIOS Console Screen */}
        <div className="bg-[#020409] border border-slate-800/80 p-4 rounded-lg font-mono text-[11px] text-slate-300 space-y-1.5 min-h-[220px] max-h-[260px] overflow-y-auto scrollbar-thin shadow-inner">
          {bootLogs.slice(0, bootStep + 1).map((log, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                index === bootStep ? 'text-emerald-300 font-bold' : 'text-slate-400'
              }`}
            >
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
          {bootStep < bootLogs.length - 1 && (
            <div className="flex items-center space-x-2 text-emerald-400 animate-pulse pt-1">
              <span className="w-2 h-4 bg-emerald-400 inline-block" />
              <span className="text-[10px]">Processing kernel interrupts...</span>
            </div>
          )}
        </div>

        {/* Footer status notice */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
          <div className="flex items-center space-x-2 text-slate-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Host: <strong className="text-slate-200">root@Himanshu</strong></span>
          </div>
          <span className="text-emerald-400 font-bold animate-pulse">
            [ RELOADING ALL PORTFOLIO DATA... ]
          </span>
        </div>
      </div>
    </div>
  );
};
