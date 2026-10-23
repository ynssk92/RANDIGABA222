import React from 'react';
import { useApp } from '../context/AppContext';

export const Breakfast: React.FC = () => {
  const { language } = useApp();

  const title = {
    en: 'Begin slowly.',
    fr: 'Commencer lentement.',
    ar: 'بداية متمهلة.',
  };

  const subtitle = {
    en: 'An intimate morning table on the sunlit terrace. No rushed buffets—only fresh ingredients from the Souss valley prepared each morning with care.',
    fr: 'Une table matinale intime sur la terrasse baignée de lumière. Nul buffet standard : seuls les produits frais de la vallée du Souss préparés chaque matin avec amour.',
    ar: 'مائدة صباحية حميمية على الشرفة المشمسة. لا بوفيهات صاخبة، فقط خيرات وادي سوس الطازجة تُعد كل صباح بمحبة وإتقان.',
  };

  const elements = [
    {
      name: { en: 'Handmade Breads & Batbout', fr: 'Pains Maison & Batbout', ar: 'خبز الدار والبطبوط الطازج' },
      detail: {
        en: 'Baked round semolina loaves and warm griddled flatbreads straight from the kitchen.',
        fr: 'Galettes de semoule dorées et pains batbout tièdes tout juste sortis du fournil.',
        ar: 'أرغفة السميد الشهية وخبز البطبوط الدافئ يُخبز طازجاً كل صباح.'
      }
    },
    {
      name: { en: 'Souss Amlou & Wild Honey', fr: 'Amlou du Souss & Miel Sauvage', ar: 'أملو سوس والعسل الجبلي' },
      detail: {
        en: 'Stone-ground sweet roasted almonds, pure cold-pressed argan oil, and floral mountain honey.',
        fr: 'Amandes locales torréfiées pilées à la meule de pierre, huile d’argan pure et miel de fleur d’oranger.',
        ar: 'لوز محمص مطحون على الرحى الحجرية مع زيت الأركان الصافي وعسل زهر الليمون.'
      }
    },
    {
      name: { en: 'Fresh Pressed Citrus & Mint Tea', fr: 'Agrumes Pressés & Thé à la Menthe', ar: 'عصير البرتقال وشاي النعناع' },
      detail: {
        en: 'Sweet Taroudant oranges pressed to order and aromatic infusions of fresh spearmint and verbena.',
        fr: 'Oranges douces de Taroudant pressées minute et infusion de menthe fraîche et verveine du jardin.',
        ar: 'برتقال تارودانت الحلو يُعصر فوراً مع شاي بالنعناع الطازج وعشبة اللويزة العطرية.'
      }
    },
    {
      name: { en: 'Slow Dark Roast Coffee', fr: 'Café Noir Infusé Lentement', ar: 'قهوة سوداء معتقة' },
      detail: {
        en: 'Single-origin beans freshly ground and brewed slowly in French press or moka pot.',
        fr: 'Grains d’origine fraîchement moulus et extraits en douceur à la cafetière à piston ou moka.',
        ar: 'حبوب بن مختارة تُطحن وتُخمر بتمهل لتمنحك مذاقاً غنياً يوقظ الحواس.'
      }
    }
  ];

  return (
    <section id="breakfast" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atmospheric Food Photography */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative group overflow-hidden bg-[#EFE8DA] shadow-xs aspect-[4/3] md:aspect-[16/11]">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85"
                alt="Intimate Moroccan Breakfast on the Terrace at Dar Randigaba"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              <div className="absolute bottom-4 left-4 bg-[#24241F]/80 backdrop-blur-xs text-[#F7F3EA] px-3.5 py-1.5 text-xs font-sans tracking-[0.2em] uppercase">
                TERRACE TABLE · SERVED UNTIL MIDDAY
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#4B502E]">
              <span>FIG. 02 — MORNING TABLE</span>
              <span>ORGANIC & LOCALLY SOURCED</span>
            </div>
          </div>

          {/* Right Column: Editorial Atmosphere & Course Rituals */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
              07 · THE MORNING TABLE
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-6">
              {title[language]}
            </h2>

            <p className="font-sans text-base text-[#24241F]/80 leading-relaxed mb-8">
              {subtitle[language]}
            </p>

            <div className="space-y-5 border-t border-[#4B502E]/20 pt-6">
              {elements.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-lg text-[#24241F] font-normal mb-1">
                    {item.name[language]}
                  </span>
                  <span className="font-sans text-xs text-[#24241F]/70 leading-relaxed">
                    {item.detail[language]}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#4B502E]/20 text-xs font-sans text-[#4B502E] tracking-wider uppercase">
              {language === 'fr'
                ? 'Compris dans chaque nuitée · Servi sans contrainte d’horaire'
                : language === 'ar'
                ? 'مشمول مع كل حجز · يُقدم بدون تقييد صارم للمواعيد'
                : 'Included with every stay · Served at your own gentle pace'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
