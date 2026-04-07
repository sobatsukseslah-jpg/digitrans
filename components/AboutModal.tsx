
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AppLogoIcon } from './icons/AppLogoIcon';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const featuresList = [
    { label: t('sidebar.productStudio'), desc: t('about.productStudio') },
    { label: t('sidebar.listingStudio'), desc: t('about.listingStudio') },
    { label: t('sidebar.perspectiveStudio'), desc: t('about.perspectiveStudio') },
    { label: t('sidebar.povStudio'), desc: t('about.povStudio') },
    { label: t('sidebar.mirrorStudio'), desc: t('about.mirrorStudio') },
    { label: t('sidebar.virtualTryOn'), desc: t('about.virtualTryOn') },
    { label: t('sidebar.lifestylePhotoshoot'), desc: t('about.lifestylePhotoshoot') },
    { label: t('sidebar.mergeProduct'), desc: t('about.mergeProduct') },
    { label: t('sidebar.adCreator'), desc: t('about.adCreator') },
    { label: t('sidebar.digiGenEditor'), desc: t('about.imageEditor') },
    { label: t('sidebar.digiPose'), desc: t('about.poseStudio') },
    { label: t('sidebar.digitalImaging'), desc: t('about.digitalImaging') },
  ];

  return (
    <div 
      className="fixed inset-0 bg-[#020617]/90 backdrop-blur-md z-[100] flex justify-center items-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-[#020617] backdrop-blur-2xl rounded-[2rem] shadow-[0_0_50px_rgba(0,212,255,0.15)] max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-primary-500/30 transform animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-primary-500/20 flex justify-between items-center bg-white/5 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-fuchsia-700 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    <AppLogoIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-display font-bold text-white tracking-tight neon-text">
                        AIDIGITRANS.<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-fuchsia-400">COM</span>
                    </h2>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Digi Creative Studio</p>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary-400 transition-colors" 
                aria-label="Close"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto custom-scrollbar space-y-8 sm:space-y-10 bg-[#020617]">
          
          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed text-slate-300">
                {t('about.description')}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-4">{t('about.techStack')}</h3>
            <div className="flex flex-wrap gap-2">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Google Gemini API', 'Vite'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-200 text-xs font-bold border border-white/10">
                    {tech}
                </span>
              ))}
            </div>
          </div>

           {/* Gemini Models */}
           <div>
            <h3 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-4">{t('about.geminiModels')}</h3>
            <div className="grid gap-3">
                <div className="p-4 rounded-xl bg-primary-900/20 border border-primary-500/30 flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(0,212,255,0.8)]"></div>
                    <div>
                        <p className="text-sm font-bold text-white">gemini-2.5-flash-image</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t('about.geminiFlashImage')}</p>
                    </div>
                </div>
                 <div className="p-4 rounded-xl bg-fuchsia-900/20 border border-fuchsia-500/30 flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(217,70,239,0.8)]"></div>
                    <div>
                        <p className="text-sm font-bold text-white">gemini-2.5-flash</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t('about.geminiFlash')}</p>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div>
             <h3 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-4">Features & Capabilities</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuresList.map((feature, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-colors group">
                        <p className="text-sm font-bold text-slate-200 group-hover:text-primary-400 transition-colors">{feature.label}</p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{feature.desc}</p>
                    </div>
                ))}
             </div>
          </div>

          {/* Footer Text */}
          <div className="text-center pt-4 border-t border-dashed border-primary-500/20">
             <p className="text-xs text-slate-500">
              {t('about.developedBy')}{' '}
              <a href="https://www.instagram.com/aidigitrans" target="_blank" rel="noopener noreferrer" className="font-bold text-primary-400 hover:text-primary-300 hover:underline transition-colors">
                @aidigitrans.com
              </a>
            </p>
          </div>

        </div>

        {/* Footer Button */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-t border-primary-500/20 bg-[#020617]/80 backdrop-blur-sm flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-500 shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {t('about.closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
};