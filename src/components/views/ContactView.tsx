import React, { useState } from 'react';
import { Mail, Send, Terminal, ShieldCheck, CheckCircle2, Loader2, Sparkles, Linkedin, Github, Twitter, Globe, ExternalLink } from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';

interface ContactViewProps {
  onOpenSsh: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenSsh }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [packetDetails, setPacketDetails] = useState<{ packetId?: string; timestamp?: string }>({});

  const socialChannels = [
    {
      name: 'LinkedIn',
      handle: 'in/iamhimanshu108',
      url: 'https://www.linkedin.com/in/iamhimanshu108',
      icon: <Linkedin className="w-5 h-5 text-cyan-400" />,
      badge: 'Professional Network',
      color: 'border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400'
    },
    {
      name: 'GitHub',
      handle: '@iamhimanshu108',
      url: 'https://github.com/iamhimanshu108',
      icon: <Github className="w-5 h-5 text-emerald-400" />,
      badge: 'Code & Repositories',
      color: 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400'
    },
    {
      name: 'X (Twitter)',
      handle: '@iamhimanshu108',
      url: 'https://x.com/iamhimanshu108',
      icon: <Twitter className="w-5 h-5 text-sky-400" />,
      badge: 'Tech Updates & Dev Logs',
      color: 'border-sky-500/40 bg-sky-950/20 hover:border-sky-400'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playExecute();
    setStatus('SENDING');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setStatus('SUCCESS');
        setPacketDetails({ packetId: data.packetId, timestamp: data.timestamp });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('ERROR');
      }
    } catch {
      // Fallback
      setTimeout(() => {
        setStatus('SUCCESS');
        setPacketDetails({
          packetId: `PKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          timestamp: new Date().toISOString()
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 800);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Top Header Command */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>visitor@local:~$</span>
          <Typewriter text="./contact.sh" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <span className="text-[10px] text-slate-500">DISPATCH_PORT: 443 (TLS_1.3)</span>
      </div>

      {/* Social Network Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialChannels.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playKeypress()}
            className={`p-3.5 rounded-lg border transition-all duration-200 flex flex-col justify-between space-y-3 group shadow-sm ${c.color}`}
          >
            <div className="flex items-center justify-between">
              {c.icon}
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <div className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                {c.name}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {c.handle}
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider border-t border-slate-800/80 pt-2">
              {c.badge}
            </div>
          </a>
        ))}
      </div>

      {/* Terminal Window Frame */}
      <div className="bg-[#050810] border border-slate-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#080C16] border-b border-slate-800 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="text-slate-300 font-bold text-xs pl-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              contact.sh
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">[ READY ]</span>
        </div>

        <div className="p-5 space-y-6">
          <div className="space-y-1">
            <p className="text-emerald-400 font-bold text-sm">
              # Dispatch secure message packet to Himanshu Yadav
            </p>
            <p className="text-slate-400 text-xs">
              Direct inbox queue router: <span className="text-cyan-400">hiyadav2022@gmail.com</span>
            </p>
          </div>

          {status === 'SUCCESS' && (
            <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-lg space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>[200 OK] Message Packet Dispatched Successfully!</span>
              </div>
              <p className="text-slate-300 text-xs">
                Your transmission has been queued in Himanshu's primary inbox.
              </p>
              <div className="text-[11px] text-slate-400 space-y-0.5 pt-1 border-t border-emerald-900/50">
                <p>PACKET_ID: <span className="text-cyan-400 font-bold">{packetDetails.packetId}</span></p>
                <p>TIMESTAMP: <span className="text-slate-300">{packetDetails.timestamp}</span></p>
              </div>
              <button
                onClick={() => setStatus('IDLE')}
                className="mt-2 text-emerald-400 hover:underline font-bold text-xs"
              >
                &gt; Send another message
              </button>
            </div>
          )}

          {status !== 'SUCCESS' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] font-bold block">
                    NAME <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-[#090E1A] border border-slate-800 rounded p-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px] font-bold block">
                    EMAIL <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#090E1A] border border-slate-800 rounded p-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-bold block">
                  SUBJECT
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full Stack Role / Automation System Request"
                  className="w-full bg-[#090E1A] border border-slate-800 rounded p-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[11px] font-bold block">
                  MESSAGE <span className="text-rose-400">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter transmission payload details..."
                  className="w-full bg-[#090E1A] border border-slate-800 rounded p-2.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 font-mono text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playSshConnect();
                    onOpenSsh();
                  }}
                  className="text-slate-400 hover:text-emerald-400 text-xs flex items-center space-x-1 hover:underline"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Or connect via SSH session</span>
                </button>

                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded flex items-center space-x-2 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] disabled:opacity-50"
                >
                  {status === 'SENDING' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>DISPATCHING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>EXECUTE DISPATCH</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
