import type { Transition, Variants } from "framer-motion";

export const smoothEase = [0.22, 1, 0.36, 1] as const;

export const revealTransition: Transition = {
  duration: 0.65,
  ease: smoothEase,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const pageTransition = {
  duration: 0.45,
  ease: smoothEase,
};
