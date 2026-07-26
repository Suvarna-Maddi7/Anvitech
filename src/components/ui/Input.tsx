import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Form.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className={cn(styles.wrapper, className)}>
        <div className={styles.inputContainer}>
          <input
            id={inputId}
            ref={ref}
            className={cn(styles.input, error && styles.inputError)}
            placeholder=" "
            {...props}
          />
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
