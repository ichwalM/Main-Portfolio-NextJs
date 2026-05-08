'use client';

import { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Award, ExternalLink, ShieldCheck, X } from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import BrutalistSectionHeader from '@/components/brutalist/BrutalistSectionHeader';
import { staggerContainer, staggerItem } from '@/lib/animations/variants';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

const rotatedBorderVariants: Variants = {
  rest: { opacity: 0, rotate: 0, x: 0, y: 0 },
  hover: {
    opacity: 1,
    rotate: -3,
    x: 10,
    y: -8,
    transition: { duration: 0 },
  },
};

const rotatedBorderSecondaryVariants: Variants = {
  rest: { opacity: 0, rotate: 0, x: 0, y: 0 },
  hover: {
    opacity: 1,
    rotate: 2,
    x: -8,
    y: 10,
    transition: { duration: 0 },
  },
};

const CertificateCard = memo(function CertificateCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      variants={staggerItem}
      onClick={onClick}
      type="button"
      initial="rest"
      whileHover={reduceMotion ? undefined : 'hover'}
      animate="rest"
      className="group relative cursor-pointer border-2 border-border hover:border-foreground transition-none bg-card h-full flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      aria-label={`Open certificate details: ${cert.title}`}
    >
      <motion.div
        aria-hidden="true"
        variants={rotatedBorderVariants}
        className="pointer-events-none absolute -inset-1 border-4 border-primary opacity-0"
        style={{ transformOrigin: 'top left' }}
      />
      <motion.div
        aria-hidden="true"
        variants={rotatedBorderSecondaryVariants}
        className="pointer-events-none absolute -inset-1 border-2 border-foreground opacity-0"
        style={{ transformOrigin: 'bottom right' }}
      />

      {/* Top accent bar */}
      <div className="h-1 bg-border group-hover:bg-primary transition-none" />

      {/* Image area */}
      <div className="relative w-full h-44 bg-surface border-b-2 border-border overflow-hidden">
        {cert.image ? (
          <Image
            src={cert.image}
            alt={cert.title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Award size={48} className="text-border" />
          </div>
        )}

        {/* Issuer tag */}
        <div className="absolute top-3 left-3 z-20 bg-background border-2 border-border flex items-center gap-1.5 px-2 py-1">
          <ShieldCheck size={10} className="text-primary" />
          <span className="font-mono text-[9px] font-black uppercase tracking-wider">{cert.issuer}</span>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-none pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-black text-foreground group-hover:text-primary transition-none leading-tight tracking-tight line-clamp-2 mb-auto">
          {cert.title}
        </h3>
        <div className="mt-4 flex items-center justify-between border-t-2 border-border pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            View Details
          </span>
          <span className="font-black text-primary">→</span>
        </div>
      </div>
    </motion.button>
  );
});

function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const overlayTransition = reduceMotion ? { duration: 0 } : { duration: 0, ease: 'linear' as const };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={overlayTransition}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-background/95" onClick={onClose} />

        <motion.div
          initial={reduceMotion ? false : { x: 16, y: 16, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 16, y: 16, opacity: 0 }}
          transition={overlayTransition}
          className="relative w-full max-w-3xl bg-background border-4 border-foreground flex flex-col md:flex-row overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate details: ${cert.title}`}
        >
          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-30 w-12 h-12 bg-foreground text-background flex items-center justify-center hover:bg-primary transition-none"
            aria-label="Close"
            type="button"
          >
            <X size={18} />
          </button>

          <div className="w-full md:w-1/2 relative bg-surface border-b-4 md:border-b-0 md:border-r-4 border-foreground min-h-[240px] md:min-h-[400px]">
            {cert.image ? (
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="50vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Award size={80} className="text-border" />
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-8 bg-primary" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                Certificate
              </span>
            </div>

            <h3 className="text-2xl font-black text-foreground mb-6 tracking-tight leading-tight">
              {cert.title}
            </h3>

            <div className="space-y-0 mb-8 flex-1 border-2 border-border">
              {[
                { label: 'Issuer', value: cert.issuer },
                ...(cert.issue_date ? [{ label: 'Issued', value: formatDate(cert.issue_date) }] : []),
                ...(cert.credential_id ? [{ label: 'Credential ID', value: cert.credential_id }] : []),
              ].map((row, i) => (
                <div key={row.label} className={`flex items-start p-4 ${i > 0 ? 'border-t-2 border-border' : ''}`}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground w-28 flex-shrink-0 pt-0.5">
                    {row.label}
                  </span>
                  <span className="font-bold text-sm break-all">{row.value}</span>
                </div>
              ))}
            </div>

            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-4 bg-primary text-primary-foreground font-black tracking-[0.15em] uppercase font-mono text-xs hover:bg-foreground hover:text-background transition-none border-4 border-primary"
              >
                Verify Credential
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedCert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedCert]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedCert) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCert]);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 md:py-32 relative overflow-hidden border-t-4 border-border">
      {/* Watermark */}
      <div className="absolute top-0 left-0 text-[12vw] font-black text-foreground/[0.03] leading-none select-none pointer-events-none tracking-tighter" aria-hidden="true">
        ACHV
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <BrutalistSectionHeader
          number="05"
          label="Achievements"
          title="Licenses &"
          accentTitle="Certifications."
          subtitle="Validated expertise and continuous learning milestones."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-2 border-border"
        >
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              className={[
                i % 4 !== 3 ? 'border-r-2 border-border' : '',
                i < certificates.length - (certificates.length % 4 || 4) ? 'border-b-2 border-border' : '',
              ].join(' ')}
            >
              <CertificateCard cert={cert} onClick={() => setSelectedCert(cert)} />
            </div>
          ))}
        </motion.div>
      </div>

      {mounted && selectedCert ? (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      ) : null}
    </section>
  );
});

export default Certificates;
