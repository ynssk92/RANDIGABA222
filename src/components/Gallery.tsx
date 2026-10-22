import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { language, gallery } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const title = {
    en: 'Visual Archive.',
    fr: 'Archives Visuelles.',
    ar: 'الأرشيف البصري.',
  };

  const subtitle = {
    en: 'A photographic journal of light, earth, textiles, and lingering moments in Taroudant.',
    fr: 'Un carnet photographique de lumière, de terre, d’étoffes et d’instants suspendus.',
    ar: 'دفتر بصري يوثق ارتعاشات الضوء، وملمس الطين، وسكون اللحظات الخالدة في تارودانت.',
  };

  const categories = [
    { key: 'all', label: { en: 'ALL', fr: 'TOUT', ar: 'الكل' } },
    { key: 'dar', label: { en: 'DAR', fr: 'LE DAR', ar: 'الدار' } },
    { key: 'rooms', label: { en: 'ROOMS', fr: 'CHAMBRES', ar: 'الغرف' } },
    { key: 'rooftop', label: { en: 'ROOFTOP', fr: 'ROOFTOP', ar: 'السطح' } },
    { key: 'breakfast', label: { en: 'BREAKFAST', fr: 'PETIT-DÉJ', ar: 'الإفطار' } },
    { key: 'details', label: { en: 'DETAILS', fr: 'DÉTAILS', ar: 'التفاصيل' } },
    { key: 'taroudant', label: { en: 'TAROUDANT', fr: 'TAROUDANT', ar: 'تارودانت' } },
  ];

  const filteredItems = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
              13 · CURATORIAL ARCHIVE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
              {title[language]}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
              {subtitle[language]}
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Zero-pill discipline, clean segmented buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE8DA] rounded-xs border border-[#4B502E]/15">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 text-xs font-sans tracking-widest uppercase transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#4B502E] text-[#F7F3EA] shadow-xs'
                    : 'text-[#24241F]/70 hover:text-[#24241F]'
                }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Magazine-Style Asymmetric Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {filteredItems.map((item: GalleryItem, idx: number) => {
            // Asymmetric magazine span distribution
            const spanClass =
              idx % 5 === 0
                ? 'lg:col-span-8 aspect-[16/10]'
                : idx % 5 === 1
                ? 'lg:col-span-4 aspect-[4/5]'
                : idx % 5 === 2
                ? 'lg:col-span-4 aspect-[4/5]'
                : idx % 5 === 3
                ? 'lg:col-span-4 aspect-square'
                : 'lg:col-span-4 aspect-square';

            return (
              <div
                key={item.id}
                className={`${spanClass} relative group overflow-hidden bg-[#EFE8DA] cursor-pointer`}
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={item.image}
                  alt={item.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Caption Overlay */}
                <div className="absolute inset-0 bg-[#24241F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-[#F7F3EA]">
                  <div className="flex justify-end">
                    <span className="p-2 bg-[#24241F]/70">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#EFE8DA] block mb-1">
                      {item.caption[language]}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FCFBF7]">
                      {item.title[language]}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#24241F]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-20 p-3 text-[#F7F3EA] hover:text-[#D9C8AE] transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={26} />
          </button>

          {/* Navigation Prev/Next */}
          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#F7F3EA] hover:text-[#D9C8AE] transition-colors z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#F7F3EA] hover:text-[#D9C8AE] transition-colors z-20 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Main Visual */}
          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title[language]}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain mb-4 shadow-2xl"
            />
            <div className="text-center text-[#F7F3EA]">
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#D9C8AE] block mb-1">
                {activeLightboxItem.caption[language]}
              </span>
              <h3 className="font-serif text-2xl font-normal">
                {activeLightboxItem.title[language]}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
