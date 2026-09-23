'use client';

import { useEffect, useState } from 'react';
import { Color } from 'three';

/**
 * Reads a `--hsl-triplet` CSS custom property (e.g. `--primary: 220 100% 32%`)
 * from `:root` and returns a live-updating three.js Color, so 3D materials
 * stay in sync with the site's light/dark theme instead of hardcoding hex.
 */
export function useThemeColor(cssVar: string, fallback = '#0043CC'): Color {
  const [color, setColor] = useState(() => new Color(fallback));

  useEffect(() => {
    const read = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
      if (!raw) return;
      setColor(new Color(`hsl(${raw.replace(/ /g, ', ')})`));
    };

    read();

    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
  }, [cssVar]);

  return color;
}
