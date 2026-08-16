'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { useHeroMouse } from './hooks/useHeroMouse';
import { HeroBackgroundSVG } from './components/HeroBackgroundSVG';
import { HeroContent } from './components/HeroContent';
import { CameraScene } from './components/CameraScene';
import { FloatingLabels } from './components/FloatingLabels';
import { Shield, Eye, Cloud, Zap, Phone, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export function Hero() {
  const { scrollY, scrollYProgress } = useScroll();
  const { springX, springY } = useHeroMouse();

  // Scroll transformations for desktop
  const leftScale = useTransform(scrollY, [0, 600], [1, 1.04]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const buttonsY = useTransform(scrollY, [0, 400], [0, -35]);
  const circlesRotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section className={styles.heroSection}>
      {/* ═══ DESKTOP LAYOUT ═══ */}
      <div className={styles.desktopLayoutOnly}>
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
      </div>

      {/* ═══ MOBILE LAYOUT (Mobile-first design) ═══ */}
      <div className={styles.mobileLayoutOnly}>
        {/* Background curve shape */}
        <div className={styles.mobileCurveBg} />

        <div className={styles.mHeroSplit}>
          {/* Content Section */}
          <div className={styles.mContent}>
            {/* Badge */}
            <div className={styles.mBadge}>
              <span className={styles.mBadgeDot} />
              Introducing Anvitech Pro
            </div>

            {/* Headline */}
            <h1 className={styles.mHeadline}>
              Next-Gen Security<br />
              <span className={styles.mHighlight}>For The Modern Enterprise.</span>
            </h1>

            {/* Subtext */}
            <p className={styles.mSubtext}>
              Elevate your security with AI-driven surveillance, real-time detection, and seamless integration.
            </p>

            {/* CTA */}
            <a href="#solutions" className={styles.mCta}>
              Explore Solutions
              <ArrowRight size={18} className={styles.mCtaIcon} />
            </a>
          </div>

          {/* Visual / Product Section */}
          <div className={styles.mVisualArea}>
            {/* Floating cards */}
            <div className={`${styles.mFloatCard} ${styles.fcIP67}`}>
              <div className={styles.mFloatTitle}>IP67 Waterproof</div>
            </div>

            <div className={`${styles.mFloatCard} ${styles.fcCloud}`}>
              <div className={styles.mFloatTitle}>Cloud Storage</div>
            </div>

            <div className={`${styles.mFloatCard} ${styles.fcHD}`}>
              <div className={styles.mFloatTitle}>4K Ultra HD</div>
            </div>

            <div className={`${styles.mFloatCard} ${styles.fcAI}`}>
              <div className={styles.mFloatTitle}>AI Motion Tracking</div>
            </div>

            {/* Camera model */}
            <div className={styles.mCameraContainer}>
              <img src="/products/pro_camera.png" alt="Anvitech Dome Camera" className={styles.mCameraImage} />
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className={styles.mFeatureStrip}>
          <div className={styles.mStripItem}>
            <div className={styles.mStripIconBox}><Shield size={20} /></div>
            <div className={styles.mStripTitle}>IP67</div>
            <div className={styles.mStripDesc}>Weatherproof</div>
          </div>
          <div className={styles.mStripItem}>
            <div className={styles.mStripIconBox}><Eye size={20} /></div>
            <div className={styles.mStripTitle}>4K Ultra HD</div>
            <div className={styles.mStripDesc}>Crystal Clear</div>
          </div>
          <div className={styles.mStripItem}>
            <div className={styles.mStripIconBox}><Zap size={20} /></div>
            <div className={styles.mStripTitle}>AI Tracking</div>
            <div className={styles.mStripDesc}>Smart Detection</div>
          </div>
          <div className={styles.mStripItem}>
            <div className={styles.mStripIconBox}><Cloud size={20} /></div>
            <div className={styles.mStripTitle}>Cloud Storage</div>
            <div className={styles.mStripDesc}>Secure & Scalable</div>
          </div>
        </div>

        {/* Bottom Floating Action Bar */}
        <div className={styles.mBottomBar}>
          <a href="tel:+1234567890" className={styles.mBottomAction}>
            <div className={styles.mBottomIconBox}><Phone size={18} /></div>
            <span className={styles.mBottomLabel}>Call</span>
          </a>
          <a href="https://wa.me/1234567890" className={`${styles.mBottomAction} ${styles.mWhatsAppAction}`}>
            <div className={styles.mBottomIconBox}><MessageSquare size={18} /></div>
            <span className={styles.mBottomLabel}>WhatsApp</span>
          </a>
          <a href="#quote" className={styles.mBottomAction}>
            <div className={styles.mBottomIconBox}><FileText size={18} /></div>
            <span className={styles.mBottomLabel}>Get Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
}
