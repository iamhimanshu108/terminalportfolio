import React, { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, Copy, Check, Send } from 'lucide-react';
import { sound } from '../lib/sound';
import { SYSTEM_INFO } from '../data/portfolioData';

interface SSHModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SSHModal: React.FC<SSHModalProps> = ({ isOpen, onClose }) => {
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);
  const [sshLogs, setSshLogs] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      sound.playSshConnect();
      setConnecting(true);
      setConnected(false);
      setSshLogs(['OpenSSH_8.9p1 Ubuntu-3ubuntu0.6, OpenSSL 3.0.2']);

      const timer1 = setTimeout(() => {
        setSshLogs((prev) => [...prev, 'Connecting to contact@dev.local (192.168.1.104) port 22...']);
      }, 300);

      const timer2 = setTimeout(() => {
        setSshLogs((prev) => [...prev, 'Host key fingerprint: SHA256:d8a9f2...']);
      }, 700);

      const timer3 = setTimeout(() => {
        setSshLogs((prev) => [
          ...prev,
          `Authenticated to Himanshu Yadav (root@Himanshu ${SYSTEM_INFO.version}).`,
          'Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-101-generic x86_64)',
          'Last login: ' + new Date().toUTCString()
        ]);
        setConnecting(false);
        setConnected(true);
      }, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sshLogs]);

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

  const handleSshSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    sound.playExecute();
    const cmd = inputVal.trim();
    setSshLogs((prev) => [...prev, `contact@dev.local:~$ ${cmd}`]);
    setInputVal('');

    if (cmd.toLowerCase() === 'help') {
      setSshLogs((prev) => [
        ...prev,
        'Available terminal commands: whoami, status, clear, exit, motd, sysinfo'
      ]);
    } else if (cmd.toLowerCase() === 'clear') {
      setSshLogs([]);
    } else if (cmd.toLowerCase() === 'exit') {
      onClose();
    } else if (cmd.toLowerCase() === 'whoami') {
      setSshLogs((prev) => [...prev, 'Himanshu Yadav - Full Stack Web Developer & Automation Specialist']);
    } else if (cmd.toLowerCase() === 'status') {
      setSshLogs((prev) => [...prev, 'SYSTEM_STATUS: 100% ONLINE | ALL MICROSERVICES HEALTHY']);
    } else {
      setSshLogs((prev) => [
        ...prev,
        `bash: ${cmd}: command executed. Output piped to session.`
      ]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 font-mono text-xs animate-fadeIn">
      <div className="bg-[#050810] border border-emerald-500/40 rounded-xl w-full max-w-2xl overflow-hidden shadow-[0_0_35px_rgba(16,185,129,0.18)] flex flex-col max-h-[85vh]">
        {/* Terminal Header Bar with Mac / Linux style buttons */}
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

            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-400">ssh contact@dev.local</span>
            </div>
          </div>
        </div>

        {/* SSH Output Log Buffer */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2 bg-[#03050A] text-slate-300 font-mono min-h-[250px]">
          {sshLogs.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.startsWith('contact@dev.local') ? (
                <span className="text-emerald-400 font-bold">{line}</span>
              ) : line.includes('Authenticated') ? (
                <span className="text-cyan-400 font-bold">{line}</span>
              ) : (
                <span>{line}</span>
              )}
            </div>
          ))}
          {connecting && (
            <div className="text-emerald-400 animate-pulse flex items-center space-x-2">
              <span>Establishing SSH handshake...</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        {connected && (
          <form onSubmit={handleSshSubmit} className="p-3 bg-[#080C16] border-t border-slate-800 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold shrink-0">
              <span className="hidden sm:inline">contact@dev.local:~$</span>
              <span className="sm:hidden">~$</span>
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder=""
              className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs"
            />
            <button type="submit" className="text-emerald-400 hover:text-emerald-300 p-1">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
