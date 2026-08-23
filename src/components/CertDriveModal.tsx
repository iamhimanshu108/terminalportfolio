import React, { useState, useEffect } from 'react';
import { CertificateItem, EducationItem } from '../types';
import { parseDriveLink } from '../lib/driveUtils';
import { sound } from '../lib/sound';
import { 
  X, 
  ExternalLink,
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Award,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface CertDriveModalProps {
  item: CertificateItem | EducationItem | null;
  initialType?: 'pdf' | 'image';
  onClose: () => void;
}

export const CertDriveModal: React.FC<CertDriveModalProps> = ({
  item,
  initialType = 'pdf',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'image'>(initialType);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const isCert = 'issuer' in item;
  const title = isCert ? (item as CertificateItem).title : (item as EducationItem).degree;
  const subtitle = isCert 
    ? `Issued by ${(item as CertificateItem).issuer} // ${(item as CertificateItem).issueDate}` 
    : `${(item as EducationItem).institution} // ${(item as EducationItem).year}`;

  const pdfUrl = item.drivePdfUrl;
  const imageUrl = item.driveImageUrl;

  const parsedPdf = parseDriveLink(pdfUrl);
  const parsedImage = parseDriveLink(imageUrl);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fadeIn font-mono">
      <div 
        className={`bg-[#060A14] border border-emerald-500/40 rounded-xl w-full transition-all duration-300 flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.18)] overflow-hidden ${
          isMaximized 
            ? 'max-w-none h-full m-0 rounded-none border-0' 
            : 'max-w-5xl h-[88vh] max-h-[880px]'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#040711] px-4 py-2.5 border-b border-slate-800/90 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center space-x-2.5 min-w-0 pr-3">
            <div className="flex items-center space-x-1.5">
              <button 
                onClick={() => { sound.playKeypress(); onClose(); }}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer block"
                title="Close (Esc)"
              />
              <button
                onClick={() => { sound.playKeypress(); setIsMaximized(false); }}
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer block"
                title="Minimize / Restore"
              />
              <button 
                onClick={() => { sound.playKeypress(); setIsMaximized(!isMaximized); }}
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer block" 
                title="Toggle Maximize"
              />
            </div>

            <div className="h-4 w-[1px] bg-slate-800 mx-1" />

            <span className="text-slate-200 text-xs font-bold truncate flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-emerald-400">DRIVE_VIEWER</span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-100 truncate">{title}</span>
            </span>
          </div>
        </div>

        {/* Info Subhead */}
        <div className="bg-[#050813] px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center space-x-2 truncate">
            <span className="text-slate-300 font-semibold truncate">{subtitle}</span>
          </div>
        </div>

        {/* Viewport Box (Zero Scrollbar Overflow) */}
        <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
          {activeTab === 'pdf' ? (
            parsedPdf.embedUrl ? (
              <iframe
                src={parsedPdf.embedUrl}
                title={`${title} PDF Preview`}
                className="absolute inset-0 w-full h-full border-0 block bg-black"
                allow="autoplay"
              />
            ) : (
              <div className="text-center p-8 space-y-3 font-mono">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">PDF Google Drive Link not configured or set to private.</p>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
                  >
                    Open Drive PDF directly <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )
          ) : (
            parsedImage.imageUrl ? (
              <div className="w-full h-full flex items-center justify-center p-4 overflow-auto">
                <img
                  src={parsedImage.imageUrl}
                  alt={title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl border border-slate-800/80"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="text-center p-8 space-y-3 font-mono">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">No image preview configured for this credential.</p>
              </div>
            )
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
              onClick={() => { sound.playKeypress(); onClose(); }}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-xs transition-colors"
            >
              Close Terminal Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
