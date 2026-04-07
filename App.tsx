import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Layout } from './components/layout/Layout';
import { ProductStudio } from './pages/ProductStudio';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { VirtualTryOn } from './pages/VirtualTryOn';
import { AdCreator } from './pages/AdCreator';
import { MergeProduct } from './pages/MergeProduct';
import { LifestylePhotoshoot } from './pages/LifestylePhotoshoot';
import { DigitalImaging } from './pages/DigitalImaging';
import { PovStudio } from './pages/PovStudio';
import { MirrorSelfie } from './pages/MirrorSelfie';
import { ListingStudio } from './pages/ListingStudio';
import { PerspectiveStudio } from './pages/PerspectiveStudio';
import { BackgroundChanger } from './pages/BackgroundChanger';
import { VideoStudio as VideoStudioPage } from './pages/VideoStudio';
import DigiBRoll from './pages/DigiBRoll';
import DigiEditor from './pages/DigiEditor';
import DigiCarousel from './pages/DigiCarousel';
import DigiFashion from './pages/DigiFashion';
import DigiFaceSwap from './pages/DigiFaceSwap';
import DigiFusion from './pages/DigiFusion';
import DigiModel from './pages/DigiModel';
import DigiPose from './pages/DigiPose';
import DigiRestore from './pages/DigiRestore';
import DigiStoryboard from './pages/DigiStoryboard';
import DigiVideoGenerator from './pages/DigiVideoGenerator';
import DigiVoiceStudio from './pages/DigiVoiceStudio';
import { MockupGenerator } from './pages/MockupGenerator';
import { DigiPhotoshoot } from './pages/DigiPhotoshoot';
import AgreementModal from './components/AgreementModal';

export type View = 'productStudio' | 'virtualTryOn' | 'lifestylePhotoshoot' | 'mergeProduct' | 'digitalImaging' | 'adCreator' | 'povStudio' | 'mirrorStudio' | 'listingStudio' | 'perspectiveStudio' | 'backgroundChanger' | 'videoStudio' | 'digiBRoll' | 'digiGenEditor' | 'digiCarousel' | 'digiFashion' | 'digiFaceSwap' | 'digiFusion' | 'digiModel' | 'digiPose' | 'digiRestore' | 'digiStoryboard' | 'digiVideo' | 'digiVoice' | 'mockupGenerator' | 'digiPhotoshoot';

function AppContent() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<View>('virtualTryOn');
  
  // State untuk melacak view mana saja yang sudah pernah dibuka (lazy load)
  const [visitedViews, setVisitedViews] = useState<Set<View>>(new Set(['virtualTryOn']));

  const handleNavigate = (view: View) => {
    // Tandai view sebagai dikunjungi agar komponennya di-mount (jika belum)
    setVisitedViews(prev => {
      const next = new Set(prev);
      next.add(view);
      return next;
    });
    setActiveView(view);
  };

  // Fungsi helper untuk merender komponen berdasarkan ID
  const renderViewComponent = (viewId: View) => {
    switch (viewId) {
      case 'productStudio': return <ProductStudio onNavigate={handleNavigate} />;
      case 'virtualTryOn': return <VirtualTryOn />;
      case 'lifestylePhotoshoot': return <LifestylePhotoshoot />;
      case 'mergeProduct': return <MergeProduct />;
      case 'digitalImaging': return <DigitalImaging />;
      case 'adCreator': return <AdCreator />;
      case 'digiGenEditor': return <DigiEditor />;
      case 'videoStudio': return <VideoStudioPage />;
      case 'povStudio': return <PovStudio />;
      case 'mirrorStudio': return <MirrorSelfie />;
      case 'listingStudio': return <ListingStudio />;
      case 'perspectiveStudio': return <PerspectiveStudio />;
      case 'backgroundChanger': return <BackgroundChanger />;
      case 'digiBRoll': return <DigiBRoll onNavigate={handleNavigate} />;
      case 'digiCarousel': return <DigiCarousel />;
      case 'digiFashion': return <DigiFashion />;
      case 'digiFaceSwap': return <DigiFaceSwap />;
      case 'digiFusion': return <DigiFusion />;
      case 'digiModel': return <DigiModel />;
      case 'digiPose': return <DigiPose />;
      case 'digiRestore': return <DigiRestore />;
      case 'digiStoryboard': return <DigiStoryboard />;
      case 'digiVideo': return <DigiVideoGenerator />;
      case 'mockupGenerator': return <MockupGenerator />;
      case 'digiPhotoshoot': return <DigiPhotoshoot />;
      case 'digiVoice': return <DigiVoiceStudio />;
      default: return null;
    }
  };

  // Daftar semua kemungkinan view agar kita bisa membuat containernya
  const allViews: View[] = [
    'productStudio', 'virtualTryOn', 'lifestylePhotoshoot', 'mergeProduct', 
    'digitalImaging', 'adCreator', 'povStudio', 'mirrorStudio', 
    'listingStudio', 'perspectiveStudio', 'backgroundChanger', 'videoStudio', 
    'digiBRoll', 'digiGenEditor', 'digiCarousel', 'digiFashion', 'digiFaceSwap',
    'digiFusion', 'digiModel', 'digiPose', 'digiRestore', 
    'digiStoryboard', 'digiVideo', 'digiVoice', 'mockupGenerator', 'digiPhotoshoot'
  ];

  return (
    <Layout activeView={activeView} setActiveView={handleNavigate}>
      <div className="relative w-full h-full">
        {allViews.map((viewId) => {
          // Hanya render komponen jika sudah pernah dikunjungi (lazy load)
          // Gunakan CSS 'hidden' untuk menyembunyikan yang tidak aktif agar state terjaga
          const isVisited = visitedViews.has(viewId);
          if (!isVisited) return null;

          return (
            <div 
              key={viewId} 
              className={activeView === viewId ? 'block animate-fade-in' : 'hidden'}
            >
              {renderViewComponent(viewId)}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

function App() {
  const [hasAgreed, setHasAgreed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agreement_v1') === 'true';
    }
    return false;
  });

  const handleAgree = () => {
    localStorage.setItem('agreement_v1', 'true');
    setHasAgreed(true);
  };

  return (
    <LanguageProvider>
      {!hasAgreed && <AgreementModal onAgree={handleAgree} />}
      <div className={`transition-all duration-500 ${!hasAgreed ? 'filter blur-md pointer-events-none h-screen overflow-hidden opacity-50' : 'opacity-100'}`}>
        <AppContent />
      </div>
    </LanguageProvider>
  );
}

export default App;