'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ChunkLoadError happens when a new deployment replaces old JS chunks.
    // The browser still holds references to old chunk filenames.
    // Auto-reloading fetches fresh HTML + new chunk references.
    const isChunkError =
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('Failed to load chunk') ||
      error?.message?.includes('ChunkLoadError');

    if (isChunkError) {
      console.warn('[ChunkLoadError] New deployment detected — reloading page.');
      window.location.reload();
    }
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Top border accent */}
          <div className="h-0.5 w-full bg-[#2563EB] mb-8" />

          <p className="text-[10px] text-[#2563EB] font-mono uppercase tracking-[0.2em] mb-4">
            Application Error
          </p>

          <h1 className="text-4xl font-black text-white tracking-tighter mb-4">
            Something went<br />
            <span className="text-[#2563EB]">wrong.</span>
          </h1>

          <p className="text-[#666] text-sm leading-relaxed mb-8">
            An unexpected error occurred. If this keeps happening,
            try refreshing the page.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#2563EB] text-white text-sm font-bold tracking-wide hover:bg-[#1d4ed8] transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 border border-[#242424] text-[#999] text-sm font-bold tracking-wide hover:border-[#444] transition-colors"
            >
              Try Again
            </button>
          </div>

          {/* Error digest for debugging */}
          {error?.digest && (
            <p className="mt-6 text-[10px] font-mono text-[#333]">
              Digest: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
