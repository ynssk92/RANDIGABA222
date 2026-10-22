export type Language = 'en' | 'fr' | 'ar';

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
}

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
}

export interface Room {
  id: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  capacity: string;
  bed: LocalizedString;
  size: string;
  bathroom: LocalizedString;
  pricePerNight: number;
  currency: string;
  amenities: LocalizedString[];
  image: string;
  gallery: string[];
}

export interface Experience {
  id: string;
  title: LocalizedString;
  shortStory: LocalizedString;
  duration?: string;
  distance?: string;
  image: string;
  category: LocalizedString;
}

export interface TimelineEvent {
  time: string;
  title: LocalizedString;
  description: LocalizedString;
  tag: LocalizedString;
}

export interface Review {
  id: string;
  guestName: string;
  origin: string;
  rating: number;
  platform: 'Booking.com' | 'Google' | 'Tripadvisor';
  date: string;
  quote: LocalizedString;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  author: string;
  date: string;
  readTime: string;
  heroImage: string;
  excerpt: LocalizedString;
  pullQuote?: LocalizedString;
  content: LocalizedString[];
}

export interface GalleryItem {
  id: string;
  title: LocalizedString;
  category: 'dar' | 'rooms' | 'rooftop' | 'breakfast' | 'details' | 'taroudant';
  image: string;
  caption: LocalizedString;
}

export interface BookingRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Declined' | 'Cancelled' | 'Completed';
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  whatsappMessage: string;
  instagram: string;
  bookingComUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SeoSettings {
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary_large_image' | 'summary';
  canonicalUrl: string;
  keywords: string;
  robots: string;
  updatedAt: string;
  updatedBy: string;
}

