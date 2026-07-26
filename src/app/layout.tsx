import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { GlobalLoader } from '@/components/ui/GlobalLoader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Anvitech Smart Solutions | Premium AI Security',
  description: 'Next-generation security solutions powered by proprietary AI and enterprise-grade hardware. Secure your residential or commercial property today.',
  keywords: ['security cameras', 'AI security', 'CCTV installation', 'smart home security', 'enterprise surveillance'],
  openGraph: {
    title: 'Anvitech Smart Solutions',
    description: 'Next-generation security solutions powered by proprietary AI and enterprise-grade hardware.',
    url: 'https://anvitech.com',
    siteName: 'Anvitech Smart Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anvitech Smart Solutions',
    description: 'Next-generation security solutions powered by proprietary AI.',
  },
  robots: 'index, follow',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Anvitech Smart Solutions',
  image: 'https://anvitech.com/logo.png',
  description: 'Premium AI Security and Surveillance Solutions.',
  url: 'https://anvitech.com',
  telephone: '+18001234567',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Tech Park',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    postalCode: '90001',
    addressCountry: 'US'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <GlobalLoader />
        {children}
        <MobileActionBar />
        
        {/* Analytics Placeholder */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
