'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function HashLinkScroller() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId === '') {
          lenis.scrollTo(0);
        } else {
          // Check for exact match first
          let targetEl = document.getElementById(targetId);
          
          // Alias handling: map common menu items to actual section IDs
          if (!targetEl) {
            if (targetId === 'products') {
              targetEl = document.getElementById('product') || document.getElementById('projects');
            } else if (targetId === 'about') {
              targetEl = document.getElementById('why');
            } else if (targetId === 'contact') {
              targetEl = document.getElementById('conversion');
            }
          }

          if (targetEl) {
            lenis.scrollTo(targetEl, { offset: -80 }); // offset for sticky header
          }
        }
      }
    };

    document.addEventListener('click', handleHashClick);
    return () => document.removeEventListener('click', handleHashClick);
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1.2, 
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true, 
        syncTouch: false,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        normalizeWheel: true
      } as any}
    >
      <HashLinkScroller />
      {children as any}
    </ReactLenis>
  );
}
