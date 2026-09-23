'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import Scene3DGate from './Scene3DGate';

interface TimelinePathProps {
  progress: MotionValue<number>;
  nodeCount: number;
}

function TimelinePath({ progress, nodeCount }: TimelinePathProps) {
  const primary = useThemeColor('--primary');
  const markerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // A gentle downward spiral — purely decorative rail for the traveling marker.
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 40;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      points.push(new THREE.Vector3(Math.sin(t * Math.PI * 2.2) * 0.5, 3 - t * 6, Math.cos(t * Math.PI * 2.2) * 0.5));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const nodePositions = useMemo(
    () => Array.from({ length: nodeCount }, (_, i) => curve.getPointAt(nodeCount <= 1 ? 0 : i / (nodeCount - 1))),
    [curve, nodeCount]
  );

  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.015, 8, false), [curve]);

  useFrame(({ clock }) => {
    if (!markerRef.current || !groupRef.current) return;
    const t = THREE.MathUtils.clamp(progress.get(), 0, 1);
    const point = curve.getPointAt(t);
    markerRef.current.position.copy(point);
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
    markerRef.current.scale.setScalar(pulse);
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color={primary} transparent opacity={0.2} />
      </mesh>

      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color={primary} transparent opacity={0.5} />
        </mesh>
      ))}

      <mesh ref={markerRef}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={primary} />
      </mesh>
    </group>
  );
}

function TimelineCanvas({ progress, nodeCount }: TimelinePathProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [2.2, 0, 3.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <TimelinePath progress={progress} nodeCount={nodeCount} />
    </Canvas>
  );
}

interface TimelineSceneProps {
  progress: MotionValue<number>;
  nodeCount: number;
}

/**
 * Desktop-only decorative rail next to the Experience timeline — a glowing
 * marker travels a 3D spiral in sync with `progress` (the same
 * `scrollYProgress` already driving the 2D progress line), so scrolling
 * through career history has one WebGL-backed depth cue without duplicating
 * the actual timeline content in 3D.
 */
export default function TimelineScene({ progress, nodeCount }: TimelineSceneProps) {
  if (nodeCount === 0) return null;

  return (
    <div className="hidden lg:block absolute -right-16 top-0 bottom-0 w-32 pointer-events-none" aria-hidden="true">
      <Scene3DGate fallback={null}>
        <TimelineCanvas progress={progress} nodeCount={nodeCount} />
      </Scene3DGate>
    </div>
  );
}
