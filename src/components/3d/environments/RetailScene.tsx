import React, { memo } from 'react';
import { C } from './SharedResources';
import { DomeCamera } from './CameraModels';

function Box({ pos, size, color, roughness = 0.8, metalness = 0 }:
  { pos: [number,number,number]; size: [number,number,number]; color: string; roughness?: number; metalness?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}



export const RetailScene = memo(function RetailScene() {
  return (
    <group position={[0,-0.075,0]}>
      {/* Floor — slightly warmer */}
      <mesh position={[0,0,0]} receiveShadow>
        <boxGeometry args={[12,0.15,12]} />
        <meshStandardMaterial color="#F4F0EC" roughness={0.9} />
      </mesh>

      {/* Storefront facade */}
      <Box pos={[0, 2.5, 0]}   size={[8,5,5.5]} color={C.wall} roughness={0.6} />
      {/* Canopy / awning */}
      <Box pos={[0, 3.6, 2.9]} size={[8.2,0.1,1.8]} color={C.accent} roughness={0.7} metalness={0.1} />

      {/* Large glass storefront */}
      <Box pos={[-1.5, 1.5, 2.78]} size={[2.5, 3.0, 0.08]} color={C.glass} roughness={0.05} metalness={0.15} />
      <Box pos={[ 2.5, 1.5, 2.78]} size={[2.5, 3.0, 0.08]} color={C.glass} roughness={0.05} metalness={0.15} />

      {/* Sign board */}
      <Box pos={[0, 4.5, 2.82]} size={[4.5, 0.6, 0.12]} color="#E0E0E0" roughness={0.3} metalness={0.2} />

      {/* Entry door */}
      <Box pos={[0.5, 1.2, 2.78]} size={[1.0, 2.4, 0.08]} color="#F8F8F8" roughness={0.2} metalness={0.3} />

      {/* Shelf displays visible through windows */}
      <Box pos={[-1.5, 0.8, 1.5]} size={[1.8, 1.6, 0.4]} color={C.metal} roughness={0.5} metalness={0.3} />
      <Box pos={[ 2.5, 0.8, 1.5]} size={[1.8, 1.6, 0.4]} color={C.metal} roughness={0.5} metalness={0.3} />

      {/* Decorative planters */}
      {([-3.5, 3.5] as number[]).map((x,i) => (
        <group key={i} position={[x, 0, 2.5]}>
          <Box pos={[0, 0.25, 0]} size={[0.6,0.5,0.6]} color="#D4C5B0" roughness={0.9} />
          <mesh position={[0, 0.7, 0]} castShadow>
            <sphereGeometry args={[0.5,10,8]} />
            <meshStandardMaterial color={C.green} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Side wings */}
      <Box pos={[ 5.5, 1.5, 0]} size={[3.0, 3.0, 5.0]} color={C.wallDark} roughness={0.75} />
      <Box pos={[-5.5, 1.5, 0]} size={[3.0, 3.0, 5.0]} color={C.wallDark} roughness={0.75} />

      {/* PTZ cameras on corners */}
      <DomeCamera position={[ 3.9, 5.05, 2.75]} />
      <DomeCamera position={[-3.9, 5.05, 2.75]} />
      <DomeCamera position={[ 3.9, 5.05,-2.75]} />
      <DomeCamera position={[-3.9, 5.05,-2.75]} />
    </group>
  );
});
