'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Award, ArrowLeft, ArrowRight, ExternalLink, Eye, GripHorizontal, Layers3, ShieldCheck, X } from 'lucide-react';
import type { Certificate } from '@/types/certificate';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { formatDate } from '@/lib/utils';

interface CertificatesProps { certificates: Certificate[]; }
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

function CertificateArtwork({ cert }: { cert: Certificate }) {
  return (
    <div className="relative isolate h-[250px] overflow-hidden bg-muted sm:h-[300px]">
      <div className="absolute inset-0 paper-grid opacity-60" aria-hidden="true" />
      {cert.image ? <Image src={cert.image} alt={cert.title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 42vw" className="relative z-10 object-contain p-4 md:p-7" /> : <div className="relative z-10 flex h-full items-center justify-center"><Award size={82} strokeWidth={1.1} className="text-foreground/30" /></div>}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-80" />
      <div className="absolute left-3 top-3 z-30 flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 bg-primary px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-primary-foreground"><ShieldCheck size={12} /><span className="truncate">{cert.issuer}</span></div>
    </div>
  );
}

function DeckCard({ cert, depth, reducedMotion, opened, onSelect, onPromote }: { cert: Certificate; depth: number; reducedMotion: boolean; opened: boolean; onSelect: () => void; onPromote: () => void }) {
  const isTop = depth === 0;
  const rotate = (opened ? [-3.8, 3.8, -3, 4.5] : [-2.2, 1.8, -1.1, 2.4])[depth];
  const x = (opened ? [0, 34, -31, 25] : [0, 18, -16, 12])[depth];
  const y = (opened ? [0, 20, 40, 58] : [0, 15, 30, 44])[depth];
  const scale = (opened ? [1, 0.955, 0.91, 0.865] : [1, 0.965, 0.93, 0.895])[depth];

  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      animate={{ opacity: 1 - depth * 0.08, x, y, scale, rotate }}
      whileHover={{ y: y - 6, scale: scale * 1.01 }}
      transition={{ type: 'spring', stiffness: 340, damping: 26 }}
      className={`group absolute inset-x-0 top-0 mx-auto w-[calc(100%-1.5rem)] max-w-[620px] text-left focus-visible:outline-none ${isTop ? 'z-40 cursor-pointer' : 'z-30 cursor-pointer'}`}
      style={{ transformOrigin: '50% 12%' }}
      aria-label={`Open certificate archive at ${cert.title}`}
    >
      <span className="relative block overflow-hidden border border-border bg-card p-2 hover:border-primary transition-colors">
        <CertificateArtwork cert={cert} />
        <span className="block p-3 pb-2 md:flex md:items-end md:justify-between md:gap-6 md:p-4">
          <span className="min-w-0">
            <span className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {getCategory(cert)} · {cert.issue_date ? new Date(cert.issue_date).getFullYear() : 'Credential'}
            </span>
            <span className="block truncate text-xl font-black leading-tight tracking-tight md:text-2xl">
              {cert.title}
            </span>
          </span>
          <span className="mt-3 inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary md:mt-0">
            Open archive <Layers3 size={13} />
          </span>
        </span>
      </span>
      {isTop && (
        <span className="absolute -bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
          <GripHorizontal size={13} /> explore deck
        </span>
      )}
    </motion.button>
  );
}

function CertificateArchiveModal({ certificates, selectedId, reducedMotion, onSelect, onClose }: { certificates: Certificate[]; selectedId: Certificate['id']; reducedMotion: boolean; onSelect: (id: Certificate['id']) => void; onClose: () => void }) {
  const selectedCertificate = certificates.find((cert) => cert.id === selectedId) || certificates[0];
  const [previewId, setPreviewId] = useState<Certificate['id'] | null>(null);
  const previewIndex = previewId === null ? -1 : certificates.findIndex((cert) => cert.id === previewId);
  const previewCertificate = previewIndex >= 0 ? certificates[previewIndex] : null;

  const movePreview = useCallback((direction: 1 | -1) => {
    if (!certificates.length || previewIndex < 0) return;
    const nextIndex = (previewIndex + direction + certificates.length) % certificates.length;
    const nextCertificate = certificates[nextIndex];
    onSelect(nextCertificate.id);
    setPreviewId(nextCertificate.id);
  }, [certificates, onSelect, previewIndex]);

  const closeAll = useCallback(() => {
    setPreviewId(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
      if (previewId !== null && event.key === 'ArrowLeft') movePreview(-1);
      if (previewId !== null && event.key === 'ArrowRight') movePreview(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAll, movePreview, previewId]);

  const showCertificate = (cert: Certificate) => {
    onSelect(cert.id);
    setPreviewId(cert.id);
  };

  return (
    <motion.div className="fixed inset-0 z-[900] overflow-x-hidden overflow-y-scroll overscroll-contain bg-background/95 [scrollbar-gutter:stable] backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Certificate archive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="pointer-events-none fixed inset-0 z-0 paper-grid opacity-40" aria-hidden="true" />
      <div className="relative z-10 mx-auto min-h-[100dvh] max-w-7xl px-5 py-6 pb-32 md:px-10 md:py-10 md:pb-40">
        <header className="sticky top-3 z-[80] mb-10 flex items-center justify-between gap-4 border border-border bg-background/95 p-3 backdrop-blur md:p-4">
          <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground"><Layers3 size={19} /></span><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Credential archive / {certificates.length} records</p><p className="truncate text-sm font-black md:text-lg">Scroll all cards · click one to show it</p></div></div>
          <button type="button" onClick={onClose} className="brutalist-button flex h-11 w-11 shrink-0 items-center justify-center bg-background hover:bg-muted" aria-label="Close certificate archive"><X size={20} /></button>
        </header>

        <div className="grid grid-cols-1 gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-3" aria-label="All certificates">
          {certificates.map((cert, index) => {
            const isSelected = cert.id === selectedCertificate?.id;
            const scatterX = ((index % 5) - 2) * 55;
            const scatterY = ((index % 3) - 1) * 45;
            const rotation = ((index * 7) % 13) - 6;
            return (
              <motion.button key={cert.id} type="button" onClick={() => showCertificate(cert)} initial={reducedMotion ? false : { opacity: 0, x: scatterX, y: scatterY, rotate: rotation * 3, scale: 0.45 }} animate={{ opacity: 1, x: 0, y: 0, rotate: isSelected ? 0 : rotation, scale: isSelected ? 1.035 : 1 }} transition={{ delay: reducedMotion ? 0 : Math.min(index * 0.065, 0.75), type: 'spring', stiffness: 170, damping: 18 }} whileHover={reducedMotion ? undefined : { y: -10, rotate: 0, scale: 1.025 }} className={`group relative text-left ${isSelected ? 'z-20' : 'z-10'}`} aria-label={`Show certificate: ${cert.title}`}>
                <span className={`block overflow-hidden border bg-card p-2 transition-all ${isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-border hover:border-primary'}`}>
                  <span className="relative block aspect-[4/3] overflow-hidden bg-muted"><span className="absolute inset-0 z-0 paper-grid opacity-50" />{cert.image ? <Image src={cert.image} alt={cert.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="z-10 object-contain p-3" /> : <span className="relative z-10 flex h-full items-center justify-center"><Award size={58} className="text-foreground/25" /></span>}<span className="absolute right-2 top-2 z-20 bg-foreground/90 px-2 py-1 text-xs font-bold text-background">{index + 1}</span></span>
                  <span className="block p-4"><span className="mb-2 block text-xs uppercase tracking-wider text-primary font-medium">{getCategory(cert)} · {cert.issuer}</span><span className="block text-lg font-black leading-tight">{cert.title}</span><span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary"><Eye size={13} /> Show certificate</span></span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(<AnimatePresence>
        {previewCertificate && (
          <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`Certificate preview: ${previewCertificate.title}`}>
            <button type="button" className="absolute inset-0 z-0 cursor-default" onClick={closeAll} aria-label="Close certificate preview" />
            <motion.div key={previewCertificate.id} initial={reducedMotion ? false : { opacity: 0, y: 35, rotate: -2, scale: 0.9 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} exit={{ opacity: 0, y: -25, scale: 0.94 }} transition={{ type: 'spring', stiffness: 230, damping: 24 }} className="relative z-[1010] grid max-h-[92dvh] w-full max-w-6xl overflow-y-auto border border-border bg-background shadow-2xl lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
              <div className="relative isolate min-h-[48dvh] bg-muted lg:min-h-[78dvh]">
                <div className="absolute inset-0 z-0 paper-grid opacity-50" />
                {previewCertificate.image ? <Image src={previewCertificate.image} alt={previewCertificate.title} fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="z-10 object-contain p-4 md:p-8" /> : <div className="relative z-10 flex h-full min-h-[48dvh] items-center justify-center"><Award size={120} strokeWidth={1} className="text-foreground/20" /></div>}
                <div className="absolute left-3 top-3 z-20 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">{previewIndex + 1} / {certificates.length}</div>
              </div>

              <div className="flex flex-col justify-between border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-7">
                <div><p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">{previewCertificate.issuer}</p><h3 className="text-3xl font-black leading-tight tracking-tight">{previewCertificate.title}</h3><div className="mt-7 space-y-4 border-t border-border pt-5 text-sm"><div><p className="text-xs uppercase tracking-wider text-muted-foreground">Category</p><p className="mt-1 font-bold">{getCategory(previewCertificate)}</p></div>{previewCertificate.issue_date && <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Issued</p><p className="mt-1 font-bold">{formatDate(previewCertificate.issue_date)}</p></div>}{previewCertificate.credential_id && <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Credential ID</p><p className="mt-1 break-all font-mono text-xs">{previewCertificate.credential_id}</p></div>}</div></div>
                <div className="mt-8 space-y-3"><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => movePreview(-1)} className="brutalist-button inline-flex min-h-11 items-center justify-center gap-2 bg-background text-xs font-bold uppercase tracking-wider"><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => movePreview(1)} className="brutalist-button inline-flex min-h-11 items-center justify-center gap-2 bg-background text-xs font-bold uppercase tracking-wider">Next <ArrowRight size={16} /></button></div>{previewCertificate.credential_url && <a href={previewCertificate.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-primary px-4 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">Verify credential <ExternalLink size={14} /></a>}</div>
              </div>

              <button type="button" onClick={closeAll} className="absolute right-3 top-3 z-50 flex h-11 w-11 items-center justify-center border border-border bg-black text-white transition hover:bg-primary hover:text-primary-foreground" aria-label="Close certificate preview"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </motion.div>
  );
}

const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<'All' | CertificateCategory>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);
  const [archiveSelection, setArchiveSelection] = useState<Certificate['id'] | null>(null);

  const availableCategories = useMemo(() => { const present = new Set(certificates.map(getCategory)); return categoryRules.map((rule) => rule.label).filter((label) => present.has(label)); }, [certificates]);
  const filteredCertificates = useMemo(() => activeCategory === 'All' ? certificates : certificates.filter((cert) => getCategory(cert) === activeCategory), [activeCategory, certificates]);
  const safeIndex = filteredCertificates.length ? activeIndex % filteredCertificates.length : 0;
  const activeCertificate = filteredCertificates[safeIndex] || null;
  const visibleCards = filteredCertificates.length ? Array.from({ length: Math.min(4, filteredCertificates.length) }, (_, depth) => ({ cert: filteredCertificates[(safeIndex + depth) % filteredCertificates.length], depth })) : [];

  const move = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + filteredCertificates.length) % filteredCertificates.length);
  const changeCategory = (category: 'All' | CertificateCategory) => { setActiveCategory(category); setActiveIndex(0); };

  useEffect(() => {
    if (reducedMotion || deckHovered || archiveSelection !== null || filteredCertificates.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveIndex((current) => (current + 1) % filteredCertificates.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [archiveSelection, deckHovered, filteredCertificates.length, reducedMotion]);

  if (!certificates?.length) return null;

  return (
    <>
      <section id="certificates" className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <div className="container relative z-10 mx-auto px-6">
        <ScrollReveal><div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end"><div><h2 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">Earned Credentials.</h2><p className="mt-2 text-sm text-muted-foreground">Verified licenses and technical credentials.</p></div><p className="max-w-xs border-l-2 border-primary pl-4 text-sm uppercase leading-relaxed tracking-wider text-muted-foreground">A curated archive of licenses, learning milestones, and verified technical work.</p></div></ScrollReveal>
        <div className="mb-10 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Filter certificates by category">{(['All', ...availableCategories] as const).map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => changeCategory(category)} className={`brutalist-button shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-muted'}`}>{category}</button>)}<span className="ml-auto hidden items-center text-xs uppercase tracking-wider text-muted-foreground md:flex">{filteredCertificates.length} records</span></div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-20">
          <div>
            <div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[500px]" aria-label="Interactive certificate stack" onMouseEnter={() => setDeckHovered(true)} onMouseLeave={() => setDeckHovered(false)} onFocus={() => setDeckHovered(true)} onBlur={() => setDeckHovered(false)}>
              <AnimatePresence initial={false}>
                {visibleCards.slice().reverse().map(({ cert, depth }) => <DeckCard key={`${cert.id}-${safeIndex}-${depth}`} cert={cert} depth={depth} reducedMotion={reducedMotion} opened={deckHovered} onSelect={() => setArchiveSelection(cert.id)} onPromote={() => move(1)} />)}
              </AnimatePresence>
            </div>
            <div className="mx-auto mt-5 max-w-[620px]">
              <div className="mb-3 h-1 overflow-hidden bg-foreground/10" aria-hidden="true">
                {!reducedMotion && !deckHovered && <motion.div key={safeIndex} className="h-full bg-primary-highlight" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2, ease: 'linear' }} />}
              </div>
              <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Deck {safeIndex + 1} / {filteredCertificates.length}</span>
                <div className="flex-1 border-t border-border" />
                <span>{deckHovered ? 'Autoplay paused' : reducedMotion ? 'Ready' : 'Click to view all'}</span>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            {activeCertificate && <motion.div key={activeCertificate.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="border border-border bg-card p-5 md:p-7 shadow-lg"><h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeCertificate.title}</h3><div className="mt-3 flex items-center gap-3"><span className="text-xs font-bold uppercase tracking-wider text-primary">{activeCertificate.issuer}</span><span className="text-xs text-muted-foreground">·</span><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Credential {safeIndex + 1} of {filteredCertificates.length}</span></div><div className="mt-8 space-y-5 border-t border-border pt-6 text-sm"><div><p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Category</p><p className="font-bold">{getCategory(activeCertificate)}</p></div>{activeCertificate.issue_date && <div><p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Issued</p><p className="font-bold">{formatDate(activeCertificate.issue_date)}</p></div>}{activeCertificate.credential_id && <div><p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Credential ID</p><p className="break-all text-xs font-medium">{activeCertificate.credential_id}</p></div>}</div><div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous certificate"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next certificate"><ArrowRight size={18} /></button></div>{activeCertificate.credential_url && <a href={activeCertificate.credential_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-primary hover:text-primary-foreground">Verify credential <ExternalLink size={14} /></a>}</motion.div>}
          </aside>
        </div>
      </div>
      </section>
      <AnimatePresence>{archiveSelection !== null && <CertificateArchiveModal certificates={filteredCertificates} selectedId={archiveSelection} reducedMotion={reducedMotion} onSelect={setArchiveSelection} onClose={() => setArchiveSelection(null)} />}</AnimatePresence>
    </>
  );
});

export default Certificates;
