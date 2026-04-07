
import React from 'react';

const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface UniversalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const UniversalModal: React.FC<UniversalModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[100] flex justify-center items-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-[#020617] rounded-2xl shadow-[0_0_30px_rgba(0,212,255,0.15)] max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col transform animate-slide-up border border-primary-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-primary-500/20 flex justify-between items-center bg-white/5 backdrop-blur-md">
          <h2 className="text-lg font-display font-bold text-white neon-text">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary-400 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            {children}
        </div>
      </div>
    </div>
  );
};

export default UniversalModal;
