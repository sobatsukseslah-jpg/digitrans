
import React from 'react';

interface FeatureHeaderProps {
  title: string;
  description: string;
  tutorialLink?: string;
}

export const FeatureHeader: React.FC<FeatureHeaderProps> = ({ title, description, tutorialLink }) => {
  return (
    <div className="relative mb-8 rounded-[2rem] p-8 md:p-10 overflow-hidden glass-panel neon-border animate-fade-in group">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[60px] pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mb-3 neon-text">
                {title}
                </h1>
                {/* Gradient Line Accent */}
                <div className="h-1.5 w-16 bg-gradient-to-r from-primary-500 to-fuchsia-500 rounded-full mb-5 opacity-90 shadow-[0_0_10px_rgba(0,212,255,0.5)]"></div>
                
                <p className="text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed font-medium">
                {description}
                </p>
            </div>

            {tutorialLink && (
                <a 
                    href={tutorialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-primary-500/20 text-white rounded-2xl shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] group/btn transition-all duration-300 self-start mt-2 md:mt-0 flex-shrink-0 transform hover:-translate-y-1 active:scale-95 border border-primary-500/30 hover:border-primary-400"
                >
                    {/* Pulsing effect behind */}
                    <span className="absolute -inset-1 rounded-2xl bg-primary-500/20 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                    
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-primary-600 flex items-center justify-center group-hover/btn:scale-110 transition-transform shadow-[0_0_15px_rgba(217,70,239,0.5)] border border-white/20">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5 text-white drop-shadow-md">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <div className="relative flex flex-col items-start pr-1">
                        <span className="text-[10px] uppercase font-bold text-primary-400 opacity-90 tracking-wider leading-none mb-0.5">Panduan Video</span>
                        <span className="text-sm font-extrabold text-white tracking-wide">Tonton Tutorial</span>
                    </div>
                </a>
            )}
        </div>
      </div>
    </div>
  );
};
