import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Room,
  Experience,
  TimelineEvent,
  Review,
  JournalArticle,
  GalleryItem,
  BookingRequest,
  SiteSettings
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_ROOMS,
  INITIAL_TIMELINE,
  INITIAL_EXPERIENCES,
  INITIAL_REVIEWS,
  INITIAL_ARTICLES,
  INITIAL_GALLERY,
  INITIAL_BOOKINGS
} from '../data/initialData';

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  rooms: Room[];
  experiences: Experience[];
  timeline: TimelineEvent[];
  reviews: Review[];
  articles: JournalArticle[];
  gallery: GalleryItem[];
  bookings: BookingRequest[];
  addBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => string;
  settings: SiteSettings;

  // Global Public Modals & Views
  activeRoomModal: Room | null;
  setActiveRoomModal: (room: Room | null) => void;
  activeArticleModal: JournalArticle | null;
  setActiveArticleModal: (article: JournalArticle | null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  selectedBookingRoomId: string | null;
  openBookingForRoom: (roomId?: string) => void;
  is404Open: boolean;
  setIs404Open: (open: boolean) => void;
}

const STORAGE_PREFIX = 'dar_randigaba_';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_PREFIX + 'lang') as Language) || 'en';
  });

  const [settings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [experiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
  const [timeline] = useState<TimelineEvent[]>(INITIAL_TIMELINE);
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [articles] = useState<JournalArticle[]>(INITIAL_ARTICLES);
  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Global Public Modals & Navigation
  const [activeRoomModal, setActiveRoomModal] = useState<Room | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<JournalArticle | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingRoomId, setSelectedBookingRoomId] = useState<string | null>(null);
  const [is404Open, setIs404Open] = useState<boolean>(false);

  // Sync Language & RTL to document
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync Bookings to LocalStorage for enquiry continuity
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(bookings));
  }, [bookings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const addBooking = (bookingData: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): string => {
    const id = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRequest = {
      ...bookingData,
      id,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    return id;
  };

  const openBookingForRoom = (roomId?: string) => {
    if (roomId) setSelectedBookingRoomId(roomId);
    setIsBookingOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isRTL: language === 'ar',
        rooms,
        experiences,
        timeline,
        reviews,
        articles,
        gallery,
        bookings,
        addBooking,
        settings,
        activeRoomModal,
        setActiveRoomModal,
        activeArticleModal,
        setActiveArticleModal,
        isBookingOpen,
        setIsBookingOpen,
        selectedBookingRoomId,
        openBookingForRoom,
        is404Open,
        setIs404Open,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
