import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, openBookingForRoom } = useApp();

  const content = {
    label: {
      en: 'DAR RANDIGABA · TAROUDANT, MOROCCO',
      fr: 'DAR RANDIGABA · TAROUDANT, MAROC',
      ar: 'دار رانديغابا · تارودانت، المغرب',
    },
    titleLine1: {
      en: 'Stay somewhere',
      fr: 'Séjournez dans un lieu',
      ar: 'أقِم في مكانٍ',
    },
    titleLine2: {
      en: 'with a story.',
      fr: 'qui a une histoire.',
      ar: 'ينبض بالحكايات.',
    },
    subtext: {
      en: 'An artistic Moroccan home where slow mornings, music, culture and warm hospitality meet.',
      fr: 'Une maison d’art marocaine où se croisent matins paisibles, musique, culture et hospitalité chaleureuse.',
      ar: 'بيت مغربي فني تلتقي فيه الصباحات الهادئة، وأنغام الموسيقى، والثقافة، والدفء الإنساني الأصيل.',
    },
    discoverBtn: {
      en: 'Discover the Dar',
      fr: 'Découvrir le Dar',
      ar: 'اكتشف الدار',
    },
    availabilityBtn: {
      en: 'Check Availability',
      fr: 'Vérifier la Disponibilité',
      ar: 'تحقق من التوفر',
    },
    scrollNotice: {
      en: 'Scroll to explore',
      fr: 'Faites défiler pour explorer',
      ar: 'انزل للاستكشاف',
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#24241F] text-[#F7F3EA] pt-28 pb-10">
      {/* Background Photography with subtle slow scale */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.13.06__11__abdf850a.jpeg"
          alt="Dar Randigaba Rooftop Coffee Terrace and Observation Lookout at Golden Hour"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05] scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Editorial atmospheric gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24241F] via-[#24241F]/40 to-[#24241F]/30" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-8 md:pt-16">
        <div className="inline-block border-b border-[#F7F3EA]/30 pb-2">
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] font-sans text-[#EFE8DA]/90">
            {content.label[language]}
          </p>
        </div>
      </div>

      {/* Main Headline & Lead Story */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full my-auto py-12 md:py-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.05] tracking-tight text-[#FCFBF7] text-balance mb-6">
            <span className="block italic">{content.titleLine1[language]}</span>
            <span className="block font-medium">{content.titleLine2[language]}</span>
          </h1>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#EFE8DA]/90 font-light leading-relaxed max-w-xl mb-10">
            {content.subtext[language]}
          </p>

          {/* Understated Action Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#dar"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#F7F3EA] text-[#F7F3EA] hover:bg-[#F7F3EA] hover:text-[#24241F] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {content.discoverBtn[language]}
            </a>
            <button
              type="button"
              onClick={() => openBookingForRoom()}
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#4B502E] border border-[#4B502E] text-[#FCFBF7] hover:bg-[#414628] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              {content.availabilityBtn[language]}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Caption & Smooth Scroll Hint */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full flex items-end justify-between border-t border-[#F7F3EA]/20 pt-4">
        <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#EFE8DA]/70">
          TAROUDANT · 30°28′N 8°52′W
        </span>

        <a
          href="#intro"
          className="group flex items-center gap-2 text-[11px] font-sans tracking-[0.2em] uppercase text-[#EFE8DA]/70 hover:text-[#FCFBF7] transition-colors"
        >
          <span>{content.scrollNotice[language]}</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
