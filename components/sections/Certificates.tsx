'use client';

import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

const CertificateCard = ({ cert }: { cert: Certificate }) => {
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
      className="group relative h-full flex flex-col"
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
          <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
            {cert.title}
          </h3>

          <div className="flex flex-col gap-2 mt-auto">
            {cert.issue_date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={14} className="text-primary" />
                <span className="text-xs font-mono uppercase tracking-wider">
                  Issued: {formatDate(cert.issue_date)}
                </span>
              </div>
            )}
            
            {cert.credential_id && (
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <div className="w-1 h-1 rounded-full bg-border" />
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                  ID: {cert.credential_id}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Bottom Bar */}
        {cert.credential_url && (
          <a
            href={cert.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 border-t border-border bg-background/50 hover:bg-primary hover:text-white transition-all duration-300 group/btn relative z-20"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-widest uppercase font-mono">Verify Credential</span>
              <ExternalLink size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
            </div>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default function Certificates({ certificates }: CertificatesProps) {
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
