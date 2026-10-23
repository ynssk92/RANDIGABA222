import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
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
import { NotFoundView } from './components/NotFoundView';
import { applySeoMetadataToHead } from './utils/seo';

const MainStoryContent: React.FC = () => {
  const { is404Open } = useApp();

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
        // Fallback to static head tags if offline or network unavailable
      });
  }, []);

  // Ensure /admin or #admin direct access redirects cleanly to the public homepage
  useEffect(() => {
    const handleUrlCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        window.history.replaceState(null, '', '/');
      }
    };
    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    window.addEventListener('hashchange', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, []);

  if (is404Open) {
    return <NotFoundView />;
  }

  return (
    <div className="relative min-h-screen bg-[#F7F3EA] text-[#24241F] overflow-x-hidden selection:bg-[#4B502E] selection:text-[#F7F3EA]">
      {/* Editorial Header */}
      <Header />

      {/* Curated Editorial Story Sections */}
      <main>
        <Hero />
        <EditorialIntro />
        <TheDar />
        <Rooftop />
        <SlowTravel />
        <Rooms />
        <Breakfast />
        <HostSaid />
        <MusicAndArt />
        <TaroudantTimeline />
        <Experiences />
        <GuestReviews />
        <Gallery />
        <Journal />
        <FinalCta />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Real-time WhatsApp Inquiries */}
      <WhatsAppFloat />

      {/* Global Interactive Modals */}
      <BookingModal />
      <RoomDetailModal />
      <ArticleModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainStoryContent />
    </AppProvider>
  );
}
