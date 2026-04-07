
import React from 'react';

export const PromoCard: React.FC = () => {
  return (
    <div className="mt-12 p-1 bg-gradient-to-r from-primary-500 via-fuchsia-500 to-gold-500 rounded-3xl shadow-[0_0_30px_rgba(217,70,239,0.3)] transform transition-all hover:scale-[1.01]">
      <div className="bg-[#020617] rounded-[20px] p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-3 tracking-tight neon-text">
            Ingin Hasil Lebih Pro? ✅
          </h3>
          <p className="text-slate-300 text-base lg:text-lg leading-relaxed">
            Jelajahi potensi <strong className="text-primary-400">Premium AI Tools</strong> kami. Ikuti tutorial profesional untuk mempelajari cara membuat konten menggunakan AI hingga siap digunakan untuk TikTok Affiliate.
          </p>
        </div>
        
        <div className="relative z-10 flex-shrink-0">
            <a
              href="https://aidigitrans.com/tutorialpro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white text-base font-bold rounded-2xl hover:bg-primary-500 transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.4)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] group"
            >
              <span>Tonton Tutorial Pro</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <p className="text-[10px] text-slate-500 mt-3 text-center font-medium uppercase tracking-wider">
                Dipercaya oleh 10.000+ Kreator
            </p>
        </div>
      </div>
    </div>
  );
};
