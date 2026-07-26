import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container size="default" className={styles.container}>
          <div className={styles.content}>
            <div className={styles.errorCode}>404</div>
            <Typography variant="h2" className={styles.title}>
              Signal Lost.
            </Typography>
            <Typography variant="body" className={styles.description}>
              The page you are looking for has been moved, deleted, or never existed.
            </Typography>
            <div className={styles.actions}>
              <Link href="/">
                <Button variant="primary" leftIcon={<ArrowLeft size={18} />}>
                  Return to Base
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
