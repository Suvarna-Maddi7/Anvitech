'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

interface CircularStageProps {
  children?: React.ReactNode;
}

function StageElements({ children }: CircularStageProps) {
  const stageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (stageRef.current) {
      stageRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      
      {/* The Circular Platform */}
      <mesh ref={stageRef} position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[3, 3, 0.1, 64]} />
        <meshStandardMaterial 
          color="#F8F9FA" 
          roughness={0.2} 
          metalness={0.8}
        />
      </mesh>

      {/* Floating Elements / Products go here */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {children || (
          <mesh position={[0, 0, 0]} castShadow>
            <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
            <meshStandardMaterial color="#235789" roughness={0.1} metalness={0.5} />
          </mesh>
        )}
      </Float>

      <ContactShadows position={[0, -1.01, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <ambientLight intensity={0.5} />
    </>
  );
}

export function CircularStage({ children }: CircularStageProps) {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative', touchAction: 'none' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true }}
      >
        <PresentationControls 
          global 
          snap={true}
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <StageElements>{children}</StageElements>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
