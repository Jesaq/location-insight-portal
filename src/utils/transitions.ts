
// Animation constants
export const TRANSITION_DURATION = 0.5;
export const STAGGER_DELAY = 0.1;

// Page transition variants for Framer Motion (if needed later)
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

export const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: TRANSITION_DURATION,
};

// Helper to create staggered delays
export const getStaggerDelay = (index: number): number => {
  return index * STAGGER_DELAY;
};

// Helper to add transition classes
export const getTransitionClasses = (index: number): string => {
  return `animate-in stagger-${Math.min(index, 5)}`;
};
