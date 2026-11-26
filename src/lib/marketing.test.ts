import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { FEATURE_DETAILS } from '../pages/saas/marketing/features/featureDetailsData';
import { COMPETITORS } from '../pages/saas/marketing/compare/comparisonData';
import { BLOG_POSTS } from '../pages/saas/marketing/resources/blogData';
import { detectLocalCurrency, PLAN_PRICES, CURRENCY_OPTIONS } from '../pages/saas/marketing/PricingPage';

describe('SiteCommons Marketing & Acquisition Engine', () => {
  describe('Feature Detail Pages Configuration', () => {
    it('contains all 10 core feature landing pages with rich content', () => {
      const keys = Object.keys(FEATURE_DETAILS);
      expect(keys.length).toBe(10);
      expect(keys).toContain('task-management');
      expect(keys).toContain('gps-attendance');
      expect(keys).toContain('daily-site-diary');
      expect(keys).toContain('boq-cost-control');
      expect(keys).toContain('materials-inventory');
      expect(keys).toContain('inspections-punch-lists');
      expect(keys).toContain('gantt-timeline');
      expect(keys).toContain('document-control');
      expect(keys).toContain('site-chat');
      expect(keys).toContain('equipment-tracking');
    });

    it('ensures every feature has complete SEO metadata, pain points, and FAQs', () => {
      Object.values(FEATURE_DETAILS).forEach((feat) => {
        expect(feat.slug).toBeTruthy();
        expect(feat.title).toBeTruthy();
        expect(feat.seoTitle).toContain('SiteCommons');
        expect(feat.seoDescription.length).toBeGreaterThan(30);
        expect(feat.painPoints.length).toBeGreaterThanOrEqual(3);
        expect(feat.solutions.length).toBeGreaterThanOrEqual(3);
        expect(feat.workflowSteps.length).toBe(4);
        expect(feat.roleBenefits.length).toBeGreaterThanOrEqual(3);
        expect(feat.faqs.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('ensures every feature has a valid high-resolution screenshot and caption configured', () => {
      Object.values(FEATURE_DETAILS).forEach((feat) => {
        expect(feat.screenshot).toBeTruthy();
        expect(feat.screenshot).toMatch(/^\/images\/screenshots\/[a-z0-9-]+\.webp$/);
        expect(existsSync(`public${feat.screenshot}`)).toBe(true);
        expect(feat.screenshotBadge).toBeTruthy();
        expect(feat.screenshotCaption).toBeTruthy();
        expect(['desktop', 'mobile']).toContain(feat.screenshotDevice);
      });
    });
  });

  describe('Competitor Intelligence & Comparison Pages', () => {
    it('contains verified comparisons against all target competitor segments', () => {
      const keys = Object.keys(COMPETITORS);
      expect(keys).toContain('sitecommons-vs-procore');
      expect(keys).toContain('sitecommons-vs-fieldwire');
      expect(keys).toContain('sitecommons-vs-asana');
      expect(keys).toContain('sitecommons-vs-monday');
      expect(keys).toContain('sitecommons-vs-clickup');
      expect(keys).toContain('sitecommons-vs-powerplay');
    });

    it('ensures each competitor comparison has balanced analysis and clear pricing contrast', () => {
      Object.values(COMPETITORS).forEach((comp) => {
        expect(comp.competitorName).toBeTruthy();
        expect(comp.pricingComparison.competitorModel).toBeTruthy();
        expect(comp.pricingComparison.taskPilotModel).toBeTruthy();
        expect(comp.matrix.length).toBeGreaterThanOrEqual(5);
        expect(comp.competitorStrengths.length).toBeGreaterThanOrEqual(2);
        expect(comp.competitorLimitations.length).toBeGreaterThanOrEqual(2);
        expect(comp.taskPilotStrengths.length).toBeGreaterThanOrEqual(2);
        expect(comp.verdict).toBeTruthy();
      });
    });
  });

  describe('Content Marketing & SEO Blog Articles', () => {
    it('contains authoritative guides with complete body content and author attribution', () => {
      expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(6);
      BLOG_POSTS.forEach((post) => {
        expect(post.slug).toBeTruthy();
        expect(post.title).toBeTruthy();
        expect(post.summary).toBeTruthy();
        expect(post.author.name).toBeTruthy();
        expect(post.author.role).toBeTruthy();
        expect(post.content.intro).toBeTruthy();
        expect(post.content.sections.length).toBeGreaterThanOrEqual(2);
        expect(post.content.conclusion).toBeTruthy();
      });
    });
  });

  describe('Multi-Currency & Global Billing Localization', () => {
    it('supports all primary global contractor currencies', () => {
      const supportedCodes = CURRENCY_OPTIONS.map((c) => c.code);
      expect(supportedCodes).toContain('USD');
      expect(supportedCodes).toContain('INR');
      expect(supportedCodes).toContain('EUR');
      expect(supportedCodes).toContain('GBP');
      expect(supportedCodes).toContain('AED');
      expect(supportedCodes).toContain('CAD');
      expect(supportedCodes).toContain('AUD');
    });

    it('detects a fallback currency safely', () => {
      const detected = detectLocalCurrency();
      expect(['USD', 'INR', 'EUR', 'GBP', 'AED', 'CAD', 'AUD']).toContain(detected);
    });

    it('defines prices for all plan tiers across all currencies', () => {
      ['starter', 'professional', 'business'].forEach((planKey) => {
        CURRENCY_OPTIONS.forEach((curr) => {
          const planData = PLAN_PRICES[planKey][curr.code];
          expect(planData).toBeDefined();
          expect(planData.monthly).toBeGreaterThan(0);
          expect(planData.yearly).toBeGreaterThan(0);
        });
      });
    });
  });
});
