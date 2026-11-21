import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Check, Smartphone, MapPin,
  Calculator, ClipboardCheck, Users, Activity, HardHat,
  ShieldCheck, FileText, ChevronRight, Eye
} from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from './MarketingLayout';
import { useSeo } from '../../../lib/seo';
import { trackCtaClick } from '../../../lib/analytics';
import { ScreenshotLightbox } from '../../../components/common/ScreenshotLightbox';

export const HowItWorksPage: React.FC = () => {
  useSeo({
    title: 'How It Works — Set Up Construction Management in 4 Steps',
    description: 'See how Task Pilot connects the head office to every active site: workspace setup, mobile GPS attendance, daily DPR reporting, and real-time BOQ cost control.',
    path: '/how-it-works',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How Task Pilot Works in Construction Operations',
      description: 'End-to-end 4-step workflow connecting site execution to head office commercials.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Setup Workspace & Geofence', text: 'Configure site geofence perimeter coordinates and import tender BOQ from Excel.' },
        { '@type': 'HowToStep', position: 2, name: 'Daily Site Execution', text: 'Crews check in via GPS, supervisors log DPR musters, and tasks are executed on mobile.' },
        { '@type': 'HowToStep', position: 3, name: 'Quality Inspections & Hold Points', text: 'Enforce pre-pour structural checklists and 3-step manager verification.' },
        { '@type': 'HowToStep', position: 4, name: 'Real-Time Cost & EVM Reporting', text: 'Track Cost Performance Index (CPI) and generate client progress packs.' },
      ],
    },
  });

  const [activeRole, setActiveRole] = useState<'director' | 'pm' | 'engineer' | 'foreman'>('director');
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

  const roleWorkflows = {
    director: {
      title: 'Managing Directors & Executive Developers',
      summary: 'Get multi-site portfolio visibility without relying on subjective phone calls or delayed monthly reports.',
      steps: [
        'Open the Command Dashboard to view live worker counts and task velocity across all active sites.',
        'Track Earned Value Management (EVM) metrics: monitor Cost Performance Index (CPI) to spot budget drift.',
        'Review client-ready Daily Progress Reports (DPR) with verified photographs and weather notes.',
        'Broadcast urgent company-wide directives or safety standards with guaranteed push delivery.',
      ],
    },
    pm: {
      title: 'Project Managers',
      summary: 'Coordinate multiple concurrent trades and enforce quality gates without being stuck in site offices.',
      steps: [
        'Assign tasks with strict deadlines and drawing attachments to individual engineers or entire roles.',
        'Review and digitally sign off on pre-pour concrete hold points and structural snag rectifications.',
        'Approve site material requisitions and monitor actual consumption against tender BOQ norms.',
        'Reconcile subcontractor muster rolls and overtime hours before certifying monthly contractor bills.',
      ],
    },
    engineer: {
      title: 'Site Engineers (Civil, Structural, MEP)',
      summary: 'Execute field tasks with clear priorities, drawing revisions in your pocket, and zero evening paperwork.',
      steps: [
        'Punch in at the site gate in 1 second via location-verified point-in-time GPS geofencing.',
        'Check assigned tasks on mobile, view high-res PDF blueprints, and tick off subtask checklists.',
        'Capture inspection photos and submit tasks for manager sign-off directly from the work front.',
        'Compile the complete Daily Progress Report (DPR) in under 3 minutes before leaving the jobsite.',
      ],
    },
    foreman: {
      title: 'General Foremen & Subcontractors',
      summary: 'Clear task instructions, fair dispute-free overtime records, and instant material gate passes.',
      steps: [
        'Log morning trade muster (masons, carpenters, helpers) during the toolbox talk.',
        'Receive clear punch list items with circled photo markups so trades fix the exact defect.',
        'Request emergency material indents directly on mobile when site stock runs low.',
        'Guaranteed overtime tracking that eliminates end-of-month invoice disputes with head office.',
      ],
    },
  };

  return (
    <MarketingLayout>
      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-20 border-b border-slate-100">
        <Section className="text-center max-w-4xl mx-auto">
          <Eyebrow>End-To-End Architecture</Eyebrow>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            How Task Pilot Coordinates Every Site
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From the morning gate muster to real-time BOQ cost control, see how Task Pilot replaces WhatsApp groups
            with verified operational discipline.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              onClick={() => trackCtaClick('how_it_works_hero', 'Start 14-day free trial', '/register')}
              className="w-full sm:w-auto h-13 px-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-semibold text-base hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5"
            >
              Start 14-day free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact-sales"
              onClick={() => trackCtaClick('how_it_works_hero', 'Book a live demo', '/contact-sales')}
              className="w-full sm:w-auto h-13 px-7 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-base hover:bg-slate-50 transition-all"
            >
              Book a live demo
            </Link>
          </div>
        </Section>
      </div>

      {/* ─── 4 Sequential Steps ─── */}
      <Section className="py-20">
        <div className="space-y-16">
          {[
            {
              step: '01',
              title: 'Workspace, Project & BOQ Setup',
              desc: 'Create your private tenant workspace in minutes. Import your tender BOQ spreadsheet, define project GPS coordinates with custom perimeter radiuses, and invite team members with pre-configured 8-tier construction roles.',
              icon: HardHat,
              image: '/images/screenshots/web-dashboard-command-center.webp',
              badge: 'Desktop Command Center',
              highlights: ['Direct Excel BOQ import with item rates', 'Perimeter geofence coordinate lock', '8 pre-configured construction roles'],
            },
            {
              step: '02',
              title: 'Daily Site Execution & Muster',
              desc: 'Site engineers and supervisors punch in via mobile GPS. Supervisors record trade headcounts during morning safety talks. Field staff receive task assignments, view approved drawing revisions, and log execution hours right from their phones.',
              icon: Smartphone,
              image: '/images/screenshots/mobile-app-attendance-geofence.webp',
              badge: 'Native Mobile Field App',
              highlights: ['Point-in-time GPS check-in (zero battery drain)', 'Mobile drawing viewer with revision history', 'Daily site diary completed in under 3 minutes'],
            },
            {
              step: '03',
              title: 'Quality Verification & Hold Points',
              desc: 'Before any concrete pour begins, site engineers conduct digital checklists verifying formwork, rebar spacing, and cover blocks. Tasks move to Under Review for authorized manager sign-off, requiring photo proof before closing.',
              icon: ClipboardCheck,
              image: '/images/screenshots/web-tasks-kanban-verification.webp',
              badge: 'QA Hold Points & Inspections',
              highlights: ['Enforced 3-step verification workflow', 'Pre-pour structural hold points', 'Snag lists with photo annotations'],
            },
            {
              step: '04',
              title: 'Real-Time EVM & Cost Control',
              desc: 'As tasks are signed off, Task Pilot updates Planned Value (PV), Earned Value (EV), and Cost Performance Index (CPI) dynamically. Material requisitions and contractor advances feed into Actual Cost, alerting leadership to budget drift.',
              icon: Calculator,
              image: '/images/screenshots/web-boq-cost-control.webp',
              badge: 'BOQ & Earned Value Ledger',
              highlights: ['Live CPI and Schedule Variance (SV) tracking', 'Client-ready PDF progress packs', 'One-click payroll timesheet export'],
            },
          ].map((s, idx) => {
            const SIcon = s.icon;
            return (
              <div
                key={s.step}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  idx % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-black text-amber-500">{s.step}</span>
                    <span className="w-8 h-px bg-amber-200" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{s.title}</h2>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">{s.desc}</p>

                  <ul className="mt-5 space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                    {s.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group cursor-pointer transition-all hover:shadow-2xl ${
                    idx % 2 === 1 ? 'md:col-start-1' : ''
                  }`}
                  onClick={() => openScreenshot(s.image, s.title, s.desc, s.badge)}
                >
                  <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-slate-950">
                    <img width={s.image.includes('mobile-app') ? 780 : 1600} height={s.image.includes('mobile-app') ? 1688 : 1000}
                      src={s.image}
                      alt={s.title}
                      className="w-full h-auto object-cover max-h-[380px] transition-transform duration-300 group-hover:scale-[1.02]"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold border border-slate-700 backdrop-blur-md shadow-xl flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" /> Click to Inspect Fullscreen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ─── Role-Based Walkthrough Selector ─── */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <Section className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Eyebrow>Role Experiences</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              How Task Pilot works for your specific role
            </h2>
          </div>

          {/* Role Tabs */}
          <div className="m-scroll-row flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'director', label: 'Managing Director' },
              { id: 'pm', label: 'Project Manager' },
              { id: 'engineer', label: 'Site Engineer' },
              { id: 'foreman', label: 'General Foreman' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeRole === r.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{roleWorkflows[activeRole].title}</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{roleWorkflows[activeRole].summary}</p>

            <div className="space-y-3">
              {roleWorkflows[activeRole].steps.map((st, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 font-medium leading-relaxed">{st}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* ─── Bottom CTA ─── */}
      <Section className="py-20">
        <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to streamline your jobsites?</h2>
            <p className="mt-2 text-slate-300 text-sm">Create your workspace and start your 14-day free trial in under 10 minutes.</p>
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

      {/* Screenshot Lightbox Modal */}
      <ScreenshotLightbox
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        src={lightbox.src}
        title={lightbox.title}
        caption={lightbox.caption}
        badge={lightbox.badge}
      />
    </MarketingLayout>
  );
};

export default HowItWorksPage;
