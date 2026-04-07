import React, { useState, useId } from 'react';
import { UploadedImage } from '../types';
import { generateFaceSwap } from '../services/geminiService'; 
import { Upload, Sparkles, Download, Copy, Check, Video } from '../components/icons/LucideIcons';
import Loader from '../components/Loader';
import { FeatureHeader } from '../components/FeatureHeader';
import { PromoCard } from '../components/PromoCard';
import { ZoomModal } from '../components/ZoomModal';

// Declare heic2any
declare const heic2any: any;

interface FaceSwapImageData {
    base64: string;
    mimeType: string;
    url: string;
}

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

const UploadBox: React.FC<{
    title: string;
    onUpload: (data: FaceSwapImageData) => void;
    previewUrl: string | null;
}> = ({ title, onUpload, previewUrl }) => {
    const inputId = useId();

    const handleFile = async (file: File) => {
        if (file) {
            try {
                const processedFile = await convertHeicToJpg(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    const url = e.target?.result as string;
                    const parts = url.split(',');
                    const mimeType = processedFile.type || 'image/jpeg';
                    const base64 = parts[1];
                    onUpload({ base64, mimeType, url });
                };
                reader.readAsDataURL(processedFile);
            } catch (err) {
                console.error("Upload failed", err);
            }
        }
    };
    
    return (
        <label htmlFor={inputId} className="cursor-pointer flex flex-col p-4 text-center bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 h-80 group">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 shrink-0 uppercase tracking-wide">{title}</h3>
            <div className="flex-grow flex flex-col items-center justify-center min-h-0 relative">
                {previewUrl ? (
                    <img src={previewUrl} className="max-w-full max-h-full object-contain rounded-lg shadow-sm" />
                ) : (
                    <div className="text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors">
                        <div className="w-12 h-12 mb-3 mx-auto"><Upload className="w-full h-full" /></div>
                        <p className="mt-2 text-sm font-medium">Klik untuk mengunggah</p>
                    </div>
                )}
            </div>
            <input id={inputId} type="file" className="sr-only" accept="image/png, image/jpeg, image/webp, .heic, .HEIC" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
        </label>
    );
};

const DigiFaceSwap: React.FC = () => {
    const [targetData, setTargetData] = useState<FaceSwapImageData | null>(null);
    const [faceData, setFaceData] = useState<FaceSwapImageData | null>(null);
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedData, setGeneratedData] = useState<{ src: string } | null>(null);
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
    const [zoomImageUrl, setZoomImageUrl] = useState('');

    // Video Prompt State
    const [videoDuration, setVideoDuration] = useState('5s');
    const [videoPrompts, setVideoPrompts] = useState<string[]>([]);
    const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    
    const handleGenerate = async () => {
        if (!targetData || !faceData) return;

        setIsLoading(true);
        setError(null);
        setGeneratedData(null);
        setVideoPrompts([]); // Reset video prompts on new generation
        
        try {
            const result = await generateFaceSwap(
                { base64: targetData.base64, mimeType: targetData.mimeType },
                { base64: faceData.base64, mimeType: faceData.mimeType },
                aspectRatio
            );
            
            setGeneratedData({ src: result.imageUrl });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateVideoPrompts = () => {
        setIsGeneratingPrompts(true);
        
        // Simulate a slight delay for better UX
        setTimeout(() => {
            const durationText = `${videoDuration.replace('s', '')} detik`;
            
            const prompt1 = `Kamera sepenuhnya terkunci dan tidak bergerak sama sekali, sehingga hanya model saja yang bergerak. Background statis tanpa distorsi. Model tersenyum dengan percaya diri dan menatap lurus ke lensa kamera. Model perlahan mencondongkan wajah sedikit ke depan, mengangkat tangan kanan untuk memegang dagu dengan elegan, lalu menurunkan tangan kanan kembali. Setelah itu, model mengangkat tangan kiri dan melambaikan tangan kiri secara perlahan. Gerakan sangat natural, stabil, dan konsisten berdurasi ${durationText}. Model seratus persen membisu, bibir tertutup rapat, tidak bicara, tidak bergumam, dan tidak mengeluarkan suara.`;
            
            const prompt2 = `Kamera sepenuhnya terkunci dan tidak bergerak sama sekali, sehingga hanya model saja yang bergerak. Pengambilan gambar sinematik, background statis. Model memberikan tatapan karismatik ke arah kamera dengan senyum tipis yang menawan. Model perlahan mengangkat tangan kanan untuk merapikan sisi kanan rambutnya (atau kerah baju sebelah kanan) dengan gaya elegan, kemudian mengembalikan tangan kanan ke posisi semula di bawah frame. Transisi gerakan sangat halus, presisi, dan stabil selama ${durationText} tanpa glitch pada jari. Model sepenuhnya diam membisu, bibir tertutup rapat tanpa ada gerakan berbicara atau bergumam.`;
            
            const prompt3 = `Kamera sepenuhnya terkunci dan tidak bergerak sama sekali, sehingga hanya model saja yang bergerak. Background statis tanpa distorsi. Model tersenyum ramah, lalu perlahan menolehkan kepala ke arah kiri, menahan posisi sejenak, kemudian menolehkan kepala ke arah kanan dengan gerakan yang sangat halus dan natural. Setelah itu, model kembali menatap lurus ke arah kamera. Gerakan sangat presisi dan identik, tidak ada glitch pada anatomi wajah, berdurasi ${durationText}. Model diam membisu seratus persen, bibir tidak bergerak, tidak ada suara atau gumaman.`;
            
            setVideoPrompts([prompt1, prompt2, prompt3]);
            setIsGeneratingPrompts(false);
        }, 800);
    };

    const handleCopyPrompt = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const openZoom = (url: string) => {
        setZoomImageUrl(url);
        setIsZoomModalOpen(true);
    };

    const handleDownloadBoth = () => {
        if (!targetData || !generatedData) return;

        // Download Target Image
        const linkTarget = document.createElement('a');
        linkTarget.href = targetData.url;
        linkTarget.download = 'digi_faceswap_target.png';
        document.body.appendChild(linkTarget);
        linkTarget.click();
        document.body.removeChild(linkTarget);

        // Download Result Image with a slight delay to ensure browser allows multiple downloads
        setTimeout(() => {
            const linkResult = document.createElement('a');
            linkResult.href = generatedData.src;
            linkResult.download = 'digi_faceswap_result.png';
            document.body.appendChild(linkResult);
            linkResult.click();
            document.body.removeChild(linkResult);
        }, 300);
    };

    // Helper to get aspect ratio class for the container
    const getAspectRatioClass = () => {
        if (aspectRatio === '16:9') return 'aspect-video';
        if (aspectRatio === '9:16') return 'aspect-[9/16]';
        return 'aspect-square';
    };
    
    return (
        <>
        <div className="w-full mx-auto">
            <FeatureHeader 
                title="Digi Face Swap" 
                description="Tukar wajah dengan mudah dan realistis menggunakan AI." 
            />
            
            <div className="mb-8 p-6 bg-violet-50/80 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-[2rem] backdrop-blur-sm">
                <h2 className="text-base font-bold text-violet-800 dark:text-violet-200 mb-3 flex items-center gap-2">
                    <div className="h-6 w-6 text-violet-500 dark:text-violet-400"><Sparkles className="w-full h-full" /></div>
                    Cara Penggunaan
                </h2>
                <ol className="list-decimal list-inside text-sm text-violet-700 dark:text-violet-300 space-y-1.5 pl-2 font-medium">
                    <li>Unggah <span className="font-bold">Foto Target</span> (model atau orang yang akan diubah wajahnya).</li>
                    <li>Unggah <span className="font-bold">Foto Wajah Referensi</span> (wajah selebriti atau karakter yang ingin digunakan).</li>
                    <li>Pilih <span className="font-bold">Ukuran Gambar</span> yang diinginkan.</li>
                    <li>Klik <span className="font-bold">"Hasilkan Gambar"</span> dan biarkan AI memproses Face Swap secara mulus dan realistis.</li>
                </ol>
            </div>

            <div className="bg-[#020617] glass-panel neon-border p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-[0_0_30px_rgba(0,212,255,0.05)]">
                <main>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                        <UploadBox title="1. Unggah Foto Target (Model/Orang)" onUpload={setTargetData} previewUrl={targetData?.url || null} />
                        <UploadBox title="2. Unggah Foto Wajah (Referensi/Selebriti)" onUpload={setFaceData} previewUrl={faceData?.url || null} />
                    </div>
                    
                    <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-slate-700/50">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wide">3. Pilih Ukuran Gambar</h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {['1:1', '9:16', '16:9'].map((ratio) => (
                                <button
                                    key={ratio}
                                    onClick={() => setAspectRatio(ratio)}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all duration-300 ${
                                        aspectRatio === ratio 
                                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                    }`}
                                >
                                    {ratio}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <button 
                            onClick={handleGenerate} 
                            disabled={!targetData || !faceData || isLoading} 
                            className="w-full max-w-md bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-violet-500 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="tracking-wide">Memproses Face Swap...</span>
                                </div>
                            ) : (
                                <span className="tracking-wide text-lg">✨ Hasilkan Gambar</span>
                            )}
                        </button>
                    </div>

                    <div className="w-full min-h-[24rem] bg-slate-50 dark:bg-slate-800/30 rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-200 dark:border-white/5">
                        {isLoading && <Loader message="Memproses Face Swap..." />}
                        {error && <p className="text-red-500 text-center bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">{error}</p>}
                        
                        {generatedData && targetData && (
                            <div className="w-full animate-fade-in">
                                <h3 className="text-xl font-bold text-center mb-8 text-slate-900 dark:text-white">Hasil Face Swap Anda</h3>
                                
                                {/* Side-by-side comparison */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
                                    {/* Target Image */}
                                    <div className="flex flex-col items-center">
                                        <p className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-wider">Foto Target</p>
                                        <div 
                                            className={`relative w-full ${getAspectRatioClass()} rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] border border-white/5 bg-[#0f172a] group cursor-pointer`}
                                            onClick={() => openZoom(targetData.url)}
                                        >
                                            <img src={targetData.url} className="w-full h-full object-contain" alt="Target" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Perbesar</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Result Image */}
                                    <div className="flex flex-col items-center">
                                        <p className="text-sm font-bold text-primary-400 mb-3 uppercase tracking-wider">Hasil Face Swap</p>
                                        <div 
                                            className={`relative w-full ${getAspectRatioClass()} rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,212,255,0.15)] border border-primary-500/30 bg-[#0f172a] group cursor-pointer`}
                                            onClick={() => openZoom(generatedData.src)}
                                        >
                                            <img src={generatedData.src} className="w-full h-full object-contain" alt="Result" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">Perbesar</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center mb-12">
                                    <button 
                                        onClick={handleDownloadBoth}
                                        className="flex items-center gap-2 px-8 py-4 bg-[#0f172a] text-primary-400 rounded-xl font-bold hover:bg-slate-800 transition-colors duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,212,255,0.2)] border border-primary-500/20"
                                    >
                                      <Download className="w-5 h-5" /> Unduh Hasil Gambar
                                    </button>
                                </div>

                                {/* Image to Video Prompt Section */}
                                <div className="w-full max-w-4xl mx-auto bg-slate-900/60 border border-fuchsia-500/20 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(217,70,239,0.05)]">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                                            <Video className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Jadikan Video (Image to Video)</h3>
                                            <p className="text-sm text-slate-400">Buat prompt untuk menganimasikan hasil Face Swap Anda</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                                        <div className="flex items-center gap-3 bg-slate-800/80 p-2 rounded-xl border border-white/5">
                                            <span className="text-sm font-medium text-slate-300 pl-2">Durasi:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {['5s', '6s', '7s', '8s', '10s'].map((dur) => (
                                                    <button
                                                        key={dur}
                                                        onClick={() => setVideoDuration(dur)}
                                                        className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                                            videoDuration === dur 
                                                            ? 'bg-fuchsia-600 text-white shadow-md' 
                                                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                                        }`}
                                                    >
                                                        {dur.replace('s', '')} Detik
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <button 
                                            onClick={handleGenerateVideoPrompts}
                                            disabled={isGeneratingPrompts}
                                            className="px-6 py-3 bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 rounded-xl font-bold hover:bg-fuchsia-600/30 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isGeneratingPrompts ? (
                                                <><div className="w-4 h-4 border-2 border-fuchsia-400/30 border-t-fuchsia-400 rounded-full animate-spin"></div> Memproses...</>
                                            ) : (
                                                <><Sparkles className="w-4 h-4" /> Buat Prompt Video</>
                                            )}
                                        </button>
                                    </div>

                                    {videoPrompts.length > 0 && (
                                        <div className="space-y-4 animate-fade-in">
                                            {videoPrompts.map((prompt, index) => (
                                                <div key={index} className="bg-[#020617] p-5 rounded-2xl border border-slate-800 relative group">
                                                    <div className="absolute top-0 right-0 p-3">
                                                        <button 
                                                            onClick={() => handleCopyPrompt(prompt, index)}
                                                            className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold"
                                                        >
                                                            {copiedIndex === index ? (
                                                                <><Check className="w-4 h-4 text-green-400" /> Tersalin</>
                                                            ) : (
                                                                <><Copy className="w-4 h-4" /> Salin</>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <h4 className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider mb-2">Opsi Prompt {index + 1}</h4>
                                                    <p className="text-slate-300 text-sm leading-relaxed pr-24">{prompt}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {!isLoading && !error && !generatedData && (
                            <div className="text-center text-slate-400 dark:text-slate-500">
                                <div className="w-20 h-20 bg-[#0f172a] rounded-3xl flex items-center justify-center mb-4 border border-dashed border-slate-600 rotate-3 mx-auto">
                                    <Upload className="w-8 h-8 opacity-40" />
                                </div>
                                <p className="font-bold opacity-70">Hasil gambar akan muncul di sini.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <PromoCard />
        </div>
        <ZoomModal isOpen={isZoomModalOpen} onClose={() => setIsZoomModalOpen(false)} imageUrl={zoomImageUrl} />
        </>
    );
};

export default DigiFaceSwap;
