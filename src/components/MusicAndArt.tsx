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
      image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      tag: 'SOUND & MEMORY'
    },
    {
      title: { en: 'The Acoustic Guitar', fr: 'La Guitare Acoustique', ar: 'الغيتار الصوتي' },
      detail: {
        en: 'An old cedar guitar leaning against the salon bookshelf, tuned and ready for any wandering musician.',
        fr: 'Une guitare en cèdre appuyée contre la bibliothèque du salon, accordée pour les hôtes mélomanes.',
        ar: 'غيتار من خشب الأرز يستند إلى رفوف مكتبة الصالون، جاهز لكل عازف ومحب للألحان.'
      },
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
      tag: 'INSTRUMENT'
    },
    {
      title: { en: 'The Curated Library', fr: 'La Bibliothèque Choisie', ar: 'المكتبة المختارة' },
      detail: {
        en: 'Volumes on Moroccan vernacular architecture, North African poetry, philosophy, and botanical studies.',
        fr: 'Monographies d’architecture en pisé, poésie du Maghreb, essais d’art et herbiers botaniques.',
        ar: 'مؤلفات في عمارة الطين، ودواوين شعر مغربي وعربي، وكتب فلسفية ونباتية للتأمل الهادئ.'
      },
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      tag: 'WORDS & INK'
    },
    {
      title: { en: 'Hand-Turned Ceramics', fr: 'Céramiques Modelées', ar: 'فخاريات مطروقة' },
      detail: {
        en: 'Earthen vessels from the nearby craft valley of Tiout, holding wild olive sprigs and courtyard flowers.',
        fr: 'Poteries nées des mains des artisans de Tiout, accueillant rameaux d’olivier et fleurs fraîches.',
        ar: 'أوانٍ فخارية صاغها خزافو واحة تيوت، تحتضن أغصان الزيتون وزهور الفناء.'
      },
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      tag: 'EARTH & SHAPE'
    },
    {
      title: { en: 'Shadows & Sunlight', fr: 'Ombres & Lumière', ar: 'الظلال والشمس' },
      detail: {
        en: 'Geometric wooden lattice screens filtering the intense southern sun into calm, meditative patterns.',
        fr: 'Moucharabiehs de cèdre sculpté apprivoisant l’éclat du soleil pour créer des dentelles d’ombres.',
        ar: 'مشربيات خشبية هندسية تروض وهج الشمس لتصنع لوحات من الظل والسكينة.'
      },
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=80',
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
