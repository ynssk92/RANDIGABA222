import React from 'react';
import { useApp } from '../context/AppContext';

export const SlowTravel: React.FC = () => {
  const { language } = useApp();

  const title = {
    en: 'Stay slowly.',
    fr: 'Prendre le temps.',
    ar: 'عش على مهل.',
  };

  const subtitle = {
    en: 'True luxury is the liberty to linger. Four foundational rituals that shape the days at Dar Randigaba.',
    fr: 'Le véritable luxe est la liberté de flâner. Quatre rituels fondateurs qui rythment les journées au Dar.',
    ar: 'الفخامة الحقيقية هي حرية التأمل؛ أربعة طقوس أصيلة تُشكل تجربة الإقامة في دار رانديغابا.',
  };

  const pillars = [
    {
      title: {
        en: 'SLOW MORNINGS',
        fr: 'MATINS PAISIBLES',
        ar: 'صباحات هادئة',
      },
      text: {
        en: 'No alarm clocks. Wake up to filtered daylight, birdsong from the courtyard, and a table set with fresh wood-fired breads and Souss valley amlou.',
        fr: 'Aucun réveil. Éveillez-vous au chant des oiseaux du patio, sous une lumière douce et un petit-déjeuner paré de pains cuits au feu de bois et d’amlou du Souss.',
        ar: 'بلا منبهات؛ استيقظ على تغريد العصافير وضوء الصباح الوارف، ومائدة تفوح بعطر الخبز البلدي وأملو وادي سوس المصنوع باللوز وزيت الأركان.',
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.18_455a63f1.jpeg',
    },
    {
      title: {
        en: 'LOCAL FLAVOURS',
        fr: 'SAVEURS DU TERROIR',
        ar: 'نكهات أصيلة',
      },
      text: {
        en: 'Taste seasonal ingredients harvested from small family orchards: bitter oranges, sun-ripened olives, saffron from Taliouine, and fragrant mountain herbs.',
        fr: 'Savourez les récoltes des vergers familiaux : oranges amères, olives gorgées de soleil, safran de Taliouine et herbes aromatiques de l’Atlas.',
        ar: 'تذوق خيرات بساتين المنطقة العائلية: النارنج العطري، الزيتون البلدي، زعفران تاليوين الأصيل، وأعشاب الجبال العطرية.',
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__9__82383fe1.jpeg',
    },
    {
      title: {
        en: 'MUSIC & ART',
        fr: 'MUSIQUE & ART',
        ar: 'أنغام وفنون',
      },
      text: {
        en: 'A home filled with vinyl records, acoustic guitars, and books on Moroccan architecture, poetry, and world jazz to discover by candlelight.',
        fr: 'Une demeure habitée par des disques vinyles, des guitares acoustiques et des ouvrages sur l’architecture, la poésie et le jazz à feuilleter aux chandelles.',
        ar: 'دار تزخر بأسطوانات الفينيل النادرة، والغيتارات، وكتب العمارة والشعر وموسيقى الجاز التي تستمتع بها على ضوء الشموع.',
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__10__84b20b74.jpeg',
    },
    {
      title: {
        en: 'THE CITY ON FOOT',
        fr: 'LA VILLE À PIED',
        ar: 'المدينة على الأقدام',
      },
      text: {
        en: 'Step into the Medina without haste. Unhurried strolls through quiet shaded alleys, conversations with master tanners, and ancient rampart walks.',
        fr: 'Rejoignez la médina sans hâte. Promenades ombragées dans les ruelles calmes, échanges spontanés avec les artisans et balades le long des remparts.',
        ar: 'اخرج إلى أزقة المدينة بلا عجلة؛ جولات متأنية في الدروب الظليلة، وأحاديث عفوية مع حرفيي الدباغة والنحاس عند أسوار تارودانت.',
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.11.09_6dca3c18.jpeg',
    },
  ];

  return (
    <section id="slowtravel" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F] border-b border-[#4B502E]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
            05 · THE PHILOSOPHY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#24241F] mb-4">
            {title[language]}
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
            {subtitle[language]}
          </p>
        </div>

        {/* 4 Editorial Pillars with small image and short editorial text (No generic icon cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col group">
              <div className="overflow-hidden bg-[#EFE8DA] mb-5 aspect-[4/3]">
                <img
                  src={pillar.image}
                  alt={pillar.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="border-t border-[#4B502E]/25 pt-3">
                <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#4B502E] font-semibold block mb-2">
                  0{idx + 1} · {pillar.title[language]}
                </span>
                <p className="font-sans text-sm text-[#24241F]/80 leading-relaxed">
                  {pillar.text[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
