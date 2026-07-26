import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = 'primary', 
      size = 'md', 
      isLoading, 
      leftIcon, 
      rightIcon, 
      children, 
      disabled, 
      ...props 
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.button,
          styles[variant],
          styles[size],
          isLoading && styles.loading,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className={styles.spinner}>
            <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
              <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" fill="none" strokeWidth="3"></circle>
            </svg>
          </span>
        )}
        {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        <span className={styles.content}>{children}</span>
        {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';
