'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Cloud, Eye, Shield, Zap, Moon, Smartphone, Cpu } from 'lucide-react';
import styles from '../Hero.module.css';

// Feature Pills Data
const PILLS = [
  { label: 'Cloud Storage', icon: Cloud, x: 26, y: 34, delay: 0.1 },
  { label: '4K Ultra HD', icon: Eye, x: 74, y: 20, delay: 0.2 },
  { label: 'IP67 Weatherproof', icon: Shield, x: 58, y: 14, delay: 0.3 },
  { label: 'AI Motion Tracking', icon: Zap, x: 30, y: 62, delay: 0.4 },
  { label: 'Night Vision', icon: Moon, x: 78, y: 72, delay: 0.5 },
  { label: 'Mobile App', icon: Smartphone, x: 22, y: 80, delay: 0.6 },
  { label: 'AI Detection', icon: Cpu, x: 82, y: 46, delay: 0.7 }
];

interface FeaturePillProps {
  pill: typeof PILLS[0];
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

function FeaturePill({ pill, springX, springY }: FeaturePillProps) {
  const Icon = pill.icon;
  // Parallax scale varies slightly by index delay to create depth layering
  const parallaxX = useTransform(springX, (x) => x * (15 + pill.delay * 25));
  const parallaxY = useTransform(springY, (y) => y * (15 + pill.delay * 25));

  return (
    <motion.div
      className={styles.featurePill}
      style={{
        left: `${pill.x}%`,
        top: `${pill.y}%`,
        x: parallaxX,
        y: parallaxY,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: pill.delay + 0.4, ease: 'easeOut' }}
    >
      <Icon size={13} className={styles.pillIcon} />
      <span>{pill.label}</span>
    </motion.div>
  );
}

interface FloatingLabelsProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

export function FloatingLabels({ springX, springY }: FloatingLabelsProps) {
  return (
    <div className={styles.pillsOverlay}>
      {PILLS.map((pill, i) => (
        <FeaturePill 
          key={i} 
          pill={pill} 
          springX={springX} 
          springY={springY} 
        />
      ))}
    </div>
  );
}
