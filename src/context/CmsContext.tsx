import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  SectionConfig,
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
  INITIAL_SECTIONS,
  INITIAL_SETTINGS,
  INITIAL_ROOMS,
  INITIAL_TIMELINE,
  INITIAL_EXPERIENCES,
  INITIAL_REVIEWS,
  INITIAL_ARTICLES,
  INITIAL_GALLERY,
  INITIAL_BOOKINGS
} from '../data/initialData';

export interface AdminAuthUser {
  username: string;
  role: string;
  lastLogin?: string;
}

interface CmsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  sections: SectionConfig[];
  toggleSection: (id: string) => void;
  moveSection: (id: string, direction: 'up' | 'down') => void;
  rooms: Room[];
  updateRoom: (room: Room) => void;
  experiences: Experience[];
  updateExperience: (exp: Experience) => void;
  timeline: TimelineEvent[];
  updateTimelineEvent: (index: number, event: TimelineEvent) => void;
  reviews: Review[];
  addReview: (rev: Review) => void;
  deleteReview: (id: string) => void;
  articles: JournalArticle[];
  updateArticle: (art: JournalArticle) => void;
  addArticle: (art: JournalArticle) => void;
  gallery: GalleryItem[];
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  bookings: BookingRequest[];
  addBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateBookingStatus: (id: string, status: BookingRequest['status']) => void;
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;

  // Authentication & Security
  adminUser: AdminAuthUser | null;
  isAdminAuthenticated: boolean;
  isCheckingAuth: boolean;
  loginAdmin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;

  // Global Modals
  activeRoomModal: Room | null;
  setActiveRoomModal: (room: Room | null) => void;
  activeArticleModal: JournalArticle | null;
  setActiveArticleModal: (article: JournalArticle | null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  selectedBookingRoomId: string | null;
  openBookingForRoom: (roomId?: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  is404Open: boolean;
  setIs404Open: (open: boolean) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const STORAGE_PREFIX = 'dar_randigaba_';

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_PREFIX + 'lang') as Language) || 'en';
  });

  const [sections, setSections] = useState<SectionConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'sections');
    return saved ? JSON.parse(saved) : INITIAL_SECTIONS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'experiences');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'timeline');
    return saved ? JSON.parse(saved) : INITIAL_TIMELINE;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [articles, setArticles] = useState<JournalArticle[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Modals
  const [activeRoomModal, setActiveRoomModal] = useState<Room | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<JournalArticle | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingRoomId, setSelectedBookingRoomId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [is404Open, setIs404Open] = useState<boolean>(false);

  // Authentication State
  const [adminUser, setAdminUser] = useState<AdminAuthUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_PREFIX + 'is_auth') === 'true';
  });
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Check auth session with backend on load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setAdminUser(data.user);
            setIsAdminAuthenticated(true);
            localStorage.setItem(STORAGE_PREFIX + 'is_auth', 'true');
            localStorage.setItem(STORAGE_PREFIX + 'admin_user', JSON.stringify(data.user));
          } else {
            setIsAdminAuthenticated(false);
            setAdminUser(null);
            localStorage.removeItem(STORAGE_PREFIX + 'is_auth');
            localStorage.removeItem(STORAGE_PREFIX + 'admin_user');
          }
        }
      } catch {
        // preserve existing session if server call fails
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();
  }, []);

  // Sync to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'timeline', JSON.stringify(timeline));
  }, [timeline]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(bookings));
  }, [bookings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(sec => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec))
    );
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(s => s.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === sorted.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const currentItem = sorted[index];
      const targetItem = sorted[targetIndex];

      const currentOrder = currentItem.order;
      currentItem.order = targetItem.order;
      targetItem.order = currentOrder;

      return [...sorted];
    });
  };

  const updateRoom = (updated: Room) => {
    setRooms(prev => prev.map(r => (r.id === updated.id ? updated : r)));
  };

  const updateExperience = (updated: Experience) => {
    setExperiences(prev => prev.map(e => (e.id === updated.id ? updated : e)));
  };

  const updateTimelineEvent = (index: number, updated: TimelineEvent) => {
    setTimeline(prev => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const addReview = (rev: Review) => {
    setReviews(prev => [rev, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  const updateArticle = (updated: JournalArticle) => {
    setArticles(prev => prev.map(a => (a.id === updated.id ? updated : a)));
  };

  const addArticle = (art: JournalArticle) => {
    setArticles(prev => [art, ...prev]);
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery(prev => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
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

  const updateBookingStatus = (id: string, status: BookingRequest['status']) => {
    setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)));
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSections(INITIAL_SECTIONS);
    setSettings(INITIAL_SETTINGS);
    setRooms(INITIAL_ROOMS);
    setTimeline(INITIAL_TIMELINE);
    setExperiences(INITIAL_EXPERIENCES);
    setReviews(INITIAL_REVIEWS);
    setArticles(INITIAL_ARTICLES);
    setGallery(INITIAL_GALLERY);
    setBookings(INITIAL_BOOKINGS);
  };

  const openBookingForRoom = (roomId?: string) => {
    if (roomId) setSelectedBookingRoomId(roomId);
    setIsBookingOpen(true);
  };

  const loginAdmin = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }

      setAdminUser(data.user);
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_PREFIX + 'is_auth', 'true');
      localStorage.setItem(STORAGE_PREFIX + 'admin_user', JSON.stringify(data.user));
      return { success: true };
    } catch {
      return { success: false, error: 'Authentication service temporarily unavailable. Please retry.' };
    }
  };

  const logoutAdmin = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    } finally {
      setIsAdminAuthenticated(false);
      setAdminUser(null);
      localStorage.removeItem(STORAGE_PREFIX + 'is_auth');
      localStorage.removeItem(STORAGE_PREFIX + 'admin_user');
    }
  };

  return (
    <CmsContext.Provider
      value={{
        language,
        setLanguage,
        isRTL: language === 'ar',
        sections,
        toggleSection,
        moveSection,
        rooms,
        updateRoom,
        experiences,
        updateExperience,
        timeline,
        updateTimelineEvent,
        reviews,
        addReview,
        deleteReview,
        articles,
        updateArticle,
        addArticle,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        bookings,
        addBooking,
        updateBookingStatus,
        settings,
        updateSettings,
        resetToDefaults,
        adminUser,
        isAdminAuthenticated,
        isCheckingAuth,
        loginAdmin,
        logoutAdmin,
        activeRoomModal,
        setActiveRoomModal,
        activeArticleModal,
        setActiveArticleModal,
        isBookingOpen,
        setIsBookingOpen,
        selectedBookingRoomId,
        openBookingForRoom,
        isAdminOpen,
        setIsAdminOpen,
        is404Open,
        setIs404Open,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
