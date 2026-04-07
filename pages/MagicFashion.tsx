import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadedImage } from '../types';
import { 
    generateStyloImage as generateFashionImage,
    generateProductPhoto
} from '../services/geminiService';
import { Shirt, Image as ImageIcon, UserPlus, X, Sparkles, Download, Eye, Square as SquareIcon, RectangleVertical as RectangleVerticalIcon, RectangleHorizontal as RectangleHorizontalIcon } from '../components/icons/LucideIcons';
import { InfoIcon as Info } from '../components/icons/InfoIcon';
import Loader from '../components/Loader';
import UniversalModal from '../components/UniversalModal';
import { FeatureHeader } from '../components/FeatureHeader';
import { PromoCard } from '../components/PromoCard';

// Declare heic2any from CDN
declare const heic2any: any;

// --- Helper Functions & Components ---

const convertHeicToJpg = async (file: File): Promise<File> => {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type.toLowerCase() === 'image/heic';
    if (isHeic) {
        if (typeof heic2any !== 'undefined') {
            try {
                const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
                const finalBlob = Array.isArray(result) ? result[0] : result;
                const fileName = file.name.replace(/\.heic$/i, '.jpg');
                return new File([finalBlob as Blob], fileName, { type: 'image/jpeg' });
            } catch (error) {
                console.error("HEIC conversion failed:", error);
                alert("Gagal mengonversi file HEIC. Pastikan format file valid.");
                throw new Error("HEIC conversion failed");
            }
        } else {
             console.warn("heic2any library not loaded.");
             return file;
        }
    }
    return Promise.resolve(file);
};

const getAspectRatioClass = (ratio: string) => {
    const mapping: Record<string, string> = {
        '1:1': 'aspect-square', '16:9': 'aspect-video', '9:16': 'aspect-[9/16]',
        '4:3': 'aspect-[4/3]', '3:4': 'aspect-[3/4]',
    };
    return mapping[ratio] || 'aspect-square';
};

type ResultItem = { state: 'loading' } | { state: 'error'; message: string } | { state: 'done'; imageUrl: string };

const ImageUploadSlot: React.FC<{
    title: string;
    icon: React.ReactNode;
    imageData: UploadedImage | null;
    onUpload: (data: UploadedImage) => void;
    onRemove: () => void;
    className?: string;
    subtitle?: string;
}> = ({ title, icon, imageData, onUpload, onRemove, className = '', subtitle }) => {
    const inputId = useId();
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = async (file: File | null) => {
        if (!file) return;
        try {
            const processedFile = await convertHeicToJpg(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                const parts = dataUrl.split(',');
                const mimeType = parts[0].match(/:([A-Za-z0-9-.+\/]+);/)?.[1] || 'image/png';
                const base64 = parts[1];
                onUpload({ base64, mimeType, name: processedFile.name });
            };
            reader.readAsDataURL(processedFile);
        } catch (error) {
            console.error("Gagal memproses file:", error);
        }
    };
    
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer?.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    return (
        <div className="flex flex-col gap-2 h-full">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-center">{title}</h4>
            <label 
                htmlFor={inputId}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer relative overflow-hidden group transition-all duration-300 ${className} ${
                    isDragging 
                    ? 'border-violet-500 bg-violet-50/50 dark:bg-violet-900/20' 
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-white/5 hover:border-violet-400 hover:bg-white dark:hover:bg-white/10'
                }`}
            >
                {imageData ? (
                    <>
                        <img src={`data:${imageData.mimeType};base64,${imageData.base64}`} className="absolute top-0 left-0 w-full h-full object-contain p-2" alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors transform hover:scale-110 shadow-lg">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-slate-400 dark:text-slate-500 p-4">
                        <div className="mx-auto mb-2 text-slate-300 dark:text-slate-600 group-hover:text-violet-400 transition-colors">
                            {icon}
                        </div>
                        <p className="text-xs font-semibold">Klik atau seret</p>
                        {subtitle && <p className="text-[10px] opacity-60 mt-1">{subtitle}</p>}
                    </div>
                )}
            </label>
            <input id={inputId} type="file" onChange={(e) => handleFile(e.target.files?.[0] || null)} className="sr-only" accept="image/png, image/jpeg, image/webp, .heic, .HEIC" />
        </div>
    );
};

const OptionGroup: React.FC<{ options: string[]; selected: string; onSelect: (value: string) => void; gridClass?: string; }> = ({ options, selected, onSelect, gridClass = 'grid-cols-2' }) => (
    <div className={`grid gap-2 ${gridClass}`}>
        {options.map(opt => (
            <button 
                key={opt} 
                onClick={() => onSelect(opt)} 
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center text-center ${
                    selected === opt 
                    ? 'bg-violet-50 dark:bg-violet-900/30 border-violet-500 text-violet-700 dark:text-violet-300 shadow-sm' 
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-violet-300'
                }`}
            >
                {opt}
            </button>
        ))}
    </div>
);


// --- Main Component ---
const MagicFashion: React.FC = () => {
    // State
    const [productFront, setProductFront] = useState<UploadedImage | null>(null);
    const [productBack, setProductBack] = useState<UploadedImage | null>(null);
    const [logoData, setLogoData] = useState<UploadedImage | null>(null);
    const [customModelData, setCustomModelData] = useState<UploadedImage | null>(null);
    const [faceReferenceData, setFaceReferenceData] = useState<UploadedImage | null>(null);

    const [modelType, setModelType] = useState('Manusia');
    const [gender, setGender] = useState('Pria');
    const [age, setAge] = useState('Dewasa');
    const [customAge, setCustomAge] = useState('');
    const [location, setLocation] = useState('Indoor Studio');
    const [style, setStyle] = useState('Studio Minimalis');
    const [customStyle, setCustomStyle] = useState('');
    const [additionalPrompt, setAdditionalPrompt] = useState('');
    const [ratio, setRatio] = useState('3:4');
    
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<ResultItem[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const isGenerateDisabled = isLoading || !productFront || (modelType === 'Kustom' && !customModelData);

    const handleGenerate = async () => {
        if (!productFront) {
            setError("Harap unggah foto pakaian (tampak depan) terlebih dahulu.");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        setResults(Array(4).fill({ state: 'loading' }));

        const options = {
            modelType,
            location,
            style: style === 'Kustom' ? customStyle : style,
            gender: modelType === 'Manusia' || modelType === 'Manekin' ? gender : undefined,
            age: modelType === 'Manusia' || modelType === 'Manekin' ? (age === 'Kustom' ? customAge : age) : undefined,
            customPrompt: additionalPrompt,
            aspectRatio: ratio,
        };

        const hasBothViews = productFront && productBack;

        const generationPromises = [1, 2, 3, 4].map(async (i): Promise<ResultItem> => {
            try {
                // Determine which image to use and what view it is
                let activeProductImage = productFront;
                let viewType = "Front View";
                
                if (hasBothViews) {
                    // For both views: indices 0,1 are Front; indices 2,3 are Back
                    if (i > 2) {
                        activeProductImage = productBack;
                        viewType = "Back View";
                    }
                }

                let prompt = `Create a professional fashion photoshoot with aspect ratio ${options.aspectRatio}. This is a ${viewType}. Variation ${i}. `;
                prompt += `The location is ${options.location} and the visual style is ${options.style}. `;
                
                if (options.customPrompt) {
                    prompt += `Additional instructions: ${options.customPrompt}. `;
                }

                let result: { imageUrl: string };

                if (modelType === 'Kustom') {
                    const modelToUse = customModelData;
                    if (!modelToUse) {
                        throw new Error("Untuk mode Kustom, harap unggah foto model kustom.");
                    }
                    prompt += `The model is wearing the provided clothing item. The model in the output must look exactly like the provided model image.`
                    result = await generateFashionImage(prompt, modelToUse, activeProductImage, logoData, options.aspectRatio);
                } else if (modelType === 'Tanpa Model') {
                    prompt += `Display the provided clothing item on a ghost mannequin or as a creative flat-lay. There should be no visible person or mannequin.`;
                    result = await generateProductPhoto(activeProductImage!, prompt, logoData, options.aspectRatio);
                } else if (modelType === 'Manekin') {
                    prompt += `A ${options.age} ${options.gender} mannequin is wearing the provided clothing item.`;
                    result = await generateProductPhoto(activeProductImage!, prompt, logoData, options.aspectRatio);
                } else { // Manusia
                    if (faceReferenceData) {
                        prompt += `The model is wearing the provided clothing item. The model in the output must look exactly like the provided model image, maintaining their face and identity with 100% accuracy.`;
                        result = await generateFashionImage(prompt, faceReferenceData, activeProductImage, logoData, options.aspectRatio);
                    } else {
                        prompt += `A ${options.age} ${options.gender} model is wearing the provided clothing item.`;
                        result = await generateProductPhoto(activeProductImage!, prompt, logoData, options.aspectRatio);
                    }
                }
                
                return { state: 'done', imageUrl: result.imageUrl };

            } catch (error) {
                const message = error instanceof Error ? error.message : "Terjadi kesalahan";
                return { state: 'error', message };
            }
        });

        const settledResults = await Promise.all(generationPromises);
        setResults(settledResults);
        setIsLoading(false);
    };

    const inputClasses = "w-full bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 text-sm transition-all placeholder-gray-400 dark:text-white hover:border-gray-300 dark:hover:border-white/20 backdrop-blur-sm";

    return (
        <div className="w-full">
            <FeatureHeader 
                title="Magic Fashion" 
                description="Buat foto fashion profesional dengan model AI, pakaian, dan gaya pilihan Anda." 
                tutorialLink="https://youtu.be/rHNSqkDXFag"
            />
            
            <div className="mt-8 flex flex-col lg:flex-row gap-8 w-full">
                {/* Controls Column */}
                <div className="w-full lg:w-5/12 flex-shrink-0">
                    <div className="bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)] sticky top-6">
                        <div className="flex flex-col gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">1</span>
                                    Upload Pakaian
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <ImageUploadSlot 
                                        title="Tampak Depan" 
                                        icon={<Shirt className="w-8 h-8 mx-auto" />} 
                                        imageData={productFront} 
                                        onUpload={setProductFront} 
                                        onRemove={() => setProductFront(null)} 
                                        className="h-40" 
                                        subtitle="(Wajib)"
                                    />
                                    <ImageUploadSlot 
                                        title="Tampak Belakang" 
                                        icon={<Shirt className="w-8 h-8 mx-auto rotate-180" />} 
                                        imageData={productBack} 
                                        onUpload={setProductBack} 
                                        onRemove={() => setProductBack(null)} 
                                        className="h-40" 
                                        subtitle="(Opsional)"
                                    />
                                </div>
                                <div className="mt-4">
                                    <ImageUploadSlot 
                                        title="Logo / Watermark (Opsional)" 
                                        icon={<ImageIcon className="w-6 h-6 mx-auto" />} 
                                        imageData={logoData} 
                                        onUpload={setLogoData} 
                                        onRemove={() => setLogoData(null)} 
                                        className="h-28" 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">2</span>
                                    Configure Model
                                </h3>
                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Jenis Model</h4>
                                    <OptionGroup options={['Manusia', 'Manekin', 'Tanpa Model', 'Kustom']} selected={modelType} onSelect={setModelType} gridClass="grid-cols-2 lg:grid-cols-4" />
                                </div>

                                <AnimatePresence>
                                {modelType === 'Kustom' && (
                                    <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="overflow-hidden">
                                        <ImageUploadSlot title="Unggah Foto Model Kustom" icon={<UserPlus className="w-10 h-10 mx-auto" />} imageData={customModelData} onUpload={setCustomModelData} onRemove={() => setCustomModelData(null)} className="h-48" />
                                    </motion.div>
                                )}
                                </AnimatePresence>

                                <AnimatePresence>
                                {(modelType === 'Manusia' || modelType === 'Manekin') && (
                                    <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="overflow-hidden space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Jenis Kelamin</h4>
                                            <OptionGroup options={['Pria', 'Wanita']} selected={gender} onSelect={setGender} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Usia</h4>
                                            <OptionGroup options={['Anak', 'Dewasa', 'Kustom']} selected={age} onSelect={setAge} gridClass="grid-cols-3" />
                                            {age === 'Kustom' && <input type="text" value={customAge} onChange={e => setCustomAge(e.target.value)} className={inputClasses + " mt-3"} placeholder="Contoh: remaja 20-an..." />}
                                        </div>
                                        {modelType === 'Manusia' && (
                                            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                                                <ImageUploadSlot 
                                                    title="Referensi Wajah Model (Opsional)" 
                                                    icon={<UserPlus className="w-8 h-8 mx-auto" />} 
                                                    imageData={faceReferenceData} 
                                                    onUpload={setFaceReferenceData} 
                                                    onRemove={() => setFaceReferenceData(null)} 
                                                    className="h-40" 
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">3</span>
                                    Set Style & Location
                                </h3>
                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Lokasi</h4>
                                    <OptionGroup options={['Indoor Studio', 'Outdoor Natural']} selected={location} onSelect={setLocation} />
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Gaya Visual</h4>
                                    <OptionGroup options={['Studio Minimalis', 'Cahaya Alami', 'Sunset Emas', 'Urban Street Style', 'Mewah & Elegan', 'Kustom']} selected={style} onSelect={setStyle} gridClass="grid-cols-2 lg:grid-cols-3" />
                                    {style === 'Kustom' && <input type="text" value={customStyle} onChange={e => setCustomStyle(e.target.value)} className={inputClasses + " mt-3"} placeholder="Tulis gaya kustom..." />}
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-600 text-xs font-bold">4</span>
                                    Final Settings
                                </h3>
                                    <div>
                                    <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Instruksi Tambahan (Opsional)</h4>
                                    <textarea value={additionalPrompt} onChange={e => setAdditionalPrompt(e.target.value)} className={inputClasses} rows={2} placeholder="Contoh: Model berpose candid..."></textarea>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2 text-slate-600 dark:text-slate-400">Pilih Rasio</h4>
                                    <OptionGroup 
                                        options={['1:1', '3:4', '9:16', '16:9']} 
                                        selected={ratio} 
                                        onSelect={setRatio} 
                                        gridClass="grid-cols-2 sm:grid-cols-4" 
                                    />
                                </div>
                            </div>
                            
                            <button onClick={handleGenerate} disabled={isGenerateDisabled} className="w-full group relative flex justify-center items-center py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_10px_40px_-5px_rgba(124,58,237,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 transform hover:-translate-y-0.5">
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span className="tracking-wide">Membuat Foto...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        <span className="tracking-wide">Buat 4 Foto Fashion</span>
                                    </div>
                                )}
                            </button>
                            {error && <p className="text-sm text-center text-red-500 mt-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{error}</p>}
                        </div>
                    </div>
                </div>
                {/* Results Column */}
                <div className="w-full lg:w-7/12 flex flex-col">
                    <div className="bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)] h-full flex flex-col">
                        {results.length === 0 && !isLoading ? (
                            <div className="flex flex-grow flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400">
                                <ImageIcon className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4 opacity-50" />
                                <h3 className="font-semibold text-lg text-slate-600 dark:text-slate-300">Hasil Photoshoot Anda</h3>
                                <p className="mt-1 text-sm">Empat variasi foto fashion akan muncul di sini.</p>
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col">
                                <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Hasil Photoshoot Fashion</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {results.map((result, index) => (
                                        <div key={index} className={`rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center ${getAspectRatioClass(ratio)}`}>
                                            {result.state === 'loading' && <Loader message="Generative Fill..." />}
                                            {result.state === 'error' && <div className="text-xs text-red-500 p-2 text-center break-all">Gagal: {result.message}</div>}
                                            {result.state === 'done' && (
                                                    <div className="relative w-full h-full group">
                                                    <img src={result.imageUrl} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                                        <button onClick={() => setPreviewImage(result.imageUrl)} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors" title="Lihat"><Eye className="w-5 h-5" /></button>
                                                        <a href={result.imageUrl} download={`magic_fashion_${index+1}.png`} className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors" title="Unduh"><Download className="w-5 h-5" /></a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <PromoCard />
            <UniversalModal isOpen={!!previewImage} onClose={() => setPreviewImage(null)} title="Pratinjau Gambar">
                <div className="flex justify-center bg-black/90 p-4 rounded-xl">
                    {previewImage && <img src={previewImage} className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl" />}
                </div>
            </UniversalModal>
        </div>
    );
};

export default MagicFashion;