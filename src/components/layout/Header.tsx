'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/layout/Container';
import { Shield } from 'lucide-react';

import Image from 'next/image';
import logoImg from '@/images/logo.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <Container size="wide" className={styles.container}>
        {/* Logo */}
        <div className={styles.logoGroup}>
          <div className={styles.logoIcon}>
            <Image src={logoImg} alt="Anvitech Logo" width={80} height={80} style={{ objectFit: 'contain' }} />
          </div>
          <Typography variant="h6" className={styles.logoText}>ANVITECH</Typography>
        </div>

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
        </div>
      </Container>
    </header>
  );
}
