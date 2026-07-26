'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  children: React.ReactNode;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  ...props
}: FadeInProps) {
  const directionOffset = {
    up: 40,
    down: -40,
    left: 40,
    right: -40,
    none: 0,
  };

  const initialY = direction === 'up' || direction === 'down' ? directionOffset[direction] : 0;
  const initialX = direction === 'left' || direction === 'right' ? directionOffset[direction] : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom smooth easing
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
