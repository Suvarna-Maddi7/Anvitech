'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { HeroButtons } from './HeroButtons';
import styles from '../Hero.module.css';

interface HeroContentProps {
  textOpacity: MotionValue<number>;
  buttonsY: MotionValue<number>;
}

export function HeroContent({ textOpacity, buttonsY }: HeroContentProps) {
  return (
    <div className={styles.contentWrap}>
      {/* Floating Badge */}
      <motion.div 
        className={styles.badgeWrap}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{ 
          opacity: { duration: 0.5, delay: 0.2 },
          y: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
        }}
      >
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Introducing Anvitech Pro
        </div>
      </motion.div>

      {/* Headline (Line-by-line reveal) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: textOpacity }}
      >
        <Typography variant="display" className={styles.headline}>
          Next-Gen<br />
          Security<br />
          <span className={styles.textAccent}>For The Modern Enterprise.</span>
        </Typography>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
        style={{ opacity: textOpacity }}
      >
        <Typography variant="body" className={styles.description}>
          Elevate your security with AI-driven surveillance, 
          real-time detection, and seamless integration.
        </Typography>
      </motion.div>

      {/* Buttons */}
      <HeroButtons buttonsY={buttonsY} />
    </div>
  );
}
