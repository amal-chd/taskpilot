import { ProductScreenshot } from '../../../../components/common/ProductScreenshot';
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, ChevronRight, AlertTriangle,
  Check
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../MarketingLayout';
import { FEATURE_DETAILS } from './featureDetailsData';
import { useSeo } from '../../../../lib/seo';
import { trackCtaClick, trackFaqExpand } from '../../../../lib/analytics';
import { ScreenshotLightbox } from '../../../../components/common/ScreenshotLightbox';

export const FeatureDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? FEATURE_DETAILS[slug] : undefined;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // JSON-LD Structured Data
  const jsonLd = data ? [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `SiteCommons — ${data.title}`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description: data.seoDescription,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '19',
        highPrice: '99',
        offerCount: '4',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sitecommons.thekada.in/' },
        { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://sitecommons.thekada.in/features' },
        { '@type': 'ListItem', position: 3, name: data.title, item: `https://sitecommons.thekada.in/features/${data.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ] : [];

  useSeo({
    title: data ? data.seoTitle : 'Feature Details — SiteCommons',
    description: data ? data.seoDescription : 'Explore construction features with SiteCommons.',
    path: data ? `/features/${data.slug}` : '/features',
    jsonLd,
  });

  if (!data) {
    return <Navigate to="/features" replace />;
  }

  const Icon = data.icon;

  const otherFeatures = Object.values(FEATURE_DETAILS)
    .filter((f) => f.slug !== data.slug)
    .slice(0, 3);

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb Navigation ─── */}
      <div className="bg-ink-50 border-b border-ink-200/60 py-2.5 text-xs text-ink-600">
        <Section className="flex items-center gap-2">
          <Link to="/" className="hover:text-ink-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
          <Link to="/features" className="hover:text-ink-900 transition-colors">Features</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
          <span className="text-ink-900 font-semibold truncate">{data.title}</span>
        </Section>
      </div>

      {/* ─── Hero Section ─── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-ink-50 via-white to-ink-50/50 pt-12 pb-20 border-b border-ink-100">
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-200/20 blur-3xl pointer-events-none" />
        <Section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-900 text-xs font-bold uppercase tracking-wider mb-5">
            <Icon className="w-4 h-4 text-brand-600" />
            <span>{data.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.12]">
            {data.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-ink-600 leading-relaxed max-w-3xl mx-auto">
            {data.heroSummary}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to={`/register?feature=${data.slug}`}
              onClick={() => trackCtaClick('feature_hero', 'Start 14-day free trial', `/register?feature=${data.slug}`)}
              className="w-full sm:w-auto h-13 px-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 text-white font-semibold text-base hover:bg-ink-800 shadow-xl shadow-ink-900/10 transition-all hover:-translate-y-0.5"
            >
              Start 14-day free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              onClick={() => trackCtaClick('feature_hero', 'Book a live demo', '/contact-sales')}
              className="w-full sm:w-auto h-13 px-7 inline-flex items-center justify-center rounded-full border border-ink-300 bg-white text-ink-800 font-semibold text-base hover:bg-ink-50 transition-all"
            >
              Book a live demo
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-700">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Included in all plan tiers
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No credit card required
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              iOS, Android & Web
            </li>
          </ul>
        </Section>
      </div>

      {/* ─── Real App Screenshot Showcase ─── */}
      {data.screenshot && (
        <div className="relative -mt-10 mb-10 max-w-5xl mx-auto px-4 sm:px-6 z-10">
          <div
            onClick={() => setLightboxOpen(true)}
            className="group cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden border border-ink-200/80 bg-ink-900 shadow-2xl transition-all duration-300 hover:shadow-brand-500/10 hover:border-ink-400"
          >
            {/* Window / App Header */}
            <div className="px-4 py-3 bg-ink-950 border-b border-ink-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-brand-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
            </div>

            {/* Device / Desktop Viewport Container */}
            <div className="relative overflow-hidden bg-ink-950 flex items-center justify-center">
              {data.screenshotDevice === 'mobile' ? (
                <div className="py-8 px-4 flex justify-center w-full">
                  <div className="relative max-w-[320px] w-full rounded-[40px] p-2 bg-gradient-to-b from-ink-700 via-ink-800 to-ink-900 shadow-2xl ring-1 ring-white/10">
                    <div className="rounded-[32px] overflow-hidden bg-black relative">
                      <ProductScreenshot width={data.screenshotDevice === 'mobile' ? 780 : 1600} height={data.screenshotDevice === 'mobile' ? 1688 : 1000}
                        src={data.screenshot}
                        alt={data.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full overflow-hidden relative">
                  <ProductScreenshot width={1600} height={1000}
                    src={data.screenshot}
                    alt={data.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.005]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {data.screenshot && (
        <ScreenshotLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          src={data.screenshot}
          title={data.title}
          caption={data.screenshotCaption}
          badge={data.screenshotBadge}
        />
      )}

      {/* ─── The Problem We Solve ─── */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>The Operational Problem</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">
            Why traditional field management breaks down
          </h2>
          <p className="mt-2 text-ink-600 text-sm sm:text-base">
            Informal systems cost builders thousands in unbudgeted rework, disputes, and delayed milestones.
          </p>
        </div>

        <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.painPoints.map((p, i) => (
            <div key={i} className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-ink-900">{p.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-ink-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── The SiteCommons Solution ─── */}
      <div className="bg-ink-900 text-white py-20 border-y border-ink-800">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-300">The Solution</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Engineered for verified accountability on site
            </h2>
            <p className="mt-2 text-ink-200 text-sm sm:text-base">
              Replace verbal guesswork with structured digital workflows that connect the field to the head office.
            </p>
          </div>

          <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.solutions.map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-4">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-white">{s.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-200 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Step-by-Step Execution Workflow ─── */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">
            The end-to-end operational workflow
          </h2>
          <p className="mt-2 text-ink-600 text-sm sm:text-base">
            From initial field action to permanent executive verification.
          </p>
        </div>

        <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.workflowSteps.map((w) => (
            <div key={w.step} className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-3xl font-black text-brand-600 block mb-2">{w.step}</span>
                <h3 className="font-bold text-base text-ink-900 mb-2">{w.title}</h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Role-Specific Benefits ─── */}
      <div className="bg-ink-50 py-20 border-y border-ink-200">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Stakeholder Value</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">
              Clear benefits across your entire hierarchy
            </h2>
            <p className="mt-2 text-ink-600 text-sm">
              Designed specifically for the roles that build physical projects.
            </p>
          </div>

          <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.roleBenefits.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-ink-200 p-6 shadow-sm">
                <span className="px-2.5 py-1 rounded bg-ink-100 text-ink-800 font-bold text-xs uppercase tracking-wider block w-fit mb-3">
                  {r.role}
                </span>
                <p className="text-sm text-ink-700 leading-relaxed">{r.benefit}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Technical Specifications Table ─── */}
      <Section className="py-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Eyebrow>Architecture & Specs</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">
            Technical Specifications
          </h2>
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-ink-100">
              {data.technicalSpecs.map((spec, i) => (
                <tr key={i} className="hover:bg-ink-50/70 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-ink-900 w-1/3 bg-ink-50/50">{spec.label}</td>
                  <td className="py-3.5 px-6 text-ink-600">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ─── Related Modules ─── */}
      <div className="bg-ink-50/80 py-16 border-t border-ink-200">
        <Section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-700">Connected System</p>
              <h3 className="text-xl font-bold text-ink-900 mt-1">Explore related modules</h3>
            </div>
            <Link to="/features" className="text-sm font-bold text-ink-900 hover:text-brand-600 transition-colors flex items-center gap-1">
              View all 21 modules <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {otherFeatures.map((f) => {
              const OIcon = f.icon;
              return (
                <Link
                  key={f.slug}
                  to={`/features/${f.slug}`}
                  className="bg-white p-5 rounded-2xl border border-ink-200 hover:border-ink-900 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-ink-100 group-hover:bg-brand-500/10 text-ink-700 group-hover:text-brand-700 flex items-center justify-center transition-colors mb-3">
                    <OIcon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-ink-900 text-sm group-hover:text-brand-600 transition-colors">{f.title}</h4>
                  <p className="text-xs text-ink-700 mt-1 line-clamp-2">{f.subtitle}</p>
                </Link>
              );
            })}
          </div>
        </Section>
      </div>

      {/* ─── Accessible FAQ Accordion ─── */}
      <Section className="py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Got Questions?</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-ink-600 text-sm">
            Everything you need to know about {data.title}.
          </p>
        </div>

        <div className="divide-y divide-ink-200 border-y border-ink-200">
          {data.faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-4">
                <button
                  type="button"
                  onClick={() => {
                    const next = isOpen ? null : i;
                    setOpenFaq(next);
                    if (next !== null) trackFaqExpand(f.q);
                  }}
                  className="w-full flex items-center justify-between text-left font-semibold text-ink-900 hover:text-brand-600 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base">{f.q}</span>
                  <span className={`ml-4 text-ink-400 transition-transform ${isOpen ? 'rotate-180 text-brand-600' : ''}`}>▾</span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-ink-600 text-sm leading-relaxed animate-in fade-in duration-200">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ─── Bottom CTA ─── */}
      <Section className="pb-20">
        <div className="rounded-3xl bg-ink-900 text-white p-7 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to bring order to your job sites?</h2>
            <p className="mt-2 text-ink-200 text-sm">Start your 14-day free trial of {data.title} today. Full access, no credit card required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/register?feature=${data.slug}`}
              className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 text-white font-bold hover:bg-brand-400 shrink-0 shadow-lg"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              className="h-12 px-6 inline-flex items-center justify-center rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 shrink-0"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
};

export default FeatureDetailPage;
