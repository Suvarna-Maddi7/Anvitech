'use client';

import React from 'react';
import styles from './ScrollIndicator.module.css';

export function ScrollIndicator() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Scroll</span>
      <div className={styles.track}>
        <div className={styles.thumb} />
      </div>
    </div>
  );
}
