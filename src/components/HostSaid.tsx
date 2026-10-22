import React from 'react';
import { useCms } from '../context/CmsContext';

export const HostSaid: React.FC = () => {
  const { language } = useCms();

  const title = {
    en: 'Meet Said.',
    fr: 'Rencontrer Saïd.',
    ar: 'تعرّف على سعيد.',
  };

  const paragraphs = [
    {
      en: 'Said was born with an abiding passion for sound, stories, and the quiet landscape of the Souss. Long before welcoming travelers to Dar Randigaba, his world was built of vinyl grooves—deep jazz, classic soul, and fingerstyle acoustic guitar chords echoing through late desert evenings.',
      fr: 'Saïd a grandi avec une passion chevillée au corps pour la musique, les histoires et les horizons calmes du Souss. Bien avant d’accueillir des voyageurs à Dar Randigaba, son univers était peuplé de disques vinyles—le jazz profond, la soul des grands maîtres et les accords d’une guitare acoustique qui résonne dans la douceur des nuits.',
      ar: 'وُلد سعيد بشغف أصيل بالموسيقى والقصص وسكينة وادي سوس. وقبل أن يفتح أبواب دار رانديغابا للمسافرين، كان عالمه عامراً بأسطوانات الفينيل النادرة—أنغام الجاز العميقة، وأغاني السول الكلاسيكية، وأوتار الغيتار التي تنساب في هدوء المساء.',
    },
    {
      en: 'An avid cyclist and trekker, Said knows every dirt path threading between the ancient palm groves of Tiout and the stone foothills of the Anti-Atlas. In the morning, you’ll find him tending the courtyard plants or reading an essay on architecture; by dusk, he’s in the kitchen braising an earthen tagine with wild herbs or sharing a rare record with guests on the rooftop.',
      fr: 'Cycliste passionné et marcheur infatigable, Saïd connaît chaque sentier de terre reliant les palmeraies séculaires de Tiout aux contreforts de l’Anti-Atlas. Le matin, il veille sur les orangers du patio ou parcourt un recueil d’architecture ; au crépuscule, il prépare un tajine aux herbes sauvages ou dépose un disque rare sur la platine du toit-terrasse.',
      ar: 'يهوى ركوب الدراجات ورياضة المشي في الطبيعة، ويعرف كل الدروب الترابية بين واحات نخيل تيوت وسفوح جبال الأطلس الصغير. في الصباح، تراه يعتني بأشجار الفناء أو يقرأ كتاباً في العمارة؛ ومع الغروب، يعد طاجيناً لذيذاً بالأعشاب البرية ويشارك الضيوف أسطوانة نادرة على السطح.',
    },
    {
      en: '“Dar Randigaba isn’t a hospitality business for me,” Said reflects. “It is simply an open home for people who appreciate quiet mornings, good music, honest food, and authentic conversation.”',
      fr: '« Dar Randigaba n’a jamais été un simple projet hôtelier à mes yeux », confie Saïd. « C’est tout simplement une maison ouverte à ceux qui aiment la paix du matin, la belle musique, la cuisine sincère et les conversations vraies. »',
      ar: '«دار رانديغابا ليست مجرد عمل فندقي بالنسبة لي»، يقول سعيد، «إنما هي بيت مفتوح لكل من يقدر هدوء الصباحات، والموسيقى الراقية، والطعام الصادق، والحوارات الإنسانية الدافئة.»',
    }
  ];

  const badges = [
    { en: 'Jazz & Soul Vinyls', fr: 'Vinyles Jazz & Soul', ar: 'أسطوانات جاز وسول' },
    { en: 'Acoustic Guitar', fr: 'Guitare Acoustique', ar: 'غيتار صوتي' },
    { en: 'Atlas Trekking & Cycling', fr: 'Trek & Vélo dans l’Atlas', ar: 'جولات دراجات ومشي' },
    { en: 'Earthen Slow Cooking', fr: 'Cuisine au Pisé & Épices', ar: 'طهي ترابي على مهل' },
  ];

  return (
    <section id="host" className="relative py-24 md:py-36 bg-[#454b2c] text-[#f8f4e7]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-[#f8f4e7]">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative group overflow-hidden bg-[#3b4025] shadow-xs aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85"
                alt="Said, Host of Dar Randigaba in Taroudant"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103 filter contrast-[1.03]"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#f8f4e7]/80">
              <span>SAID · HOST & CURATOR</span>
              <span>TAROUDANT RESIDENT</span>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#f8f4e7] font-semibold mb-3 block">
              08 · THE HUMAN STORY
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#f8f4e7] mb-6">
              {title[language]}
            </h2>

            <div className="space-y-5 text-[#f8f4e7] font-sans text-base leading-relaxed">
              <p className="text-[#f8f4e7]">{paragraphs[0][language]}</p>
              <p className="text-[#f8f4e7]">{paragraphs[1][language]}</p>
              <blockquote className="font-serif italic text-lg sm:text-xl text-[#f8f4e7] border-l-2 border-[#f8f4e7]/40 pl-5 my-6 leading-relaxed">
                {paragraphs[2][language]}
              </blockquote>
            </div>

            {/* Verified Attributes */}
            <div className="mt-8 pt-6 border-t border-[#f8f4e7]/20 flex flex-wrap gap-x-6 gap-y-2 text-xs font-sans tracking-wider text-[#f8f4e7]">
              {badges.map((b, i) => (
                <span key={i} className="flex items-center gap-2 text-[#f8f4e7]">
                  <span className="w-1.5 h-1.5 bg-[#f8f4e7]" />
                  <span className="text-[#f8f4e7]">{b[language]}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
