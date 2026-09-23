'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import Scene3DGate from './Scene3DGate';

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    // Gentle mouse parallax + a slow idle drift so the scene never looks static.
    const t = clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35 + t * 0.03, 0.06);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.06);
    group.current.position.y = Math.sin(t * 0.15) * 0.15;
  });

  return <group ref={group}>{children}</group>;
}

function GeometryCluster() {
  const primary = useThemeColor('--primary');
  const material = useMemo(
    () => ({ color: primary, wireframe: true, transparent: true, opacity: 0.55 }),
    [primary]
  );

  return (
    <ParallaxRig>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
        <TorusKnot args={[1.1, 0.32, 128, 16]} position={[1.4, 0.3, -1]}>
          <meshBasicMaterial {...material} />
        </TorusKnot>
      </Float>

      <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.1}>
        <Icosahedron args={[0.7, 0]} position={[-1.8, -0.6, -0.5]}>
          <meshBasicMaterial {...material} opacity={0.4} />
        </Icosahedron>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.6}>
        <Octahedron args={[0.5, 0]} position={[-1.1, 1.2, -1.5]}>
          <meshBasicMaterial {...material} opacity={0.35} />
        </Octahedron>
      </Float>
    </ParallaxRig>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      className="!absolute inset-0"
    >
      <GeometryCluster />
    </Canvas>
  );
}

/**
 * Decorative WebGL layer sitting between the Threads background and the
 * Hero copy (`aria-hidden`, `pointer-events-none` — purely visual, never a
 * hit target). Falls back to nothing (Threads alone) when 3D can't run.
 */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
      <Scene3DGate fallback={null}>
        <HeroCanvas />
      </Scene3DGate>
    </div>
  );
}
