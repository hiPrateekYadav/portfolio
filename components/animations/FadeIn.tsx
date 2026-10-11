'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * FadeIn Animation Component
 * 
 * Wrapper component that animates children with a fade-in effect.
 * 
 * @param children - React elements to animate
 * @param direction - Direction of entry animation (up, down, left, right)
 * @param delay - Delay before animation starts (in seconds)
 * @param className - Additional CSS classes
 * @param immediate - If true, animates on mount instead of scroll into view
 */
interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  immediate?: boolean;
}

export default function FadeIn({ children, direction = 'up', delay = 0, className = '', immediate = false }: FadeInProps) {
  // Define initial positions for each direction
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, ...directions[direction] }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
