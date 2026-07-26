import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Layout.module.css';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  padding?: 'none' | 'small' | 'medium' | 'large' | 'huge';
  background?: 'base' | 'surface' | 'elevated';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(({ 
  children, 
  className, 
  padding = 'medium',
  background = 'base',
  ...props 
}, ref) => {
  return (
    <section 
      ref={ref}
      className={cn(
        styles.section, 
        styles[`padding-${padding}`], 
        styles[`bg-${background}`],
        className
      )} 
      {...props}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';
