'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-reload on ChunkLoadError caused by new deployments
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('Failed to load chunk');

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="h-0.5 w-16 bg-primary mb-6" />

        <p className="section-label mb-4">Page Error</p>

        <h2 className="text-4xl font-black tracking-tighter mb-4">
          Something went<br />
          <span className="text-primary">wrong.</span>
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          An error occurred while loading this page. Try refreshing or click retry.
        </p>

        <div className="flex gap-3">
          <motion.button
            onClick={() => window.location.reload()}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
          >
            Reload Page
          </motion.button>
          <motion.button
            onClick={reset}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 border border-border text-muted-foreground text-sm font-bold tracking-wide hover:border-foreground transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    </div>
  );
}
