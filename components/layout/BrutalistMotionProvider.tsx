'use client';

import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

interface BrutalistMotionProviderProps {
  children: ReactNode;
}

export default function BrutalistMotionProvider({ children }: BrutalistMotionProviderProps) {
  return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
}
