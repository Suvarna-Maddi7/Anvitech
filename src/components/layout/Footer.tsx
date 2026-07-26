import React from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { Typography } from '@/components/ui/Typography';
import logoImg from '@/images/logo.png';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="default">
        <div className={styles.grid}>
          
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              <Image src={logoImg} alt="Anvitech" width={36} height={36} className={styles.logoImg} />
              <Typography variant="h5" className={styles.logoText}>ANVITECH</Typography>
            </div>
            <Typography variant="body" className={styles.desc}>
              Next-generation security solutions powered by proprietary AI and enterprise-grade hardware.
            </Typography>
          </div>
          
          <div className={styles.linkCol}>
            <Typography variant="h6" className={styles.colTitle}>Solutions</Typography>
            <ul className={styles.linkList}>
              <li><a href="#">Home Security</a></li>
              <li><a href="#">Business Enterprise</a></li>
              <li><a href="#">Industrial & Logistics</a></li>
              <li><a href="#">Solar Surveillance</a></li>
            </ul>
          </div>
          
          <div className={styles.linkCol}>
            <Typography variant="h6" className={styles.colTitle}>Company</Typography>
            <ul className={styles.linkList}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className={styles.linkCol}>
            <Typography variant="h6" className={styles.colTitle}>Legal</Typography>
            <ul className={styles.linkList}>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <Typography variant="body" className={styles.copyright}>
            &copy; {currentYear} Anvitech Smart Solutions. All rights reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
