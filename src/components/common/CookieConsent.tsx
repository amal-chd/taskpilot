import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';
import { initAnalytics } from '../../lib/analytics';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('taskpilot_cookie_consent');
      if (!consent) {
        // Small delay so it smoothly slides in without blocking initial paint
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleChoice = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem('taskpilot_cookie_consent', choice);
    } catch {}
    if (choice === 'all') void initAnalytics();
    setShow(false);
  };

  if (!show) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-800 p-5 rounded-2xl shadow-2xl flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-sm font-bold text-slate-100">Privacy & Cookie Preferences</p>
          </div>
          <button
            onClick={() => handleChoice('essential')}
            className="text-slate-400 hover:text-white p-1 -mr-1 -mt-1 transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          SiteCommons by Thekada Digital Ventures Pvt. Ltd. uses strictly essential cookies and telemetry to secure workspaces and ensure high availability across global sites. We never sell your personal or project data.{' '}
          <Link to="/policy" className="text-amber-400 underline hover:text-amber-300">
            Learn more in our Privacy Policy
          </Link>
          .
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => handleChoice('all')}
            className="flex-1 h-8 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
          >
            Accept All
          </button>
          <button
            onClick={() => handleChoice('essential')}
            className="flex-1 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors border border-white/10"
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieConsent;
