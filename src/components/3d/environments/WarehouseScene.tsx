import React, { memo } from 'react';
import { C } from './SharedResources';
import { BulletCamera } from './CameraModels';

function Box({ pos, size, color, roughness = 0.85, metalness = 0 }:
  { pos: [number,number,number]; size: [number,number,number]; color: string; roughness?: number; metalness?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}



export const WarehouseScene = memo(function WarehouseScene() {
  return (
    <group position={[0,-0.075,0]}>
      {/* Floor */}
      <mesh position={[0,0,0]} receiveShadow>
        <boxGeometry args={[12,0.15,12]} />
        <meshStandardMaterial color={C.floor} roughness={0.9} />
      </mesh>

      {/* Main structure */}
      <Box pos={[0,2.0,0]}   size={[9,4,7]} color={C.wallDark} roughness={0.8} />
      {/* Barrel-arch roof */}
      {Array.from({length:18}, (_,i)=>(
        <mesh key={i} position={[i*0.5-4.25, 4.3, 0]} rotation={[Math.PI/2,0,0]} castShadow>
          <cylinderGeometry args={[3.7,3.7,9,32,1,true,0,Math.PI]} />
          <meshStandardMaterial color={C.roof} roughness={0.85} side={2} />
        </mesh>
      )).slice(0,1)}
      {/* Simpler arched roof as a half-cylinder */}
      <mesh position={[0,4.0,0]} rotation={[0,Math.PI/2,0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.6,3.6,9,32,1,true,0,Math.PI]} />
        <meshStandardMaterial color={C.roof} roughness={0.85} side={2} />
      </mesh>

      {/* Loading dock doors */}
      {([-2.5, 2.5] as number[]).map((x,i) => (
        <Box key={i} pos={[x, 1.2, 3.52]} size={[2.2, 2.4, 0.08]} color={C.metal} roughness={0.4} metalness={0.4} />
      ))}

      {/* Side windows near top */}
      {[-3,-1,1,3].map((x,i) => (
        <Box key={i} pos={[x, 3.2, 3.52]} size={[1.2, 0.7, 0.06]} color={C.glass} roughness={0.1} metalness={0.1} />
      ))}

      {/* Interior shelving units (visible through glass) */}
      {[-2.5, 0, 2.5].map((x,i) => (
        <Box key={i} pos={[x, 1.5, -1.0]} size={[1.5, 3, 0.3]} color={C.metal} roughness={0.5} metalness={0.3} />
      ))}

      {/* Forklift silhouette */}
      <Box pos={[-3.5, 0.5, 2]} size={[1.2,1,2]} color={C.wallDark} />
      <Box pos={[-3.5, 1.4, 2]} size={[0.2, 1.8, 0.15]} color={C.dark} />

      {/* Bullet cameras on ceiling */}
      <BulletCamera position={[-3, 3.8, 0]} rotation={[Math.PI - Math.PI/6, Math.PI/2, 0]} />
      <BulletCamera position={[ 3, 3.8, 0]} rotation={[Math.PI - Math.PI/6, -Math.PI/2, 0]} />
      <BulletCamera position={[ 0, 3.8,-2]} rotation={[Math.PI - Math.PI/6, 0, 0]} />
      <BulletCamera position={[ 0, 3.8, 2]} rotation={[Math.PI - Math.PI/6, Math.PI, 0]} />
    </group>
  );
});
