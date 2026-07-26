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
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Installations Completed', value: 10, suffix: 'k+' },
  { label: 'Customer Satisfaction', value: 99, suffix: '%' },
  { label: 'Support Response', value: 24, suffix: '/7' },
];

function AnimatedNumber({ value, suffix, prefix = '' }: Stat) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return (
    <div ref={ref} className={styles.statValueWrapper}>
      <span className={styles.statValue}>
        {prefix}{count}{suffix}
      </span>
    </div>
  );
}

export function TrustStats() {
  return (
    <Section background="base" padding="large">
      <Container size="default">
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1} direction="up" className={styles.statCard}>
              <AnimatedNumber {...stat} />
              <Typography variant="body" className={styles.statLabel}>
                {stat.label}
              </Typography>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
