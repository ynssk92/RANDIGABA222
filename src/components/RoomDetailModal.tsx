import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { X, Check } from 'lucide-react';

export const RoomDetailModal: React.FC = () => {
  const { activeRoomModal, setActiveRoomModal, language, openBookingForRoom } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!activeRoomModal) return null;

  const images = activeRoomModal.gallery.length > 0
    ? activeRoomModal.gallery
    : [activeRoomModal.image];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#24241F]/80 backdrop-blur-xs p-4 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl bg-[#F7F3EA] text-[#24241F] shadow-2xl my-auto overflow-hidden animate-fadeIn border border-[#4B502E]/20">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setActiveRoomModal(null)}
          className="absolute top-4 right-4 z-20 p-2.5 bg-[#F7F3EA]/90 hover:bg-[#4B502E] hover:text-[#F7F3EA] text-[#24241F] transition-colors cursor-pointer"
          aria-label="Close room details"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Visual Gallery Half */}
          <div className="lg:col-span-7 bg-[#EFE8DA] p-6 flex flex-col justify-between">
            {/* Main Featured Photo */}
            <div className="relative aspect-[16/11] overflow-hidden bg-[#D9C8AE] mb-4">
              <img
                src={images[selectedImageIndex] || activeRoomModal.image}
                alt={activeRoomModal.name[language]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 shrink-0 overflow-hidden cursor-pointer transition-opacity ${
                      selectedImageIndex === idx
                        ? 'ring-2 ring-[#4B502E] opacity-100'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Half */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <Logo variant="header" className="mb-3" />
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#4B502E] font-semibold block mb-2">
                DAR RANDIGABA · SUITE SPECIFICATION
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#24241F] font-normal mb-2">
                {activeRoomModal.name[language]}
              </h2>

              <p className="font-serif italic text-base text-[#4B502E] mb-5">
                {activeRoomModal.tagline[language]}
              </p>

              {/* Price & Capacity Strip */}
              <div className="flex items-baseline justify-between border-y border-[#4B502E]/20 py-3 mb-6">
                <div>
                  <span className="text-2xl font-serif font-medium text-[#24241F]">
                    {activeRoomModal.pricePerNight} {activeRoomModal.currency}
                  </span>
                  <span className="text-xs font-sans text-[#24241F]/60 ml-1.5">
                    / {language === 'fr' ? 'nuit, petit-déj inclus' : language === 'ar' ? 'ليلة مع الإفطار' : 'night, breakfast included'}
                  </span>
                </div>
                <div className="text-xs font-sans text-[#4B502E] font-medium tracking-wide">
                  {activeRoomModal.capacity} · {activeRoomModal.size}
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-sm text-[#24241F]/80 leading-relaxed mb-6">
                {activeRoomModal.description[language]}
              </p>

              {/* Bed & Bath Details */}
              <div className="space-y-3 mb-6 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-[#4B502E] shrink-0">
                    {language === 'fr' ? 'Lit :' : language === 'ar' ? 'السرير:' : 'Bed:'}
                  </span>
                  <span className="text-[#24241F]/80">{activeRoomModal.bed[language]}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-[#4B502E] shrink-0">
                    {language === 'fr' ? 'Salle d’eau :' : language === 'ar' ? 'الحمام:' : 'Bath:'}
                  </span>
                  <span className="text-[#24241F]/80">{activeRoomModal.bathroom[language]}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#4B502E] font-semibold block mb-3">
                  {language === 'fr' ? 'Équipements & Soins' : language === 'ar' ? 'المرافق والخدمات' : 'Included Amenities'}
                </span>
                <ul className="space-y-2 text-xs font-sans text-[#24241F]/80">
                  {activeRoomModal.amenities.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check size={14} className="text-[#4B502E] shrink-0" />
                      <span>{item[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-[#4B502E]/20 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const roomId = activeRoomModal.id;
                  setActiveRoomModal(null);
                  openBookingForRoom(roomId);
                }}
                className="flex-1 py-3 bg-[#4B502E] hover:bg-[#414628] text-[#F7F3EA] text-xs font-sans tracking-[0.2em] uppercase transition-colors text-center cursor-pointer"
              >
                {language === 'fr'
                  ? 'Réserver cette chambre'
                  : language === 'ar'
                  ? 'طلب حجز هذه الغرفة'
                  : 'Reserve This Room'}
              </button>

              <button
                type="button"
                onClick={() => setActiveRoomModal(null)}
                className="py-3 px-5 border border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E]/10 text-xs font-sans tracking-[0.18em] uppercase transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Fermer' : language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
