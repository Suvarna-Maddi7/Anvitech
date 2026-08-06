'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Play } from 'lucide-react';
import styles from '../Hero.module.css';

interface HeroButtonsProps {
  buttonsY: MotionValue<number>;
}

export function HeroButtons({ buttonsY }: HeroButtonsProps) {
  return (
    <motion.div 
      className={styles.actions}
      style={{ y: buttonsY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <a href="#solutions" className="inline-block">
        <Button 
          variant="primary" 
          size="lg" 
          className={styles.primaryButton}
        >
          Explore Solutions
          <span className={styles.primaryButtonActiveIcon}><ArrowRight size={18} /></span>
        </Button>
      </a>
      <a href="#demonstration" className="inline-block">
        <Button 
          variant="ghost" 
          size="lg" 
          className={styles.secondaryButton}
          leftIcon={<Play size={16} />}
        >
          View Demo
        </Button>
      </a>
    </motion.div>
  );
}
