import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../lib/sound';
import { Terminal as TerminalIcon, Send, Sparkles, Loader2 } from 'lucide-react';
import { NavPath } from '../types';

interface InteractiveTerminalProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  promptUser?: string;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  currentPath,
  onNavigate,
  onOpenSsh,
  promptUser = 'root@Himanshu:~$'
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isAiLoading]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    sound.playExecute();
    const cmdId = Math.random().toString(36).substring(2, 9);
    const timeStr = new Date().toLocaleTimeString();

    // Add to history list for up-arrow navigation
    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput('');

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let outputNode: React.ReactNode = null;

    if (mainCmd === 'clear') {
      setHistory([]);
      return;
    } else if (mainCmd === 'help') {
      outputNode = (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-bold">AVAILABLE TERMINAL COMMANDS:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div><span className="text-cyan-400 font-bold">help</span> - Display this help menu</div>
            <div><span className="text-cyan-400 font-bold">ls / ls -la</span> - List directory entries</div>
            <div><span className="text-cyan-400 font-bold">cat &lt;file&gt;</span> - View file content</div>
            <div><span className="text-cyan-400 font-bold">projects</span> - View microservices grid</div>
            <div><span className="text-cyan-400 font-bold">experience</span> - View career & role timeline</div>
            <div><span className="text-cyan-400 font-bold">resume</span> - Display resume YAML</div>
            <div><span className="text-cyan-400 font-bold">contact</span> - Open contact dispatch</div>
            <div><span className="text-cyan-400 font-bold">ssh</span> - Connect via SSH session</div>
            <div><span className="text-cyan-400 font-bold">ai &lt;query&gt;</span> - Ask Gemini AI Assistant</div>
            <div><span className="text-cyan-400 font-bold">uptime / ping</span> - System status check</div>
            <div><span className="text-cyan-400 font-bold">clear</span> - Clear output buffer</div>
          </div>
        </div>
      );
    } else if (mainCmd === 'ls') {
      outputNode = (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-emerald-400 font-mono text-xs">
          <div>drwxr-xr-x ~/home</div>
          <div>drwxr-xr-x ~/projects</div>
          <div>drwxr-xr-x ~/stack</div>
          <div>drwxr-xr-x ~/experience</div>
          <div>drwxr-xr-x ~/resume</div>
          <div>drwxr-xr-x ~/contact</div>
          <div className="text-cyan-400">-rw-r--r-- experience.json</div>
          <div className="text-cyan-400">-rw-r--r-- resume.yml</div>
          <div className="text-cyan-400">-rwxr-xr-x contact.sh</div>
        </div>
      );
    } else if (mainCmd === 'projects' || trimmed === 'cd ~/projects') {
      onNavigate('~/projects');
      outputNode = <span className="text-emerald-400">Navigated to ~/projects</span>;
    } else if (mainCmd === 'experience' || mainCmd === 'logs' || trimmed === 'cd ~/experience' || trimmed === 'cd ~/logs') {
      onNavigate('~/experience');
      outputNode = <span className="text-emerald-400">Navigated to ~/experience</span>;
    } else if (mainCmd === 'resume' || trimmed === 'cd ~/resume') {
      onNavigate('~/resume');
      outputNode = <span className="text-emerald-400">Navigated to ~/resume</span>;
    } else if (mainCmd === 'contact' || trimmed === 'cd ~/contact') {
      onNavigate('~/contact');
      outputNode = <span className="text-emerald-400">Navigated to ~/contact</span>;
    } else if (mainCmd === 'ssh') {
      onOpenSsh();
      outputNode = <span className="text-emerald-400">Opening SSH connection session to contact@dev.local...</span>;
    } else if (mainCmd === 'whoami') {
      outputNode = <span className="text-emerald-400">root@Himanshu [Himanshu Yadav - Full Stack Web Developer & Automation Specialist v2026.8.12]</span>;
    } else if (mainCmd === 'ping') {
      outputNode = (
        <div className="text-slate-300 space-y-0.5">
          <p>PING devsys.local (127.0.0.1) 56(84) bytes of data.</p>
          <p>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.24 ms</p>
          <p>64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.18 ms</p>
          <p className="text-emerald-400">--- devsys.local ping statistics --- 0% packet loss, min/avg/max = 0.18/0.21/0.24 ms</p>
        </div>
      );
    } else if (mainCmd === 'uptime') {
      outputNode = <span className="text-emerald-400">UPTIME: 99.999% | KERNEL: v2026.8.12 DEVSYS root@Himanshu | LOAD: 0.08, 0.04, 0.01</span>;
    } else if (mainCmd === 'cat') {
      if (args.includes('resume')) {
        onNavigate('~/resume');
        outputNode = <span className="text-emerald-400">Displaying ~/resume/resume.yml</span>;
      } else if (args.includes('log') || args.includes('experience')) {
        onNavigate('~/logs');
        outputNode = <span className="text-emerald-400">Displaying ~/logs/experience.log</span>;
      } else if (args.includes('stack')) {
        onNavigate('~/stack');
        outputNode = <span className="text-emerald-400">Displaying ~/stack/stack.json</span>;
      } else {
        outputNode = <span className="text-amber-400">cat: {args || 'file'}: No such file. Try 'cat resume.yml' or 'ls'</span>;
      }
    } else if (mainCmd === 'ai' || mainCmd === 'ask') {
      if (!args) {
        outputNode = <span className="text-amber-400">Usage: ai &lt;query&gt; (e.g., 'ai what is Himanshu's background with Kubernetes?')</span>;
      } else {
        setIsAiLoading(true);
        // Temporary placeholder entry
        const tempEntry: CommandLog = {
          id: cmdId,
          command: trimmed,
          output: (
            <div className="flex items-center space-x-2 text-cyan-400 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Querying GEMINI_AI Kernel...</span>
            </div>
          ),
          timestamp: timeStr
        };
        setHistory((prev) => [...prev, tempEntry]);

        try {
          const res = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: args })
          });
          const data = await res.json();
          setIsAiLoading(false);

          setHistory((prev) =>
            prev.map((item) =>
              item.id === cmdId
                ? {
                    ...item,
                    output: (
                      <div className="space-y-1 text-cyan-300 font-mono text-xs bg-cyan-950/20 p-2.5 rounded border border-cyan-800/40">
                        <div className="flex items-center space-x-1.5 text-cyan-400 font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>ROOT_AI_RESPONSE:</span>
                        </div>
                        <div className="whitespace-pre-wrap leading-relaxed">{data.reply}</div>
                      </div>
                    )
                  }
                : item
            )
          );
          return;
        } catch (err: any) {
          setIsAiLoading(false);
          setHistory((prev) =>
            prev.map((item) =>
              item.id === cmdId
                ? {
                    ...item,
                    output: <span className="text-rose-400">[ERROR] Failed to query AI endpoint: {err.message}</span>
                  }
                : item
            )
          );
          return;
        }
      }
    } else {
      outputNode = (
        <span className="text-rose-400 font-mono">
          zsh: command not found: {mainCmd}. Type <button onClick={() => setInput('help')} className="underline text-emerald-400">help</button> for available commands.
        </span>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: cmdId,
        command: trimmed,
        output: outputNode,
        timestamp: timeStr
      }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex < commandList.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandList[commandList.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandList[commandList.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="bg-[#060911] border border-slate-800 rounded-lg p-3 font-mono text-xs space-y-3 shadow-inner">
      {/* Executed Logs */}
      {history.length > 0 && (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center space-x-2 text-slate-400">
                <span className="text-emerald-400 font-bold">{promptUser}</span>
                <span className="text-slate-100 font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
              </div>
              <div className="pl-4 border-l border-slate-800/80">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Interactive Input Line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2 bg-[#090E1A] p-2 rounded border border-slate-800/80 focus-within:border-emerald-500/50 transition-colors">
        <span className="text-emerald-400 font-bold shrink-0">{promptUser}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command ('help', 'ai ask question', 'projects', 'ssh')..."
          className="flex-1 bg-transparent text-slate-100 focus:outline-none placeholder-slate-600 font-mono text-xs"
        />
        <button
          type="submit"
          className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded transition-colors"
          title="Execute Command"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
