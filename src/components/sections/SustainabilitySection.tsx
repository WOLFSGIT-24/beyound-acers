import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SustainabilityFeatures } from '@/entities';
import { Image } from '@/components/ui/image';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 24,
}: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.unobserve(el); } },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 1.1s ease, transform 1.1s ease',
    }}>{children}</div>
  );
}

/* ─── Feature data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    num: '01',
    title: 'Biodiversity-Led Living',
    desc: 'Native trees, flowering species, and pollinator-friendly landscapes create thriving green corridors that support local ecosystems while naturally cooling the environment.',
    img: 'https://static.wixstatic.com/media/cef78c_a669ed37fb4446029415afd5eae42df8~mv2.png',
  },
  {
    num: '02',
    title: 'Engineered Invisible Luxury',
    desc: '100% underground utilities preserve uninterrupted natural views, cleaner streetscapes, and a safer, clutter-free living experience.',
    img: 'https://static.wixstatic.com/media/cef78c_ea42cef20a5b406e8cbf061952ea58ac~mv2.png',
  },
  {
    num: '03',
    title: 'Intelligent Water Management',
    desc: 'Rainwater recharge systems, sponge street engineering, advanced stormwater management, and permeable pathways work together to sustain the land naturally.',
    img: 'https://static.wixstatic.com/media/cef78c_d830b0deb763462b90ac23cbdc631f05~mv2.png',
  },
  {
    num: '04',
    title: 'Nature-First Streetscapes',
    desc: 'Tree-lined avenues, shaded walkways, cycling tracks, and ecological planting systems are designed to encourage healthier, greener lifestyles.',
    img: 'https://static.wixstatic.com/media/cef78c_a36b0ff2c2f341b98b69e790eae1988e~mv2.png',
  },
  {
    num: '05',
    title: 'Eco-Smart Infrastructure',
    desc: 'Sustainable road networks, smart electrical systems, advanced water treatment, and integrated planning ensure long-term environmental efficiency.',
    img: 'https://static.wixstatic.com/media/cef78c_ce5a56c1ceb643d29dd01b9035a0adbc~mv2.png',
  },
  {
    num: '06',
    title: 'Wellness Through Green Spaces',
    desc: 'Riverfront terraces, biodiversity parks, wellness groves, and open green zones create spaces that reconnect everyday living with nature.',
    img: 'https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png',
  },
];

/* ─── Detailed pillar data ───────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Biodiversity-Led Living',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12C12 7 7 3 3 5c4 0 7 3 9 7"/><path d="M12 12c0-5 5-9 9-7-4 0-7 3-9 7"/>
      </svg>
    ),
    summary: '2,000+ native trees · 10,000+ shrubs · Living green corridors',
    body: '2,000+ native trees and 10,000+ shrubs thoughtfully integrated across the township to create living green corridors inspired by Mysuru\'s natural ecology. Every street is designed as a micro-ecosystem named after native birds, butterflies, and pollinators, fostering biodiversity while naturally cooling the environment.',
    stats: [
      { value: '2,000+', label: 'Native Trees' },
      { value: '10,000+', label: 'Shrubs & Plants' },
      { value: '35%', label: 'Open Spaces' },
    ],
  },
  {
    num: '02',
    title: 'Engineered Invisible Luxury',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
    summary: '100% underground utilities · 1.5 km+ compound wall · 12m & 9m roads',
    body: '100% underground utilities, 1.5 km+ compound wall infrastructure, and thoughtfully engineered road networks create a clutter-free, future-ready living experience. Wide 12m & 9m roads, dedicated cycling tracks, pedestrian pathways, and permeable paving ensure seamless movement with sustainable planning built in.',
    stats: [
      { value: '100%', label: 'Underground Utilities' },
      { value: '1.5 km+', label: 'Compound Wall' },
      { value: '12m & 9m', label: 'Road Widths' },
    ],
  },
  {
    num: '03',
    title: 'Intelligent Water Management',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    summary: '50+ recharge pits · 100 mm/hr rainfall capacity · SBR-based STP',
    body: 'Designed with 50+ recharge pits capable of handling up to 100 mm/hr rainfall, supported by RCC-structured irrigation canals and engineered stormwater systems. The development also features rainwater harvesting, SBR-based STP technology, grey water reuse for landscaping, and 100-year floodline considerations for long-term resilience.',
    stats: [
      { value: '50+', label: 'Recharge Pits' },
      { value: '100 mm/hr', label: 'Rainfall Capacity' },
      { value: '100-yr', label: 'Floodline Planning' },
    ],
  },
  {
    num: '04',
    title: 'Nature-First Streetscapes',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    summary: '21 acres · 3.15-acre park ecosystem · Riverfront terraces',
    body: 'Spread across 21 acres with 35% open spaces and a 3.15-acre park ecosystem, the township blends biodiversity parks, wellness groves, riverfront terraces, herbal gardens, pollination meadows, and shaded walkways to create a healthier and more immersive outdoor lifestyle.',
    stats: [
      { value: '21', label: 'Acres' },
      { value: '3.15', label: 'Acre Park Ecosystem' },
      { value: '35%', label: 'Open Spaces' },
    ],
  },
  {
    num: '05',
    title: 'Eco-Smart Infrastructure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    summary: 'Karnataka\'s 1st eco-engineered plotted development · 14/17 UN SDGs',
    body: 'Karnataka\'s 1st eco-engineered plotted development with 330+ premium plots, solar-assisted street lighting, permeable landscape zones, sustainable drainage systems, and water-conscious planning aligned with 14 out of the 17 UN Sustainable Development Goals, creating a self-sustaining community designed for the future.',
    stats: [
      { value: '330+', label: 'Premium Plots' },
      { value: '14/17', label: 'UN SDGs Aligned' },
      { value: '1st', label: 'In Karnataka' },
    ],
  },
];

/* ─── Mobile sustainability slider ──────────────────────────────────────── */
const MOBILE_SLIDES = FEATURES; /* reuse the same 6 feature cards */

function SustainabilityMobileSlider() {
  const N = MOBILE_SLIDES.length;
  /* Triple for infinite loop */
  const ALL = [...MOBILE_SLIDES, ...MOBILE_SLIDES, ...MOBILE_SLIDES];

  const [index, setIndex] = useState(N);
  const [animated, setAnimated] = useState(true);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const display = ((index - N) % N + N) % N;

  const advance = useCallback(() => {
    setAnimated(true);
    setIndex(i => i + 1);
  }, []);

  /* Silent recentre */
  useEffect(() => {
    if (!animated) return;
    const id = setTimeout(() => {
      setIndex(i => {
        if (i < N || i >= N * 2) {
          setAnimated(false);
          return N + ((i - N) % N + N) % N;
        }
        return i;
      });
    }, 620);
    return () => clearTimeout(id);
  }, [index, animated, N]);

  /* Autoplay */
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) advance();
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const pauseTemporarily = useCallback(() => {
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, 2500);
  }, []);

  const prev = useCallback(() => {
    setAnimated(true); setIndex(i => i - 1); pauseTemporarily();
  }, [pauseTemporarily]);

  const next = useCallback(() => {
    setAnimated(true); setIndex(i => i + 1); pauseTemporarily();
  }, [pauseTemporarily]);

  const goTo = useCallback((base: number) => {
    setAnimated(true);
    setIndex(N + ((base % N) + N) % N);
    pauseTemporarily();
  }, [N, pauseTemporarily]);

  /* Touch swipe */
  const touchStartX = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 44) { if (delta > 0) next(); else prev(); }
  }, [next, prev]);

  const GAP = 16;
  const CARD_W_VAR = '87vw';

  return (
    <div className="su-mobile-slider">
      {/* Viewport */}
      <div
        className="su-ms-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="su-ms-track"
          style={{
            transform: `translateX(calc(50% - ${CARD_W_VAR} / 2 - ${index} * (${CARD_W_VAR} + ${GAP}px)))`,
            transition: animated ? 'transform 0.58s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {ALL.map((slide, i) => {
            const dist = Math.abs(i - index);
            const isActive = dist === 0;
            return (
              <div
                key={i}
                className="su-ms-card"
                onClick={() => { if (!isActive) goTo(i % N); }}
                style={{
                  opacity: isActive ? 1 : 0.35,
                  transform: isActive ? 'scale(1)' : 'scale(0.94)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  cursor: isActive ? 'default' : 'pointer',
                  pointerEvents: dist > 2 ? 'none' : 'auto',
                }}
              >
                {/* Image */}
                <div className="su-ms-img-wrap">
                  <Image src={slide.img} alt={slide.title} className="su-ms-img" />
                  {/* gradient overlay */}
                  <div className="su-ms-img-overlay" />
                  {/* Number badge */}
                  <span className="su-ms-num">{slide.num}</span>
                </div>
                {/* Text */}
                <div className="su-ms-body">
                  <h3 className="su-ms-title">{slide.title}</h3>
                  <p className="su-ms-desc">{slide.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots + counter row */}
      <div className="su-ms-controls">
        <div className="su-ms-dots">
          {MOBILE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`su-ms-dot${i === display ? ' su-ms-dot--active' : ''}`}
            />
          ))}
        </div>
        <span className="su-ms-counter">
          {String(display + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

/* ─── Pillars sub-section ────────────────────────────────────────────────── */
function SustainabilityPillars() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  return (
    <div style={{
      background: '#0a1f1e',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Section label */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(36px, 5vh, 64px) clamp(24px, 5vw, 64px) clamp(28px, 4vh, 40px)',
      }}>
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            }}>
              The Five Pillars of Sustainability
            </span>
          </div>
        </Reveal>
      </div>

      {/* Pillar rows */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 64px) clamp(36px, 5vh, 64px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {PILLARS.map((p, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 40}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

                {/* ── Trigger row ── */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%', textAlign: 'left', background: 'none',
                    border: 'none', cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: 'clamp(40px,5vw,56px) 1fr auto',
                    alignItems: 'center',
                    gap: 'clamp(16px, 2.5vw, 28px)',
                    padding: 'clamp(20px, 3vh, 28px) 0',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: "'DM Sans', Roboto, sans-serif",
                    fontWeight: 400, fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                    color: 'rgba(255,255,255,0.22)', letterSpacing: '0.08em',
                    flexShrink: 0,
                  }}>
                    {p.num}
                  </span>

                  {/* Title + summary */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '5px' }}>
                      <span style={{ color: isOpen ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', transition: 'color 0.3s ease', flexShrink: 0 }}>
                        {p.icon}
                      </span>
                      <h3 style={{
                        fontFamily: "'DM Sans', Roboto, sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(1.2rem, 2vw, 1.7rem)',
                        lineHeight: 1, letterSpacing: '-0.015em',
                        color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.82)',
                        margin: 0, transition: 'color 0.3s ease',
                      }}>
                        {p.title}
                      </h3>
                    </div>
                    <p style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                      fontSize: 'clamp(0.75rem, 0.88vw, 0.85rem)',
                      color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em',
                      margin: 0,
                    }}>
                      {p.summary}
                    </p>
                  </div>

                  {/* Toggle icon */}
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '32px', height: '32px', flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.45)',
                    transition: 'transform 0.35s ease, border-color 0.3s ease, color 0.3s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    ...(isOpen ? { borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)' } : {}),
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </button>

                {/* ── Expanded content ── */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: isOpen ? '400px' : '0px',
                  opacity: isOpen ? 1 : 0,
                  transition: 'max-height 0.5s ease, opacity 0.4s ease',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 'clamp(24px, 4vw, 48px)',
                    paddingBottom: 'clamp(24px, 3.5vh, 32px)',
                    paddingLeft: 'clamp(56px, 7.5vw, 84px)',
                    alignItems: 'start',
                  }}
                    className="su-pillar-inner"
                  >
                    {/* Body text */}
                    <p style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      lineHeight: 1.9, color: 'rgba(255,255,255,0.55)',
                      margin: 0, maxWidth: '640px',
                    }}>
                      {p.body}
                    </p>

                    {/* Stats — 3 mini tiles */}
                    <div style={{
                      display: 'flex', flexDirection: 'column', gap: '1px',
                      background: 'rgba(255,255,255,0.06)',
                      flexShrink: 0, minWidth: 'clamp(140px, 18vw, 200px)',
                    }}>
                      {p.stats.map((s, si) => (
                        <div key={si} style={{
                          padding: 'clamp(10px, 1.5vh, 14px) clamp(12px, 1.8vw, 18px)',
                          background: '#0a1f1e',
                        }}>
                          <span style={{
                            fontFamily: "'DM Sans', Roboto, sans-serif",
                            fontWeight: 700,
                            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                            lineHeight: 1, letterSpacing: '-0.02em',
                            color: '#ffffff', display: 'block', marginBottom: '3px',
                          }}>
                            {s.value}
                          </span>
                          <span style={{
                            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                            fontSize: '9px', letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                          }}>
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

interface SustainabilitySectionProps {
  sustainabilityFeatures: SustainabilityFeatures[];
  isLoading: boolean;
}

export default function SustainabilitySection({ sustainabilityFeatures, isLoading }: SustainabilitySectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(p => (p + 1) % FEATURES.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="sustainability" style={{ background: '#ffffff' }}>

      {/* ══════════════════════════════════════════════════════════════
          CINEMATIC HEADER — full-width with nature image background
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Background nature image — very subtle, mostly faded */}
        <Image src="https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png" alt="" aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 60%',
            zIndex: 0,
            filter: 'saturate(0.6) brightness(1.1)',
          }} />
        {/* Heavy overlay — almost fully opaque so image is a whisper, not a photo */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(160deg, rgba(244,241,236,0.97) 0%, rgba(244,241,236,0.88) 50%, rgba(220,230,220,0.92) 100%)',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1280px', margin: '0 auto',
          padding: 'clamp(36px, 5vh, 64px) clamp(24px, 5vw, 64px) clamp(36px, 5vh, 64px)',
        }}>

          {/* Eyebrow */}
          <Reveal delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(24px, 3.5vh, 40px)' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                fontSize: '10px', letterSpacing: '0.26em',
                textTransform: 'uppercase', color: '#C9A84C',
              }}>
                Sustainability
              </span>
            </div>
          </Reveal>

          {/* Two-column: headline left, body right */}
          <div className="su-header-grid">

            {/* LEFT — headline */}
            <Reveal delay={70}>
              <div>
                <h2 style={{
                  fontFamily: "'DM Sans', Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.6rem, 5vw, 5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.025em',
                  color: '#003539',
                  marginBottom: 'clamp(16px, 2.5vh, 24px)',
                }}>
                  Designed to<br />Live with Nature
                </h2>
                <div style={{ width: '40px', height: '1px', background: 'rgba(0,53,57,0.3)' }} />
              </div>
            </Reveal>

            {/* RIGHT — approved body copy */}
            <Reveal delay={160}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vh, 22px)' }}>
                <p style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                  fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                  lineHeight: 1.95, color: 'rgba(33,37,41,0.72)',
                }}>
                  At Codename: Unstoppable 2.0,{' '}
                  <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.85)' }}>
                    sustainability is not an afterthought.
                  </strong>{' '}
                  It is woven into the foundation of the community. Every avenue,
                  landscape, and infrastructure system is planned to preserve biodiversity,
                  enhance wellness, and create a future-ready environment that lives in
                  harmony with nature.
                </p>

                {/* Three nature pillars — inline tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Biodiversity', 'Wellness', 'Eco-Infrastructure', 'Water Management', 'Green Streetscapes', 'Riverfront Living'].map((tag, i) => (
                    <span key={i} style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '10px', letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(0,53,57,0.55)',
                      background: 'rgba(0,53,57,0.07)',
                      padding: '5px 12px',
                      border: '1px solid rgba(0,53,57,0.1)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE SLIDER — shown only on mobile (≤ 767px)
          Desktop accordion panel below is hidden on mobile via CSS
      ══════════════════════════════════════════════════════════════ */}
      <div className="su-mobile-only">
        <SustainabilityMobileSlider />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE PANEL — accordion + image (desktop / tablet only)
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="su-desktop-only"
        style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px) clamp(36px, 5vh, 64px)',
        }}
      >
        <Reveal delay={80} y={20}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              border: '1px solid rgba(0,53,57,0.1)',
            }}
            className="su-panel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* LEFT — accordion */}
            <div style={{ borderRight: '1px solid rgba(0,53,57,0.1)' }}>
              {FEATURES.map((f, i) => {
                const isActive = active === i;
                return (
                  <div key={i} style={{ borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(0,53,57,0.08)' : 'none' }}>
                    <button
                      onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
                      style={{
                        width: '100%', textAlign: 'left',
                        display: 'flex', alignItems: 'flex-start',
                        gap: 'clamp(12px, 1.8vw, 20px)',
                        padding: 'clamp(14px, 2.2vh, 20px) clamp(16px, 2.5vw, 28px)',
                        background: isActive ? '#003539' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.35s ease',
                      }}
                    >
                      {/* Number */}
                      <span style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                        fontSize: '11px', letterSpacing: '0.08em',
                        color: isActive ? 'rgba(255,255,255,0.35)' : 'rgba(0,53,57,0.25)',
                        flexShrink: 0, marginTop: '3px',
                        transition: 'color 0.35s ease',
                      }}>
                        {f.num}
                      </span>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Title + arrow */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <h3 style={{
                            fontFamily: "'DM Sans', Roboto, sans-serif",
                            fontWeight: 700,
                            fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                            lineHeight: 1.2, letterSpacing: '-0.01em',
                            color: isActive ? '#ffffff' : '#003539',
                            margin: 0, transition: 'color 0.35s ease',
                          }}>
                            {f.title}
                          </h3>
                          <span style={{
                            color: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(0,53,57,0.25)',
                            fontSize: '14px', flexShrink: 0,
                            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.35s ease, color 0.35s ease',
                            display: 'inline-block',
                          }}>
                            →
                          </span>
                        </div>

                        {/* Progress bar */}
                        {isActive && !paused && (
                          <div style={{
                            marginTop: '10px', height: '1px',
                            background: 'rgba(255,255,255,0.12)', overflow: 'hidden',
                          }}>
                            <div style={{
                              height: '100%', background: 'rgba(255,255,255,0.45)',
                              animation: 'suProgress 2.4s linear forwards',
                            }} />
                          </div>
                        )}

                        {/* Expandable description */}
                        <div style={{
                          overflow: 'hidden',
                          maxHeight: isActive ? '100px' : '0px',
                          opacity: isActive ? 1 : 0,
                          transition: 'max-height 0.45s ease, opacity 0.45s ease',
                        }}>
                          <p style={{
                            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                            fontSize: 'clamp(0.78rem, 0.88vw, 0.86rem)',
                            lineHeight: 1.75, color: 'rgba(255,255,255,0.58)',
                            marginTop: '10px', paddingRight: '8px',
                          }}>
                            {f.desc}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Mobile: Thumbnail image inside expanded accordion */}
                    <div className="su-mobile-thumb" style={{
                      overflow: 'hidden',
                      maxHeight: isActive ? '220px' : '0px',
                      opacity: isActive ? 1 : 0,
                      transition: 'max-height 0.45s ease, opacity 0.45s ease',
                      display: 'none',
                    }}>
                      <div style={{
                        padding: 'clamp(12px, 2vh, 16px) clamp(16px, 2.5vw, 28px)',
                        paddingTop: '0',
                      }}>
                        <Image 
                          src={f.img} 
                          alt={f.title}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — image panel */}
            <div className="su-image-panel" style={{ position: 'relative', overflow: 'hidden' }}>
              {FEATURES.map((f, i) => (
                <div key={i} className="su-image-slide" style={{
                  position: 'absolute', inset: 0,
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'scale(1)' : 'scale(1.04)',
                  transition: 'opacity 0.75s ease, transform 0.75s ease',
                  zIndex: active === i ? 1 : 0,
                  overflow: 'hidden',
                }}>
                  <Image src={f.img} alt={f.title} className="su-panel-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,53,57,0.65) 0%, transparent 55%)',
                  }} />
                  {/* Feature label on image */}
                  <div className="su-image-label" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 3vw, 32px)' }}>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '9px', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                      display: 'block', marginBottom: '6px',
                    }}>
                      {f.num} / 06
                    </span>
                    <h4 style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.9rem)',
                      lineHeight: 1.1, letterSpacing: '-0.015em',
                      color: '#ffffff', margin: 0,
                    }}>
                      {f.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Reveal>
      </div>{/* end su-desktop-only */}

      {/* ══════════════════════════════════════════════════════════════
          DETAILED PILLARS — 5 expandable rows
      ══════════════════════════════════════════════════════════════ */}
      <SustainabilityPillars />

      <style>{`
        /* ── Show/hide mobile vs desktop blocks ── */
        .su-mobile-only { display: none; }
        .su-desktop-only { display: block; }

        @media (max-width: 767px) {
          .su-mobile-only  { display: block; }
          .su-desktop-only { display: none !important; }
        }

        /* ── Mobile slider ── */
        .su-mobile-slider {
          padding: 0 0 clamp(32px, 5vh, 52px);
          background: #ffffff;
        }
        .su-ms-viewport {
          overflow: hidden;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          padding: 12px 0 4px;
        }
        .su-ms-track {
          display: flex;
          gap: 16px;
          will-change: transform;
        }
        .su-ms-card {
          flex-shrink: 0;
          width: 87vw;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(0,53,57,0.12);
          background: #ffffff;
          will-change: opacity, transform;
        }
        .su-ms-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #c8c4bc;
        }
        .su-ms-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.7s ease;
          pointer-events: none;
        }
        .su-ms-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 45%, rgba(0,30,26,0.72) 100%);
          pointer-events: none;
        }
        .su-ms-num {
          position: absolute; bottom: 12px; right: 14px;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 2rem;
          line-height: 1; letter-spacing: -0.03em;
          color: rgba(255,255,255,0.18); pointer-events: none;
        }
        .su-ms-body {
          padding: 18px 20px 22px;
          border-top: 1px solid rgba(0,53,57,0.06);
        }
        .su-ms-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 1.05rem;
          line-height: 1.25; letter-spacing: -0.01em;
          color: #003539; margin: 0 0 8px;
        }
        .su-ms-desc {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: 0.8rem; line-height: 1.7;
          color: rgba(0,53,57,0.58); margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Controls row: dots + counter */
        .su-ms-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 16px;
          padding: 0 20px;
        }
        .su-ms-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .su-ms-dot {
          width: 5px; height: 5px;
          border-radius: 100px;
          background: rgba(0,53,57,0.18);
          border: none; padding: 0; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          min-height: unset !important;
          min-width: unset !important;
        }
        .su-ms-dot--active {
          width: 18px;
          background: rgba(0,53,57,0.65);
        }
        .su-ms-counter {
          font-family: Roboto, sans-serif;
          font-weight: 300; font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(0,53,57,0.35);
          min-width: 36px;
        }

        /* Header two-col */
        .su-header-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: start;
        }

        /* Panel: accordion left, image right */
        .su-panel {
          grid-template-columns: 1fr 1.2fr;
        }

        /* Progress animation */
        @keyframes suProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .su-panel {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* Desktop image panel height */
        .su-image-panel {
          min-height: clamp(280px, 45vw, 520px);
        }

        /* Tablet stacking (accordion only, no mobile slider) */
        @media (min-width: 768px) and (max-width: 860px) {
          .su-header-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(24px, 4vh, 32px) !important;
          }
          .su-panel {
            grid-template-columns: 1fr !important;
          }
          .su-panel > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,53,57,0.1);
          }
          .su-image-panel {
            display: none !important;
          }
          .su-mobile-thumb {
            display: block !important;
          }
          .su-pillar-inner {
            grid-template-columns: 1fr !important;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
