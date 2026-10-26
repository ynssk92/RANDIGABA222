import React from 'react';
import { useApp } from '../context/AppContext';

export const Rooftop: React.FC = () => {
  const { language } = useApp();

  const title = {
    en: 'Above the red walls of Taroudant.',
    fr: 'Au-dessus des remparts ocre de Taroudant.',
    ar: 'فوق أسوار تارودانت الحمراء.',
  };

  const paragraph = {
    en: 'At sunset, the terrace transforms into an intimate open-air observatory. Watch the swallows dive across the golden sky while the jagged peaks of the High Atlas blush with rose and violet light.',
    fr: 'Au couchant, la terrasse devient un observatoire intime à ciel ouvert. Les martinets fendent le ciel doré tandis que les cimes escarpées du Haut Atlas se teintent de rose et de violet.',
    ar: 'عند الغروب، تتحول شرفة السطح إلى مرصد شاعري تحت قبة السماء المفتوحة؛ تشاهد طيور السنونو تسبح في سماء ذهبية وتتلألأ قمم الأطلس بلون الورود والبنفسج.',
  };

  const caption = {
    en: 'ROOFTOP · LATE AFTERNOON',
    fr: 'TOIT-TERRASSE · FIN D’APRÈS-MIDI',
    ar: 'شرفة السطح · وقت الأصيل',
  };

  return (
    <section id="rooftop" className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#24241F] text-[#F7F3EA] py-24 md:py-36">
      {/* Full-width photography with parallax scale feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__5__fc1ff083.jpeg"
          alt="Panoramic Rooftop Terrace at Dar Randigaba Overlooking Taroudant"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05] scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft editorial contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24241F] via-[#24241F]/40 to-[#24241F]/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center flex flex-col items-center">
        {/* Editorial Top Tag */}
        <div className="inline-block border-b border-[#F7F3EA]/30 pb-2 mb-6">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#EFE8DA]/90">
            {caption[language]}
          </span>
        </div>

        {/* Large Title Overlay */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#FCFBF7] text-balance mb-8">
          {title[language]}
        </h2>

        {/* Small Editorial Paragraph */}
        <p className="font-sans text-base sm:text-lg text-[#EFE8DA]/90 font-light leading-relaxed max-w-2xl text-balance mb-10">
          {paragraph[language]}
        </p>

        {/* Quiet Indicators */}
        <div className="flex items-center gap-6 text-xs font-sans tracking-[0.2em] uppercase text-[#EFE8DA]/70">
          <span>HIGH ATLAS VIEW</span>
          <span aria-hidden="true">·</span>
          <span>FRESH MINT TEA</span>
          <span aria-hidden="true">·</span>
          <span>VINYL SESSIONS</span>
        </div>
      </div>
    </section>
  );
};
