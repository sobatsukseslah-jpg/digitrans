import React, { useState } from 'react';
import type { View } from '../../App';
import { PhotoStudioIcon } from '../icons/PhotoStudioIcon';
import { TryOnIcon } from '../icons/TryOnIcon';
import { AdCreatorIcon } from '../icons/AdCreatorIcon';
import { useLanguage } from '../../contexts/LanguageContext';
import { MergeProductIcon } from '../icons/MergeProductIcon';
import { LifestylePhotoshootIcon } from '../icons/LifestylePhotoshootIcon';
import { PovStudioIcon } from '../icons/PovStudioIcon';
import { ListingIcon } from '../icons/ListingIcon';
import { BackgroundChangerIcon } from '../icons/BackgroundChangerIcon';
import { BRollIcon } from '../icons/BRollIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { CarouselIcon } from '../icons/CarouselIcon';
import { FashionIcon } from '../icons/FashionIcon';
import { FusionIcon } from '../icons/FusionIcon';
import { ModelIcon } from '../icons/ModelIcon';
import { PoseIcon } from '../icons/PoseIcon';
import { RestoreIcon } from '../icons/RestoreIcon';
import { FilmIcon } from '../icons/FilmIcon';
import { DigiVideoIcon } from '../icons/DigiVideoIcon';
import { VoiceIcon } from '../icons/VoiceIcon';
import { MockupIcon } from '../icons/MockupIcon';
import { DigiPhotoshootIcon } from '../icons/DigiPhotoshootIcon';
import { LicenseModal } from '../LicenseModal';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, isDisabled }) => {
  const baseClasses = "group flex items-center w-full px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-xl mb-1 relative overflow-hidden";
  const activeClasses = "bg-primary-500/20 text-primary-400 shadow-[0_0_15px_rgba(0,212,255,0.2)] ring-1 ring-primary-500/50 backdrop-blur-sm";
  const inactiveClasses = "text-slate-400 hover:bg-[#0f172a] hover:text-slate-200";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${isDisabled ? disabledClasses : ''}`}
    >
      <span className={`mr-3 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
          className: `w-5 h-5 transition-colors duration-300 ${isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-slate-300'}`
        })}
      </span>
      <span className="tracking-wide truncate mr-2">{label}</span>

      {isActive && (
        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary-400 shadow-[0_0_8px_2px_rgba(0,212,255,0.5)]"></div>
      )}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isMobileOpen, onMobileClose }) => {
    const { t } = useLanguage();
    const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
    
    const menuGroups = [
      {
        title: "AI DIGI CREATIVE STUDIO",
        items: [
          { id: 'virtualTryOn', label: t('sidebar.virtualTryOn'), icon: <TryOnIcon /> },
          { id: 'productStudio', label: t('sidebar.productStudio'), icon: <PhotoStudioIcon /> },
          { id: 'digiPhotoshoot', label: t('sidebar.digiPhotoshoot'), icon: <DigiPhotoshootIcon /> },
          { id: 'mockupGenerator', label: t('sidebar.mockupGenerator'), icon: <MockupIcon /> },
          { id: 'digiModel', label: t('sidebar.digiModel'), icon: <ModelIcon /> },
          { id: 'digiFashion', label: t('sidebar.digiFashion'), icon: <FashionIcon /> },
          { id: 'digiBRoll', label: t('sidebar.digiBRoll'), icon: <BRollIcon /> },
          { id: 'povStudio', label: t('sidebar.povStudio'), icon: <PovStudioIcon /> },
          { id: 'lifestylePhotoshoot', label: t('sidebar.lifestylePhotoshoot'), icon: <LifestylePhotoshootIcon /> },
        ]
      },
      {
        title: "PHOTO EDITOR",
        items: [
          { id: 'digiFaceSwap', label: t('sidebar.digiFaceSwap'), icon: <SparklesIcon /> },
          { id: 'digiPose', label: t('sidebar.digiPose'), icon: <PoseIcon /> },
          { id: 'digiGenEditor', label: t('sidebar.digiGenEditor'), icon: <SparklesIcon /> },
          { id: 'digiRestore', label: t('sidebar.digiRestore'), icon: <RestoreIcon /> },
          { id: 'digiFusion', label: t('sidebar.digiFusion'), icon: <FusionIcon /> },
          { id: 'mergeProduct', label: t('sidebar.mergeProduct'), icon: <MergeProductIcon /> },
          { id: 'backgroundChanger', label: t('sidebar.backgroundChanger'), icon: <BackgroundChangerIcon /> },
        ]
      },
      {
        title: "CATALOG & MARKETING",
        items: [
          { id: 'digiCarousel', label: t('sidebar.digiCarousel'), icon: <CarouselIcon /> },
          { id: 'adCreator', label: t('sidebar.adCreator'), icon: <AdCreatorIcon /> },
          { id: 'listingStudio_marketing', targetView: 'listingStudio', label: t('sidebar.listingStudio'), icon: <ListingIcon /> },
        ]
      },
      {
        title: "CREATIVE SUITE",
        items: [
          { id: 'digiVideo', label: t('sidebar.digiVideo'), icon: <DigiVideoIcon /> },
          { id: 'digiStoryboard', label: t('sidebar.digiStoryboard'), icon: <FilmIcon /> },
          { id: 'digiVoice', label: t('sidebar.digiVoice'), icon: <VoiceIcon /> },
        ]
      }
    ];

    const handleNavItemClick = (view: View) => {
        setActiveView(view);
        onMobileClose();
    };

    return (
        <aside className={`
            fixed top-0 left-0 z-50 h-full w-[280px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:w-64 lg:z-30 lg:translate-x-0
            ${isMobileOpen ? 'translate-x-0 bg-[#020617]/95 backdrop-blur-xl border-r border-primary-500/30' : '-translate-x-full lg:bg-transparent'}
        `}>
            <div className="h-full flex flex-col bg-[#020617]/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-0 shadow-[0_0_30px_rgba(0,212,255,0.1)] lg:shadow-none">
                {isMobileOpen && (
                    <div className="flex items-center justify-between p-4 mb-2 lg:hidden">
                         <span className="text-xl font-display font-bold text-white flex items-center gap-1 neon-text">
                            AIDIGITRANS.<span className="text-primary-400">COM</span>
                        </span>
                        <button onClick={onMobileClose} className="p-2 rounded-lg text-slate-400 hover:bg-[#0f172a] transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                )}

                <nav className="flex-1 overflow-y-auto custom-scrollbar pb-2 lg:glass-panel lg:neon-border lg:border-b-0 lg:rounded-t-2xl transition-all duration-300">
                    <div className="p-3 space-y-6">
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <div className="px-3 py-2 mb-1">
                                    <h3 className="text-[10px] font-extrabold text-primary-500/70 uppercase tracking-widest">{group.title}</h3>
                                </div>
                                <ul className="space-y-0.5">
                                    {group.items.map((item) => {
                                        const viewId = (item.targetView || item.id) as View;
                                        return (
                                            <li key={item.id}>
                                                <NavItem
                                                    icon={item.icon}
                                                    label={item.label}
                                                    isActive={activeView === viewId}
                                                    onClick={() => handleNavItemClick(viewId)}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </nav>
                
                <div className="p-4 mt-auto lg:glass-panel lg:neon-border lg:border-t-0 lg:rounded-b-2xl border-t lg:border-t-0 border-primary-500/20 relative z-20">
                    <div className="bg-gradient-to-br from-primary-900/40 to-fuchsia-900/20 rounded-2xl border border-primary-500/30 shadow-[0_0_15px_rgba(0,212,255,0.1)] backdrop-blur-md overflow-hidden group">
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary-400 mb-1">
                                    App Version
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-200">v1.1.0</span>
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-fuchsia-600 text-white border border-fuchsia-400/50 shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                                        PRO
                                    </span>
                                </div>
                                <p className="text-[9px] font-medium text-slate-500 mt-1 italic tracking-tight">
                                    last update 15 maret 2026
                                </p>
                            </div>

                            <button
                                onClick={() => setIsLicenseModalOpen(true)}
                                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0f172a] border border-white/10 text-slate-400 hover:text-primary-400 hover:border-primary-500/50 hover:shadow-[0_0_10px_rgba(0,212,255,0.3)] transition-all duration-200 group-hover:shadow-md active:scale-95"
                                aria-label="License & Info"
                                title="License & Info"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <LicenseModal isOpen={isLicenseModalOpen} onClose={() => setIsLicenseModalOpen(false)} />
        </aside>
    );
}