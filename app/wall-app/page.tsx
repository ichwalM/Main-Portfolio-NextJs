import type { Metadata } from 'next';
import WallAppCard from '@/components/ui/WallAppCard';
import { getWallApps } from '@/lib/api/wall-apps';
import { LayoutGrid } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wall Apps',
  description: 'Explore my collection of awesome wall applications.',
};

export const revalidate = 360;

export default async function WallAppPage() {
  let wallAppsRes: any = { data: [] };
  try {
    wallAppsRes = await getWallApps();
  } catch (error) {
    console.error('Failed to fetch wall apps:', error);
  }

  const wallApps = wallAppsRes?.data || [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Watermark */}
      <div className="absolute top-24 right-0 text-[18vw] font-black text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
        WALL
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-16 pt-4">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] font-black text-primary border border-primary px-2 py-0.5 tracking-[0.25em] uppercase">
              APPS
            </span>
            <div className="h-px w-10 bg-primary" />
            <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase flex items-center gap-1.5">
              <LayoutGrid size={10} />
              Wall Applications
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 uppercase">
            Featured<br />
            <span className="text-primary">Apps.</span>
          </h1>

          <div className="flex items-start gap-4">
            <div className="h-1 w-16 bg-primary mt-3 flex-shrink-0" />
            <p className="text-muted-foreground text-base max-w-xl border-l-4 border-border pl-4 font-mono text-sm">
              A curated collection of functional web applications — built with modern technologies and deployed for real use.
            </p>
          </div>
        </div>

        {/* Count strip */}
        <div className="flex items-center gap-0 border-2 border-border mb-12 w-fit">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-4 py-2 border-r border-border">
            Total
          </span>
          <span className="font-black text-lg px-4 py-2 border-r border-border text-primary">
            {wallApps.length}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground px-4 py-2">
            Applications
          </span>
        </div>

        {/* Grid */}
        {wallApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-2 border-border">
            {wallApps.map((app: any, index: number) => (
              <div
                key={app.id}
                className={[
                  index % 4 !== 3 ? 'border-r-2 border-border' : '',
                  index < wallApps.length - (wallApps.length % 4 || 4) ? 'border-b-2 border-border' : '',
                ].join(' ')}
              >
                <WallAppCard app={app} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 border-4 border-border flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-border flex items-center justify-center">
              <LayoutGrid className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-black text-xl uppercase tracking-tight">No Wall Apps Found.</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Check back later for new additions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
