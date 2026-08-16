'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Mouse tracking
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });
}

const DROPLET_SIZES = [
  0.12, 0.15, 0.09, 0.18, 0.11, 0.14, 0.17, 0.10
];

function LiquidRibbon() {
  const mainMeshRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const secondaryMeshRef = useRef<THREE.Mesh>(null);
  
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  const velocity = useRef(0);
  const lastScrollPos = useRef(0);
  const lastScrollTime = useRef(0);

  // Curves for ribbons
  const mainCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(6, 3, -3),
      new THREE.Vector3(3, 1, -1),
      new THREE.Vector3(1, -0.2, 0),
      new THREE.Vector3(-1.5, -0.6, 1),
      new THREE.Vector3(-3, -2, -2),
      new THREE.Vector3(-1, -4.5, -3)
    ]);
  }, []);

  const secondaryCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(5, 2.5, -2.5),
      new THREE.Vector3(2.5, 0.8, -0.8),
      new THREE.Vector3(0.8, -0.4, 0.2),
      new THREE.Vector3(-1.8, -0.8, 1.2),
      new THREE.Vector3(-2.8, -2.2, -1.8),
      new THREE.Vector3(-0.8, -4.8, -2.8)
    ]);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastScrollTime.current;
      lastScrollTime.current = now;

      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      
      // Directly map scroll percentage (0 to 1) to vertical unit offset (0 to -65)
      targetScrollY.current = progress * -65.0;

      if (dt > 0) {
        velocity.current = (currentScroll - lastScrollPos.current) / dt;
      }
      lastScrollPos.current = currentScroll;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize position
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    // Smooth scroll position
    currentScrollY.current = THREE.MathUtils.damp(currentScrollY.current, targetScrollY.current, 5, delta);

    // Smooth mouse coordinates
    mouse.x = THREE.MathUtils.lerp(mouse.x, mouse.targetX, 0.05);
    mouse.y = THREE.MathUtils.lerp(mouse.y, mouse.targetY, 0.05);

    // Dampen velocity
    velocity.current = THREE.MathUtils.damp(velocity.current, 0, 4, delta);
    const v = velocity.current * 0.4;

    // Calculate dynamic horizontal swing (X offset) based on vertical position
    // As it scrolls down, we make it snake left/right across sections
    const progressFactor = currentScrollY.current / -65.0;
    const dynamicX = Math.sin(progressFactor * Math.PI * 3.5) * 2.5;

    [mainMeshRef, coreMeshRef, secondaryMeshRef].forEach((ref) => {
      if (!ref.current) return;
      
      // Apply smooth vertical translation (scroll position)
      ref.current.position.y = currentScrollY.current;

      // Apply dynamic horizontal snaking path + mouse offset
      ref.current.position.x = dynamicX + mouse.x * 0.35;
      ref.current.position.z = mouse.y * 0.2;

      // Idle breathing and rotation
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.06;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.03;

      // Elastic stretch and squeeze physics based on scroll velocity
      const stretch = 1 + Math.abs(v) * 2.2;
      const squeeze = 1 / (1 + Math.abs(v) * 0.9);
      ref.current.scale.set(squeeze, stretch, squeeze);
    });
  });

  return (
    <group>
      {/* 1. Main outer refractive liquid glass shell */}
      <mesh ref={mainMeshRef}>
        <tubeGeometry args={[mainCurve, 120, 0.45, 12, false]} />
        <MeshTransmissionMaterial
          backside
          samples={1}
          resolution={512}
          thickness={0.6}
          roughness={0.08}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          transmission={0.94}
          ior={1.42}
          color="#2563EB"
          attenuationDistance={1.0}
          attenuationColor="#ffffff"
        />
      </mesh>

      {/* 2. Inner glow core */}
      <mesh ref={coreMeshRef}>
        <tubeGeometry args={[mainCurve, 100, 0.15, 8, false]} />
        <meshPhysicalMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 3. Secondary dynamic ribbon wrapping */}
      <mesh ref={secondaryMeshRef}>
        <tubeGeometry args={[secondaryCurve, 80, 0.12, 6, false]} />
        <MeshTransmissionMaterial
          samples={1}
          resolution={256}
          thickness={0.2}
          roughness={0.05}
          ior={1.35}
          color="#60A5FA"
          transmission={0.92}
          chromaticAberration={0.05}
          clearcoat={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 4. Floating droplets around the main stream */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[
              Math.sin(i * 1.5) * 2.0 - 0.5,
              Math.cos(i * 2.0) * 3.0 - 1.0,
              Math.sin(i * 3.0) * 1.5
            ]}>
              <sphereGeometry args={[DROPLET_SIZES[i], 16, 16]} />
              <meshPhysicalMaterial
                color="#3D73FF"
                roughness={0.02}
                transmission={0.9}
                thickness={0.5}
                ior={1.4}
                clearcoat={1.0}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

export function LiquidFlowCanvas() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={4} color="#ffffff" />
        <directionalLight position={[-5, -10, -5]} intensity={2} color="#1E4FFF" />
        <pointLight position={[2, 2, 4]} intensity={3} color="#6A9BFF" />
        <Environment preset="city" />
        <LiquidRibbon />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  );
}
