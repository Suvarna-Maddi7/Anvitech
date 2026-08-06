'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from '../Hero.module.css';

interface HeroBackgroundSVGProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  leftScale: MotionValue<number>;
}

export function HeroBackgroundSVG({ springX, springY, leftScale }: HeroBackgroundSVGProps) {
  // Layer 1: Handcrafted premium shape with slight mouse-parallax morphing (2-4px max)
  const pathD = useTransform(
    [springX, springY],
    ([x, y]) => {
      const oX = (x as number) * 3; // 3px max deformation
      const oY = (y as number) * 3;
      return `M 0,0 L ${42 + oX},0 C ${46 + oX},${12 + oY} ${58 + oX},${24 + oY} ${44 + oX},${44 + oY} C ${32 + oX},${60 + oY} ${48 + oX},${76 + oY} ${40 + oX},100 L 0,100 Z`;
    }
  );

  // Curved edge path (for border glows and animated light traveler)
  const edgeD = useTransform(
    [springX, springY],
    ([x, y]) => {
      const oX = (x as number) * 3;
      const oY = (y as number) * 3;
      return `M ${42 + oX},0 C ${46 + oX},${12 + oY} ${58 + oX},${24 + oY} ${44 + oX},${44 + oY} C ${32 + oX},${60 + oY} ${48 + oX},${76 + oY} ${40 + oX},100`;
    }
  );

  return (
    <motion.div 
      className={styles.leftPanel}
      style={{ scale: leftScale }}
    >
      <svg 
        className={styles.edgeOverlay} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Main Dark Navy Blue Gradient (Layer 1) */}
          <linearGradient id="blueBaseGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#021B4F" />
            <stop offset="50%" stopColor="#063CBB" />
            <stop offset="100%" stopColor="#0A57F5" />
          </linearGradient>

          {/* Soft Radial Lighting (Layer 2) */}
          <radialGradient id="radialHighlight" cx="30%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#063CBB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#021B4F" stopOpacity="0" />
          </radialGradient>

          {/* Electric Blue Edge Glow Gradient (Layer 4) */}
          <linearGradient id="edgeGlowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Gaussian Blur Filter for bloom effect */}
          <filter id="bloomFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur1" />
            <feGaussianBlur stdDeviation="4.0" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Dark Gradient Base */}
        <motion.path d={pathD} fill="url(#blueBaseGrad)" />

        {/* Layer 2: Soft Radial Highlight */}
        <motion.path d={pathD} fill="url(#radialHighlight)" />

        {/* Layer 4: 2px Glowing Edge */}
        <motion.path
          d={edgeD}
          fill="none"
          stroke="url(#edgeGlowGrad)"
          strokeWidth={2}
          filter="url(#bloomFilter)"
          className="hidden lg:block"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />

        {/* Layer 5: White Highlight Stroke */}
        <motion.path
          d={edgeD}
          fill="none"
          stroke="#ffffff"
          strokeWidth={0.75}
          opacity="0.85"
          className="hidden lg:block"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />

        {/* Layer 6: Animated Travelling Light Dot */}
        <g className="hidden lg:block">
          <circle r="0.9" fill="#ffffff" filter="url(#bloomFilter)">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#travelPath" />
            </animateMotion>
          </circle>
          <circle r="0.5" fill="#60A5FA">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#travelPath" />
            </animateMotion>
          </circle>
        </g>

        {/* Invisible path wrapper for animateMotion path reference */}
        <path id="travelPath" d="M 42,0 C 46,12 58,24 44,44 C 32,60 48,76 40,100" fill="none" opacity="0" />
      </svg>
    </motion.div>
  );
}
