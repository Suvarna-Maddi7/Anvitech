'use client';

import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  AdaptiveDpr,
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// ── Lazy-load each scene ───────────────────────────────────────────────────────
const HouseScene     = lazy(() => import('./environments/HouseScene').then(m => ({ default: m.HouseScene })));
const OfficeScene    = lazy(() => import('./environments/OfficeScene').then(m => ({ default: m.OfficeScene })));
const WarehouseScene = lazy(() => import('./environments/WarehouseScene').then(m => ({ default: m.WarehouseScene })));
const RetailScene    = lazy(() => import('./environments/RetailScene').then(m => ({ default: m.RetailScene })));
const FarmScene      = lazy(() => import('./environments/FarmScene').then(m => ({ default: m.FarmScene })));

const SCENES: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  House:     HouseScene,
  Office:    OfficeScene,
  Warehouse: WarehouseScene,
  Retail:    RetailScene,
  Farm:      FarmScene,
};

// ── Default isometric camera ───────────────────────────────────────────────────
const DEFAULT_CAM    = new THREE.Vector3(9, 9, 9);
const DEFAULT_TARGET = new THREE.Vector3(0, 1, 0);

// ── Smooth camera reset ────────────────────────────────────────────────────────
function CameraResetter({ trigger }: { trigger: number }) {
  const { camera, invalidate } = useThree();
  const lerping = useRef(false);

  useEffect(() => {
    if (trigger > 0) lerping.current = true;
  }, [trigger]);

  useFrame(() => {
    if (!lerping.current) return;
    camera.position.lerp(DEFAULT_CAM, 0.06);
    invalidate();
    if (camera.position.distanceTo(DEFAULT_CAM) < 0.005) {
      camera.position.copy(DEFAULT_CAM);
      lerping.current = false;
    }
  });
  return null;
}

// ── Per-environment sky colours ───────────────────────────────────────────────
const SKY_COLORS: Record<string, string> = {
  House:     '#C8DDF0',   // warm residential sky
  Office:    '#BFD0E8',   // cool urban sky
  Warehouse: '#C5CDDA',   // overcast industrial
  Retail:    '#C8DFF5',   // bright open-air
  Farm:      '#B8D8EC',   // open countryside sky
};


// ── Scene contents (memo-safe because all deps are props) ─────────────────────
function SceneContents({
  activeTab,
  resetTrigger,
}: {
  activeTab: string;
  resetTrigger: number;
}) {
  const SceneComponent = SCENES[activeTab] ?? HouseScene;

  return (
    <>
      {/* ── Sky background ─────────────────────────────────────────────────── */}
      <color attach="background" args={[SKY_COLORS[activeTab] ?? '#C8DDF0']} />
      {/* ── Lighting ───────────────────────────────────────────────────────── */}
      {/* Soft, neutral key light from top-right */}
      <directionalLight
        position={[12, 20, 8]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />
      {/* Subtle fill from opposite side — prevents pitch-black shadows */}
      <directionalLight
        position={[-8, 8, -6]}
        intensity={0.3}
        color="#E8F0FF"
      />
      {/* Warm ground bounce */}
      <hemisphereLight
        args={['#F0F4FF', '#D8E0E8', 0.5]}
      />

      {/* ── Environment map — IBL only, no background override ──────────────── */}
      <ambientLight intensity={0.4} />

      {/* ── Controls ───────────────────────────────────────────────────────── */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.65}
        zoomSpeed={0.75}
        panSpeed={0.6}
        minDistance={5}
        maxDistance={24}
        minPolarAngle={Math.PI / 10}
        maxPolarAngle={(Math.PI / 2) - 0.08}
        target={DEFAULT_TARGET}
        makeDefault
      />
      <CameraResetter trigger={resetTrigger} />

      {/* ── Ground shadow — high quality soft shadow ───────────────────────── */}
      <ContactShadows
        position={[0, -0.075, 0]}
        opacity={0.28}
        scale={24}
        blur={3.5}
        far={8}
        color="#6B7280"
        frames={1}
      />

      {/* ── Lazy scene ─────────────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <SceneComponent />
      </Suspense>

      {/* Adapt pixel ratio when performance drops */}
      <AdaptiveDpr pixelated />
    </>
  );
}

// ── Public component ───────────────────────────────────────────────────────────
interface EnvironmentSceneProps { activeTab: string }

export function EnvironmentScene({ activeTab }: EnvironmentSceneProps) {
  const [visibleTab, setVisibleTab]     = useState(activeTab);
  const [fading, setFading]             = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const prevTab = useRef(activeTab);

  // Cross-fade on tab change
  useEffect(() => {
    if (activeTab === prevTab.current) return;
    prevTab.current = activeTab;
    setFading(true);
    const t = setTimeout(() => {
      setVisibleTab(activeTab);
      setFading(false);
    }, 200);
    return () => clearTimeout(t);
  }, [activeTab]);

  const handleDoubleClick = useCallback(() => setResetTrigger(n => n + 1), []);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 'inherit' }}
    >
      {/* Framer Motion cross-fade overlay */}
      <AnimatePresence>
        {fading && (
          <motion.div
            key="fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: SKY_COLORS[activeTab] ?? '#C8DDF0',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      <Canvas
        shadows="soft"
        dpr={[1, 1.5]}
        camera={{ position: [9, 9, 9], fov: 34, near: 0.5, far: 80 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <SceneContents activeTab={visibleTab} resetTrigger={resetTrigger} />
      </Canvas>

      {/* Subtle hint — disappears after a few seconds via CSS animation */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 72,
          right: 16,
          fontSize: '0.7rem',
          color: '#a1a1aa',
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '0.02em',
        }}
      >
        Double-click to reset view
      </div>
    </div>
  );
}
