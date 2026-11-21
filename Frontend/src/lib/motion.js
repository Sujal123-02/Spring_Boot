/**
 * Weekend — Shared Framer Motion Configuration
 * Centralized animation constants for consistent, premium feel.
 * GPU-accelerated transforms only. No layout-triggering properties.
 */

// Easings
export const EASE_OUT_QUART = [0.25, 0.1, 0.25, 1];
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

// Durations (ms → seconds for framer-motion)
export const DURATION = {
  instant: 0.12,
  fast: 0.15,
  normal: 0.2,
  slow: 0.25,
  emphasis: 0.35,
};

// Spring presets
export const SPRING = {
  snappy: { type: 'spring', stiffness: 500, damping: 30 },
  gentle: { type: 'spring', stiffness: 300, damping: 28 },
  bouncy: { type: 'spring', stiffness: 420, damping: 25 },
  smooth: { type: 'spring', stiffness: 260, damping: 26 },
};

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_QUART },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE_OUT_QUART },
  },
};

// Card hover — lift 3px with shadow interpolation
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(26,25,23,0.04)',
    transition: { duration: DURATION.normal, ease: EASE_OUT_QUART },
  },
  hover: {
    y: -3,
    boxShadow: '0 12px 28px -4px rgba(26,25,23,0.09)',
    transition: { duration: DURATION.normal, ease: EASE_OUT_QUART },
  },
};

// Button tap — slight compress
export const buttonTap = {
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 500, damping: 30 },
};

// Stagger config for lists
export const staggerContainer = (staggerChildren = 0.04) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_QUART },
  },
};

// Fade in from bottom (for sections)
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: EASE_OUT_EXPO },
};

// Reduced motion support
export const reducedMotionConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.01 },
};
