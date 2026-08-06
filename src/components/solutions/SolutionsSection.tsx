'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Typography } from '@/components/ui/Typography';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArrowUpRight } from 'lucide-react';

import { SolutionCard } from './SolutionCard';
import styles from './SolutionsSection.module.css';
import { Camera, Shield, Video, Eye, Scan, MonitorPlay } from 'lucide-react';

// Original desktop products list (do not touch desktop view)
const desktopProducts = [
  {
    title: 'CP PLUS 4MP Smart Wi-Fi PTZ',
    description: '360° Pan & Tilt camera with CTC Cyber Secure Tech, smart detection suite, and IR night vision.',
    icon: <Camera size={24} />,
    imageUrl: '/products/cc1.png',
  },
  {
    title: 'CP PLUS Full HD Bullet Cam',
    description: 'Rugged, weatherproof outdoor bullet camera designed for harsh environments with long-range IR.',
    icon: <Shield size={24} />,
    imageUrl: '/products/cc2.png',
  },
  {
    title: 'CP PLUS 3MP Guard Dome',
    description: 'Discreet, high-definition dome camera perfect for indoor spaces, offices, and modern apartments.',
    icon: <Video size={24} />,
    imageUrl: '/products/cc3.png',
  },
  {
    title: 'CP PLUS 4G SIM Based PTZ',
    description: 'Standalone 4G camera requiring no Wi-Fi. Features advanced human detection and auto-tracking.',
    icon: <MonitorPlay size={24} />,
    imageUrl: '/products/cc4.png',
  },
  {
    title: 'CP PLUS EzyKam Mini',
    description: 'Tiny, elegant indoor Wi-Fi camera tailored for home surveillance, privacy, and two-way talk.',
    icon: <Eye size={24} />,
    imageUrl: '/products/cc5.png',
  },
  {
    title: 'CP PLUS Color Vision Pro',
    description: 'Advanced dual-light technology capturing vivid color details even in zero-light night conditions.',
    icon: <Scan size={24} />,
    imageUrl: '/products/cc6.png',
  }
];

// Premium Mobile Products (swipeable carousel content)
const mobileProducts = [
  {
    title: 'CP PLUS Full HD Dome Camera',
    description: 'Crystal-clear monitoring with AI-powered detection and ultra-low-light performance.',
    imageUrl: '/products/cc3.png',
    badge: 'Best Seller',
    price: '₹2,999',
    features: ['📹 Full HD', '🌙 Night Vision', '🤖 AI Detection']
  },
  {
    title: 'CP PLUS Full HD Bullet Camera',
    description: 'Rugged weatherproof protection with long-range infrared night vision for outdoor security.',
    imageUrl: '/products/cc2.png',
    badge: '5 Year Warranty',
    price: '₹3,499',
    features: ['🌧 IP67 Waterproof', '🌙 Night Vision', '🤖 AI Detection']
  },
  {
    title: 'CP PLUS PTZ Speed Dome',
    description: 'Complete 360-degree pan-tilt coverage with automatic motion tracking and optical zoom.',
    imageUrl: '/products/cc1.png',
    badge: 'Smart Detection',
    price: '₹5,999',
    features: ['🎯 Motion Tracking', '📹 Full HD', '☁ Cloud Ready']
  },
  {
    title: 'CP PLUS 8 Channel NVR',
    description: 'Advanced network video recorder supporting up to 8MP high-resolution recording and cloud sync.',
    imageUrl: '/products/cc4.png',
    badge: 'AI Ready',
    price: '₹8,999',
    features: ['☁ Cloud Ready', '🤖 AI Detection', '💾 High Storage']
  }
];

export function SolutionsSection() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.85;
    const index = Math.round(scrollPosition / itemWidth);
    if (index !== activeMobileIndex && index >= 0 && index < mobileProducts.length) {
      setActiveMobileIndex(index);
    }
  };

  return (
    <Section background="surface" padding="large" className={styles.section}>
      {/* 1. Desktop View (Original grid unchanged) */}
      <div className={styles.desktopViewOnly}>
        <Container size="default">
          <div className={styles.header}>
            <FadeIn direction="up">
              <Typography variant="label" className={styles.label}>Our Products</Typography>
              <Typography variant="h2" className={styles.title}>
                Advanced Hardware <br /> For Complete Security.
              </Typography>
            </FadeIn>
          </div>

          <div className={styles.grid}>
            {desktopProducts.map((product, index) => (
              <FadeIn 
                key={product.title} 
                delay={index * 0.1} 
                direction="up"
                className={styles.cardWrapper}
              >
                <SolutionCard 
                  title={product.title}
                  description={product.description}
                  icon={product.icon}
                  imageUrl={product.imageUrl}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </div>

      {/* 2. Premium Mobile View (Horizontally swipeable product carousel) */}
      <div className={styles.mobileViewOnly}>
        {/* Subtle Background Effects */}
        <div className={styles.mobileBackgroundEffects}>
          <div className={styles.gridOverlay} />
          <div className={styles.circleBlob} />
        </div>

        <div className={styles.mobileHeaderWrapper}>
          <div className={styles.badgeLine}>
            <span className={styles.badgeText}>OUR PRODUCTS</span>
            <span className={styles.badgeLineAccent} />
          </div>
          
          <div className={styles.titleRow}>
            <h2 className={styles.mobileTitle}>
              Enterprise Security<br />Solutions
            </h2>
            <div className={styles.filterChip}>
              All Products ▼
            </div>
          </div>
          
          <p className={styles.mobileSubtitle}>
            Choose the right surveillance solution for your home, office, retail store, factory, hospital, or enterprise.
          </p>
        </div>

        {/* Carousel Container */}
        <div className={styles.carouselContainer} onScroll={handleMobileScroll}>
          {mobileProducts.map((product, index) => {
            const isCenter = activeMobileIndex === index;
            return (
              <div 
                key={product.title}
                className={`${styles.mobileProductCardWrapper} ${isCenter ? styles.cardCenter : styles.cardPeeking}`}
              >
                <div className={styles.mobileProductCard}>
                  {/* Top-right corner Arrow Button */}
                  <div className={styles.circleArrowBtn}>
                    <ArrowUpRight size={18} />
                  </div>

                  {/* Badge */}
                  {product.badge && (
                    <div className={styles.cardBadge}>
                      {product.badge}
                    </div>
                  )}

                  {/* Top half: Centered Image */}
                  <div className={styles.imageContainer}>
                    <img src={product.imageUrl} alt={product.title} className={styles.productImg} />
                    <div className={styles.floatingShadow} />
                  </div>

                  {/* Bottom section */}
                  <div className={styles.detailsSection}>
                    <h3 className={styles.mobileProductName}>{product.title}</h3>
                    <p className={styles.mobileProductDesc}>{product.description}</p>
                    
                    {/* Feature Pills */}
                    <div className={styles.featurePillsContainer}>
                      {product.features.map((feat, fIdx) => (
                        <span key={fIdx} className={styles.featurePill}>
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Price & CTA Area */}
                    <div className={styles.cardBottomRow}>
                      <div className={styles.priceCol}>
                        <span className={styles.startingText}>Starting from</span>
                        <span className={styles.priceText}>{product.price}</span>
                      </div>
                      <button className={styles.detailsBtn}>
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Pagination Indicators */}
        <div className={styles.pagination}>
          {mobileProducts.map((_, idx) => (
            <div 
              key={idx} 
              className={`${styles.paginationBar} ${activeMobileIndex === idx ? styles.paginationBarActive : ''}`} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
