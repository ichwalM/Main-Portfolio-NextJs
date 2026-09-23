'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/** Heuristic for "should we spend a WebGL canvas' worth of GPU/CPU here?" */
function detectLowEndDevice(): boolean {
  const cores = navigator.hardwareConcurrency || 4;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const narrowViewport = window.innerWidth < 640;
  return coarsePointer && narrowViewport && cores <= 4;
}

interface Render3DCapability {
  /** True once client-side checks have run (avoids SSR/hydration mismatch). */
  ready: boolean;
  /** True if a WebGL canvas should be mounted; false → render the static fallback. */
  canRender3D: boolean;
  reducedMotion: boolean;
}

/**
 * Central gate for every decorative 3D scene in the app. Combines
 * `prefers-reduced-motion`, WebGL support, and a light low-end-device
 * heuristic so a single hook decides whether a Canvas mounts at all.
 */
export function useCanRender3D(): Render3DCapability {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState({ ready: false, supported: false });

  useEffect(() => {
    setState({
      ready: true,
      supported: detectWebGL() && !detectLowEndDevice(),
    });
  }, []);

  return {
    ready: state.ready,
    canRender3D: state.ready && state.supported && !reducedMotion,
    reducedMotion,
  };
}
