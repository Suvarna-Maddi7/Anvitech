'use client';

import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, PresentationControls, useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

/* ── Pulsing LED ── */
function PulsingLED({ position, color = '#235789', active = false }: { position: [number, number, number]; color?: string; active?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      if (active) {
        mat.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 15) * 0.2; // Fast blink
      } else {
        mat.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
      }
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
      <pointLight color={color} intensity={active ? 2 : 1} distance={1} />
    </mesh>
  );
}

// ── Feature 0: AI Motion Detection (Bounding Boxes & Scan) ──
function AIMotionDetection({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!active || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(t * 2) * 1.5;
  });

  if (!active) return null;
  return (
    <group position={[2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Target box */}
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[0.8, 1.8, 0.4]} />
          <meshBasicMaterial color="#4F46E5" wireframe transparent opacity={0.3} />
        </mesh>
        {/* Bounding box UI */}
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[0.9, 1.9]} />
          <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.8} />
        </mesh>
      </group>
      
      {/* Scanning laser plane */}
      <mesh position={[0, 0, 0.5]}>
        <planeGeometry args={[4, 3]} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ── Feature 2: Color Night Vision (Spotlights) ──
function ColorNightVisionSpotlights({ active }: { active: boolean }) {
  const spotLeft = useRef<THREE.SpotLight>(null);
  const spotRight = useRef<THREE.SpotLight>(null);
  
  useFrame(() => {
    if (spotLeft.current) spotLeft.current.intensity = THREE.MathUtils.lerp(spotLeft.current.intensity, active ? 5 : 0, 0.1);
    if (spotRight.current) spotRight.current.intensity = THREE.MathUtils.lerp(spotRight.current.intensity, active ? 5 : 0, 0.1);
  });

  return (
    <>
      <spotLight ref={spotLeft} position={[1.1, 0.2, 0.3]} angle={0.4} penumbra={0.5} intensity={0} color="#ffffff" distance={10} castShadow />
      <spotLight ref={spotRight} position={[1.1, -0.2, 0.3]} angle={0.4} penumbra={0.5} intensity={0} color="#ffffff" distance={10} castShadow />
    </>
  );
}

// ── Feature 3: Two-Way Audio (Sound Waves) ──
function AudioWaves({ active }: { active: boolean }) {
  const waveRef1 = useRef<THREE.Mesh>(null);
  const waveRef2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();
    if (waveRef1.current) {
      const s1 = (t % 2) * 1.5;
      waveRef1.current.scale.set(s1, s1, s1);
      (waveRef1.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (t % 2));
    }
    if (waveRef2.current) {
      const s2 = ((t + 1) % 2) * 1.5;
      waveRef2.current.scale.set(s2, s2, s2);
      (waveRef2.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - ((t + 1) % 2));
    }
  });

  if (!active) return null;
  return (
    <group position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh ref={waveRef1}>
        <torusGeometry args={[0.3, 0.02, 16, 64]} />
        <meshBasicMaterial color="#3388ff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={waveRef2}>
        <torusGeometry args={[0.3, 0.02, 16, 64]} />
        <meshBasicMaterial color="#3388ff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ── Feature 4: Solar Panel ──
function SolarPanel({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      const targetScale = active ? 1 : 0.001;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[-0.5, 2.0, 0]} rotation={[-Math.PI / 6, 0, -Math.PI / 8]}>
      {/* Panel base */}
      <mesh castShadow>
        <boxGeometry args={[1.6, 0.05, 1.2]} />
        <meshStandardMaterial color="#2a2e38" roughness={0.7} />
      </mesh>
      {/* Solar cells */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <boxGeometry args={[1.5, 0.02, 1.1]} />
        <meshStandardMaterial color="#0A1128" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Grid lines */}
      <mesh position={[0, 0.045, 0]}>
        <planeGeometry args={[1.5, 1.1]} />
        <meshBasicMaterial color="#4F46E5" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Mounting arm connecting to wall */}
      <mesh position={[-0.9, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <meshStandardMaterial color="#d0d5db" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

// ── Feature 5: Cloud Storage ──
function DataParticles({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!active || !particlesRef.current) return;
    const t = clock.getElapsedTime();
    particlesRef.current.children.forEach((child, i) => {
      child.position.y = (t * 2 + i * 0.5) % 3;
      (child as THREE.Mesh).rotation.x = t + i;
      (child as THREE.Mesh).rotation.y = t * 1.2 + i;
      ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (child.position.y / 3));
    });
  });

  if (!active) return null;

  return (
    <group position={[0, 1.0, 0]}>
      {/* Cloud icon abstraction */}
      <mesh position={[0, 3.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.4, 3.0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.4, 3.0, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      
      {/* Flying particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 0.5, 0, (Math.random() - 0.5) * 0.5]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial color="#4F46E5" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function BulletCameraModel({ activeFeatureIndex }: { activeFeatureIndex: number }) {
  const bodyRef = useRef<THREE.Group>(null);
  
  // Feature 1: Pan & Tilt tracking
  useFrame((state) => {
    if (bodyRef.current) {
      let targetY = 0;
      let targetZ = 0; // z is tilt because of local rotation
      
      if (activeFeatureIndex === 1) {
        // Feature 1: 360 Pan & Tilt - Animate aggressively to show it off
        const t = state.clock.elapsedTime;
        targetY = Math.sin(t * 1.5) * 0.8; // Pan side to side
        targetZ = Math.cos(t * 1.2) * 0.4; // Tilt up and down
      } else {
        // Normal interactive tracking
        targetY = -state.pointer.x * (Math.PI / 4);
        targetZ = -state.pointer.y * (Math.PI / 6);
      }
      
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, targetY, 0.05);
      bodyRef.current.rotation.z = THREE.MathUtils.lerp(bodyRef.current.rotation.z, targetZ, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[0, -0.3, 0]}>
      {/* ═══ WALL BRACKET ═══ */}
      {/* Mounting plate */}
      <mesh position={[-2.3, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.6]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Screws on plate */}
      {[[0.2, 0.2], [0.2, -0.2], [-0.2, 0.2], [-0.2, -0.2]].map((p, i) => (
        <mesh key={`s-${i}`} position={[-2.27, 0.8 + p[0], p[1]]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.03, 12]} />
          <meshStandardMaterial color="#a0a5ab" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* ═══ MOUNTING ARM (L-shaped bracket) ═══ */}
      {/* Horizontal arm from wall */}
      <mesh position={[-1.85, 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.85, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Joint ball at elbow */}
      <mesh position={[-1.4, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Angled arm going down to camera */}
      <mesh position={[-1.05, 0.5, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
        <cylinderGeometry args={[0.09, 0.1, 0.7, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Joint cap connecting to camera body */}
      <mesh position={[-0.75, 0.22, 0]} castShadow>
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>

      <SolarPanel active={activeFeatureIndex === 4} />
      <DataParticles active={activeFeatureIndex === 5} />

      <group ref={bodyRef}>
      {/* ═══ CAMERA BODY (Bullet style) ═══ */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.45, 1.2, 32, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      {/* Body accent stripe */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.452, 0.008, 8, 64]} />
        <meshStandardMaterial color="#c0c5cc" roughness={0.15} metalness={0.7} />
      </mesh>
      <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.44, 0.01, 8, 64]} />
        <meshStandardMaterial color="#b0b5bc" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* ═══ FRONT SHROUD ═══ */}
      <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.42, 0.48, 0.5, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.475, 0.01, 12, 64]} />
        <meshStandardMaterial color="#c8cdd5" roughness={0.05} metalness={0.95} />
      </mesh>

      {/* ═══ LENS ═══ */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <sphereGeometry args={[0.35, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshPhysicalMaterial
          color="#050510"
          metalness={0.5}
          roughness={0.01}
          transmission={0.5}
          thickness={2}
          ior={1.9}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={2.5}
        />
      </mesh>
      <mesh position={[1.06, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <sphereGeometry args={[0.28, 64, 64, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshPhysicalMaterial
          color="#000010"
          metalness={0.9}
          roughness={0.005}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <mesh position={[1.12, 0, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshPhysicalMaterial color="#000000" metalness={1} roughness={0} />
      </mesh>

      {/* ═══ IR LEDs (ring around front shroud) ═══ */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 16;
        const r = 0.38;
        return (
          <mesh key={`ir-${i}`} position={[1.08, Math.sin(angle) * r, Math.cos(angle) * r]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshStandardMaterial
              color={activeFeatureIndex === 2 ? "#ffffff" : "#220000"}
              emissive={activeFeatureIndex === 2 ? "#ffffff" : (i % 2 === 0 ? '#440000' : '#220000')}
              emissiveIntensity={activeFeatureIndex === 2 ? 10 : 0.4}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        );
      })}

      <ColorNightVisionSpotlights active={activeFeatureIndex === 2} />

      {/* ═══ SUN SHIELD (visor on top) ═══ */}
      <mesh position={[0.5, 0.38, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[1.1, 0.04, 0.7]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[0.5, 0.32, 0.33]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[1.0, 0.12, 0.03]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.3} />
      </mesh>
      <mesh position={[0.5, 0.32, -0.33]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[1.0, 0.12, 0.03]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.3} />
      </mesh>

      {/* ═══ STATUS LEDs ═══ */}
      <PulsingLED position={[-0.3, 0.35, 0.2]} color="#3388ff" active={activeFeatureIndex === 5} />
      <PulsingLED position={[-0.3, 0.35, -0.2]} color="#00cc44" active={activeFeatureIndex === 0} />
      
      {/* ═══ SPEAKER PORT (for Two-Way Audio) ═══ */}
      <mesh position={[0, -0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Speaker holes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`sp-${i}`} position={[0, -0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.01, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      ))}

      {/* Dynamic Features */}
      <AIMotionDetection active={activeFeatureIndex === 0} />
      <AudioWaves active={activeFeatureIndex === 3} />

      {/* ═══ REAR CABLE PORT ═══ */}
      <mesh position={[-0.75, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
        <meshStandardMaterial color="#1a1e28" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ═══ ANTENNA ═══ */}
      <mesh position={[-0.65, 0.25, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.35, 12]} />
        <meshStandardMaterial color="#2a2e38" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-0.65, 0.44, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#2a2e38" roughness={0.3} metalness={0.6} />
      </mesh>
      </group>
    </group>
  );
}

// Global scene controller for Night Vision lighting
function SceneLighting({ activeFeatureIndex }: { activeFeatureIndex: number }) {
  const isNight = activeFeatureIndex === 2;
  const targetIntensity = isNight ? 0.05 : 1.5;
  const targetEnv = isNight ? 0.1 : 1;
  const targetBg = isNight ? '#050a14' : '#F4F7FA'; // Update canvas background internally
  
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const bgColor = useRef(new THREE.Color('#F4F7FA'));
  
  useFrame((state) => {
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetIntensity, 0.05);
    }
    bgColor.current.lerp(new THREE.Color(targetBg), 0.05);
    state.scene.background = bgColor.current;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.5} />
      {/* Using a key on Environment to force re-evaluation could be expensive, so we just dim the main lights */}
      {!isNight && (
        <>
          <spotLight position={[10, 10, 8]} angle={0.2} penumbra={1} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} color="#ffffff" />
          <spotLight position={[-6, 6, -4]} angle={0.3} penumbra={0.8} intensity={0.5} color="#d0e0ff" />
          <directionalLight position={[-2, 3, -4]} intensity={0.35} color="#e8f0ff" />
        </>
      )}
      {isNight && (
        <>
          {/* Moon light for night vision scene */}
          <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#4F46E5" />
        </>
      )}
      {/* Environment preset removed due to fetch failure. Lighting is handled by standard lights. */}
    </>
  );
}

export function SecurityCamera({ activeFeatureIndex = 0 }: { activeFeatureIndex?: number }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [4, 1.5, 5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
      >
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe />
          </mesh>
        }>
          <SceneLighting activeFeatureIndex={activeFeatureIndex} />

          <PresentationControls
            global
            snap={true}
            rotation={[0.05, -0.15, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <Float speed={1.8} rotationIntensity={0.08} floatIntensity={0.3}>
              <BulletCameraModel activeFeatureIndex={activeFeatureIndex} />
            </Float>
          </PresentationControls>

          <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={14} blur={2.5} far={5} color="#0A1128" />
        </Suspense>
      </Canvas>
    </div>
  );
}
