'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * HoverCard Animation Component
 * 
 * Adds interactive hover effects to card elements:
 * - Scales up on hover
 * - Lifts element vertically
 * - Smooth transitions with custom easing
 * 
 * @param children - React elements to wrap
 * @param scale - Scale multiplier on hover (default: 1.02)
 * @param className - Additional CSS classes
 */
interface HoverCardProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export default function HoverCard({ children, scale = 1.02, className = '' }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ scale, y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
