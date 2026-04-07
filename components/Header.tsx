
import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { MenuIcon } from './icons/MenuIcon';
import { Logo } from './icons/Logo';
import { Lock, Languages } from 'lucide-react';
import { ApiKeysModal } from './ApiKeysModal';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [theme, toggleTheme] = useTheme();
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2">
      <div className="max-w-[1440px] mx-auto glass-panel neon-border rounded-2xl transition-all duration-300">
        <div className="relative flex items-center h-16 px-4 sm:px-6">
          
          {/* Mobile Menu Button - Left Aligned */}
          <div className="flex-shrink-0 lg:hidden z-20">
             <button
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-primary-400 hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
          
          {/* Logo - Centered on Mobile (Absolute), Left on Desktop (Static/Flex) */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:static lg:transform-none lg:left-auto lg:top-auto lg:flex-1 lg:flex lg:justify-start">
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer select-none">
              <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-transparent group-hover:scale-105 transition-all duration-300">
                <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-none whitespace-nowrap dark:neon-text">
                  AIDIGITRANS.<span className="text-primary-500 dark:text-primary-400">COM</span>
                </span>
                <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-fuchsia-600 dark:text-fuchsia-400 uppercase mt-0.5 hidden sm:block">
                  AI Digi Creative Studio
                </span>
              </div>
            </div>
          </div>

          {/* Right Actions - Right Aligned */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto z-20">
            <button
              onClick={toggleLanguage}
              className="p-2.5 rounded-xl text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-200 dark:hover:bg-white/5 dark:hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] border border-transparent hover:border-primary-500/30 transition-all duration-200 flex items-center gap-2"
              title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Languages className="w-5 h-5" />
              <span className="text-xs font-bold uppercase hidden sm:block">{language}</span>
            </button>
            <button
              onClick={() => setIsApiModalOpen(true)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-200 dark:hover:bg-white/5 dark:hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] border border-transparent hover:border-primary-500/30 transition-all duration-200"
              title="Pengaturan API Key"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-200 dark:hover:bg-white/5 dark:hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] border border-transparent hover:border-primary-500/30 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </div>
      <ApiKeysModal isOpen={isApiModalOpen} onClose={() => setIsApiModalOpen(false)} />
    </header>
  );
};
