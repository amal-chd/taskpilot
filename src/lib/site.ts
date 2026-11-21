// Single source of truth for public URLs and contact addresses.
// Override the URL per deployment with VITE_SITE_URL.
export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) || 'https://taskpilot.thekada.in').replace(/\/$/, '');

// Single public mailbox (Hostinger, thekada.in) for sales, support, legal and security.
export const CONTACT = {
  sales: 'info@thekada.in',
  support: 'info@thekada.in',
  legal: 'info@thekada.in',
  security: 'info@thekada.in',
} as const;

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
