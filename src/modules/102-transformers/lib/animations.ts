import type { Variants } from 'framer-motion'

// Standard ease curve for smooth animations (cubic bezier)
// Using tuple type for Framer Motion compatibility
export const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

// Fade in with upward movement
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut
    },
  },
}

// Simple fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
}

// Scale up from slightly smaller
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
}

// Stagger container for child animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Stagger with faster timing
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Draw SVG path
export const drawPath: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1, ease: easeOut },
      opacity: { duration: 0.3 }
    },
  },
}

// Matrix cell reveal (for attention matrices)
export const cellReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.02,
      duration: 0.3,
      ease: easeOut,
    },
  }),
}

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
}

// For equation highlighting
export const highlight: Variants = {
  idle: {
    backgroundColor: 'transparent'
  },
  active: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    transition: { duration: 0.3 },
  },
}

// Pulse animation for attention
export const pulse: Variants = {
  idle: { scale: 1 },
  active: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1
    },
  },
}
