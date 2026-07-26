import React from 'react';
import dynamic from 'next/dynamic';
import { SectionLoader } from '@/components/ui/SectionLoader';

import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/hero/Hero';
import { Footer } from '@/components/layout/Footer';

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
        <Hero />
        
        {/* Phase 4: Core Experience (Lazy Loaded) */}
        <SolutionsSection />
        <ProductShowcase />
        <WhyAnvitech />
        
        {/* Phase 5: Immersive Storytelling (Lazy Loaded) */}
        <SmartEnvironments />
        <AIDemonstration />
        <MobileAppShowcase />
        
        {/* Phase 6: Trust & Conversion Experience (Lazy Loaded) */}
        <ProjectsShowcase />
        <TrustStats />
        <ProcessTimeline />
        <ConversionSection />
        
      </main>
      <Footer />
    </>
  );
}
