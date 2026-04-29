'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, Calendar, ShieldCheck, X } from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

const CertificateCard = ({ cert, onClick }: { cert: Certificate; onClick: () => void }) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${spotX} ${spotY}, rgba(37, 99, 235, 0.1), transparent 80%)`;

  return (
    <motion.div
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative h-full flex flex-col cursor-pointer"
    >
      {/* Decorative Corners */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary/50 z-20" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary/50 z-20" />

      <div className="relative bg-surface border border-border group-hover:border-primary/40 transition-colors duration-500 overflow-hidden flex flex-col h-full flex-1">
        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: spotlight }}
        />

        {/* Image/Thumbnail Area */}
        <div className="relative w-full h-48 bg-background border-b border-border overflow-hidden">
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Award size={64} className="text-muted-foreground" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Issuer Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="tag-solid bg-background/80 backdrop-blur-sm border border-border flex items-center gap-2">
              <ShieldCheck size={12} className="text-primary" />
              <span className="text-[10px] uppercase font-mono tracking-wider">{cert.issuer}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex flex-col flex-1 relative z-20">
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {cert.title}
          </h3>

          <div className="flex flex-col gap-2 mt-auto text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
             <span className="text-xs uppercase tracking-widest font-mono">View Details &rarr;</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Certificates({ certificates }: CertificatesProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 md:py-32 relative overflow-hidden bg-background border-t border-border">
      {/* Decorative Prefix Text */}
      <div className="absolute top-8 left-4 text-[12vw] font-black text-border/10 leading-none select-none pointer-events-none tracking-tighter">
        ACHV
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="section-label mb-6">Achievements</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                Licenses &<br />
                <span className="text-primary">Certifications.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs font-mono uppercase tracking-widest leading-relaxed border-l border-primary pl-4">
              Validated expertise and continuous learning milestones.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onClick={() => setSelectedCert(cert)} />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/90 backdrop-blur-md" 
              onClick={() => setSelectedCert(null)} 
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-surface border border-border shadow-2xl flex flex-col md:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Decorative corner */}
               <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary z-20 m-2" />

               {/* Image Section */}
               <div className="w-full md:w-1/2 relative bg-background border-b md:border-b-0 md:border-r border-border min-h-[250px] md:min-h-[400px]">
                 {selectedCert.image ? (
                   <Image
                     src={selectedCert.image}
                     alt={selectedCert.title}
                     fill
                     className="object-contain p-4 md:p-8"
                   />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center opacity-20">
                     <Award size={80} className="text-muted-foreground" />
                   </div>
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
               </div>

               {/* Detail Section */}
               <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                 <button 
                   onClick={() => setSelectedCert(null)}
                   className="absolute top-4 right-4 z-30 p-2 bg-background border border-border text-foreground hover:text-primary transition-colors hover:border-primary/50"
                 >
                   <X size={16} />
                 </button>

                 <div className="mb-2">
                   <span className="text-[10px] font-mono tracking-widest text-primary uppercase">
                     Certificate Detail
                   </span>
                 </div>
                 
                 <h3 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight leading-tight">
                   {selectedCert.title}
                 </h3>

                 <div className="space-y-4 mb-8 flex-1">
                   <div>
                     <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">Issuer</p>
                     <p className="font-semibold">{selectedCert.issuer}</p>
                   </div>

                   {selectedCert.issue_date && (
                     <div>
                       <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">Issue Date</p>
                       <p className="font-semibold">{formatDate(selectedCert.issue_date)}</p>
                     </div>
                   )}
                   
                   {selectedCert.credential_id && (
                     <div>
                       <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1">Credential ID</p>
                       <p className="font-mono text-sm">{selectedCert.credential_id}</p>
                     </div>
                   )}
                 </div>

                 {/* Action */}
                 {selectedCert.credential_url && (
                   <a
                     href={selectedCert.credential_url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="mt-autoflex w-full inline-flex items-center justify-center gap-2 p-4 bg-primary text-white hover:bg-primary/90 transition-colors font-bold tracking-widest uppercase font-mono text-xs"
                   >
                     Verify Credential
                     <ExternalLink size={14} />
                   </a>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
