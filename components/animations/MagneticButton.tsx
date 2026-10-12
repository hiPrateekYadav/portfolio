'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

/**
 * MagneticButton Animation Component
 * 
 * Creates a magnetic effect where the button follows the cursor:
 * - Tracks mouse position relative to button center
 * - Smoothly moves button toward cursor
 * - Returns to original position on mouse leave
 * - Uses spring physics for natural movement
 * 
 * @param children - Button content to wrap
 * @param strength - Intensity of magnetic effect (default: 0.3)
 */
interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
}

export default function MagneticButton({ children, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
