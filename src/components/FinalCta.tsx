import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const FinalCta: React.FC = () => {
  const { language, openBookingForRoom } = useApp();

  const titleLine1 = {
    en: 'Perhaps it’s time',
    fr: 'Le moment est venu',
    ar: 'ربما حان الوقت',
  };

  const titleLine2 = {
    en: 'to slow down.',
    fr: 'de ralentir.',
    ar: 'للتمهل والسكينة.',
  };

  const narrative = {
    en: 'Come stay at Dar Randigaba and discover Taroudant differently.',
    fr: 'Venez séjourner à Dar Randigaba et découvrez Taroudant autrement.',
    ar: 'تعال للإقامة في دار رانديغابا واكتشف تارودانت بنظرة أخرى.',
  };

  const availabilityBtn = {
    en: 'Check Availability',
    fr: 'Vérifier la Disponibilité',
    ar: 'تحقق من التوفر',
  };

  const contactBtn = {
    en: 'Contact Us',
    fr: 'Nous Contacter',
    ar: 'تواصل معنا',
  };

  return (
    <section id="cta" className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#24241F] text-[#F7F3EA] py-24 md:py-36">
      {/* Sunset Rooftop Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=2200&q=85"
          alt="Sunset over Taroudant from Dar Randigaba"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24241F] via-[#24241F]/40 to-[#24241F]/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center flex flex-col items-center">
        <Logo variant="hero" light={true} withSubtitle={true} className="mb-8" />

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-tight text-[#FCFBF7] text-balance mb-6">
          <span className="block">{titleLine1[language]}</span>
          <span className="block italic text-[#D9C8AE]">{titleLine2[language]}</span>
        </h2>

        <p className="font-sans text-base sm:text-xl text-[#EFE8DA]/90 font-light leading-relaxed max-w-xl text-balance mb-10">
          {narrative[language]}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            type="button"
            onClick={() => openBookingForRoom()}
            className="px-8 py-4 bg-[#4B502E] border border-[#4B502E] text-[#FCFBF7] hover:bg-[#414628] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            {availabilityBtn[language]}
          </button>

          <a
            href="#footer"
            className="px-8 py-4 border border-[#F7F3EA] text-[#F7F3EA] hover:bg-[#F7F3EA] hover:text-[#24241F] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            {contactBtn[language]}
          </a>
        </div>
      </div>
    </section>
  );
};
