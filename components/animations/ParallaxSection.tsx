'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

/**
 * ParallaxSection Animation Component
 * 
 * Creates a parallax scrolling effect where content moves at different speeds:
 * - Tracks scroll position relative to viewport
 * - Transforms vertical position based on scroll
 * - Creates depth perception in the layout
 * 
 * @param children - Content to apply parallax effect
 * @param speed - Parallax speed multiplier (default: 0.5)
 */
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
}

export default function ParallaxSection({ children, speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
