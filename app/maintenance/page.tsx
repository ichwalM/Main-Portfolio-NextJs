'use client';

import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black text-white relative overflow-hidden font-sans">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Decorative scanning line animation */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-primary/30 z-10 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
      />

      <div className="max-w-2xl w-full relative z-20">
        <div className="border-l-4 border-primary pl-8 py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary text-black">
                <Terminal size={24} strokeWidth={2.5} />
              </div>
              <span className="font-mono text-sm tracking-[0.3em] uppercase text-primary font-bold">System Status: Offline</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-none uppercase">
              Under<br />
              <span className="text-transparent border-text stroke-white" style={{ WebkitTextStroke: '1px white' }}>Maintenance</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <p className="text-xl font-bold mb-4 uppercase tracking-tight">Error Code: 503</p>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                  We are currently performing scheduled system upgrades to improve our core infrastructure. 
                  Service will be restored shortly.
                </p>
              </div>
              
              <div className="flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group cursor-wait">
                    <div className="h-px w-12 bg-primary group-hover:w-20 transition-all duration-300" />
                    <span className="text-xs font-mono uppercase tracking-widest text-primary animate-pulse">Rebuilding Assets...</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-wait">
                    <div className="h-px w-12 bg-white/20 group-hover:w-20 transition-all duration-300" />
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Optimizing Database</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-6">
              <button 
                onClick={() => window.location.reload()}
                className="group flex items-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-tighter hover:bg-primary transition-colors duration-300"
              >
                Retry Connection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="hidden md:block">
                <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-gray-600">
                  EST. RESTORATION: SOON
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} ICHWAL_LABS // ALL_RIGHTS_RESERVED
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 bg-primary animate-ping" />
            <div className="w-2 h-2 bg-white/20" />
            <div className="w-2 h-2 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
