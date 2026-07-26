'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './QuoteRequestForm.module.css';

export function QuoteRequestForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className={styles.successState}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <CheckCircle2 size={64} color="var(--color-secondary-blue)" className={styles.successIcon} />
          <Typography variant="h3" className={styles.successTitle}>Request Received</Typography>
          <Typography variant="body">
            Our security experts will review your requirements and contact you within 24 hours.
          </Typography>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <AnimatePresence mode="wait">
          
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={styles.step}
            >
              <Typography variant="h4" className={styles.stepTitle}>Property Details</Typography>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Property Type</label>
                <select className={styles.select}>
                  <option>Residential</option>
                  <option>Commercial Office</option>
                  <option>Retail Store</option>
                  <option>Warehouse / Industrial</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <Input label="Location (City/Zip)" placeholder="e.g. Los Angeles, CA" required />
              </div>
              <div className={styles.actions}>
                <Button type="button" onClick={handleNext} rightIcon={<ArrowRight size={16} />}>
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={styles.step}
            >
              <Typography variant="h4" className={styles.stepTitle}>Security Requirements</Typography>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Primary Need</label>
                <select className={styles.select}>
                  <option>Full System Installation</option>
                  <option>System Upgrade</option>
                  <option>Maintenance / Repair</option>
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Additional Details</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Describe your security concerns or specific requirements..."
                  rows={4}
                />
              </div>
              <div className={styles.actionsGroup}>
                <Button type="button" variant="ghost" onClick={handlePrev}>Back</Button>
                <Button type="button" onClick={handleNext} rightIcon={<ArrowRight size={16} />}>
                  Final Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className={styles.step}
            >
              <Typography variant="h4" className={styles.stepTitle}>Contact Information</Typography>
              <div className={styles.fieldGroup}>
                <Input label="Full Name" placeholder="John Doe" required />
              </div>
              <div className={styles.fieldRow}>
                <Input label="Email" type="email" placeholder="john@example.com" required />
                <Input label="Phone" type="tel" placeholder="(555) 000-0000" required />
              </div>
              <div className={styles.actionsGroup}>
                <Button type="button" variant="ghost" onClick={handlePrev}>Back</Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Free Quote'}
                </Button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>
    </div>
  );
}
