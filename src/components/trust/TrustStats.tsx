'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import styles from './TrustStats.module.css';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

const stats: Stat[] = [
  { label: 'Customer Rating', value: 4.9, suffix: '★' },
  { label: 'Installations Completed', value: 10, suffix: 'k+' },
  { label: 'Customer Satisfaction', value: 99, suffix: '%' },
  { label: 'Support Response', value: 24, suffix: '/7' },
];

function AnimatedNumber({ value, suffix, prefix = '' }: Stat) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [value, isInView, isDecimal]);

  return (
    <span ref={ref} className={styles.statValue}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function TrustStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.statsBar}>
        {/* Split Background SVG (Left side blue, right side white) */}
        <div className={styles.statsBg}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.statsBgSvg}>
            <defs>
              <linearGradient id="trustStatsEdgeGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <filter id="trustStatsBloom" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur1" />
                <feGaussianBlur stdDeviation="4.0" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Blue fill on the left side */}
            <path d="M 50,0 C 53,25 47,75 50,100 L 0,100 L 0,0 Z" fill="#063CBB" />
            
            {/* Glowing edge line */}
            <path 
              d="M 50,0 C 53,25 47,75 50,100" 
              fill="none" 
              stroke="url(#trustStatsEdgeGlow)" 
              strokeWidth={2} 
              filter="url(#trustStatsBloom)" 
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
            {/* White highlight line */}
            <path 
              d="M 50,0 C 53,25 47,75 50,100" 
              fill="none" 
              stroke="#ffffff" 
              strokeWidth={0.75} 
              opacity="0.85" 
              style={{ vectorEffect: 'non-scaling-stroke' }}
            />
          </svg>
        </div>

        <Container size="wide" className={styles.statsContainer}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={styles.statValueWrapper}>
                  <AnimatedNumber {...stat} />
                </div>
                <span className={styles.statLabel}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
