'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import dynamic from 'next/dynamic';
import { SectionLoader } from '@/components/ui/SectionLoader';

const CircularStage = dynamic(
  () => import('@/components/3d/CircularStage').then(mod => mod.CircularStage),
  { ssr: false, loading: () => <SectionLoader height="100%" message="Loading Stage..." /> }
);

import { SolutionCard } from './SolutionCard';
import styles from './SolutionsSection.module.css';
import { Home, Building2, Factory, Sun, GraduationCap, Warehouse } from 'lucide-react';

const solutions = [
  {
    title: 'Home Security',
    description: 'Smart surveillance for residential properties with AI detection.',
    icon: <Home size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Business Security',
    description: 'Enterprise-grade protection for offices and retail stores.',
    icon: <Building2 size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Industrial Security',
    description: 'Robust systems designed for harsh industrial environments.',
    icon: <Factory size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Solar Surveillance',
    description: 'Off-grid security solutions powered by renewable energy.',
    icon: <Sun size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Institutions',
    description: 'Comprehensive coverage for schools and campuses.',
    icon: <GraduationCap size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Warehouses',
    description: 'Large-scale monitoring and logistics protection.',
    icon: <Warehouse size={24} />,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  }
];

export function SolutionsSection() {
  return (
    <Section background="surface" padding="large" className={styles.section}>
      <Container size="default">
        
        {/* Section Header */}
        <div className={styles.header}>
          <FadeIn direction="up">
            <Typography variant="label" className={styles.label}>Our Solutions</Typography>
            <Typography variant="h2" className={styles.title}>
              Tailored Protection <br /> For Every Environment.
            </Typography>
          </FadeIn>
        </div>

        {/* Solutions Grid */}
        <div className={styles.grid}>
          {solutions.map((solution, index) => (
            <FadeIn 
              key={solution.title} 
              delay={index * 0.1} 
              direction="up"
              className={styles.cardWrapper}
            >
              <SolutionCard 
                title={solution.title}
                description={solution.description}
                icon={solution.icon}
                imageUrl={solution.imageUrl}
              />
            </FadeIn>
          ))}
        </div>

      </Container>
    </Section>
  );
}
