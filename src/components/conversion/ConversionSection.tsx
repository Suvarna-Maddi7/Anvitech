'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import { ContactCards } from './ContactCards';
import { QuoteRequestForm } from './QuoteRequestForm';
import { ShieldCheck, Clock, PenTool } from 'lucide-react';
import styles from './ConversionSection.module.css';

export function ConversionSection() {
  return (
    <Section background="base" className={styles.section}>
      <Container size="wide">
        
        <div className={styles.layout}>
          
          {/* Left Column: Trust & Contact */}
          <div className={styles.leftColumn}>
            <FadeIn direction="up">
              <Typography variant="label" className={styles.label}>Take The Next Step</Typography>
              <Typography variant="h2" className={styles.title}>
                Secure Your Future Today.
              </Typography>
              <Typography variant="body" className={styles.description}>
                Whether you need a complete enterprise overhaul or a simple residential upgrade, our security experts are ready to design the perfect system for you.
              </Typography>
            </FadeIn>

            <FadeIn delay={0.2}>
              <ContactCards />
            </FadeIn>

            <FadeIn delay={0.4} className={styles.trustBadges}>
              <div className={styles.badge}>
                <ShieldCheck size={20} className={styles.badgeIcon} />
                <span>Certified Installation</span>
              </div>
              <div className={styles.badge}>
                <Clock size={20} className={styles.badgeIcon} />
                <span>Fast Response</span>
              </div>
              <div className={styles.badge}>
                <PenTool size={20} className={styles.badgeIcon} />
                <span>3-Year Warranty</span>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Quote Form */}
          <div className={styles.rightColumn}>
            <FadeIn delay={0.3} direction="left">
              <div className={styles.formWrapper}>
                <QuoteRequestForm />
              </div>
            </FadeIn>
          </div>

        </div>

      </Container>
    </Section>
  );
}
