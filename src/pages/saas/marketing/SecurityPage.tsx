import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Building2, KeyRound, ScrollText, Download, Server, ShieldCheck, Mail } from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from './MarketingLayout';
import { useSeo } from '../../../lib/seo';

// Every statement on this page must describe something that is actually in
// place today. Do not add certifications (SOC 2, ISO 27001…) or guarantees
// (backup schedules, uptime SLAs) until they are real.
const PILLARS = [
  { icon: Building2, title: 'Separate workspace per company', body: 'Every project, task, document and attendance record is tagged to your organisation. Database access rules return only your company\'s data, and people can only join your workspace through an invitation you send.' },
  { icon: KeyRound, title: 'Roles & permissions', body: 'Directors, project managers, engineers, supervisors, workers and clients each get only the access their role allows. Admins can create custom roles with granular permissions.' },
  { icon: Lock, title: 'Encryption', body: 'All traffic between your devices and Task Pilot is encrypted with HTTPS, and our web domain enforces HSTS. Databases and stored files are encrypted at rest by our infrastructure providers.' },
  { icon: ScrollText, title: 'Audit trail', body: 'Key actions — sign-offs, user changes, billing events and data exports — are recorded with who did what and when, so you can answer questions later.' },
  { icon: Download, title: 'Your data stays yours', body: 'Workspace owners can export everything to Excel or JSON at any time, and request permanent deletion of the workspace and all of its data.' },
  { icon: Server, title: 'Trusted infrastructure', body: 'Task Pilot runs on Supabase (PostgreSQL, hosted on AWS in the Asia Pacific – Tokyo region), Google Firebase for sign-in and notifications, Vercel for the website and Razorpay for payments.' },
];

const SecurityPage: React.FC = () => {
  useSeo({
    title: 'Security & Data Protection',
    description: 'How Task Pilot protects your company data: separate workspaces per company, role-based access, encryption, audit trails, data export and deletion.',
    path: '/security',
  });

  return (
    <MarketingLayout>
      <Section className="pt-16 pb-10 text-center max-w-3xl mx-auto">
        <Eyebrow>Security</Eyebrow>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">Your project data, protected</h1>
        <p className="mt-4 text-slate-600">Drawings, contractor rates and payroll are sensitive. Here is exactly how Task Pilot keeps them safe — no marketing badges, just what is in place today.</p>
      </Section>

      <Section className="pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PILLARS.map(({ icon: I, title, body }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center"><I className="w-5 h-5" aria-hidden /></div>
            <h2 className="mt-4 font-semibold text-slate-900">{title}</h2>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{body}</p>
          </div>
        ))}
      </Section>

      <div className="bg-slate-50 border-y border-slate-200 py-14">
        <Section className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <ShieldCheck className="w-6 h-6 text-slate-700" aria-hidden />
            <h2 className="mt-3 font-semibold">Privacy &amp; legal</h2>
            <p className="mt-1.5 text-sm text-slate-600">How we collect, use and protect personal data, and your rights over it.</p>
            <div className="mt-4 flex gap-4 text-sm font-medium"><Link to="/policy" className="underline">Privacy policy</Link><Link to="/terms" className="underline">Terms of use</Link><Link to="/status" className="underline">System status</Link></div>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 p-6">
            <Mail className="w-6 h-6 text-slate-700" aria-hidden />
            <h2 className="mt-3 font-semibold">Report a vulnerability</h2>
            <p className="mt-1.5 text-sm text-slate-600">Found a security issue? Tell us privately and we will respond quickly. Please don't access other customers' data while testing.</p>
            <Link to="/contact-sales" className="mt-4 inline-block text-sm font-medium underline">Contact the security team</Link>
          </div>
        </Section>
      </div>

      <Section className="py-14 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Questions from your IT or procurement team?</h2>
        <p className="mt-2 text-slate-600">We're happy to walk through our setup on a call.</p>
        <Link to="/contact-sales" className="mt-6 inline-flex h-11 px-6 items-center rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800">Talk to us</Link>
      </Section>
    </MarketingLayout>
  );
};

export default SecurityPage;
