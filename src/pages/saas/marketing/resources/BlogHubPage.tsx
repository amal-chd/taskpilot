import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen, Clock, ArrowRight, Search
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../MarketingLayout';
import { BLOG_POSTS } from './blogData';
import { useSeo } from '../../../../lib/seo';
import { trackArticleRead } from '../../../../lib/analytics';

const CATEGORIES = [
  'All',
  'Field Operations',
  'Cost Control',
  'Quality & Safety',
  'Best Practices',
  'Project Delivery',
];

export const BlogHubPage: React.FC = () => {
  useSeo({
    title: 'Construction & Field Operations Resources, Guides & Best Practices | Task Pilot',
    description: 'Expert guides on daily progress reporting (DPR), GPS geofenced attendance, BOQ cost control, pre-pour checklists, and construction project management.',
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Task Pilot Construction Knowledge & Field Operations Hub',
      description: 'Practical guides and engineering best practices for general contractors, builders, and project managers.',
      url: 'https://taskpilot.thekada.in/resources',
      publisher: {
        '@type': 'Organization',
        name: 'Thekada Digital Ventures Pvt. Ltd.',
        url: 'https://taskpilot.thekada.in',
      },
    },
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = BLOG_POSTS[0];

  return (
    <MarketingLayout>
      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-100">
        <Section className="text-center max-w-4xl mx-auto">
          <Eyebrow>Knowledge & Field Guides</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Field Operations & Construction Guides
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Practical, field-tested protocols on Daily Progress Reports (DPR), GPS attendance, BOQ cost tracking, and jobsite quality management.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, checklists, and articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 outline-none shadow-xs transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="m-scroll-row mt-6 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── Featured Article (if on 'All' and no search) ─── */}
      {activeCategory === 'All' && !search && featured && (
        <Section className="pt-16 pb-6">
          <div className="rounded-3xl border border-slate-900 bg-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[11px] uppercase tracking-wider inline-block mb-4">
                Featured Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {featured.title}
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {featured.summary}
              </p>
              <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
                <span>By {featured.author.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
              </div>
            </div>

            <Link
              to={`/blog/${featured.slug}`}
              onClick={() => trackArticleRead(featured.slug, featured.title)}
              className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shrink-0 shadow-md transition-all"
            >
              Read full guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* ─── Articles Grid ─── */}
      <Section className="py-16">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-900">No articles match your search</p>
            <p className="text-xs text-slate-500 mt-1">Try another search keyword or select All Categories.</p>
          </div>
        ) : (
          <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:border-slate-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    <Link
                      to={`/blog/${post.slug}`}
                      onClick={() => trackArticleRead(post.slug, post.title)}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{post.author.name}</p>
                    <p className="text-[10px] text-slate-400">{post.publishedDate}</p>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    onClick={() => trackArticleRead(post.slug, post.title)}
                    className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      {/* ─── Bottom CTA ─── */}
      <Section className="pb-20">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Put these best practices to work on your sites</h2>
            <p className="mt-2 text-slate-300 text-sm">Experience Task Pilot on your live projects. 14 days full trial, no credit card required.</p>
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

export default BlogHubPage;
