'use client';

import React from 'react';
import styles from './Hero.module.css';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import dynamic from 'next/dynamic';

const InteractiveCamera = dynamic(
  () => import('@/components/3d/InteractiveCamera').then(mod => mod.InteractiveCamera),
  { ssr: false }
);

import { HeroBackground } from './HeroBackground';
import { TrustIndicators } from './TrustIndicators';
import { ScrollIndicator } from './ScrollIndicator';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <HeroBackground />
      
      <Container size="wide" className={styles.container}>
        {/* Left Content Area */}
        <div className={styles.contentArea}>
          <FadeIn delay={0.1} className={styles.badgeWrap}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Introducing Anvitech Pro
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className={styles.titleWrap}>
            <Typography variant="display" className={styles.headline}>
              Next-Gen Security <br />
              <span className={styles.textAccent}>For The Modern Enterprise.</span>
            </Typography>
          </FadeIn>

          <FadeIn delay={0.3} className={styles.descWrap}>
            <Typography variant="body" className={styles.description}>
              Elevate your security posture with AI-driven surveillance, 
              real-time threat detection, and seamless cloud integration. 
              Built for organizations that demand the best.
            </Typography>
          </FadeIn>

          <FadeIn delay={0.4} className={styles.actions}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Explore Solutions
            </Button>
            <Button variant="ghost" size="lg" leftIcon={<Play size={18} />}>
              View Demo
            </Button>
          </FadeIn>

          <FadeIn delay={0.6} className={styles.trustArea}>
            <TrustIndicators />
          </FadeIn>
        </div>

        {/* Right 3D Area */}
        <div className={styles.visualArea}>
          <FadeIn delay={0.4} duration={1} className={styles.canvasContainer}>
            <InteractiveCamera />
          </FadeIn>
          
          {/* Decorative Labels for 3D */}
          <FadeIn delay={0.8} className={styles.floatingLabel} style={{ top: '20%', right: '10%' }}>
            <span>4K Ultra HD</span>
          </FadeIn>
          <FadeIn delay={0.9} className={styles.floatingLabel} style={{ bottom: '30%', left: '10%' }}>
            <span>AI Motion Tracking</span>
          </FadeIn>
        </div>
      </Container>

      <div className={styles.scrollIndicatorWrapper}>
        <FadeIn delay={1.2}>
          <ScrollIndicator />
        </FadeIn>
      </div>
    </section>
  );
}
