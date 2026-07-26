import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './SectionLoader.module.css';
import { Typography } from './Typography';

interface SectionLoaderProps {
  height?: string;
  message?: string;
}

export function SectionLoader({ height = '50vh', message = 'Loading Experience...' }: SectionLoaderProps) {
  return (
    <div className={styles.loaderWrapper} style={{ height }}>
      <div className={styles.loaderContent}>
        <Loader2 className={styles.spinner} size={40} />
        <Typography variant="label" className={styles.message}>
          {message}
        </Typography>
      </div>
    </div>
  );
}
