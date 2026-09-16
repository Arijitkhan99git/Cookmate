export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const;

export const components = {
  tabBar: {
    // Overall bar
    height: 72,
    horizontalInset: 20,
    radius: 36,
    // Active pill
    pillRadius: 30,
    pillPaddingH: 20,
    pillPaddingV: 8,
    // Icon
    iconSize: 23,
    // Label
    labelSize: 11,
    labelGap: 2,
    // Shadow on active pill
    shadowOffsetY: 4,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
} as const;
