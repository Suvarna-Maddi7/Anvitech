'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import dynamic from 'next/dynamic';
import { SectionLoader } from '@/components/ui/SectionLoader';

const SecurityCamera = dynamic(
  () => import('@/components/3d/SecurityCamera').then(mod => mod.SecurityCamera),
  { ssr: false, loading: () => <SectionLoader height="100%" message="Loading 3D..." /> }
);

import styles from './ProductShowcase.module.css';

const features = [
  {
    title: 'AI Motion Detection',
    description: 'Advanced neural networks distinguish between humans, vehicles, and animals to eliminate false alarms.',
    id: 'ai-motion'
  },
  {
    title: '360° Pan & Tilt',
    description: 'Complete coverage with smooth motorized rotation controlled directly from your mobile device.',
    id: 'pan-tilt'
  },
  {
    title: 'Color Night Vision',
    description: 'Dual LED spotlights enable full-color recording even in complete darkness up to 100ft.',
    id: 'night-vision'
  },
  {
    title: 'Two-Way Audio',
    description: 'Built-in noise-canceling microphone and high-output speaker for clear communication.',
    id: 'audio'
  },
  {
    title: 'Solar Compatible',
    description: 'Connect to our optional solar panel for continuous, maintenance-free operation.',
    id: 'solar'
  },
  {
    title: 'Cloud & Local Storage',
    description: 'Dual recording to secure cloud servers and local microSD cards ensures you never lose footage.',
    id: 'storage'
  }
];

export function ProductShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.feature-card-wrapper');
    if (cards.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      let bestEntry: IntersectionObserverEntry | null = null;
      let maxRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });

      if (bestEntry) {
        const index = Array.from(cards).indexOf((bestEntry as IntersectionObserverEntry).target);
        if (index !== -1) {
          setActiveFeature(index);
        }
      }
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Section background="base" className={styles.showcaseSection}>
      <Container size="default" className={styles.container}>
        
        {/* Sticky 3D Model Area */}
        <div className={styles.stickyArea}>
          {/* Subtle Curvy Background SVG */}
          <div className={styles.showcaseBg}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.showcaseBgSvg}>
              <path d="M 0,0 L 35,0 C 45,30 30,70 40,100 L 0,100 Z" fill="#f8fafc" opacity="0.8" />
              <path d="M 35,0 C 45,30 30,70 40,100" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </svg>
          </div>
          <div className={styles.modelWrapper}>
            <SecurityCamera key="camera-hmr-fix" activeFeatureIndex={activeFeature} />
          </div>
        </div>

        {/* Scrolling Content Area */}
        <div className={styles.contentArea} ref={containerRef}>
          
          <div className={styles.introBlock}>
            <FadeIn direction="up">
              <Typography variant="label" className={styles.label}>Flagship Product</Typography>
              <Typography variant="h2" className={styles.title}>
                The Anvitech Pro Series
              </Typography>
              <Typography variant="body" className={styles.description}>
                Redefining what a security camera can do. Packed with cutting-edge sensors and powered by proprietary AI.
              </Typography>
            </FadeIn>
          </div>

          <div className={styles.featuresList}>
            {features.map((feature, index) => (
              <div key={feature.title} className={`${styles.featureItem} feature-card-wrapper`}>
                <FadeIn direction="up" delay={0.1}>
                  <div className={`${styles.featureCard} ${activeFeature === index ? styles.activeCard : ''}`}>
                    <Typography variant="h4" className={styles.featureTitle}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body" className={styles.featureDesc}>
                      {feature.description}
                    </Typography>
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>

        </div>

      </Container>
    </Section>
  );
}
