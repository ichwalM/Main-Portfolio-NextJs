'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Skill } from '@/types/skill';
import { useThemeColor } from '@/lib/hooks/useThemeColor';
import Scene3DGate from './Scene3DGate';

const MAX_NODES = 24;

/** Evenly distributes N points on a sphere (golden-angle spiral) — no two skill nodes overlap. */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function SkillNode({ skill, position }: { skill: Skill; position: THREE.Vector3 }) {
  const primary = useThemeColor('--primary');

  return (
    <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={primary} transparent opacity={0.7 + skill.proficiency / 400} />
        </mesh>
        <Html center distanceFactor={8} occlude={false} className="pointer-events-none select-none">
          <span className="whitespace-nowrap px-2 py-1 bg-background/90 border border-border text-[10px] font-mono text-foreground/80 backdrop-blur-sm">
            {skill.name}
          </span>
        </Html>
      </group>
    </Float>
  );
}

function OrbitGroup({ skills }: { skills: Skill[] }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.4), [skills.length]);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.08 + pointer.x * 0.3;
    group.current.rotation.x = pointer.y * 0.15;
  });

  return (
    <group ref={group}>
      {skills.map((skill, i) => (
        <SkillNode key={skill.name} skill={skill} position={positions[i]} />
      ))}
    </group>
  );
}

function OrbitCanvas({ skills }: { skills: Skill[] }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <OrbitGroup skills={skills} />
    </Canvas>
  );
}

function StaticFallback({ skills }: { skills: Skill[] }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center h-full content-center px-6">
      {skills.slice(0, MAX_NODES).map((skill) => (
        <span key={skill.name} className="px-2.5 py-1 bg-surface border border-border text-[10px] font-mono text-muted-foreground">
          {skill.name}
        </span>
      ))}
    </div>
  );
}

interface SkillsOrbitProps {
  skills: Skill[];
}

/**
 * Decorative orbiting tag-cloud rendered above the Skills tabs — a 3D
 * complement to `ConnectedSkills`, not a replacement (that stays the
 * primary "All Skills" view). Caps node count so the sphere distribution
 * stays legible even with a large skill catalog.
 */
export default function SkillsOrbit({ skills }: SkillsOrbitProps) {
  const capped = skills.slice(0, MAX_NODES);
  if (capped.length === 0) return null;

  return (
    <div className="relative h-72 md:h-96 w-full mb-16 border border-border bg-surface/40 overflow-hidden">
      <Scene3DGate fallback={<StaticFallback skills={capped} />}>
        <OrbitCanvas skills={capped} />
      </Scene3DGate>
    </div>
  );
}
