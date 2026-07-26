'use client';

import React, { useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-base)' }}>
      <Container size="default" style={{ textAlign: 'center' }}>
        <Typography variant="h2" style={{ marginBottom: '1rem' }}>
          System Malfunction.
        </Typography>
        <Typography variant="body" style={{ marginBottom: '2rem' }}>
          An unexpected error occurred in the application. Our engineers have been notified.
        </Typography>
        <Button 
          variant="primary" 
          onClick={() => reset()}
          leftIcon={<RefreshCcw size={18} />}
        >
          Attempt Recovery
        </Button>
      </Container>
    </div>
  );
}
