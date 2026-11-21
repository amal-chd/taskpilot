import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, ShieldCheck, Smartphone, IndianRupee,
  Check, MapPin, FileText, Clock, ChevronRight, Activity, HardHat,
  Boxes, AlertTriangle, Layers, DollarSign, Award, Star,
  Calculator, ClipboardCheck, GanttChart, MessageSquare, Truck,
  Building2, Paintbrush, Route, Wrench, Briefcase, Zap, Eye, ZoomIn, Download
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from './MarketingLayout';
import { FEATURES, INDUSTRIES, FAQS } from './content';
import { PricingCards } from './PricingPage';
import { useSeo } from '../../../lib/seo';
import { trackCtaClick, trackFeatureClick, trackFaqExpand } from '../../../lib/analytics';
import { ScreenshotLightbox } from '../../../components/common/ScreenshotLightbox';

const SHOWCASE_TABS = [
  {
    id: 'command',
    label: 'Command Center',
    icon: Activity,
    title: 'Multi-Site Operations Command Dashboard',
    subtitle: 'Unified executive pulse across all active jobsites with live geofenced muster, task velocity, and EVM metrics',
    image: '/images/screenshots/web-dashboard-command-center.webp',
    badge: 'Desktop Web App',
  },
  {
    id: 'tasks',
    label: 'Tasks & 3-Step Verification',
    icon: CheckCircle2,
    title: 'Enforced 3-Step Verification Kanban & Hold Points',
    subtitle: 'Stops premature task completion: tasks move from In Progress → Under Review with photo proof before manager sign-off',
    image: '/images/screenshots/web-tasks-kanban-verification.webp',
    badge: 'Desktop Web App',
  },
  {
    id: 'dpr',
    label: 'Daily Site Diary (DPR)',
    icon: FileText,
    title: 'Daily Progress Report (DPR) & Trade Muster',
    subtitle: 'Standardized daily progress reports recording manpower, weather, machinery hours, and verified photos',
    image: '/images/screenshots/web-site-diary-dpr.webp',
    badge: 'Desktop & Client Portal',
  },
  {
    id: 'boq',
    label: 'BOQ & Cost Control',
    icon: Calculator,
    title: 'BOQ & Earned Value Cost Management (EVM)',
    subtitle: 'Real-time Cost Performance Index (CPI) and Schedule Performance Index (SPI) tracked against tender budgets',
    image: '/images/screenshots/web-boq-cost-control.webp',
    badge: 'Desktop Commercial Suite',
  },
  {
    id: 'gantt',
    label: 'Gantt Master Timeline',
    icon: GanttChart,
    title: 'Interactive Gantt Schedule & Critical Path',
    subtitle: 'Visual project schedules showing task dependencies, phase progress, and handover milestones',
    image: '/images/screenshots/web-gantt-timeline.webp',
    badge: 'Desktop Planning Suite',
  },
  {
    id: 'attendance',
    label: 'GPS Mobile Muster',
    icon: MapPin,
    title: 'Location-Verified GPS Geofenced Attendance',
    subtitle: 'Point-in-time perimeter validation on iOS and Android: zero battery drain, zero continuous tracking',
    image: '/images/screenshots/mobile-app-attendance-geofence.webp',
    badge: 'Native Mobile App (iOS / Android)',
  },
];

export const ProductHomePage: React.FC = () => {
  useSeo({
    title: 'Task Pilot — Construction Management Software for Builders & Field Teams',
    description: 'Construction management software that runs every site from one workspace: tasks and approvals, daily site reports, GPS attendance, BOQ and cost control, materials, labour and inspections. Web, iOS and Android. Free 14-day trial.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://taskpilot.thekada.in/#organization',
          name: 'Thekada Digital Ventures Pvt. Ltd.',
          url: 'https://taskpilot.thekada.in',
          logo: 'https://taskpilot.thekada.in/logo.png',
          sameAs: ['https://twitter.com/TaskPilotApp'],
        },
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://taskpilot.thekada.in/#software',
          name: 'Task Pilot',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, Android, iOS',
          description: 'Construction management software for builders, contractors and field teams, by Thekada Digital Ventures Pvt. Ltd.',
          url: 'https://taskpilot.thekada.in',
          publisher: { '@id': 'https://taskpilot.thekada.in/#organization' },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '19',
            highPrice: '99',
            offerCount: '4',
          },
        },
      ],
    },
  });

  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'command' | 'tasks' | 'dpr' | 'boq' | 'gantt' | 'attendance'>('command');
  const [activeViewMode, setActiveViewMode] = useState<'kanban' | 'list' | 'gantt' | 'mobile'>('kanban');
  const [demoApproved, setDemoApproved] = useState(false);
  const [demoCheckedIn, setDemoCheckedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    src: string;
    title: string;
    caption?: string;
    badge?: string;
  }>({
    isOpen: false,
    src: '',
    title: '',
    caption: '',
    badge: '',
  });

  const openScreenshot = (src: string, title: string, caption?: string, badge?: string) => {
    setLightbox({ isOpen: true, src, title, caption, badge });
  };

  const currentTab = SHOWCASE_TABS.find((t) => t.id === activeShowcaseTab) || SHOWCASE_TABS[0];

  return (
    <MarketingLayout>
      {/* ─── 1. HERO SECTION ─── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-10 pb-20 md:pt-16 md:pb-28 border-b border-slate-100">
        <div aria-hidden className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

        <Section className="relative">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Construction management software · Web, iOS &amp; Android</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Every site, task and crew —{' '}
              <span className="text-amber-600 underline decoration-amber-300/60 decoration-wavy decoration-2">
                under verified control.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              Task Pilot replaces chaotic WhatsApp groups and paper registers with one unified workspace for task sign-offs,
              location-verified GPS attendance, daily site diaries (DPR), BOQ cost tracking, and equipment allocation — on desktop and on every smartphone.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/register"
                onClick={() => trackCtaClick('hero', 'Start 14-day free trial', '/register')}
                className="w-full sm:w-auto h-13 px-8 inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-all hover:-translate-y-0.5"
              >
                Start 14-day free trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact-sales"
                onClick={() => trackCtaClick('hero', 'Book a live demo', '/contact-sales')}
                className="w-full sm:w-auto h-13 px-7 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-all"
              >
                Book a live demo
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No credit card required
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Live in 10 minutes
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Native Android & iOS apps
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Predictable flat team tiers
              </li>
            </ul>
          </div>

          {/* ── Interactive Hero Showcase (Real App Screenshots & UI Inspect) ── */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/40 overflow-hidden max-w-6xl mx-auto text-left">
            {/* Window Topbar */}
            <div className="bg-slate-950 text-white px-4 py-3 flex flex-wrap items-center justify-between border-b border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-semibold text-slate-300 hidden sm:inline">
                  Task Pilot OS · Production Construction Hub
                </span>
              </div>
              <div role="tablist" aria-label="Product areas" className="m-scroll-row w-full sm:w-auto flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                {SHOWCASE_TABS.map((t) => {
                  const TIcon = t.icon;
                  const active = activeShowcaseTab === t.id;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveShowcaseTab(t.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <TIcon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showcase Stage */}
            {currentTab && (
              <div className="p-4 sm:p-6 bg-slate-900 text-white">
                {/* Screenshot Frame with Interactive Zoom Hover */}
                <div
                  className="relative group rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl cursor-pointer"
                  onClick={() => openScreenshot(currentTab.image, currentTab.title, currentTab.subtitle, currentTab.badge)}
                >
                  <img fetchPriority="high" width={1600} height={1000} decoding="async"
                    src={currentTab.image}
                    alt={currentTab.title}
                    className="w-full h-auto object-cover max-h-[580px] transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="eager"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-bold border border-slate-700 backdrop-blur-md shadow-xl flex items-center gap-2">
                      <Eye className="w-4 h-4 text-amber-400" /> Click to zoom and inspect high-res real app details
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* ─── 2. TRUST & METRICS BANNER ─── */}
      <div className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <Section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">21</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">Specialized Modules</p>
              <p className="text-[11px] text-slate-400 mt-0.5">GPS attendance to BOQ spend</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">8 Tiers</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">Pre-Configured Roles</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Directors down to Site Labour</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">100%</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">Tenant Data Isolation</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Encrypted private workspace</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">$0 / ₹0</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-semibold">Per-Seat Surcharges</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Predictable flat team tiers</p>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── 3. THE PROBLEM: 3 JOBSITE BREAKDOWNS ─── */}
      <div className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <Section>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-400">The Construction Reality</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Solving the 3 costliest breakdowns on jobsites
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              See how Task Pilot replaces informal verbal chaos with verified digital standards.
            </p>
          </div>

          <div className="m-carousel grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" /> The WhatsApp Chaos Trap
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Unrecorded Changes & Missed Inspections</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Pour approvals and drawing revisions get lost in cluttered WhatsApp groups. When rebar spacing is wrong or concrete finishes crack, there is no verifiable paper trail.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">The Task Pilot Solution</p>
                <p className="text-xs text-slate-300">
                  Enforced 3-step verification gates (In Progress → Under Review → Done). No task closes without engineer digital sign-off and mandatory photo evidence.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" /> Ghost Labor & Attendance Fraud
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Inflated Muster Rolls & Disputed Overtime</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Paper registers and proxy punches result in contractors billing for workers who were never on site, while disputed overtime claims turn into monthly headaches.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">The Task Pilot Solution</p>
                <p className="text-xs text-slate-300">
                  Point-in-time GPS check-ins validated against the project perimeter radius. Overtime beyond 8 hours is auto-calculated with zero battery drain.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:bg-white/[0.08] transition-all">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" /> Late Budget Variance Discovery
                </div>
                <h3 className="font-bold text-lg text-white mb-2">Cost Overruns Discovered Too Late</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Site material purchases and labor advances are recorded weeks later on disconnected Excel sheets, obscuring project burn rates until profits evaporate.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">The Task Pilot Solution</p>
                <p className="text-xs text-slate-300">
                  Live BOQ Earned Value Management updates Planned Value (PV), Earned Value (EV), and Cost Performance Index (CPI) dynamically as site work progresses.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── 4. DIFFERENT WAYS TO WORK (VIEWS SHOWCASE) ─── */}
      <Section className="py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>Versatile Views</Eyebrow>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Work the way your team thinks
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Switch effortlessly between visual Kanban boards, structured lists, Gantt schedules, and mobile field apps.
          </p>

          <div className="m-scroll-row mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'kanban', label: 'Kanban Board' },
              { id: 'list', label: 'Structured List' },
              { id: 'gantt', label: 'Gantt Timeline' },
              { id: 'mobile', label: 'Mobile Field App' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveViewMode(v.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeViewMode === v.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* View Container */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {activeViewMode === 'kanban' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Visual Kanban Board with 3-Step Verification Hold Points</h3>
                  <p className="text-xs text-slate-500">Live task progression with mandatory engineer reviews before closure</p>
                </div>
                <button
                  onClick={() => openScreenshot('/images/screenshots/web-tasks-kanban-verification.webp', 'Tasks 3-Step Verification Kanban', 'Enforced 3-step sign-off gate on Commercial Tower Block A')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer"
                onClick={() => openScreenshot('/images/screenshots/web-tasks-kanban-verification.webp', 'Tasks 3-Step Verification Kanban', 'Enforced 3-step sign-off gate on Commercial Tower Block A')}
              >
                <img width={1600} height={1000}
                  src="/images/screenshots/web-tasks-kanban-verification.webp"
                  alt="Tasks 3-Step Verification Kanban"
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}

          {activeViewMode === 'list' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Itemized BOQ Cost Control & Earned Value Ledger</h3>
                  <p className="text-xs text-slate-500">Structured tabular breakdown of unit rates, tender budgets, and package variance</p>
                </div>
                <button
                  onClick={() => openScreenshot('/images/screenshots/web-boq-cost-control.webp', 'BOQ & Earned Value Cost Management', 'Itemized civil package costs and Cost Performance Index')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer"
                onClick={() => openScreenshot('/images/screenshots/web-boq-cost-control.webp', 'BOQ & Earned Value Cost Management', 'Itemized civil package costs and Cost Performance Index')}
              >
                <img width={1600} height={1000}
                  src="/images/screenshots/web-boq-cost-control.webp"
                  alt="BOQ & Cost Control View"
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}

          {activeViewMode === 'gantt' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Gantt Master Schedule & Critical Path</h3>
                  <p className="text-xs text-slate-500">Interactive timeline tracking civil dependencies, slab milestones, and handover dates</p>
                </div>
                <button
                  onClick={() => openScreenshot('/images/screenshots/web-gantt-timeline.webp', 'Gantt Timeline Schedule', 'Critical path and milestone dependencies across 5 construction phases')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer"
                onClick={() => openScreenshot('/images/screenshots/web-gantt-timeline.webp', 'Gantt Timeline Schedule', 'Critical path and milestone dependencies across 5 construction phases')}
              >
                <img width={1600} height={1000}
                  src="/images/screenshots/web-gantt-timeline.webp"
                  alt="Gantt Timeline Schedule"
                  className="w-full h-auto object-cover max-h-[500px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          )}

          {activeViewMode === 'mobile' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Native Mobile Field App for iOS & Android</h3>
                  <p className="text-xs text-slate-500">Built for site engineers and foremen with offline support and point-in-time GPS validation</p>
                </div>
                <button
                  onClick={() => openScreenshot('/images/screenshots/mobile-app-attendance-geofence.webp', 'Mobile GPS Attendance Screen', 'Tamper-proof geofenced mobile check-in')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 items-center justify-center max-w-2xl mx-auto py-4">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 group cursor-pointer max-w-[260px] mx-auto hover:border-amber-500/50 transition-all"
                  onClick={() => openScreenshot('/images/screenshots/mobile-app-attendance-geofence.webp', 'GPS Geofenced Attendance', 'Point-in-time perimeter check-in with 0 battery drain')}
                >
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-attendance-geofence.webp"
                    alt="Mobile GPS Attendance"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div
                  className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-800 bg-slate-950 group cursor-pointer max-w-[260px] mx-auto hover:border-amber-500/50 transition-all"
                  onClick={() => openScreenshot('/images/screenshots/mobile-app-task-inspection.webp', 'Mobile 3-Step Verification', 'Photo proof with GPS watermark and manager sign-off')}
                >
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-task-inspection.webp"
                    alt="Mobile Task Verification"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ─── 4B. DEDICATED MOBILE FIELD APP SHOWCASE ─── */}
      <div className="bg-slate-950 text-white py-20 border-y border-slate-800 relative overflow-hidden">
        <div aria-hidden className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <Section className="relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Built For Harsh Jobsite Realities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Native Mobile Apps for Field Engineers & Foremen
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Desktop software is useless if site crews cannot use it in muddy trenches and blazing heat.
              Task Pilot runs natively on iOS and Android with big tap targets, 100% offline-first synchronization,
              and zero background battery drain.
            </p>
          </div>

          <div className="m-carousel m-carousel-narrow grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone 1 */}
            <div
              className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 group cursor-pointer shadow-xl"
              onClick={() => openScreenshot('/images/screenshots/mobile-app-attendance-geofence.webp', 'GPS Geofenced Attendance', 'Point-in-time check-in within site boundary radius')}
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 shadow-inner group-hover:scale-[1.02] transition-transform">
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-attendance-geofence.webp"
                    alt="GPS Attendance"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded">
                  Field Attendance
                </span>
                <h3 className="text-base font-bold text-white mt-2">Location-Verified GPS Attendance</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Supervisors check in within the verified site radius. Captures point-in-time GPS only, ensuring zero battery drain and complete worker trust.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 shrink-0" /> ±2.4m GPS accuracy · 0 proxy punches
              </div>
            </div>

            {/* Phone 2 */}
            <div
              className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 group cursor-pointer shadow-xl"
              onClick={() => openScreenshot('/images/screenshots/mobile-app-task-inspection.webp', '3-Step QA Verification & Hold Points', 'Enforced inspection checklists with geotagged photo evidence')}
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 shadow-inner group-hover:scale-[1.02] transition-transform">
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-task-inspection.webp"
                    alt="Task Verification"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/25 px-2 py-0.5 rounded">
                  QA Hold Points
                </span>
                <h3 className="text-base font-bold text-white mt-2">Pre-Pour Hold Point Clearances</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Engineers upload rebar and shuttering inspection photos with embedded GPS watermarks. Tasks cannot self-close without PM digital approval.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Watermark stamped · Zero self-closing
              </div>
            </div>

            {/* Phone 3 */}
            <div
              className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 group cursor-pointer shadow-xl"
              onClick={() => openScreenshot('/images/screenshots/mobile-app-site-diary.webp', 'Daily Site Diary (DPR) Logger', 'Log weather, manpower counts, and machine hours in 3 minutes')}
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 shadow-inner group-hover:scale-[1.02] transition-transform">
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-site-diary.webp"
                    alt="Daily Site Diary"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 rounded">
                  Field Reporting
                </span>
                <h3 className="text-base font-bold text-white mt-2">3-Minute Daily Site Diary (DPR)</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Log weather conditions, trade headcounts, and equipment active hours before leaving the gate. Replaces cumbersome paper site logs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 shrink-0" /> 1-tap client PDF · Photo gallery
              </div>
            </div>

            {/* Phone 4 */}
            <div
              className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 group cursor-pointer shadow-xl"
              onClick={() => openScreenshot('/images/screenshots/mobile-app-blueprints.webp', 'Drawing & Blueprint Viewer', 'Zoom into approved GFC structural drawings on site')}
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-4 bg-slate-950 shadow-inner group-hover:scale-[1.02] transition-transform">
                  <img width={780} height={1688}
                    src="/images/screenshots/mobile-app-blueprints.webp"
                    alt="Drawing Viewer"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/25 px-2 py-0.5 rounded">
                  Document Control
                </span>
                <h3 className="text-base font-bold text-white mt-2">Mobile Blueprints & Drawing Revisions</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Engineers inspect structural reinforcement details directly on site. Approved GFC revision stamps ensure teams never build off obsolete drawings.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-purple-400 font-semibold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 shrink-0" /> 100% Offline caching · Vector zoom
              </div>
            </div>
          </div>

          {/* 4 Architectural Field Guarantees */}
          <div className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Offline-First SQLite</h4>
                <p className="text-xs text-slate-400 mt-0.5">Works deep inside concrete basements with automatic background retry upon cellular reconnection.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Zero Battery Drain GPS</h4>
                <p className="text-xs text-slate-400 mt-0.5">Location is queried for 1 second during punch-in. No battery-draining continuous background tracking.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Direct Sunlight Readability</h4>
                <p className="text-xs text-slate-400 mt-0.5">High-contrast UI typography and oversized buttons designed for field hands and construction gloves.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                04
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Biometric Gate Security</h4>
                <p className="text-xs text-slate-400 mt-0.5">Optional FaceID and fingerprint authentication prevents buddy punching and unauthorized phone transfers.</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── 5. INTERACTIVE LIVE PRODUCT DEMO WIDGET ─── */}
      <div className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <Section className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-400">Interactive Simulation</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
              Try the 3-step verification workflow right now
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              See how Task Pilot stops premature task completion with mandatory manager sign-off.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-700 gap-3">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Demo Task #104</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Pre-Pour Rebar Reinforcement Verification</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                demoApproved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {demoApproved ? 'Status: Approved & Done' : 'Status: Under Review (Sign-Off Pending)'}
              </span>
            </div>

            <div className="my-6 space-y-3 text-xs sm:text-sm text-slate-300">
              <p>• Site Engineer conducted physical inspection and uploaded verified rebar photo.</p>
              <p>• Verified rule: Field teams cannot self-close tasks marked for QA review.</p>
              <p>• As Project Manager or Director, click below to digitally clear this hold point:</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDemoApproved(!demoApproved)}
                className={`w-full sm:w-auto h-11 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  demoApproved
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md'
                }`}
              >
                {demoApproved ? (
                  <>
                    <Check className="w-4 h-4" /> Hold Point Cleared (Click to Reset)
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Digitally Approve & Mark Done
                  </>
                )}
              </button>

              <Link
                to="/register"
                className="w-full sm:w-auto h-11 px-6 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors"
              >
                Experience on your live sites →
              </Link>
            </div>
          </div>
        </Section>
      </div>

      {/* ─── 6. FLAGSHIP FEATURES DEEP DIVE ─── */}
      <Section className="py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Eyebrow>All-In-One Platform</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              One system from tender BOQ to final snag clearance
            </h2>
          </div>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-amber-600 transition-colors shrink-0"
          >
            Explore all 21 modules <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.slice(0, 9).map(({ icon: Icon, title, desc, key }) => (
            <div
              key={title}
              className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:border-slate-900 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5 text-amber-400 group-hover:text-slate-950" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-600 transition-colors">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/features/${key === 'tasks' ? 'task-management' : key === 'attendance' ? 'gps-attendance' : key === 'site_diary' ? 'daily-site-diary' : key === 'boq' ? 'boq-cost-control' : key === 'materials' ? 'materials-inventory' : key === 'inspections' ? 'inspections-punch-lists' : key === 'timeline' ? 'gantt-timeline' : key === 'documents' ? 'document-control' : 'task-management'}`}
                  className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                >
                  Feature details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 7. INDUSTRY SECTORS ─── */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Tailored For Your Sector</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Built for every phase of construction & field operations
            </h2>
            <p className="mt-3 text-slate-600">
              Whether you manage high-rise towers, civil highways, or luxury fit-outs, Task Pilot adapts to your workflow.
            </p>
          </div>

          <div className="m-carousel grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map(({ slug, icon: Icon, name, headline }) => (
              <Link
                key={slug}
                to={`/industries/${slug}`}
                className="group rounded-3xl border border-slate-200 p-6 hover:border-slate-900 hover:shadow-xl transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-amber-500/10 text-slate-700 group-hover:text-amber-700 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">{name}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{headline}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 group-hover:gap-2.5 transition-all">
                  See workflows <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── 8. PRICING PREVIEW ─── */}
      <div className="bg-white py-20">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Transparent Pricing</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Predictable flat team pricing in your local currency
            </h2>
            <p className="mt-3 text-slate-600">
              Every plan includes a 14-day free trial with full module access. No hidden user fees or per-seat penalties.
            </p>
          </div>
          <PricingCards />
        </Section>
      </div>

      {/* ─── 9. USE-CASE SCENARIOS ───
          Illustrative workflows, NOT customer testimonials. Only publish real
          quotes that a named customer has approved (see TESTIMONIALS in content.ts). */}
      <div className="bg-slate-50/80 py-20 border-y border-slate-200">
        <Section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>How teams use it</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Built for the problems that cost jobsites the most
            </h2>
            <p className="mt-3 text-slate-600 text-sm">Three common scenarios and the Task Pilot workflow that handles each one.</p>
          </div>

          <div className="m-carousel grid md:grid-cols-3 gap-6">
            {[
              {
                tag: 'Civil infrastructure', title: 'Settle muster and overtime disputes',
                problem: 'Month-end arguments over contractor headcount and overtime hours, with only paper registers as evidence.',
                workflow: 'Geofenced mobile check-in plus the daily labour register by contractor and trade gives a dated, location-stamped record for every man-day.',
                link: '/features/gps-attendance',
              },
              {
                tag: 'Residential high-rise', title: 'Enforce pre-pour hold points',
                problem: 'Concrete poured before reinforcement is checked, leading to costly rework.',
                workflow: 'The pre-pour checklist must be completed with photos and signed off by QA before the task can be closed — failed items become punch items automatically.',
                link: '/features/inspections-punch-lists',
              },
              {
                tag: 'Commercial fit-out', title: 'Close handover snags faster',
                problem: 'Snag lists spread across spreadsheets and chat groups delay handover and retention release.',
                workflow: 'Room-by-room punch items with before/after photos, owners and due dates, plus a review step before anything is marked closed.',
                link: '/features/inspections-punch-lists',
              },
            ].map((c) => (
              <div key={c.title} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                <span className="self-start text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{c.tag}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-3">{c.title}</h3>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">The problem</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{c.problem}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">The workflow</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{c.workflow}</p>
                <Link to={c.link} className="mt-auto pt-5 text-sm font-semibold text-amber-700 hover:underline">See how it works →</Link>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ─── 10. ACCESSIBLE ACCORDION FAQ ─── */}
      <Section className="py-20 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Got Questions?</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Everything you need to know about starting with Task Pilot.
          </p>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((f, i) => {
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
                  <span className="text-base sm:text-lg pr-4">{f.q}</span>
                  <span className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180 text-amber-600' : ''}`}>▾</span>
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

        <div className="mt-8 text-center">
          <Link to="/faq" className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors">
            View all 20+ frequently asked questions →
          </Link>
        </div>
      </Section>

      {/* ─── 11. FINAL HIGH-IMPACT CONVERSION CTA ─── */}
      <Section className="pb-20">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to bring order to your jobsites?</h2>
            <p className="mt-2 text-slate-300 text-sm">Start your 14-day free trial now. Full features, no credit card required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              onClick={() => trackCtaClick('bottom_cta', 'Start free trial', '/register')}
              className="h-12 px-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shrink-0 shadow-lg"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              onClick={() => trackCtaClick('bottom_cta', 'Book a live demo', '/contact-sales')}
              className="h-12 px-6 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 shrink-0"
            >
              Book a live demo
            </Link>
          </div>
        </div>
      </Section>

      {/* ─── High-Resolution Screenshot Zoom Lightbox ─── */}
      <ScreenshotLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
        imageSrc={lightbox.src}
        title={lightbox.title}
        caption={lightbox.caption}
        badge={lightbox.badge}
      />
    </MarketingLayout>
  );
};

export default ProductHomePage;
