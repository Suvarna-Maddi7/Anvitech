'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { SectionLoader } from '@/components/ui/SectionLoader';
import { Camera, RefreshCw, Hand, ZoomIn, User, Car } from 'lucide-react';

const EnvironmentScene = dynamic(
  () => import('@/components/3d/EnvironmentScene').then(m => m.EnvironmentScene),
  { ssr: false, loading: () => <SectionLoader height="100%" message="Loading 3D Viewer…" /> }
);

import styles from './SmartEnvironments.module.css';

// ── Static data ──────────────────────────────────────────────────────────────

const TABS = ['House', 'Office', 'Warehouse', 'Retail', 'Farm'] as const;
type Tab = typeof TABS[number];

const TAB_DATA: Record<Tab, {
  coverage: number; cameras: number; range: string;
  cameraType: string; lens: string;
}> = {
  House:     { coverage: 95, cameras: 3,  range: '30 m',  cameraType: 'Dome Camera',   lens: '2.8 mm' },
  Office:    { coverage: 96, cameras: 8,  range: '30 m',  cameraType: 'PTZ Camera',    lens: '4–75 mm' },
  Warehouse: { coverage: 88, cameras: 12, range: '50 m',  cameraType: 'Bullet Camera', lens: '2.8 mm' },
  Retail:    { coverage: 98, cameras: 4,  range: '30 m',  cameraType: 'Dome Camera',   lens: '2.8 mm' },
  Farm:      { coverage: 92, cameras: 6,  range: '100 m', cameraType: 'Bullet Camera', lens: '6 mm' },
};

const TOOLBAR_ITEMS = [
  { id: 'rotate',  Icon: RefreshCw, label: 'Rotate' },
  { id: 'pan',     Icon: Hand,      label: 'Pan' },
  { id: 'zoom',    Icon: ZoomIn,    label: 'Zoom' },
  { id: 'camera',  Icon: Camera,    label: 'Camera' },
];

const LEGEND = [
  { color: '#22c55e', label: 'Excellent' },
  { color: '#facc15', label: 'Limited',  value: 6 },
  { color: '#ef4444', label: 'Blind',    value: 2 },
  { color: '#94a3b8', label: 'None',     value: 0 },
];

// ── Animation variants ───────────────────────────────────────────────────────

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.06 },
  }),
};

const STAT_VARIANTS: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
};

// ── Sub-components (memoised) ────────────────────────────────────────────────

interface CoverageChartProps { pct: number }
const CoverageChart = memo(function CoverageChart({ pct }: CoverageChartProps) {
  return (
    <div className={styles.chartContainer} aria-label={`Coverage: ${pct}%`}>
      <div
        className={styles.circularChart}
        style={{ background: `conic-gradient(#4F46E5 0% ${pct}%, #E5E7EB ${pct}% 100%)` }}
      >
        <div className={styles.circularChartInner}>
          <AnimatePresence mode="wait">
            <motion.span
              key={pct}
              className={styles.chartPercentage}
              variants={STAT_VARIANTS}
              initial="hidden"
              animate="visible"
            >
              {pct}%
            </motion.span>
          </AnimatePresence>
          <span className={styles.chartLabel}>Covered</span>
        </div>
      </div>
    </div>
  );
});

interface RightCardProps { tab: Tab; data: typeof TAB_DATA[Tab] }
const RightCard = memo(function RightCard({ tab, data }: RightCardProps) {
  const specs = useMemo(() => [
    { label: 'Detection Range', value: data.range },
    { label: 'View Angle',      value: '105°' },
    { label: 'Night Vision',    value: 'Up to 100m' },
    {
      label: 'AI Detection',
      value: (
        <span className={styles.iconRow} aria-label="Human, Vehicle, Animal">
          <User size={13} /><Car size={13} />
          <span className={styles.animalIcon}>🐕</span>
        </span>
      ),
    },
    { label: 'Storage',      value: '30 Days' },
    { label: 'Weather Proof', value: 'IP67' },
  ], [data.range]);

  return (
    <>
      <div className={styles.summaryHeader}>
        <h3 className={styles.summaryTitle}>Camera Details</h3>
      </div>

      <div className={styles.cameraTitleRow}>
        <div className={styles.cameraImageWrapper} aria-hidden="true">
          <Camera size={28} strokeWidth={1.5} color="#6366f1" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={styles.cameraInfo}
            variants={STAT_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <h4>{data.cameraType}</h4>
            <p>{data.lens} Lens</p>
            <span className={styles.statusBadge}>Active</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.specsList} role="list">
        {specs.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.specItem}
            role="listitem"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
          >
            <span className={styles.specLabel}>{s.label}</span>
            <span className={styles.specValue}>{s.value}</span>
          </motion.div>
        ))}
      </div>

      <div className={styles.topViewSection}>
        <h4 className={styles.topViewHeader}>Top View (2D)</h4>
        <div className={styles.topViewCard} aria-label="2D top-view coverage map placeholder">
          <div className={styles.topViewImage}>
            <Image src="/images/top-view-camera.png" alt="Camera Top View" width={130} height={96} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className={styles.topViewLegend}>
            {LEGEND.map(l => (
              <div key={l.label} className={styles.topViewLegendItem}>
                <div className={styles.dot} style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

// ── Main component ───────────────────────────────────────────────────────────

export function SmartEnvironments() {
  const [activeTab, setActiveTab] = useState<Tab>('Farm');
  const [activeToolbar, setActiveToolbar] = useState('rotate');

  const data = TAB_DATA[activeTab];

  const handleTabClick = useCallback((tab: Tab) => setActiveTab(tab), []);

  return (
    <Section background="surface" padding="large">
      <Container size="default">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>
            Coverage:{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeTab}
                className={styles.accent}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {activeTab}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className={styles.subtitle}>
            Smart camera placement for complete protection.
          </p>
        </motion.div>

        {/* ── Environment pills ──────────────────────────────────────────── */}
        <motion.div
          className={styles.tabsContainer}
          role="tablist"
          aria-label="Environment selector"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: 0.06, ease: 'easeOut' }}
        >
          {TABS.map(tab => {
            const active = activeTab === tab;
            return (
              <motion.button
                key={tab}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${tab}`}
                id={`tab-${tab}`}
                className={`${styles.tab} ${active ? styles.activeTab : ''}`}
                onClick={() => handleTabClick(tab)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {tab}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── 3-column grid ─────────────────────────────────────────────── */}
        <div
          className={styles.gridContainer}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >

          {/* Left card — Coverage Summary */}
          <motion.div
            className={styles.card}
            custom={0}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2 }}
            aria-label="Coverage summary card"
          >
            <div className={styles.summaryHeader}>
              <h3 className={styles.summaryTitle}>Coverage Summary</h3>
            </div>

            <CoverageChart pct={data.coverage} />

            <div className={styles.legendList} aria-label="Coverage legend">
              {LEGEND.map(l => (
                <div key={l.label} className={styles.legendItem}>
                  <div className={styles.legendLeft}>
                    <div className={styles.dot} style={{ background: l.color }} />
                    <span>{l.label} Coverage</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${activeTab}-${l.label}`}
                      className={styles.legendValue}
                      variants={STAT_VARIANTS}
                      initial="hidden"
                      animate="visible"
                    >
                      {l.label === 'Excellent' ? `${data.coverage}%`
                        : l.value !== undefined ? `${l.value}%` : '—'}
                    </motion.span>
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className={styles.recommendationBox}>
              <h4 className={styles.recTitle}>Recommended Cameras</h4>
              <div className={styles.recCountRow}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`count-${activeTab}`}
                    className={styles.recCount}
                    variants={STAT_VARIANTS}
                    initial="hidden"
                    animate="visible"
                    aria-live="polite"
                  >
                    {data.cameras}
                  </motion.span>
                </AnimatePresence>
                <div className={styles.iconBtn} aria-hidden="true">
                  <Camera size={14} />
                </div>
              </div>
              <motion.button
                className={styles.optimizeBtn}
                whileHover={{ scale: 1.02, backgroundColor: '#E0E7FF' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                aria-label="Optimize camera placement"
              >
                Optimize Placement
              </motion.button>
            </div>
          </motion.div>

          {/* Center card — 3D Viewer */}
          <motion.div
            className={`${styles.card} ${styles.viewerCard}`}
            custom={1}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            aria-label="Interactive 3D environment viewer"
          >
            <div className={styles.viewerContainer}>
              <EnvironmentScene activeTab={activeTab} />
            </div>

            <motion.div
              className={styles.toolbar}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.3, ease: 'easeOut' }}
              role="toolbar"
              aria-label="3D viewer controls"
            >
              {TOOLBAR_ITEMS.map(({ id, Icon, label }) => {
                const active = activeToolbar === id;
                return (
                  <motion.button
                    key={id}
                    className={`${styles.toolbarBtn} ${active ? styles.toolbarBtnActive : ''}`}
                    onClick={() => setActiveToolbar(id)}
                    aria-pressed={active}
                    aria-label={label}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.12 }}
                  >
                    <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                    <span>{label}</span>
                    {active && (
                      <motion.div
                        className={styles.toolbarActiveIndicator}
                        layoutId="toolbar-indicator"
                        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right card — Camera Details */}
          <motion.div
            className={styles.card}
            custom={2}
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
            transition={{ duration: 0.2 }}
            aria-label="Camera details card"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'contents' }}
              >
                <RightCard tab={activeTab} data={data} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
