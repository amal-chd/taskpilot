import {
  getAnalytics,
  isSupported,
  logEvent,
  setUserId,
  setUserProperties,
  type Analytics,
} from 'firebase/analytics';
import { app } from '../firebase/config';

// Web product analytics via Firebase Analytics & DataLayer (GTM / GA4).
// In development, logs events to console for immediate verification.
let analytics: Analytics | null = null;

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/** Analytics runs only after the visitor accepts non-essential cookies (GDPR / ePrivacy). */
export const hasAnalyticsConsent = (): boolean => {
  try { return localStorage.getItem('taskpilot_cookie_consent') === 'all'; } catch { return false; }
};

export async function initAnalytics(): Promise<void> {
  if (analytics) return;
  if (!hasAnalyticsConsent()) return;
  if (!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) return;
  if (!import.meta.env.PROD) return;
  try {
    if (await isSupported()) analytics = getAnalytics(app);
  } catch {
    /* analytics unavailable in this environment — ignore */
  }
}

/** Log a generic product or marketing event */
export function track(event: string, params?: Record<string, unknown>): void {
  if (analytics) {
    logEvent(analytics, event, params as Record<string, unknown>);
  }

  // Push to GTM dataLayer if present (only with consent)
  if (typeof window !== 'undefined' && hasAnalyticsConsent()) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params, timestamp: new Date().toISOString() });
  }

  if (import.meta.env.DEV) {
    // console.debug(`[Analytics Event] ${event}`, params);
  }
}

/** Associate events with the signed-in user (id + role), or clear on logout. */
export function identify(
  user: { id: string; roleId?: string } | null,
): void {
  if (!analytics) return;
  setUserId(analytics, user?.id ?? null);
  if (user?.roleId) setUserProperties(analytics, { role: user.roleId });
}

// ─── High-Level Marketing & Conversion Tracking Helpers ───────────────────────

export function trackCtaClick(location: string, ctaText: string, targetUrl: string) {
  track('cta_click', {
    cta_location: location,
    cta_text: ctaText,
    target_url: targetUrl,
  });
}

export function trackPricingPlanView(planId: string, cycle: 'monthly' | 'yearly', currency: string) {
  track('view_pricing_plan', {
    plan_id: planId,
    billing_cycle: cycle,
    currency,
  });
}

export function trackCurrencySwitch(currency: string) {
  track('switch_currency', {
    currency,
  });
}

export function trackDemoRequestSubmit(details: { company?: string; teamSize?: string; interest?: string }) {
  track('submit_demo_request', {
    company: details.company,
    team_size: details.teamSize,
    interest: details.interest,
  });
}

export function trackFeatureClick(featureKey: string, sourcePage: string) {
  track('view_feature_detail', {
    feature_key: featureKey,
    source_page: sourcePage,
  });
}

export function trackComparisonClick(competitor: string) {
  track('view_competitor_comparison', {
    competitor,
  });
}

export function trackFaqExpand(question: string) {
  track('expand_faq', {
    faq_question: question,
  });
}

export function trackArticleRead(slug: string, title: string) {
  track('view_blog_article', {
    article_slug: slug,
    article_title: title,
  });
}
