import React, { useState } from 'react';
import { RAW_RESUME_YAML, RESUME_PARSED } from '../../data/portfolioData';
import { Download, Copy, Check, FileText, Code2, ExternalLink } from 'lucide-react';
import { sound } from '../../lib/sound';
import { Typewriter } from '../Typewriter';

export const ResumeView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeMode, setActiveMode] = useState<'YAML' | 'PREVIEW'>('YAML');

  const handleCopy = () => {
    sound.playKeypress();
    navigator.clipboard.writeText(RAW_RESUME_YAML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    sound.playExecute();
    // Generate text/markdown downloadable resume blob or open print view
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Himanshu Yadav - Resume</title>
            <style>
              body { font-family: monospace; padding: 40px; background: #0B0F19; color: #E2E8F0; }
              h1 { color: #10B981; margin-bottom: 5px; }
              h2 { color: #38BDF8; border-bottom: 1px solid #334155; padding-bottom: 5px; margin-top: 20px; }
              ul { line-height: 1.6; }
              .highlight { color: #A7F3D0; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>${RESUME_PARSED.profile.name}</h1>
            <p><strong>Location:</strong> ${RESUME_PARSED.profile.location} | <strong>Status:</strong> ${RESUME_PARSED.profile.status}</p>
            <p>${RESUME_PARSED.profile.summary}</p>
            
            <h2>Skills</h2>
            <p><strong>Languages:</strong> ${RESUME_PARSED.skills.languages.join(', ')}</p>
            <p><strong>Infrastructure:</strong> ${RESUME_PARSED.skills.infrastructure.join(', ')}</p>
            <p><strong>Databases:</strong> ${RESUME_PARSED.skills.databases.join(', ')}</p>
            
            <h2>Experience</h2>
            ${RESUME_PARSED.experience
              .map(
                (exp) => `
              <div>
                <h3>${exp.role} @ ${exp.company} (${exp.duration})</h3>
                <ul>
                  ${exp.highlights.map((h) => `<li>${h}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
            
            <h2>Education</h2>
            <p>${RESUME_PARSED.education[0].degree} - ${RESUME_PARSED.education[0].institution} (${RESUME_PARSED.education[0].year})</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200">
      {/* Top Header Command matching Screenshot 3 */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span>root@devsys:~$</span>
          <Typewriter text="cat ~/resume.yml" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playKeypress();
              setActiveMode('YAML');
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded ${
              activeMode === 'YAML' ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-400'
            }`}
          >
            YAML
          </button>
          <button
            onClick={() => {
              sound.playKeypress();
              setActiveMode('PREVIEW');
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded ${
              activeMode === 'PREVIEW' ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-slate-400'
            }`}
          >
            PREVIEW
          </button>
        </div>
      </div>

      {/* Main Resume Box matching Screenshot 3 */}
      <div className="bg-[#050810] border border-slate-800 rounded-lg p-5 font-mono shadow-2xl space-y-4">
        {/* Title Bar with curl download button matching Screenshot 3 */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-slate-300 font-bold">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>resume.yml</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-copy-yaml"
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-xs flex items-center space-x-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY'}</span>
            </button>

            {/* Curl download button matching Screenshot 3 */}
            <button
              id="btn-curl-resume"
              onClick={handleDownloadPdf}
              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-xs font-bold flex items-center space-x-2 transition-all shadow-[0_0_10px_rgba(16,185,129,0.1)]"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>$ curl -O resume.pdf</span>
            </button>
          </div>
        </div>

        {/* YAML Syntax Highlighted Content matching Screenshot 3 */}
        {activeMode === 'YAML' ? (
          <div className="bg-[#03050A] p-4 rounded border border-slate-800/80 text-xs font-mono leading-relaxed overflow-x-auto text-slate-300">
            <div className="text-slate-600 mb-2">---</div>
            <div className="space-y-1">
              <div><span className="text-cyan-400 font-bold">profile:</span></div>
              <div className="pl-4"><span className="text-slate-400">name:</span> <span className="text-amber-300">"{RESUME_PARSED.profile.name}"</span></div>
              <div className="pl-4"><span className="text-slate-400">title:</span> <span className="text-amber-300">"System Architect // Full Stack & Infrastructure Engineer"</span></div>
              <div className="pl-4"><span className="text-slate-400">status:</span> <span className="text-emerald-400 font-bold">"{RESUME_PARSED.profile.status}"</span></div>
              <div className="pl-4"><span className="text-slate-400">location:</span> <span className="text-amber-300">"{RESUME_PARSED.profile.location}"</span></div>
              <div className="pl-4"><span className="text-slate-400">summary:</span> <span className="text-slate-500">|</span></div>
              <div className="pl-8 text-slate-300 font-italic">{RESUME_PARSED.profile.summary}</div>

              <div className="pt-2"><span className="text-cyan-400 font-bold">skills:</span></div>
              <div className="pl-4"><span className="text-slate-400">languages:</span> <span className="text-emerald-300">["Rust", "Go", "TypeScript", "Python"]</span></div>
              <div className="pl-4"><span className="text-slate-400">infrastructure:</span> <span className="text-emerald-300">["Kubernetes", "Terraform", "AWS"]</span></div>
              <div className="pl-4"><span className="text-slate-400">databases:</span> <span className="text-emerald-300">["PostgreSQL", "Redis", "Kafka", "ClickHouse"]</span></div>

              <div className="pt-2"><span className="text-cyan-400 font-bold">metrics:</span></div>
              <div className="pl-4"><span className="text-slate-400">uptime:</span> <span className="text-emerald-400 font-bold">99.999%</span></div>
              <div className="pl-4"><span className="text-slate-400">loc_written:</span> <span className="text-emerald-400 font-bold">420k+</span></div>

              <div className="pt-2"><span className="text-cyan-400 font-bold">experience:</span></div>
              {RESUME_PARSED.experience.map((exp, idx) => (
                <div key={idx} className="pl-4 space-y-0.5 pt-1">
                  <div><span className="text-slate-500">-</span> <span className="text-slate-400">role:</span> <span className="text-amber-300">"{exp.role}"</span></div>
                  <div className="pl-4"><span className="text-slate-400">company:</span> <span className="text-amber-300">"{exp.company}"</span></div>
                  <div className="pl-4"><span className="text-slate-400">duration:</span> <span className="text-amber-300">"{exp.duration}"</span></div>
                  <div className="pl-4"><span className="text-slate-400">highlights:</span></div>
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="pl-8"><span className="text-slate-500">-</span> <span className="text-slate-300">"{h}"</span></div>
                  ))}
                </div>
              ))}

              <div className="pt-2"><span className="text-cyan-400 font-bold">education:</span></div>
              <div className="pl-4"><span className="text-slate-400">degree:</span> <span className="text-amber-300">"{RESUME_PARSED.education[0].degree}"</span></div>
              <div className="pl-4"><span className="text-slate-400">institution:</span> <span className="text-amber-300">"{RESUME_PARSED.education[0].institution}"</span></div>
              <div className="pl-4"><span className="text-slate-400">year:</span> <span className="text-amber-300">"{RESUME_PARSED.education[0].year}"</span></div>
            </div>
            <div className="text-slate-600 mt-2">---</div>
          </div>
        ) : (
          <div className="space-y-6 text-slate-200">
            <div className="border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-bold text-emerald-400">{RESUME_PARSED.profile.name}</h1>
              <p className="text-slate-400 mt-1">{RESUME_PARSED.profile.summary}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Experience</h2>
              <div className="space-y-4">
                {RESUME_PARSED.experience.map((exp, idx) => (
                  <div key={idx} className="bg-[#080C16] border border-slate-800 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between font-bold text-emerald-400">
                      <span>{exp.role} @ {exp.company}</span>
                      <span className="text-slate-400 text-xs">{exp.duration}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
