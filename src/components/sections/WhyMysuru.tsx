import React, { useEffect, useRef, useState } from 'react';
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
      transition: 'opacity 1s ease, transform 1s ease',
    }}>{children}</div>
  );
}

/* ─── Card data ──────────────────────────────────────────────────────────── */
const CARDS = [
  {
    title: 'Life Beside the Kaveri',
    image: 'https://static.wixstatic.com/media/cef78c_d830b0deb763462b90ac23cbdc631f05~mv2.png',
    desc: 'Riverfront terraces, a sunrise deck and evening walks along the water. Here the river is part of your day, not just the view.',
    tag: 'The River',
  },
  {
    title: 'Leave the City Pace Behind',
    image: 'https://static.wixstatic.com/media/cef78c_8eab3fe2bfae4882869865c5cdba5763~mv2.png',
    desc: 'Trade traffic, noise and crowded weekends for cleaner air, open sky and days that feel like your own again.',
    tag: 'Slow Living',
  },
  {
    title: 'Still Close to Everything',
    image: 'https://static.wixstatic.com/media/cef78c_7ecd55caccfd4bf490fb3f1914371681~mv2.png',
    desc: "90 minutes to Bengaluru on the Expressway. Mysuru's hospitals, schools and heritage are a short drive away.",
    tag: 'Connected',
  },
  {
    title: 'A Neighbourhood, Not an Address',
    image: 'https://static.wixstatic.com/media/cef78c_ea42cef20a5b406e8cbf061952ea58ac~mv2.png',
    desc: 'Clubhouse evenings, weekend sport and 180+ families who joined Riverine early. Neighbours become friends here.',
    tag: 'Community',
  },
  {
    title: 'Heritage All Around',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=85&auto=format&fit=crop',
    desc: "Srirangapatna's temples and history, and Mysuru's palaces and culture, are part of the neighbourhood you'll live in.",
    tag: 'Heritage',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function WhyMysuru() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!paused) {
        // 40px per second — smooth and steady
        offsetRef.current += (40 * delta) / 1000;
        const singleSetWidth = track.scrollWidth / 2;
        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
        }
        track.style.transform = `translateX(-${offsetRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  /* Touch: pause on touch start, resume on touch end */
  const handleTouchStart = () => setPaused(true);
  const handleTouchEnd = () => setPaused(false);

  return (
    <section id="why-mysuru" style={{ background: '#0a1f1e', overflow: 'hidden' }}>

      {/* ── Header ── */}
      <div style={{
        padding: 'clamp(48px, 7vh, 80px) clamp(24px, 8vw, 120px) clamp(20px, 3vh, 32px)',
      }}>

        {/* Eyebrow */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(16px, 2.4vh, 26px)' }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Why Riverine
            </span>
          </div>
        </Reveal>

        {/* Main heading */}
        <Reveal delay={60}>
          <h2 style={{ fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', lineHeight: 1.04, letterSpacing: '-0.02em', margin: '0 0 clamp(18px, 2.8vh, 28px)', maxWidth: '600px' }}>
            <span style={{ display: 'block', color: '#ffffff' }}>Step Away From the City.</span>
            <span style={{ display: 'block', color: '#C9A84C' }}>Not From Life.</span>
          </h2>
        </Reveal>

        {/* Supporting line */}
        <Reveal delay={120}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            {/* Tag / badge icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: 'clamp(0.84rem, 1vw, 0.96rem)', lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              The Kaveri, the landscape and a{' '}
              <strong style={{ fontWeight: 700, color: '#C9A84C', fontStyle: 'italic' }}>slower</strong>
              {' '}pace of life
            </p>
          </div>
        </Reveal>

      </div>

      {/* ── Carousel viewport ── */}
      <div
        className="wm-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={trackRef} className="wm-track">
          {/* Duplicate cards for seamless loop */}
          {[...CARDS, ...CARDS].map((card, i) => (
            <div key={i} className="wm-card">
              <div className="wm-card-img-wrap">
                <Image src={card.image} alt={card.title} className="wm-card-img" />
                <div className="wm-card-overlay" />
                <div className="wm-card-tag">{card.tag}</div>
              </div>
              <div className="wm-card-body">
                <h3 className="wm-card-title">{card.title}</h3>
                <p className="wm-card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 'clamp(32px, 5vh, 56px)' }} />

      <style>{`
        .wm-viewport {
          overflow: hidden;
          padding: 8px 0;
          cursor: default;
        }

        .wm-track {
          display: flex;
          gap: 16px;
          will-change: transform;
          padding-left: clamp(24px, 8vw, 120px);
        }

        /* ── Card: compact sizing ── */
        .wm-card {
          flex-shrink: 0;
          width: 260px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .wm-card:hover {
          border-color: rgba(255,255,255,0.18);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }

        /* ── Image: 1:1 square ratio ── */
        .wm-card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #0d2422;
        }
        .wm-card-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center bottom;
          display: block;
          transition: transform 0.7s ease;
          pointer-events: none;
        }
        .wm-card:hover .wm-card-img { transform: scale(1.05); }
        .wm-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(10,31,30,0.85) 100%);
          pointer-events: none;
        }
        .wm-card-tag {
          position: absolute; top: 12px; left: 12px;
          background: rgba(10,31,30,0.72);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 3px 9px;
          font-family: Roboto, sans-serif; font-weight: 500;
          font-size: 8px; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.65);
          pointer-events: none;
        }

        /* ── Card body ── */
        .wm-card-body {
          padding: 14px 16px 18px;
          background: rgba(255,255,255,0.03);
          flex: 1;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .wm-card-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 0.88rem;
          line-height: 1.3; letter-spacing: -0.01em;
          color: #ffffff; margin: 0 0 6px;
        }
        .wm-card-desc {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: 0.72rem; line-height: 1.7;
          color: rgba(255,255,255,0.55); margin: 0;
        }
        .wm-card:hover .wm-card-desc { color: rgba(255,255,255,0.7); }

        /* ── Tablet ── */
        @media (min-width: 641px) and (max-width: 1024px) {
          .wm-card { width: 240px; }
          .wm-track { gap: 14px; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .wm-viewport { padding: 6px 0; }
          .wm-track { gap: 12px; padding-left: 16px; }
          .wm-card { width: 200px; }
          .wm-card-img-wrap { aspect-ratio: 1 / 1; }
          .wm-card-title { font-size: 0.82rem; }
          .wm-card-desc { font-size: 0.7rem; line-height: 1.6; }
          .wm-card-body { padding: 12px 14px 16px; }
          .wm-card-tag { font-size: 7px; padding: 3px 7px; top: 10px; left: 10px; }
        }
      `}</style>
    </section>
  );
}
