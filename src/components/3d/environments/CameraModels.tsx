import React from 'react';
import * as THREE from 'three';

export function DomeCamera({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      {/* Camera body - highlighted */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 24]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, -0.12, 0]} castShadow>
        <sphereGeometry args={[0.16, 24, 16, 0, Math.PI*2, 0, Math.PI/2]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Vision Cone (Projection) */}
      <mesh position={[0, -1.6, 0]}>
        <coneGeometry args={[1.5, 3.2, 32]} />
        <meshBasicMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.12} 
          depthWrite={false} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}

export function BulletCamera({ position, rotation = [0,0,0] as [number,number,number] }:
  { position: [number,number,number]; rotation?: [number,number,number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.6, 20]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Lens cap */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.15, 0.1, 20]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Vision Cone (Projection) */}
      <mesh position={[0, 2.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[1.6, 3.6, 32]} />
        <meshBasicMaterial 
          color="#4F46E5" 
          transparent 
          opacity={0.12} 
          depthWrite={false} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </group>
  );
}
