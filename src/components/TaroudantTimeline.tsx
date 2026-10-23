import React from 'react';
import { useApp } from '../context/AppContext';

export const TaroudantTimeline: React.FC = () => {
  const { language, timeline } = useApp();

  const title = {
    en: 'Taroudant, slowly.',
    fr: 'Taroudant, au ralenti.',
    ar: 'تارودانت، بتمهل وتؤدة.',
  };

  const narrative = {
    en: 'Encircled by eight kilometers of intact terracotta-hued ramparts dating to the Saadian dynasty, Taroudant is known to locals as the heart of the Souss. Free of tour buses and commercial hurriedness, life unfolds here at the rhythm of the sun, wandering bicycles, and the sweet perfume of eucalyptus and orange groves.',
    fr: 'Ceinte de huit kilomètres de remparts ocre intacts hérités des Saadiens, Taroudant est le cœur battant du Souss. Épargnée par le tourisme de masse et la frénésie, la vie s’y écoule au rythme du soleil, des vélos nonchalants et des effluves d’eucalyptus et d’orangers en fleur.',
    ar: 'تطوقها ثمانية كيلومترات من الأسوار الطينية التاريخية العريقة التي شيدها السعديون؛ تارودانت هي نبض وادي سوس الأصيل. بعيداً عن صخب الحافلات السياحية، تنساب الحياة فيها بهدوء على إيقاع حركة الشمس، ودراجات الأهالي، وشذى أشجار الكالبتوس وزهر النارنج.',
  };

  return (
    <section id="taroudant" className="relative py-24 md:py-36 bg-[#EFE8DA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Editorial Magazine Opener */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 md:mb-28">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
              10 · THE DESTINATION
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-6">
              {title[language]}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#24241F]/80 leading-relaxed">
              {narrative[language]}
            </p>
            <div className="mt-8 pt-6 border-t border-[#4B502E]/20 flex items-center gap-6 text-xs font-sans tracking-widest uppercase text-[#4B502E]">
              <span>8 KM WALLS</span>
              <span aria-hidden="true">·</span>
              <span>5 SAADIAN GATES</span>
              <span aria-hidden="true">·</span>
              <span>SOUSS VALLEY</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-[#D9C8AE] shadow-xs aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1512958789358-4dacacbe09c3?auto=format&fit=crop&w=1600&q=85"
                alt="Ancient Red Adobe Ramparts of Taroudant"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#4B502E]">
              <span>BAB SELSLA & RAMPARTS</span>
              <span>EST. 16TH CENTURY</span>
            </div>
          </div>
        </div>

        {/* 48 Hours in Taroudant Editorial Timeline */}
        <div className="border-t border-[#4B502E]/20 pt-16">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-2 block">
              CURATED ITINERARY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#24241F] font-normal">
              {language === 'fr'
                ? '48 Heures à Taroudant : Le fil de la journée'
                : language === 'ar'
                ? '48 ساعة في تارودانت: إيقاع يوم مثالي'
                : '48 Hours in Taroudant: The Daily Thread'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((event, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F7F3EA] border border-[#4B502E]/15 flex flex-col justify-between group hover:border-[#4B502E]/50 transition-colors"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-3 border-b border-[#4B502E]/15 pb-2">
                    <span className="font-serif text-3xl text-[#4B502E] font-medium tracking-tight">
                      {event.time}
                    </span>
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#4B502E]/80">
                      {event.tag[language]}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl text-[#24241F] mb-3 leading-snug">
                    {event.title[language]}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-[#24241F]/75 leading-relaxed">
                    {event.description[language]}
                  </p>
                </div>

                <div className="mt-6 pt-3 text-[11px] font-sans tracking-widest uppercase text-[#4B502E]/60">
                  STOP 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
