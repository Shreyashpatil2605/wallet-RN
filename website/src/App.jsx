import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AppPreview from './components/AppPreview';
import HowToInstall from './components/HowToInstall';
import DownloadSection from './components/DownloadSection';
import Footer from './components/Footer';
import ConfigGuideModal from './components/ConfigGuideModal';
import PrivacyModal from './components/PrivacyModal';
import appConfig from './config/appConfig';

export function App() {
  const [configGuideOpen, setConfigGuideOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Global download handler
  const handleDownloadClick = () => {
    if (appConfig.isApkConfigured()) {
      const url = appConfig.getDownloadUrl();
      // If external or local link, trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = appConfig.apkFileName;
      if (url.startsWith('http')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Show configuration guide modal
      setConfigGuideOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Top Navigation */}
      <Navbar onDownloadClick={handleDownloadClick} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onDownloadClick={handleDownloadClick} />
        <Features />
        <AppPreview />
        <HowToInstall />
        <DownloadSection onOpenConfigGuide={() => setConfigGuideOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onDownloadClick={handleDownloadClick}
      />

      {/* Modals */}
      <ConfigGuideModal
        isOpen={configGuideOpen}
        onClose={() => setConfigGuideOpen(false)}
      />

      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}

export default App;
