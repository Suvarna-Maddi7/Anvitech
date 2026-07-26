import React, { memo } from 'react';
import { C } from './SharedResources';
import { DomeCamera } from './CameraModels';

// ── Reusable primitives ────────────────────────────────────────────────────────
function Box({ pos, size, color, roughness = 0.85, metalness = 0 }:
  { pos: [number,number,number]; size: [number,number,number]; color: string; roughness?: number; metalness?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Floor() {
  return <Box pos={[0,0,0]} size={[12,0.15,12]} color={C.floor} roughness={0.9} />;
}



// ── House Scene ────────────────────────────────────────────────────────────────
export const HouseScene = memo(function HouseScene() {
  return (
    <group position={[0,-0.075,0]}>
      <Floor />

      {/* Main house body */}
      <Box pos={[0,1.1,0]} size={[4.2,2.2,3.4]} color={C.wall} />

      {/* Roof — two halves of a gable */}
      <mesh position={[0,2.7,0]} rotation={[0, Math.PI/4, 0]} castShadow receiveShadow>
        <coneGeometry args={[3.0,1.4,4]} />
        <meshStandardMaterial color={C.roofDark} roughness={0.9} />
      </mesh>

      {/* Front door */}
      <Box pos={[0,0.6,1.72]} size={[0.7,1.2,0.08]} color={C.wood} />

      {/* Windows */}
      <Box pos={[-1.4,1.3,1.72]} size={[0.9,0.8,0.08]} color={C.glass} roughness={0.1} metalness={0.1} />
      <Box pos={[ 1.4,1.3,1.72]} size={[0.9,0.8,0.08]} color={C.glass} roughness={0.1} metalness={0.1} />

      {/* Side window */}
      <Box pos={[2.12,1.3,0]} size={[0.08,0.8,0.9]} color={C.glass} roughness={0.1} metalness={0.1} />

      {/* Garage */}
      <Box pos={[3.2,0.7,0.5]} size={[2,1.4,2.5]} color={C.wallDark} />
      <Box pos={[3.2,0.7,1.82]} size={[2,1.4,0.08]} color={C.metal} roughness={0.4} />

      {/* Small garden wall */}
      <Box pos={[-2.5,0.25,2.5]} size={[3,0.5,0.15]} color={C.wallDark} />
      <Box pos={[-2.5,0.25,-2.5]} size={[3,0.5,0.15]} color={C.wallDark} />

      {/* Tree trunk + canopy */}
      <Box pos={[-3.5,0.6,-2.5]} size={[0.3,1.2,0.3]} color={C.wood} />
      <mesh position={[-3.5,1.8,-2.5]} castShadow>
        <sphereGeometry args={[0.9,12,10]} />
        <meshStandardMaterial color={C.green} roughness={0.95} />
      </mesh>

      {/* Cameras */}
      <DomeCamera position={[-2.1,2.1,1.68]} />
      <DomeCamera position={[ 2.1,2.1,1.68]} />
      <DomeCamera position={[-2.1,2.1,-1.68]} />
    </group>
  );
});
