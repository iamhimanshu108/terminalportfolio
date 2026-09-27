import React from 'react';
import { ArrowRight, Code2, Heart, Target } from 'lucide-react';
import { NavPath } from '../../types';
import { EducationView } from './EducationView';
import { CertView } from './CertView';
import { NeuralBackground } from '../NeuralNetworkBackground';

interface AboutViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onOpenDriveModal: (item: any, type: 'pdf' | 'image') => void;
  searchQuery?: string;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenSsh, onOpenDriveModal, searchQuery = '' }) => (
  <div className="premium-view about-view relative space-y-6 font-mono text-xs text-slate-200 animate-fadeIn">
    <NeuralBackground nodeCount={22} connectionDistance={130} speed={0.1} particleCount={2} className="opacity-15" />
    <section className="space-y-4 rounded-lg border border-slate-800 bg-[#0A0E17] p-5 shadow-lg">
      <div className="space-y-1">
        <p className="font-bold text-emerald-400">~/about // profile</p>
        <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl">WHOAMI</h1>
        <p className="max-w-3xl leading-relaxed text-slate-300">I’m Himanshu Yadav — a software developer focused on backend engineering, MERN products, Python/FastAPI, and AI-powered systems.</p>
      </div>
      <div className="grid gap-3 border-t border-slate-800/80 pt-4 md:grid-cols-3">
        <div className="rounded border border-slate-800 bg-[#050810] p-3"><Target className="mb-2 h-4 w-4 text-emerald-400" /><p className="font-bold text-slate-100">Think in systems</p><p className="mt-1 leading-relaxed text-slate-400">Understand boundaries, data, and failure modes before implementation.</p></div>
        <div className="rounded border border-slate-800 bg-[#050810] p-3"><Code2 className="mb-2 h-4 w-4 text-cyan-400" /><p className="font-bold text-slate-100">Build for clarity</p><p className="mt-1 leading-relaxed text-slate-400">Prefer maintainable code, readable APIs, and useful tests.</p></div>
        <div className="rounded border border-slate-800 bg-[#050810] p-3"><Heart className="mb-2 h-4 w-4 text-amber-400" /><p className="font-bold text-slate-100">Stay curious</p><p className="mt-1 leading-relaxed text-slate-400">Learn by shipping, measuring results, and iterating.</p></div>
      </div>
      <div className="space-y-2 border-t border-slate-800/80 pt-4 leading-relaxed text-slate-300">
        <p>&gt; I enjoy turning complex problems into reliable, scalable software.</p>
        <p>&gt; My work spans REST APIs, microservices, AI applications, and automated workflows.</p>
        <p>&gt; Current stack: MERN, Python, FastAPI, Next.js, PostgreSQL, MongoDB, Docker, Gen AI, and RAG.</p>
      </div>
      <button onClick={() => onNavigate('~/projects')} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"><span>next / selected work</span><ArrowRight className="h-3.5 w-3.5" /></button>
    </section>
    <section className="space-y-3"><div className="border-b border-slate-800 pb-2 font-bold text-slate-200">$ cat education.txt</div><EducationView onNavigate={onNavigate} onOpenSsh={onOpenSsh} onOpenDriveModal={onOpenDriveModal} /></section>
    <section className="space-y-3"><div className="border-b border-slate-800 pb-2 font-bold text-slate-200">$ cat certificates.txt</div><CertView onNavigate={onNavigate} onOpenSsh={onOpenSsh} onOpenDriveModal={onOpenDriveModal} searchQuery={searchQuery} /></section>
  </div>
);
