import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import type { ImageData } from '../types';
import { ImageUploader } from '../components/ImageUploader';
import { Spinner } from '../components/Spinner';
import { FeatureHeader } from '../components/FeatureHeader';
import { generateVirtualTryOn } from '../services/geminiService';
import { StepHeader } from '../components/StepHeader';
import { PromoCard } from '../components/PromoCard';
import { ZoomModal } from '../components/ZoomModal';
import { Download as DownloadIcon, Eye as ZoomIcon, RefreshCw, User, ShoppingBag, Info } from '../components/icons/LucideIcons';

export const VirtualTryOn: React.FC = () => {
    const { t } = useLanguage();
    
    // Input State
    const [modelImage, setModelImage] = useState<ImageData | null>(null);
    const [productImage, setProductImage] = useState<ImageData | null>(null);
    const [aspectRatio, setAspectRatio] = useState('3:4');
    
    // Result State
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingMsg, setLoadingMsg] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    // Zoom State
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

    // Dynamic Loading Messages effect
    useEffect(() => {
        let interval: number;
        if (isLoading) {
            const loadingMessages = [
                "Menganalisis fitur wajah model...",
                "Mengekstrak detail tekstur produk...",
                "Menyesuaikan pencahayaan studio...",
                "Mencocokkan ukuran dan dimensi...",
                "Merender visual fotorealistis...",
                "Memberi sentuhan akhir..."
            ];
            let msgIndex = 0;
            setLoadingMsg(loadingMessages[0]);
            interval = window.setInterval(() => {
                msgIndex = (msgIndex + 1) % loadingMessages.length;
                setLoadingMsg(loadingMessages[msgIndex]);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleGenerate = async () => {
        if (!modelImage) {
            setError("Harap unggah foto model (subjek) terlebih dahulu.");
            return;
        }
        if (!productImage) {
            setError("Harap unggah foto produk (objek) terlebih dahulu.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setResultImage(null);

        try {
            const result = await generateVirtualTryOn(
                productImage,
                modelImage,
                aspectRatio
            );
            setResultImage(result.imageUrl);
        } catch (e: any) {
            console.error(e);
            setError(e.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setModelImage(null);
        setProductImage(null);
        setResultImage(null);
        setIsLoading(false);
        setError(null);
    };

    const handleDownload = () => {
        if (resultImage) {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = `digi-tryon-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const isGenerateDisabled = isLoading || !modelImage || !productImage;
    
    const getAspectRatioClass = (ratio: string) => {
        switch (ratio) {
            case '1:1': return 'aspect-square';
            case '16:9': return 'aspect-video';
            case '9:16': return 'aspect-[9/16]';
            default: return 'aspect-[3/4]';
        }
    };
      
    return (
      <div className="w-full">
        <FeatureHeader
          title="Digi Try-On"
          description="Pakaikan produk Anda pada model apa pun secara virtual dengan presisi tinggi menggunakan fusi visual AI."
          tutorialLink="https://youtu.be/uIhpBgeiX2U"
        />

        {/* Use Guide Section from Snippet */}
        <div className="bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)] mb-6 sm:mb-8">
            <h3 className="font-bold text-white flex items-center gap-2 mb-3 neon-text">
                <Info className="w-5 h-5 text-primary-400" /> Cara Penggunaan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400">
                <div className="flex gap-3 items-start">
                    <span className="bg-primary-500/20 text-primary-400 border border-primary-500/30 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.2)]">1</span>
                    <p>Unggah foto model atau orang yang akan mengenakan produk.</p>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="bg-primary-500/20 text-primary-400 border border-primary-500/30 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.2)]">2</span>
                    <p>Unggah foto produk (pakaian, tas, atau aksesori).</p>
                </div>
                <div className="flex gap-3 items-start">
                    <span className="bg-primary-500/20 text-primary-400 border border-primary-500/30 font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.2)]">3</span>
                    <p>Klik "Hasilkan Gambar" dan biarkan AI memproses fusi visual.</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-start mb-8 sm:mb-12">
            {/* Model Upload */}
            <div className="flex flex-col gap-4 bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)]">
                <label className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider ml-1">
                    <User className="w-4 h-4 text-primary-400" /> Foto Model (Subjek)
                </label>
                <ImageUploader
                    onImageUpload={(dataUrl, mimeType) => setModelImage({ dataUrl, mimeType })}
                    uploadedImage={modelImage?.dataUrl || null}
                    label="Model Photo"
                    labelKey="uploader.modelLabel" 
                />
            </div>

            {/* Product Upload */}
            <div className="flex flex-col gap-4 bg-[#020617] glass-panel neon-border p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)]">
                <label className="font-bold text-white flex items-center gap-2 text-sm uppercase tracking-wider ml-1">
                    <ShoppingBag className="w-4 h-4 text-primary-400" /> Foto Produk (Objek)
                </label>
                <ImageUploader
                    onImageUpload={(dataUrl, mimeType) => setProductImage({ dataUrl, mimeType })}
                    uploadedImage={productImage?.dataUrl || null}
                    label="Product Photo"
                    labelKey="uploader.productLabel" 
                />
            </div>
        </div>

        {/* Action & Result Section */}
        <div className="flex flex-col items-center gap-8">
            <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className="w-full md:w-80 relative group overflow-hidden flex justify-center items-center py-4 px-8 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-fuchsia-600 shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-3">
                    {isLoading ? (
                        <>
                            <Spinner className="w-5 h-5 text-white" />
                            <span className="tracking-wide">Memproses...</span>
                        </>
                    ) : (
                        <span className="tracking-wide group-hover:text-white">Hasilkan Gambar</span>
                    )}
                </div>
            </button>

            <AnimatePresence mode="wait">
                {(isLoading || resultImage || error) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl bg-[#020617] glass-panel neon-border p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[3rem] shadow-[0_0_30px_rgba(0,212,255,0.05)] space-y-6 sm:space-y-8"
                    >
                        <div className="text-center">
                            <h3 className="text-2xl font-black text-white tracking-tight leading-none neon-text">Hasil Generate AI</h3>
                            <p className="text-sm text-slate-400 mt-2 font-medium uppercase tracking-widest">
                                {isLoading ? "Sedang merender visual..." : "Selesai!"}
                            </p>
                        </div>

                        <div className={`relative ${getAspectRatioClass(aspectRatio)} bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIi8+CjxwYXRoIGQ9IkQwIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] rounded-3xl overflow-hidden border border-primary-500/30 shadow-[inset_0_0_20px_rgba(0,212,255,0.05)] flex items-center justify-center p-4`}>
                            {isLoading && (
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                                    <p className="text-primary-400 font-bold animate-pulse uppercase tracking-widest text-xs drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">
                                        {loadingMsg}
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="flex flex-col items-center gap-4 text-center p-8">
                                    <div className="p-4 bg-red-900/20 rounded-full text-red-500 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                        <RefreshCw className="w-8 h-8 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                                    </div>
                                    <p className="text-red-400 font-bold text-sm leading-relaxed">{error}</p>
                                    <button onClick={handleGenerate} className="mt-2 px-6 py-2 bg-primary-600/20 text-primary-400 border border-primary-500/30 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-500/30 transition-all">Coba Lagi</button>
                                </div>
                            )}

                            {resultImage && !isLoading && (
                                <div className="relative w-full h-full group">
                                    <img src={resultImage} alt="Try On Result" className="w-full h-full object-contain rounded-2xl" />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => setIsZoomModalOpen(true)} className="p-3 bg-primary-500/20 border border-primary-500/50 text-primary-400 rounded-full hover:bg-primary-500/40 transition-all transform hover:scale-110 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                                            <ZoomIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {resultImage && !isLoading && (
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                <button
                                    onClick={handleDownload}
                                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-primary-600 to-fuchsia-600 text-white rounded-2xl font-black text-sm shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] active:scale-95"
                                >
                                    <DownloadIcon className="w-5 h-5" /> UNDUH GAMBAR
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#0f172a] border border-white/10 text-slate-300 rounded-2xl font-bold text-sm shadow-sm transition-all hover:bg-slate-800 hover:text-white"
                                >
                                    <RefreshCw className="w-5 h-5" /> BUAT ULANG
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        
        <PromoCard />
        <ZoomModal 
            isOpen={isZoomModalOpen}
            onClose={() => setIsZoomModalOpen(false)}
            imageUrl={resultImage || ''}
        />
      </div>
    );
};

export default VirtualTryOn;