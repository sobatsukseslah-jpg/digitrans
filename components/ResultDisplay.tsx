
import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';
import { ZoomIcon } from './icons/ZoomIcon';
import { ZoomModal } from './ZoomModal';
import { useLanguage } from '../contexts/LanguageContext';
import { InfoIcon } from './icons/InfoIcon';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImages: string[] | null;
  selectedImage: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
  onReset: () => void;
  onSelectImage: (imageUrl: string) => void;
  loadingTitleKey?: string;
  resultTitleKey?: string;
  resultDescriptionKey?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImage,
  generatedImages,
  selectedImage,
  isLoading,
  error,
  onDownload,
  onReset,
  onSelectImage,
  loadingTitleKey = 'results.loading.title',
  resultTitleKey = 'results.title',
  resultDescriptionKey = 'results.description',
}) => {
  const { t } = useLanguage();
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full p-8">
          <div className="relative mb-8">
             <div className="absolute inset-0 bg-primary-500/30 rounded-full blur-[60px] animate-pulse-slow"></div>
             <div className="relative bg-[#020617] rounded-full p-4 shadow-[0_0_20px_rgba(0,212,255,0.2)] border border-primary-500/30">
                <Spinner className="h-10 w-10 text-primary-400" />
             </div>
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-2 animate-pulse neon-text">{t(loadingTitleKey)}</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">{t('results.loading.subtitle')}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full p-8">
          <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{t('results.error.title')}</h3>
          <p className="text-sm text-slate-300 mb-6 bg-red-900/10 p-4 rounded-xl border border-red-500/30 max-w-sm leading-relaxed">{error}</p>
          <button
            onClick={onReset}
            className="px-6 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl hover:bg-white/10 transition-all font-semibold shadow-sm hover:shadow-md"
          >
            {t('results.error.button')}
          </button>
        </div>
      );
    }

    if (!generatedImages || generatedImages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full text-slate-500 p-8">
           <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-4 border border-dashed border-primary-500/30 rotate-3 transition-transform hover:rotate-6 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
              <svg className="w-8 h-8 opacity-40 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           </div>
          <p className="text-sm font-bold opacity-70 tracking-wide text-slate-400">{t('results.placeholder')}</p>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full group">
        {/* Main selected image */}
        <div 
          className="w-full h-full cursor-zoom-in flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIi8+CjxwYXRoIGQ9IkQwIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] overflow-hidden"
          onClick={() => setIsZoomModalOpen(true)}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt={t('results.imageAlt')}
              className="max-w-full max-h-full object-contain shadow-sm"
            />
          )}
        </div>

         {/* Floating Controls (Zoom Icon) */}
         <div className="absolute top-4 right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#020617]/50 backdrop-blur-md p-2 rounded-full text-white border border-white/10 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                <ZoomIcon className="w-5 h-5" />
            </div>
         </div>

        {/* Floating Thumbnails Bar */}
        {generatedImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 max-w-[90%]">
                <div className="flex gap-2 p-2 bg-[#020617]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_15px_rgba(0,212,255,0.1)] overflow-x-auto custom-scrollbar">
                {generatedImages.map((img, index) => (
                    <button
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onSelectImage(img);
                    }}
                    className={`relative w-12 h-12 rounded-lg cursor-pointer overflow-hidden transition-all duration-200 flex-shrink-0 border
                        ${selectedImage === img 
                            ? 'border-primary-500 ring-2 ring-primary-500/30 opacity-100 scale-105 shadow-[0_0_10px_rgba(0,212,255,0.3)]' 
                            : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 hover:border-white/20'}`}
                    >
                    <img
                        src={img}
                        alt={`${t('results.variantLabel')} ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    </button>
                ))}
                </div>
            </div>
        )}
      </div>
    );
  };

  const stepNumber = resultTitleKey.includes('Editor') ? '4' : '3';

  return (
    <>
      <div className="flex flex-col h-fit sticky top-24">
        <div className="glass-panel neon-border p-4 sm:p-5 rounded-2xl sm:rounded-[2rem] flex flex-col shadow-[0_0_30px_rgba(0,212,255,0.05)]">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center font-bold text-primary-400 text-sm border border-primary-500/50 shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                    {stepNumber}
                </div>
                <div>
                    <h2 className="text-lg font-display font-bold text-white neon-text">{t(resultTitleKey).substring(3)}</h2>
                    <p className="text-xs text-slate-400 font-medium">{t(resultDescriptionKey)}</p>
                </div>
            </div>

            {/* Main Display Area - Fixed Height for Compactness */}
            <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-primary-500/30 bg-[#020617]/50 shadow-inner backdrop-blur-sm relative group">
                {renderContent()}
            </div>

            {/* Action Buttons - Horizontal Layout */}
            {(generatedImages && generatedImages.length > 0) && !isLoading && !error && (
                <div className="flex items-center gap-3 mt-5 animate-slide-up">
                    <button
                        onClick={onDownload}
                        disabled={!selectedImage}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-500 shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <DownloadIcon className="w-4 h-4" />
                        {t('results.downloadButton')}
                    </button>
                    <button
                        onClick={onReset}
                        className="px-6 py-3 rounded-xl text-sm font-bold text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                    >
                        {t('results.resetButton')}
                    </button>
                </div>
            )}

            {isLoading && (
                <div className="mt-4 text-center animate-fade-in">
                    <div className="inline-flex items-center text-left justify-center gap-2 text-xs font-semibold text-amber-400 px-4 py-2 bg-amber-900/20 border border-amber-500/30 rounded-lg backdrop-blur-sm">
                        <InfoIcon className="w-4 h-4 flex-shrink-0" />
                        <span>{t('notes.navigationWarning')}</span>
                    </div>
                </div>
            )}
        </div>
      </div>
      <ZoomModal 
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        imageUrl={selectedImage || ''}
      />
    </>
  );
};
