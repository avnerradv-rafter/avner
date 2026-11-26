export const colors = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  secondary: '#FF6584',
  background: '#1A1A2E',
  surface: '#16213E',
  surfaceElevated: '#0F3460',
  text: '#FFFFFF',
  textSecondary: '#A0A0B0',
  textMuted: '#606070',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  border: '#2A2A4A',
  safetyRed: '#FF3B30',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
  h2: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
  h3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const theme = { colors, spacing, typography, borderRadius } as const;
export type Theme = typeof theme;
