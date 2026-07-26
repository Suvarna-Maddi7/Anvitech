'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import styles from './WhyAnvitech.module.css';
import {
  ShieldCheck, Cpu, Globe2, Zap, Clock, Headphones,
  CheckCircle2, Star
} from 'lucide-react';

const stats = [
  { value: '10K+', label: 'Cameras Installed', icon: <ShieldCheck size={24} /> },
  { value: '99.9%', label: 'Uptime Guaranteed', icon: <Zap size={24} /> },
  { value: '15+', label: 'Years of Experience', icon: <Clock size={24} /> },
  { value: '150+', label: 'Cities Covered', icon: <Globe2 size={24} /> },
];

const pillars = [
  {
    icon: <Cpu size={28} />,
    title: 'Edge AI Processing',
    desc: 'On-device neural inference delivers instant decisions without cloud latency, even during internet outages.',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Military-Grade Encryption',
    desc: 'AES-256 end-to-end encryption ensures your footage and data are never compromised.',
  },
  {
    icon: <Globe2 size={28} />,
    title: 'Pan-India Coverage',
    desc: 'Trusted by businesses across 150+ cities with dedicated regional support teams.',
  },
  {
    icon: <Headphones size={28} />,
    title: '24/7 Expert Support',
    desc: 'Round-the-clock technical assistance from certified security professionals.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Under 200ms Response',
    desc: 'Threat detection alerts reach your phone in under 200 milliseconds of detection.',
  },
  {
    icon: <Clock size={28} />,
    title: '5-Year Warranty',
    desc: 'Every Anvitech device ships with a comprehensive 5-year hardware warranty.',
  },
];

const reviews = [
  { name: 'Rajesh Mehta', role: 'IT Head, TechCorp India', stars: 5, text: 'Anvitech cameras transformed our campus security. The AI detection is astoundingly accurate.' },
  { name: 'Priya Sharma', role: 'Facilities Manager', stars: 5, text: 'Installation was seamless and the app gives me real-time visibility across all our branches.' },
  { name: 'Arun Nair', role: 'Security Director', stars: 5, text: 'The night vision quality and weather resistance exceeded every expectation we had.' },
  { name: 'Sneha Patel', role: 'Store Owner', stars: 5, text: 'Reduced theft incidents by 80% in just the first month. Outstanding product.' },
  { name: 'Vikram Singh', role: 'Warehouse Manager', stars: 5, text: 'Covers our entire 2-acre facility with just 8 cameras. Incredible field of view.' },
  { name: 'Meera Iyer', role: 'HOD Security', stars: 5, text: 'Two-way audio is a game changer — we can respond to incidents instantly.' },
];

function CountUp({ target, suffix = '' }: { target: string; suffix?: string }) {
  return <span>{target}{suffix}</span>;
}

export function WhyAnvitech() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* ── Stats Bar ── */}
      <div className={styles.statsBar}>
        <Container size="wide">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className={styles.statIcon}>{s.icon}</span>
                <span className={styles.statValue}><CountUp target={s.value} /></span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Section Header ── */}
      <Container size="default" className={styles.headerWrap}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <Typography variant="label" className={styles.label}>Why Choose Us</Typography>
          <Typography variant="h2" className={styles.heading}>
            Built Different. <span className={styles.accent}>Engineered to Last.</span>
          </Typography>
          <Typography variant="body" className={styles.subheading}>
            Every Anvitech product is designed around one core principle — absolute reliability when it matters most.
          </Typography>
        </motion.div>
      </Container>

      {/* ── Pillars Grid ── */}
      <Container size="wide" className={styles.pillarsWrap}>
        <div className={styles.pillarsGrid}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className={styles.pillarCard}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            >
              <div className={styles.pillarIcon}>{p.icon}</div>
              <Typography variant="h4" className={styles.pillarTitle}>{p.title}</Typography>
              <Typography variant="body" className={styles.pillarDesc}>{p.desc}</Typography>
              <div className={styles.pillarCheck}>
                <CheckCircle2 size={14} />
                <span>Included with every unit</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* ── Marquee Reviews ── */}
      <div className={styles.reviewsWrap}>
        <div className={styles.marqueeTrack}>
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.reviewStars}>
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <Typography variant="body" className={styles.reviewText}>"{r.text}"</Typography>
              <div className={styles.reviewAuthor}>
                <div className={styles.reviewAvatar}>{r.name[0]}</div>
                <div>
                  <div className={styles.reviewName}>{r.name}</div>
                  <div className={styles.reviewRole}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
