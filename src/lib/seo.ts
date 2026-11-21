import { useEffect } from 'react';
import { SITE_URL } from './site';

const SITE = 'Task Pilot';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const BASE_URL = SITE_URL;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  jsonLd?: object | object[];
}

export function useSeo(opts: SeoOptions) {
  // Build-time prerender (no DOM): record the page's SEO so the prerender
  // script can write real <head> tags into the static HTML.
  if (typeof window === 'undefined') {
    (globalThis as { __SEO__?: SeoOptions }).__SEO__ = opts;
  }
  useEffect(() => {
    const prevTitle = document.title;
    const title = opts.title.includes(SITE) ? opts.title : `${opts.title} | ${SITE}`;
    document.title = title;

    const path = opts.path ?? window.location.pathname;
    const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    const image = opts.image ?? DEFAULT_OG_IMAGE;
    const ogType = opts.type ?? 'website';
    const robots = opts.robots ?? 'index, follow';

    // Standard Meta
    setMeta('name', 'description', opts.description);
    setMeta('name', 'robots', robots);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', opts.description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', `${title} preview`);
    setMeta('property', 'og:site_name', SITE);
    setMeta('property', 'og:locale', 'en_US');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', opts.description);
    setMeta('name', 'twitter:image', image);

    // Canonical link
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD Scripts
    const createdLdScripts: HTMLScriptElement[] = [];
    if (opts.jsonLd) {
      const payloads = Array.isArray(opts.jsonLd) ? opts.jsonLd : [opts.jsonLd];
      payloads.forEach((ld) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(ld);
        script.setAttribute('data-seo-jsonld', 'true');
        document.head.appendChild(script);
        createdLdScripts.push(script);
      });
    }

    return () => {
      document.title = prevTitle;
      createdLdScripts.forEach((s) => s.remove());
    };
  }, [opts.title, opts.description, opts.path, opts.image, opts.type, opts.robots]);
}
