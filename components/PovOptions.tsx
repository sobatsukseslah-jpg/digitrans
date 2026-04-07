import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PovStudioOptions, PovHandStyle } from '../types';
import { POV_THEMES } from '../constants';
import { ImageUploader } from './ImageUploader';
import { Spinner } from './Spinner';

interface PovOptionsProps {
    options: PovStudioOptions;
    setOptions: (options: PovStudioOptions) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isProductImageUploaded: boolean;
    backgroundImage: string | null;
    onBackgroundUpload: (dataUrl: string, mimeType: string) => void;
}

export const PovOptions: React.FC<PovOptionsProps> = ({
    options,
    setOptions,
    onGenerate,
    isLoading,
    isProductImageUploaded,
    backgroundImage,
    onBackgroundUpload
}) => {
    const { t } = useLanguage();

    const handleHandStyleChange = (style: PovHandStyle) => {
        setOptions({ ...options, handStyle: style });
    };

    const handleBackgroundModeChange = (mode: 'preset' | 'custom') => {
        setOptions({ ...options, backgroundMode: mode });
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOptions({ ...options, theme: e.target.value });
    };

    const handleCustomThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions({ ...options, customTheme: e.target.value });
    };

    const getHandStyleLabel = (style: PovHandStyle) => {
        switch (style) {
            case PovHandStyle.AUTO: return t('povStudio.handStyle.auto');
            case PovHandStyle.FEMALE: return t('povStudio.handStyle.female');
            case PovHandStyle.MALE: return t('povStudio.handStyle.male');
            case PovHandStyle.SWEATER: return t('povStudio.handStyle.sweater');
            default: return style;
        }
    };

    const isGenerateDisabled = isLoading || !isProductImageUploaded || (options.backgroundMode === 'custom' && !backgroundImage);
    
    const inputClasses = "w-full bg-[#020617]/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-sm transition-all placeholder-slate-500 text-white hover:border-white/20 backdrop-blur-sm appearance-none";
    const labelClasses = "block text-xs font-bold text-primary-400 mb-2 uppercase tracking-wider ml-1";

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Hand Style Selection */}
            <div>
                <label className={labelClasses}>{t('povStudio.handStyle.label')}</label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.values(PovHandStyle).map((style) => (
                        <button
                            key={style}
                            onClick={() => handleHandStyleChange(style)}
                            className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center text-center min-h-[42px] ${
                                options.handStyle === style
                                    ? 'bg-primary-500/20 border-primary-500 text-primary-300 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                                    : 'bg-[#020617]/50 border-white/10 text-slate-400 hover:border-primary-500/50 hover:bg-primary-500/10'
                            }`}
                        >
                            {getHandStyleLabel(style)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Background Mode Selection */}
            <div>
                <label className={labelClasses}>{t('povStudio.background.modeLabel')}</label>
                <div className="p-1 bg-[#020617]/50 border border-white/10 rounded-xl flex gap-1 backdrop-blur-sm">
                    <button
                        onClick={() => handleBackgroundModeChange('preset')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            options.backgroundMode === 'preset'
                                ? 'bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_10px_rgba(217,70,239,0.3)] text-white'
                                : 'text-slate-400 hover:text-primary-300'
                        }`}
                    >
                        {t('povStudio.background.preset')}
                    </button>
                    <button
                        onClick={() => handleBackgroundModeChange('custom')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            options.backgroundMode === 'custom'
                                ? 'bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_10px_rgba(217,70,239,0.3)] text-white'
                                : 'text-slate-400 hover:text-primary-300'
                        }`}
                    >
                        {t('povStudio.background.custom')}
                    </button>
                </div>
            </div>

            {/* Conditional Background Input */}
            <div className="min-h-[100px]">
                {options.backgroundMode === 'preset' ? (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className={labelClasses}>{t('povStudio.background.themeLabel')}</label>
                            <div className="relative group">
                                <select
                                    value={options.theme}
                                    onChange={handleThemeChange}
                                    className={`${inputClasses} cursor-pointer pr-10`}
                                >
                                    {POV_THEMES.map((theme) => (
                                        <option key={theme.key} value={theme.key} className="bg-[#020617] text-white">
                                            {t(`povStudio.themes.${theme.key}`) || theme.name}
                                        </option>
                                    ))}
                                    <option value="Other" className="bg-[#020617] text-white">{t('options.customize.theme.other')}</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-hover:text-primary-400 transition-colors">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Custom Theme Input - Shown only when 'Other' is selected */}
                        {options.theme === 'Other' && (
                            <div className="animate-fade-in">
                                <label className={labelClasses}>{t('options.customize.customTheme.label')}</label>
                                <input
                                    type="text"
                                    value={options.customTheme}
                                    onChange={handleCustomThemeChange}
                                    placeholder={t('options.customize.customTheme.placeholder')}
                                    className={inputClasses}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <label className={labelClasses}>{t('uploader.backgroundLabel')}</label>
                        <ImageUploader
                            onImageUpload={onBackgroundUpload}
                            uploadedImage={backgroundImage}
                            label="Upload Background"
                            labelKey="uploader.backgroundLabel"
                        />
                    </div>
                )}
            </div>

             {/* Additional Instructions */}
             <div>
              <label className={labelClasses}>{t('options.shared.instructions.label')}</label>
              <textarea
                rows={2}
                className={inputClasses}
                placeholder={t('options.shared.instructions.placeholderCustomize')}
                value={options.instructions}
                onChange={(e) => setOptions({ ...options, instructions: e.target.value })}
              />
            </div>

            {/* Generate Button */}
            <div className="pt-4">
                <button
                    onClick={onGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full group relative flex justify-center items-center py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-[#020617] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-3">
                            <Spinner className="h-5 w-5 text-white" />
                            <span className="tracking-wide">Generating POV...</span>
                        </div>
                    ) : (
                        <span className="tracking-wide">{t('povStudio.generateButton')}</span>
                    )}
                </button>
                {!isProductImageUploaded && (
                    <p className="text-center text-sm text-red-400 mt-4 bg-red-500/10 p-3 rounded-xl border border-red-500/20">{t('errors.noProductImage')}</p>
                )}
                 {options.backgroundMode === 'custom' && !backgroundImage && isProductImageUploaded && (
                    <p className="text-center text-sm text-red-400 mt-4 bg-red-500/10 p-3 rounded-xl border border-red-500/20">{t('povStudio.errors.noBackground')}</p>
                )}
            </div>
        </div>
    );
};