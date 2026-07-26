import React, { memo } from 'react';
import { C } from './SharedResources';
import { BulletCamera } from './CameraModels';

function Box({ pos, size, color, roughness = 0.9, metalness = 0 }:
  { pos: [number,number,number]; size: [number,number,number]; color: string; roughness?: number; metalness?: number }) {
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}



function Tree({ position }: { position: [number,number,number] }) {
  return (
    <group position={position}>
      <Box pos={[0,0.7,0]} size={[0.3,1.4,0.3]} color={C.wood} />
      <mesh position={[0,1.8,0]} castShadow>
        <coneGeometry args={[0.8,2.2,8]} />
        <meshStandardMaterial color="#8FAF88" roughness={0.95} />
      </mesh>
      <mesh position={[0,2.8,0]} castShadow>
        <coneGeometry args={[0.55,1.6,8]} />
        <meshStandardMaterial color="#7A9E72" roughness={0.95} />
      </mesh>
    </group>
  );
}

export const FarmScene = memo(function FarmScene() {
  return (
    <group position={[0,-0.075,0]}>
      {/* Ground — earthy green */}
      <mesh position={[0,0,0]} receiveShadow>
        <boxGeometry args={[12,0.15,12]} />
        <meshStandardMaterial color="#D4DEC8" roughness={0.95} />
      </mesh>

      {/* Farmhouse */}
      <Box pos={[-1.5, 1.1, -1.0]} size={[4,2.2,3.2]} color="#F5EEE4" roughness={0.85} />
      <mesh position={[-1.5, 2.6, -1.0]} rotation={[0,Math.PI/4,0]} castShadow receiveShadow>
        <coneGeometry args={[2.8, 1.3, 4]} />
        <meshStandardMaterial color="#B04A3A" roughness={0.9} />
      </mesh>

      {/* Barn */}
      <Box pos={[3.5, 1.5, 0.5]} size={[4, 3, 5.5]} color="#C0453A" roughness={0.9} />
      {/* Barn arch roof */}
      <mesh position={[3.5,3.0,0.5]} rotation={[0,Math.PI/2,0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.2,2.2,4.2,20,1,true,0,Math.PI]} />
        <meshStandardMaterial color="#A03828" roughness={0.9} side={2} />
      </mesh>
      {/* Barn door */}
      <Box pos={[3.5,1.2,3.3]} size={[2,2.4,0.08]} color="#8B6050" roughness={0.9} />

      {/* Fence rows */}
      {[-4,-2.5,-1,0,1,2.5,4].map((x,i) => (
        <group key={i}>
          <Box pos={[x, 0.5,-4.5]} size={[0.1,1.0,0.1]} color={C.wood} />
          <Box pos={[x, 0.5, 4.5]} size={[0.1,1.0,0.1]} color={C.wood} />
        </group>
      ))}
      <Box pos={[0,0.65,-4.5]} size={[8,0.1,0.1]} color={C.wood} />
      <Box pos={[0,0.65, 4.5]} size={[8,0.1,0.1]} color={C.wood} />
      <Box pos={[-4.5,0.65,0]} size={[0.1,0.1,9]} color={C.wood} />
      <Box pos={[ 5.0,0.65,0]} size={[0.1,0.1,9]} color={C.wood} />

      {/* Crop rows (low boxes) */}
      {[-2,-1,0,1].map((z,i) => (
        <Box key={i} pos={[-1.0, 0.2, z*1.2-1.5]} size={[2.5,0.4,0.8]} color="#7A9E60" roughness={0.95} />
      ))}

      {/* Trees on the far edge */}
      <Tree position={[-4.5, 0, -3.5]} />
      <Tree position={[-4.5, 0,  0.5]} />
      <Tree position={[-4.5, 0,  3.5]} />

      {/* Silo */}
      <mesh position={[5.5, 2.5, -2.5]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.9, 5, 18]} />
        <meshStandardMaterial color="#D8CABA" roughness={0.9} />
      </mesh>
      <mesh position={[5.5, 5.2, -2.5]} castShadow>
        <coneGeometry args={[1.0, 1.2, 18]} />
        <meshStandardMaterial color="#C0B0A0" roughness={0.9} />
      </mesh>

      {/* Wide-area cameras on tall poles */}
      <group position={[-3.5,0,-3.5]}>
        <Box pos={[0,2.5,0]} size={[0.12,5,0.12]} color="#C8C8C8" roughness={0.5} metalness={0.3} />
        <BulletCamera position={[0,5.1,0]} rotation={[Math.PI - Math.PI/4, -Math.PI/4, 0]} />
      </group>
      <group position={[3.5,0,-3.5]}>
        <Box pos={[0,2.5,0]} size={[0.12,5,0.12]} color="#C8C8C8" roughness={0.5} metalness={0.3} />
        <BulletCamera position={[0,5.1,0]} rotation={[Math.PI - Math.PI/4, Math.PI/4, 0]} />
      </group>
      <group position={[-3.5,0,3.5]}>
        <Box pos={[0,2.5,0]} size={[0.12,5,0.12]} color="#C8C8C8" roughness={0.5} metalness={0.3} />
        <BulletCamera position={[0,5.1,0]} rotation={[Math.PI - Math.PI/4, -Math.PI*0.75, 0]} />
      </group>
    </group>
  );
});
