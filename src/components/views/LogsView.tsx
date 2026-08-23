import React, { useState } from 'react';
import { EXPERIENCE_LOGS } from '../../data/portfolioData';
import { LogEntry, LogLevel, HeaderTab } from '../../types';
import { Terminal, CheckCircle2, AlertTriangle, Info, Copy, Check, Filter, Search, RotateCcw } from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';

interface LogsViewProps {
  activeTab?: HeaderTab;
  searchQuery?: string;
}

export const LogsView: React.FC<LogsViewProps> = ({
  searchQuery: externalSearchQuery = ''
}) => {
  const [logs, setLogs] = useState<LogEntry[]>(EXPERIENCE_LOGS);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | 'SUCCESS' | 'INFO' | 'WARN'>('ALL');
  const [internalSearch, setInternalSearch] = useState<string>('');

  const activeSearch = externalSearchQuery || internalSearch;

  const handleCopyLogs = () => {
    sound.playKeypress();
    const formatted = filteredLogs
      .map(
        (l) =>
          `[${l.timestamp}] [${l.level}] ${l.process}\n  ├ Task: ${l.task}${
            l.metricOrNote ? `\n  └ ${l.metricOrNote}` : ''
          }`
      )
      .join('\n');
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetLogs = () => {
    sound.playKeypress();
    setLogs(EXPERIENCE_LOGS);
    setSelectedLevelFilter('ALL');
    setInternalSearch('');
  };

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case 'INFO':
        return (
          <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-[10px] flex items-center gap-1">
            <Info className="w-3 h-3 text-cyan-400" /> [INFO]
          </span>
        );
      case 'SUCCESS':
        return (
          <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/40 text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> [SUCCESS]
          </span>
        );
      case 'WARN':
        return (
          <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/40 text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> [WARN]
          </span>
        );
      case 'ERROR':
        return (
          <span className="text-rose-400 font-bold px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/40 text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-rose-400" /> [ERROR]
          </span>
        );
    }
  };

  const filteredLogs = logs.filter((l) => {
    const matchesLevel = selectedLevelFilter === 'ALL' || l.level === selectedLevelFilter;
    const matchesSearch =
      !activeSearch ||
      l.process.toLowerCase().includes(activeSearch.toLowerCase()) ||
      l.task.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (l.metricOrNote && l.metricOrNote.toLowerCase().includes(activeSearch.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Filter Controls Bar (Clean & Static, No Stream) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#080C16] p-3 rounded-lg border border-slate-800">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-300 font-bold text-xs pr-2">FILTER_LOGS:</span>

          <div className="flex items-center space-x-1.5">
            {(['ALL', 'SUCCESS', 'INFO', 'WARN'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  sound.playKeypress();
                  setSelectedLevelFilter(lvl);
                }}
                className={`px-2.5 py-1 text-[11px] font-bold rounded border transition-colors ${
                  selectedLevelFilter === lvl
                    ? 'bg-emerald-500 text-black border-emerald-400'
                    : 'bg-[#050810] text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                [{lvl}]
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter log text..."
              value={internalSearch}
              onChange={(e) => setInternalSearch(e.target.value)}
              className="w-full sm:w-44 bg-[#050810] border border-slate-800 text-slate-200 text-[11px] pl-7 pr-2 py-1 rounded focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
          </div>

          <button
            onClick={handleCopyLogs}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-xs flex items-center space-x-1.5 transition-colors font-bold"
            title="Copy Filtered Logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'COPIED!' : 'COPY'}</span>
          </button>

          <button
            onClick={handleResetLogs}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 rounded transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Output Terminal Box */}
      <div className="bg-[#050810] border border-slate-800/90 rounded-lg p-5 font-mono text-xs shadow-2xl space-y-4">
        <div className="text-slate-500 border-b border-slate-800/80 pb-2 flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-400">/var/log/experience.log</span>
          <span className="text-emerald-400 font-bold">[ {filteredLogs.length} LOG_ENTRIES ]</span>
        </div>

        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
          {filteredLogs.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono">
              [ NO_LOGS_MATCH_CRITERIA ]
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="space-y-1 font-mono leading-relaxed group">
                <div className="flex flex-wrap items-center space-x-2 text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span className="text-cyan-400 text-[11px]">[{log.timestamp.slice(0, 10)}]</span>
                  {getLevelBadge(log.level)}
                  <span className="text-slate-100 font-semibold">{log.process}</span>
                </div>

                <div className="pl-6 text-slate-400 space-y-0.5 border-l border-slate-800/80 ml-2 py-0.5">
                  <p className="flex items-start space-x-1">
                    <span className="text-slate-500">├ Task:</span>
                    <span className="text-slate-200">{log.task}</span>
                  </p>
                  {log.metricOrNote && (
                    <p className="flex items-start space-x-1 text-emerald-400/90">
                      <span className="text-slate-500">└</span>
                      <span>{log.metricOrNote}</span>
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
          <div className="text-slate-600 font-italic text-[11px] pt-2 border-t border-slate-900">
            --- END OF SYSTEM EXPERIENCE LOG ---
          </div>
        </div>
      </div>
    </div>
  );
};
