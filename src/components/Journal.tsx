import React from 'react';
import { useCms } from '../context/CmsContext';
import { JournalArticle } from '../types';

export const Journal: React.FC = () => {
  const { language, articles, setActiveArticleModal } = useCms();

  const title = {
    en: 'Notes from Taroudant.',
    fr: 'Notes de Taroudant.',
    ar: 'هوامش من تارودانت.',
  };

  const subtitle = {
    en: 'An independent travel journal celebrating slow discovery, vernacular craft, culinary secrets, and the poetry of Southern Morocco.',
    fr: 'Une revue de voyage indépendante dédiée à la lenteur, l’artisanat vernaculaire, les secrets de table et la poésie du Sud marocain.',
    ar: 'مجلة سفر مستقلة تحتفي بفن العيش المتمهل، والصناعات التقليدية العريقة، وأسرار الطبخ وسحر جنوب المغرب.',
  };

  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1);

  return (
    <section id="journal" className="relative py-24 md:py-36 bg-[#EFE8DA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            14 · THE INDEPENDENT JOURNAL
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
            {title[language]}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
            {subtitle[language]}
          </p>
        </div>

        {/* Lead Feature Essay (Magazine Spread Style) */}
        {leadArticle && (
          <div
            className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F7F3EA] border border-[#4B502E]/15 p-6 sm:p-10 cursor-pointer group"
            onClick={() => setActiveArticleModal(leadArticle)}
          >
            <div className="lg:col-span-7 overflow-hidden aspect-[16/10] bg-[#D9C8AE]">
              <img
                src={leadArticle.heroImage}
                alt={leadArticle.title[language]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-sans text-[#4B502E] tracking-wider mb-3">
                <span>ESSAY</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.readTime}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#24241F] font-normal leading-snug mb-3 group-hover:text-[#4B502E] transition-colors">
                {leadArticle.title[language]}
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#24241F]/80 leading-relaxed mb-6">
                {leadArticle.excerpt[language]}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E] border-b border-[#4B502E] pb-1">
                  {language === 'fr' ? 'Lire l’article complet' : language === 'ar' ? 'قراءة المقال كاملاً' : 'Read Full Essay'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {secondaryArticles.map((art: JournalArticle) => (
            <article
              key={art.id}
              className="flex flex-col group cursor-pointer bg-[#F7F3EA] border border-[#4B502E]/15 p-6 hover:border-[#4B502E]/50 transition-colors"
              onClick={() => setActiveArticleModal(art)}
            >
              <div className="overflow-hidden aspect-[16/10] bg-[#D9C8AE] mb-5">
                <img
                  src={art.heroImage}
                  alt={art.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] font-sans text-[#4B502E] tracking-wider mb-2">
                <span>{art.date}</span>
                <span aria-hidden="true">·</span>
                <span>{art.readTime}</span>
              </div>

              <h4 className="font-serif text-2xl text-[#24241F] mb-3 leading-snug group-hover:text-[#4B502E] transition-colors">
                {art.title[language]}
              </h4>

              <p className="font-sans text-xs sm:text-sm text-[#24241F]/75 leading-relaxed line-clamp-3 mb-6">
                {art.excerpt[language]}
              </p>

              <div className="mt-auto pt-3 border-t border-[#4B502E]/15 flex items-center justify-between text-xs font-sans text-[#4B502E]">
                <span>{art.author}</span>
                <span className="uppercase tracking-widest text-[10px]">
                  {language === 'fr' ? 'LIRE →' : language === 'ar' ? '← اقرأ' : 'READ →'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
