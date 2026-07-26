import { clsx, type ClassValue } from 'clsx';

/**
 * Utility to conditionally join classNames together.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
