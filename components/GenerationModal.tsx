
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface GenerationModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
}

export const GenerationModal: React.FC<GenerationModalProps> = ({ 
    isOpen, 
    title = "Sedang Memproses...", 
    description = "AI sedang menganalisis komposisi, mengatur pencahayaan, dan merender hasil terbaik untuk Anda." 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#020617] rounded-[2rem] p-6 sm:p-8 max-w-sm w-full shadow-[0_0_40px_rgba(0,212,255,0.2)] border border-primary-500/30 flex flex-col items-center text-center relative overflow-hidden transform animate-slide-up">
        
        {/* Animated Top Border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-fuchsia-500 to-gold-500 animate-[shimmer_2s_infinite]"></div>
        
        {/* Icon Animation */}
        <div className="w-24 h-24 bg-primary-900/20 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary-500/30 border-t-primary-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-4 border-fuchsia-500/20 border-b-fuchsia-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            <SparklesIcon className="w-10 h-10 text-primary-400 animate-pulse" />
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight neon-text">
            {title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {description}
        </p>

        {/* Bouncing Dots */}
        <div className="flex gap-2 justify-center mb-2">
            <span className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2.5 h-2.5 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
        
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-4">Jangan Tutup Halaman Ini</p>
      </div>
    </div>
  );
};
