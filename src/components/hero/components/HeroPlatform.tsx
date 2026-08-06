'use client';

import React from 'react';
import * as THREE from 'three';

export function HeroPlatform() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* 1. Volumetric Light Cone */}
      <mesh position={[0, 0.9, 0]}>
        <coneGeometry args={[1.5, 2.0, 32, 1, true]} />
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent 
          opacity={0.05} 
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Cylinder Base Platform */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[2.0, 2.05, 0.06, 64]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Inner core */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
        <meshPhysicalMaterial 
          color="#063CBB" 
          emissive="#2563EB"
          emissiveIntensity={1.5}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
