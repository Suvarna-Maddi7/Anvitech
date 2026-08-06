import React from 'react';
import dynamic from 'next/dynamic';
import { SectionLoader } from '@/components/ui/SectionLoader';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/hero/Hero';
import { Footer } from '@/components/layout/Footer';
import { FadeIn } from '@/components/animations/FadeIn';

// Lazy Loaded Components
const SolutionsSection = dynamic(() => import('@/components/solutions/SolutionsSection').then(m => m.SolutionsSection), { loading: () => <SectionLoader message="Loading solutions..." /> });
const ProductShowcase = dynamic(() => import('@/components/products/ProductShowcase').then(m => m.ProductShowcase), { loading: () => <SectionLoader message="Loading products..." /> });
const WhyAnvitech = dynamic(() => import('@/components/storytelling/WhyAnvitech').then(m => m.WhyAnvitech), { loading: () => <SectionLoader message="Loading..." /> });
const SmartEnvironments = dynamic(() => import('@/components/storytelling/SmartEnvironments').then(m => m.SmartEnvironments), { loading: () => <SectionLoader message="Loading environments..." /> });
const AIDemonstration = dynamic(() => import('@/components/storytelling/AIDemonstration').then(m => m.AIDemonstration), { loading: () => <SectionLoader message="Loading demonstration..." /> });
const MobileAppShowcase = dynamic(() => import('@/components/storytelling/MobileAppShowcase').then(m => m.MobileAppShowcase), { loading: () => <SectionLoader message="Loading app features..." /> });
const ProjectsShowcase = dynamic(() => import('@/components/trust/ProjectsShowcase').then(m => m.ProjectsShowcase), { loading: () => <SectionLoader message="Loading projects..." /> });
const TrustStats = dynamic(() => import('@/components/trust/TrustStats').then(m => m.TrustStats), { loading: () => <SectionLoader /> });
const ProcessTimeline = dynamic(() => import('@/components/trust/ProcessTimeline').then(m => m.ProcessTimeline), { loading: () => <SectionLoader /> });
const ConversionSection = dynamic(() => import('@/components/conversion/ConversionSection').then(m => m.ConversionSection), { loading: () => <SectionLoader /> });

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Above the Fold (Eagerly Loaded) */}
        <div id="hero"><FadeIn direction="none" duration={1}><Hero /></FadeIn></div>
        
        {/* Phase 4: Core Experience (Lazy Loaded) */}
        <div id="solutions"><FadeIn><SolutionsSection /></FadeIn></div>
        <div id="product"><FadeIn direction="left"><ProductShowcase /></FadeIn></div>
        <div id="why"><FadeIn direction="right"><WhyAnvitech /></FadeIn></div>
        
        {/* Phase 5: Immersive Storytelling (Lazy Loaded) */}
        <div id="environments"><FadeIn><SmartEnvironments /></FadeIn></div>
        <div id="demonstration"><FadeIn direction="left"><AIDemonstration /></FadeIn></div>
        <div id="mobileapp"><FadeIn direction="right"><MobileAppShowcase /></FadeIn></div>
        
        {/* Phase 6: Trust & Conversion Experience (Lazy Loaded) */}
        <div id="projects"><FadeIn><ProjectsShowcase /></FadeIn></div>
        <div id="stats"><FadeIn direction="up"><TrustStats /></FadeIn></div>
        <div id="timeline"><FadeIn direction="left"><ProcessTimeline /></FadeIn></div>
        <div id="conversion"><FadeIn direction="up"><ConversionSection /></FadeIn></div>
        
      </main>
      <Footer />
    </>
  );
}
