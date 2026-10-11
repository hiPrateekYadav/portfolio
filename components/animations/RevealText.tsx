'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * RevealText Animation Component
 * 
 * Animates text with a reveal effect from below:
 * - Fades in while sliding up
 * - Longer duration for dramatic effect
 * - Can trigger on mount or scroll into view
 * 
 * @param children - Text content to animate
 * @param delay - Delay before animation starts (in seconds)
 * @param immediate - If true, animates on mount instead of scroll
 */
interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  immediate?: boolean;
}

export default function RevealText({ children, delay = 0, immediate = false }: RevealTextProps) {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
