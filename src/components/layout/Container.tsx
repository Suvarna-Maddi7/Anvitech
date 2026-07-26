import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Layout.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function Container({ children, className, size = 'default', ...props }: ContainerProps) {
  return (
    <div className={cn(styles.container, styles[`container-${size}`], className)} {...props}>
      {children}
    </div>
  );
}
