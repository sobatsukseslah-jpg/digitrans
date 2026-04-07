
import React, { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Sidebar } from './Sidebar';
import type { View } from '../../App';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setActiveView: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-200">
      <Header 
        onMenuClick={() => setMobileSidebarOpen(true)} 
      />
      
      <div className="flex flex-grow w-full max-w-[1440px] mx-auto relative pt-4 sm:pt-6 px-3 sm:px-6 lg:px-8 gap-4 sm:gap-6 lg:gap-8">
        {/* Overlay for mobile */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}
        
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />
        
        <main className="flex-1 min-w-0 pb-12 animate-fade-in relative z-10">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
