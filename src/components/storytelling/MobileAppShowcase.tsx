'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import styles from './MobileAppShowcase.module.css';
import { Video, ShieldAlert, Camera, Settings, Bell, Wifi, Battery } from 'lucide-react';

const cameras = [
  { name: 'Front Door', status: 'Active', color: '#22c55e' },
  { name: 'Backyard', status: 'Motion!', color: '#f59e0b' },
  { name: 'Garage', status: 'Active', color: '#22c55e' },
  { name: 'Driveway', status: 'Active', color: '#22c55e' },
];

const features = [
  { icon: <Video size={18} />, text: 'Live 4K Streaming' },
  { icon: <ShieldAlert size={18} />, text: 'Smart Push Alerts' },
  { icon: <Camera size={18} />, text: 'Multi-camera Grid' },
  { icon: <Settings size={18} />, text: 'Device Management' },
];

export function MobileAppShowcase() {
  return (
    <Section background="base" padding="none" className={styles.section}>
      <Container size="wide">
        <div className={styles.layout}>

          {/* Text */}
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="label" className={styles.label}>Control Center</Typography>
            <Typography variant="h2" className={styles.title}>
              Total Command,<br />Anywhere You Go.
            </Typography>
            <Typography variant="body" className={styles.description}>
              The Anvitech app puts your entire security ecosystem in your pocket —
              live 4K feeds, event history, and instant alerts.
            </Typography>
            <ul className={styles.featureList}>
              {features.map((f) => (
                <li key={f.text}><span className={styles.featureIcon}>{f.icon}</span>{f.text}</li>
              ))}
            </ul>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            className={styles.visualContent}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Glow backdrop */}
            <div className={styles.glow} />

            <div className={styles.phoneFrame}>
              {/* Notch */}
              <div className={styles.notch} />

              {/* Status bar */}
              <div className={styles.statusBar}>
                <span className={styles.time}>9:41</span>
                <div className={styles.statusIcons}>
                  <Wifi size={11} />
                  <Battery size={11} />
                </div>
              </div>

              <div className={styles.phoneScreen}>
                {/* Header */}
                <div className={styles.appHeader}>
                  <div className={styles.appHeaderLeft}>
                    <div className={styles.shieldDot} />
                    <span>My Home</span>
                  </div>
                  <Bell size={15} />
                </div>

                {/* Live feed */}
                <div className={styles.videoFeed}>
                  <div className={styles.scanLine} />
                  <div className={styles.liveBadge}>● LIVE</div>
                  <div className={styles.feedLabel}>Front Door — 4K</div>
                  <div className={styles.feedOverlay} />
                </div>

                {/* Camera grid */}
                <div className={styles.gridLabel}>All Cameras</div>
                <div className={styles.appGrid}>
                  {cameras.map((c) => (
                    <div key={c.name} className={styles.appCard}>
                      <div className={styles.cardThumb} />
                      <div className={styles.cardInfo}>
                        <span className={styles.cardName}>{c.name}</span>
                        <span className={styles.cardStatus} style={{ color: c.color }}>{c.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.homeIndicator} />
            </div>

            {/* Floating notification */}
            <motion.div
              className={styles.notification}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className={styles.notifIcon}><ShieldAlert size={14} color="white" /></div>
              <div>
                <div className={styles.notifTitle}>Motion Detected</div>
                <div className={styles.notifSub}>Backyard · Just now</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
