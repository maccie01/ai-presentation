import { Variants } from 'framer-motion';

/**
 * Base animation variants for fade in animations
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeInOut' 
    } 
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3, 
      ease: 'easeInOut' 
    } 
  }
};

/**
 * Slide in from the left animation variants
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Slide in from the right animation variants
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    x: 50,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Slide in from the top animation variants
 */
export const slideInTop: Variants = {
  hidden: { 
    opacity: 0, 
    y: -50
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -50,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Slide in from the bottom animation variants
 */
export const slideInBottom: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    y: 50,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Scale animation variants for growing elements
 */
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.175, 0.885, 0.32, 1.275] // Custom bezier for a nice "pop" effect
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Rotate and scale animation variants
 */
export const rotateIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -15
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -15,
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};

/**
 * Staggered animation for lists
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each child animation
      delayChildren: 0.2    // Delay before starting children animations
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1 // Reverse the stagger order when exiting
    }
  }
};

/**
 * Page transition variants for route changes
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

/**
 * Text reveal animation with staggered characters
 */
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: (custom = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Animation for items that draw attention
 */
export const pulse: Variants = {
  hidden: { 
    opacity: 0.8,
    scale: 1
  },
  visible: {
    opacity: 1,
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInTop,
  slideInBottom,
  scaleIn,
  rotateIn,
  staggerContainer,
  pageTransition,
  textReveal,
  pulse
}; 