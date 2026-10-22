import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { BookingRequest } from '../types';
import { Logo } from './Logo';
import { AdminLogin } from './AdminLogin';
import {
  X,
  LayoutGrid,
  Globe,
  CalendarCheck,
  Bed,
  Compass,
  FileText,
  Star,
  Image as ImageIcon,
  Settings as SettingsIcon,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  Clock,
  LogOut,
  Key,
  ShieldCheck,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { SeoMetaManager } from './admin/SeoMetaManager';

type AdminTab =
  | 'sections'
  | 'seo'
  | 'bookings'
  | 'rooms'
  | 'experiences'
  | 'timeline'
  | 'reviews'
  | 'journal'
  | 'gallery'
  | 'settings'
  | 'security';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    sections,
    toggleSection,
    moveSection,
    bookings,
    updateBookingStatus,
    rooms,
    updateRoom,
    experiences,
    updateExperience,
    timeline,
    updateTimelineEvent,
    reviews,
    addReview,
    deleteReview,
    articles,
    updateArticle,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    settings,
    updateSettings,
    resetToDefaults,
    language,
    isAdminAuthenticated,
    adminUser,
    logoutAdmin
  } = useCms();

  const [activeTab, setActiveTab] = useState<AdminTab>('sections');
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Security password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ text: string; error: boolean } | null>(null);
  const [isUpdatingPwd, setIsUpdatingPwd] = useState(false);

  if (!isAdminOpen) return null;

  // Protected Route Guard: If unauthenticated, redirect/render Login Page
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    if (newPassword !== confirmPassword) {
      setPwdMsg({ text: 'New passwords do not match.', error: true });
      return;
    }

    if (newPassword.length < 8) {
      setPwdMsg({ text: 'New password must be at least 8 characters long.', error: true });
      return;
    }

    setIsUpdatingPwd(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setPwdMsg({ text: data.error || 'Failed to update password.', error: true });
      } else {
        setPwdMsg({ text: 'Password updated and re-hashed with bcrypt successfully!', error: false });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setPwdMsg({ text: 'Error connecting to authentication endpoint.', error: true });
    } finally {
      setIsUpdatingPwd(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex bg-[#24241F]/80 backdrop-blur-xs overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full h-full bg-[#F7F3EA] text-[#24241F] flex flex-col md:flex-row overflow-hidden">
        {/* Admin Sidebar */}
        <div className="w-full md:w-64 bg-[#24241F] text-[#F7F3EA] p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between border-b border-[#4B502E]/40 pb-4 mb-6">
              <div>
                <Logo variant="header" light={true} withSubtitle={true} />
              </div>
              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="md:hidden p-1 text-[#F7F3EA] hover:text-[#D9C8AE]"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-1 text-xs font-sans tracking-wider">
              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'sections'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <LayoutGrid size={16} />
                <span>Page Builder (Sections)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'seo'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <Globe size={16} />
                <div className="flex items-center justify-between w-full">
                  <span>SEO & Meta Tags</span>
                  <span className="text-[9px] uppercase px-1 bg-[#A76547] text-white font-mono">New</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'bookings'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CalendarCheck size={16} />
                  <span>Bookings</span>
                </div>
                {bookings.filter((b) => b.status === 'Pending').length > 0 && (
                  <span className="bg-[#A76547] text-white px-1.5 py-0.5 text-[10px] font-mono">
                    {bookings.filter((b) => b.status === 'Pending').length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rooms')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'rooms'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <Bed size={16} />
                <span>Rooms & Rates</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('experiences')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'experiences'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <Compass size={16} />
                <span>Experiences</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <Clock size={16} />
                <span>48h Taroudant Timeline</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <Star size={16} />
                <span>Guest Reviews</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('journal')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'journal'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <FileText size={16} />
                <span>Journal Articles</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <ImageIcon size={16} />
                <span>Gallery Items</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <SettingsIcon size={16} />
                <span>Site Settings</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-[#4B502E] text-[#FCFBF7]'
                    : 'text-[#EFE8DA]/70 hover:bg-[#414628]/50 hover:text-[#FCFBF7]'
                }`}
              >
                <ShieldCheck size={16} />
                <span>Security & Passwords</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-[#4B502E]/30 space-y-3">
            {/* User Session Info Badge */}
            <div className="p-2.5 bg-[#4B502E]/20 border border-[#4B502E]/30 text-xs font-sans text-[#EFE8DA]">
              <div className="flex items-center gap-2 mb-1">
                <UserCheck size={14} className="text-[#D9C8AE]" />
                <span className="font-semibold text-xs text-[#FCFBF7]">Active Admin Session</span>
              </div>
              <div className="text-[11px] truncate text-[#D9C8AE] font-mono">
                {adminUser?.username || 'admin@darrandigaba.com'}
              </div>
              <div className="text-[10px] text-[#EFE8DA]/60 uppercase tracking-widest mt-0.5">
                Role: {adminUser?.role || 'super-admin'} · Bcrypt Secure
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={() => logoutAdmin()}
              className="w-full flex items-center justify-center gap-2 py-2 border border-red-400/40 text-red-300 hover:bg-red-950/40 hover:text-red-100 text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>

            <button
              type="button"
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center gap-2 py-2 border border-[#EFE8DA]/20 text-[#EFE8DA]/60 hover:text-[#EFE8DA] hover:border-[#EFE8DA] text-xs font-sans tracking-wider uppercase transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="w-full py-2.5 bg-[#4B502E] text-[#FCFBF7] hover:bg-[#414628] text-xs font-sans tracking-[0.2em] uppercase transition-colors cursor-pointer"
            >
              Back to Live Site
            </button>
          </div>
        </div>

        {/* Admin Main Work Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Bar */}
          <div className="border-b border-[#4B502E]/20 bg-[#EFE8DA] px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#24241F]">
                {activeTab === 'sections' && 'Visual Page Builder & Section Management'}
                {activeTab === 'seo' && 'SEO & Meta Management (Search Engines & Social Cards)'}
                {activeTab === 'bookings' && 'Direct Booking Requests'}
                {activeTab === 'rooms' && 'Rooms & Sleeping Sanctuaries CMS'}
                {activeTab === 'experiences' && 'Curated Experiences'}
                {activeTab === 'timeline' && '48 Hours in Taroudant Timeline'}
                {activeTab === 'reviews' && 'Editorial Guest Reviews'}
                {activeTab === 'journal' && 'Notes from Taroudant (Journal)'}
                {activeTab === 'gallery' && 'Curatorial Gallery Archive'}
                {activeTab === 'settings' && 'Site Settings, Contacts & SEO Metadata'}
                {activeTab === 'security' && 'Security, Authentication & Password Management'}
              </h2>
              <span className="text-xs font-sans text-[#4B502E]">
                All modifications are saved live and instantaneously reflected on the public website.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => logoutAdmin()}
                className="p-2 border border-red-700/30 text-red-800 hover:bg-red-50 transition-colors cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="p-2 border border-[#4B502E] text-[#4B502E] hover:bg-[#4B502E] hover:text-[#F7F3EA] transition-colors cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest"
              >
                <X size={16} />
                <span>Exit Admin</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-10 flex-1">
            {/* 1. SECTIONS / VISUAL PAGE BUILDER (Section 28 of prompt) */}
            {activeTab === 'sections' && (
              <div className="max-w-4xl space-y-4">
                <div className="p-4 bg-[#EFE8DA] border border-[#4B502E]/20 text-xs font-sans text-[#24241F]/80">
                  <p className="font-semibold text-[#4B502E] mb-1">
                    Visual Page Builder — Prompt Rule 28
                  </p>
                  <p>
                    Reorder sections using the arrows or toggle sections ON/OFF. The public homepage immediately respects this sequence and visibility.
                  </p>
                </div>

                <div className="space-y-3">
                  {[...sections]
                    .sort((a, b) => a.order - b.order)
                    .map((section, idx, arr) => (
                      <div
                        key={section.id}
                        className={`p-4 border flex items-center justify-between transition-colors ${
                          section.enabled
                            ? 'bg-[#FCFBF7] border-[#4B502E]/25'
                            : 'bg-[#EFE8DA]/60 border-neutral-300 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-[#4B502E] w-6">
                            #{idx + 1}
                          </span>
                          <div>
                            <span className="font-serif text-lg text-[#24241F]">
                              {section.name}
                            </span>
                            <span className="text-[11px] font-sans text-[#24241F]/60 ml-3">
                              ID: {section.id}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Toggle ON/OFF */}
                          <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            className={`px-3 py-1 text-xs font-sans tracking-wider uppercase flex items-center gap-1.5 cursor-pointer border ${
                              section.enabled
                                ? 'bg-[#4B502E] text-[#FCFBF7] border-[#4B502E]'
                                : 'bg-transparent text-[#24241F]/60 border-neutral-400'
                            }`}
                          >
                            {section.enabled ? (
                              <>
                                <Eye size={14} />
                                <span>ON</span>
                              </>
                            ) : (
                              <>
                                <EyeOff size={14} />
                                <span>OFF</span>
                              </>
                            )}
                          </button>

                          {/* Move Up */}
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSection(section.id, 'up')}
                            className="p-1.5 border border-[#4B502E]/30 text-[#4B502E] hover:bg-[#4B502E] hover:text-[#FCFBF7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            aria-label="Move Section Up"
                          >
                            <ArrowUp size={16} />
                          </button>

                          {/* Move Down */}
                          <button
                            type="button"
                            disabled={idx === arr.length - 1}
                            onClick={() => moveSection(section.id, 'down')}
                            className="p-1.5 border border-[#4B502E]/30 text-[#4B502E] hover:bg-[#4B502E] hover:text-[#FCFBF7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                            aria-label="Move Section Down"
                          >
                            <ArrowDown size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SEO & META MANAGEMENT TOOL */}
            {activeTab === 'seo' && <SeoMetaManager />}

            {/* 2. BOOKINGS MANAGEMENT (Section 26 of prompt) */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#4B502E]">
                    {bookings.length} RESERVATION INQUIRIES REGISTERED
                  </span>
                </div>

                <div className="overflow-x-auto border border-[#4B502E]/20 bg-[#FCFBF7]">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#EFE8DA] text-[#4B502E] border-b border-[#4B502E]/20 uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Guest</th>
                        <th className="p-3">Dates</th>
                        <th className="p-3">Room</th>
                        <th className="p-3">Guests</th>
                        <th className="p-3">Notes</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#4B502E]/10">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#F7F3EA]">
                          <td className="p-3 font-mono font-bold text-[#4B502E]">{b.id}</td>
                          <td className="p-3">
                            <div className="font-semibold">{b.firstName} {b.lastName}</div>
                            <div className="text-[#24241F]/60 text-[11px]">{b.email} · {b.phone}</div>
                          </td>
                          <td className="p-3 font-mono">{b.checkIn} → {b.checkOut}</td>
                          <td className="p-3 font-serif text-sm">{b.roomId}</td>
                          <td className="p-3">{b.guests}</td>
                          <td className="p-3 max-w-xs truncate text-[11px] text-[#24241F]/70">
                            {b.specialRequest || 'None'}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${
                                b.status === 'Confirmed'
                                  ? 'bg-[#4B502E] text-white'
                                  : b.status === 'Pending'
                                  ? 'bg-[#A76547] text-white'
                                  : 'bg-neutral-200 text-neutral-700'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                updateBookingStatus(
                                  b.id,
                                  e.target.value as BookingRequest['status']
                                )
                              }
                              className="px-2 py-1 border border-[#4B502E]/30 bg-white text-xs cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Declined">Declined</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ROOMS MANAGEMENT */}
            {activeTab === 'rooms' && (
              <div className="space-y-6 max-w-4xl">
                {rooms.map((room) => (
                  <div key={room.id} className="p-6 bg-[#FCFBF7] border border-[#4B502E]/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#4B502E]/15 pb-3">
                      <div>
                        <h3 className="font-serif text-2xl text-[#24241F]">{room.name.en}</h3>
                        <span className="text-xs font-sans text-[#4B502E]">{room.capacity} · {room.size}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-xl font-bold text-[#4B502E]">
                          {room.pricePerNight} €
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingRoomId(editingRoomId === room.id ? null : room.id)}
                          className="px-3 py-1 border border-[#4B502E] text-[#4B502E] text-xs font-sans uppercase tracking-wider hover:bg-[#4B502E] hover:text-white"
                        >
                          {editingRoomId === room.id ? 'Close' : 'Edit Room'}
                        </button>
                      </div>
                    </div>

                    {editingRoomId === room.id && (
                      <div className="space-y-4 pt-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-sans text-[#4B502E] uppercase font-bold mb-1">
                              Price per night (€)
                            </label>
                            <input
                              type="number"
                              value={room.pricePerNight}
                              onChange={(e) =>
                                updateRoom({ ...room, pricePerNight: Number(e.target.value) })
                              }
                              className="w-full px-3 py-1.5 border border-neutral-300 text-sm bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-sans text-[#4B502E] uppercase font-bold mb-1">
                              Capacity & Size
                            </label>
                            <input
                              type="text"
                              value={room.size}
                              onChange={(e) => updateRoom({ ...room, size: e.target.value })}
                              className="w-full px-3 py-1.5 border border-neutral-300 text-sm bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-sans text-[#4B502E] uppercase font-bold mb-1">
                            Featured Image URL
                          </label>
                          <input
                            type="text"
                            value={room.image}
                            onChange={(e) => updateRoom({ ...room, image: e.target.value })}
                            className="w-full px-3 py-1.5 border border-neutral-300 text-sm bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-sans text-[#4B502E] uppercase font-bold mb-1">
                            English Description
                          </label>
                          <textarea
                            rows={3}
                            value={room.description.en}
                            onChange={(e) =>
                              updateRoom({
                                ...room,
                                description: { ...room.description, en: e.target.value }
                              })
                            }
                            className="w-full px-3 py-1.5 border border-neutral-300 text-sm bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. EXPERIENCES */}
            {activeTab === 'experiences' && (
              <div className="space-y-6 max-w-4xl">
                {experiences.map((exp) => (
                  <div key={exp.id} className="p-6 bg-[#FCFBF7] border border-[#4B502E]/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl text-[#24241F]">{exp.title.en}</h3>
                      <span className="text-xs font-sans text-[#4B502E]">{exp.duration} · {exp.distance}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#24241F]/80">
                      {exp.shortStory.en}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 5. TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="space-y-4 max-w-4xl">
                {timeline.map((event, idx) => (
                  <div key={idx} className="p-4 bg-[#FCFBF7] border border-[#4B502E]/20 flex items-start gap-4">
                    <span className="font-mono text-xl font-bold text-[#4B502E] w-20">{event.time}</span>
                    <div className="flex-1">
                      <h4 className="font-serif text-lg text-[#24241F]">{event.title.en}</h4>
                      <p className="font-sans text-xs text-[#24241F]/70">{event.description.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-4xl">
                {reviews.map((r) => (
                  <div key={r.id} className="p-5 bg-[#FCFBF7] border border-[#4B502E]/20 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-sm">{r.guestName}</span>
                        <span className="text-xs text-[#4B502E]">({r.platform} · {r.origin})</span>
                      </div>
                      <p className="font-serif italic text-sm text-[#24241F]/80">{r.quote.en}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteReview(r.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 7. JOURNAL */}
            {activeTab === 'journal' && (
              <div className="space-y-4 max-w-4xl">
                {articles.map((art) => (
                  <div key={art.id} className="p-6 bg-[#FCFBF7] border border-[#4B502E]/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl text-[#24241F]">{art.title.en}</h3>
                      <span className="text-xs font-sans text-[#4B502E]">{art.date} · {art.readTime}</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#24241F]/80">{art.excerpt.en}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 8. GALLERY */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
                {gallery.map((g) => (
                  <div key={g.id} className="relative group border border-[#4B502E]/20 bg-white p-2">
                    <img src={g.image} alt={g.title.en} className="w-full aspect-square object-cover" />
                    <div className="mt-2 text-[11px] font-sans">
                      <div className="font-semibold truncate">{g.title.en}</div>
                      <div className="text-[#4B502E] uppercase">{g.category}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(g.id)}
                      className="absolute top-3 right-3 p-1 bg-red-600 text-white rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 9. SETTINGS & SEO */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl bg-[#FCFBF7] border border-[#4B502E]/20 p-8 space-y-5">
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    House Name
                  </label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => updateSettings({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    Official Telephone
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => updateSettings({ phone: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSettings({ email: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    Default WhatsApp Floating Inquiry Message
                  </label>
                  <textarea
                    rows={2}
                    value={settings.whatsappMessage}
                    onChange={(e) => updateSettings({ whatsappMessage: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    Booking.com Direct Link
                  </label>
                  <input
                    type="text"
                    value={settings.bookingComUrl}
                    onChange={(e) => updateSettings({ bookingComUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) => updateSettings({ seoTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={settings.seoDescription}
                    onChange={(e) => updateSettings({ seoDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                <div className="p-4 bg-[#EFE8DA] border border-[#4B502E]/25 space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-[#24241F] flex items-center gap-2">
                      <Globe size={16} className="text-[#4B502E]" />
                      Dedicated SEO &amp; OpenGraph Tool
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('seo')}
                      className="px-3 py-1.5 bg-[#4B502E] text-white text-xs font-sans uppercase tracking-wider hover:bg-[#414628] cursor-pointer"
                    >
                      Open SEO Tool
                    </button>
                  </div>
                  <p className="text-xs font-sans text-[#24241F]/70">
                    Includes real-time Google search snippet simulation, OpenGraph social image previews, character meters, and direct database storage.
                  </p>
                </div>
              </div>
            )}

            {/* 10. SECURITY & PASSWORDS */}
            {activeTab === 'security' && (
              <div className="max-w-3xl space-y-8">
                {/* Security Status Overview */}
                <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#4B502E]/15 pb-3">
                    <ShieldCheck size={20} className="text-[#4B502E]" />
                    <h3 className="font-serif text-xl text-[#24241F]">
                      Authentication & Cryptographic Status
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-3 bg-[#EFE8DA]/60 border border-[#4B502E]/10 space-y-1">
                      <span className="font-semibold text-[#4B502E] uppercase tracking-wider block text-[10px]">
                        Password Algorithm
                      </span>
                      <span className="font-mono text-sm text-[#24241F]">bcrypt (12 rounds)</span>
                      <p className="text-[11px] text-[#24241F]/65">
                        Passwords are salted with 12 rounds and hashed. Plain-text is never stored.
                      </p>
                    </div>

                    <div className="p-3 bg-[#EFE8DA]/60 border border-[#4B502E]/10 space-y-1">
                      <span className="font-semibold text-[#4B502E] uppercase tracking-wider block text-[10px]">
                        Session Security
                      </span>
                      <span className="font-mono text-sm text-[#24241F]">JWT in HttpOnly Secure Cookie</span>
                      <p className="text-[11px] text-[#24241F]/65">
                        Protected with SameSite=Strict and 8-hour token expiration.
                      </p>
                    </div>

                    <div className="p-3 bg-[#EFE8DA]/60 border border-[#4B502E]/10 space-y-1">
                      <span className="font-semibold text-[#4B502E] uppercase tracking-wider block text-[10px]">
                        Brute-Force Rate Limiting
                      </span>
                      <span className="font-mono text-sm text-[#24241F]">Max 5 attempts / 15m</span>
                      <p className="text-[11px] text-[#24241F]/65">
                        IP addresses exceeding threshold are temporarily locked out.
                      </p>
                    </div>

                    <div className="p-3 bg-[#EFE8DA]/60 border border-[#4B502E]/10 space-y-1">
                      <span className="font-semibold text-[#4B502E] uppercase tracking-wider block text-[10px]">
                        Authenticated Super-Admin
                      </span>
                      <span className="font-mono text-sm text-[#24241F] truncate block">
                        {adminUser?.username || 'admin@darrandigaba.com'}
                      </span>
                      <p className="text-[11px] text-[#24241F]/65">
                        Role: {adminUser?.role || 'super-admin'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Change Password Form */}
                <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 space-y-5">
                  <div className="flex items-center gap-2 border-b border-[#4B502E]/15 pb-3">
                    <Key size={18} className="text-[#4B502E]" />
                    <h3 className="font-serif text-xl text-[#24241F]">
                      Update Admin Password
                    </h3>
                  </div>

                  {pwdMsg && (
                    <div
                      className={`p-3 text-xs font-sans ${
                        pwdMsg.error
                          ? 'bg-red-50 border border-red-200 text-red-800'
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      }`}
                    >
                      {pwdMsg.text}
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                        New Password (minimum 8 characters) *
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] mb-1">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUpdatingPwd}
                      className="px-6 py-2.5 bg-[#4B502E] text-white hover:bg-[#414628] disabled:opacity-60 text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {isUpdatingPwd ? 'Updating & Hashing...' : 'Update Password with Bcrypt'}
                    </button>
                  </form>
                </div>

                {/* Environment Variables Reference Guide */}
                <div className="bg-[#EFE8DA] border border-[#4B502E]/20 p-6 space-y-3">
                  <h4 className="font-serif text-lg text-[#24241F]">
                    Environment Configuration Guide (.env)
                  </h4>
                  <p className="text-xs font-sans text-[#24241F]/80 leading-relaxed">
                    The backend reads super-admin credentials and cryptographic secrets upon server initialization.
                    You can customize them in your <span className="font-mono bg-white px-1">.env</span> file:
                  </p>
                  <pre className="p-3 bg-[#24241F] text-[#FCFBF7] text-xs font-mono overflow-x-auto leading-relaxed">
{`# Super-Admin Credentials
ADMIN_USERNAME="admin@darrandigaba.com"
ADMIN_PASSWORD="Taroudant#2026!"

# JWT Secret Token Key
JWT_SECRET="dar_randigaba_secret_jwt_key_2026_super_secure"`}
                  </pre>
                  <p className="text-[11px] font-sans text-[#4B502E]">
                    The server automatically computes a fresh 10-round bcrypt hash on boot and never saves plain-text passwords.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
