import React, { useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialIntro } from './components/EditorialIntro';
import { TheDar } from './components/TheDar';
import { Rooftop } from './components/Rooftop';
import { SlowTravel } from './components/SlowTravel';
import { Rooms } from './components/Rooms';
import { Breakfast } from './components/Breakfast';
import { HostSaid } from './components/HostSaid';
import { MusicAndArt } from './components/MusicAndArt';
import { TaroudantTimeline } from './components/TaroudantTimeline';
import { Experiences } from './components/Experiences';
import { GuestReviews } from './components/GuestReviews';
import { Gallery } from './components/Gallery';
import { Journal } from './components/Journal';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { ArticleModal } from './components/ArticleModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AdminPanel } from './components/AdminPanel';
import { NotFoundView } from './components/NotFoundView';
import { applySeoMetadataToHead } from './utils/seo';

const MainStoryContent: React.FC = () => {
  const { sections, is404Open, setIsAdminOpen } = useCms();

  // Load and synchronize dynamic SEO metadata from database on mount
  useEffect(() => {
    fetch('/api/seo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.seo) {
          applySeoMetadataToHead(data.seo);
        }
      })
      .catch(() => {
        // Fallback to static HTML tags if network unavailable
      });
  }, []);

  // Automatic route detection: /admin or #admin redirects to Login / CMS
  useEffect(() => {
    const handleUrlCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    window.addEventListener('hashchange', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, [setIsAdminOpen]);

  if (is404Open) {
    return <NotFoundView />;
  }

  // Render sections strictly based on CMS Visual Page Builder order & enabled status
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const renderSectionComponent = (id: string) => {
    switch (id) {
      case 'hero':
        return <Hero key="hero" />;
      case 'intro':
        return <EditorialIntro key="intro" />;
      case 'dar':
        return <TheDar key="dar" />;
      case 'rooftop':
        return <Rooftop key="rooftop" />;
      case 'slowtravel':
        return <SlowTravel key="slowtravel" />;
      case 'rooms':
        return <Rooms key="rooms" />;
      case 'breakfast':
        return <Breakfast key="breakfast" />;
      case 'host':
        return <HostSaid key="host" />;
      case 'music':
        return <MusicAndArt key="music" />;
      case 'taroudant':
        return <TaroudantTimeline key="taroudant" />;
      case 'experiences':
        return <Experiences key="experiences" />;
      case 'reviews':
        return <GuestReviews key="reviews" />;
      case 'gallery':
        return <Gallery key="gallery" />;
      case 'journal':
        return <Journal key="journal" />;
      case 'cta':
        return <FinalCta key="cta" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F3EA] text-[#24241F] overflow-x-hidden selection:bg-[#4B502E] selection:text-[#F7F3EA]">
      {/* Editorial Header */}
      <Header />

      {/* Dynamic Continuous Scroll Story */}
      <main>
        {sortedSections.map((sec) => (sec.enabled ? renderSectionComponent(sec.id) : null))}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Real-time WhatsApp Inquiries */}
      <WhatsAppFloat />

      {/* Global Interactive Modals */}
      <BookingModal />
      <RoomDetailModal />
      <ArticleModal />
      <AdminPanel />
    </div>
  );
};

export default function App() {
  return (
    <CmsProvider>
      <MainStoryContent />
    </CmsProvider>
  );
}
