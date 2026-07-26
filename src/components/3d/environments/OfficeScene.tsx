import React, { memo } from 'react';
import { C } from './SharedResources';
import { DomeCamera } from './CameraModels';

function Box({ pos, size, color, roughness = 0.75, metalness = 0.1 }:
  { pos: [number,number,number]; size: [number,number,number]; color: string; roughness?: number; metalness?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}



export const OfficeScene = memo(function OfficeScene() {
  return (
    <group position={[0,-0.075,0]}>
      {/* Floor */}
      <mesh position={[0,0,0]} receiveShadow>
        <boxGeometry args={[12,0.15,12]} />
        <meshStandardMaterial color={C.floor} roughness={0.9} />
      </mesh>

      {/* Main tower — glass curtain wall */}
      <Box pos={[0.5, 3.0, 0]}  size={[4.5, 6.0, 3.5]} color={C.glass}    roughness={0.08} metalness={0.3} />
      {/* Podium */}
      <Box pos={[0.5, 0.75, 0]} size={[5.5, 1.5, 4.5]} color={C.wallDark} roughness={0.7} metalness={0.05} />

      {/* Annex wing */}
      <Box pos={[-3.5, 1.5, 1]} size={[2.0, 3.0, 3.2]} color={C.wall} roughness={0.6} metalness={0.05} />
      {/* Annex roof flat */}
      <Box pos={[-3.5, 3.05, 1]} size={[2.1, 0.1, 3.3]} color={C.roofDark} />

      {/* Horizontal window strips on tower */}
      {[-1.0, 0.5, 2.0, 3.5].map((y, i) => (
        <Box key={i} pos={[0.5, y+3.0, 1.76]} size={[4.3, 0.25, 0.05]} color="#FFFFFF" roughness={0.3} metalness={0.2} />
      ))}

      {/* Entry canopy */}
      <Box pos={[3.2, 1.6, 0]} size={[1.0, 0.1, 2.5]} color={C.metal} roughness={0.4} metalness={0.5} />

      {/* Landscape planter strips */}
      <Box pos={[-1.0, 0.2,-4.0]} size={[6.0, 0.4, 0.6]} color={C.green}   roughness={0.95} />
      <Box pos={[ 4.5, 0.2,-2.0]} size={[0.6, 0.4, 4.5]} color={C.green}   roughness={0.95} />

      {/* Small trees */}
      {([[-4.0,0,2.5],[-4.0,0,0.0]] as [number,number,number][]).map(([x,y,z],i) => (
        <group key={i} position={[x,y,z]}>
          <Box pos={[0,0.4,0]} size={[0.25,0.8,0.25]} color={C.wood} />
          <mesh position={[0,1.2,0]} castShadow>
            <sphereGeometry args={[0.65,10,8]} />
            <meshStandardMaterial color={C.green} roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Cameras on tower corners */}
      <DomeCamera position={[2.7, 6.05, 1.75]} />
      <DomeCamera position={[-1.8, 6.05, 1.75]} />
      <DomeCamera position={[2.7, 6.05,-1.75]} />
    </group>
  );
});
