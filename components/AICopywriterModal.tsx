import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { AdCopySuggestions } from '../types';
import { generateAdCopySuggestions } from '../services/geminiService';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons/SparklesIcon';

interface AICopywriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCopy: (text: string, field: 'headline' | 'description' | 'cta') => void;
}

export const AICopywriterModal: React.FC<AICopywriterModalProps> = ({ isOpen, onClose, onSelectCopy }) => {
  const { t } = useLanguage();
  const [productName, setProductName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [suggestions, setSuggestions] = useState<AdCopySuggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!productName.trim()) return;
    setIsLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      const result = await generateAdCopySuggestions(productName, keywords);
      setSuggestions(result);
    } catch (e) {
      console.error(e);
      setError(t('adCreator.copywriter.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSuggestion = (text: string, field: 'headline' | 'description' | 'cta') => {
    onSelectCopy(text, field);
  };

  const inputClasses = "w-full bg-[#020617]/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all placeholder-slate-500 text-white hover:border-white/20 backdrop-blur-sm";
  const labelClasses = "block text-xs font-bold text-primary-400 mb-2 uppercase tracking-wider ml-1";

  const SuggestionSection: React.FC<{ title: string; items: string[]; field: 'headline' | 'description' | 'cta' }> = ({ title, items, field }) => (
    <div>
        <h4 className="font-bold text-primary-400 mb-3 text-sm uppercase tracking-wide border-b border-primary-500/20 pb-2">{title}</h4>
        <ul className="space-y-3">
            {items.map((item, index) => (
                <li key={index} className="p-4 bg-white/5 rounded-xl flex justify-between items-center gap-4 border border-white/10 hover:border-primary-500/50 transition-colors group">
                    <p className="text-sm text-slate-300 flex-1">{item}</p>
                    <button 
                        onClick={() => handleUseSuggestion(item, field)}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors flex-shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.4)] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-200"
                    >
                       {t('adCreator.copywriter.useButton')}
                    </button>
                </li>
            ))}
        </ul>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#020617]/90 backdrop-blur-md z-[100] flex justify-center items-center p-4 animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="bg-[#020617] rounded-[2rem] shadow-[0_0_50px_rgba(0,212,255,0.15)] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transform animate-slide-up border border-primary-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-primary-500/20 flex justify-between items-center bg-white/5 backdrop-blur-md">
          <h2 className="text-xl font-display font-bold text-white neon-text flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-fuchsia-700 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                <SparklesIcon className="w-5 h-5" />
             </div>
             {t('adCreator.copywriter.modalTitle')}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-primary-400 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#020617]">
          <div className="space-y-4 sm:space-y-5 bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10">
            <div>
                <label htmlFor="productName" className={labelClasses}>{t('adCreator.copywriter.productNameLabel')}</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className={inputClasses}
                    placeholder={t('adCreator.copywriter.productNamePlaceholder')}
                />
            </div>
             <div>
                <label htmlFor="keywords" className={labelClasses}>{t('adCreator.copywriter.keywordsLabel')}</label>
                <input
                    type="text"
                    id="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className={inputClasses}
                    placeholder={t('adCreator.copywriter.keywordsPlaceholder')}
                />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !productName.trim()}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? <Spinner className="h-5 w-5 text-white" /> : <SparklesIcon className="w-5 h-5" />}
              {t('adCreator.copywriter.generateButton')}
            </button>
          </div>
          
          <div className="mt-8">
            {isLoading && (
              <div className="text-center p-12">
                <Spinner className="h-10 w-10 mx-auto text-primary-500" />
                <p className="mt-4 text-sm font-medium text-primary-400 animate-pulse">{t('adCreator.copywriter.loading')}</p>
              </div>
            )}
            {error && <p className="text-center text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>}
            {suggestions && (
              <div className="space-y-8 animate-slide-up">
                <SuggestionSection title={t('adCreator.copywriter.suggestionsFor.headline')} items={suggestions.headlines} field="headline" />
                <SuggestionSection title={t('adCreator.copywriter.suggestionsFor.description')} items={suggestions.descriptions} field="description" />
                <SuggestionSection title={t('adCreator.copywriter.suggestionsFor.cta')} items={suggestions.ctas} field="cta" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};