'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import styles from './ProjectsShowcase.module.css';

import heritageImg from '@/images/heritage.png';
import corparateImg from '@/images/corparate.png';
import logisticImg from '@/images/logistic.png';
import retailImg from '@/images/retail.png';
import institutionImg from '@/images/institution.png';

const projects = [
  {
    id: 1,
    title: 'Heritage Villa',
    location: 'Kerala Backwaters',
    type: 'Residential',
    tech: 'AI Motion, 4K',
    size: 'large',
    imageUrl: heritageImg.src
  },
  {
    id: 2,
    title: 'Corporate Headquarters',
    location: 'Bengaluru, Electronic City',
    type: 'Office',
    tech: 'Access Control, 360°',
    size: 'small',
    imageUrl: corparateImg.src
  },
  {
    id: 3,
    title: 'Logistics Facility',
    location: 'Chennai Port',
    type: 'Warehouse',
    tech: 'Thermal, Solar',
    size: 'medium',
    imageUrl: logisticImg.src
  },
  {
    id: 4,
    title: 'Retail Store',
    location: 'Bengaluru, Indiranagar',
    type: 'Commercial',
    tech: 'People Counting',
    size: 'medium',
    imageUrl: retailImg.src
  },
  {
    id: 5,
    title: 'University Campus',
    location: 'IIT Madras, Chennai',
    type: 'Institution',
    tech: 'LPR, PTZ',
    size: 'small',
    imageUrl: institutionImg.src
  },
];

export function ProjectsShowcase() {
  return (
    <Section background="surface" padding="large" className={styles.section}>
      <Container size="wide">
        
        <div className={styles.header}>
          <FadeIn direction="up">
            <Typography variant="label" className={styles.label}>Our Portfolio</Typography>
            <Typography variant="h2" className={styles.title}>
              Trusted By The Best.
            </Typography>
          </FadeIn>
        </div>

        <div className={styles.gallery}>
          {projects.map((project, index) => (
            <FadeIn 
              key={project.id} 
              delay={index * 0.1}
              className={`${styles.projectCard} ${styles[project.size]}`}
            >
              <div className={styles.imageWrapper}>
                {/* Fallback gradients if no real images are provided */}
                <div className={styles.image} style={project.imageUrl ? { backgroundImage: `url(${project.imageUrl})` } : {}} />
                <div className={styles.overlay} />
              </div>
              
              <div className={styles.infoPanel}>
                <Typography variant="h4" className={styles.projectTitle}>
                  {project.title}
                </Typography>
                <div className={styles.metaData}>
                  <span>{project.location}</span>
                  <span className={styles.dot}>•</span>
                  <span>{project.type}</span>
                </div>
                <div className={styles.techStack}>
                  <small>Tech: {project.tech}</small>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </Container>
    </Section>
  );
}
