import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal, CheckCircle2, Copy, Check, Send } from 'lucide-react';
import { sound } from '../lib/sound';

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
          'Authenticated to Himanshu Yadav (root@Himanshu v2026.8.12).',
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

  if (!isOpen) return null;

  const handleSshSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    sound.playExecute();
    const cmd = inputVal.trim();
    setInputVal('');

    setSshLogs((prev) => [...prev, `contact@dev.local:~$ ${cmd}`]);

    if (cmd.toLowerCase() === 'exit') {
      onClose();
    } else if (cmd.toLowerCase() === 'email') {
      setSshLogs((prev) => [
        ...prev,
        'Direct email endpoint: hiyadav2022@gmail.com',
        'Status: ACTIVE_LISTENER'
      ]);
    } else if (cmd.toLowerCase() === 'whoami') {
      setSshLogs((prev) => [...prev, 'Himanshu Yadav - Lead Infrastructure & Systems Engineer']);
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono text-xs">
      <div className="bg-[#050810] border border-emerald-500/50 rounded-lg w-full max-w-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col max-h-[85vh]">
        {/* Modal Window Header */}
        <div className="bg-[#080C16] border-b border-slate-800 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-400">ssh contact@dev.local</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
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
            <span className="text-emerald-400 font-bold">contact@dev.local:~$</span>
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
