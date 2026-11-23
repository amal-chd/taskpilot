/** @type {import('tailwindcss').Config} */
export default {
  // The app is light-only. Class strategy means stray `dark:` variants can
  // never activate via the OS prefers-color-scheme (which rendered broken
  // half-dark cards for users with dark-mode systems).
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Phone-first: xs catches larger phones (475px+) so two-up rows (e.g.
      // date ranges) can sit side-by-side before the default sm (640px).
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Marketing site ("Sellix" design language): blue accent, deep navy ink.
        // Used only by src/pages/saas/marketing — the app keeps slate/amber.
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd7ff',
          300: '#8ebcff',
          400: '#5b9bfb',
          500: '#2d7ef7',
          600: '#1f6ae0',
          700: '#1859bf',
          800: '#184a94',
          900: '#102c55',
        },
        ink: {
          50: '#f5f8fd',
          100: '#eaf0fa',
          200: '#d5e0f0',
          300: '#aebdd3',
          400: '#7d8ea8',
          500: '#5b6d8a',
          600: '#475a77',
          700: '#34455f',
          800: '#1f2d44',
          900: '#15233b',
          950: '#0b1b33',
        },
        sun: {
          DEFAULT: '#ffd149',
          400: '#ffd149',
          500: '#ffc21a',
        },
        // Brand — refined modern slate/navy
        primary: {
          DEFAULT: '#0F172A',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Accent — crisp amber
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Semantic scales
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 500: '#10B981',
          600: '#059669', 700: '#047857',
        },
        warning: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 500: '#F59E0B',
          600: '#D97706', 700: '#B45309',
        },
        danger: {
          DEFAULT: '#EF4444',
          50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 500: '#EF4444',
          600: '#DC2626', 700: '#B91C1C',
        },
        info: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 500: '#3B82F6',
          600: '#2563EB', 700: '#1D4ED8',
        },
        // Neutral surface tokens
        surface: '#FFFFFF',
        canvas: '#FAFAFA',
        line: '#E5E5E5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        // Ultra-soft, diffuse shadows (Linear/Notion style)
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.04), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out both',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
