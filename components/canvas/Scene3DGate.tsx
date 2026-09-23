'use client';

import { ReactNode, Suspense } from 'react';
import { useCanRender3D } from '@/lib/hooks/useCanRender3D';
import Canvas3DBoundary from './Canvas3DBoundary';

interface Scene3DGateProps {
  /** The WebGL scene — only mounted once capability checks pass. */
  children: ReactNode;
  /** Static, dependency-free UI shown pre-hydration, on low-end devices, under
   * `prefers-reduced-motion`, on WebGL failure, or while the scene streams in. */
  fallback: ReactNode;
}

/**
 * Single decision point every decorative 3D scene in the app goes through:
 * capability check → error boundary → suspense. Keeps that policy in one
 * place instead of repeated in each scene component.
 */
export default function Scene3DGate({ children, fallback }: Scene3DGateProps) {
  const { ready, canRender3D } = useCanRender3D();

  if (!ready || !canRender3D) {
    return <>{fallback}</>;
  }

  return (
    <Canvas3DBoundary fallback={fallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Canvas3DBoundary>
  );
}
