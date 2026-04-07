
import React, { useState, useReducer, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadedImage, ProductMode, StyleTheme } from '../types';
import { generateDigiProductConcepts, generateDigiProductImage, generateStyloImage, generateProductPhoto } from '../services/geminiService';
import { PhotoStudioIcon as Package } from '../components/icons/PhotoStudioIcon';
import { StudioPoseIcon as User } from '../components/icons/StudioPoseIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';
import { ZoomIcon as EyeIcon } from '../components/icons/ZoomIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { UploadIcon as UploadCloud } from '../components/icons/UploadIcon';
import { FeatureHeader } from '../components/FeatureHeader';
import { StepHeader } from '../components/StepHeader';
import { PromoCard } from '../components/PromoCard';

// Declare heic2any
declare const heic2any: any;

// --- TYPES ---
type AspectRatio = '1:1' | '16:9' | '9:16';
type ModelSource = 'upload' | 'ai';
type ResultItem = {
    id: number;
    status: 'loading' | 'done' | 'error';
    imageUrl?: string;
    name?: string;
    error?: string;
}

interface DigiProductProps {
    onNavigate: (view: any) => void;
}

// --- CONSTANTS ---
const GENDERS = ['Female', 'Male', 'Non-binary'];
const AGES = ['Child (5-10)', 'Teenager (13-18)', 'Young Adult (20s)', 'Adult (30s-40s)', 'Middle-Aged (50s)', 'Elderly (65+)'];
const ETHNICITIES = ['Asian', 'Southeast Asian (Sawo Matang)', 'East Asian (Kuning Langsat)', 'Caucasian (White)', 'African', 'Hispanic', 'Middle Eastern', 'South Asian'];
const BODY_TYPES = ['Default', 'Gemuk (Plus-size)', 'Kurus (Slim)', 'Seksi (Fit & Toned)', 'Tinggi (Tall)', 'Pendek (Petite)'];

// --- HELPER ---
const convertHeicToJpg = async (file: File): Promise<File> => {
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type.toLowerCase() === 'image/heic';
    if (isHeic && typeof heic2any !== 'undefined') {
        try {
            const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
            const finalBlob = Array.isArray(result) ? result[0] : result;
            const fileName = file.name.replace(/\.heic$/i, '.jpg');
            return new File([finalBlob as Blob], fileName, { type: 'image/jpeg' });
        } catch (error) {
            console.error("HEIC conversion failed:", error);
        }
    }
    return file;
};

// --- LOCAL ICONS ---
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const SquareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
);
const RectangleHorizontalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /></svg>
);
const RectangleVerticalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /></svg>
);

// --- STATE & REDUCER ---
interface DigiProductState {
    mode: ProductMode;
    modelSource: ModelSource;
    productImage: UploadedImage | null;
    modelImage: UploadedImage | null;
    logoImage: UploadedImage | null;
    aspectRatio: AspectRatio;
    style: StyleTheme;
    isBoosterMode: boolean;
    isLoading: boolean;
    loadingMessage: string;
    error: string | null;
    results: ResultItem[];
    modelAttributes: {
        gender: string;
        age: string;
        ethnicity: string;
        bodyType: string;
    };
}

const initialState: DigiProductState = {
    mode: ProductMode.PRODUCT_ONLY,
    modelSource: 'upload',
    productImage: null,
    modelImage: null,
    logoImage: null,
    aspectRatio: '1:1',
    style: StyleTheme.NATURAL,
    isBoosterMode: false,
    isLoading: false,
    loadingMessage: '',
    error: null,
    results: [],
    modelAttributes: {
        gender: 'Female',
        age: 'Young Adult (20s)',
        ethnicity: 'Asian',
        bodyType: 'Default'
    }
};

type Action = 
    | { type: 'SET_FIELD'; payload: { field: keyof DigiProductState, value: any } }
    | { type: 'GENERATE_START'; payload: { count: number, message: string } }
    | { type: 'UPDATE_RESULT'; payload: { id: number, data: Partial<ResultItem> } }
    | { type: 'GENERATE_FINISH' }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'RESET_IMAGES' }
    | { type: 'RESET_ALL' };

const reducer = (state: DigiProductState, action: Action): DigiProductState => {
    switch (action.type) {
        case 'SET_FIELD': return { ...state, [action.payload.field]: action.payload.value };
        case 'GENERATE_START': return { 
            ...state, 
            isLoading: true, 
            loadingMessage: action.payload.message,
            error: null, 
            results: Array.from({ length: action.payload.count }, (_, i) => ({ id: i, status: 'loading' }))
        };
        case 'UPDATE_RESULT': {
            const newResults = state.results.map(r => r.id === action.payload.id ? { ...r, ...action.payload.data } : r);
            return { ...state, results: newResults };
        }
        case 'GENERATE_FINISH': return { ...state, isLoading: false, loadingMessage: '' };
        case 'SET_ERROR': return { ...state, error: action.payload, isLoading: false };
        case 'RESET_IMAGES': return { ...state, productImage: null, modelImage: null, logoImage: null, results: [], error: null };
        case 'RESET_ALL': return initialState;
        default: return state;
    }
};

// --- SUB-COMPONENTS ---
const UploadSlot: React.FC<{ 
    image: UploadedImage | null; 
    onUpload: (img: UploadedImage) => void; 
    onRemove: () => void; 
    icon: React.ReactNode; 
    title?: string;
    subtitle?: string;
    className?: string;
}> = ({ image, onUpload, onRemove, icon, title = "Unggah Gambar", subtitle = "", className = "" }) => {
    const inputId = useId();
    const handleFile = async (file: File) => {
        try {
            const processedFile = await convertHeicToJpg(file);
            const reader = new FileReader();
            reader.onload = e => {
                const url = e.target?.result as string;
                const [header, base64] = url.split(',');
                const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
                onUpload({ base64, mimeType, name: processedFile.name });
            };
            reader.readAsDataURL(processedFile);
        } catch (e) {
            console.error("File processing failed", e);
        }
    };

    return (
        <div className={`relative w-full h-full group ${className}`}>
            {image ? (
                <div className="h-full w-full relative">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIi8+CjxwYXRoIGQ9IkQwIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] rounded-xl overflow-hidden border-2 border-primary-500/30 flex items-center justify-center p-2">
                        <img src={`data:${image.mimeType};base64,${image.base64}`} alt={image.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                    </div>
                    <button 
                        onClick={e => { e.stopPropagation(); onRemove(); }} 
                        className="absolute -top-2 -right-2 bg-red-500/80 backdrop-blur-sm text-white p-1.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-red-500 active:scale-95 border border-red-400/50"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    {title === "Logo" && (
                         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[8px] px-2 py-0.5 font-black rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)] uppercase tracking-widest whitespace-nowrap">Watermark On</div>
                    )}
                </div>
            ) : (
                <>
                  <label 
                      htmlFor={inputId}
                      className="flex flex-col items-center justify-center w-full h-full min-h-[140px] border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:bg-[#0f172a] transition-all hover:border-primary-500/50 group/label glass-panel"
                  >
                      <div className="text-slate-400 text-center p-4">
                          <div className="w-8 h-8 mx-auto text-slate-500 group-label:text-primary-400 group-label:scale-110 transition-all drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">{icon}</div>
                          <p className="mt-3 text-xs font-bold uppercase tracking-tight group-label:text-white transition-colors">{title}</p>
                          {subtitle && <p className="text-[10px] text-slate-500 mt-1">{subtitle}</p>}
                      </div>
                  </label>
                  <input id={inputId} type="file" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} className="sr-only" accept="image/png, image/jpeg, image/webp, .heic, .HEIC" />
                </>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---
export const ProductStudio: React.FC<DigiProductProps> = ({ onNavigate }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { mode, modelSource, productImage, modelImage, logoImage, aspectRatio, style, isBoosterMode, isLoading, loadingMessage, error, results, modelAttributes } = state;
    const [preview, setPreview] = useState<{ isOpen: boolean, result: ResultItem | null }>({ isOpen: false, result: null });
    const setField = (field: keyof DigiProductState, value: any) => dispatch({ type: 'SET_FIELD', payload: { field, value } });

    const handleGenerate = async () => {
        if (!productImage || (mode === ProductMode.WITH_MODEL && modelSource === 'upload' && !modelImage)) return;
        const count = isBoosterMode ? 10 : 4;
        dispatch({ type: 'GENERATE_START', payload: { count, message: 'Menganalisis...' } });

        try {
            if (mode === ProductMode.PRODUCT_ONLY) {
                setField('loadingMessage', isBoosterMode ? 'Mencari Ide Kreatif...' : 'Membuat Konsep...');
                const concepts = await generateDigiProductConcepts(productImage, isBoosterMode, style);
                
                let completed = 0;
                const total = concepts.length;
                setField('loadingMessage', `Membuat Gambar (${completed}/${total})`);

                for (const [i, concept] of concepts.entries()) {
                    try {
                        const res = await generateDigiProductImage(productImage, concept.prompt, aspectRatio, logoImage);
                        dispatch({ type: 'UPDATE_RESULT', payload: { id: i, data: { status: 'done', imageUrl: res.imageUrl, name: concept.name } } });
                    } catch (err: any) {
                        dispatch({ type: 'UPDATE_RESULT', payload: { id: i, data: { status: 'error', error: err.message } } });
                    } finally {
                        completed++;
                        setField('loadingMessage', `Membuat Gambar (${completed}/${total})`);
                    }
                }

            } else { // WITH_MODEL mode
                let completed = 0;
                let concepts: any[] = [];
                
                const modelDesc = modelSource === 'ai' 
                    ? `a ${modelAttributes.age} ${modelAttributes.ethnicity} ${modelAttributes.gender} model with ${modelAttributes.bodyType} body`
                    : "the person from the model image";

                if (isBoosterMode) {
                    setField('loadingMessage', 'Mencari Pose & Ide Kreatif...');
                    // Pass description if AI mode, or image if upload mode
                    concepts = await generateDigiProductConcepts(
                        productImage, 
                        true, 
                        style, 
                        modelSource === 'upload' ? modelImage : null
                    );
                    // Adjust concepts for AI source if needed
                    if (modelSource === 'ai') {
                        concepts = concepts.map(c => ({
                            ...c,
                            prompt: `${c.prompt}. Featuring ${modelDesc}.`
                        }));
                    }
                } else {
                    concepts = Array.from({ length: 4 }).map((_, i) => ({
                        id: i,
                        name: `Variasi ${i + 1}`,
                        prompt: `A photorealistic commercial photograph of ${modelDesc} wearing the provided product. The overall style should be '${style}'. The final image must have an aspect ratio of ${aspectRatio}. Variation ${i+1}.`
                    }));
                }

                const total = concepts.length;
                setField('loadingMessage', `Membuat Gambar (${completed}/${total})`);
                
                for (const [i, concept] of concepts.entries()) {
                    try {
                        let res;
                        if (modelSource === 'upload') {
                            res = await generateStyloImage(concept.prompt, modelImage!, productImage, logoImage, aspectRatio);
                        } else {
                            // In AI source mode, we treat it like a single product photo generation but with model description in prompt
                            res = await generateProductPhoto(productImage, concept.prompt, logoImage, aspectRatio);
                        }
                        dispatch({ type: 'UPDATE_RESULT', payload: { id: i, data: { status: 'done', imageUrl: res.imageUrl, name: concept.name } } });
                    } catch (err: any) {
                        dispatch({ type: 'UPDATE_RESULT', payload: { id: i, data: { status: 'error', error: err.message } } });
                    } finally {
                        completed++;
                        setField('loadingMessage', `Membuat Gambar (${completed}/${total})`);
                    }
                }
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.";
            dispatch({ type: 'SET_ERROR', payload: message });
        } finally {
            dispatch({ type: 'GENERATE_FINISH' });
        }
    };

    const isGenerateDisabled = isLoading || !productImage || (mode === ProductMode.WITH_MODEL && modelSource === 'upload' && !modelImage);
    const aspectClass = { '1:1': 'aspect-square', '16:9': 'aspect-video', '9:16': 'aspect-[9/16]' }[aspectRatio];
    const generateBtnText = isBoosterMode 
        ? "Buat 10 Variasi Kreatif" 
        : (mode === ProductMode.PRODUCT_ONLY ? "Buat 4 Variasi Photoshoot" : "Buat 4 Variasi Model");

    const inputClasses = "w-full bg-[#0f172a] border border-slate-700 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 text-xs transition-all text-white appearance-none cursor-pointer";
    const labelClasses = "block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1 tracking-widest";

    return (
        <div className="w-full">
            <FeatureHeader 
                title="Digi Product Studio"
                description="Ciptakan foto produk profesional dengan kekuatan AI. Unggah foto produk Anda dan biarkan AI membuatkan berbagai skenario photoshoot."
                tutorialLink="https://youtu.be/co2zQigAlMg"
            />

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* Left Panel: Configuration */}
                <aside className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24 space-y-6">
                    <div className="bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)]">
                        
                        {/* Mode Switcher */}
                        <div className="flex w-full items-center justify-center rounded-xl bg-[#0f172a] p-1 mb-8 border border-white/10">
                            <button 
                                onClick={() => setField('mode', ProductMode.PRODUCT_ONLY)} 
                                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${mode === ProductMode.PRODUCT_ONLY ? 'bg-primary-500/20 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)] border border-primary-500/30' : 'text-slate-400 hover:text-primary-300'}`}
                            >
                                {ProductMode.PRODUCT_ONLY}
                            </button>
                            <button 
                                onClick={() => setField('mode', ProductMode.WITH_MODEL)} 
                                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${mode === ProductMode.WITH_MODEL ? 'bg-primary-500/20 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)] border border-primary-500/30' : 'text-slate-400 hover:text-primary-300'}`}
                            >
                                {ProductMode.WITH_MODEL}
                            </button>
                        </div>
                        
                        <AnimatePresence mode="wait">
                            <motion.div key={mode} initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -10}} transition={{ duration: 0.2 }} className="space-y-8">
                                
                                {/* Step 1: Upload Assets */}
                                <div>
                                    <StepHeader step={1} title="Unggah Foto Utama" description={mode === ProductMode.WITH_MODEL ? "Aset Produk & Sumber Model" : "Produk yang ingin difoto"} />
                                    
                                    <div className="space-y-6">
                                        <UploadSlot 
                                            image={productImage} 
                                            onUpload={img => setField('productImage', img)} 
                                            onRemove={() => setField('productImage', null)} 
                                            icon={<Package className="w-8 h-8" />} 
                                            title="Produk" 
                                            className="aspect-video"
                                        />

                                        {mode === ProductMode.WITH_MODEL && (
                                            <div className="pt-4 border-t border-white/10">
                                                <div className="flex p-1 bg-[#0f172a] border border-white/10 rounded-xl mb-4">
                                                    <button 
                                                        onClick={() => setField('modelSource', 'upload')}
                                                        className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${modelSource === 'upload' ? 'bg-primary-500/20 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)] border border-primary-500/30' : 'text-slate-400 hover:text-primary-300'}`}
                                                    >
                                                        Upload Model
                                                    </button>
                                                    <button 
                                                        onClick={() => setField('modelSource', 'ai')}
                                                        className={`flex-1 py-1.5 text-[10px] font-black uppercase rounded-lg transition-all ${modelSource === 'ai' ? 'bg-primary-500/20 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)] border border-primary-500/30' : 'text-slate-400 hover:text-primary-300'}`}
                                                    >
                                                        AI Generator
                                                    </button>
                                                </div>

                                                {modelSource === 'upload' ? (
                                                    <UploadSlot 
                                                        image={modelImage} 
                                                        onUpload={img => setField('modelImage', img)} 
                                                        onRemove={() => setField('modelImage', null)} 
                                                        icon={<User className="w-8 h-8" />} 
                                                        title="Model Sendiri" 
                                                        subtitle="Foto Orang Berpakaian"
                                                    />
                                                ) : (
                                                    <div className="grid grid-cols-2 gap-3 bg-[#0f172a] p-4 rounded-2xl border border-white/10">
                                                        <div>
                                                            <label className={labelClasses}>Gender</label>
                                                            <select 
                                                                value={modelAttributes.gender} 
                                                                onChange={e => setField('modelAttributes', { ...modelAttributes, gender: e.target.value })}
                                                                className={inputClasses}
                                                            >
                                                                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className={labelClasses}>Usia</label>
                                                            <select 
                                                                value={modelAttributes.age} 
                                                                onChange={e => setField('modelAttributes', { ...modelAttributes, age: e.target.value })}
                                                                className={inputClasses}
                                                            >
                                                                {AGES.map(a => <option key={a} value={a}>{a}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className={labelClasses}>Etnis</label>
                                                            <select 
                                                                value={modelAttributes.ethnicity} 
                                                                onChange={e => setField('modelAttributes', { ...modelAttributes, ethnicity: e.target.value })}
                                                                className={inputClasses}
                                                            >
                                                                {ETHNICITIES.map(e => <option key={e} value={e}>{e}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className={labelClasses}>Bentuk Tubuh</label>
                                                            <select 
                                                                value={modelAttributes.bodyType} 
                                                                onChange={e => setField('modelAttributes', { ...modelAttributes, bodyType: e.target.value })}
                                                                className={inputClasses}
                                                            >
                                                                {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Step 2: Branding/Watermark */}
                                <div className="pt-8 border-t border-white/10">
                                    <StepHeader step={2} title="Branding (Opsional)" description="Sematkan logo brand pada hasil foto" />
                                    <div className="flex justify-center lg:justify-start">
                                        <div className="w-full max-w-[240px]">
                                            <UploadSlot 
                                                image={logoImage} 
                                                onUpload={img => setField('logoImage', img)} 
                                                onRemove={() => setField('logoImage', null)} 
                                                icon={<SparklesIcon className="w-6 h-6" />} 
                                                title="Logo Brand" 
                                                subtitle="Transparan PNG"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3: Dimensions */}
                                <div className="pt-8 border-t border-white/10">
                                    <StepHeader step={3} title="Ukuran Hasil" />
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['1:1', '16:9', '9:16'] as AspectRatio[]).map(r => (
                                            <button 
                                                key={r} 
                                                onClick={() => setField('aspectRatio', r)} 
                                                className={`p-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all ${aspectRatio === r ? 'bg-primary-500/20 border-primary-500 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)]' : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-primary-500/50 hover:text-primary-300'}`}
                                            >
                                                {r === '1:1' ? <SquareIcon className="w-4 h-4"/> : r === '16:9' ? <RectangleHorizontalIcon className="w-4 h-4"/> : <RectangleVerticalIcon className="w-4 h-4"/>}
                                                <span className="text-[10px] font-black uppercase tracking-widest">{r}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Step 4: Art Style */}
                                <div className="pt-8 border-t border-white/10">
                                    <div className="flex justify-between items-center mb-6">
                                        <StepHeader step={4} title="Gaya Visual" />
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Booster</span>
                                            <button 
                                                onClick={() => setField('isBoosterMode', !isBoosterMode)}
                                                className={`w-9 h-5 rounded-full transition-all relative ${isBoosterMode ? 'bg-primary-500 shadow-[0_0_10px_rgba(0,212,255,0.5)]' : 'bg-slate-700'}`}
                                            >
                                                <div className={`absolute top-1 w-3 h-3 bg-slate-300 rounded-full transition-all ${isBoosterMode ? 'left-5' : 'left-1'}`}></div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(Object.values(StyleTheme)).map(s => (
                                            <button 
                                                key={s} 
                                                onClick={() => setField('style', s)} 
                                                disabled={isBoosterMode} 
                                                className={`py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${style === s && !isBoosterMode ? 'bg-primary-500/20 border-primary-500 text-primary-400 shadow-[0_0_10px_rgba(0,212,255,0.2)]' : 'bg-[#0f172a] border-slate-700 text-slate-400 hover:border-primary-500/50 hover:text-primary-300'} ${isBoosterMode ? 'opacity-30 cursor-not-allowed' : ''}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Action Area */}
                        <div className="pt-8">
                            <button 
                                onClick={handleGenerate} 
                                disabled={isGenerateDisabled} 
                                className="w-full relative group overflow-hidden flex justify-center items-center py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="relative flex items-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                            <span className="tracking-wide text-sm">{loadingMessage}</span>
                                        </>
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-5 h-5 group-hover:animate-pulse" />
                                            <span className="tracking-wide group-hover:text-white">{generateBtnText}</span>
                                        </>
                                    )}
                                </div>
                            </button>
                            {error && <p className="text-red-500 text-center text-[10px] font-bold uppercase tracking-tight bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 mt-4 animate-shake">{error}</p>}
                        </div>

                    </div>
                </aside>

                {/* Right Panel: Gallery */}
                <section className="flex-1 w-full glass-panel neon-border p-4 sm:p-8 rounded-2xl sm:rounded-[2.5rem] min-h-[400px] sm:min-h-[600px]">
                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/10">
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight neon-text">Studio Gallery</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {results.length > 0 ? `${results.length} Photos Generated` : "Ready to Render"}
                            </p>
                        </div>
                        {isLoading && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/30">
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_5px_rgba(0,212,255,0.8)]"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-400">Processing</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {results.length === 0 && !isLoading && (
                            <div className="col-span-full h-[400px] flex flex-col items-center justify-center text-slate-500 text-center">
                                <div className="w-24 h-24 bg-[#0f172a] rounded-3xl flex items-center justify-center mb-6 border border-dashed border-slate-600 rotate-3">
                                    <SparklesIcon className="w-10 h-10 opacity-30 text-primary-400" />
                                </div>
                                <h4 className="text-lg font-bold text-slate-400">Belum Ada Hasil</h4>
                                <p className="text-sm font-medium mt-1 opacity-70">Konfigurasi produk Anda di panel kiri untuk memulai.</p>
                            </div>
                        )}

                        {results.map(result => (
                            <div key={result.id} className={`relative rounded-[2rem] overflow-hidden bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIi8+CjxwYXRoIGQ9IkQwIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] shadow-[0_0_15px_rgba(0,212,255,0.1)] border border-primary-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:border-primary-400 group ${aspectClass}`}>
                                {result.status === 'loading' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]/80 backdrop-blur-sm animate-pulse">
                                        <div className="relative">
                                            <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <SparklesIcon className="w-4 h-4 text-primary-400 animate-pulse" />
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-primary-400 mt-4 uppercase tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">Rendering...</span>
                                    </div>
                                )}
                                {result.status === 'error' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-red-900/10 text-red-500 text-center border border-red-500/30">
                                        <X className="w-8 h-8 mb-4 opacity-50 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                                        <p className="text-xs font-bold uppercase tracking-tight leading-relaxed">{result.error}</p>
                                    </div>
                                )}
                                {result.status === 'done' && result.imageUrl && (
                                    <div className="relative w-full h-full">
                                        <img src={result.imageUrl} alt={result.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        
                                        {/* Actions Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                            <div className="flex gap-3">
                                                <button 
                                                    onClick={() => setPreview({isOpen: true, result})} 
                                                    className="flex-1 bg-[#0f172a] hover:bg-slate-800 text-white py-3 rounded-xl backdrop-blur-md transition-all border border-white/20 flex items-center justify-center gap-2"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                    <span className="text-xs font-bold">Preview</span>
                                                </button>
                                                <a 
                                                    href={result.imageUrl} 
                                                    download={`${result.name || 'digi-product'}.png`} 
                                                    className="flex-1 bg-primary-600 hover:bg-primary-500 text-white py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center justify-center gap-2"
                                                >
                                                    <DownloadIcon className="w-4 h-4" />
                                                    <span className="text-xs font-bold">Download</span>
                                                </a>
                                            </div>
                                        </div>

                                        {result.name && (
                                            <div className="absolute top-4 left-4 right-4 flex justify-start pointer-events-none">
                                                <span className="bg-[#020617]/60 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest truncate max-w-full shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                                                    {result.name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
            {preview.isOpen && preview.result?.status === 'done' && (
                 <div className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setPreview({isOpen: false, result: null})}>
                    <motion.div 
                        initial={{scale:0.9, opacity: 0}} 
                        animate={{scale:1, opacity: 1}} 
                        exit={{scale:0.9, opacity: 0}} 
                        className="relative max-w-5xl w-full max-h-full flex flex-col items-center" 
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,212,255,0.2)] bg-[#020617] border border-primary-500/30">
                            <img src={preview.result.imageUrl} alt={preview.result.name} className="max-w-full max-h-[80vh] object-contain"/>
                        </div>
                        
                        <button onClick={(e) => { e.stopPropagation(); setPreview({isOpen: false, result: null}); }} className="fixed top-6 right-4 md:top-8 md:right-8 text-white hover:text-primary-400 z-[110] transition-colors bg-black/60 hover:bg-black p-3 rounded-full backdrop-blur-md shadow-2xl border border-white/10">
                            <X className="w-6 h-6 drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]" />
                        </button>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <a 
                                href={preview.result.imageUrl} 
                                download={`${preview.result.name || 'digi-product'}.png`} 
                                className="flex items-center justify-center gap-3 px-10 py-4 bg-primary-600 text-white rounded-2xl font-black text-sm hover:bg-primary-500 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] active:scale-95 border border-primary-400/50"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                UNDUH GAMBAR
                            </a>
                        </div>
                    </motion.div>
                 </div>
            )}
            </AnimatePresence>
            <PromoCard />
        </div>
    );
};
