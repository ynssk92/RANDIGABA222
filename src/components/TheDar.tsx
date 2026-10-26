import React from 'react';
import { useApp } from '../context/AppContext';

export const TheDar: React.FC = () => {
  const { language } = useApp();

  const title = {
    en: 'Inside Dar Randigaba',
    fr: 'Au Cœur de Dar Randigaba',
    ar: 'في أرجاء دار رانديغابا',
  };

  const subtitle = {
    en: 'An architectural dialogue between vernacular earthen textures, gentle breeze, and curated artistic objects.',
    fr: 'Un dialogue architectural entre terres brutes, brise matinale et objets d’art choisis avec amour.',
    ar: 'حوار معماري بين جدران الطين العريقة، ونسيم الصباح العليل، وقطع فنية ملهمة.',
  };

  const captions = {
    courtyard: { en: 'THE COURTYARD · ORANGE TREES & PATIO', fr: 'LE PATIO · ORANGERS & FRAÎCHEUR', ar: 'الفناء · أشجار النارنج' },
    livingRoom: { en: 'THE LIVING ROOM · VINYL & BOOKS', fr: 'LE SALON · VINYLES & LECTURES', ar: 'الصالون · أسطوانات وكتب' },
    rooftop: { en: 'THE ROOFTOP · ATLAS HORIZON', fr: 'LE TOIT · HORIZON DE L’ATLAS', ar: 'السطح · أفق جبال الأطلس' },
    details: { en: 'THE DETAILS · NATURAL TADELAKT', fr: 'LES DÉTAILS · TADELAKT NATUREL', ar: 'التفاصيل · لمسات التدلاكت' },
  };

  return (
    <section id="dar" className="relative py-24 md:py-36 bg-[#EFE8DA] text-[#24241F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            03 · ARCHITECTURE & ATMOSPHERE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
            {title[language]}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
            {subtitle[language]}
          </p>
        </div>

        {/* Editorial Overlapping Magazine Composition (No repetitive cards!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Block: Tall Primary Image with Offset Caption */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group overflow-hidden bg-[#D9C8AE]">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.13.06__7__db89f450.jpeg"
                alt="Dar Randigaba Central Courtyard Atrium with Geometric Tiles and Blue Doors"
                className="w-full aspect-[4/3] md:aspect-[16/11] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
            <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E]">
              <span>{captions.courtyard[language]}</span>
              <span className="text-[#24241F]/60">01</span>
            </div>

            {/* Overlapping Secondary Image Cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="relative group overflow-hidden bg-[#D9C8AE]">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__10__84b20b74.jpeg"
                    alt="Vinyl Records Turntable and Art in the Living Room"
                    className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E]">
                  <span>{captions.livingRoom[language]}</span>
                  <span className="text-[#24241F]/60">02</span>
                </div>
              </div>

              <div className="space-y-3 sm:mt-10">
                <div className="relative group overflow-hidden bg-[#D9C8AE]">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.13.06_01d61067.jpeg"
                    alt="Tall Prickly Pear Cactus in Terracotta Urn against Tadelakt Wall"
                    className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E]">
                  <span>{captions.details[language]}</span>
                  <span className="text-[#24241F]/60">03</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Offset Vertical Feature & Curatorial Prose */}
          <div className="lg:col-span-5 space-y-8 lg:pt-16">
            <div className="space-y-3">
              <div className="relative group overflow-hidden bg-[#D9C8AE]">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__5__fc1ff083.jpeg"
                  alt="Rooftop Terraces with Shaded Canopy Overlooking Taroudant"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
              <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E]">
                <span>{captions.rooftop[language]}</span>
                <span className="text-[#24241F]/60">04</span>
              </div>
            </div>

            <div className="border-t border-[#4B502E]/20 pt-6">
              <h3 className="font-serif text-2xl text-[#24241F] mb-3">
                {language === 'fr'
                  ? 'Une maison qui respire'
                  : language === 'ar'
                  ? 'بيت يتنفس بالهدوء'
                  : 'A house that breathes'}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#24241F]/75">
                {language === 'fr'
                  ? 'Le pisé régule naturellement la température. En hiver, la terre emmagasine la tiédeur du soleil pour réchauffer les nuits ; en été, l’épaisseur des murs offre un refuge de fraîcheur ombragée.'
                  : language === 'ar'
                  ? 'تحافظ جدران الطين على اعتدال الحرارة بصورة طبيعية؛ تمتص دفء الشمس نهاراً لتدفئة ليالي الشتاء، وتمنحك ظلالاً باردة منعشة في أيام الصيف.'
                  : 'The ancient adobe walls naturally regulate climate. In winter, the raw clay holds the warmth of daytime sun to warm the evening; in summer, thick walls provide a cool sanctuary from the midday heat.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
