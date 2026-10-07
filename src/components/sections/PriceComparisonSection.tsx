import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';

function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.unobserve(el); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 0.95s ease, transform 0.95s ease',
    }}>{children}</div>
  );
}

const BLR_FEATS = [
  { icon: '🚦', title: 'Hours in Traffic',  desc: 'Long commutes eat into every day.' },
  { icon: '🏙️', title: 'Little Green',      desc: 'Parks are few, and far from home.' },
  { icon: '🔊', title: 'Constant Noise',    desc: 'Traffic, construction and crowds, day and night.' },
  { icon: '⏱️', title: 'Rushed Days',       desc: 'Little time left for family or for yourself.' },
];

const MYS_FEATS = [
  { icon: '🌳', title: 'Mornings Under a Canopy', desc: '2,000+ native trees and shaded walkways.' },
  { icon: '🌊', title: 'Evenings by the River',   desc: 'Riverfront terraces along the Kaveri.' },
  { icon: '🦋', title: 'Nature on Your Street',   desc: 'Birds, butterflies and native species as neighbours.' },
  { icon: '🛣️', title: 'Still Connected',         desc: 'Bengaluru in 90 minutes. Mysuru even closer.' },
];

const CARDS = [
  { city: 'Bengaluru', sub: 'City Life',     price: '90 Mins', unit: 'AWAY*',      note: 'Close whenever you need it.',                accent: '#4a6060', bg: '#1e2a28' },
  { city: 'Riverine',  sub: '',              price: '35%',     unit: 'OPEN GREEN', note: '2,000+ native trees. The Kaveri beside you.', accent: '#C9A84C', bg: '#3d2800' },
  { city: 'Mysuru',    sub: 'Heritage City', price: '20 Mins', unit: 'AWAY*',      note: 'Palace, culture, hospitals & schools.',       accent: '#4a9a60', bg: '#223d2e' },
];

export default function PriceComparisonSection() {
  return (
    <section id="plot-offerings" style={{ background: '#ffffff', overflow: 'visible' }}>
      <div style={{ padding: 'clamp(48px,7vh,80px) clamp(24px,8vw,120px) clamp(32px,5vh,56px)' }}>

        {/* ── TOP ROW: heading left + cards right ── */}
        <div className="pc-top-row">

          {/* LEFT — heading */}
          <Reveal delay={0}>
            <div className="pc-heading-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <span style={{ width: '28px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0, display: 'block' }} />
                <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C' }}>
                  A Different Pace of Life
                </span>
              </div>
              <h2 className="pc-headline">
                Leave the Chaos. Keep the{' '}
                <span style={{ color: '#8B6914', fontStyle: 'italic' }}>Connection.</span>
              </h2>
              <div style={{ width: '36px', height: '2px', background: '#8B6914', opacity: 0.7, margin: '18px 0 16px' }} />
              <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: 'clamp(0.85rem,1vw,0.95rem)', lineHeight: 1.75, color: 'rgba(33,37,41,0.65)', maxWidth: '360px' }}>
                Cleaner air, quieter streets and green all around.<br />
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.82)' }}>With Bengaluru and Mysuru still within easy reach.</strong>
              </p>
            </div>
          </Reveal>

          {/* RIGHT — 3 cards: Bengaluru | Riverine (popped) | Mysuru */}
          <Reveal delay={80}>
            <div style={{ paddingTop: '24px' }}> {/* breathing room so pop shadow isn't clipped */}
            <div className="pc-cards-row">
              {CARDS.map((c, i) => {
                const isCenter = i === 1; // Riverine card pops up
                return (
                  <div key={i}
                    className={`pc-price-card${isCenter ? ' pc-price-card--pop' : ''}`}
                    style={{ background: c.bg, borderTop: `3px solid ${c.accent}` }}
                  >
                    <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#ffffff', display: 'block', marginBottom: '4px' }}>
                      {c.city}
                    </span>
                    {c.sub && (
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', display: 'block', marginBottom: '14px' }}>
                        {c.sub}
                      </span>
                    )}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 700, fontSize: 'clamp(1.25rem,2.2vw,1.7rem)', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1 }}>
                        {c.price}
                      </span>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '10px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em' }}>{c.unit}</span>
                    </div>
                    <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '11px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0 }}>{c.note}</p>
                  </div>
                );
              })}
            </div>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(0,53,57,0.35)', marginTop: '10px', textAlign: 'right' }}>
              *Approximate travel times by road.
            </p>
            </div>
          </Reveal>
        </div>

        {/* ── MIDDLE: split comparison panels ── */}
        <Reveal delay={120} y={16}>
          <div className="pc-split-wrap">

            {/* BENGALURU panel */}
            <div className="pc-panel pc-panel--blr">
              <div className="pc-panel-img-wrap">
                <Image src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=900&q=80&auto=format&fit=crop" alt="Bengaluru cityscape" className="pc-panel-img" />
                <div className="pc-panel-img-overlay" />
                <span className="pc-panel-label">Bengaluru</span>
              </div>
              <div className="pc-feat-list">
                {BLR_FEATS.map((f, i) => (
                  <div key={i} className="pc-feat-item">
                    <div className="pc-feat-icon pc-feat-icon--dark">{f.icon}</div>
                    <div>
                      <p className="pc-feat-title pc-feat-title--light">{f.title}</p>
                      <p className="pc-feat-desc pc-feat-desc--light">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER arrow */}
            <div className="pc-arrow-hub">
              <div className="pc-arrow-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>

            {/* RIVERINE panel — premium pop-out */}
            <div className="pc-panel pc-panel--mys pc-panel--mys-pop">
              <div className="pc-panel-img-wrap">
                <Image src="https://static.wixstatic.com/media/cef78c_f0d53aa098bc47399562cbdbaaf99ce9~mv2.png" alt="Evening by the Kaveri at Riverine" className="pc-panel-img" />
                <div className="pc-panel-img-overlay pc-panel-img-overlay--mys" />
                <span className="pc-panel-label pc-panel-label--mys">Riverine</span>
                <div className="pc-mys-badge">✦ Slow Living</div>
              </div>
              <div className="pc-feat-list pc-feat-list--mys">
                {MYS_FEATS.map((f, i) => (
                  <div key={i} className="pc-feat-item">
                    <div className="pc-feat-icon pc-feat-icon--mys">{f.icon}</div>
                    <div>
                      <p className="pc-feat-title pc-feat-title--mys">{f.title}</p>
                      <p className="pc-feat-desc pc-feat-desc--mys">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>

        {/* ── BOTTOM: info strip ── */}
        <Reveal delay={160} y={12}>
          <div className="pc-strip">
            <div className="pc-strip-left">
              <div className="pc-strip-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                  <path d="M17 3l4 4-4 4"/>
                </svg>
              </div>
              <div>
                <p className="pc-strip-title">Slow down without switching off.</p>
                <p className="pc-strip-sub">Choosing a calmer life at Riverine doesn’t mean giving up the city. It’s there whenever you want it.</p>
              </div>
            </div>
            <div className="pc-strip-right">
              <div className="pc-strip-icon pc-strip-icon--outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <p className="pc-strip-sub" style={{ maxWidth: '240px' }}>Riverine launches this Dussehra. Come and see it first.</p>
            </div>
          </div>
        </Reveal>

      </div>

      <style>{`
        /* ── Top row ── */
        .pc-top-row {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: clamp(32px,5vw,72px);
          align-items: center;
          margin-bottom: clamp(32px,5vh,52px);
        }
        .pc-heading-col { max-width: 420px; }
        .pc-headline {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(2rem,4vw,3.4rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: #003539;
          margin: 0;
        }

        /* ── Price cards — equal size, centre floats up ── */
        .pc-cards-row {
          display: flex;
          align-items: flex-end; /* side cards sit at base, centre is taller = floats up */
          gap: 0;
        }
        .pc-price-card {
          flex: 1;
          padding: clamp(20px,2.4vw,28px) clamp(16px,1.8vw,22px);
          transition: box-shadow 0.25s ease;
          min-width: 0;
        }
        /* Side cards — same padding, anchored to bottom */
        .pc-price-card:not(.pc-price-card--pop) {
          padding-top: clamp(20px,2.4vw,28px);
        }
        /* Centre Riverine card — extra top padding makes it taller, so it floats up */
        .pc-price-card--pop {
          padding-top: clamp(36px,4vw,52px);
          padding-bottom: clamp(36px,4vw,52px);
          position: relative;
          z-index: 2;
          border-left: none;
          border-right: none;
          box-shadow: -8px 0 32px rgba(0,0,0,0.35), 8px 0 32px rgba(0,0,0,0.35), 0 -8px 28px rgba(201,168,76,0.22);
          outline: 1px solid rgba(201,168,76,0.4);
        }
        .pc-price-card--pop:hover { box-shadow: -8px 0 40px rgba(0,0,0,0.4), 8px 0 40px rgba(0,0,0,0.4), 0 -12px 36px rgba(201,168,76,0.3); }

        /* ── Split comparison ── */
        .pc-split-wrap {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          gap: 0;
          overflow: visible;
          margin-bottom: clamp(28px,4vh,44px);
          align-items: center; /* lets Mysuru float without stretching grid */
        }
        .pc-panel { display: flex; flex-direction: column; }
        .pc-panel--blr { background: #1a2e2c; border: 1px solid rgba(255,255,255,0.06); }
        .pc-panel--mys { background: #0d1f18; }

        /* Mysuru premium pop-out — off-white, floats above Bengaluru */
        .pc-panel--mys-pop {
          background: #faf9f6;
          position: relative;
          margin-top: -32px;
          margin-bottom: -32px;
          border: 1px solid rgba(201,168,76,0.3);
          box-shadow: 0 -12px 40px rgba(201,168,76,0.14), 0 24px 56px rgba(0,0,0,0.22);
          z-index: 2;
        }

        /* Riverine panel badge */
        .pc-mys-badge {
          position: absolute;
          top: 14px; right: 14px;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 9px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #1a1a1a;
          background: #C9A84C;
          padding: 4px 10px;
          border-radius: 2px;
          z-index: 3;
        }

        /* Panel image */
        .pc-panel-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }
        .pc-panel-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.7s ease;
        }
        .pc-panel:hover .pc-panel-img { transform: scale(1.04); }
        .pc-panel-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,20,18,0.55) 100%);
          pointer-events: none;
        }
        .pc-panel-img-overlay--mys {
          background: linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,30,20,0.38) 100%);
        }
        .pc-panel-label {
          position: absolute; bottom: 14px; left: 16px;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: 11px;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #fff;
          background: rgba(0,53,57,0.75);
          backdrop-filter: blur(6px);
          padding: 4px 12px;
        }
        .pc-panel-label--mys { background: rgba(35,90,60,0.78); }

        /* Feature list */
        .pc-feat-list {
          display: flex; flex-direction: column;
          gap: 0;
          padding: clamp(16px,2.5vw,24px);
          flex: 1;
        }
        .pc-feat-list--mys { border-left: 1px solid rgba(0,53,57,0.1); }
        .pc-feat-item {
          display: flex; gap: 12px; align-items: flex-start;
          padding: clamp(10px,1.5vh,14px) 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pc-feat-list--mys .pc-feat-item { border-bottom-color: rgba(0,53,57,0.08); }
        .pc-feat-item:last-child { border-bottom: none; }
        .pc-feat-icon {
          font-size: 14px; line-height: 1;
          width: 30px; height: 30px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
        }
        .pc-feat-icon--dark  { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); }
        .pc-feat-icon--light { background: rgba(0,53,57,0.08); color: rgba(0,53,57,0.6); }
        .pc-feat-icon--mys   { background: rgba(0,53,57,0.08); color: #8B6914; }

        .pc-feat-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: clamp(0.78rem,1vw,0.88rem);
          letter-spacing: 0.04em; text-transform: uppercase;
          margin: 0 0 3px; line-height: 1.2;
        }
        .pc-feat-title--light { color: rgba(255,255,255,0.9); }
        .pc-feat-title--mys   { color: #8B6914; }
        .pc-feat-title:not(.pc-feat-title--light):not(.pc-feat-title--mys) { color: #003539; }

        .pc-feat-desc {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: clamp(0.72rem,0.85vw,0.8rem);
          line-height: 1.55; margin: 0;
        }
        .pc-feat-desc--light { color: rgba(255,255,255,0.55); }
        .pc-feat-desc--mys   { color: rgba(0,53,57,0.65); }
        .pc-feat-desc:not(.pc-feat-desc--light):not(.pc-feat-desc--mys) { color: rgba(0,53,57,0.6); }

        /* Arrow hub */
        .pc-arrow-hub {
          display: flex; align-items: center; justify-content: center;
          background: transparent;
          z-index: 3;
        }
        .pc-arrow-circle {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #C9A84C;
          color: #0f2218;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(201,168,76,0.45);
        }

        /* Info strip */
        .pc-strip {
          display: flex;
          gap: clamp(16px,3vw,32px);
          align-items: center;
          background: #003539;
          padding: clamp(18px,2.8vh,26px) clamp(20px,3vw,36px);
          border: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .pc-strip-left {
          display: flex; gap: 16px; align-items: center; flex: 1; min-width: 0;
        }
        .pc-strip-right {
          display: flex; gap: 14px; align-items: center;
          padding-left: clamp(16px,3vw,32px);
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .pc-strip-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: rgba(138,105,20,0.25);
          border: 1px solid rgba(138,105,20,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #c9a84c;
        }
        .pc-strip-icon--outline {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
        }
        .pc-strip-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700; font-size: clamp(0.95rem,1.3vw,1.1rem);
          color: #ffffff; margin: 0 0 4px; line-height: 1.2;
        }
        .pc-strip-sub {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: clamp(0.75rem,0.9vw,0.82rem);
          color: rgba(255,255,255,0.5); margin: 0; line-height: 1.55;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .pc-split-wrap { grid-template-columns: 1fr 44px 1fr; }
        }
        @media (max-width: 860px) {
          .pc-top-row { grid-template-columns: 1fr; gap: 28px; }
          .pc-heading-col { max-width: 100%; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .pc-top-row { grid-template-columns: 1fr; gap: 24px; }
          .pc-cards-row {
            flex-direction: column;
            align-items: stretch;
          }
          .pc-price-card--pop {
            padding-top: clamp(20px,2.4vw,28px);
            padding-bottom: clamp(20px,2.4vw,28px);
            margin: 0 -6px;
            box-shadow: 0 -4px 20px rgba(201,168,76,0.2), 0 4px 20px rgba(0,0,0,0.3);
          }
          .pc-split-wrap {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            overflow: visible;
          }
          .pc-panel--mys-pop {
            margin-top: 0;
            margin-bottom: 0;
            box-shadow: 0 -4px 20px rgba(201,168,76,0.15), 0 8px 28px rgba(0,0,0,0.18);
          }
          .pc-arrow-hub {
            height: 52px;
            border: none;
          }
          .pc-arrow-circle { transform: rotate(90deg); }
          .pc-feat-list--mys { border-left: none; }
          .pc-strip { flex-direction: column; align-items: flex-start; gap: 16px; }
          .pc-strip-right { border-left: none; padding-left: 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; width: 100%; }
        }
        @media (max-width: 400px) {
          .pc-price-card { padding: 16px 14px; }
        }
      `}</style>
    </section>
  );
}
