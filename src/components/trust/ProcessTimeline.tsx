'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import styles from './ProcessTimeline.module.css';
import { MessageSquare, MapPin, FileText, Package, Wrench, Smartphone, ShieldCheck, Headphones } from 'lucide-react';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Understanding your unique security needs and challenges.', icon: <MessageSquare size={28} /> },
  { num: '02', title: 'Site Visit', desc: 'Comprehensive property analysis and blind-spot identification.', icon: <MapPin size={28} /> },
  { num: '03', title: 'Security Planning', desc: 'Custom architectural blueprint for camera and sensor placement.', icon: <FileText size={28} /> },
  { num: '04', title: 'Product Selection', desc: 'Curating the exact hardware required for optimal coverage.', icon: <Package size={28} /> },
  { num: '05', title: 'Installation', desc: 'Professional, clean, and minimally invasive setup by experts.', icon: <Wrench size={28} /> },
  { num: '06', title: 'Configuration', desc: 'Setting up the mobile app, cloud storage, and AI alerts.', icon: <Smartphone size={28} /> },
  { num: '07', title: 'Testing', desc: 'Rigorous day and night testing of all systems.', icon: <ShieldCheck size={28} /> },
  { num: '08', title: 'Ongoing Support', desc: '24/7 technical support and maintenance packages.', icon: <Headphones size={28} /> },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Scale the SVG line based on scroll
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section background="surface" padding="huge" ref={containerRef} className={styles.section}>
      <Container size="default">
        
        <div className={styles.header}>
          <FadeIn direction="up">
            <Typography variant="label" className={styles.label}>How We Work</Typography>
            <Typography variant="h2" className={styles.title}>
              The Anvitech Process.
            </Typography>
          </FadeIn>
        </div>

        <div className={styles.timeline}>
          {/* Animated central line */}
          <div className={styles.lineTrack}>
            <motion.div 
              className={styles.lineFill} 
              style={{ scaleY, transformOrigin: 'top' }} 
            />
          </div>

          <div className={styles.stepsContainer}>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.num} className={`${styles.stepRow} ${isEven ? styles.rowLeft : styles.rowRight}`}>
                  
                  {/* Text Content */}
                  <div className={styles.stepContent}>
                    <FadeIn direction={isEven ? 'right' : 'left'} delay={0.1}>
                      <Typography variant="h4" className={styles.stepTitle}>
                        <span className={styles.stepNum}>{step.num}.</span> {step.title}
                      </Typography>
                      <Typography variant="body" className={styles.stepDesc}>
                        {step.desc}
                      </Typography>
                    </FadeIn>
                  </div>
                  
                  {/* Center Node */}
                  <div className={styles.stepNodeWrapper}>
                    <div className={styles.stepNode} />
                  </div>
                  
                  {/* Icon in the opposite space */}
                  <div className={styles.stepEmpty}>
                    <FadeIn direction={isEven ? 'left' : 'right'} delay={0.2}>
                      <div className={styles.stepIcon}>
                        {step.icon}
                      </div>
                    </FadeIn>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </Section>
  );
}
