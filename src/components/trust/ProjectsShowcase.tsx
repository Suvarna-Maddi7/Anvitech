'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import styles from './ProjectsShowcase.module.css';

const projects = [
  {
    id: 1,
    title: 'Luxury Residence',
    location: 'Beverly Hills',
    type: 'Residential',
    tech: 'AI Motion, 4K',
    size: 'large',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Corporate HQ',
    location: 'Downtown',
    type: 'Office',
    tech: 'Access Control, 360°',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Logistics Center',
    location: 'Industrial Park',
    type: 'Warehouse',
    tech: 'Thermal, Solar',
    size: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Retail Flagship',
    location: 'High Street',
    type: 'Commercial',
    tech: 'People Counting',
    size: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'University Campus',
    location: 'Westwood',
    type: 'Institution',
    tech: 'LPR, PTZ',
    size: 'small',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
  },
];

export function ProjectsShowcase() {
  return (
    <Section background="surface" padding="large">
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
