import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle, Search, ArrowRight, ChevronRight,
  ShieldCheck, Smartphone, DollarSign, Users, HardHat
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from './MarketingLayout';
import { useSeo } from '../../../lib/seo';
import { trackFaqExpand } from '../../../lib/analytics';

interface FaqItem {
  category: 'General' | 'Pricing' | 'Field & GPS' | 'Security' | 'Onboarding';
  q: string;
  a: string;
}

const ALL_FAQS: FaqItem[] = [
  {
    category: 'General',
    q: 'What exactly is Task Pilot?',
    a: 'Task Pilot is a unified construction management and field operations operating system built by Thekada Digital Ventures Pvt. Ltd. It connects the jobsite to the head office by combining task sign-offs, location-verified GPS geofenced attendance, Daily Progress Reports (DPR), BOQ cost control, materials inventory, and site drawings into one cross-platform system.',
  },
  {
    category: 'General',
    q: 'How does Task Pilot differ from generic tools like Asana, Trello, or Monday.com?',
    a: 'Generic tools are designed for laptop desks and marketing agencies. They lack essential construction workflows such as location-verified GPS attendance, daily trade musters, pre-pour structural checklists, and BOQ earned value management. Furthermore, generic tools charge steep per-seat fees that penalize you for adding site foremen and engineers.',
  },
  {
    category: 'General',
    q: 'Does Task Pilot have native mobile apps for field staff?',
    a: 'Yes. Task Pilot runs as a high-performance progressive web app (PWA) and native mobile applications on Android and iOS devices. The mobile interface was designed specifically with high contrast, large tap targets, and offline caching for dusty, high-glare jobsite conditions.',
  },
  {
    category: 'Pricing',
    q: 'Do I need a credit card to start the 14-day free trial?',
    a: 'No credit card or payment information is required. You get full access to all features in your chosen plan tier immediately upon signing up so you can test Task Pilot on your live project sites with your crew.',
  },
  {
    category: 'Pricing',
    q: 'Why do you charge flat team pricing instead of per-user seats?',
    a: 'Per-seat pricing discourages construction firms from adding site engineers, foremen, and supervisors, resulting in communication gaps and offline data silos. With Task Pilot, your plan includes a generous bundle of team members for one predictable flat monthly fee.',
  },
  {
    category: 'Pricing',
    q: 'Which currencies and payment methods do you support?',
    a: 'Subscriptions are billed in USD, INR (with full GST tax invoices), EUR, GBP, AED, CAD, and AUD. We accept all major credit and debit cards, UPI AutoPay, SEPA, and company bank transfers (NEFT/RTGS) on Business and Enterprise tiers.',
  },
  {
    category: 'Pricing',
    q: 'What happens if we decide to change plans or cancel?',
    a: 'You can upgrade your plan at any time with immediate effect. If you cancel, your workspace remains fully functional until the end of your prepaid billing period, after which it enters a read-only archive state so you can export your records at any time.',
  },
  {
    category: 'Field & GPS',
    q: 'How does GPS attendance prevent fake check-ins and buddy punching?',
    a: 'When an employee taps Check In or Check Out, their device captures point-in-time GPS coordinates. Task Pilot verifies that these coordinates fall within the custom geofence perimeter configured for that project site and, on Android, blocks check-ins when a mock-location (fake GPS) app is active.',
  },
  {
    category: 'Field & GPS',
    q: 'Does Task Pilot track employee locations all day in the background?',
    a: 'No. Task Pilot strictly uses point-in-time geofencing. Location coordinates are accessed only for a split second when the employee taps Check In or Check Out. We never track employees throughout the day, ensuring complete privacy compliance and zero battery drain.',
  },
  {
    category: 'Field & GPS',
    q: 'What happens when a jobsite has spotty or zero 4G connectivity?',
    a: 'Task Pilot is engineered with offline cache resilience. Site teams can record attendance, take DPR progress photos, and fill out checklists even in basements or remote work fronts. Data syncs automatically once connectivity is restored.',
  },
  {
    category: 'Field & GPS',
    q: 'Can site engineers fill out the Daily Site Diary (DPR) on their phones?',
    a: 'Yes. The mobile DPR module lets engineers record weather, trade headcounts, executed work quantities, equipment hours, and site photos in under 3 minutes before leaving the jobsite, generating client-ready PDF summaries instantly.',
  },
  {
    category: 'Security',
    q: 'Is our project data, drawings, and tender rates kept secure and private?',
    a: 'Yes. Each company gets its own workspace: every record is tagged to your organisation and database access rules only return your company\'s data. Data is encrypted in transit (HTTPS) and at rest by our hosting providers, every key action is logged in an audit trail, and owners can export or delete their workspace data at any time.',
  },
  {
    category: 'Security',
    q: 'Can site workers see our tender rates or commercial profit margins?',
    a: 'No. Task Pilot enforces strict 8-tier role gating (Director, Admin, PM, Site Engineer, Foreman, Labour, Accounts, Client View-Only). Commercial rates, BOQ tender values, and staff salaries are visible strictly to Directors and Accounts.',
  },
  {
    category: 'Security',
    q: 'What happens to access when an employee leaves the company?',
    a: 'When an administrator deactivates an account in User Management, that user loses immediate access to all chats, projects, documents, and mobile tools. However, their historical audit logs and inspection signatures remain preserved.',
  },
  {
    category: 'Onboarding',
    q: 'How long does it take to get our sites and crew set up?',
    a: 'Most teams are up and running in under 10 minutes. You can import staff rosters and Bill of Quantities (BOQ) line items directly from standard Excel templates. For Business and Enterprise customers, our solutions engineering team provides complimentary onboarding assistance within 48 hours.',
  },
  {
    category: 'Onboarding',
    q: 'Do our field workers need formal IT training to use the app?',
    a: 'No. The mobile interface was designed directly with site personnel. Large tap targets, high contrast, fast camera capture, and straightforward workflows mean supervisors and engineers learn to use it in 15 minutes without formal training.',
  },
  {
    category: 'Onboarding',
    q: 'Can we test Task Pilot on a single pilot project first?',
    a: 'Yes. We encourage contractors to test Task Pilot on a single active jobsite during the 14-day free trial to experience the difference in daily DPR submission and GPS attendance before rolling out across their entire portfolio.',
  },
];

const CATEGORIES = ['All', 'General', 'Pricing', 'Field & GPS', 'Security', 'Onboarding'];

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = ALL_FAQS.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  useSeo({
    title: 'Frequently Asked Questions (FAQ) | Task Pilot Construction Software',
    description: 'Find answers to common questions about Task Pilot: GPS attendance, daily DPR reporting, BOQ cost control, flat team pricing, security, and mobile apps.',
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ALL_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  });

  return (
    <MarketingLayout>
      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-100">
        <Section className="text-center max-w-4xl mx-auto">
          <Eyebrow>Help & Knowledge Base</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about Task Pilot's features, pricing, GPS geofencing, security, and jobsite deployment.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g. GPS, pricing, BOQ, offline)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none shadow-xs transition-all"
            />
          </div>

          {/* Categories */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── FAQs Accordion List ─── */}
      <Section className="py-16 max-w-3xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="py-16 text-center">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-900">No questions found</p>
            <p className="text-xs text-slate-500 mt-1">Try another search keyword or contact our support team.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {filteredFaqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="py-5">
                  <button
                    type="button"
                    onClick={() => {
                      const next = isOpen ? null : i;
                      setOpenIndex(next);
                      if (next !== null) trackFaqExpand(f.q);
                    }}
                    className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-amber-600 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg pr-4">{f.q}</span>
                    <span className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-amber-600' : ''}`}>▾</span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-slate-600 text-sm leading-relaxed animate-in fade-in duration-200">
                      <p>{f.a}</p>
                      <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Category: {f.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>

      {/* ─── Still Have Questions? ─── */}
      <Section className="pb-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <HelpCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-slate-900">Still have questions?</h2>
          <p className="mt-2 text-slate-600 text-sm">
            Our construction solutions engineering team is available for a 30-minute tailored walkthrough of your sites.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact-sales"
              className="h-11 px-6 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm"
            >
              Talk to our team
            </Link>
            <Link
              to="/manual"
              className="h-11 px-6 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-all"
            >
              Read Staff Field Manual
            </Link>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
};

export default FaqPage;
