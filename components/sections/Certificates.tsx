'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Eye,
  Hash,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

type CertificateCategory = 'all' | 'cloud' | 'ai' | 'security' | 'software';

export const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('all');
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to categorize certificates
  const getCategory = useCallback((cert: Certificate): CertificateCategory => {
    const text = `${cert.title} ${cert.issuer}`.toLowerCase();
    if (
      text.includes('cloud') ||
      text.includes('gcp') ||
      text.includes('google cloud') ||
      text.includes('aws')
    ) {
      return 'cloud';
    }
    if (
      text.includes('ai') ||
      text.includes('genai') ||
      text.includes('gemini') ||
      text.includes('vertex') ||
      text.includes('prompt') ||
      text.includes('intelligence')
    ) {
      return 'ai';
    }
    if (
      text.includes('security') ||
      text.includes('cisco') ||
      text.includes('network') ||
      text.includes('defense')
    ) {
      return 'security';
    }
    return 'software';
  }, []);

  // Compute category counts
  const categoryFilters = useMemo(() => {
    const counts = {
      all: certificates.length,
      cloud: 0,
      ai: 0,
      security: 0,
      software: 0,
    };

    certificates.forEach((cert) => {
      const cat = getCategory(cert);
      counts[cat]++;
    });

    return [
      { id: 'all' as CertificateCategory, label: `All Credentials (${counts.all})` },
      ...(counts.cloud > 0
        ? [{ id: 'cloud' as CertificateCategory, label: `Google Cloud (${counts.cloud})` }]
        : []),
      ...(counts.ai > 0
        ? [{ id: 'ai' as CertificateCategory, label: `AI & GenAI (${counts.ai})` }]
        : []),
      ...(counts.security > 0
        ? [{ id: 'security' as CertificateCategory, label: `Security & Systems (${counts.security})` }]
        : []),
      ...(counts.software > 0
        ? [{ id: 'software' as CertificateCategory, label: `Software & Web (${counts.software})` }]
        : []),
    ];
  }, [certificates, getCategory]);

  // Filtered certificates list
  const filteredCertificates = useMemo(() => {
    if (selectedCategory === 'all') return certificates;
    return certificates.filter((cert) => getCategory(cert) === selectedCategory);
  }, [certificates, selectedCategory, getCategory]);

  // Preview Modal Navigation
  const currentIndex = previewCert
    ? filteredCertificates.findIndex((c) => c.id === previewCert.id)
    : -1;

  const navigatePreview = useCallback(
    (direction: 1 | -1) => {
      if (currentIndex === -1 || !filteredCertificates.length) return;
      const nextIndex =
        (currentIndex + direction + filteredCertificates.length) % filteredCertificates.length;
      setPreviewCert(filteredCertificates[nextIndex]);
    },
    [currentIndex, filteredCertificates]
  );

  // Keyboard navigation & body scroll locking for preview modal
  useEffect(() => {
    if (!previewCert) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewCert(null);
      if (e.key === 'ArrowLeft') navigatePreview(-1);
      if (e.key === 'ArrowRight') navigatePreview(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewCert, navigatePreview]);

  return (
    <section id="certificates" className="py-24 bg-card/30 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <ScrollReveal>
          <div className="mb-10 sm:mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full inline-block" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Verified Industry Credentials
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                  Technical Certifications.
                </h2>
                <p className="text-muted-foreground text-base mt-2 max-w-2xl leading-relaxed">
                  Verified industry credentials across Google Cloud Platform, GenAI, Network Defense, and Full-Stack Architecture.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground bg-card px-4 py-2 border border-border shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{certificates.length} Verified Records</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 [scrollbar-width:none]">
            {categoryFilters.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                      : 'bg-card border-border hover:border-primary/60 text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Compact Certificates Grid: Small cards with high density */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredCertificates.map((cert) => {
            return (
              <ScrollReveal key={cert.id}>
                <motion.button
                  type="button"
                  onClick={() => setPreviewCert(cert)}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group w-full text-left bg-card border-2 border-border hover:border-primary transition-all p-2.5 sm:p-3 flex flex-col justify-between h-full cursor-pointer overflow-hidden"
                  aria-label={`Preview certificate: ${cert.title}`}
                >
                  <div>
                    {/* Small Artwork / Thumbnail */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted mb-2.5 border border-border/50">
                      <div className="absolute inset-0 paper-grid opacity-50 z-0" aria-hidden="true" />
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                          className="object-contain p-2 relative z-10 transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="relative z-10 flex h-full items-center justify-center">
                          <Award className="w-8 h-8 text-foreground/25" />
                        </div>
                      )}

                      {/* Quick preview hover badge */}
                      <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                          <Eye className="w-3.5 h-3.5" /> Preview
                        </span>
                      </div>
                    </div>

                    {/* Issuer Tag */}
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-primary truncate mb-1">
                      <ShieldCheck className="w-3 h-3 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </div>

                    {/* Certificate Title (Compact, 2 lines max) */}
                    <h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {cert.title}
                    </h4>
                  </div>

                  {/* Date Footer */}
                  <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>
                      {cert.issue_date ? new Date(cert.issue_date).getFullYear() : 'Verified'}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity font-bold">
                      View →
                    </span>
                  </div>
                </motion.button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Certificate Preview Modal / Lightbox (Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {previewCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-md overflow-y-auto"
                onClick={() => setPreviewCert(null)}
              >
                <motion.div
                  initial={{ scale: 0.94, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-3xl bg-card border-2 border-border shadow-2xl overflow-hidden my-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-label={previewCert.title}
                >
                  {/* Modal Header */}
                  <div className="px-5 sm:px-6 py-3.5 border-b border-border bg-card/90 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                        CREDENTIAL PREVIEW [{currentIndex + 1} / {filteredCertificates.length}]
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => navigatePreview(-1)}
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Previous certificate"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => navigatePreview(1)}
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        aria-label="Next certificate"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewCert(null)}
                        className="w-8 h-8 flex items-center justify-center border border-border bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer ml-1"
                        aria-label="Close preview"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Artwork Preview */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-muted/60 overflow-hidden border-b border-border flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 paper-grid opacity-60 z-0" aria-hidden="true" />
                    {previewCert.image ? (
                      <Image
                        src={previewCert.image}
                        alt={previewCert.title}
                        fill
                        className="object-contain p-4 relative z-10"
                        priority
                      />
                    ) : (
                      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
                        <Award className="w-16 h-16 text-primary/40" />
                        <span className="text-xs font-mono text-muted-foreground">
                          No Certificate Image Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Modal Meta Details & Verification */}
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 border border-primary/30 text-primary text-[11px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {previewCert.issuer}
                        </span>
                        {previewCert.issue_date && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(previewCert.issue_date)}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
                        {previewCert.title}
                      </h3>

                      {previewCert.credential_id && (
                        <p className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          ID: <span className="text-foreground">{previewCert.credential_id}</span>
                        </p>
                      )}
                    </div>

                    {/* Verification CTA */}
                    {previewCert.credential_url ? (
                      <a
                        href={previewCert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shrink-0 shadow-sm"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="px-4 py-2 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-wider border border-border shrink-0">
                        Institutional Record
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
});

export default Certificates;
