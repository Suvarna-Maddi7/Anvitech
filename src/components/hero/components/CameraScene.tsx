'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, ContactShadows, Sparkles, Environment } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';

import { CameraModel } from '@/components/3d/InteractiveCamera';
import { HeroPlatform } from './HeroPlatform';
import styles from '../Hero.module.css';

interface ScrolledGroupProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

function ScrolledGroup({ mouseX, mouseY, scrollYProgress }: ScrolledGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraGroupRef = useRef<THREE.Group>(null);
  const platformGroupRef = useRef<THREE.Group>(null);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    const mX = mouseX.get();
    const mY = mouseY.get();
    const scrollVal = scrollYProgress.get();

    // Mouse Parallax for the 3D visual elements
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mX * 0.15, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mY * 0.1, 0.05);
    }

    // Scroll-linked camera rotation and vertical floating loop
    if (cameraGroupRef.current) {
      cameraGroupRef.current.rotation.y = scrollVal * (Math.PI / 2.5);
      cameraGroupRef.current.position.y = Math.sin(t * 0.8) * 0.04;
      cameraGroupRef.current.rotation.z = Math.sin(t * 0.4) * 0.01;
    }

    // Scroll platform downwards
    if (platformGroupRef.current) {
      platformGroupRef.current.position.y = -scrollVal * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={cameraGroupRef}>
        <CameraModel />
      </group>
      <group ref={platformGroupRef}>
        <HeroPlatform />
      </group>
    </group>
  );
}

interface CameraSceneProps {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export function CameraScene({ springX, springY, scrollYProgress }: CameraSceneProps) {
  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        camera={{ position: [3.5, 1.8, 5.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ 
          powerPreference: 'high-performance', 
          antialias: true, 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.1 
        }}
      >
        <ambientLight intensity={0.6} />
        <spotLight
          position={[8, 12, 8]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
        />
        <spotLight position={[-5, 8, -3]} angle={0.3} penumbra={0.8} intensity={0.6} color="#c8d8ff" />
        <Environment preset="city" environmentIntensity={0.8} />

        <PresentationControls
          global
          snap={true}
          rotation={[0.1, -0.3, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI, Math.PI]}
        >
          <ScrolledGroup mouseX={springX} mouseY={springY} scrollYProgress={scrollYProgress} />
        </PresentationControls>

        <ContactShadows position={[0, -1.49, 0]} opacity={0.6} scale={20} blur={3} far={5} color="#021B4F" />
        <Sparkles count={50} scale={12} size={2.5} speed={0.3} opacity={0.12} color="#3B82F6" />
      </Canvas>
    </div>
  );
}
