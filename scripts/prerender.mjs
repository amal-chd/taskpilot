#!/usr/bin/env node
/**
 * Post-build prerender: writes dist/<route>/index.html for every public
 * marketing route with real HTML content and per-page <head> tags, plus a
 * generated sitemap.xml and robots.txt. Run after `vite build`.
 *
 *   SITE_URL / VITE_SITE_URL overrides the canonical origin.
 */
// Deterministic, international output: prices render in USD (the browser
// switches to the visitor's currency after load).
process.env.TZ = 'UTC';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrOut = path.join(root, 'node_modules/.prerender');

// 1. Build the Node renderer (Firebase swapped for a stub).
await build({
  configFile: false,
  root,
  logLevel: 'warn',
  plugins: [react()],
  define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(process.env.VITE_SITE_URL || process.env.SITE_URL || '') },
  resolve: {
    alias: [
      { find: /^.*\/firebase\/config(\.ts)?$/, replacement: path.join(root, 'src/prerender/firebase-stub.ts') },
      { find: '@', replacement: path.join(root, 'src') },
    ],
  },
  ssr: { noExternal: ['react-router-dom', 'react-router', 'lucide-react', 'react-hot-toast'] },
  build: { ssr: path.join(root, 'src/prerender/entry.tsx'), outDir: ssrOut, emptyOutDir: true, rollupOptions: { output: { format: 'esm', entryFileNames: 'entry.mjs' } } },
});

// Minimal browser globals some modules touch at import time.
globalThis.localStorage ??= { getItem: () => null, setItem: () => {}, removeItem: () => {} };

const { render, getRoutes, SITE_URL } = await import(pathToFileURL(path.join(ssrOut, 'entry.mjs')).href);
const origin = (process.env.VITE_SITE_URL || process.env.SITE_URL || SITE_URL).replace(/\/$/, '');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SITE = 'Task Pilot';

function headFor(seo, route) {
  const title = seo?.title ? (seo.title.includes(SITE) ? seo.title : `${seo.title} | ${SITE}`) : `${SITE}`;
  const desc = seo?.description ?? '';
  const url = `${origin}${seo?.path ?? route}`;
  const image = seo?.image ?? `${origin}/og-image.jpg`;
  const type = seo?.type ?? 'website';
  const lds = seo?.jsonLd ? (Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]) : [];
  return { title, desc, url, image, type, robots: seo?.robots ?? 'index, follow', lds };
}

function inject(html, h, body) {
  const setMeta = (src, attr, key, val) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
    const tag = `<meta ${attr}="${key}" content="${esc(val)}" />`;
    return re.test(src) ? src.replace(re, tag) : src.replace('</head>', `    ${tag}\n  </head>`);
  };
  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(h.title)}</title>`);
  out = setMeta(out, 'name', 'title', h.title);
  out = setMeta(out, 'name', 'description', h.desc);
  out = setMeta(out, 'name', 'robots', h.robots);
  out = setMeta(out, 'property', 'og:title', h.title);
  out = setMeta(out, 'property', 'og:description', h.desc);
  out = setMeta(out, 'property', 'og:url', h.url);
  out = setMeta(out, 'property', 'og:type', h.type);
  out = setMeta(out, 'property', 'og:image', h.image);
  out = setMeta(out, 'name', 'twitter:title', h.title);
  out = setMeta(out, 'name', 'twitter:description', h.desc);
  out = setMeta(out, 'name', 'twitter:url', h.url);
  out = setMeta(out, 'name', 'twitter:image', h.image);
  out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(h.url)}" />`);
  if (h.lds.length) {
    const ld = h.lds.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`).join('\n    ');
    out = out.replace('</head>', `    ${ld}\n  </head>`);
  }
  return out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const routes = getRoutes();
const today = new Date().toISOString().slice(0, 10);
let ok = 0;
const failures = [];
for (const r of routes) {
  try {
    const { html, seo } = await render(r.path);
    if (!html || html.length < 200) throw new Error('empty render');
    const page = inject(template, headFor(seo, r.path), html);
    const file = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path.slice(1), 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, page);
    // Also <route>.html so hosts with clean URLs (Vercel cleanUrls) serve
    // /pricing directly, without relying on directory-index resolution.
    if (r.path !== '/') await writeFile(path.join(dist, `${r.path.slice(1)}.html`), page);
    ok++;
  } catch (e) {
    failures.push(`${r.path}: ${e?.message ?? e}`);
  }
}

// SPA fallback for app routes keeps the empty shell (no marketing markup).
await writeFile(path.join(dist, '200.html'), template);

// sitemap.xml + robots.txt generated from the same route list.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((r) => !failures.some((f) => f.startsWith(`${r.path}:`)))
  .map((r) => `  <url><loc>${origin}${r.path === '/' ? '/' : r.path}</loc><lastmod>${(r.lastmod && !isNaN(Date.parse(r.lastmod)) ? new Date(r.lastmod).toISOString().slice(0, 10) : today)}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join('\n')}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /app/\nDisallow: /platform/\nDisallow: /invite/\nDisallow: /onboarding\nDisallow: /register\nDisallow: /login\n\nSitemap: ${origin}/sitemap.xml\n`);

await rm(ssrOut, { recursive: true, force: true });
console.log(`prerender: ${ok}/${routes.length} pages → dist/, sitemap with ${routes.length - failures.length} URLs (${origin})`);
if (failures.length) {
  console.error('prerender failures:\n  ' + failures.join('\n  '));
  process.exitCode = 1;
}
