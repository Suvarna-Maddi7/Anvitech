import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Typography.module.css';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'label' | 'caption';
  as?: React.ElementType;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  as,
  className,
  children,
  ...props
}: TypographyProps) {
  // Determine HTML tag mapping based on variant if not explicitly provided
  const Component = as || (
    ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)
      ? (variant === 'display' ? 'h1' : variant)
      : variant === 'label'
      ? 'label'
      : variant === 'caption'
      ? 'span'
      : 'p'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;

  return (
    <Component
      className={cn(styles.base, styles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
