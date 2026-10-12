'use client';

import { motion } from 'framer-motion';

/**
 * LoadingScreen Component
 * 
 * A reusable full-screen loading animation displayed while fetching data.
 * Shows an animated name with a pulsing gradient background effect.
 */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-dark z-[100] flex items-center justify-center overflow-hidden">
      <div className="relative">
        {/* Animated background gradient orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(218,197,167,0.4) 0%, rgba(218,197,167,0) 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Name animation */}
        <div className="relative flex flex-col items-center gap-8">
          <div className="flex items-center gap-2 overflow-hidden">
            {['p', 'r', 'a', 't', 'e', 'e', 'k', '.'].map((letter, index) => (
              <motion.span
                key={index}
                className="font-sans text-[64px] md:text-[80px] lg:text-[96px] font-light text-primary inline-block"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  y: [50, 0, 0, -50],
                  rotateX: [-90, 0, 0, 90]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
