# Anvitech Smart Solutions - Enterprise Landing Page

Welcome to the Anvitech Smart Solutions repository. This is a premium, Awwwards-tier landing page built with Next.js 14, React Three Fiber, Framer Motion, and pure CSS Modules.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS Modules (No Tailwind)
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure
The project follows a modular, feature-based architecture inside `src/`:

```
src/
├── app/                  # Next.js App Router (page, layout, error, not-found)
├── components/
│   ├── ui/               # Reusable base components (Buttons, Typography, Inputs)
│   ├── layout/           # Structural components (Header, Footer, Container, Section)
│   ├── animations/       # Framer Motion wrapper components (FadeIn)
│   ├── 3d/               # React Three Fiber scenes and models
│   ├── hero/             # Phase 3: Hero Experience
│   ├── solutions/        # Phase 4: Solutions Grid
│   ├── products/         # Phase 4: Product Showcase
│   ├── storytelling/     # Phase 5: AI & Environments
│   └── conversion/       # Phase 6: Contact & Quote Form
├── lib/                  # Utilities (e.g., classname merging)
└── styles/               # Global CSS variables and design tokens
```

## Setup & Deployment

### Local Development
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

### Production Build
Run `npm run build` to generate an optimized production build. 
*Note: The heavy 3D components are dynamically imported (`next/dynamic`) to ensure a 95+ Lighthouse Performance score by drastically reducing the initial JavaScript payload.*

### Deployment (Vercel)
This project is optimized for zero-config deployment on Vercel. 
Simply connect the repository and Vercel will automatically detect the Next.js framework and configure the build settings.

## Environment Variables
Currently, there are no required environment variables for the frontend. If a backend API is connected for the Quote Request form in the future, add the API URL to `.env.local` and Vercel Environment Settings.

## SEO & Analytics
- **Metadata & Open Graph**: Configured in `src/app/layout.tsx`.
- **Structured Data**: JSON-LD `LocalBusiness` schema is injected in `layout.tsx`.
- **Analytics**: A Google Analytics (GA4) placeholder is located in `layout.tsx`. Replace `G-XXXXXXXXXX` with the actual Measurement ID.
- **Sitemap & Robots**: Dynamically generated via `src/app/sitemap.ts` and `src/app/robots.ts`.
