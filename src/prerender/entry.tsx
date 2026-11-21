// Build-time prerender entry (Node). Renders every public marketing route to
// static HTML so search engines and link-preview bots get full content and
// correct <head> tags without running JavaScript. The browser bundle then
// mounts normally (createRoot replaces this markup), so behaviour is unchanged.
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { Writable } from 'node:stream';

import ProductHomePage from '../pages/saas/marketing/ProductHomePage';
import PricingPage from '../pages/saas/marketing/PricingPage';
import { FeaturesPage, IndustryPage } from '../pages/saas/marketing/FeaturesPage';
import FeatureDetailPage from '../pages/saas/marketing/features/FeatureDetailPage';
import HowItWorksPage from '../pages/saas/marketing/HowItWorksPage';
import FaqPage from '../pages/saas/marketing/FaqPage';
import ComparisonHubPage from '../pages/saas/marketing/compare/ComparisonHubPage';
import ComparisonDetailPage from '../pages/saas/marketing/compare/ComparisonDetailPage';
import BestConstructionSoftwarePage from '../pages/saas/marketing/compare/BestConstructionSoftwarePage';
import BlogHubPage from '../pages/saas/marketing/resources/BlogHubPage';
import BlogPostPage from '../pages/saas/marketing/resources/BlogPostPage';
import ContactSalesPage from '../pages/saas/marketing/ContactSalesPage';
import SecurityPage from '../pages/saas/marketing/SecurityPage';
import StatusPage from '../pages/misc/StatusPage';
import LandingPage from '../pages/landing/LandingPage';
import PrivacyPolicyPage from '../pages/landing/PrivacyPolicyPage';
import TermsOfUsePage from '../pages/landing/TermsOfUsePage';
import FieldManualPage from '../pages/manual/FieldManualPage';

import { INDUSTRIES } from '../pages/saas/marketing/content';
import { FEATURE_DETAILS } from '../pages/saas/marketing/features/featureDetailsData';
import { COMPETITORS } from '../pages/saas/marketing/compare/comparisonData';
import { BLOG_POSTS } from '../pages/saas/marketing/resources/blogData';
import type { SeoOptions } from '../lib/seo';

export { SITE_URL } from '../lib/site';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductHomePage />} />
    <Route path="/about" element={<LandingPage />} />
    <Route path="/pricing" element={<PricingPage />} />
    <Route path="/features" element={<FeaturesPage />} />
    <Route path="/features/:slug" element={<FeatureDetailPage />} />
    <Route path="/how-it-works" element={<HowItWorksPage />} />
    <Route path="/faq" element={<FaqPage />} />
    <Route path="/industries/:slug" element={<IndustryPage />} />
    <Route path="/compare" element={<ComparisonHubPage />} />
    <Route path="/compare/best-construction-management-software" element={<BestConstructionSoftwarePage />} />
    <Route path="/compare/:slug" element={<ComparisonDetailPage />} />
    <Route path="/blog" element={<BlogHubPage />} />
    <Route path="/blog/:slug" element={<BlogPostPage />} />
    <Route path="/contact-sales" element={<ContactSalesPage />} />
    <Route path="/security" element={<SecurityPage />} />
    <Route path="/status" element={<StatusPage />} />
    <Route path="/policy" element={<PrivacyPolicyPage />} />
    <Route path="/terms" element={<TermsOfUsePage />} />
    <Route path="/manual" element={<FieldManualPage />} />
  </Routes>
);

/** Every URL to prerender, with sitemap priority / change frequency. */
export function getRoutes(): { path: string; priority: number; changefreq: string; lastmod?: string }[] {
  const r: { path: string; priority: number; changefreq: string; lastmod?: string }[] = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/pricing', priority: 0.9, changefreq: 'weekly' },
    { path: '/features', priority: 0.9, changefreq: 'weekly' },
    { path: '/how-it-works', priority: 0.7, changefreq: 'monthly' },
    { path: '/compare', priority: 0.8, changefreq: 'monthly' },
    { path: '/compare/best-construction-management-software', priority: 0.9, changefreq: 'monthly' },
    { path: '/blog', priority: 0.7, changefreq: 'weekly' },
    { path: '/faq', priority: 0.6, changefreq: 'monthly' },
    { path: '/about', priority: 0.5, changefreq: 'monthly' },
    { path: '/contact-sales', priority: 0.7, changefreq: 'monthly' },
    { path: '/security', priority: 0.6, changefreq: 'monthly' },
    { path: '/status', priority: 0.3, changefreq: 'daily' },
    { path: '/manual', priority: 0.4, changefreq: 'monthly' },
    { path: '/policy', priority: 0.2, changefreq: 'yearly' },
    { path: '/terms', priority: 0.2, changefreq: 'yearly' },
  ];
  for (const s of Object.keys(FEATURE_DETAILS)) r.push({ path: `/features/${s}`, priority: 0.8, changefreq: 'monthly' });
  for (const i of INDUSTRIES) r.push({ path: `/industries/${i.slug}`, priority: 0.8, changefreq: 'monthly' });
  for (const s of Object.keys(COMPETITORS)) r.push({ path: `/compare/${s}`, priority: 0.8, changefreq: 'monthly' });
  for (const p of BLOG_POSTS) {
    const lastmod = (p as { updatedAt?: string; publishedAt?: string; date?: string }).updatedAt
      ?? (p as { publishedAt?: string }).publishedAt ?? (p as { date?: string }).date;
    r.push({ path: `/blog/${p.slug}`, priority: 0.7, changefreq: 'monthly', lastmod });
  }
  return r;
}

/** Renders a route; resolves with the HTML and the SEO options the page declared. */
export function render(url: string): Promise<{ html: string; seo: SeoOptions | undefined }> {
  (globalThis as { __SEO__?: SeoOptions }).__SEO__ = undefined;
  return new Promise((resolve, reject) => {
    let html = '';
    const sink = new Writable({
      write(chunk, _enc, cb) { html += chunk.toString(); cb(); },
    });
    sink.on('finish', () => resolve({ html, seo: (globalThis as { __SEO__?: SeoOptions }).__SEO__ }));
    const stream = renderToPipeableStream(
      <StaticRouter location={url}><AppRoutes /></StaticRouter>,
      {
        onAllReady() { stream.pipe(sink); },
        onShellError(err) { reject(err); },
        onError(err) { reject(err); },
      },
    );
  });
}
