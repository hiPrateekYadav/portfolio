'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * StaggerChildren Animation Component
 * 
 * Orchestrates sequential animations for multiple child elements:
 * - Children animate in sequence with delay between each
 * - Use with StaggerItem component for individual items
 * - Triggers when scrolled into view
 * 
 * @param children - StaggerItem components to animate
 * @param staggerDelay - Delay between each child animation (default: 0.1s)
 * @param className - Additional CSS classes
 */
interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerChildren({ children, staggerDelay = 0.1, className = '' }: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem Component
 * 
 * Individual item wrapper to be used inside StaggerChildren.
 * Defines the animation variants for each staggered element.
 * 
 * @param children - Content to animate
 * @param className - Additional CSS classes
 */
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
