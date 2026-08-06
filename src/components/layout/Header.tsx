'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/layout/Container';
import { useHeroMouse } from '@/components/hero/hooks/useHeroMouse';
import { motion, useTransform } from 'framer-motion';

import Image from 'next/image';
import logoImg from '@/images/logo.png';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { springX, springY } = useHeroMouse();

  const pathD = useTransform(
    [springX, springY],
    ([x, y]) => {
      const oX = (x as number) * 3;
      const oY = (y as number) * 3;
      return `M ${42 + oX},0 C ${38 + oX},25 ${42 + oX},75 ${42 + oX},100 L 100,100 L 100,0 Z`;
    }
  );

  const edgeD = useTransform(
    [springX, springY],
    ([x, y]) => {
      const oX = (x as number) * 3;
      const oY = (y as number) * 3;
      return `M ${42 + oX},0 C ${38 + oX},25 ${42 + oX},75 ${42 + oX},100`;
    }
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      {/* Dynamic morphing split background */}
      <div className={styles.headerBg}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.headerBgSvg}>
          <defs>
            <linearGradient id="headerEdgeGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <filter id="headerBloom" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur1" />
              <feGaussianBlur stdDeviation="4.0" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Blue right-side filled path */}
          <motion.path 
            d={pathD} 
            fill={scrolled ? "rgba(6, 60, 187, 0.92)" : "#063CBB"} 
          />

          {/* 2px glowing edge dividing line */}
          <motion.path
            d={edgeD}
            fill="none"
            stroke="url(#headerEdgeGlow)"
            strokeWidth={2}
            filter="url(#headerBloom)"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />

          {/* White highlight border line */}
          <motion.path
            d={edgeD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={0.75}
            opacity="0.85"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        </svg>
      </div>

      <Container size="wide" className={styles.container}>
        {/* Logo (White Capsule) */}
        <div className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <Image src={logoImg} alt="Anvitech Logo" width={80} height={80} style={{ objectFit: 'contain' }} />
          </div>
          <Typography variant="h6" className={styles.logoText}>ANVITECH</Typography>
        </div>

        {/* Navigation + Actions Container (Blue Capsule) */}
        <div className={styles.rightNavGroup}>
          {/* Navigation - Desktop */}
          <nav className={styles.nav}>
            <a href="#products" className={styles.navLink}>Products</a>
            <a href="#solutions" className={styles.navLink}>Solutions</a>
            <a href="#about" className={styles.navLink}>About</a>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <a href="#contact" className={styles.navLinkSecondary}>Contact Sales</a>
            <Button variant="primary" size="sm" className={styles.ctaButton}>
              Get Quote
            </Button>
            <button 
              className={styles.hamburgerButton} 
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Dropdown Overlay */}
      {menuOpen && (
        <div className={styles.mobileDropdown}>
          <a href="#products" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#solutions" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Solutions</a>
          <a href="#about" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>Contact Sales</a>
        </div>
      )}
    </header>
  );
}
