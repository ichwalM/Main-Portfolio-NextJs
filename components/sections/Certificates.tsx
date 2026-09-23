'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Award, ArrowLeft, ArrowRight, ExternalLink, GripHorizontal, Maximize2, ShieldCheck, X } from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface CertificatesProps {
  certificates: Certificate[];
}

type CertificateCategory = 'Networking' | 'Frontend' | 'AI' | 'Cloud' | 'Other';

const categoryRules: Array<{ label: CertificateCategory; terms: string[] }> = [
  { label: 'Networking', terms: ['network', 'cisco', 'mikrotik', 'security'] },
  { label: 'Frontend', terms: ['front-end', 'frontend', 'javascript', 'react', 'css', 'html', 'web'] },
  { label: 'AI', terms: ['ai', 'genai', 'gemini', 'vertex', 'prompt', 'machine learning', 'artificial intelligence'] },
  { label: 'Cloud', terms: ['cloud', 'aws', 'azure', 'google cloud', 'gcp', 'docker'] },
];

function getCategory(cert: Certificate): CertificateCategory {
  const searchable = `${cert.title} ${cert.issuer}`.toLowerCase();
  return categoryRules.find((rule) => rule.terms.some((term) => searchable.includes(term)))?.label || 'Other';
}

function CertificateArtwork({ cert, preview = false }: { cert: Certificate; preview?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden bg-muted ${preview ? 'h-full min-h-[280px]' : 'h-[250px] sm:h-[300px]'}`}>
      <div className="absolute inset-0 paper-grid opacity-60" aria-hidden="true" />
      {cert.image ? (
        <Image
          src={cert.image}
          alt={cert.title}
          fill
          priority={preview}
          loading={preview ? undefined : 'lazy'}
          sizes={preview ? '(max-width: 1024px) 100vw, 52vw' : '(max-width: 768px) 100vw, 42vw'}
          className="relative z-10 object-contain p-4 md:p-7"
        />
      ) : (
        <div className="relative z-10 flex h-full items-center justify-center">
          <Award size={82} strokeWidth={1.1} className="text-foreground/30" />
        </div>
      )}
      {!preview && <div className="absolute inset-0 z-20 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-80" />}
      <div className="absolute left-3 top-3 z-30 flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 bg-primary px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-primary-foreground">
        <ShieldCheck size={12} />
        <span className="truncate">{cert.issuer}</span>
      </div>
    </div>
  );
}

function DeckCard({ cert, depth, index, reducedMotion, onSelect, onPromote }: { cert: Certificate; depth: number; index: number; reducedMotion: boolean; onSelect: () => void; onPromote: () => void }) {
  const isTop = depth === 0;
  const rotate = [-2.2, 1.8, -1.1, 2.4][depth];
  const x = [0, 18, -16, 12][depth];
  const y = [0, 15, 30, 44][depth];
  const scale = [1, 0.965, 0.93, 0.895][depth];

  return (
    <motion.button
      type="button"
      layout
      layoutId={`certificate-card-${cert.id}`}
      drag={isTop && !reducedMotion ? true : false}
      dragSnapToOrigin
      dragElastic={0.72}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.offset.y) > 90) onPromote();
      }}
      onClick={onSelect}
      animate={{ opacity: 1 - depth * 0.08, x, y, scale, rotate }}
      whileDrag={{ scale: 1.03, rotate: infoRotate(rotate), cursor: 'grabbing' }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      className={`group absolute inset-x-0 top-0 mx-auto w-[calc(100%-1.5rem)] max-w-[620px] text-left focus-visible:outline-none ${isTop ? 'z-40 cursor-grab' : 'pointer-events-auto z-30 cursor-pointer'}`}
      style={{ transformOrigin: '50% 12%' }}
      aria-label={`${isTop ? 'Open' : 'Bring forward'} certificate: ${cert.title}`}
    >
      <span className="relative block overflow-hidden border-2 border-foreground bg-card p-2 shadow-[8px_8px_0_hsl(var(--foreground))] transition group-hover:shadow-[10px_10px_0_hsl(var(--secondary))]">
        <CertificateArtwork cert={cert} />
        <span className="block p-3 pb-2 md:flex md:items-end md:justify-between md:gap-6 md:p-4">
          <span className="min-w-0">
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{getCategory(cert)} · {cert.issue_date ? new Date(cert.issue_date).getFullYear() : 'Credential'}</span>
            <span className="block truncate text-xl font-black leading-tight tracking-tight md:text-2xl">{cert.title}</span>
          </span>
          <span className="mt-3 inline-flex shrink-0 items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-muted-foreground md:mt-0">{isTop ? 'Drag / open' : 'Bring forward'} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
        </span>
      </span>
      {isTop && <span className="absolute -bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-foreground px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-background"><GripHorizontal size={13} /> explore deck</span>}
    </motion.button>
  );
}

function infoRotate(base: number) {
  return base > 0 ? base + 3 : base - 3;
}

const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<'All' | CertificateCategory>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const availableCategories = useMemo(() => {
    const present = new Set(certificates.map(getCategory));
    return categoryRules.map((rule) => rule.label).filter((label) => present.has(label));
  }, [certificates]);

  const filteredCertificates = useMemo(
    () => activeCategory === 'All' ? certificates : certificates.filter((cert) => getCategory(cert) === activeCategory),
    [activeCategory, certificates],
  );

  const safeIndex = filteredCertificates.length ? activeIndex % filteredCertificates.length : 0;
  const activeCertificate = filteredCertificates[safeIndex] || null;
  const visibleCards = filteredCertificates.length ? Array.from({ length: Math.min(4, filteredCertificates.length) }, (_, depth) => ({ cert: filteredCertificates[(safeIndex + depth) % filteredCertificates.length], depth })) : [];

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalOpen(false);
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current + 1) % filteredCertificates.length);
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current - 1 + filteredCertificates.length) % filteredCertificates.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredCertificates.length, modalOpen]);

  if (!certificates?.length) return null;

  const move = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + filteredCertificates.length) % filteredCertificates.length);
  const selectCertificate = (index: number) => setActiveIndex(index);
  const changeCategory = (category: 'All' | CertificateCategory) => {
    setActiveCategory(category);
    setActiveIndex(0);
  };

  return (
    <section id="certificates" className="relative overflow-hidden border-t-2 border-foreground bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-8 select-none font-black text-[17vw] leading-none tracking-[-0.1em] text-foreground/[0.04]" aria-hidden="true">STACK</div>
      <div className="container relative z-10 mx-auto px-6">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <div>
              <p className="section-label mb-6">Proof of practice</p>
              <h2 className="text-5xl font-black leading-[0.9] tracking-tight md:text-8xl">Earned,<br /><span className="text-primary">not claimed.</span></h2>
            </div>
            <p className="max-w-xs border-l-2 border-secondary pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">A tactile archive of licenses, learning milestones, and verified technical work.</p>
          </div>
        </ScrollReveal>

        <div className="mb-10 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Filter certificates by category">
          {(['All', ...availableCategories] as const).map((category) => (
            <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => changeCategory(category)} className={`brutalist-button shrink-0 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'}`}>{category}</button>
          ))}
          <span className="ml-auto hidden items-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground md:flex">{filteredCertificates.length} records</span>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-20">
          <div>
            <div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[500px]" aria-label="Interactive certificate stack">
              <AnimatePresence initial={false}>
                {visibleCards.slice().reverse().map(({ cert, depth }) => (
                  <DeckCard key={`${cert.id}-${safeIndex}-${depth}`} cert={cert} depth={depth} index={safeIndex + depth} reducedMotion={reducedMotion} onSelect={() => depth === 0 ? setModalOpen(true) : selectCertificate((safeIndex + depth) % filteredCertificates.length)} onPromote={() => move(1)} />
                ))}
              </AnimatePresence>
            </div>
            <div className="mx-auto mt-5 flex max-w-[620px] items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span>Deck {String(safeIndex + 1).padStart(2, '0')} / {String(filteredCertificates.length).padStart(2, '0')}</span><div className="flex-1 border-t-2 border-foreground/15" /><span>{reducedMotion ? 'Keyboard ready' : 'Drag or swipe'}</span></div>
          </div>

          <aside className="lg:sticky lg:top-28">
            {activeCertificate && <motion.div key={activeCertificate.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="border-2 border-foreground bg-card p-5 shadow-[8px_8px_0_hsl(var(--secondary))] md:p-7">
              <div className="mb-10 flex items-center justify-between gap-3"><span className="section-label">Selected certificate</span><span className="bg-foreground px-2 py-1 font-mono text-[10px] font-black text-background">{String(safeIndex + 1).padStart(2, '0')}</span></div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-secondary">{activeCertificate.issuer}</p>
              <h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeCertificate.title}</h3>
              <div className="mt-8 space-y-5 border-t-2 border-foreground pt-6 text-sm"><div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Category</p><p className="font-bold">{getCategory(activeCertificate)}</p></div>{activeCertificate.issue_date && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Issued</p><p className="font-bold">{formatDate(activeCertificate.issue_date)}</p></div>}{activeCertificate.credential_id && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Credential ID</p><p className="break-all font-mono text-xs">{activeCertificate.credential_id}</p></div>}</div>
              <div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous certificate"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next certificate"><ArrowRight size={18} /></button><button type="button" onClick={() => setModalOpen(true)} aria-label={`Open preview for ${activeCertificate.title}`} className="brutalist-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-4 font-mono text-[10px] font-black uppercase tracking-[0.1em] hover:bg-secondary">Open viewer <Maximize2 size={14} /></button></div>
              {activeCertificate.credential_url && <a href={activeCertificate.credential_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 border-2 border-foreground px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.1em] transition hover:bg-secondary">Verify credential <ExternalLink size={14} /></a>}
            </motion.div>}
          </aside>
        </div>
      </div>

      {mounted && createPortal(<AnimatePresence>{modalOpen && activeCertificate && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`Certificate viewer: ${activeCertificate.title}`}><button type="button" className="absolute inset-0 cursor-default bg-foreground/85 backdrop-blur-sm" onClick={() => setModalOpen(false)} aria-label="Close certificate viewer" /><motion.div initial={{ opacity: 0, y: 26, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ type: 'spring', stiffness: 280, damping: 26 }} className="relative z-10 grid max-h-[92vh] w-full max-w-6xl overflow-auto border-2 border-foreground bg-background shadow-[10px_10px_0_hsl(var(--secondary))] md:grid-cols-[1.25fr_0.75fr]"><div className="relative min-h-[280px] border-b-2 border-foreground bg-muted p-4 md:min-h-[650px] md:border-b-0 md:border-r-2 md:p-8"><CertificateArtwork cert={activeCertificate} preview /><span className="absolute bottom-4 left-4 bg-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-background">{String(safeIndex + 1).padStart(2, '0')} / {String(filteredCertificates.length).padStart(2, '0')}</span></div><div className="flex flex-col p-6 md:p-10"><div className="mb-12 flex items-start justify-between"><span className="section-label">Certificate detail</span><button type="button" onClick={() => setModalOpen(false)} className="brutalist-button -mr-2 -mt-2 flex h-10 w-10 items-center justify-center bg-primary" aria-label="Close certificate detail"><X size={18} /></button></div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-secondary">{activeCertificate.issuer}</p><h3 className="mb-10 text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeCertificate.title}</h3><div className="space-y-6 border-t-2 border-foreground pt-6 text-sm"><div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Category</p><p className="font-bold">{getCategory(activeCertificate)}</p></div>{activeCertificate.issue_date && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Issued</p><p className="font-bold">{formatDate(activeCertificate.issue_date)}</p></div>}{activeCertificate.credential_id && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Credential ID</p><p className="break-all font-mono text-xs">{activeCertificate.credential_id}</p></div>}</div><div className="mt-auto flex flex-wrap gap-3 pt-12"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous certificate"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next certificate"><ArrowRight size={18} /></button>{activeCertificate.credential_url && <a href={activeCertificate.credential_url} target="_blank" rel="noopener noreferrer" className="brutalist-button inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-primary px-4 font-mono text-[10px] font-black uppercase tracking-[0.1em] hover:bg-secondary">Verify <ExternalLink size={14} /></a>}</div></div></motion.div></motion.div>}</AnimatePresence>, document.body)}
    </section>
  );
});

export default Certificates;
