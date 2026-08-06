'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { useHeroMouse } from './hooks/useHeroMouse';
import { HeroBackgroundSVG } from './components/HeroBackgroundSVG';
import { HeroContent } from './components/HeroContent';
import { CameraScene } from './components/CameraScene';
import { FloatingLabels } from './components/FloatingLabels';
import styles from './Hero.module.css';

export function Hero() {
  const { scrollY, scrollYProgress } = useScroll();
  const { springX, springY } = useHeroMouse();

  // Scroll transformations
  const leftScale = useTransform(scrollY, [0, 600], [1, 1.04]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 400], [0, -35]);
  const circlesRotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section className={styles.heroSection}>
      {/* 1. Left SVG Panel Background */}
      <HeroBackgroundSVG 
        springX={springX} 
        springY={springY} 
        leftScale={leftScale} 
      />

      {/* 2. Absolute Content Layer above the SVG */}
      <div className={styles.contentLayerAbsolute}>
        <HeroContent 
          textOpacity={textOpacity} 
          buttonsY={buttonsY} 
        />
      </div>

      <Container size="wide" className={styles.container}>
        <div className={styles.leftPlaceholder} />

        {/* 3. Right Visual Segment */}
        <div className={styles.rightSection}>
          {/* Slower rotating background graphics */}
          <motion.div 
            className={styles.bgGraphics}
            style={{ rotate: circlesRotate }}
          >
            <div className={styles.perspectiveGrid} />
            <div className={`${styles.circularGraphic} ${styles.circularGraphic1}`} />
            <div className={`${styles.circularGraphic} ${styles.circularGraphic2}`} />
            <div className={`${styles.circularGraphic} ${styles.circularGraphic3}`} />
          </motion.div>

          {/* 3D camera model and platform scene */}
          <CameraScene 
            springX={springX} 
            springY={springY} 
            scrollYProgress={scrollYProgress} 
          />

          {/* Glassmorphic floating pills/labels */}
          <FloatingLabels 
            springX={springX} 
            springY={springY} 
          />
        </div>
      </Container>
    </section>
  );
}
