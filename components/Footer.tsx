
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { InstagramIcon } from './icons/InstagramIcon';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full mt-12 glass-panel neon-border border-x-0 border-b-0 relative z-30 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Copyright & Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm font-medium text-slate-400">
                &copy; {new Date().getFullYear()} AIDIGITRANS.<span className="font-display font-bold text-white neon-text">COM</span>
            </p>
        </div>

        {/* Right Side: Credits & Socials */}
        <div className="flex items-center gap-6">
           <div className="text-sm text-slate-400 flex items-center gap-1 font-medium">
              <span className="opacity-80">{t('footer.createdBy')}</span>
              <a 
                href="https://www.instagram.com/aidigitrans" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-primary-400 hover:text-primary-300 transition-colors tracking-wide"
              >
                @aidigitrans.com
              </a>
           </div>
           
           <a 
             href="https://www.instagram.com/aidigitrans" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group p-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all shadow-[0_0_10px_rgba(0,212,255,0.1)] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
             aria-label="Instagram"
           >
             <InstagramIcon className="w-4 h-4 text-slate-400 group-hover:text-primary-400 transition-colors" />
           </a>
        </div>
      </div>
    </footer>
  );
};
