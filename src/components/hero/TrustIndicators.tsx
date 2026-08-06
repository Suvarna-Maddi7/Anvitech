import React from 'react';
import styles from './TrustIndicators.module.css';

interface TrustStat {
  value: string;
  label: string;
}

const stats: TrustStat[] = [
  { value: '15+', label: 'Years Experience' },
  { value: '10k+', label: 'Installations' },
  { value: '24/7', label: 'Support' },
];

export function TrustIndicators() {
  return (
    <div className={styles.container}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
          {index < stats.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
}
