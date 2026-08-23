import React, { useState } from 'react';
import { NavPath, CertificateItem, CertCategory } from '../../types';
import { CERTIFICATES_DATA } from '../../data/educationCertData';
import { parseDriveLink } from '../../lib/driveUtils';
import { 
  Award, 
  Search, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Filter,
  Terminal,
  FolderArchive
} from 'lucide-react';
import { Typewriter } from '../Typewriter';
import { sound } from '../../lib/sound';

interface CertViewProps {
  onNavigate: (path: NavPath) => void;
  onOpenSsh: () => void;
  onOpenDriveModal: (item: CertificateItem, type: 'pdf' | 'image') => void;
  searchQuery?: string;
}

export const CertView: React.FC<CertViewProps> = ({
  onNavigate,
  onOpenSsh,
  onOpenDriveModal,
  searchQuery = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CertCategory | 'ALL'>('ALL');
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = searchQuery || localSearch;

  const categories: { id: CertCategory | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'ALL CREDENTIALS' },
    { id: 'BACKEND_NODEJS', label: 'BACKEND NODE.JS' },
    { id: 'BACKEND_JAVA', label: 'BACKEND JAVA' },
    { id: 'CLOUD_DEVOPS', label: 'CLOUD & DEVOPS' },
    { id: 'AI_AUTOMATION', label: 'AI & AUTOMATION' },
    { id: 'FULL_STACK', label: 'FULL STACK' },
  ];

  const getCategoryBadgeLabel = (cat: CertCategory) => {
    switch (cat) {
      case 'BACKEND_NODEJS':
        return 'BACKEND NODE.JS';
      case 'BACKEND_JAVA':
        return 'BACKEND JAVA';
      case 'CLOUD_DEVOPS':
        return 'CLOUD & DEVOPS';
      case 'AI_AUTOMATION':
        return 'AI & AUTOMATION';
      case 'FULL_STACK':
        return 'FULL STACK';
      default:
        return (cat as string).replace('_', ' ');
    }
  };

  const filteredCerts = CERTIFICATES_DATA.filter((cert) => {
    // Category match
    const matchesCategory = selectedCategory === 'ALL' || cert.category === selectedCategory;
    
    // Search match
    const query = activeSearch.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery = 
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      cert.description.toLowerCase().includes(query) ||
      cert.skills.some((s) => s.toLowerCase().includes(query)) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 font-mono text-xs text-slate-200 animate-fadeIn">
      {/* Minimal Top Header Command */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
          <span className="hidden sm:inline">root@iamhimanshu108:~$</span>
          <span className="sm:hidden">~$</span>
          <Typewriter text="cat ~/certificates.json" className="text-slate-100 font-semibold" speed={35} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            [ {CERTIFICATES_DATA.length} VERIFIED ]
          </span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-1.5 pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playKeypress();
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-all border ${
              selectedCategory === cat.id
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#060A14] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      {filteredCerts.length === 0 ? (
        <div className="bg-[#070C18] border border-slate-800 rounded-xl p-8 text-center space-y-3">
          <Award className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-400 font-bold">No certificates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCerts.map((cert) => {
            const parsedPdf = parseDriveLink(cert.drivePdfUrl);
            const parsedImg = parseDriveLink(cert.driveImageUrl);

            return (
              <div
                key={cert.id}
                className="bg-[#070C18] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Card Header Row */}
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug pr-2">
                      {cert.title}
                    </h2>

                    <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold rounded shrink-0">
                      {getCategoryBadgeLabel(cert.category)}
                    </span>
                  </div>

                  {/* Issuer & Date Row */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-[#040710] p-2.5 rounded-lg border border-slate-800/80">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      {cert.issuer}
                    </span>
                    <span className="text-slate-600">//</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {cert.issueDate}
                    </span>
                    {cert.credentialId && (
                      <>
                        <span className="text-slate-600">//</span>
                        <span className="text-slate-400 font-mono text-[11px] truncate max-w-[140px]" title={cert.credentialId}>
                          ID: {cert.credentialId}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skill Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">SKILLS VERIFIED:</span>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-[#040814] text-slate-300 border border-slate-800 rounded text-[10px] font-bold hover:border-emerald-500/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button (Single Clean Preview Trigger) */}
                {(cert.drivePdfUrl || cert.driveImageUrl) && (
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end text-xs">
                    <button
                      onClick={() => {
                        sound.playKeypress();
                        onOpenDriveModal(cert, cert.drivePdfUrl ? 'pdf' : 'image');
                      }}
                      className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-all flex items-center space-x-1.5 shadow-sm text-xs"
                      title="Preview Certificate Document"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
