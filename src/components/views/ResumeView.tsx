import React, { useState, useEffect } from 'react';
import { SYSTEM_INFO } from '../../data/portfolioData';
import { RAW_RESUME_YAML, RESUME_PARSED } from '../../data/resumeData';
import { parseDriveLink } from '../../lib/driveUtils';
import { Download, FileText, Eye, ShieldCheck, Award } from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';
import resumePdfFallback from '../../assets/Himanshu_Resume-CbhZoejc.pdf';

interface ResumeViewProps {
  onOpenSsh: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onOpenSsh: _onOpenSsh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const resumeDriveUrl = RESUME_PARSED.drivePdfUrl || 'https://drive.google.com/file/d/1KOeUEkU3p2jdlHc8vNT_i3xOJifZ_dnT/view?usp=sharing';
  const parsedPdf = parseDriveLink(resumeDriveUrl);

  const downloadUrl = parsedPdf.downloadUrl || parsedPdf.viewUrl || resumePdfFallback;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleDownload = () => {
    sound.playExecute();
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = 'Himanshu_Yadav_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenPreview = () => {
    sound.playKeypress();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200 animate-fadeIn">
      {/* Main Resume Box */}
      <div className="bg-[#050810] border border-slate-800 rounded-xl p-4 sm:p-5 font-mono shadow-2xl space-y-4">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
          <div className="flex items-center space-x-2 text-slate-300 font-bold">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>resume.yml</span>
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline ml-2">
              UTF-8 // YAML_SOURCE
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenPreview}
              className="px-3 py-1 text-xs font-bold rounded-lg transition-all border flex items-center gap-1.5 bg-[#0B1120] text-emerald-400 border-emerald-500/40 hover:bg-emerald-500 hover:text-black shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              title="Open Live PDF Preview in macOS Box"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg text-xs flex items-center space-x-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              title="Download Resume PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </button>
          </div>
        </div>

        {/* YAML Syntax Highlighted Content */}
        <div className="bg-[#03050A] p-4 rounded border border-slate-800/80 text-xs font-mono leading-relaxed overflow-x-auto text-slate-300">
          <div className="text-slate-600 mb-2">---</div>
          <div className="space-y-1">
            <div><span className="text-cyan-400 font-bold">profile:</span></div>
            <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-emerald-400">"{RESUME_PARSED.profile.name}"</span></div>
            <div className="pl-4"><span className="text-slate-400">role:</span> <span className="text-emerald-400">"{SYSTEM_INFO.title}"</span></div>
            <div className="pl-4"><span className="text-slate-400">location:</span> <span className="text-emerald-400">"{RESUME_PARSED.profile.location}"</span></div>
            <div className="pl-4"><span className="text-slate-400">status:</span> <span className="text-emerald-400">"{RESUME_PARSED.profile.status}"</span></div>
            <div className="pl-4"><span className="text-slate-400">drive_url:</span> <a href={parsedPdf.viewUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{parsedPdf.viewUrl}</a></div>
            <div className="pl-4"><span className="text-slate-400">summary:</span> <span className="text-slate-300">"{RESUME_PARSED.profile.summary}"</span></div>

            <div className="pt-2"><span className="text-cyan-400 font-bold">skills:</span></div>
            <div className="pl-4"><span className="text-slate-400">languages:</span> <span className="text-slate-300">{JSON.stringify(RESUME_PARSED.skills.languages)}</span></div>
            <div className="pl-4"><span className="text-slate-400">infrastructure:</span> <span className="text-slate-300">{JSON.stringify(RESUME_PARSED.skills.infrastructure)}</span></div>
            <div className="pl-4"><span className="text-slate-400">databases:</span> <span className="text-slate-300">{JSON.stringify(RESUME_PARSED.skills.databases)}</span></div>

            <div className="pt-2"><span className="text-cyan-400 font-bold">experience:</span></div>
            {RESUME_PARSED.experience.map((exp, idx) => (
              <div key={idx} className="pl-4 border-l border-slate-800/80 my-2 py-1">
                <div><span className="text-slate-400">- company:</span> <span className="text-emerald-400">"{exp.company}"</span></div>
                <div className="pl-2"><span className="text-slate-400">role:</span> <span className="text-emerald-400">"{exp.role}"</span></div>
                <div className="pl-2"><span className="text-slate-400">duration:</span> <span className="text-emerald-400">"{exp.duration}"</span></div>
                <div className="pl-2"><span className="text-slate-400">type:</span> <span className="text-slate-300">"{exp.type}"</span></div>
                <div className="pl-2">
                  <span className="text-slate-400">bullets:</span>
                  {(exp.highlights || exp.bullets || []).map((bullet: string, bIdx: number) => (
                    <div key={bIdx} className="pl-4 text-slate-300">- "{bullet}"</div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-2"><span className="text-cyan-400 font-bold">education:</span></div>
            {RESUME_PARSED.education.map((edu, idx) => (
              <div key={idx} className="pl-4 my-1">
                <div><span className="text-slate-400">- degree:</span> <span className="text-emerald-400">"{edu.degree}"</span></div>
                <div><span className="text-slate-400">  institution:</span> <span className="text-emerald-400">"{edu.institution}"</span></div>
                <div><span className="text-slate-400">  year:</span> <span className="text-emerald-400">"{edu.year}"</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* macOS Style Live PDF Preview Modal Box */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn font-mono">
          <div
            className={`bg-[#060A14] border border-emerald-500/40 rounded-xl w-full transition-all duration-300 flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.18)] overflow-hidden ${
              isMaximized
                ? 'max-w-none h-full m-0 rounded-none border-0'
                : 'max-w-5xl h-[88vh] max-h-[880px]'
            }`}
          >
            {/* Terminal Header Bar with macOS traffic lights */}
            <div className="bg-[#040711] px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center space-x-2.5 min-w-0 pr-3">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => {
                      sound.playKeypress();
                      setIsModalOpen(false);
                    }}
                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer block"
                    title="Close (Esc)"
                  />
                  <button
                    onClick={() => {
                      sound.playKeypress();
                      setIsMaximized(false);
                    }}
                    className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer block"
                    title="Minimize / Restore"
                  />
                  <button
                    onClick={() => {
                      sound.playKeypress();
                      setIsMaximized(!isMaximized);
                    }}
                    className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer block"
                    title="Toggle Maximize"
                  />
                </div>

                <div className="h-4 w-[1px] bg-slate-800 mx-1" />

                <span className="text-slate-200 text-xs font-bold truncate flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-400">DRIVE_VIEWER</span>
                  <span className="text-slate-600">//</span>
                  <span className="text-slate-100 truncate">Himanshu_Yadav_Resume.pdf</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded text-xs transition-all flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Info Subhead */}
            <div className="bg-[#050813] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <div className="flex items-center space-x-2 truncate">
                <span className="text-slate-300 font-semibold truncate">
                  {RESUME_PARSED.profile.name} // {SYSTEM_INFO.title}
                </span>
              </div>
            </div>

            {/* Viewport Box (Zero Scrollbar Overflow) */}
            <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
              {parsedPdf.embedUrl ? (
                <iframe
                  src={parsedPdf.embedUrl}
                  title="Himanshu Yadav Resume PDF"
                  className="absolute inset-0 w-full h-full border-0 block bg-black"
                  allow="autoplay"
                />
              ) : (
                <div className="text-center p-8 space-y-3 font-mono">
                  <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm">Resume PDF link not configured.</p>
                </div>
              )}
            </div>

            {/* Status Footer */}
            <div className="bg-[#040711] px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0 select-none">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">AUTHENTICATED DRIVE CREDENTIAL VERIFIED</span>
                <span className="sm:hidden">DRIVE VERIFIED</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    sound.playKeypress();
                    setIsModalOpen(false);
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-xs transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
