import { SeoSettings } from '../types';

/**
 * Dynamically updates document head tags for Search Engines, OpenGraph, and Social Crawlers
 */
export function applySeoMetadataToHead(seo: SeoSettings): void {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  if (seo.title) {
    document.title = seo.title;
  }

  // Helper to get or create a meta element
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Helper to get or create a link element
  const setLink = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // 2. Standard Search Meta Tags
  if (seo.metaDescription) {
    setMeta('name', 'description', seo.metaDescription);
  }
  if (seo.keywords) {
    setMeta('name', 'keywords', seo.keywords);
  }
  if (seo.robots) {
    setMeta('name', 'robots', seo.robots);
  }
  if (seo.canonicalUrl) {
    setLink('canonical', seo.canonicalUrl);
  }

  // 3. OpenGraph / Facebook Tags
  const effectiveOgTitle = seo.ogTitle || seo.title;
  const effectiveOgDesc = seo.ogDescription || seo.metaDescription;

  setMeta('property', 'og:title', effectiveOgTitle);
  setMeta('property', 'og:description', effectiveOgDesc);
  setMeta('property', 'og:type', 'website');
  if (seo.canonicalUrl) {
    setMeta('property', 'og:url', seo.canonicalUrl);
  }
  if (seo.ogImage) {
    // Convert relative to absolute for external previewers if canonical is known
    const fullImageUrl = seo.ogImage.startsWith('http')
      ? seo.ogImage
      : `${window.location.origin}${seo.ogImage}`;
    setMeta('property', 'og:image', fullImageUrl);
  }

  // 4. Twitter Card Tags
  setMeta('name', 'twitter:card', seo.twitterCard || 'summary_large_image');
  setMeta('name', 'twitter:title', effectiveOgTitle);
  setMeta('name', 'twitter:description', effectiveOgDesc);
  if (seo.ogImage) {
    const fullImageUrl = seo.ogImage.startsWith('http')
      ? seo.ogImage
      : `${window.location.origin}${seo.ogImage}`;
    setMeta('name', 'twitter:image', fullImageUrl);
  }

  // 5. Update Schema.org Hotel / LodgingBusiness JSON-LD description & name
  try {
    const schemaScript = document.querySelector('script[type="application/ld+json"]');
    if (schemaScript && schemaScript.textContent) {
      const parsed = JSON.parse(schemaScript.textContent);
      if (parsed['@type'] === 'LodgingBusiness') {
        parsed.name = 'Dar Randigaba';
        parsed.description = seo.metaDescription || parsed.description;
        if (seo.canonicalUrl) parsed.url = seo.canonicalUrl;
        if (seo.ogImage) parsed.image = seo.ogImage.startsWith('http') ? seo.ogImage : `${window.location.origin}${seo.ogImage}`;
        schemaScript.textContent = JSON.stringify(parsed, null, 2);
      }
    }
  } catch {
    // Ignore schema update errors
  }
}
