import type { Metadata } from 'next';
import ScrollReveal from '@/components/animations/ScrollReveal';
import WallAppCard from '@/components/ui/WallAppCard';
import { getWallApps } from '@/lib/api/wall-apps';

export const metadata: Metadata = {
  title: 'Wall Apps - Ichwal Portfolio',
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
    <div className="pt-32 pb-20 overflow-hidden min-h-screen">
      {/* Decorative text */}
      <div className="absolute top-24 right-4 text-[12vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        WALL
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-20 text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase">
              Wall Applications
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
              Featured<br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Apps.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mt-4 max-w-2xl">
              A curated collection of functional and beautiful web applications built with modern technologies.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wallApps.map((app: any, index: number) => (
            <WallAppCard key={app.id} app={app} index={index} />
          ))}
        </div>

        {wallApps.length === 0 && (
          <div className="py-32 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center bg-muted/10 backdrop-blur-sm">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-muted-foreground text-lg font-medium tracking-wide">No Wall Apps Found.</p>
            <p className="text-sm text-muted-foreground/60 mt-2">Check back later for new additions.</p>
          </div>
        )}
      </div>
      
      {/* Background elements */}
      <div className="fixed top-1/4 -left-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
}
