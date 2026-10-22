import React, { useState, useEffect } from 'react';
import { SeoSettings } from '../../types';
import { applySeoMetadataToHead } from '../../utils/seo';
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  Share2,
  Search,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Smartphone,
  Monitor,
  Eye,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';

interface SeoMetaManagerProps {
  onNotify?: (message: string) => void;
}

const PRESET_OG_IMAGES = [
  {
    name: 'Official Randigaba Seal Logo',
    url: '/assets/aistudio/logo-randigaba_2x_0bd4f40f.png',
    label: 'Branded Crest'
  },
  {
    name: 'Courtyard & Orange Trees',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    label: 'Courtyard Riad'
  },
  {
    name: 'Atlas Rooftop Sunset',
    url: 'https://images.unsplash.com/photo-1512958789358-4dacacbe09c3?q=80&w=1200&auto=format&fit=crop',
    label: 'Rooftop Horizon'
  },
  {
    name: 'Artisan Music & Library Salon',
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
    label: 'Editorial Salon'
  }
];

const DEFAULT_RECOMMENDED: SeoSettings = {
  title: 'Dar Randigaba — Luxury Guest House & Cultural Riad Taroudant',
  metaDescription: 'An artistic Moroccan sanctuary in Taroudant. Experience slow travel, acoustic music salons, courtyard serenity, and authentic editorial hospitality.',
  ogTitle: 'Dar Randigaba — Luxury Guest House & Cultural Riad Taroudant',
  ogDescription: 'An artistic Moroccan home in Taroudant where slow mornings, acoustic music, culture, and warm hospitality meet.',
  ogImage: '/assets/aistudio/logo-randigaba_2x_0bd4f40f.png',
  twitterCard: 'summary_large_image',
  canonicalUrl: 'https://darrandigaba.com',
  keywords: 'Dar Randigaba, Taroudant riad, Morocco luxury guest house, Moroccan sanctuary, slow travel Morocco, boutique hotel Taroudant, cultural riad',
  robots: 'index, follow',
  updatedAt: new Date().toISOString(),
  updatedBy: 'system'
};

export const SeoMetaManager: React.FC<SeoMetaManagerProps> = ({ onNotify }) => {
  const [formData, setFormData] = useState<SeoSettings>(DEFAULT_RECOMMENDED);
  const [initialData, setInitialData] = useState<SeoSettings>(DEFAULT_RECOMMENDED);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Preview Mode States
  const [serpView, setSerpView] = useState<'desktop' | 'mobile'>('desktop');
  const [socialPlatform, setSocialPlatform] = useState<'facebook' | 'twitter'>('facebook');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Fetch initial SEO settings from backend database
  useEffect(() => {
    let isMounted = true;
    const fetchSeo = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/seo');
        if (res.ok) {
          const data = await res.json();
          if (data.seo && isMounted) {
            setFormData(data.seo);
            setInitialData(data.seo);
            applySeoMetadataToHead(data.seo);
          }
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Failed to load SEO settings from server. Displaying cached defaults.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchSeo();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (field: keyof SeoSettings, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // If user has not detached ogTitle / ogDescription, sync them automatically
      if (field === 'title' && (!prev.ogTitle || prev.ogTitle === prev.title)) {
        next.ogTitle = value;
      }
      if (field === 'metaDescription' && (!prev.ogDescription || prev.ogDescription === prev.metaDescription)) {
        next.ogDescription = value;
      }
      return next;
    });
    setSaveSuccess(false);
    setErrorMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update SEO settings.');
      }

      setInitialData(data.seo);
      setFormData(data.seo);
      setSaveSuccess(true);
      applySeoMetadataToHead(data.seo);

      if (onNotify) {
        onNotify('SEO & Meta tags updated and persisted successfully!');
      }

      setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error saving SEO settings.';
      setErrorMessage(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset SEO & Meta tags to recommended luxury editorial defaults?')) {
      setFormData({
        ...DEFAULT_RECOMMENDED,
        updatedAt: new Date().toISOString()
      });
      setSaveSuccess(false);
    }
  };

  // Metrics calculation
  const titleLen = formData.title.length;
  const isTitleOptimal = titleLen >= 30 && titleLen <= 60;
  const descLen = formData.metaDescription.length;
  const isDescOptimal = descLen >= 120 && descLen <= 160;

  // SEO Health calculation (0-100 score)
  let healthScore = 0;
  if (isTitleOptimal) healthScore += 30;
  else if (titleLen > 15 && titleLen <= 70) healthScore += 18;

  if (isDescOptimal) healthScore += 30;
  else if (descLen >= 80 && descLen <= 180) healthScore += 18;

  if (formData.ogImage && formData.ogImage.length > 5) healthScore += 20;
  if (formData.keywords && formData.keywords.length > 10) healthScore += 10;
  if (formData.canonicalUrl && formData.canonicalUrl.startsWith('http')) healthScore += 10;

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#4B502E] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-lg text-[#24241F]">Connecting to SEO database...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 bg-[#4B502E] text-white">
              <Globe size={18} />
            </span>
            <h3 className="font-serif text-2xl text-[#24241F]">
              SEO & Meta Management Engine
            </h3>
            <span className="px-2 py-0.5 bg-[#4B502E]/10 text-[#4B502E] text-[10px] font-mono font-semibold tracking-wider uppercase">
              Home Page
            </span>
          </div>
          <p className="text-xs font-sans text-[#24241F]/70 max-w-2xl leading-relaxed">
            Manage how Dar Randigaba appears across Google, Bing, Facebook, WhatsApp, Twitter/X, and social messengers. Changes are securely written to the database and reflected live across the entire website.
          </p>
        </div>

        {/* SEO Score Badge */}
        <div className="flex items-center gap-4 bg-[#EFE8DA]/80 border border-[#4B502E]/15 p-3 px-5">
          <div>
            <div className="text-[10px] uppercase font-sans tracking-widest text-[#4B502E] font-bold">
              SEO Health Index
            </div>
            <div className="text-2xl font-serif font-bold text-[#24241F] flex items-baseline gap-1">
              {healthScore}
              <span className="text-xs text-[#24241F]/50 font-sans">/ 100</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-bold font-mono transition-colors"
               style={{
                 borderColor: healthScore >= 80 ? '#4B502E' : healthScore >= 50 ? '#D97706' : '#DC2626',
                 color: healthScore >= 80 ? '#4B502E' : healthScore >= 50 ? '#D97706' : '#DC2626'
               }}>
            {healthScore}%
          </div>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-sans flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <div>
            <strong className="font-bold">Changes Published:</strong> Home page title, meta description, and OpenGraph tags have been safely persisted to the database and applied to the live document head.
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs font-sans flex items-center gap-3">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <div>
            <strong className="font-bold">Error:</strong> {errorMessage}
          </div>
        </div>
      )}

      {/* Main 2-Column Work Area: Left Form, Right Live Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Fields (7 Columns) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 space-y-5">
            <div className="border-b border-[#4B502E]/15 pb-3 flex items-center justify-between">
              <span className="font-serif text-lg text-[#24241F] flex items-center gap-2">
                <Search size={16} className="text-[#4B502E]" />
                Search Engine Presentation
              </span>
              <span className="text-[11px] font-sans text-[#24241F]/60">
                Affects Google, Bing, DuckDuckGo rankings
              </span>
            </div>

            {/* Page Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider">
                  Page Meta Title &lt;title&gt; *
                </label>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 ${
                    isTitleOptimal
                      ? 'bg-emerald-100 text-emerald-800'
                      : titleLen > 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {titleLen} / 60 chars {isTitleOptimal ? '(Ideal)' : titleLen > 60 ? '(Too Long)' : '(Short)'}
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Dar Randigaba — Luxury Guest House & Cultural Riad Taroudant"
                className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none transition-colors"
              />
              <p className="text-[11px] font-sans text-[#24241F]/60 mt-1">
                The primary title displayed in browser tabs and search engine search result headlines. Recommended: 30–60 characters.
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider">
                  Meta Description &lt;meta name="description"&gt; *
                </label>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 ${
                    isDescOptimal
                      ? 'bg-emerald-100 text-emerald-800'
                      : descLen > 160
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {descLen} / 160 chars {isDescOptimal ? '(Ideal)' : descLen > 160 ? '(May be truncated)' : '(Under 120)'}
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                placeholder="Brief, alluring summary for potential guests browsing search results..."
                className="w-full px-3.5 py-2.5 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none transition-colors leading-relaxed"
              />
              <p className="text-[11px] font-sans text-[#24241F]/60 mt-1">
                The snippet shown underneath your title on Google. Keep between 120 and 160 characters for optimal click-through rates.
              </p>
            </div>
          </div>

          {/* Social Share & OpenGraph Image (Section 2) */}
          <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 space-y-5">
            <div className="border-b border-[#4B502E]/15 pb-3 flex items-center justify-between">
              <span className="font-serif text-lg text-[#24241F] flex items-center gap-2">
                <Share2 size={16} className="text-[#4B502E]" />
                OpenGraph & Social Share Asset
              </span>
              <span className="text-[11px] font-sans text-[#24241F]/60">
                og:image & twitter:image tags
              </span>
            </div>

            {/* OG Image URL */}
            <div>
              <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1.5">
                Social Share Image (og:image) URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={formData.ogImage}
                  onChange={(e) => handleChange('ogImage', e.target.value)}
                  placeholder="https://... or /assets/..."
                  className="flex-1 px-3.5 py-2.5 border border-neutral-300 text-sm bg-white focus:border-[#4B502E] focus:outline-none font-mono text-xs"
                />
              </div>
              <p className="text-[11px] font-sans text-[#24241F]/60 mt-1">
                Aspect ratio: 1.91:1 (recommended 1200x630 px). Used by WhatsApp, iMessage, Facebook, and LinkedIn share cards.
              </p>
            </div>

            {/* Quick Preset Selector */}
            <div>
              <span className="block text-[11px] font-sans uppercase tracking-wider text-[#24241F]/70 font-semibold mb-2">
                Quick Preset Hotel Assets:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_OG_IMAGES.map((preset) => {
                  const isSelected = formData.ogImage === preset.url;
                  return (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => handleChange('ogImage', preset.url)}
                      className={`p-2 border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#4B502E] bg-[#4B502E]/10 ring-1 ring-[#4B502E]'
                          : 'border-neutral-200 bg-white hover:border-[#4B502E]/40'
                      }`}
                    >
                      <div className="aspect-16/9 bg-neutral-100 overflow-hidden mb-1.5 relative border border-black/5">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-[11px] font-semibold text-[#24241F] truncate">
                        {preset.label}
                      </div>
                      <div className="text-[9px] text-[#24241F]/50 truncate">
                        {preset.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Advanced Meta Controls Toggle */}
          <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-6 space-y-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between text-left text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sliders size={16} />
                <span>Advanced Social Overrides, Canonical & Directives</span>
              </div>
              <span className="text-[11px] font-mono text-[#24241F]/60">
                {showAdvanced ? 'Hide [-]' : 'Show [+]'}
              </span>
            </button>

            {showAdvanced && (
              <div className="pt-3 border-t border-[#4B502E]/15 space-y-4">
                {/* Specific OG Title override */}
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                    OpenGraph Title Override (og:title)
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => handleChange('ogTitle', e.target.value)}
                    placeholder="Leave empty to use main Page Title"
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                {/* Specific OG Description override */}
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                    OpenGraph Description Override (og:description)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.ogDescription}
                    onChange={(e) => handleChange('ogDescription', e.target.value)}
                    placeholder="Leave empty to use main Meta Description"
                    className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                  />
                </div>

                {/* Canonical URL & Twitter Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      value={formData.canonicalUrl}
                      onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                      placeholder="https://darrandigaba.com"
                      className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                      Twitter Card Format
                    </label>
                    <select
                      value={formData.twitterCard}
                      onChange={(e) => handleChange('twitterCard', e.target.value as 'summary_large_image' | 'summary')}
                      className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white"
                    >
                      <option value="summary_large_image">summary_large_image (Large Hero Card)</option>
                      <option value="summary">summary (Compact Square Thumbnail)</option>
                    </select>
                  </div>
                </div>

                {/* Keywords & Robots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => handleChange('keywords', e.target.value)}
                      placeholder="Taroudant riad, Moroccan sanctuary, slow travel"
                      className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans uppercase font-bold text-[#4B502E] tracking-wider mb-1">
                      Robots Directive
                    </label>
                    <input
                      type="text"
                      value={formData.robots}
                      onChange={(e) => handleChange('robots', e.target.value)}
                      placeholder="index, follow"
                      className="w-full px-3 py-2 border border-neutral-300 text-sm bg-white font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-[#4B502E] text-white hover:bg-[#414628] disabled:opacity-50 text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Save & Publish SEO Meta</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-4 py-3 border border-[#4B502E]/30 text-[#4B502E] hover:bg-[#EFE8DA] text-xs font-sans uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Defaults</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#24241F]/60">
              Last saved: {new Date(formData.updatedAt || Date.now()).toLocaleTimeString()} ({formData.updatedBy})
            </div>
          </div>
        </form>

        {/* Right Column: Live Previews (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* SERP PREVIEW BOX */}
          <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#4B502E]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <Search size={15} className="text-[#4B502E]" />
                <h4 className="font-serif text-base text-[#24241F]">
                  Google SERP Simulation
                </h4>
              </div>
              <div className="flex items-center gap-1 bg-[#EFE8DA] p-0.5 border border-[#4B502E]/10">
                <button
                  type="button"
                  onClick={() => setSerpView('desktop')}
                  className={`px-2 py-1 text-[10px] uppercase font-sans tracking-wider flex items-center gap-1 cursor-pointer ${
                    serpView === 'desktop' ? 'bg-[#4B502E] text-white' : 'text-[#24241F]/70'
                  }`}
                >
                  <Monitor size={12} />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSerpView('mobile')}
                  className={`px-2 py-1 text-[10px] uppercase font-sans tracking-wider flex items-center gap-1 cursor-pointer ${
                    serpView === 'mobile' ? 'bg-[#4B502E] text-white' : 'text-[#24241F]/70'
                  }`}
                >
                  <Smartphone size={12} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google Search Result Card Render */}
            <div className="p-4 bg-white border border-neutral-200 rounded-lg font-sans text-left space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2 text-xs text-[#202124]">
                <div className="w-6 h-6 rounded-full bg-[#4B502E] flex items-center justify-center text-[10px] text-[#FCFBF7] font-serif font-bold overflow-hidden">
                  <img
                    src="/assets/aistudio/logo-randigaba_2x_0bd4f40f.png"
                    alt="Logo"
                    className="w-full h-full object-contain p-0.5"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-[12px] text-[#202124] font-medium">Dar Randigaba</div>
                  <div className="text-[11px] text-[#4d5156] font-mono truncate max-w-[260px]">
                    {formData.canonicalUrl || 'https://darrandigaba.com'}
                  </div>
                </div>
              </div>

              {/* Title Link */}
              <div className="text-[#1a0dab] hover:underline font-normal text-base md:text-lg leading-snug cursor-pointer line-clamp-2">
                {formData.title || 'Dar Randigaba — Luxury Guest House & Cultural Riad'}
              </div>

              {/* Snippet Description */}
              <div className="text-[#4d5156] text-xs leading-relaxed line-clamp-3">
                <span className="text-[#70757a] text-[11px] mr-1 font-mono">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —
                </span>
                {formData.metaDescription || 'An artistic Moroccan home in Taroudant where slow mornings, acoustic music, culture, and warm hospitality meet.'}
              </div>

              {/* SERP Sitelinks Micro-Preview */}
              <div className="pt-2 mt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px] text-[#1a0dab]">
                <div className="hover:underline cursor-pointer">Rooms &amp; Suites</div>
                <div className="hover:underline cursor-pointer">48h Taroudant Timeline</div>
                <div className="hover:underline cursor-pointer">The Cultural Riad</div>
                <div className="hover:underline cursor-pointer">Direct Reservations</div>
              </div>
            </div>
          </div>

          {/* SOCIAL MEDIA SHARE CARD PREVIEW */}
          <div className="bg-[#FCFBF7] border border-[#4B502E]/20 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#4B502E]/15 pb-2.5">
              <div className="flex items-center gap-2">
                <Share2 size={15} className="text-[#4B502E]" />
                <h4 className="font-serif text-base text-[#24241F]">
                  Social Media Share Preview
                </h4>
              </div>
              <div className="flex items-center gap-1 bg-[#EFE8DA] p-0.5 border border-[#4B502E]/10">
                <button
                  type="button"
                  onClick={() => setSocialPlatform('facebook')}
                  className={`px-2 py-1 text-[10px] uppercase font-sans tracking-wider cursor-pointer ${
                    socialPlatform === 'facebook' ? 'bg-[#4B502E] text-white' : 'text-[#24241F]/70'
                  }`}
                >
                  Facebook / WA
                </button>
                <button
                  type="button"
                  onClick={() => setSocialPlatform('twitter')}
                  className={`px-2 py-1 text-[10px] uppercase font-sans tracking-wider cursor-pointer ${
                    socialPlatform === 'twitter' ? 'bg-[#4B502E] text-white' : 'text-[#24241F]/70'
                  }`}
                >
                  Twitter / X
                </button>
              </div>
            </div>

            {/* Social Share Card Mock */}
            <div className="bg-white border border-neutral-300 rounded-lg overflow-hidden shadow-2xs font-sans text-left">
              {/* Image Container with 1.91:1 ratio */}
              <div className="relative aspect-16/9 bg-[#24241F] flex items-center justify-center overflow-hidden">
                {formData.ogImage ? (
                  <img
                    src={formData.ogImage}
                    alt={formData.ogTitle || formData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/aistudio/logo-randigaba_2x_0bd4f40f.png';
                    }}
                  />
                ) : (
                  <div className="text-neutral-400 flex flex-col items-center gap-1 text-xs">
                    <ImageIcon size={24} />
                    <span>No OpenGraph image specified</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-wider rounded-xs">
                  og:image 1200x630
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-3 bg-[#F9F9F8] border-t border-neutral-200 space-y-1">
                <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider truncate">
                  darrandigaba.com
                </div>
                <div className="font-bold text-sm text-[#1c1e21] leading-tight line-clamp-1">
                  {formData.ogTitle || formData.title || 'Dar Randigaba'}
                </div>
                <div className="text-xs text-[#606770] leading-snug line-clamp-2">
                  {formData.ogDescription || formData.metaDescription || 'Slow mornings, acoustic music, and warm Moroccan hospitality.'}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-sans text-[#24241F]/60 flex items-center justify-between">
              <span>Simulated feed appearance on WhatsApp, Facebook, LinkedIn</span>
              <span className="font-mono text-[10px] text-[#4B502E]">Verified Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
