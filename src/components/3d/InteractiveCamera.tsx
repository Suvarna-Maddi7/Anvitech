'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Html, PresentationControls, Sparkles, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Shield, Eye, Cloud, Zap } from 'lucide-react';
import styles from './InteractiveCamera.module.css';

interface HotspotProps {
  position: [number, number, number];
  label: string;
  icon: React.ReactNode;
}

function Hotspot({ position, label, icon }: HotspotProps) {
  return (
    <Html position={position} center>
      <div className={styles.hotspot}>
        <div className={styles.hotspotIcon}>{icon}</div>
        <div className={styles.hotspotLabel}>{label}</div>
      </div>
    </Html>
  );
}

/* Pulsing LED ring around lens */
function LEDRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 1.01]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.48, 0.015, 16, 64]} />
      <meshBasicMaterial color="#3388ff" transparent opacity={0.7} />
    </mesh>
  );
}

/* Precise focus beam cone from center of the lens */
function ScanBeam() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.5;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[1.2, 2.4, 32, 1, true]} />
      <meshBasicMaterial color="#3388ff" transparent opacity={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ShowcasePedestal() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Base cylinder */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.1, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Glowing inner ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 64]} />
        <meshBasicMaterial color="#2A91EB" />
      </mesh>
      {/* Dark glass top */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[1.95, 1.95, 0.02, 64]} />
        <meshPhysicalMaterial 
          color="#0a1128" 
          metalness={0.9} 
          roughness={0.05} 
          transmission={0.5} 
          thickness={0.5} 
        />
      </mesh>
    </group>
  );
}

function BackgroundElements() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group>
      {/* Infinite floor grid */}
      <Grid 
        position={[0, -1.8, 0]} 
        args={[40, 40]} 
        cellSize={1} 
        cellThickness={1} 
        cellColor="#e6f0fa" 
        sectionSize={5} 
        sectionThickness={1.5} 
        sectionColor="#d0e2ff" 
        fadeDistance={25} 
        fadeStrength={1} 
      />
      
      {/* Ambient background rings to fill empty space */}
      <group ref={ringsRef} position={[0, 0, -8]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[8, 0.03, 16, 100]} />
          <meshBasicMaterial color="#2A91EB" transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 3, 0]}>
          <torusGeometry args={[12, 0.02, 16, 120]} />
          <meshBasicMaterial color="#15479E" transparent opacity={0.15} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, -Math.PI / 6, 0]}>
          <torusGeometry args={[16, 0.015, 16, 150]} />
          <meshBasicMaterial color="#9ACCF9" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
}

export function CameraModel() {
  const domeRef = useRef<THREE.Group>(null);

  const irisSegments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < 8; i++) segs.push((i * Math.PI * 2) / 8);
    return segs;
  }, []);

  useFrame((state) => {
    if (domeRef.current) {
      const targetX = state.pointer.x * (Math.PI / 4);
      const targetY = state.pointer.y * (Math.PI / 6);
      domeRef.current.rotation.y = THREE.MathUtils.lerp(domeRef.current.rotation.y, -targetX, 0.05);
      domeRef.current.rotation.x = THREE.MathUtils.lerp(domeRef.current.rotation.x, targetY, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>

      {/* ═══ WALL MOUNT PLATE (Vertical) ═══ */}
      <mesh position={[0, 0.8, -1.6]} castShadow>
        <boxGeometry args={[0.7, 0.7, 0.08]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Screws */}
      {[[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].map((p, i) => (
        <mesh key={`screw-${i}`} position={[p[0], 0.8 + p[1], -1.55]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
          <meshStandardMaterial color="#b0b5bb" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* ═══ BRACKET ARM (Flush connections, no gaps) ═══ */}
      {/* Horizontal pipe extending from wall plate */}
      <mesh position={[0, 0.8, -1.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.25} />
      </mesh>
      {/* Wall plate collar flange */}
      <mesh position={[0, 0.8, -1.52]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* 90-degree corner elbow joint */}
      <mesh position={[0, 0.8, -0.4]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.3} />
      </mesh>
      {/* Vertical dropshaft down to camera top */}
      <mesh position={[0, 0.55, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.25} />
      </mesh>
      {/* Bell-shaped camera cap connector (mounts flush into top of dome) */}
      <mesh position={[0, 0.28, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.24, 0.12, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.6} />
      </mesh>

      <group ref={domeRef}>
      {/* ═══ CAMERA DOME BODY (Slightly offset to accommodate mount at rear/top) ═══ */}
      {/* Rotational mount base ring */}
      <mesh position={[0, 0.18, -0.4]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.08, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.15} metalness={0.7} />
      </mesh>
      
      {/* Main Dome sphere */}
      <mesh position={[0, -0.1, -0.4]} castShadow>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* ═══ LENS ASSEMBLY (Perfect Z alignment, no tilt gaps) ═══ */}
      {/* Recessed bezel in camera front */}
      <mesh position={[0, -0.1, 0.42]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.54, 0.56, 0.2, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      {/* Inner lens ring */}
      <mesh position={[0, -0.1, 0.51]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.46, 0.51, 0.06, 32]} />
        <meshPhysicalMaterial
          color="#1a1e28"
          roughness={0.1}
          metalness={0.98}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      {/* Chrome bezel rim */}
      <mesh position={[0, -0.1, 0.44]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.01, 8, 32]} />
        <meshStandardMaterial color="#c8cdd5" roughness={0.05} metalness={0.95} />
      </mesh>

      {/* ═══ LENS GLASS (Multi-layer structure) ═══ */}
      {/* Convex lens glass */}
      <mesh position={[0, -0.1, 0.54]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshPhysicalMaterial
          color="#050510"
          metalness={0.4}
          roughness={0.02}
          transmission={0.6}
          thickness={1.5}
          ior={1.8}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2}
        />
      </mesh>
      {/* Inner aperture backing */}
      <mesh position={[0, -0.1, 0.51]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.8]} />
        <meshPhysicalMaterial
          color="#000008"
          metalness={0.8}
          roughness={0.01}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      {/* Iris pattern */}
      {irisSegments.map((angle, i) => (
        <mesh
          key={`iris-${i}`}
          position={[
            Math.cos(angle) * 0.22,
            -0.1 + Math.sin(angle) * 0.22,
            0.53,
          ]}
        >
          <boxGeometry args={[0.015, 0.08, 0.003]} />
          <meshStandardMaterial color="#111118" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}

      {/* ═══ RING OF IR LEDs ═══ */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const r = 0.48;
        return (
          <mesh
            key={`ir-${i}`}
            position={[
              Math.cos(angle) * r,
              -0.1 + Math.sin(angle) * r,
              0.45,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#3a0000' : '#1a0000'}
              roughness={0.3}
              metalness={0.5}
              emissive={i % 3 === 0 ? '#440000' : '#1a0000'}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* ═══ STATUS INDICATORS ═══ */}
      <mesh position={[0.38, 0.2, 0.44]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#3388ff" />
        <pointLight color="#235789" intensity={1.2} distance={1.2} />
      </mesh>
      <mesh position={[-0.38, 0.2, 0.44]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#00cc44" />
        <pointLight color="#00cc44" intensity={0.5} distance={0.5} />
      </mesh>

      {/* Animated LEDs & Beams aligned perfectly to center lens */}
      <group position={[0, -0.1, 0.54]}>
        <LEDRing />
        <ScanBeam />
      </group>

      {/* Hotspots mapped correctly to components */}
      <Hotspot position={[0, -0.1, 1.4]} label="4K Ultra HD" icon={<Eye size={14} />} />
      <Hotspot position={[0, 0.9, -1.0]} label="IP67 Weatherproof" icon={<Shield size={14} />} />
      <Hotspot position={[-1.2, -0.1, -0.4]} label="Cloud Storage" icon={<Cloud size={14} />} />
      <Hotspot position={[1.2, -0.4, 0]} label="AI Motion Tracking" icon={<Zap size={14} />} />
      </group>
    </group>
  );
}

export function InteractiveCamera() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [3.5, 1.8, 5.5], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[8, 12, 8]}
            angle={0.2}
            penumbra={1}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
            color="#ffffff"
          />
          <spotLight position={[-5, 8, -3]} angle={0.3} penumbra={0.8} intensity={0.6} color="#c8d8ff" />
          <pointLight position={[-8, -5, -8]} intensity={0.2} color="#ffeedd" />
          <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#e8f0ff" />
          
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.0} color="#ffffff" castShadow />
          
          <Environment preset="city" environmentIntensity={0.8} />

          <PresentationControls
            global
            snap={true}
            rotation={[0.1, -0.3, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI, Math.PI]}
          >
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
              <CameraModel />
            </Float>
          </PresentationControls>

          <BackgroundElements />
          <ShowcasePedestal />
          <ContactShadows position={[0, -1.79, 0]} opacity={0.7} scale={20} blur={3} far={5} color="#0a1128" />
          <Sparkles count={80} scale={14} size={3} speed={0.3} opacity={0.15} color="#2A91EB" />
        </Suspense>
      </Canvas>
    </div>
  );
}
