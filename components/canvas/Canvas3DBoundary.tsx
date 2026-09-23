'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * WebGL context loss or a driver quirk on an unusual GPU shouldn't take
 * down a whole section — catch it here and drop back to the static fallback.
 */
export default class Canvas3DBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('[Canvas3DBoundary] 3D scene failed, falling back to static UI:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
