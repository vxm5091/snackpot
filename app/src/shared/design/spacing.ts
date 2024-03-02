export const SPACING = {
  none: 0,
  xs: 4,
  s: 8,
  s1: 12,
  m: 16,
  m1: 24,
  l: 32,
  xl: 48,
  xxl: 60,
  xxxl: 80,
} as const;

export type TSpacing = keyof typeof SPACING;