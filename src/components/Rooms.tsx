import React from 'react';
import { useApp } from '../context/AppContext';
import { Room } from '../types';

export const Rooms: React.FC = () => {
  const { language, rooms, setActiveRoomModal, openBookingForRoom } = useApp();

  const title = {
    en: 'Rooms for unhurried days.',
    fr: 'Des chambres pour suspendre le temps.',
    ar: 'غرف لأيام متأنية بلا عناء.',
  };

  const subtitle = {
    en: 'Restored with earthen pisé walls, tactile raw Moroccan linen, private tadelakt bathrooms, and quiet courtyard views.',
    fr: 'Restaurées en pisé traditionnel, lin brut marocain, salles d’eau privatives en tadelakt et vue sereine sur les patios.',
    ar: 'رُممت بجدران الطين العازلة، والكتان المغربي الطبيعي، وحمامات التدلاكت المستقلة، مع إطلالات هادئة على الفناء.',
  };

  return (
    <section id="rooms" className="relative py-24 md:py-36 bg-[#EFE8DA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            06 · THE SLEEPING SANCTUARIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
            {title[language]}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
            {subtitle[language]}
          </p>
        </div>

        {/* Editorial Catalogue of Rooms */}
        <div className="space-y-24 md:space-y-32">
          {rooms.map((room: Room, index: number) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={room.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Large Editorial Image */}
                <div
                  className={`lg:col-span-7 cursor-pointer group ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  onClick={() => setActiveRoomModal(room)}
                >
                  <div className="relative overflow-hidden bg-[#D9C8AE] shadow-xs aspect-[16/11]">
                    <img
                      src={room.image}
                      alt={room.name[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-[#F7F3EA]/90 backdrop-blur-xs px-3 py-1 text-xs font-sans tracking-[0.18em] uppercase text-[#4B502E]">
                      {room.pricePerNight} {room.currency} / {language === 'fr' ? 'nuit' : language === 'ar' ? 'ليلة' : 'night'}
                    </div>
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#4B502E] font-medium mb-2">
                    0{index + 1} · {room.capacity} · {room.size}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#24241F] font-normal mb-3">
                    {room.name[language]}
                  </h3>

                  <p className="font-serif italic text-lg text-[#4B502E] mb-4">
                    {room.tagline[language]}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[#24241F]/80 leading-relaxed mb-6">
                    {room.description[language]}
                  </p>

                  {/* Bed & Amenities Metadata as quiet unboxed text */}
                  <div className="border-t border-b border-[#4B502E]/20 py-4 my-2 text-xs font-sans text-[#24241F]/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#4B502E]">
                        {language === 'fr' ? 'Configuration' : language === 'ar' ? 'السرير' : 'Bed'}:
                      </span>
                      <span>{room.bed[language]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#4B502E]">
                        {language === 'fr' ? 'Salle de bain' : language === 'ar' ? 'الحمام' : 'Bath'}:
                      </span>
                      <span className="truncate">{room.bathroom[language]}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setActiveRoomModal(room)}
                      className="px-5 py-2.5 border border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      {language === 'fr'
                        ? 'Explorer la chambre'
                        : language === 'ar'
                        ? 'تفاصيل الغرفة'
                        : 'Explore Room'}
                    </button>

                    <button
                      type="button"
                      onClick={() => openBookingForRoom(room.id)}
                      className="px-5 py-2.5 bg-[#4B502E] text-[#F7F3EA] hover:bg-[#414628] text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      {language === 'fr' ? 'Réserver' : language === 'ar' ? 'طلب حجز' : 'Reserve'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
