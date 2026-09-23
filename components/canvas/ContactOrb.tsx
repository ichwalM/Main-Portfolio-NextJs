'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import Scene3DGate from './Scene3DGate';

function HoloOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const primary = useThemeColor('--primary');

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.25 + pointer.x * 0.4;
    meshRef.current.rotation.x = pointer.y * 0.25;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 64, 64]}>
      <MeshDistortMaterial
        color={primary}
        wireframe
        transparent
        opacity={0.35}
        distort={0.4}
        speed={1.6}
        roughness={0.4}
      />
    </Sphere>
  );
}

function OrbCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      {/* MeshDistortMaterial builds on a lit (physical) material — without
          a light it renders flat gray regardless of the `color` prop. */}
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={1.4} />
      <HoloOrb />
    </Canvas>
  );
}

/**
 * Floating "holographic terminal" orb behind the contact form — purely
 * ambient, `aria-hidden` and non-interactive so it never competes with the
 * actual form for pointer events or screen-reader focus.
 */
export default function ContactOrb() {
  return (
    <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none z-0 hidden lg:block" aria-hidden="true">
      <Scene3DGate fallback={null}>
        <OrbCanvas />
      </Scene3DGate>
    </div>
  );
}
