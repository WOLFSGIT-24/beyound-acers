import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 32, className = '',
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
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
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 1s ease, transform 1s ease',
    }}>{children}</div>
  );
}

/* ─── Card data ──────────────────────────────────────────────────────────── */
const BASE_CARDS = [
  {
    num: '01',
    title: 'Land Is The Safest Wealth Store Right Now',
    desc: "When stocks fluctuate, currencies devalue, and gold hits all-time highs, land holds. CODENAME UNSTOPPABLE 2.0 is an early-entry into a premium riverfront community before the corridor prices surge. Physical. Tangible. Appreciating.",
    image: 'https://static.wixstatic.com/media/cef78c_be9fbd94a5534a78903b5a0ebcb36735~mv2.png',
    tag: 'Safe Asset',
  },
  {
    num: '02',
    title: 'The Bengaluru Overflow Is Coming to Mysuru',
    desc: "Bengaluru is running out of affordable land. Investors, retirees, and second-home seekers are moving 90 minutes down the expressway. CODENAME UNSTOPPABLE 2.0 sits exactly at that intersection, on the BLR–MYS Expressway, in Karnataka's fastest-growing corridor.",
    image: 'https://static.wixstatic.com/media/cef78c_dca5c40332a74e0f991b95ca31626678~mv2.png',
    tag: 'Growth Corridor',
  },
  {
    num: '03',
    title: 'Not Just Land. A Biodiversity-Led Township',
    desc: "This is not a plotted layout. It is Karnataka's first biodiversity-led community. 2,000+ native trees, 40+ amenities, underground utilities, riverfront access, and eco-engineered infrastructure. Township quality. Early land pricing.",
    image: 'https://static.wixstatic.com/media/cef78c_9c16f8b3f2754c8992071110f0af26a1~mv2.png',
    tag: 'Differentiated',
  },
  {
    num: '04',
    title: 'Bengaluru Land Costs 50–70% More. Same Corridor.',
    desc: "Comparable land on Bengaluru's outskirts: ₹8,000–₹20,000/sqft. Here: ₹3,099/sqft, on the same expressway, same appreciation drivers. This pricing gap is the opportunity. It closes as infrastructure deepens and demand catches up.",
    image: 'https://static.wixstatic.com/media/cef78c_17a91d472f854fc2a40ff27a35ef21f9~mv2.png',
    tag: 'Price Arbitrage',
  },
];

const N = BASE_CARDS.length;
/* Triple the array so infinite-loop recentring is seamless */
const CARDS = [...BASE_CARDS, ...BASE_CARDS, ...BASE_CARDS];

/* ─── Infinite carousel hook ─────────────────────────────────────────────── */
function useInfiniteCarousel(total: number) {
  /* Start in the "middle" copy so we can go left or right */
  const [index, setIndex] = useState(total);          // logical position in CARDS
  const [animated, setAnimated] = useState(true);

  /* Which BASE card is showing */
  const display = ((index - total) % total + total) % total;

  /* After transition ends, silently recentre so we never reach array ends */
  useEffect(() => {
    if (!animated) return;
    const id = setTimeout(() => {
      setIndex(i => {
        if (i < total || i >= total * 2) {
          setAnimated(false);
          return total + ((i - total) % total + total) % total;
        }
        return i;
      });
    }, 620);
    return () => clearTimeout(id);
  }, [index, animated, total]);

  /* Navigate to a logical base index */
  const goTo = useCallback((baseIdx: number) => {
    setAnimated(true);
    setIndex(total + ((baseIdx % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => {
    setAnimated(true);
    setIndex(i => i - 1);
  }, []);

  const next = useCallback(() => {
    setAnimated(true);
    setIndex(i => i + 1);
  }, []);

  /* Touch swipe */
  const touchStartX = useRef(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 44) {
      if (delta > 0) next(); else prev();
    }
  }, [next, prev]);

  return { index, display, animated, goTo, prev, next, onTouchStart, onTouchEnd };
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function WhyInvestSection() {
  const { index, display, animated, goTo, prev, next, onTouchStart, onTouchEnd } =
    useInfiniteCarousel(N);

  /* Card width as a CSS var — desktop uses fixed px, mobile uses vw */
  const CARD_W_DESKTOP = 340;
  const GAP = 20;

  return (
    <section id="why-invest" style={{ background: '#0a1f1e', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(56px, 8vh, 88px) clamp(24px, 5vw, 64px) clamp(28px, 4vh, 44px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '24px',
      }}>
        <div style={{ maxWidth: '620px' }}>

          {/* Eyebrow */}
          <Reveal delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(18px, 2.8vh, 28px)' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.5)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#C9A84C' }}>
                Investment Edge
              </span>
            </div>
          </Reveal>

          {/* Main heading */}
          <Reveal delay={60}>
            <h2 style={{ fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 800, fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)', lineHeight: 1.03, letterSpacing: '-0.02em', margin: '0 0 clamp(20px, 3vh, 30px)' }}>
              <span style={{ display: 'block', color: '#ffffff' }}>The Best Time</span>
              <span style={{ display: 'block', color: '#ffffff' }}>to Invest in</span>
              <span style={{ display: 'block', color: '#C9A84C' }}>Mysuru Is Now.</span>
            </h2>
          </Reveal>

          {/* Supporting line */}
          <Reveal delay={130}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: '460px' }}>
                Secure premium land in Karnataka's fastest-growing corridor{' '}
                <span style={{ color: '#C9A84C', fontWeight: 600 }}>before the market catches up.</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Arrow controls */}
        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={prev} className="wi-arrow-btn" aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', minWidth: '32px', textAlign: 'center' }}>
              {String(display + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
            </span>
            <button onClick={next} className="wi-arrow-btn" aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      {/* ── Carousel viewport ── */}
      <div
        className="wi-viewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="wi-track"
          style={{
            transform: `translateX(calc(50% - var(--wi-card-w) / 2 - ${index} * (var(--wi-card-w) + ${GAP}px)))`,
            transition: animated ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            '--wi-card-w': `${CARD_W_DESKTOP}px`,
          } as React.CSSProperties}
        >
          {CARDS.map((card, i) => {
            const baseI = i % N;
            const dist = Math.abs(i - index);
            const isActive = dist === 0;
            return (
              <div
                key={i}
                className={`wi-card${isActive ? ' wi-card--active' : ''}`}
                onClick={() => { if (!isActive) goTo(baseI); }}
                style={{
                  opacity: isActive ? 1 : dist <= 1 ? 0.45 : 0.18,
                  transform: isActive ? 'scale(1)' : 'scale(0.93)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  cursor: isActive ? 'default' : 'pointer',
                  pointerEvents: dist > 2 ? 'none' : 'auto',
                }}
              >
                <div className="wi-card-img-wrap">
                  <Image src={card.image} alt={card.title} className="wi-card-img" />
                  <div className="wi-card-overlay" />
                  <div className="wi-card-num">{card.num}</div>
                  <div className="wi-card-tag">{card.tag}</div>
                </div>
                <div className="wi-card-body">
                  <h3 className="wi-card-title">{card.title}</h3>
                  <p className="wi-card-desc">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dots ── */}
      <div className="wi-dots">
        {BASE_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`wi-dot${i === display ? ' wi-dot--active' : ''}`}
          />
        ))}
      </div>

      <style>{`
        /* ── Viewport: clips overflow ── */
        .wi-viewport {
          overflow: hidden;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          padding: 16px 0 8px;
        }

        /* ── Track: flex row of all cloned cards ── */
        .wi-track {
          display: flex;
          gap: ${GAP}px;
          will-change: transform;
        }

        /* ── Card base ── */
        .wi-card {
          flex-shrink: 0;
          width: var(--wi-card-w, ${CARD_W_DESKTOP}px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(0,53,57,0.1);
          will-change: opacity, transform;
          box-shadow: 0 2px 12px rgba(0,53,57,0.06);
        }
        .wi-card--active {
          box-shadow: 0 12px 40px rgba(0,53,57,0.14);
          border-color: rgba(0,53,57,0.2);
        }

        /* ── Image wrap ── */
        .wi-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #c8c4bc;
        }
        .wi-card-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.7s ease;
          pointer-events: none;
        }
        .wi-card--active:hover .wi-card-img { transform: scale(1.05); }
        .wi-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(0,20,18,0.80) 100%);
          pointer-events: none;
        }
        .wi-card-num {
          position: absolute; top: 14px; right: 16px;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: clamp(2rem, 3vw, 2.8rem);
          line-height: 1; letter-spacing: -0.03em;
          color: rgba(255,255,255,0.14); pointer-events: none;
        }
        .wi-card-tag {
          position: absolute; bottom: 14px; left: 14px;
          background: rgba(0,53,57,0.75);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 10px;
          font-family: Roboto, sans-serif; font-weight: 500;
          font-size: 9px; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.8);
          pointer-events: none;
        }

        /* ── Card body ── */
        .wi-card-body {
          padding: 20px 22px 26px;
          background: #ffffff;
          flex: 1;
          border-top: 1px solid rgba(0,53,57,0.07);
        }
        .wi-card--active .wi-card-body { background: #f7f7f7; }
        .wi-card-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 1rem;
          line-height: 1.3; letter-spacing: -0.01em;
          color: #003539; margin: 0 0 10px;
        }
        .wi-card-desc {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: 0.78rem; line-height: 1.75;
          color: rgba(0,53,57,0.6); margin: 0;
        }

        /* ── Arrow buttons ── */
        .wi-arrow-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          cursor: pointer; transition: all 0.25s ease;
          border-radius: 0; padding: 0;
        }
        .wi-arrow-btn:hover {
          background: rgba(201,168,76,0.15);
          color: #C9A84C; border-color: rgba(201,168,76,0.4);
        }

        /* ── Dots ── */
        .wi-dots {
          display: flex;
          justify-content: center;
          gap: 7px;
          padding: clamp(20px, 3vh, 32px) 0 clamp(40px, 6vh, 64px);
        }
        .wi-dot {
          width: 6px; height: 6px;
          border-radius: 100px;
          background: rgba(255,255,255,0.2);
          border: none; padding: 0; cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          /* override global 44px tap-target rule */
          min-height: unset !important;
          min-width: unset !important;
        }
        .wi-dot--active {
          width: 22px;
          background: #C9A84C;
        }

        /* ── Tablet (641–1024px) ── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .wi-track { --wi-card-w: 72vw !important; }
          .wi-card { width: 72vw !important; }
          .wi-card-img-wrap { aspect-ratio: 4 / 3; }
        }

        /* ── Mobile (≤640px): one card at a time, 87vw wide ── */
        @media (max-width: 640px) {
          .wi-viewport { padding: 12px 0 4px; }
          .wi-track { --wi-card-w: 87vw !important; gap: 12px !important; }
          .wi-card { width: 87vw !important; }
          .wi-card-img-wrap { aspect-ratio: 3 / 2; }
          .wi-card-title { font-size: 0.95rem; }
          .wi-card-desc { font-size: 0.76rem; line-height: 1.65; }
          .wi-card-body { padding: 16px 18px 22px; }
          .wi-card-num { font-size: 1.8rem; }
          .wi-arrow-btn { width: 34px; height: 34px; }
          .wi-dot { width: 5px; height: 5px; min-height: unset !important; min-width: unset !important; }
          .wi-dot--active { width: 18px; }
          .wi-dots { gap: 6px; padding-bottom: clamp(32px, 5vh, 52px); }
        }
      `}</style>
    </section>
  );
}
