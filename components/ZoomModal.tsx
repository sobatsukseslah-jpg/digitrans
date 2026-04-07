import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl z-[99999] flex justify-center items-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="relative max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
      >
        <img 
          src={imageUrl} 
          alt="Zoomed product view" 
          className="object-contain max-w-[95vw] max-h-[95vh] rounded-2xl shadow-[0_0_50px_rgba(0,212,255,0.2)] border border-primary-500/30"
        />
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }} 
        className="fixed top-6 right-6 md:top-8 md:right-8 text-white hover:text-primary-400 z-[100000] transition-all bg-black/60 hover:bg-black p-3 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/20 hover:border-primary-400/50 hover:scale-110 active:scale-95"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>,
    document.body
  );
};
