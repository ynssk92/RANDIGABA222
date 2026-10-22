import React from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';

export const NotFoundView: React.FC = () => {
  const { language, setIs404Open } = useCms();

  const headline = {
    en: 'Lost somewhere between the Medina and the mountains?',
    fr: 'Égaré quelque part entre la Médina et les montagnes ?',
    ar: 'هل تهت في مسافة ما بين دروب المدينة وقمم الجبال؟',
  };

  const body = {
    en: 'In Taroudant, getting lost is often how the most memorable stories begin. Follow the scent of orange blossoms back to the courtyard.',
    fr: 'À Taroudant, se perdre est souvent ainsi que débutent les plus beaux récits. Suivez le parfum des orangers pour regagner le patio.',
    ar: 'في تارودانت، غالباً ما يكون الضياع بداية لأجمل الحكايات التي لا تُنسى. اتبع شذى زهر النارنج لتعود إلى فناء الدار.',
  };

  const cta = {
    en: 'Return to Dar Randigaba',
    fr: 'Retourner à Dar Randigaba',
    ar: 'العودة إلى دار رانديغابا',
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#24241F] text-[#F7F3EA] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto">
      <div className="flex justify-between items-center">
        <Logo variant="header" light={true} />
        <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#D9C8AE]">
          404 · THE MEANDERING PATH
        </span>
      </div>

      <div className="max-w-2xl mx-auto text-center my-auto py-12">
        <span className="font-serif italic text-6xl sm:text-8xl text-[#4B502E] block mb-4">
          404
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFBF7] font-normal leading-tight mb-6 text-balance">
          {headline[language]}
        </h1>

        <p className="font-sans text-base sm:text-lg text-[#EFE8DA]/80 leading-relaxed mb-10 max-w-lg mx-auto">
          {body[language]}
        </p>

        <button
          type="button"
          onClick={() => setIs404Open(false)}
          className="px-8 py-3.5 border border-[#F7F3EA] text-[#F7F3EA] hover:bg-[#F7F3EA] hover:text-[#24241F] text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer"
        >
          {cta[language]}
        </button>
      </div>

      <div className="text-center text-xs font-sans text-[#EFE8DA]/50 tracking-widest uppercase">
        TAROUDANT · MOROCCO
      </div>
    </div>
  );
};
