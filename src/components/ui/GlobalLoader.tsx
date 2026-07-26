'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import styles from './GlobalLoader.module.css';
import { Typography } from './Typography';

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate premium loading delay to let 3D assets and lazy chunks hydrate
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div 
            className={styles.content}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.iconContainer}>
              <Loader2 className={styles.spinner} size={48} />
            </div>
            <Typography variant="h4" className={styles.text}>
              ANVITECH
            </Typography>
            <div className={styles.progressBarContainer}>
              <motion.div 
                className={styles.progressBar}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
