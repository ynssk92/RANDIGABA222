import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MusicAndArt: React.FC = () => {
  const { language } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const title = {
    en: 'Music, books & other little things.',
    fr: 'Musique, livres & petites merveilles.',
    ar: 'أنغام، كتب، وتفاصيل ساحرة.',
  };

  const subtitle = {
    en: 'The tactile soul of the house: analogue sound, pages dog-eared with thought, clay crafted by human hands, and quiet afternoons.',
    fr: 'L’âme sensible de la maison : le son chaleureux de l’analogique, les pages cornées d’essais choisis, la terre modelée et les heures lentes.',
    ar: 'روح البيت النابضة: دفء التسجيلات التناظرية، صفحات كتب ملهمة، وفخار صُنع بأيدٍ متقنة وأوقات عصاري لا تُنسى.',
  };

  const stories = [
    {
      title: { en: 'The Vinyl Turntable', fr: 'La Platine Vinyle', ar: 'الفونوغراف والأسطوانات' },
      detail: {
        en: 'Miles Davis, Bill Evans, Nina Simone, and gnawa recordings spinning under soft lamp light.',
        fr: 'Miles Davis, Bill Evans, Nina Simone et chants gnaouas tournant sous la clarté feutrée.',
        ar: 'مايلز ديفيس، وبيل إيفانز، ونينا سيمون، وتسجيلات غناوة الأصيلة تدور تحت الأضواء الدافئة.'
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__10__84b20b74.jpeg',
      tag: 'SOUND & MEMORY'
    },
    {
      title: { en: 'The Art Salon & Night Lantern', fr: 'Le Salon d’Art & la Lanterne', ar: 'صالون اللوحات وفانوس المساء' },
      detail: {
        en: 'Warm paper cylinder lanterns casting amber shadows over curated art portraits on the salon walls.',
        fr: 'Grandes lanternes de papier diffusant une clarté ambrée sur les portraits d’art ornant les murs du salon.',
        ar: 'فوانيس ورقية أسطوانية تضفي إضاءة عنبرية دافئة على جدران الصالون المزدانة باللوحات الفنية.'
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.03__8__f674b9a1.jpeg',
      tag: 'ART & LIGHT'
    },
    {
      title: { en: 'Terrace Botany & Flowering Cactus', fr: 'Botanique & Cactus Fleuri', ar: 'نباتات الشرفة والصبار المزهر' },
      detail: {
        en: 'Night-blooming white desert cacti and terracotta planters basking on the upper terrace.',
        fr: 'Cactus du désert aux fleurs blanches nocturnes et poteries de terre cuite sur la terrasse supérieure.',
        ar: 'صبار صحراوي يزهر بأزهار بيضاء ليلية وأوانٍ فخارية تتشمس على الشرفة العلوية.'
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.12.18_455a63f1.jpeg',
      tag: 'EARTH & SHAPE'
    },
    {
      title: { en: 'Cobalt Zellige & Hand-Beaten Copper', fr: 'Zellige Cobalt & Cuivre Martelé', ar: 'الزليج الأزرق والنحاس المطروق' },
      detail: {
        en: 'Traditional Moroccan zellige tiles paired with custom tagine basins and warm copper taps.',
        fr: 'Carreaux de zellige traditionnel associés à des vasques façon tajine et des robinetteries de cuivre chaud.',
        ar: 'بلاط الزليج المغربي التقليدي متناغم مع مغاسل فخارية وصنابير نحاسية مصوغة يدوياً.'
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.13.44__2__5452f60c.jpeg',
      tag: 'ANCESTRAL CRAFT'
    },
    {
      title: { en: 'Lattice Ironwork & Shaded Light', fr: 'Fer Forgé & Ombres Filtrées', ar: 'مشربيات الحديد والضوء المصفى' },
      detail: {
        en: 'Hand-forged Moroccan window screens creating quiet, contemplative geometric shadow patterns.',
        fr: 'Moucharabiehs de fer forgé apprivoisant l’éclat du soleil pour composer des dentelles d’ombres.',
        ar: 'شبابيك من الحديد المطروق يدوياً تروض وهج الشمس وتصنع لوحات هندسية بديعة من الظلال.'
      },
      image: '/assets/aistudio/WhatsApp_Image_2026-10-19_at_17.13.44__7__316b59b7.jpeg',
      tag: 'SOLITUDE'
    }
  ];

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = dir === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="music" className="relative py-24 md:py-36 bg-[#F7F3EA] text-[#24241F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold mb-3 block">
              09 · THE SENSUAL HOME
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#24241F] mb-4">
              {title[language]}
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#24241F]/75 leading-relaxed">
              {subtitle[language]}
            </p>
          </div>

          {/* Scroll Arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-3 border border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-3 border border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track (Desktop) / Swipe Gallery (Mobile) */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
        >
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-start flex flex-col group"
            >
              <div className="relative overflow-hidden bg-[#EFE8DA] aspect-[4/5] mb-4">
                <img
                  src={item.image}
                  alt={item.title[language]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#24241F]/80 text-[#F7F3EA] text-[10px] font-sans tracking-[0.2em] uppercase px-2.5 py-1">
                  {item.tag}
                </div>
              </div>

              <div className="border-t border-[#4B502E]/20 pt-3">
                <h3 className="font-serif text-2xl text-[#24241F] mb-2 font-normal">
                  {item.title[language]}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#24241F]/75 leading-relaxed">
                  {item.detail[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
