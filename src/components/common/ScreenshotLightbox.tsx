import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ScreenshotLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
  src?: string;
  title: string;
  caption?: string;
  badge?: string;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  isOpen,
  onClose,
  imageSrc,
  src,
  title,
  caption,
  badge = 'Task Pilot Real App UI',
}) => {
  const actualSrc = imageSrc || src || '';
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              {badge}
            </span>
            <h3 className="text-white font-bold text-sm sm:text-base truncate">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close image modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable / Zoomable Image view */}
        <div className="p-3 sm:p-5 overflow-auto flex-1 flex items-center justify-center bg-slate-950/50">
          <img
            src={actualSrc}
            alt={title}
            className="rounded-lg shadow-2xl max-w-full max-h-[75vh] object-contain border border-slate-800"
          />
        </div>

        {/* Caption bar */}
        {caption && (
          <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>{caption}</span>
            <span className="text-slate-500 hidden sm:inline">Press Esc to exit full screen</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenshotLightbox;
