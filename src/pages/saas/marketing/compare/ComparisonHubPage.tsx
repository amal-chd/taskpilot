import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, DollarSign, Zap, HardHat
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../MarketingLayout';
import { COMPETITORS } from './comparisonData';
import { useSeo } from '../../../../lib/seo';
import { trackComparisonClick } from '../../../../lib/analytics';

export const ComparisonHubPage: React.FC = () => {
  useSeo({
    title: 'Compare SiteCommons to Other Construction Management Software | 2026 Reviews',
    description: 'See how SiteCommons stacks up against Procore, Fieldwire, Asana, Monday.com, ClickUp, and Powerplay. Compare field features, pricing models, and time to value.',
    path: '/compare',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'SiteCommons Software Comparison & Alternatives Hub',
      description: 'Independent evaluation comparing SiteCommons to leading construction and task management platforms.',
      url: 'https://sitecommons.thekada.in/compare',
    },
  });

  const comparisons = Object.values(COMPETITORS);

  return (
    <MarketingLayout>
      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-ink-50 via-white to-ink-50/50 pt-16 pb-20 border-b border-ink-100">
        <Section className="text-center max-w-4xl mx-auto">
          <Eyebrow>Software Evaluation Guide</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-tight">
            How SiteCommons Compares to the Market
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
            Choosing software for your active project sites is a critical decision. Here are honest, fact-based evaluations
            comparing SiteCommons to both generic task tools and legacy construction megasuites.
          </p>
        </Section>
      </div>

      {/* ─── Comparison Cards Grid ─── */}
      <Section className="py-20">
        <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((c) => (
            <div
              key={c.slug}
              className="bg-white rounded-3xl border border-ink-200 p-7 shadow-sm hover:border-ink-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200/60 inline-block mb-4">
                  {c.category}
                </span>
                <h2 className="text-2xl font-bold text-ink-900">SiteCommons vs {c.competitorName}</h2>
                <p className="text-xs font-semibold text-brand-600 mt-1">{c.tagline}</p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed line-clamp-3">{c.heroSummary}</p>

                <div className="mt-5 pt-4 border-t border-ink-100 text-xs space-y-1.5 text-ink-700">
                  <p><strong className="text-ink-800">{c.competitorName} Model:</strong> {c.pricingComparison.competitorModel}</p>
                  <p><strong className="text-ink-800">SiteCommons Model:</strong> Flat team pricing (No per-seat tax)</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
                <Link
                  to={`/compare/${c.slug}`}
                  onClick={() => trackComparisonClick(c.competitorName)}
                  className="font-bold text-sm text-ink-900 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  Read full comparison <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {/* Special Buyer's Guide Card */}
          <div className="bg-gradient-to-br from-ink-900 to-ink-950 text-white rounded-3xl p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300 bg-brand-500/20 px-2.5 py-1 rounded-full border border-brand-400/40 inline-block mb-4">
                2026 Industry Guide
              </span>
              <h2 className="text-2xl font-bold text-white">Best Construction Management Software Guide</h2>
              <p className="text-xs font-semibold text-brand-300 mt-1">Buyer's Decision Framework</p>
              <p className="mt-3 text-sm text-ink-200 leading-relaxed">
                Comprehensive evaluation framework for general contractors, civil builders, and developers evaluating software in 2026.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                to="/compare/best-construction-management-software"
                className="font-bold text-sm text-brand-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                Read 2026 buyer's guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Why SiteCommons Wins ─── */}
      <div className="bg-ink-900 text-white py-20 border-t border-ink-800">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-300">The Strategic Difference</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Why builders switch to SiteCommons
            </h2>
            <p className="mt-2 text-ink-200 text-sm">
              We eliminated the compromises that hold back existing construction tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Flat Team Pricing</h3>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                No per-seat fees that penalize you for adding site engineers, foremen, and supervisors. One transparent monthly rate in your preferred currency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-4">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Boots-on-the-Ground Ruggedness</h3>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                High-contrast UI with large tap targets, offline caching, and location-verified GPS attendance designed directly for dusty, sunny jobsite conditions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">Live in 10 Minutes</h3>
              <p className="text-xs sm:text-sm text-ink-200 leading-relaxed">
                No 6-month enterprise consulting projects. Sign up, import your BOQ and team from Excel, and begin tracking your active project sites today.
              </p>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── Bottom CTA ─── */}
      <Section className="py-20">
        <div className="rounded-3xl bg-ink-900 text-white p-7 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to see why contractors choose SiteCommons?</h2>
            <p className="mt-2 text-ink-200 text-sm">Start your 14-day full free trial now. No credit card required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
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

export default ComparisonHubPage;
