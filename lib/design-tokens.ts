/**
 * lib/design-tokens.ts
 * Central design tokens for AI Trainer Academy.
 * All values derived from globals.css CSS variables for visual parity.
 */

export const colors = {
  // Core brand
  navy: '#0D1B2A',
  navy800: '#1A2E42',
  navy700: '#243D54',
  ink: '#1C2B3A',
  slate: '#4A6174',
  muted: '#7A93A8',
  line: '#E2EAF0',
  surface: '#F5F8FB',
  white: '#FFFFFF',

  // Accents
  accent: '#1A6FBF',
  accentLight: '#EBF3FC',
  accentDark: '#0F4C8A',
  green: '#1A7A4A',
  greenLight: '#E8F5EE',
  amber: '#B05C0E',
  amberLight: '#FDF0E4',

  // Semantic
  success: '#1A7A4A',
  successLight: '#E8F5EE',
  warning: '#B05C0E',
  warningLight: '#FDF0E4',
  error: '#DC2626',
  errorLight: '#FEF2F2',
  info: '#1A6FBF',
  infoLight: '#EBF3FC',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
} as const;

export const radius = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.25rem', // 20px
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export const typography = {
  fontFamily: {
    display: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.5' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.5' }],     // 14px
    base: ['1rem', { lineHeight: '1.6' }],        // 16px
    lg: ['1.125rem', { lineHeight: '1.6' }],     // 18px
    xl: ['1.25rem', { lineHeight: '1.5' }],      // 20px
    '2xl': ['1.5rem', { lineHeight: '1.4' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '1.3' }],  // 30px
    '4xl': ['2.25rem', { lineHeight: '1.2' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1.1' }],      // 48px
    '6xl': ['3.75rem', { lineHeight: '1.1' }],   // 60px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.1em',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
} as const;

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
} as const;