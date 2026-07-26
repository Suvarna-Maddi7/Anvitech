'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import styles from './AIDemonstration.module.css';
import { Bell, User } from 'lucide-react';

export function AIDemonstration() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Step 1: Person approaches
  const personX = useTransform(scrollYProgress, [0, 0.2], ['-100%', '30%']);
  const personOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0, 1, 1, 0]);

  // Step 2 & 3: Camera detects & Tracking box appears
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const boxScale = useTransform(scrollYProgress, [0.2, 0.3], [1.5, 1]);

  // Step 4: Notification
  const notificationY = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [20, 0, 0, -20]);
  const notificationOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 1, 1, 0]);

  // Text crossfading based on scroll
  const text1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
  const text3Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className={styles.section}>
      <Container size="default">
        <div className={styles.layout}>
          
          {/* Left: Text Storytelling */}
          <div className={styles.textContent}>
            <Typography variant="label" className={styles.label}>AI Technology</Typography>
            <div className={styles.textStack}>
              <motion.div style={{ opacity: text1Opacity, position: 'absolute' }}>
                <Typography variant="h2">Intelligent Threat Detection.</Typography>
                <Typography variant="body" className={styles.desc}>
                  Anvitech's edge AI continuously analyzes the environment, instantly distinguishing between humans, vehicles, and safe objects.
                </Typography>
              </motion.div>
              
              <motion.div style={{ opacity: text2Opacity, position: 'absolute' }}>
                <Typography variant="h2">Active Tracking.</Typography>
                <Typography variant="body" className={styles.desc}>
                  Once a threat is identified, the camera locks on, tracks movement across the property, and engages deterrence protocols.
                </Typography>
              </motion.div>

              <motion.div style={{ opacity: text3Opacity, position: 'absolute' }}>
                <Typography variant="h2">Instant Alerts.</Typography>
                <Typography variant="body" className={styles.desc}>
                  You receive a push notification with a live video feed in milliseconds, allowing you to trigger two-way audio or an alarm.
                </Typography>
              </motion.div>
            </div>
          </div>

           {/* Right: Visual Demonstration */}
          <div className={styles.visualContent}>
            <div className={styles.demoWindow}>
              
              {/* Background Grid & Decorative Plate */}
              <div className={styles.gridOverlay} />
              <div className={styles.bgPlate} />
              
              {/* Camera Feed HUD (Rec indicator, camera info, timecode) */}
              <div className={styles.hudOverlay}>
                <div className={styles.hudTop}>
                  <div className={styles.recIndicator}>
                    <span className={styles.recDot} />
                    <span>REC</span>
                  </div>
                  <div className={styles.camLabel}>CAM-02 // BACKYARD</div>
                </div>
                <div className={styles.hudBottom}>
                  <div>1080P 60FPS</div>
                  <div>12:44:02 // WDR</div>
                </div>
              </div>
              
              {/* The "Person" Walker */}
              <motion.div 
                className={styles.person}
                style={{ x: personX, opacity: personOpacity }}
              >
                {/* Custom SVG Walker Silhouette with walking motion */}
                <svg 
                  className={styles.walkerSvg} 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Head */}
                  <circle cx="50" cy="20" r="8" fill="var(--color-primary-navy)" />
                  {/* Torso */}
                  <path d="M50,28 L50,55" />
                  {/* Arms */}
                  <path d="M50,33 L30,42 L22,50" className={styles.leftArm} />
                  <path d="M50,33 L70,45 L78,38" className={styles.rightArm} />
                  {/* Legs */}
                  <path d="M50,55 L38,70 L26,82" className={styles.leftLeg} />
                  <path d="M50,55 L62,68 L74,80" className={styles.rightLeg} />
                </svg>
                
                {/* AI Tracking Box */}
                <motion.div 
                  className={styles.trackingBox}
                  style={{ opacity: boxOpacity, scale: boxScale }}
                >
                  <span className={styles.trackingLabel}>HUMAN 99%</span>
                </motion.div>
              </motion.div>

              {/* Notification Overlay */}
              <motion.div 
                className={styles.notification}
                style={{ y: notificationY, opacity: notificationOpacity }}
              >
                <div className={styles.notifIcon}><Bell size={20} color="white" /></div>
                <div>
                  <strong>Person Detected</strong>
                  <p>Backyard Camera • Just now</p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
