import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const GuestReviews: React.FC = () => {
  const { language, reviews } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);

  const title = {
    en: 'Words from people who stayed a little longer.',
    fr: 'Mots de voyageurs restés un peu plus longtemps.',
    ar: 'كلمات من ضيوف طاب لهم المقام.',
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="relative py-24 md:py-36 bg-[#EFE8DA] text-[#24241F] border-y border-[#4B502E]/15">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            12 · GUEST ARCHIVE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F]">
            {title[language]}
          </h2>
        </div>

        {/* Large Serif Quotation Presentation (No giant tacky cards) */}
        {currentReview && (
          <div className="flex flex-col items-center text-center">
            {/* Rating Stars & Platform unboxed metadata */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-[#4B502E]">
                {Array.from({ length: currentReview.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs font-sans tracking-widest uppercase text-[#4B502E] font-medium">
                VERIFIED ON {currentReview.platform.toUpperCase()}
              </span>
            </div>

            {/* Quotation */}
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#24241F] leading-relaxed max-w-4xl mb-10 text-balance">
              {currentReview.quote[language]}
            </blockquote>

            {/* Attributable details as clean text */}
            <div className="border-t border-[#4B502E]/20 pt-4 flex flex-col items-center">
              <span className="font-serif text-lg font-medium text-[#24241F]">
                {currentReview.guestName}
              </span>
              <span className="text-xs font-sans text-[#24241F]/60 tracking-wider uppercase mt-1">
                {currentReview.origin} · {currentReview.date}
              </span>
            </div>

            {/* Pagination controls */}
            {reviews.length > 1 && (
              <div className="flex items-center gap-6 mt-10">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 border border-[#4B502E]/40 text-[#4B502E] hover:border-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-sans tracking-widest text-[#4B502E]">
                  0{currentIndex + 1} / 0{reviews.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 border border-[#4B502E]/40 text-[#4B502E] hover:border-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
