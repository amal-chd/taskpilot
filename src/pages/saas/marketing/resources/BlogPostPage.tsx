import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock, Calendar, ArrowRight, Share2,
  CheckCircle2, ChevronRight, Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import { MarketingLayout, Section } from '../MarketingLayout';
import { BLOG_POSTS } from './blogData';
import { useSeo } from '../../../../lib/seo';
import { trackCtaClick, trackArticleRead } from '../../../../lib/analytics';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const jsonLd = post ? [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.publishedDate,
      dateModified: post.publishedDate,
      author: {
        '@type': 'Person',
        name: post.author.name,
        jobTitle: post.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Thekada Digital Ventures Pvt. Ltd.',
        url: 'https://taskpilot.thekada.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://taskpilot.thekada.in/logo.png',
        },
      },
      mainEntityOfPage: `https://taskpilot.thekada.in/blog/${post.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://taskpilot.thekada.in/' },
        { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://taskpilot.thekada.in/resources' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://taskpilot.thekada.in/blog/${post.slug}` },
      ],
    },
  ] : [];

  useSeo({
    title: post ? `${post.title} | Task Pilot Guides` : 'Construction Management Blog — Task Pilot',
    description: post ? post.summary : 'Guides and insights on construction management and field operations.',
    path: post ? `/blog/${post.slug}` : '/blog',
    type: 'article',
    jsonLd,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <MarketingLayout>
      {/* ─── Breadcrumb ─── */}
      <div className="bg-ink-50 border-b border-ink-200/60 py-2.5 text-xs text-ink-600">
        <Section className="flex items-center gap-2">
          <Link to="/" className="hover:text-ink-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
          <Link to="/blog" className="hover:text-ink-900 transition-colors">Resources</Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
          <span className="text-ink-900 font-semibold truncate">{post.title}</span>
        </Section>
      </div>

      {/* ─── Article Header ─── */}
      <div className="bg-white pt-12 pb-10 border-b border-ink-100">
        <Section className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs text-ink-600 mb-4">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-800 font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedDate}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.15]">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink-600 leading-relaxed font-normal">
            {post.headline}
          </p>

          <div className="mt-6 pt-6 border-t border-ink-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ink-900 text-brand-300 flex items-center justify-center font-bold text-sm">
                {post.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-ink-900">{post.author.name}</p>
                <p className="text-xs text-ink-600">{post.author.role}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="h-9 px-3.5 rounded-full border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-ink-50 transition-colors inline-flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </Section>
      </div>

      {/* ─── Article Body ─── */}
      <article className="py-14 bg-ink-50/50">
        <Section className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-ink-200 shadow-xs space-y-8 text-ink-700 leading-relaxed text-base">
          {/* Introduction */}
          <p className="text-lg text-ink-800 leading-relaxed font-medium">
            {post.content.intro}
          </p>

          {/* Sections */}
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-6 border-t border-ink-100">
              <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-ink-600 leading-relaxed">
                  {p}
                </p>
              ))}

              {section.keyTakeaways && (
                <div className="my-6 p-5 rounded-2xl bg-brand-50/70 border border-brand-200/80">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-900 mb-2">Key Takeaways</p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-brand-950">
                    {section.keyTakeaways.map((item, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.checklist && (
                <div className="my-6 p-6 rounded-2xl bg-ink-900 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-3">Field Engineering Checklist</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-ink-200">
                    {section.checklist.map((c, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.callout && (
                <div className="my-6 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 text-xs sm:text-sm">
                  <p className="font-bold text-blue-900 mb-1">{section.callout.title}</p>
                  <p className="text-blue-800 leading-relaxed">{section.callout.text}</p>
                </div>
              )}
            </div>
          ))}

          {/* In-Article Conversion Callout */}
          <div className="my-10 p-8 rounded-3xl bg-gradient-to-br from-ink-900 to-ink-950 text-white text-center">
            <h3 className="text-2xl font-bold">Put these standards to work with Task Pilot</h3>
            <p className="mt-2 text-ink-200 text-sm max-w-lg mx-auto">
              Automate your daily progress reports, GPS attendance, and BOQ cost tracking in one unified platform.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/register"
                onClick={() => trackCtaClick('blog_inline', 'Start 14-day free trial', '/register')}
                className="h-11 px-6 rounded-full bg-brand-500 text-white font-bold text-sm hover:bg-brand-400 transition-all shadow-md inline-flex items-center gap-1.5"
              >
                Start 14-day free trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Conclusion */}
          <div className="pt-6 border-t border-ink-100">
            <h3 className="text-xl font-bold text-ink-900 mb-2">Conclusion</h3>
            <p className="text-ink-600 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </Section>
      </article>

      {/* ─── Related Articles ─── */}
      <div className="bg-ink-50 py-16 border-t border-ink-200">
        <Section className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-ink-900">Related Field Guides</h3>
            <Link to="/blog" className="text-sm font-bold text-ink-900 hover:text-brand-600 transition-colors">
              View all resources →
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blog/${r.slug}`}
                onClick={() => trackArticleRead(r.slug, r.title)}
                className="bg-white p-5 rounded-2xl border border-ink-200 hover:border-ink-900 hover:shadow-md transition-all group"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-500 block mb-1">
                  {r.category}
                </span>
                <h4 className="font-bold text-ink-900 text-sm group-hover:text-brand-600 transition-colors line-clamp-2">
                  {r.title}
                </h4>
                <p className="text-xs text-ink-600 mt-2 line-clamp-2">
                  {r.summary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </MarketingLayout>
  );
};

export default BlogPostPage;
