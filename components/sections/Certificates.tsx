'use client';

import { memo, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Award, ArrowLeft, ArrowRight, ExternalLink, GripHorizontal, ShieldCheck } from 'lucide-react';
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
    <motion.button type="button" layout drag={isTop && !reducedMotion} dragSnapToOrigin dragElastic={0.72} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90 || Math.abs(info.offset.y) > 90) onPromote(); }} onClick={() => isTop ? onPromote() : onSelect()} animate={{ opacity: 1 - depth * 0.08, x, y, scale, rotate }} whileDrag={{ scale: 1.03, rotate: rotate > 0 ? rotate + 3 : rotate - 3, cursor: 'grabbing' }} transition={{ type: 'spring', stiffness: 360, damping: 28 }} className={`group absolute inset-x-0 top-0 mx-auto w-[calc(100%-1.5rem)] max-w-[620px] text-left focus-visible:outline-none ${isTop ? 'z-40 cursor-grab' : 'z-30 cursor-pointer'}`} style={{ transformOrigin: '50% 12%' }} aria-label={`${isTop ? 'Show next' : 'Bring forward'} certificate: ${cert.title}`}>
      <span className="relative block overflow-hidden border-2 border-foreground bg-card p-2 shadow-[8px_8px_0_hsl(var(--foreground))] transition group-hover:shadow-[10px_10px_0_hsl(var(--secondary))]">
        <CertificateArtwork cert={cert} />
        <span className="block p-3 pb-2 md:flex md:items-end md:justify-between md:gap-6 md:p-4"><span className="min-w-0"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{getCategory(cert)} · {cert.issue_date ? new Date(cert.issue_date).getFullYear() : 'Credential'}</span><span className="block truncate text-xl font-black leading-tight tracking-tight md:text-2xl">{cert.title}</span></span><span className="mt-3 inline-flex shrink-0 items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-muted-foreground md:mt-0">{isTop ? 'Click / drag to swap' : 'Bring forward'} <ArrowRight size={13} /></span></span>
      </span>
      {isTop && <span className="absolute -bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 bg-foreground px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.12em] text-background"><GripHorizontal size={13} /> explore deck</span>}
    </motion.button>
  );
}

const Certificates = memo(function Certificates({ certificates }: CertificatesProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [activeCategory, setActiveCategory] = useState<'All' | CertificateCategory>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);

  const availableCategories = useMemo(() => { const present = new Set(certificates.map(getCategory)); return categoryRules.map((rule) => rule.label).filter((label) => present.has(label)); }, [certificates]);
  const filteredCertificates = useMemo(() => activeCategory === 'All' ? certificates : certificates.filter((cert) => getCategory(cert) === activeCategory), [activeCategory, certificates]);
  const safeIndex = filteredCertificates.length ? activeIndex % filteredCertificates.length : 0;
  const activeCertificate = filteredCertificates[safeIndex] || null;
  const visibleCards = filteredCertificates.length ? Array.from({ length: Math.min(4, filteredCertificates.length) }, (_, depth) => ({ cert: filteredCertificates[(safeIndex + depth) % filteredCertificates.length], depth })) : [];

  if (!certificates?.length) return null;

  const move = (direction: 1 | -1) => setActiveIndex((current) => (current + direction + filteredCertificates.length) % filteredCertificates.length);
  const changeCategory = (category: 'All' | CertificateCategory) => { setActiveCategory(category); setActiveIndex(0); };

  return (
    <section id="certificates" className="relative overflow-hidden border-t-2 border-foreground bg-background py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-8 select-none font-black text-[17vw] leading-none tracking-[-0.1em] text-foreground/[0.04]" aria-hidden="true">STACK</div>
      <div className="container relative z-10 mx-auto px-6">
        <ScrollReveal><div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end"><div><p className="section-label mb-6">Proof of practice</p><h2 className="text-5xl font-black leading-[0.9] tracking-tight md:text-8xl">Earned,<br /><span className="text-primary">not claimed.</span></h2></div><p className="max-w-xs border-l-2 border-secondary pl-4 font-mono text-xs uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">A tactile archive of licenses, learning milestones, and verified technical work.</p></div></ScrollReveal>
        <div className="mb-10 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Filter certificates by category">{(['All', ...availableCategories] as const).map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => changeCategory(category)} className={`brutalist-button shrink-0 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.12em] ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground hover:bg-secondary'}`}>{category}</button>)}<span className="ml-auto hidden items-center font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground md:flex">{filteredCertificates.length} records</span></div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start lg:gap-20"><div><div className="relative mx-auto h-[430px] w-full max-w-[680px] sm:h-[500px]" aria-label="Interactive certificate stack" onMouseEnter={() => setDeckHovered(true)} onMouseLeave={() => setDeckHovered(false)} onFocus={() => setDeckHovered(true)} onBlur={() => setDeckHovered(false)}><AnimatePresence initial={false}>{visibleCards.slice().reverse().map(({ cert, depth }) => <DeckCard key={`${cert.id}-${safeIndex}-${depth}`} cert={cert} depth={depth} reducedMotion={reducedMotion} opened={deckHovered} onSelect={() => setActiveIndex((safeIndex + depth) % filteredCertificates.length)} onPromote={() => move(1)} />)}</AnimatePresence></div><div className="mx-auto mt-5 flex max-w-[620px] items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"><span>Deck {String(safeIndex + 1).padStart(2, '0')} / {String(filteredCertificates.length).padStart(2, '0')}</span><div className="flex-1 border-t-2 border-foreground/15" /><span>{reducedMotion ? 'Keyboard ready' : 'Click, drag, or swipe'}</span></div></div>

          <aside className="lg:sticky lg:top-28">{activeCertificate && <motion.div key={activeCertificate.id} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }} className="border-2 border-foreground bg-card p-5 shadow-[8px_8px_0_hsl(var(--secondary))] md:p-7"><div className="mb-10 flex items-center justify-between gap-3"><span className="section-label">Foreground certificate</span><span className="bg-foreground px-2 py-1 font-mono text-[10px] font-black text-background">{String(safeIndex + 1).padStart(2, '0')}</span></div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-secondary">{activeCertificate.issuer}</p><h3 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">{activeCertificate.title}</h3><div className="mt-8 space-y-5 border-t-2 border-foreground pt-6 text-sm"><div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Category</p><p className="font-bold">{getCategory(activeCertificate)}</p></div>{activeCertificate.issue_date && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Issued</p><p className="font-bold">{formatDate(activeCertificate.issue_date)}</p></div>}{activeCertificate.credential_id && <div><p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Credential ID</p><p className="break-all font-mono text-xs">{activeCertificate.credential_id}</p></div>}</div><div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => move(-1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Previous certificate"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} className="brutalist-button flex h-11 w-11 items-center justify-center bg-background" aria-label="Next certificate"><ArrowRight size={18} /></button></div>{activeCertificate.credential_url && <a href={activeCertificate.credential_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 border-2 border-foreground px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.1em] transition hover:bg-secondary">Verify credential <ExternalLink size={14} /></a>}</motion.div>}</aside>
        </div>
      </div>
    </section>
  );
});

export default Certificates;
