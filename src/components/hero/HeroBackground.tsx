'use client';

import React from 'react';
import styles from './HeroBackground.module.css';

export function HeroBackground() {
  return (
    <div className={styles.backgroundWrapper}>
      <div className={styles.gradientTop} />
      <div className={styles.gridOverlay} />
      <div className={styles.gradientBottom} />
    </div>
  );
}
