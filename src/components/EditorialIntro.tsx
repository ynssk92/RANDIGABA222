import React from 'react';
import { useCms } from '../context/CmsContext';

export const EditorialIntro: React.FC = () => {
  const { language } = useCms();

  const content = {
    label: {
      en: 'A HOUSE WITH A SOUL',
      fr: 'UNE MAISON HABITÉE D’UNE ÂME',
      ar: 'بيت ينبض بروح حية',
    },
    titleLine1: {
      en: 'More than a place',
      fr: 'Bien plus qu’un lieu',
      ar: 'أكثر من مجرد ملاذ',
    },
    titleLine2: {
      en: 'to spend the night.',
      fr: 'où passer la nuit.',
      ar: 'لقضاء ليلة عابرة.',
    },
    paragraph1: {
      en: 'Dar Randigaba was born from a desire to slow down. Hidden behind an unassuming wooden doorway in the ancient Medina of Taroudant, this historic home was gently restored using traditional clay, lime wash, and cedarwood—honoring the architectural rhythm of Southern Morocco.',
      fr: 'Dar Randigaba est né d’un profond désir de ralentir. Dissimulée derrière une discrète porte de cèdre au cœur de la médina de Taroudant, cette demeure séculaire a été patiemment restaurée à la chaux, au pisé et aux bois nobles—dans le respect absolu des traditions architecturales du Sud marocain.',
      ar: 'وُلدت دار رانديغابا من رغبة أصيلة في التمهل والسكينة. وراء باب خشبي عتيق في قلب مدينة تارودانت، رُمم هذا البيت التاريخي بعناية فائقة باستخدام الطين والجير التقليدي وخشب الأرز العطري—احتفاءً بإيقاع العمارة العريقة في جنوب المغرب.',
    },
    paragraph2: {
      en: 'Here, luxury is not measured in marble or golden embellishments. It lives in the soft shadows cast by orange branches at midday, the warm crackle of an old jazz record on the turntable, raw linen sheets, and conversations shared over mint tea.',
      fr: 'Ici, le luxe ne se mesure ni en marbre étincelant ni en dorures. Il réside dans la fraîcheur des orangers à midi, le crépitement d’un vinyle de jazz sur la platine, le contact du lin brut et la sincérité des échanges autour d’un thé à la menthe.',
      ar: 'هنا، لا تُقاس الفخامة بالرخام البراق ولا بالزخارف المذهبة، بل تتجلى في ظلال أغصان النارنج وقت الظهيرة، ونغمات أسطوانة جاز عتيقة، وملمس الكتان الطبيعي، وحوارات دافئة تتناغم مع كؤوس الشاي.',
    },
    caption: {
      en: 'DAR RANDIGABA · TAROUDANT',
      fr: 'DAR RANDIGABA · TAROUDANT',
      ar: 'دار رانديغابا · تارودانت',
    }
  };

  return (
    <section id="intro" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Generous negative space & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-4 block">
              {content.label[language]}
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#24241F] mb-8 text-balance">
              <span className="block">{content.titleLine1[language]}</span>
              <span className="block italic text-[#4B502E]">{content.titleLine2[language]}</span>
            </h2>

            <div className="space-y-6 text-[#24241F]/80 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              <p>{content.paragraph1[language]}</p>
              <p>{content.paragraph2[language]}</p>
            </div>

            <div className="mt-10 pt-6 border-t border-[#4B502E]/20 flex items-center gap-8 text-xs font-sans tracking-[0.16em] uppercase text-[#4B502E]">
              <span>Vernacular Adobe</span>
              <span aria-hidden="true">·</span>
              <span>Atlas Cedar</span>
              <span aria-hidden="true">·</span>
              <span>Slow Living</span>
            </div>
          </div>

          {/* Right Column: Architectural Magazine Vertical Portrait */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative group overflow-hidden bg-[#EFE8DA] shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural Archway and Sunlight at Dar Randigaba"
                referrerPolicy="no-referrer"
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
            </div>
            {/* Small subtle caption as specified */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#4B502E]/80">
              <span>{content.caption[language]}</span>
              <span>FIG. 01 — ARCH & SHADOW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
