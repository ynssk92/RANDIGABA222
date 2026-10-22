import React from 'react';
import { useCms } from '../context/CmsContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const { settings, language } = useCms();

  const cleanPhone = settings.phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage);
  const href = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <aside aria-label="WhatsApp Assistance" className="fixed bottom-6 right-6 z-30">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#4B502E] text-[#FCFBF7] shadow-lg hover:bg-[#414628] transition-all duration-300 border border-[#F7F3EA]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B502E]"
        aria-label="Chat with Dar Randigaba on WhatsApp"
      >
        <MessageCircle size={18} className="shrink-0" />
        <span className="text-xs font-sans tracking-wider uppercase font-medium hidden sm:inline">
          {language === 'fr' ? 'Écrire sur WhatsApp' : language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        </span>
      </a>
    </aside>
  );
};
