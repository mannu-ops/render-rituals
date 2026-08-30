export const animationConfig = {
  duration: {
    fast: 180,
    normal: 320,
    smooth: 600,
    slow: 900,
  },
  easing: {
    smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
    standard: "ease-out",
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
} as const;
