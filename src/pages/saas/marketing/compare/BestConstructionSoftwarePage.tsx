import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, X, ShieldCheck, ChevronRight,
  Star, DollarSign, Award, Layers, CheckCircle2
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../MarketingLayout';
import { useSeo } from '../../../../lib/seo';
import { trackCtaClick } from '../../../../lib/analytics';

export const BestConstructionSoftwarePage: React.FC = () => {
  useSeo({
    title: 'Best Construction Management Software in 2026: Definitive Buyer’s Guide',
    description: 'Comprehensive 2026 guide evaluating the best construction software: Procore, Fieldwire, Task Pilot, Buildertrend, and Monday. Features, pricing models, and recommendations.',
    path: '/compare/best-construction-management-software',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Best Construction Management Software in 2026: Complete Buyer’s Guide',
        description: 'An independent evaluation of top construction platforms, feature matrices, and pricing structures.',
        author: {
          '@type': 'Organization',
          name: 'Thekada Digital Ventures Pvt. Ltd.',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taskpilot.thekada.in/' },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://taskpilot.thekada.in/compare' },
          { '@type': 'ListItem', position: 3, name: 'Best Construction Management Software', item: 'https://taskpilot.thekada.in/compare/best-construction-management-software' },
        ],
      },
    ],
  });

  const tools = [
    {
      name: 'Task Pilot',
      category: 'Best for SMB & Mid-Market Contractors',
      summary: 'A complete office-to-field operating system with location-verified GPS attendance, daily DPRs, BOQ cost control, and flat team pricing.',
      pricing: 'Starts at $19/mo (₹1,499/mo) flat for up to 10 users; $49/mo (₹3,999/mo) for 30 users. No per-seat fee.',
      rating: '4.9/5',
      strengths: ['Flat team pricing (no per-seat penalty)', 'Native GPS geofenced attendance', 'Real-time BOQ earned value management (EVM)', 'Live in under 10 minutes'],
      limitations: ['Not intended for billion-dollar megaprojects needing 3D BIM coordination'],
      idealFor: 'General contractors, residential builders, fit-out firms, and developers managing 1 to 25 sites.',
      highlight: true,
      link: '/register',
    },
    {
      name: 'Procore',
      category: 'Best for Enterprise Megaprojects',
      summary: 'The enterprise standard for ENR 400 global general contractors managing massive infrastructure and commercial developments.',
      pricing: 'Annual construction volume percentage ($10,000 to $100,000+/year). Custom quote only.',
      rating: '4.6/5',
      strengths: ['Massive 400+ integration app marketplace', '3D BIM model coordination', 'Deep financial ERP sync (SAP, Sage 300)'],
      limitations: ['Extremely expensive for SMB builders', 'Requires 3 to 6 months of IT consulting to deploy', 'No public pricing list'],
      idealFor: 'Enterprise general contractors with >$50M in annual construction volume.',
      highlight: false,
      link: '/compare/taskpilot-vs-procore',
    },
    {
      name: 'Fieldwire',
      category: 'Best for Specialty Trade Drawing Markup',
      summary: 'Mobile-first tool by Hilti designed for blueprint viewing, sheet hyperlinking, and punch list snagging on US jobsites.',
      pricing: '$39 to $89 per user per month. $975 to $2,225/mo for 25 users.',
      rating: '4.5/5',
      strengths: ['Fast blueprint drawing viewer', 'Offline vector plan markup', 'Good punch list workflows'],
      limitations: ['Steep per-user pricing model', 'No GPS attendance or time tracking', 'No BOQ or financial management'],
      idealFor: 'Electrical and mechanical subcontractors looking strictly for plan viewing.',
      highlight: false,
      link: '/compare/taskpilot-vs-fieldwire',
    },
    {
      name: 'Monday.com',
      category: 'Best for Custom Table Building',
      summary: 'A flexible work OS that allows teams to build custom spreadsheet-like boards and project trackers.',
      pricing: '$9 to $19 per user per month with minimum seat blocks.',
      rating: '4.4/5',
      strengths: ['Highly customizable columns and board views', 'Visually appealing desk interface', 'Broad generic app integrations'],
      limitations: ['Requires weeks of manual setup', 'No native construction features (GPS, DPR, BOQ)', 'Awkward on mobile in sunlight'],
      idealFor: 'Office operations and marketing teams who want generic customizable boards.',
      highlight: false,
      link: '/compare/taskpilot-vs-monday',
    },
  ];

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb ─── */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-2.5 text-xs text-slate-500">
        <Section className="flex items-center gap-2">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/compare" className="hover:text-slate-900 transition-colors">Compare</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">Best Construction Management Software (2026)</span>
        </Section>
      </div>

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-20 border-b border-slate-100">
        <Section className="text-center max-w-4xl mx-auto">
          <Eyebrow>2026 Industry Report</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Best Construction Management Software in 2026
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            An independent, side-by-side evaluation of leading platforms. How they compare on field functionality,
            ease of adoption, pricing structures, and suitability for different company sizes.
          </p>
        </Section>
      </div>

      {/* ─── The Decision Matrix ─── */}
      <Section className="py-20">
        <div className="space-y-8">
          {tools.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl border p-8 shadow-sm transition-all ${
                t.highlight
                  ? 'border-slate-900 bg-white ring-2 ring-amber-500/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">{t.name}</h2>
                    {t.highlight && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider">
                        Top Value Choice
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">{t.category}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm font-bold text-slate-900">{t.pricing}</span>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{t.summary}</p>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Strengths</p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    {t.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">Limitations</p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    {t.limitations.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-800">Best For:</strong> {t.idealFor}
                </p>
                <Link
                  to={t.link}
                  className={`h-10 px-5 inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold text-xs sm:text-sm shrink-0 transition-all ${
                    t.highlight
                      ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                      : 'border border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {t.highlight ? 'Try Task Pilot Free (14 Days)' : `Read Task Pilot vs ${t.name}`} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Buyer's Evaluation Checklist ─── */}
      <div className="bg-slate-50 py-20 border-t border-slate-200">
        <Section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eyebrow>Selection Framework</Eyebrow>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              5 Questions Every Contractor Must Ask Before Buying
            </h3>
          </div>

          <div className="space-y-4">
            {[
              { q: '1. Will site foremen and engineers actually use this on their phones?', desc: 'Software fails when field personnel find it too complicated or slow. Test the mobile app on a real jobsite in sunlight before committing.' },
              { q: '2. Are you paying per user seat or a predictable flat team rate?', desc: 'Per-seat pricing penalizes your company for adding site supervisors and foremen, causing communication silos.' },
              { q: '3. Does it include native GPS attendance or require a separate app?', desc: 'Using one app for attendance and another for task management results in double data entry and muster discrepancies.' },
              { q: '4. Does the platform connect physical progress to BOQ costs?', desc: 'Tracking tasks without knowing whether they are on budget means discovering cost overruns only at month-end.' },
              { q: '5. How long does implementation take before you see value?', desc: 'Avoid multi-month enterprise consulting engagements when modern SaaS platforms can be live in 10 minutes.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="font-bold text-base text-slate-900 mb-1">{item.q}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Bottom CTA ─── */}
      <Section className="py-20">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Test the #1 rated value platform today</h2>
            <p className="mt-2 text-slate-300 text-sm">Experience Task Pilot on your live job sites. 14 days free, no credit card required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shrink-0 shadow-lg"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              className="h-12 px-6 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 shrink-0"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
};

export default BestConstructionSoftwarePage;
