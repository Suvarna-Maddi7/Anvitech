import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Typography } from '@/components/ui/Typography';
import styles from './SolutionCard.module.css';

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

export function SolutionCard({ title, description, icon, imageUrl, className }: SolutionCardProps) {
  // Using a solid color fallback if no image is provided, to ensure it looks premium
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.imageWrapper}>
        <div className={styles.image} style={bgStyle} />
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        
        <div className={styles.textGroup}>
          <Typography variant="h4" className={styles.title}>
            {title}
          </Typography>
          <Typography variant="body" className={styles.description}>
            {description}
          </Typography>
        </div>
      </div>
      
      <div className={styles.actionArrow}>
        <ArrowUpRight size={24} color="var(--color-primary-navy)" />
      </div>
    </div>
  );
}
