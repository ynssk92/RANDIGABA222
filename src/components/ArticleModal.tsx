import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { X, ArrowLeft } from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { activeArticleModal, setActiveArticleModal, language, articles } = useApp();

  if (!activeArticleModal) return null;

  const relatedArticles = articles.filter((a) => a.id !== activeArticleModal.id).slice(0, 2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#24241F]/80 backdrop-blur-xs p-2 sm:p-6 md:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-[#F7F3EA] text-[#24241F] shadow-2xl my-6 overflow-hidden border border-[#4B502E]/20 animate-fadeIn">
        {/* Sticky Reading Bar */}
        <div className="sticky top-0 z-20 bg-[#F7F3EA]/95 backdrop-blur-xs border-b border-[#4B502E]/15 px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveArticleModal(null)}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#4B502E] hover:text-[#24241F] cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{language === 'fr' ? 'Retour aux notes' : language === 'ar' ? 'العودة للمجلة' : 'Back to Journal'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-3">
            <Logo variant="header" />
            <span className="text-[10px] font-sans tracking-widest uppercase text-[#24241F]/60 border-l border-[#4B502E]/20 pl-3">
              JOURNAL
            </span>
          </div>

          <button
            type="button"
            onClick={() => setActiveArticleModal(null)}
            className="p-1 text-[#24241F] hover:text-[#4B502E] cursor-pointer"
            aria-label="Close article"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#D9C8AE]">
          <img
            src={activeArticleModal.heroImage}
            alt={activeArticleModal.title[language]}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content Container */}
        <div className="p-6 sm:p-12 md:p-16 max-w-3xl mx-auto">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs font-sans text-[#4B502E] tracking-widest uppercase mb-4">
            <span>{activeArticleModal.date}</span>
            <span aria-hidden="true">·</span>
            <span>{activeArticleModal.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>BY {activeArticleModal.author.toUpperCase()}</span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#24241F] font-normal leading-[1.12] mb-6 text-balance">
            {activeArticleModal.title[language]}
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-[#4B502E] leading-relaxed mb-10 border-b border-[#4B502E]/20 pb-8">
            {activeArticleModal.subtitle[language]}
          </p>

          {/* Pull Quote */}
          {activeArticleModal.pullQuote && (
            <div className="my-10 py-6 border-y border-[#4B502E]/30 text-center">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#414628] leading-relaxed text-balance">
                {activeArticleModal.pullQuote[language]}
              </p>
            </div>
          )}

          {/* Body Paragraphs with Editorial Drop Cap */}
          <div className="space-y-6 text-[#24241F]/85 font-sans text-base sm:text-lg leading-relaxed">
            {activeArticleModal.content.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-[#4B502E]'
                    : ''
                }
              >
                {paragraph[language]}
              </p>
            ))}
          </div>

          {/* Author Signature */}
          <div className="mt-14 pt-8 border-t border-[#4B502E]/20 flex items-center justify-between">
            <div>
              <span className="font-serif text-lg text-[#24241F] block">
                {activeArticleModal.author}
              </span>
              <span className="text-xs font-sans text-[#24241F]/60 tracking-wider uppercase">
                Dar Randigaba Resident Storyteller
              </span>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#4B502E]/20">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E] font-semibold block mb-6">
                {language === 'fr' ? 'Poursuivre la lecture' : language === 'ar' ? 'مقالات ذات صلة' : 'Continue Reading'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-4 bg-[#EFE8DA] border border-[#4B502E]/15 cursor-pointer hover:border-[#4B502E] transition-colors"
                    onClick={() => setActiveArticleModal(rel)}
                  >
                    <span className="text-[10px] font-sans text-[#4B502E] tracking-widest uppercase block mb-1">
                      {rel.readTime}
                    </span>
                    <h4 className="font-serif text-lg text-[#24241F] leading-snug">
                      {rel.title[language]}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
