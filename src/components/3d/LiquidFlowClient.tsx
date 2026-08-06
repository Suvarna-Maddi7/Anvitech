'use client';

import dynamic from 'next/dynamic';

export const LiquidFlowClient = dynamic(
  () => import('./LiquidFlowCanvas').then((mod) => mod.LiquidFlowCanvas),
  { ssr: false }
);
