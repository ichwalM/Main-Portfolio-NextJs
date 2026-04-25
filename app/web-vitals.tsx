'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * WebVitalsReporter — logs Core Web Vitals metrics to the console in development.
 * In production, replace console.log with your analytics provider.
 *
 * Targets:
 * - LCP (Largest Contentful Paint) < 2.5s
 * - INP (Interaction to Next Paint) < 200ms
 * - CLS (Cumulative Layout Shift) < 0.1
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      const { name, value, rating } = metric;

      const emoji =
        rating === 'good' ? '🟢' :
        rating === 'needs-improvement' ? '🟡' : '🔴';

      const color =
        rating === 'good' ? '#22c55e' :
        rating === 'needs-improvement' ? '#eab308' : '#ef4444';

      const formattedValue = name === 'CLS'
        ? value.toFixed(4)
        : `${Math.round(value)}ms`;

      console.log(
        `%c[Web Vitals] ${emoji} ${name}: ${formattedValue} (${rating})`,
        `color: ${color}; font-weight: bold;`
      );
    }

    // Production hook — replace with your analytics provider:
    // analytics.track('web_vitals', { name: metric.name, value: metric.value, rating: metric.rating });
  });

  return null;
}
