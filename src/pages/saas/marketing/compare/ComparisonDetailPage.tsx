import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowRight, Check, X, ChevronRight, HelpCircle,
  ShieldCheck, AlertTriangle, Scale, DollarSign, Award, CheckCircle2
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../MarketingLayout';
import { COMPETITORS } from './comparisonData';
import { useSeo } from '../../../../lib/seo';
import { trackCtaClick, trackComparisonClick, trackFaqExpand } from '../../../../lib/analytics';

export const ComparisonDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? COMPETITORS[slug] : undefined;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = data ? [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `Task Pilot vs ${data.competitorName}: Detailed 2026 Comparison`,
      description: data.heroSummary,
      author: {
        '@type': 'Organization',
        name: 'Thekada Digital Ventures Pvt. Ltd.',
        url: 'https://taskpilot.thekada.in',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Task Pilot',
        logo: {
          '@type': 'ImageObject',
          url: 'https://taskpilot.thekada.in/logo.png',
        },
      },
      mainEntityOfPage: `https://taskpilot.thekada.in/compare/${data.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taskpilot.thekada.in/' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://taskpilot.thekada.in/compare' },
        { '@type': 'ListItem', position: 3, name: `Task Pilot vs ${data.competitorName}`, item: `https://taskpilot.thekada.in/compare/${data.slug}` },
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
    title: data ? `Task Pilot vs ${data.competitorName} (2026 Comparison & Review)` : 'Software Comparison — Task Pilot',
    description: data ? `Compare Task Pilot and ${data.competitorName}. Discover differences in field features, GPS attendance, BOQ cost control, pricing models, and team adoption.` : 'Compare Task Pilot to alternative construction software.',
    path: data ? `/compare/${data.slug}` : '/compare',
    jsonLd,
  });

  if (!data) {
    return <Navigate to="/compare" replace />;
  }

  const otherComparisons = Object.values(COMPETITORS).filter((c) => c.slug !== data.slug);

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb ─── */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-2.5 text-xs text-slate-500">
        <Section className="flex items-center gap-2">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/compare" className="hover:text-slate-900 transition-colors">Compare</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate">Task Pilot vs {data.competitorName}</span>
        </Section>
      </div>

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-12 pb-20 border-b border-slate-100">
        <Section className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-bold uppercase tracking-wider mb-5">
            <Scale className="w-4 h-4 text-amber-600" />
            <span>Independent 2026 Software Evaluation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Task Pilot vs {data.competitorName}
          </h1>
          <p className="mt-3 text-lg font-bold text-amber-700">
            {data.tagline}
          </p>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {data.heroSummary}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              onClick={() => trackCtaClick('compare_hero', 'Start 14-day free trial', '/register')}
              className="w-full sm:w-auto h-13 px-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5"
            >
              Try Task Pilot Free (14 Days) <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              onClick={() => trackCtaClick('compare_hero', 'Book a live comparison demo', '/contact-sales')}
              className="w-full sm:w-auto h-13 px-7 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-all"
            >
              Book a live comparison demo
            </Link>
          </div>
        </Section>
      </div>

      {/* ─── Pricing Comparison Callout ─── */}
      <Section className="py-16">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Financial Impact</span>
              <h2 className="text-2xl font-bold mt-1">Pricing Model Breakdown</h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs">
              Verified 2026 Data
            </span>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-6 sm:p-8 gap-6 sm:gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{data.competitorName}</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{data.pricingComparison.competitorModel}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{data.pricingComparison.competitorEstimatedCost}</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Task Pilot</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">{data.pricingComparison.taskPilotModel}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{data.pricingComparison.taskPilotEstimatedCost}</p>
            </div>
          </div>

          <div className="bg-amber-50/70 border-t border-amber-200/60 p-5 sm:p-6 text-sm text-amber-900 flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-amber-700 shrink-0" />
            <p><strong>Verdict:</strong> {data.pricingComparison.pricingVerdict}</p>
          </div>
        </div>
      </Section>

      {/* ─── Detailed Feature Comparison Matrix ─── */}
      <Section className="py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>Feature-By-Feature</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Head-to-head capability matrix
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Objective feature breakdown based on current verified product capabilities.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/3">Capability</th>
                  <th className="py-4 px-6 text-center text-amber-400 bg-slate-850">Task Pilot</th>
                  <th className="py-4 px-6 text-center">{data.competitorName}</th>
                  <th className="py-4 px-6">Operational Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.matrix.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900">{row.feature}</td>
                    <td className="py-4 px-6 text-center bg-amber-500/5">
                      {typeof row.taskPilot === 'boolean' ? (
                        row.taskPilot ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                            <X className="w-4 h-4" />
                          </span>
                        )
                      ) : (
                        <span className="font-bold text-xs text-amber-900 bg-amber-100 px-2 py-0.5 rounded">{row.taskPilot}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.competitor === 'boolean' ? (
                        row.competitor ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                            <X className="w-4 h-4" />
                          </span>
                        )
                      ) : (
                        <span className="font-semibold text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{row.competitor}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ─── Strengths and Limitations ─── */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Competitor Analysis */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{data.competitorName} Analysis</h3>
              
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">Key Strengths</p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {data.competitorStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2">Key Limitations</p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {data.competitorLimitations.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Task Pilot Advantage */}
            <div className="bg-white rounded-3xl border border-slate-900 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">The Task Pilot Advantage</h3>
              
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Why Builders Choose Task Pilot</p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {data.taskPilotStrengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every Task Pilot plan includes our complete suite with zero per-seat fees, flat predictable monthly rates, and instant 10-minute setup.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── Who Should Choose Which? ─── */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Decision Framework</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Which software should you choose?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-3">Choose {data.competitorName} if:</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {data.bestForCompetitor.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-300 bg-amber-50/40 p-8 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-3">Choose Task Pilot if:</h3>
            <ul className="space-y-3 text-sm text-slate-700 font-medium">
              {data.bestForTaskPilot.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Summary Verdict ─── */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg text-white">The Bottom Line</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {data.verdict}
          </p>
        </div>
      </Section>

      {/* ─── Other Competitor Comparisons ─── */}
      <div className="bg-slate-50 py-16 border-t border-slate-200">
        <Section>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Compare Task Pilot with other platforms</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherComparisons.slice(0, 3).map((comp) => (
              <Link
                key={comp.slug}
                to={`/compare/${comp.slug}`}
                onClick={() => trackComparisonClick(comp.competitorName)}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all group"
              >
                <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Task Pilot vs {comp.competitorName}</p>
                <p className="text-xs text-slate-500 mt-1">{comp.tagline}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Accessible FAQ Accordion ─── */}
      <Section className="py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Got Questions?</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
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
                  className="w-full flex items-center justify-between text-left font-semibold text-slate-900 hover:text-amber-600 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base">{f.q}</span>
                  <span className={`ml-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`}>▾</span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed animate-in fade-in duration-200">
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
        <div className="rounded-3xl bg-slate-900 text-white p-7 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to see the Task Pilot difference?</h2>
            <p className="mt-2 text-slate-300 text-sm">Experience modern construction management without the enterprise price tag. 14 days free.</p>
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

export default ComparisonDetailPage;
