import React, { useState } from 'react';
import { CertificateItem, EducationItem } from '../types';
import { parseDriveLink } from '../lib/driveUtils';
import { sound } from '../lib/sound';
import { 
  X, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Calendar, 
  Award,
  Maximize2
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
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const isCert = 'issuer' in item;
  const title = isCert ? (item as CertificateItem).title : (item as EducationItem).degree;
  const subtitle = isCert 
    ? `Issued by ${(item as CertificateItem).issuer} // ${ (item as CertificateItem).issueDate }` 
    : `${(item as EducationItem).institution} // ${(item as EducationItem).year}`;

  const pdfUrl = item.drivePdfUrl;
  const imageUrl = item.driveImageUrl;

  const parsedPdf = parseDriveLink(pdfUrl);
  const parsedImage = parseDriveLink(imageUrl);

  const activeDriveObj = activeTab === 'pdf' ? parsedPdf : parsedImage;

  const handleCopyLink = () => {
    sound.playKeypress();
    const urlToCopy = activeDriveObj.viewUrl || pdfUrl || imageUrl || window.location.href;
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 z-50 animate-fadeIn font-mono">
      <div className="bg-[#0A0F1D] border border-emerald-500/40 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_35px_rgba(16,185,129,0.2)] overflow-hidden">
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#050811] px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 min-w-0 pr-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-slate-400 text-xs truncate pl-2 font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              DRIVE_VIEWER // {title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Switcher Tabs (PDF vs IMAGE) */}
            <div className="bg-[#0F172A] p-0.5 rounded-lg border border-slate-700 flex items-center">
              {pdfUrl && (
                <button
                  onClick={() => {
                    sound.playKeypress();
                    setActiveTab('pdf');
                  }}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeTab === 'pdf'
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF Doc</span>
                </button>
              )}
              {imageUrl && (
                <button
                  onClick={() => {
                    sound.playKeypress();
                    setActiveTab('image');
                  }}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeTab === 'image'
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image Preview</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Info Subhead */}
        <div className="bg-[#070B14] px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 shrink-0">
          <div>
            <span className="text-emerald-400 font-bold">{title}</span>
            <span className="text-slate-600 mx-2">|</span>
            <span className="text-slate-300">{subtitle}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={handleCopyLink}
              className="flex items-center space-x-1 text-slate-400 hover:text-emerald-400 transition-colors"
              title="Copy Drive Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'Copy Drive Link'}</span>
            </button>

            {activeDriveObj.viewUrl && (
              <a
                href={activeDriveObj.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors"
              >
                <span>Open in Drive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {activeDriveObj.downloadUrl && (
              <a
                href={activeDriveObj.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 bg-[#04060C] p-3 sm:p-4 overflow-y-auto flex flex-col items-center justify-center min-h-[350px]">
          {activeTab === 'pdf' ? (
            parsedPdf.embedUrl ? (
              <div className="w-full h-full min-h-[450px] rounded-lg overflow-hidden border border-slate-800 relative bg-black">
                <iframe
                  src={parsedPdf.embedUrl}
                  title={`${title} PDF Preview`}
                  className="w-full h-full min-h-[450px] border-0"
                  allow="autoplay"
                />
              </div>
            ) : (
              <div className="text-center p-8 space-y-3">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400">PDF Google Drive Link not configured or set to private.</p>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg"
                  >
                    Open Drive PDF directly <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )
          ) : (
            parsedImage.imageUrl ? (
              <div className="max-w-full max-h-[500px] flex items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-black p-2 relative group">
                <img
                  src={parsedImage.imageUrl}
                  alt={title}
                  className="max-h-[460px] object-contain rounded shadow-2xl"
                  onError={(e) => {
                    // Fallback to standard view link if direct thumbnail fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="text-center p-8 space-y-3">
                <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400">No Image preview available.</p>
              </div>
            )
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#050811] px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AUTHENTICATED DRIVE CREDENTIAL VERIFIED</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-xs transition-colors"
          >
            Close Terminal Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
