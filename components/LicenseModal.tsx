
import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShieldCheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);
const CheckCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
const XCircleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
);
const AlertTriangleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-fade-in" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-3xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hidden md:block mb-6 text-center">
              <h1 className="text-3xl font-display font-bold text-white mb-2 neon-text">{t('license.title')}</h1>
              <p className="text-slate-400">{t('license.subtitle')}</p>
            </div>

            <div className="bg-[#020617] w-full rounded-[2rem] shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden border border-primary-500/30 flex flex-col max-h-[85vh]">
                <div className="p-6 md:hidden text-left border-b border-primary-500/20 bg-white/5">
                    <h1 className="text-xl font-display font-bold text-white neon-text">{t('license.title')}</h1>
                </div>
                
                <div className="p-4 sm:p-6 md:p-8 text-left space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar bg-[#020617]">
                    {/* Kepemilikan Intelektual */}
                    <div className="flex items-start gap-5 pb-8 border-b border-primary-500/10">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary-900/30 text-primary-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                            <ShieldCheckIcon />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{t('license.intellectualProperty.title')}</h2>
                            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{t('license.intellectualProperty.desc')} <strong className="text-primary-400">AIDIGITRANS.COM</strong>. {t('license.intellectualProperty.desc2')}</p>
                        </div>
                    </div>

                    {/* Penggunaan yang Diizinkan */}
                    <div className="flex items-start gap-5 pb-8 border-b border-primary-500/10">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                            <CheckCircleIcon />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{t('license.permittedUse.title')}</h2>
                            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{t('license.permittedUse.desc')}</p>
                        </div>
                    </div>

                    {/* Batasan & Larangan */}
                    <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-rose-900/30 text-rose-400 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                            <XCircleIcon />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{t('license.restrictions.title')}</h2>
                            <p className="text-slate-300 mt-2 text-sm">{t('license.restrictions.desc')}</p>
                            <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1 text-sm pl-1">
                                <li>{t('license.restrictions.item1')}</li>
                                <li>{t('license.restrictions.item2')}</li>
                                <li>{t('license.restrictions.item3')} <strong className="text-primary-400">AIDIGITRANS.COM</strong>.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Peringatan Keras */}
                    <div className="bg-fuchsia-900/20 border-l-4 border-fuchsia-500 text-fuchsia-200 p-4 rounded-r-xl shadow-[0_0_20px_rgba(217,70,239,0.1)]" role="alert">
                        <div className="flex items-start">
                            <div className="py-1 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]"><AlertTriangleIcon /></div>
                            <div className="ml-3">
                                <p className="font-bold text-fuchsia-300">{t('license.warning.title')}</p>
                                <p className="text-sm mt-1 text-fuchsia-200/80">{t('license.warning.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-white/5 border-t border-primary-500/20 text-right md:hidden">
                    <button onClick={onClose} className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all">
                        {t('about.closeButton')}
                    </button>
                 </div>
            </div>
            
             <button onClick={onClose} className="hidden md:inline-block mt-6 bg-white/10 text-white font-semibold py-2 px-8 rounded-full backdrop-blur-lg hover:bg-white/20 transition-all border border-white/10 hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {t('about.closeButton')}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
