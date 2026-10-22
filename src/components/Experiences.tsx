import React from 'react';
import { useCms } from '../context/CmsContext';
import { Experience } from '../types';

export const Experiences: React.FC = () => {
  const { language, experiences, openBookingForRoom } = useCms();

  const title = {
    en: 'Words from a friend.',
    fr: 'Conseils d’un ami local.',
    ar: 'توصيات من صديق محلي.',
  };

  const subtitle = {
    en: 'Personal encounters and quiet discoveries around Taroudant and the Souss valley, tailored to your own rhythm.',
    fr: 'Rencontres sincères et découvertes confidentielles autour de Taroudant et de la vallée du Souss, à votre propre cadence.',
    ar: 'لقاءات إنسانية واكتشافات هادئة في أرجاء تارودانت ووادي سوس، مصممة خصيصاً لتناسب إيقاعك الخاص.',
  };

  return (
    <section id="experiences" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            11 · CURATED DISCOVERY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
            {title[language]}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
            {subtitle[language]}
          </p>
        </div>

        {/* Asymmetrical 2-Column Grid of Experiences (No generic icon cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {experiences.map((exp: Experience, idx: number) => (
            <div key={exp.id} className="flex flex-col group">
              <div className="relative overflow-hidden bg-[#EFE8DA] aspect-[16/10] mb-5">
                <img
                  src={exp.image}
                  alt={exp.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute top-4 left-4 bg-[#F7F3EA]/90 backdrop-blur-xs text-[#4B502E] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1 font-semibold">
                  {exp.category[language]}
                </div>
              </div>

              <div className="border-t border-[#4B502E]/20 pt-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-sans text-[#4B502E] tracking-wider mb-2">
                    <span>{exp.duration}</span>
                    <span>{exp.distance}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24241F] font-normal mb-3">
                    {exp.title[language]}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#24241F]/75 leading-relaxed mb-6">
                    {exp.shortStory[language]}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openBookingForRoom()}
                    className="inline-flex items-center text-xs font-sans tracking-[0.2em] uppercase text-[#4B502E] border-b border-[#4B502E] pb-1 hover:text-[#24241F] hover:border-[#24241F] transition-colors cursor-pointer"
                  >
                    {language === 'fr'
                      ? 'Organiser cette expérience'
                      : language === 'ar'
                      ? 'ترتيب هذه التجربة'
                      : 'Arrange Experience'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
