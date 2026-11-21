import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, CheckCircle2, ArrowRight,
  CheckSquare, MapPin, BookOpen, Calculator, Boxes,
  ClipboardCheck, GanttChart, FileText, MessageSquare, Truck,
  HardHat, Building2, Paintbrush, Route, Wrench, Briefcase,
  Scale, HelpCircle, ShieldCheck
} from 'lucide-react';
import { INDUSTRIES } from './content';
import { CookieConsent } from '../../../components/common/CookieConsent';
import { trackCtaClick } from '../../../lib/analytics';

export const SAAS_HOME = '/';

const FEATURE_LINKS = [
  { to: '/features/task-management', label: 'Tasks & 3-Step Verification', desc: 'Enforce engineer sign-offs with photo proof', icon: CheckSquare },
  { to: '/features/gps-attendance', label: 'GPS Geofenced Attendance', desc: 'Tamper-proof mobile check-in with perimeter lock', icon: MapPin },
  { to: '/features/daily-site-diary', label: 'Daily Site Diary (DPR)', desc: 'Weather, trade musters, machinery and PDF exports', icon: BookOpen },
  { to: '/features/boq-cost-control', label: 'BOQ & Earned Value (EVM)', desc: 'Real-time Cost Performance Index (CPI) tracking', icon: Calculator },
  { to: '/features/materials-inventory', label: 'Materials & Gate Passes', desc: 'Stock registers, requisitions, and Goods Receipt Notes', icon: Boxes },
  { to: '/features/inspections-punch-lists', label: 'Inspections & Punch Lists', desc: 'Pre-pour concrete checklists and snag resolution', icon: ClipboardCheck },
  { to: '/features/gantt-timeline', label: 'Gantt Timeline & Schedule', desc: 'Visual task dependencies and milestone tracking', icon: GanttChart },
  { to: '/features/document-control', label: 'Blueprints & Drawing Revisions', desc: 'High-res mobile drawing viewer with version control', icon: FileText },
  { to: '/features/site-chat', label: 'Site Channels & @Role Chat', desc: 'Direct communications with @SiteEngineer mentions', icon: MessageSquare },
  { to: '/features/equipment-tracking', label: 'Plant & Equipment Tracking', desc: 'Machinery allocation, hours, and maintenance logs', icon: Truck },
];

const SECTOR_LINKS = [
  { to: '/industries/construction', label: 'General Contractors & Civil Builders', desc: 'Pre-pour hold points, concrete pours, and trade muster', icon: HardHat },
  { to: '/industries/real-estate', label: 'Real Estate Developers', desc: 'Multi-site portfolio dashboards and investor progress packs', icon: Building2 },
  { to: '/industries/interiors', label: 'Interior Fit-Out Contractors', desc: 'Room-by-room snag lists and blueprint revision control', icon: Paintbrush },
  { to: '/industries/infrastructure', label: 'Infrastructure & EPC Contractors', desc: 'Linear chainage logs, heavy machinery, and HSE audits', icon: Route },
  { to: '/industries/facility-management', label: 'Facility Management & Operations', desc: 'Preventive maintenance checklists and SLA ticketing', icon: Wrench },
  { to: '/industries/project-management', label: 'PMC & Engineering Consultants', desc: 'Independent quality hold points and client reports', icon: Briefcase },
];

const COMPARE_LINKS = [
  { to: '/compare/taskpilot-vs-procore', label: 'Task Pilot vs Procore', desc: 'Agile field OS vs enterprise megasuite' },
  { to: '/compare/taskpilot-vs-fieldwire', label: 'Task Pilot vs Fieldwire', desc: 'Flat team pricing vs per-seat tax' },
  { to: '/compare/taskpilot-vs-asana', label: 'Task Pilot vs Asana', desc: 'Field-tested ruggedness vs desk to-dos' },
  { to: '/compare/taskpilot-vs-monday', label: 'Task Pilot vs Monday.com', desc: 'Pre-built construction OS vs spreadsheet setup' },
  { to: '/compare/taskpilot-vs-clickup', label: 'Task Pilot vs ClickUp', desc: 'Fast jobsite simplicity vs feature bloat' },
  { to: '/compare/taskpilot-vs-powerplay', label: 'Task Pilot vs Powerplay', desc: 'Enterprise office-and-field vs mobile chat app' },
  { to: '/compare/best-construction-management-software', label: '2026 Construction Software Guide', desc: 'Comprehensive buyer evaluation framework' },
];

const RESOURCE_LINKS = [
  { to: '/blog', label: 'Field Guides & Blog', desc: 'Practical engineering and site management articles' },
  { to: '/how-it-works', label: 'How Task Pilot Works', desc: '4-step workflow connecting field to head office' },
  { to: '/manual', label: 'Staff Field Manual', desc: 'Comprehensive documentation and training guide' },
  { to: '/faq', label: 'Frequently Asked Questions', desc: 'Pricing, GPS geofencing, security, and setup answers' },
  { to: '/security', label: 'Security & Data Protection', desc: 'How your company data is isolated and protected' },
  { to: '/status', label: 'System Status', desc: 'Live check of the app, API and billing' },
];

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileExpanded(mobileExpanded === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-500/20 selection:text-slate-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold shadow-xl"
      >
        Skip to main content
      </a>

      {/* ─── Top Global Navigation ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div ref={dropdownRef} className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to={SAAS_HOME} className="flex items-center gap-2.5 group" aria-label="Task Pilot Home">
            <img width={512} height={512} decoding="async" src="/logo.png" alt="" className="w-8 h-8 rounded-lg shadow-xs group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-lg text-slate-900 leading-tight">Task Pilot</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-normal leading-none hidden sm:inline">
                by Thekada Digital Ventures Pvt Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('features')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  activeDropdown === 'features' ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                aria-expanded={activeDropdown === 'features'}
              >
                Features <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'features' && (
                <div className="absolute top-full left-0 mt-2 w-[520px] rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {FEATURE_LINKS.map((item) => {
                    const FIcon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-2.5 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 group-hover:bg-slate-900 group-hover:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                          <FIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.label}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs px-2">
                    <span className="text-slate-500 font-medium">All 21 modules included in every plan</span>
                    <Link to="/features" className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
                      View all modules →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions / Sectors Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('solutions')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  activeDropdown === 'solutions' ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                aria-expanded={activeDropdown === 'solutions'}
              >
                Solutions <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute top-full left-0 mt-2 w-[480px] rounded-2xl bg-white border border-slate-200 shadow-2xl p-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {SECTOR_LINKS.map((item) => {
                    const SIcon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-amber-500/10 group-hover:text-amber-700 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                          <SIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.label}</p>
                          <p className="text-[11px] text-slate-500">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Compare Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('compare')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  activeDropdown === 'compare' ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                aria-expanded={activeDropdown === 'compare'}
              >
                Compare <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'compare' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'compare' && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {COMPARE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="p-2 rounded-xl hover:bg-slate-50 transition-colors block group"
                    >
                      <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-slate-100 px-2">
                    <Link to="/compare" className="text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors block">
                      All competitor comparisons →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('resources')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${
                  activeDropdown === 'resources' ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
                aria-expanded={activeDropdown === 'resources'}
              >
                Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-2xl p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {RESOURCE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="p-2 rounded-xl hover:bg-slate-50 transition-colors block group"
                    >
                      <p className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.label}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'text-slate-950 bg-slate-100' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact-sales"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Book a demo
            </Link>
            <span className="w-px h-4 bg-slate-200" />
            <Link
              to="/login"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={() => trackCtaClick('top_nav', 'Start free trial', '/register')}
              className="h-9 px-4 inline-flex items-center rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 shadow-sm transition-all"
            >
              Start free trial
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            className="lg:hidden p-2 -mr-2 text-slate-700 hover:text-slate-900"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ─── Mobile Accordion Drawer ─── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Features Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileAccordion('features')}
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900"
              >
                <span>Features & Modules</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'features' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'features' && (
                <div className="pl-2 py-1 space-y-1.5 border-l-2 border-slate-100 ml-1">
                  {FEATURE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link to="/features" className="block py-1 text-xs font-bold text-amber-700">
                    View all 21 modules →
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileAccordion('solutions')}
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900"
              >
                <span>Industry Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'solutions' && (
                <div className="pl-2 py-1 space-y-1.5 border-l-2 border-slate-100 ml-1">
                  {SECTOR_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileAccordion('compare')}
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900"
              >
                <span>Competitor Comparisons</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'compare' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'compare' && (
                <div className="pl-2 py-1 space-y-1.5 border-l-2 border-slate-100 ml-1">
                  {COMPARE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Accordion */}
            <div>
              <button
                type="button"
                onClick={() => toggleMobileAccordion('resources')}
                className="w-full flex items-center justify-between py-2 text-sm font-bold text-slate-900"
              >
                <span>Resources & Knowledge</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'resources' && (
                <div className="pl-2 py-1 space-y-1.5 border-l-2 border-slate-100 ml-1">
                  {RESOURCE_LINKS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link to="/pricing" className="block py-2 text-sm font-bold text-slate-900">
              Pricing & Plans
            </Link>
            <Link to="/about" className="block py-2 text-sm font-bold text-slate-900">
              About Task Pilot
            </Link>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/register"
                className="h-11 rounded-xl bg-slate-900 text-white font-semibold text-sm flex items-center justify-center shadow-sm"
              >
                Start 14-day free trial
              </Link>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center hover:bg-slate-50"
                >
                  Sign in
                </Link>
                <Link
                  to="/contact-sales"
                  className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center hover:bg-slate-50"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main" className="flex-1">{children}</main>

      {/* ─── Comprehensive Global Footer ─── */}
      <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <img width={512} height={512} decoding="async" src="/logo.png" alt="" className="w-8 h-8 rounded" />
              <span>Task Pilot</span>
            </div>
            <p className="mt-1 text-xs text-amber-500 font-semibold tracking-wide">
              A product by Thekada Digital Ventures Pvt. Ltd.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Construction management software for builders and field teams. Task sign-offs, location-verified GPS attendance, Daily Progress Reports (DPR), and BOQ cost control across every site.
            </p>
            <Link
              to="/status"
              className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs transition-colors group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="group-hover:text-white">System status</span>
            </Link>
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Isolated company workspaces</span>
              <span>•</span>
              <span>Regional pricing in 7 currencies</span>
            </div>
          </div>

          {/* Product & Modules */}
          <div>
            <p className="text-white font-semibold mb-3.5 text-xs uppercase tracking-wider">Product</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/features" className="hover:text-white transition-colors">All 21 Modules</Link></li>
              <li><Link to="/features/task-management" className="hover:text-white transition-colors">Tasks & Sign-Offs</Link></li>
              <li><Link to="/features/gps-attendance" className="hover:text-white transition-colors">GPS Attendance</Link></li>
              <li><Link to="/features/daily-site-diary" className="hover:text-white transition-colors">Daily Site Diary (DPR)</Link></li>
              <li><Link to="/features/boq-cost-control" className="hover:text-white transition-colors">BOQ & Cost Control</Link></li>
              <li><Link to="/features/inspections-punch-lists" className="hover:text-white transition-colors">Inspections & Punch Lists</Link></li>
              <li><Link to="/features/gantt-timeline" className="hover:text-white transition-colors">Gantt Timeline</Link></li>
              <li><Link to="/features/document-control" className="hover:text-white transition-colors">Blueprints & Drawings</Link></li>
              <li><Link to="/features/site-chat" className="hover:text-white transition-colors">Site Channels Chat</Link></li>
              <li><Link to="/features/equipment-tracking" className="hover:text-white transition-colors">Plant & Equipment</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors font-semibold text-amber-400">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Solutions & Comparisons */}
          <div>
            <p className="text-white font-semibold mb-3.5 text-xs uppercase tracking-wider">Solutions & Compare</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/industries/construction" className="hover:text-white transition-colors">General Contractors</Link></li>
              <li><Link to="/industries/real-estate" className="hover:text-white transition-colors">Real Estate Developers</Link></li>
              <li><Link to="/industries/interiors" className="hover:text-white transition-colors">Interior Fit-Out</Link></li>
              <li><Link to="/industries/infrastructure" className="hover:text-white transition-colors">Infrastructure & EPC</Link></li>
              <li><Link to="/industries/facility-management" className="hover:text-white transition-colors">Facility Management</Link></li>
              <li><Link to="/industries/project-management" className="hover:text-white transition-colors">PMC Consultancies</Link></li>
              <li className="pt-2 text-slate-500 font-semibold uppercase text-[10px]">Comparisons</li>
              <li><Link to="/compare/taskpilot-vs-procore" className="hover:text-white transition-colors">vs Procore</Link></li>
              <li><Link to="/compare/taskpilot-vs-fieldwire" className="hover:text-white transition-colors">vs Fieldwire</Link></li>
              <li><Link to="/compare/taskpilot-vs-asana" className="hover:text-white transition-colors">vs Asana</Link></li>
              <li><Link to="/compare/taskpilot-vs-monday" className="hover:text-white transition-colors">vs Monday.com</Link></li>
              <li><Link to="/compare/taskpilot-vs-clickup" className="hover:text-white transition-colors">vs ClickUp</Link></li>
              <li><Link to="/compare/taskpilot-vs-powerplay" className="hover:text-white transition-colors">vs Powerplay</Link></li>
              <li><Link to="/compare/best-construction-management-software" className="hover:text-white transition-colors">2026 Buyer's Guide</Link></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <p className="text-white font-semibold mb-3.5 text-xs uppercase tracking-wider">Resources & Trust</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/blog" className="hover:text-white transition-colors">Field Guides & Blog</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/manual" className="hover:text-white transition-colors">Staff Field Manual</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ Hub</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact-sales" className="hover:text-white transition-colors">Contact Sales & Demo</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/status" className="hover:text-white transition-colors">System Status</Link></li>
              <li><Link to="/policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Account Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors text-amber-400 font-semibold">Start 14-Day Free Trial</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Thekada Digital Ventures Pvt. Ltd. All rights reserved.</p>
            <p className="text-slate-400">Task Pilot · Construction management software</p>
          </div>
        </div>
      </footer>

      <MobileStickyCta pathname={pathname} />
      <CookieConsent />
    </div>
  );
};

/**
 * Phone-only call-to-action that appears after the visitor scrolls past the
 * hero. Hidden on pages that already are a conversion form.
 */
const MobileStickyCta: React.FC<{ pathname: string }> = ({ pathname }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (['/register', '/contact-sales', '/login'].includes(pathname)) return null;
  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-2 transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!visible}
    >
      <Link
        to="/register"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackCtaClick('mobile_sticky', 'Start free trial', '/register')}
        className="flex-1 h-11 inline-flex items-center justify-center rounded-xl bg-slate-900 text-white text-sm font-semibold"
      >
        Start free trial
      </Link>
      <Link
        to="/contact-sales"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackCtaClick('mobile_sticky', 'Book a demo', '/contact-sales')}
        className="h-11 px-4 inline-flex items-center justify-center rounded-xl border border-slate-300 text-sm font-semibold text-slate-800"
      >
        Book a demo
      </Link>
    </div>
  );
};

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</section>
);

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-600">{children}</p>
);
