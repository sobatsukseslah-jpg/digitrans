import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { AppLogoIcon } from './icons/AppLogoIcon';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const FeatureItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
    <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 group">
        <div className="mt-1 p-2 bg-primary-500/20 rounded-xl flex-shrink-0 border border-primary-500/30 group-hover:scale-110 transition-transform">
             <SparklesIcon className="w-4 h-4 text-primary-400" />
        </div>
        <div className="text-left">
            <span className="block font-bold text-white text-sm mb-1 group-hover:text-primary-300 transition-colors">{title}</span>
            <span className="text-slate-400 text-xs leading-relaxed">{desc}</span>
        </div>
    </div>
);

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, featureName = "Fitur Pro" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-3xl overflow-hidden flex flex-col rounded-[2.5rem] relative transform animate-slide-up shadow-[0_0_50px_rgba(0,212,255,0.2)]">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[#020617]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        {/* Decorative Border */}
        <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-primary-500/30 pointer-events-none z-50"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-50 z-50"></div>

        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary-400 transition-all backdrop-blur-sm border border-white/10 group"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* Main Content Area */}
        <div className="relative z-10 flex flex-col items-center text-center pt-12 px-6 md:px-12 pb-8 overflow-y-auto custom-scrollbar max-h-[85vh]">
            
            {/* Header Icon */}
            <div className="relative mb-6 group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-fuchsia-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-600 to-fuchsia-700 flex items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.4)] ring-1 ring-primary-500/50 transform group-hover:scale-105 transition-transform duration-500">
                    <AppLogoIcon className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-gold-400 text-[#020617] text-xs font-black rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] border-2 border-[#020617] transform rotate-12">
                    PRO
                </div>
            </div>

            {/* Title & Date */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-3 neon-text">
                Holaa! 👋
            </h2>
            <div className="max-w-lg mx-auto mb-8">
                <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-4">
                    Fitur <span className="font-bold text-primary-400 border-b border-primary-500/50">{featureName}</span> akan rilis gratis pada:
                </p>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                    <span className="text-sm md:text-base font-bold text-white tracking-wide">31 Januari 2026</span>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20 uppercase tracking-wider">Gratis Update</span>
                </div>
                
                {/* Updated Card Style: Brighter, Solid, High Contrast */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-primary-900/40 to-fuchsia-900/40 border border-primary-500/30 shadow-[0_0_20px_rgba(0,212,255,0.15)] transform hover:-translate-y-1 transition-transform duration-300">
                    <p className="text-sm md:text-base text-white leading-relaxed font-medium">
                        🚀 Mau akses duluan sebelum tanggal 31 Januari? <br className="hidden md:block"/>
                        <span className="font-extrabold text-gold-400">Upgrade sekarang</span> dan nikmati kecanggihannya tanpa perlu menunggu lama!
                    </p>
                </div>
            </div>

            {/* Feature Showcase Grid */}
            <div className="w-full bg-gradient-to-b from-primary-900/20 to-[#020617] rounded-3xl p-1 border border-primary-500/20 mb-8">
                <div className="bg-[#020617]/80 backdrop-blur-xl rounded-[1.3rem] p-4 sm:p-6">
                    <div className="flex items-center justify-center gap-2 mb-6 opacity-90">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary-500/50"></div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-300">Unlock All Access</p>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary-500/50"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-6">
                        Upgrade ke <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-fuchsia-400 to-gold-400">AIDIGITRANS.COM Pro</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                        <FeatureItem title="Digi POV Studio" desc="Foto produk realistis dari sudut pandang tangan." />
                        <FeatureItem title="Digi Lifestyle" desc="Pemotretan lifestyle natural dengan model AI." />
                        <FeatureItem title="Digi Listing" desc="Infografis produk profesional untuk marketplace." />
                        <FeatureItem title="Digi Background" desc="Ganti latar belakang produk secara instan." />
                        <FeatureItem title="Digi Photoshoot" desc="Ubah foto biasa jadi potret studio Cinematic." />
                        <FeatureItem title="Digi Mockup" desc="Tempel desain ke produk nyata dalam sekejap." />
                    </div>
                </div>
            </div>

            {/* Pricing & CTA */}
            <div className="w-full flex flex-col items-center gap-6">
                
                {/* Centered Price - Removed animation/shimmer, made solid white */}
                <div className="flex flex-col items-center text-center">
                    <p className="text-sm font-medium text-slate-300 mb-1">Hanya nambah</p>
                    <span className="text-6xl md:text-7xl font-display font-black text-white tracking-tighter neon-text mb-2">
                        47rb
                    </span>
                    <p className="text-sm text-slate-400 font-medium max-w-xs mx-auto">
                        Dapatkan akses duluan daripada temanmu! 🚀
                    </p>
                </div>

                <a 
                    href="https://aidigitrans.com/c/checkout?variant_ids=414075&qty=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative w-full md:w-3/4 group overflow-hidden rounded-2xl p-0.5 transition-transform active:scale-[0.98] hover:-translate-y-1 duration-300"
                >
                    <div className="relative bg-gradient-to-r from-primary-600 to-fuchsia-600 h-full w-full rounded-xl flex items-center justify-center gap-3 py-4 md:py-5 px-8 shadow-[0_0_20px_rgba(217,70,239,0.4)] group-hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]">
                        <div className="absolute inset-0 bg-white/10 group-hover:opacity-0 transition-opacity"></div>
                        <SparklesIcon className="w-6 h-6 text-white animate-pulse" />
                        <span className="text-xl font-extrabold text-white tracking-wide text-shadow">Upgrade Sekarang</span>
                    </div>
                </a>
                
                <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/1200px-QRIS_logo.svg.png" alt="QRIS" className="h-4 object-contain brightness-0 invert" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="DANA" className="h-3 object-contain brightness-0 invert" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png" alt="OVO" className="h-3 object-contain brightness-0 invert" />
                    <span className="text-[10px] text-slate-400 font-medium">+ Bank Transfer</span>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};