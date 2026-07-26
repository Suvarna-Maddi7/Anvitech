'use client';

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import styles from './MobileActionBar.module.css';

export function MobileActionBar() {
  return (
    <div className={styles.actionBar}>
      <a href="#" className={styles.actionButton}>
        <Phone size={20} />
        <span>Call</span>
      </a>
      <div className={styles.divider} />
      <a href="#" className={styles.actionButton}>
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      <div className={styles.divider} />
      <a href="#" className={`${styles.actionButton} ${styles.primary}`}>
        <FileText size={20} />
        <span>Get Quote</span>
      </a>
    </div>
  );
}
