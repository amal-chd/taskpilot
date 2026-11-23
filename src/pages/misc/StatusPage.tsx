import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, XCircle, Globe, Database, CreditCard, RefreshCw, Loader2 } from 'lucide-react';
import { MarketingLayout, Section, Eyebrow } from '../saas/marketing/MarketingLayout';
import { useSeo } from '../../lib/seo';
import { saasApi } from '../../lib/saasApi';

// Live status: every row below is checked from this browser right now.
// No historical uptime figures are shown — they would need a real
// monitoring service (e.g. an external uptime checker) to be truthful.

type State = 'checking' | 'operational' | 'degraded' | 'down' | 'not_configured';

interface Check { name: string; detail: string; state: State; icon: React.ElementType }

const STYLE: Record<State, { label: string; cls: string; Icon: React.ElementType }> = {
  checking: { label: 'Checking…', cls: 'bg-slate-100 text-slate-600', Icon: Loader2 },
  operational: { label: 'Operational', cls: 'bg-emerald-50 text-emerald-700', Icon: CheckCircle2 },
  degraded: { label: 'Slow response', cls: 'bg-amber-50 text-amber-800', Icon: AlertTriangle },
  down: { label: 'Unavailable', cls: 'bg-red-50 text-red-700', Icon: XCircle },
  not_configured: { label: 'Not yet enabled', cls: 'bg-slate-100 text-slate-600', Icon: AlertTriangle },
};

export const StatusPage: React.FC = () => {
  useSeo({
    title: 'System Status',
    description: 'Live status of the Task Pilot web app, API, database and billing services, checked from your browser.',
    path: '/status',
  });

  const [checks, setChecks] = useState<Check[]>([]);
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);
  const [busy, setBusy] = useState(false);

  const run = useCallback(async () => {
    setBusy(true);
    const web: Check = { name: 'Web application', detail: 'This page loaded and is running.', state: 'operational', icon: Globe };
    let api: Check = { name: 'API & database', detail: 'Checking…', state: 'checking', icon: Database };
    let billing: Check = { name: 'Online billing (Razorpay)', detail: 'Checking…', state: 'checking', icon: CreditCard };
    setChecks([web, api, billing]);
    const t0 = performance.now();
    try {
      const h = await saasApi<{ ok: boolean; db: string; latencyMs: number; payments: boolean }>('health', {}, { public: true });
      const rtt = Math.round(performance.now() - t0);
      api = {
        ...api,
        state: !h.ok ? 'down' : rtt > 4000 ? 'degraded' : 'operational',
        detail: h.ok ? `Responded in ${rtt} ms (database ${h.latencyMs} ms).` : `Database error: ${h.db}`,
      };
      billing = h.payments
        ? { ...billing, state: 'operational', detail: 'Payment gateway configured.' }
        : { ...billing, state: 'not_configured', detail: 'Plans can be activated by contacting sales.' };
    } catch (e: any) {
      api = { ...api, state: 'down', detail: e?.message ?? 'No response from the API.' };
      billing = { ...billing, state: 'down', detail: 'Depends on the API.' };
    }
    setChecks([web, api, billing]);
    setCheckedAt(new Date());
    setBusy(false);
  }, []);

  useEffect(() => { run(); }, [run]);

  const overall: State = checks.some((c) => c.state === 'checking') ? 'checking'
    : checks.some((c) => c.state === 'down') ? 'down'
    : checks.some((c) => c.state === 'degraded') ? 'degraded' : 'operational';
  const headline = { checking: 'Checking services…', operational: 'All core services are operational', degraded: 'Some services are responding slowly', down: 'Some services are unavailable', not_configured: '' }[overall];

  return (
    <MarketingLayout>
      <Section className="pt-16 pb-6 text-center max-w-3xl mx-auto">
        <Eyebrow>System status</Eyebrow>
        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Task Pilot status</h1>
        <p className="mt-3 text-slate-500 text-sm">Live checks run from your browser when this page opens.</p>
      </Section>

      <Section className="pb-20 max-w-3xl mx-auto space-y-6">
        <div role="status" aria-live="polite" className={`rounded-3xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${overall === 'down' ? 'border-red-200 bg-red-50/60' : overall === 'degraded' ? 'border-amber-200 bg-amber-50/60' : 'border-emerald-200 bg-emerald-50/60'}`}>
          <p className="font-bold text-slate-900 text-lg">{headline}</p>
          <button onClick={run} disabled={busy} className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:text-slate-900 disabled:opacity-60">
            <RefreshCw className={`w-4 h-4 ${busy ? 'animate-spin' : ''}`} aria-hidden />Check again
          </button>
        </div>

        <ul className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-sm">
          {checks.map((c) => {
            const st = STYLE[c.state];
            return (
              <li key={c.name} className="p-4 sm:px-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"><c.icon className="w-4 h-4" aria-hidden /></div>
                  <div className="min-w-0"><p className="text-sm font-semibold text-slate-900">{c.name}</p><p className="text-xs text-slate-500">{c.detail}</p></div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${st.cls}`}>
                  <st.Icon className={`w-3.5 h-3.5 ${c.state === 'checking' ? 'animate-spin' : ''}`} aria-hidden />{st.label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="text-xs text-slate-500 text-center">
          {checkedAt && <>Last checked {checkedAt.toLocaleTimeString()}. </>}
          Having trouble? <Link to="/contact-sales" className="underline">Contact us</Link> or open a ticket from Help &amp; Support inside the app.
        </p>
      </Section>
    </MarketingLayout>
  );
};

export default StatusPage;
