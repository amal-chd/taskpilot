import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CreditCard, Download, Loader2, AlertTriangle, Printer, Check,
  ShieldCheck, Sparkles, Building2, ArrowRight, RefreshCw, X,
  Receipt, CheckCircle2, Info, ArrowUpRight, Lock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { saasApi, loadRazorpay, openRazorpayCheckout } from '../../lib/saasApi';
import { useTenantStore, formatMoney, trialDaysLeft, Plan, OrgContext } from '../../lib/tenant';
import { PricingCards } from './marketing/PricingPage';
import { useAuthStore } from '../../store/authStore';

const STATUS: Record<string, [string, string]> = {
  trialing: ['Free Trial', 'bg-indigo-50 text-indigo-700 border-indigo-200'],
  active: ['Active Subscription', 'bg-emerald-50 text-emerald-700 border-emerald-200'],
  past_due: ['Payment Overdue', 'bg-amber-50 text-amber-800 border-amber-200'],
  suspended: ['Workspace Suspended', 'bg-red-50 text-red-700 border-red-200'],
  cancelled: ['Cancelled', 'bg-slate-100 text-slate-700 border-slate-200'],
  expired: ['Trial Ended', 'bg-red-50 text-red-700 border-red-200'],
};

const Meter: React.FC<{ label: string; used: number; max: number | null; unit?: string }> = ({ label, used, max, unit = '' }) => {
  const pct = max ? Math.min(100, Math.round((used / max) * 100)) : 0;
  const isNearLimit = max !== null && pct >= 80;
  return (
    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600 font-medium">{label}</span>
        <span className="font-semibold text-slate-900">
          {used}{unit ? ` ${unit}` : ''}
          {max !== null ? ` / ${max}${unit ? ` ${unit}` : ''}` : ' · Unlimited'}
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-amber-500' : 'bg-slate-900'
          }`}
          style={{ width: max ? `${pct}%` : '4%' }}
        />
      </div>
      {isNearLimit && (
        <p className="text-[11px] font-medium text-amber-700 mt-1.5 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> Nearing capacity ({pct}%)
        </p>
      )}
    </div>
  );
};

async function refreshContext() {
  const ctx = await saasApi<OrgContext>('org_context');
  useTenantStore.getState().setContext(ctx);
  return ctx;
}

const BillingPage: React.FC = () => {
  const ctx = useTenantStore((s) => s.context);
  const { appUser } = useAuthStore();
  const [busy, setBusy] = useState<string | null>(null);
  const [payments, setPayments] = useState<any[] | null>(null);

  // Upgrade Modal State
  const [selectedPlan, setSelectedPlan] = useState<{ plan: Plan; cycle: 'monthly' | 'yearly' } | null>(null);
  const [paymentMethodChoice, setPaymentMethodChoice] = useState<'subscription' | 'order'>('subscription');
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);

  // Billing & GST Details form state
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [billingForm, setBillingForm] = useState({
    legalName: '',
    gstin: '',
    address: '',
    billingEmail: '',
    phone: '',
  });
  const [savingBilling, setSavingBilling] = useState(false);

  useEffect(() => {
    refreshContext().catch(() => {});
    saasApi<{ payments: any[] }>('list_payments')
      .then((r) => setPayments(r.payments))
      .catch(() => setPayments([]));
  }, []);

  useEffect(() => {
    if (ctx?.org) {
      const b = (ctx.org.settings?.billing as any) || {};
      setBillingForm({
        legalName: b.legal_name || ctx.org.name || '',
        gstin: b.tax_id || ctx.org.tax_id || '',
        address: b.address || ctx.org.address || '',
        billingEmail: b.billing_email || ctx.org.email || appUser?.email || '',
        phone: b.phone || ctx.org.phone || '',
      });
    }
  }, [ctx, appUser]);

  if (!ctx) {
    return (
      <div className="p-16 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        <p className="text-sm text-slate-500 font-medium">Loading billing details…</p>
      </div>
    );
  }

  const { org, plan, subscription, usage, limits } = ctx;
  const isLegacyOrg = Boolean(org.is_legacy);

  // Save Company Billing & GST Details
  const handleSaveBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBilling(true);
    try {
      await saasApi('update_billing_details', {
        legalName: billingForm.legalName,
        taxId: billingForm.gstin,
        address: billingForm.address,
        billingEmail: billingForm.billingEmail,
        phone: billingForm.phone,
      });
      toast.success('Invoicing details saved successfully');
      setIsEditingBilling(false);
      await refreshContext();
    } catch (e: any) {
      toast.error(e.message || 'Failed to save billing details');
    } finally {
      setSavingBilling(false);
    }
  };

  // Select a plan from pricing cards -> Open Upgrade Modal
  const onSelectPlan = (p: Plan, cycle: 'monthly' | 'yearly') => {
    setSelectedPlan({ plan: p, cycle });
  };

  // Perform Upgrade (either through real Razorpay or simulation)
  const executeUpgrade = async () => {
    if (!selectedPlan) return;
    const { plan: p, cycle } = selectedPlan;
    setIsProcessingUpgrade(true);

    try {
      // 1. If user chose Direct Period Payment (Razorpay Order)
      if (paymentMethodChoice === 'order') {
        const orderRes = await saasApi<any>('create_payment_order', {
          planId: p.id,
          billingCycle: cycle,
          allowLegacy: isLegacyOrg,
          simulate: !ctx.razorpayKeyId,
        });

        if (orderRes.simulated) {
          toast.success(`Upgraded to ${p.name} plan! (Sandbox verified)`);
          setSelectedPlan(null);
          await refreshContext();
          saasApi<{ payments: any[] }>('list_payments').then((x) => setPayments(x.payments));
          return;
        }

        // Real Razorpay Order Checkout
        const paymentRes = await openRazorpayCheckout({
          key: orderRes.keyId,
          order_id: orderRes.orderId,
          amount: orderRes.amount,
          currency: orderRes.currency,
          name: 'Task Pilot',
          description: `${orderRes.planName} plan (${cycle})`,
          image: `${window.location.origin}/logo.png`,
          prefill: {
            email: orderRes.email,
            name: appUser?.name,
            contact: org.phone ?? undefined,
          },
          notes: { org_id: org.id, plan_id: p.id, cycle },
          theme: { color: '#0F172A' },
        });

        await saasApi('verify_order_payment', {
          ...paymentRes,
          planId: p.id,
          billingCycle: cycle,
        });

        toast.success(`Successfully activated ${p.name} plan!`);
        setSelectedPlan(null);
        await refreshContext();
        saasApi<{ payments: any[] }>('list_payments').then((x) => setPayments(x.payments));
        return;
      }

      // 2. Default: Recurring Subscription (UPI AutoPay / e-Mandate)
      const r = await saasApi<any>('create_subscription', {
        planId: p.id,
        billingCycle: cycle,
        allowLegacy: isLegacyOrg,
        simulate: !ctx.razorpayKeyId,
      });

      if (r.simulated) {
        toast.success(`Upgraded to ${p.name} plan! (Sandbox verified)`);
        setSelectedPlan(null);
        await refreshContext();
        saasApi<{ payments: any[] }>('list_payments').then((x) => setPayments(x.payments));
        return;
      }

      if (r.changed) {
        toast.success(
          r.effective === 'now'
            ? `Upgraded to ${p.name}!`
            : `${p.name} will start at your next renewal`
        );
        setSelectedPlan(null);
        await refreshContext();
        return;
      }

      // Real Razorpay Subscription Checkout
      const paymentRes = await openRazorpayCheckout({
        key: r.keyId,
        subscription_id: r.subscriptionId,
        name: 'Task Pilot',
        description: `${r.planName} plan (${cycle})`,
        image: `${window.location.origin}/logo.png`,
        prefill: {
          email: r.email,
          name: appUser?.name,
          contact: org.phone ?? undefined,
        },
        notes: { org_id: org.id },
        theme: { color: '#0F172A' },
      });

      await saasApi('verify_payment', paymentRes);
      toast.success('Subscription activated — thank you!');
      setSelectedPlan(null);
      await refreshContext();
      saasApi<{ payments: any[] }>('list_payments').then((x) => setPayments(x.payments));
    } catch (e: any) {
      if (e.message !== 'Payment window closed') {
        toast.error(e.message || 'Payment could not be completed');
      }
    } finally {
      setIsProcessingUpgrade(false);
    }
  };

  // Cancel subscription
  const cancel = async () => {
    if (
      !window.confirm(
        'Cancel your subscription? Your workspace stays active until the end of the current billing period, then becomes read-only. Your data is kept 100% safe.'
      )
    )
      return;
    setBusy('cancel');
    try {
      await saasApi('cancel_subscription', {});
      toast.success('Subscription will end at the close of this billing period');
      await refreshContext();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(null);
    }
  };

  // Resume subscription if scheduled to cancel
  const resume = async () => {
    setBusy('resume');
    try {
      await saasApi('resume_subscription', {});
      toast.success('Subscription auto-renewal restored!');
      await refreshContext();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(null);
    }
  };

  const [statusLabel, statusClass] = STATUS[org.status] ?? [org.status, 'bg-slate-100 border-slate-200'];
  const days = trialDaysLeft(org);
  const live = subscription && ['active', 'authenticated'].includes(subscription.status);

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Plan & Billing</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your subscription, team licenses, usage quotas, and GST tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {ctx.razorpayKeyId ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Razorpay Secured Checkout
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              Razorpay Sandbox / Test Mode
            </div>
          )}
        </div>
      </div>

      {/* Legacy Enterprise Notice */}
      {isLegacyOrg && (
        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-950">Grandfathered Enterprise Agreement</p>
              <p className="text-xs text-indigo-700 mt-0.5">
                {org.name} is configured on an internal enterprise licence with all modules enabled. You can also preview self-serve plans and test Razorpay payment flows below.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current Plan Overview & Usage Meters */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Active Subscription details */}
        <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Plan</span>
              <div className="flex items-center gap-3 mt-1">
                <h2 className="text-2xl font-black text-slate-900">{plan?.name ?? 'No Plan'}</h2>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusClass}`}>
                  {statusLabel}
                </span>
                {subscription?.cancel_at_period_end && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Cancels at period end
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              {plan && !plan.is_custom_pricing ? (
                <div>
                  <p className="text-xl font-extrabold text-slate-900">
                    {formatMoney(
                      org.billing_cycle === 'yearly' ? plan.price_yearly : plan.price_monthly,
                      plan.currency
                    )}
                    <span className="text-xs font-normal text-slate-500">
                      {' '}/ {org.billing_cycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">Billed {org.billing_cycle} · incl. GST</p>
                </div>
              ) : (
                <span className="text-sm font-bold text-slate-600">Enterprise Agreement</span>
              )}
            </div>
          </div>

          {/* Status notices */}
          {org.status === 'trialing' && days !== null && (
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between gap-4">
              <div className="text-xs text-indigo-900">
                <p className="font-bold text-sm">
                  {days === 0 ? 'Trial ends today' : `${days} day${days === 1 ? '' : 's'} left in your free trial`}
                </p>
                <p className="mt-0.5 text-indigo-700">
                  Ends on {org.trial_ends_at ? new Date(org.trial_ends_at).toLocaleDateString() : 'N/A'}. Upgrade to an active plan to avoid any work interruption.
                </p>
              </div>
              <a
                href="#choose-plan"
                className="shrink-0 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-indigo-700 transition"
              >
                Choose Plan
              </a>
            </div>
          )}

          {org.status === 'past_due' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Payment overdue</p>
                <p className="mt-0.5">
                  Your last automatic renewal could not be processed. Razorpay retries automatically, or you can update your card/UPI mandate by selecting your plan again below.
                </p>
              </div>
            </div>
          )}

          {subscription?.cancel_at_period_end && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-700">
                <p className="font-bold text-slate-900">Auto-renewal is paused</p>
                <p className="mt-0.5">
                  Workspace remains active until {subscription.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'cycle end'}.
                </p>
              </div>
              <button
                onClick={resume}
                disabled={busy === 'resume'}
                className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 disabled:opacity-60"
              >
                {busy === 'resume' ? 'Resuming…' : 'Resume Auto-renewal'}
              </button>
            </div>
          )}

          {/* Usage Quotas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Resource Allocation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Meter label="Team Members" used={usage.users + usage.pending_invites} max={limits.max_users} />
              <Meter label="Active Projects" used={usage.projects} max={limits.max_projects} />
            </div>
          </div>

          {/* Cancel button */}
          {live && !subscription?.cancel_at_period_end && !isLegacyOrg && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={cancel}
                disabled={busy === 'cancel'}
                className="text-xs text-red-600 font-semibold hover:text-red-700 underline disabled:opacity-50"
              >
                Cancel auto-renewal
              </button>
            </div>
          )}
        </section>

        {/* Right: Payment Gateway & Quick Info */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-700" /> Payment Processing
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Payments are collected securely via <strong>Razorpay</strong>. We support UPI AutoPay, Google Pay, PhonePe, all Indian Credit & Debit Cards, and NetBanking.
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Billing Interval:</span>
                <span className="font-semibold capitalize text-slate-900">{org.billing_cycle}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax Rates:</span>
                <span className="font-semibold text-slate-900">18% (CGST 9% + SGST 9%)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Renewal Date:</span>
                <span className="font-semibold text-slate-900">
                  {subscription?.current_period_end
                    ? new Date(subscription.current_period_end).toLocaleDateString()
                    : org.trial_ends_at
                    ? new Date(org.trial_ends_at).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Need assistance with corporate billing or wire transfers?
            </p>
            <Link to="/app/support" className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:underline mt-1">
              Contact Enterprise Support <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      </div>

      {/* Company Billing & GST Information Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Company & GST Invoicing Details</h2>
              <p className="text-xs text-slate-500">
                These details are printed on all official GST tax invoices for claiming Input Tax Credit (ITC).
              </p>
            </div>
          </div>

          {!isEditingBilling && (
            <button
              onClick={() => setIsEditingBilling(true)}
              className="h-8 px-3 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50 transition"
            >
              Edit Details
            </button>
          )}
        </div>

        {isEditingBilling ? (
          <form onSubmit={handleSaveBilling} className="mt-5 space-y-4 max-w-3xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-xs font-semibold text-slate-700">
                Legal Registered Company Name
                <input
                  required
                  type="text"
                  value={billingForm.legalName}
                  onChange={(e) => setBillingForm({ ...billingForm, legalName: e.target.value })}
                  placeholder="e.g. Acme Constructions Pvt. Ltd."
                  className="mt-1 h-9 px-3 w-full rounded-lg border border-slate-300 text-sm focus:border-slate-900 focus:outline-none"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                GSTIN / Tax ID
                <input
                  type="text"
                  maxLength={15}
                  value={billingForm.gstin}
                  onChange={(e) => setBillingForm({ ...billingForm, gstin: e.target.value.toUpperCase() })}
                  placeholder="e.g. 29AAAAA0000A1Z5"
                  className="mt-1 h-9 px-3 w-full rounded-lg border border-slate-300 text-sm font-mono focus:border-slate-900 focus:outline-none uppercase"
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block text-xs font-semibold text-slate-700">
                Billing Contact Email
                <input
                  type="email"
                  value={billingForm.billingEmail}
                  onChange={(e) => setBillingForm({ ...billingForm, billingEmail: e.target.value })}
                  placeholder="accounts@company.com"
                  className="mt-1 h-9 px-3 w-full rounded-lg border border-slate-300 text-sm focus:border-slate-900 focus:outline-none"
                />
              </label>

              <label className="block text-xs font-semibold text-slate-700">
                Contact Phone
                <input
                  type="tel"
                  value={billingForm.phone}
                  onChange={(e) => setBillingForm({ ...billingForm, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-1 h-9 px-3 w-full rounded-lg border border-slate-300 text-sm focus:border-slate-900 focus:outline-none"
                />
              </label>
            </div>

            <label className="block text-xs font-semibold text-slate-700">
              Registered Billing Address
              <textarea
                rows={2}
                value={billingForm.address}
                onChange={(e) => setBillingForm({ ...billingForm, address: e.target.value })}
                placeholder="Suite, Building, Street, City, State, PIN code"
                className="mt-1 px-3 py-2 w-full rounded-lg border border-slate-300 text-sm focus:border-slate-900 focus:outline-none"
              />
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={savingBilling}
                className="h-9 px-4 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-60 transition"
              >
                {savingBilling ? 'Saving…' : 'Save Invoicing Details'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditingBilling(false)}
                className="h-9 px-4 rounded-lg border border-slate-300 text-xs font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-5 grid sm:grid-cols-3 gap-6 text-xs">
            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider">Billed To</p>
              <p className="text-slate-900 font-bold text-sm mt-1">{billingForm.legalName || org.name}</p>
              <p className="text-slate-500 mt-1 whitespace-pre-line">{billingForm.address || 'No billing address provided yet'}</p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider">GSTIN / Tax ID</p>
              <p className="text-slate-900 font-mono font-bold text-sm mt-1">
                {billingForm.gstin || 'Not registered / Unregistered'}
              </p>
              <p className="text-slate-400 mt-1">Used for B2B input tax credit in GSTR-2B</p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold uppercase tracking-wider">Invoicing Contact</p>
              <p className="text-slate-900 font-semibold text-sm mt-1">{billingForm.billingEmail || org.email}</p>
              <p className="text-slate-500 mt-1">{billingForm.phone || 'Phone not set'}</p>
            </div>
          </div>
        )}
      </section>

      {/* Plan Selector & Upgrade Section */}
      <section id="choose-plan" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {live ? 'Change or Upgrade Your Plan' : 'Select a Subscription Plan'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant activation. Upgrade anytime with prorated billing. No long-term lock-in.
            </p>
          </div>
        </div>

        <PricingCards
          onSelect={onSelectPlan}
          currentPlanId={live ? plan?.id : null}
          busyPlanId={busy}
        />
      </section>

      {/* Invoices History Table */}
      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-slate-700" />
            <h2 className="font-bold text-base text-slate-900">Billing History & Invoices</h2>
          </div>
          <span className="text-xs text-slate-400">GST Tax Invoices</span>
        </div>

        {payments === null ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            <p className="font-medium">No payment history yet.</p>
            <p className="text-xs text-slate-400 mt-1">
              Your invoices and official GST tax receipts will appear here automatically upon payment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[620px]">
              <thead className="bg-slate-50 text-slate-500 text-left text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">Invoice #</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5 text-right">Amount</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 pr-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5 pl-5 font-mono text-xs font-bold text-slate-900">
                      {p.invoice_number}
                    </td>
                    <td className="p-3.5 text-slate-600 text-xs">
                      {new Date(p.paid_at ?? p.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-slate-800 text-xs font-medium">
                      {p.description}
                    </td>
                    <td className="p-3.5 text-right font-bold text-slate-900 text-xs">
                      {formatMoney(p.amount, p.currency)}
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 capitalize">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <Link
                        to={`/app/billing/invoice/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white shadow-2xs transition"
                      >
                        <Download className="w-3.5 h-3.5" /> Tax Invoice
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Plan Upgrade & Razorpay Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Upgrade to {selectedPlan.plan.name} Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Confirm your billing cycle and payment method.
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Selected Plan:</span>
                <span className="font-bold text-slate-900">{selectedPlan.plan.name}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Billing Cycle:</span>
                <span className="font-bold text-slate-900 capitalize">
                  {selectedPlan.cycle} {selectedPlan.cycle === 'yearly' && '(2 months free)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Users Included:</span>
                <span className="font-semibold text-slate-900">
                  {selectedPlan.plan.max_users ? `Up to ${selectedPlan.plan.max_users} members` : 'Unlimited'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Projects Included:</span>
                <span className="font-semibold text-slate-900">
                  {selectedPlan.plan.max_projects ? `Up to ${selectedPlan.plan.max_projects} projects` : 'Unlimited'}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm">
                <span className="font-bold text-slate-900">Total Payable:</span>
                <span className="font-black text-slate-900 text-base">
                  {formatMoney(
                    selectedPlan.cycle === 'yearly'
                      ? selectedPlan.plan.price_yearly
                      : selectedPlan.plan.price_monthly,
                    selectedPlan.plan.currency
                  )}
                  <span className="text-xs font-normal text-slate-500"> incl. GST</span>
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-bold text-slate-700">Payment Collection Method:</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethodChoice('subscription')}
                  className={`p-3 rounded-xl border text-left transition ${
                    paymentMethodChoice === 'subscription'
                      ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">Auto-Debit</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">UPI AutoPay / e-Mandate</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethodChoice('order')}
                  className={`p-3 rounded-xl border text-left transition ${
                    paymentMethodChoice === 'order'
                      ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">One-Time Pay</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instant UPI QR / NetBanking</p>
                </button>
              </div>
            </div>

            {/* Sandbox Notice if Key not configured */}
            {!ctx.razorpayKeyId && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <p className="font-bold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-700" /> Razorpay Test Simulation
                </p>
                <p className="mt-0.5 text-amber-800">
                  Razorpay API keys will be configured. Clicking below will simulate the complete upgrade flow, update quotas, and issue a valid test GST tax invoice.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={executeUpgrade}
                disabled={isProcessingUpgrade}
                className="flex-1 h-11 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-60 flex items-center justify-center gap-2 transition"
              >
                {isProcessingUpgrade ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                  </>
                ) : ctx.razorpayKeyId ? (
                  `Pay with Razorpay`
                ) : (
                  `Confirm & Activate Plan`
                )}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="h-11 px-5 rounded-xl border border-slate-300 text-sm font-semibold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Official GST Tax Invoice Page ──────────────────────────────────────────
export const InvoicePage: React.FC = () => {
  const { id } = useParams();
  const ctx = useTenantStore((s) => s.context);
  const [data, setData] = useState<{ payments: any[]; seller: any } | null>(null);

  useEffect(() => {
    saasApi<{ payments: any[]; seller: any }>('list_payments')
      .then(setData)
      .catch((e) => toast.error(e.message));
  }, []);

  const p = data?.payments.find((x) => x.id === id);

  if (!data) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!p) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p className="font-bold text-lg">Invoice Not Found</p>
        <Link to="/app/billing" className="mt-3 inline-block text-sm font-semibold underline">
          &larr; Back to Billing
        </Link>
      </div>
    );
  }

  const net = p.amount - p.tax_amount;
  const halfTax = Math.round(p.tax_amount / 2);
  const b = p.billing_details ?? {};

  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-4 print:hidden">
        <Link
          to="/app/billing"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          &larr; Back to Invoices
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm print:border-0 print:p-0 print:shadow-none">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2.5 font-black text-xl text-slate-900">
              <img width={512} height={512} decoding="async" src="/logo.png" alt="" className="w-9 h-9 rounded-lg" />
              {data.seller.seller_name || 'Thekada Digital Ventures Pvt. Ltd.'}
            </div>
            <p className="text-xs text-slate-500 mt-1">Task Pilot Enterprise Construction Cloud</p>
            {data.seller.seller_gstin && (
              <p className="text-xs text-slate-700 mt-0.5 font-medium">
                GSTIN / Tax ID: <span className="font-mono font-bold">{data.seller.seller_gstin}</span>
              </p>
            )}
            <p className="text-xs text-slate-500 mt-0.5">Kerala, India · SAC Code: 998314 (Information Technology Software Services)</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
              Tax Invoice (Paid)
            </span>
            <p className="text-sm font-mono font-bold text-slate-900">{p.invoice_number}</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Invoice Date: {new Date(p.paid_at ?? p.created_at).toLocaleDateString()}
            </p>
          </div>
        </header>

        {/* Customer Information */}
        <section className="grid sm:grid-cols-2 gap-6 py-6 border-b border-slate-100 text-xs">
          <div>
            <p className="text-slate-400 font-semibold uppercase tracking-wider">Billed To (Customer)</p>
            <p className="font-bold text-slate-900 text-sm mt-1">{b.name ?? ctx?.org.name}</p>
            {b.address && <p className="text-slate-600 mt-1 whitespace-pre-line leading-relaxed">{b.address}</p>}
            {b.tax_id && (
              <p className="text-slate-800 font-medium mt-1">
                Customer GSTIN / Tax ID: <span className="font-mono font-bold">{b.tax_id}</span>
              </p>
            )}
            {b.email && <p className="text-slate-500 mt-0.5">{b.email}</p>}
          </div>

          <div className="sm:text-right">
            <p className="text-slate-400 font-semibold uppercase tracking-wider">Payment Details</p>
            <p className="font-semibold text-slate-900 text-xs mt-1">Provider: Razorpay Gateway</p>
            {p.provider_payment_id && (
              <p className="font-mono text-slate-600 text-xs mt-0.5">
                Ref ID: {p.provider_payment_id}
              </p>
            )}
            <p className="text-slate-500 text-xs mt-0.5 capitalize">Method: {b.method || 'Online Mandate / UPI'}</p>
          </div>
        </section>

        {/* Line Items */}
        <table className="w-full mt-6 text-xs">
          <thead className="border-b border-slate-200 text-left text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-2.5">Item Description</th>
              <th className="py-2.5 text-center">SAC Code</th>
              <th className="py-2.5 text-right">Taxable Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4">
                <span className="font-bold text-slate-900 text-sm block">{p.description}</span>
                {p.period_start && (
                  <span className="text-slate-500 text-xs mt-0.5 block">
                    Coverage: {new Date(p.period_start).toLocaleDateString()} &ndash;{' '}
                    {p.period_end ? new Date(p.period_end).toLocaleDateString() : 'Active'}
                  </span>
                )}
              </td>
              <td className="py-4 text-center font-mono text-slate-600">998314</td>
              <td className="py-4 text-right font-bold text-slate-900 text-sm">
                {formatMoney(net, p.currency)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Tax Breakdown */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end">
          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Value:</span>
              <span className="font-semibold text-slate-900">{formatMoney(net, p.currency)}</span>
            </div>

            {p.currency === 'INR' ? (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>Central GST (CGST 9%):</span>
                  <span className="font-semibold text-slate-900">{formatMoney(halfTax, p.currency)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>State GST (SGST 9%):</span>
                  <span className="font-semibold text-slate-900">{formatMoney(p.tax_amount - halfTax, p.currency)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-slate-600">
                <span>Applicable VAT / Tax:</span>
                <span className="font-semibold text-slate-900">{formatMoney(p.tax_amount, p.currency)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-300 flex justify-between text-sm">
              <span className="font-black text-slate-900">Total Paid:</span>
              <span className="font-black text-slate-900 text-base">{formatMoney(p.amount, p.currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between gap-3">
          <p>This is a computer-generated GST tax invoice. No physical signature is required.</p>
          <p className="font-mono">Transaction ID: {p.provider_payment_id || 'N/A'}</p>
        </footer>
      </article>
    </div>
  );
};

export default BillingPage;
