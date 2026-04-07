
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { ImageData, ModelGenerationOptions } from '../types';
import { ImageUploader } from './ImageUploader';

// Constants for model generation
const GENDERS = ['Female', 'Male', 'Other'];
const ETHNICITIES = ['Caucasian', 'Asian', 'African', 'Hispanic', 'Middle Eastern', 'Other'];
const ASPECT_RATIOS = ['1:1', '3:4', '9:16'];

interface ModelOptionsProps {
    modelOption: 'upload' | 'generate';
    setModelOption: (option: 'upload' | 'generate') => void;
    modelImage: ImageData | null;
    handleModelImageUpload: (dataUrl: string, mimeType: string) => void;
    generationParams: ModelGenerationOptions;
    setGenerationParams: (params: ModelGenerationOptions) => void;
    aspectRatio: string;
    setAspectRatio: (ratio: string) => void;
}

export const ModelOptions: React.FC<ModelOptionsProps> = ({ 
    modelOption, 
    setModelOption, 
    modelImage, 
    handleModelImageUpload, 
    generationParams, 
    setGenerationParams,
    aspectRatio,
    setAspectRatio
}) => {
  const { t } = useLanguage();
  
  const translatedEthnicities = ETHNICITIES.map(key => ({
    key,
    name: t(`virtualTryOn.modelOptions.ethnicities.${key.charAt(0).toLowerCase() + key.slice(1).replace(' ', '')}`) || key
  }));

  const handleEthnicityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEthnicity = e.target.value;
    if (newEthnicity !== 'Other') {
        setGenerationParams({ ...generationParams, ethnicity: newEthnicity, customEthnicity: '' });
    } else {
        setGenerationParams({ ...generationParams, ethnicity: newEthnicity });
    }
  };

  const handleCustomEthnicityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setGenerationParams({ ...generationParams, customEthnicity: e.target.value });
  };

  const inputClasses = "w-full bg-[#020617]/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all placeholder-slate-500 text-white hover:border-white/20 backdrop-blur-sm appearance-none";
  const labelClasses = "block text-xs font-bold text-primary-400 mb-2 uppercase tracking-wider ml-1";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Segmented Control */}
      <div className="p-1 bg-[#020617]/50 border border-white/10 rounded-xl flex gap-1 backdrop-blur-sm">
        <button
          onClick={() => setModelOption('upload')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            modelOption === 'upload'
              ? 'bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_10px_rgba(217,70,239,0.3)] text-white'
              : 'text-slate-400 hover:text-primary-300'
          }`}
        >
          {t('virtualTryOn.modelOptions.upload')}
        </button>
        <button
          onClick={() => setModelOption('generate')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            modelOption === 'generate'
              ? 'bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_10px_rgba(217,70,239,0.3)] text-white'
              : 'text-slate-400 hover:text-primary-300'
          }`}
        >
          {t('virtualTryOn.modelOptions.generate')}
        </button>
      </div>

      {modelOption === 'upload' ? (
        <div className="animate-fade-in">
            <ImageUploader
            onImageUpload={handleModelImageUpload}
            uploadedImage={modelImage?.dataUrl || null}
            label="Upload Model Image"
            labelKey="uploader.modelLabel"
            />
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in p-1">
          <div>
            <label className={labelClasses}>{t('virtualTryOn.modelOptions.gender')}</label>
            <div className="relative group">
                <select
                value={generationParams.gender}
                onChange={(e) => setGenerationParams({ ...generationParams, gender: e.target.value })}
                className={`${inputClasses} cursor-pointer pr-10`}
                >
                {GENDERS.map(gender => <option key={gender} value={gender} className="bg-[#020617] text-white">{t(`virtualTryOn.modelOptions.${gender.toLowerCase()}`)}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 group-hover:text-primary-400 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>
          <div>
            <label className={labelClasses}>{t('virtualTryOn.modelOptions.ethnicity')}</label>
             <div className="relative group">
                <select
                value={generationParams.ethnicity}
                onChange={handleEthnicityChange}
                className={`${inputClasses} cursor-pointer pr-10`}
                >
                {translatedEthnicities.map(eth => <option key={eth.key} value={eth.key} className="bg-[#020617] text-white">{eth.name}</option>)}
                </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 group-hover:text-primary-400 transition-colors">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
          </div>
          {generationParams.ethnicity === 'Other' && (
            <div className="animate-fade-in">
              <label htmlFor="custom-ethnicity" className={labelClasses}>{t('virtualTryOn.modelOptions.customEthnicity.label')}</label>
              <input
                type="text"
                id="custom-ethnicity"
                value={generationParams.customEthnicity || ''}
                onChange={handleCustomEthnicityChange}
                placeholder={t('virtualTryOn.modelOptions.customEthnicity.placeholder')}
                className={inputClasses}
              />
            </div>
          )}
          <div>
            <label className={labelClasses}>{t('virtualTryOn.modelOptions.details')}</label>
            <textarea
              rows={3}
              className={inputClasses}
              placeholder={t('virtualTryOn.modelOptions.detailsPlaceholder')}
              value={generationParams.details}
              onChange={(e) => setGenerationParams({ ...generationParams, details: e.target.value })}
            />
          </div>
        </div>
      )}
      
      {/* Aspect Ratio Selector - Available for both upload and generate modes */}
      <div className="pt-2 border-t border-white/10">
        <label className={labelClasses}>{t('virtualTryOn.modelOptions.aspectRatio')}</label>
        <div className="flex gap-2 mt-2">
            {ASPECT_RATIOS.map((ratio) => (
                <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        aspectRatio === ratio
                            ? 'bg-primary-500/20 border-primary-500 text-primary-300 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                            : 'bg-[#020617]/50 border-white/10 text-slate-400 hover:border-primary-500/50 hover:bg-primary-500/10'
                    }`}
                >
                    {ratio}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};
