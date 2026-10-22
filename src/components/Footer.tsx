import React from 'react';
import { useCms } from '../context/CmsContext';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Instagram, ShieldCheck, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setLanguage, settings, setIsAdminOpen, setIs404Open } = useCms();

  return (
    <footer id="footer" className="bg-[#24241F] text-[#F7F3EA] pt-20 pb-12 border-t border-[#4B502E]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand & Editorial Description */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <Logo variant="footer" light={true} withSubtitle={true} className="items-start" />
              </div>
              <p className="font-sans text-sm text-[#EFE8DA]/80 leading-relaxed max-w-sm mb-6">
                {language === 'fr'
                  ? 'Une maison d’art marocaine à Taroudant où la lenteur des matins, la musique, la culture et l’hospitalité humaine se rencontrent.'
                  : language === 'ar'
                  ? 'بيت مغربي فني في تارودانت تلتقي فيه الصباحات الهادئة وأنغام الموسيقى والثقافة والدفء الإنساني.'
                  : 'An artistic Moroccan home in Taroudant where slow mornings, music, culture and warm human hospitality meet.'}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-sans tracking-widest text-[#D9C8AE]">
              <span>TAROUDANT · MOROCCO</span>
              <span aria-hidden="true">·</span>
              <span>83000</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#D9C8AE] font-semibold mb-4 block">
              {language === 'fr' ? 'EXPLORATION' : language === 'ar' ? 'استكشاف' : 'EXPLORATION'}
            </span>
            <ul className="space-y-3 text-sm font-sans text-[#EFE8DA]/80">
              <li>
                <a href="#dar" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Le Dar' : language === 'ar' ? 'الدار' : 'The Dar'}
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Les Chambres' : language === 'ar' ? 'الغرف' : 'The Rooms'}
                </a>
              </li>
              <li>
                <a href="#rooftop" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Le Rooftop' : language === 'ar' ? 'السطح' : 'The Rooftop'}
                </a>
              </li>
              <li>
                <a href="#host" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Rencontrer Saïd' : language === 'ar' ? 'تعرف على سعيد' : 'Meet Said'}
                </a>
              </li>
              <li>
                <a href="#taroudant" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Taroudant' : language === 'ar' ? 'تارودانت' : 'Taroudant'}
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#FCFBF7] transition-colors">
                  {language === 'fr' ? 'Journal' : language === 'ar' ? 'المجلة' : 'Journal'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location Details */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#D9C8AE] font-semibold mb-4 block">
              {language === 'fr' ? 'CONTACT & ADRESSE' : language === 'ar' ? 'العنوان والتواصل' : 'LOCATION & CONTACT'}
            </span>

            <div className="space-y-4 text-sm font-sans text-[#EFE8DA]/80 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D9C8AE] shrink-0 mt-1" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#D9C8AE] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#FCFBF7] transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#D9C8AE] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#FCFBF7] transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Direct Directions & Booking link */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans tracking-wider uppercase text-[#D9C8AE] pt-2">
              <a
                href="https://maps.google.com/?q=Taroudant+Morocco"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <Compass size={14} />
                <span>{language === 'fr' ? 'Itinéraire' : language === 'ar' ? 'خريطة الوصول' : 'Get Directions'}</span>
              </a>

              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1.5"
              >
                <Instagram size={14} />
                <span>Instagram</span>
              </a>

              <a
                href={settings.bookingComUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Booking.com
              </a>
            </div>
          </div>
        </div>

        {/* Large Brand Signature Statement */}
        <div className="py-12 border-t border-[#4B502E]/25 text-center flex flex-col items-center">
          <Logo variant="large" light={true} withSubtitle={true} className="items-center" />
        </div>

        {/* Bottom Bar: Copyright, Language, Admin Portal, 404 Preview */}
        <div className="pt-8 border-t border-[#4B502E]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#EFE8DA]/60">
          <div>
            © {new Date().getFullYear()} Dar Randigaba. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIs404Open(true)}
              className="hover:text-[#D9C8AE] transition-colors cursor-pointer"
            >
              {language === 'fr' ? 'Page 404' : language === 'ar' ? 'صفحة 404' : '404 Preview'}
            </button>

            <span aria-hidden="true">·</span>

            {/* Admin CMS Trigger */}
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-[#D9C8AE] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck size={14} />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
