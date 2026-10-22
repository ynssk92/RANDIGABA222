import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { Language } from '../types';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, openBookingForRoom, isRTL } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#dar', label: { en: 'The Dar', fr: 'Le Dar', ar: 'الدار' } },
    { href: '#rooms', label: { en: 'Rooms', fr: 'Chambres', ar: 'الغرف' } },
    { href: '#experiences', label: { en: 'Experiences', fr: 'Expériences', ar: 'التجارب' } },
    { href: '#taroudant', label: { en: 'Taroudant', fr: 'Taroudant', ar: 'تارودانت' } },
    { href: '#gallery', label: { en: 'Gallery', fr: 'Galerie', ar: 'الصور' } },
    { href: '#journal', label: { en: 'Journal', fr: 'Journal', ar: 'المجلة' } },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F3EA]/90 backdrop-blur-md border-b border-[#4B502E]/15 py-3 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4B502E]"
            aria-label="Dar Randigaba Home"
          >
            <Logo
              variant="header"
              light={!isScrolled}
              className="transition-all duration-300"
            />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-xs tracking-[0.2em] uppercase font-sans font-medium"
            style={{ color: isScrolled ? '#4B502E' : '#FCFBF7' }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 group"
              >
                <span>{item.label[language]}</span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#4B502E]' : 'bg-[#FCFBF7]'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Zone 3: Language Selector + Book Your Stay */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 text-xs font-sans tracking-wider">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer text-xs ${
                    language === l.code
                      ? isScrolled
                        ? 'font-bold text-[#4B502E] border-b border-[#4B502E]'
                        : 'font-bold text-[#FCFBF7] border-b border-[#FCFBF7]'
                      : isScrolled
                      ? 'text-[#24241F]/60 hover:text-[#24241F]'
                      : 'text-[#FCFBF7]/70 hover:text-[#FCFBF7]'
                  }`}
                  aria-label={`Switch language to ${l.label}`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Book Your Stay Understated CTA */}
            <button
              type="button"
              onClick={() => openBookingForRoom()}
              className={`hidden sm:inline-flex items-center justify-center px-4 py-2 border text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
                isScrolled
                  ? 'border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA]'
                  : 'border-[#FCFBF7] text-[#FCFBF7] hover:bg-[#FCFBF7] hover:text-[#24241F]'
              }`}
            >
              {language === 'fr'
                ? 'Réserver un séjour'
                : language === 'ar'
                ? 'احجز إقامتك'
                : 'Book Your Stay'}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 transition-colors ${
                isScrolled ? 'text-[#24241F] hover:text-[#4B502E]' : 'text-[#FCFBF7]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F7F3EA] flex flex-col justify-between p-8 animate-fadeIn lg:hidden">
          <div className="flex items-center justify-between border-b border-[#4B502E]/20 pb-5">
            <Logo variant="header" light={false} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#4B502E] cursor-pointer"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl tracking-[0.15em] uppercase text-[#24241F] hover:text-[#4B502E] transition-colors"
              >
                {item.label[language]}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-5 pt-6 border-t border-[#4B502E]/20 text-center">
            <div className="flex justify-center items-center gap-4 text-sm font-sans tracking-widest">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setLanguage(l.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1 ${
                    language === l.code
                      ? 'font-bold text-[#4B502E] border-b border-[#4B502E]'
                      : 'text-[#24241F]/60'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingForRoom();
              }}
              className="w-full py-3 border border-[#4B502E] bg-[#4B502E] text-[#F7F3EA] text-xs uppercase tracking-[0.2em] font-sans"
            >
              {language === 'fr'
                ? 'Réserver un séjour'
                : language === 'ar'
                ? 'احجز إقامتك'
                : 'Book Your Stay'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
