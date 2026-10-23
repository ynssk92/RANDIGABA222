import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { X, CheckCircle, MessageSquare, PhoneCall, ExternalLink } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    rooms,
    selectedBookingRoomId,
    addBooking,
    settings,
    language
  } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [roomId, setRoomId] = useState(selectedBookingRoomId || rooms[0]?.id || '');
  const [specialRequest, setSpecialRequest] = useState('');
  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  if (!isBookingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !checkIn || !checkOut) return;

    const newId = addBooking({
      firstName,
      lastName,
      email,
      phone,
      country,
      checkIn,
      checkOut,
      guests,
      roomId,
      specialRequest
    });

    setSubmittedBookingId(newId);
  };

  const handleResetAndClose = () => {
    setSubmittedBookingId(null);
    setIsBookingOpen(false);
  };

  const selectedRoomObj = rooms.find((r) => r.id === roomId) || rooms[0];

  const whatsappDirectUrl = `https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Dar Randigaba, I would like to inquire about staying from ${checkIn || 'soon'} to ${checkOut || 'soon'} for ${guests} guests in ${selectedRoomObj?.name[language] || 'a room'}.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#24241F]/80 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-[#F7F3EA] text-[#24241F] shadow-2xl p-6 sm:p-10 my-auto border border-[#4B502E]/20 animate-fadeIn">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-[#24241F] hover:text-[#4B502E] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X size={22} />
        </button>

        {submittedBookingId ? (
          <div className="py-10 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 bg-[#4B502E]/10 text-[#4B502E] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold block mb-2">
              REQUEST RECEIVED · {submittedBookingId}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#24241F] mb-4">
              {language === 'fr'
                ? 'Votre demande est entre nos mains.'
                : language === 'ar'
                ? 'تم استلام طلب حجزكم بعناية.'
                : 'Your request is in our hands.'}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#24241F]/80 leading-relaxed mb-8">
              {language === 'fr'
                ? `Merci ${firstName}. Said et l'équipe de Dar Randigaba vous répondront personnellement à ${email} sous quelques heures pour confirmer la disponibilité et préparer votre arrivée.`
                : language === 'ar'
                ? `شكراً لك ${firstName}. سيتواصل معك سعيد وفريق دار رانديغابا عبر البريد ${email} لتأكيد التوفر وترتيب وصولكم.`
                : `Thank you ${firstName}. Said and the Dar Randigaba team will reply personally to ${email} within a few hours to confirm availability and discuss your stay.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4B502E] text-[#F7F3EA] text-xs font-sans tracking-[0.18em] uppercase hover:bg-[#414628] transition-colors"
              >
                <MessageSquare size={16} />
                <span>Notify via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-3 border border-[#4B502E] text-[#4B502E] text-xs font-sans tracking-[0.18em] uppercase hover:bg-[#4B502E]/10 transition-colors cursor-pointer"
              >
                {language === 'fr' ? 'Terminer' : language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <Logo variant="header" className="mb-4" />
              <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#4B502E] font-semibold block mb-2">
                DIRECT RESERVATION INQUIRY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#24241F] font-normal mb-2">
                {language === 'fr'
                  ? 'Réserver votre séjour'
                  : language === 'ar'
                  ? 'طلب حجز إقامتكم'
                  : 'Check Availability & Reserve'}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#24241F]/70">
                {language === 'fr'
                  ? 'Chaque demande est traitée directement par nos hôtes. Aucun paiement requis à cette étape.'
                  : language === 'ar'
                  ? 'تتم مراجعة كل طلب مباشرة من قِبل مضيفينا. لا يُطلب أي دفع مسبق في هذه المرحلة.'
                  : 'Every request is reviewed directly by our hosts. No upfront charge is made at this stage.'}
              </p>
            </div>

            {/* Alternative Direct Channels (WhatsApp & Booking.com) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-3 bg-[#EFE8DA] text-xs font-sans">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-[#F7F3EA] text-[#4B502E] transition-colors"
              >
                <MessageSquare size={16} />
                <span className="font-medium">Direct WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 p-2 hover:bg-[#F7F3EA] text-[#4B502E] transition-colors"
              >
                <PhoneCall size={16} />
                <span className="font-medium">Direct Phone</span>
              </a>

              <a
                href={settings.bookingComUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 hover:bg-[#F7F3EA] text-[#4B502E] transition-colors"
              >
                <ExternalLink size={16} />
                <span className="font-medium">Booking.com</span>
              </a>
            </div>

            {/* Direct Booking Request Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Prénom *' : language === 'ar' ? 'الاسم الشخصي *' : 'First Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Elena"
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Nom *' : language === 'ar' ? 'الاسم العائلي *' : 'Last Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Moretti"
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Téléphone' : language === 'ar' ? 'الهاتف' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 ..."
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Pays de résidence' : language === 'ar' ? 'البلد' : 'Country'}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. France, UK"
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Arrivée (Check-in) *' : language === 'ar' ? 'تاريخ الوصول *' : 'Check-in *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Départ (Check-out) *' : language === 'ar' ? 'تاريخ المغادرة *' : 'Check-out *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                    {language === 'fr' ? 'Voyageurs' : language === 'ar' ? 'عدد النزلاء' : 'Guests'}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>Whole House (Up to 6)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                  {language === 'fr' ? 'Chambre souhaitée' : language === 'ar' ? 'الغرفة المختارة' : 'Preferred Room'}
                </label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name[language]} ({r.pricePerNight} {r.currency}/night)
                    </option>
                  ))}
                  <option value="any">Any Available Sanctuary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans tracking-wider uppercase text-[#4B502E] font-medium mb-1">
                  {language === 'fr' ? 'Demande particulière ou heure d’arrivée' : language === 'ar' ? 'ملاحظات خاصة أو موعد الوصول' : 'Special Requests or Dietary Notes'}
                </label>
                <textarea
                  rows={2}
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Late arrival, vegetarian breakfast, quiet room preference..."
                  className="w-full px-3 py-2 bg-[#FCFBF7] border border-[#4B502E]/25 text-sm focus:border-[#4B502E] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[#24241F]/60">
                  {selectedRoomObj ? `${selectedRoomObj.pricePerNight} € / night` : ''}
                </span>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#4B502E] text-[#F7F3EA] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#414628] transition-colors cursor-pointer"
                >
                  {language === 'fr' ? 'Envoyer la demande' : language === 'ar' ? 'إرسال طلب الحجز' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
