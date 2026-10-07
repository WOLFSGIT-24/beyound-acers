import React, { useEffect, useRef, useState } from 'react';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
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
    <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : `translateY(${y}px)`, transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
      {children}
    </div>
  );
}

/* ─── Stat items ─────────────────────────────────────────────────────────── */
const STATS = [
  {
    value: '21', unit: 'ACRES', desc: 'Beside the River Kaveri',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    value: '331', unit: 'PREMIUM PLOTS', desc: 'Room to Build the Home You Want',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    value: '12m & 9m', unit: 'WIDE STREETS', desc: 'Tree-Lined Avenues, Made for Walking',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5"/><path d="M14 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"/><line x1="3" y1="21" x2="21" y2="21"/>
      </svg>
    ),
  },
  {
    value: '2,000+', unit: 'NATIVE TREES', desc: 'Morning Walks Under a Canopy',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12C12 7 7 3 3 5c4 0 7 3 9 7"/>
        <path d="M12 12c0-5 5-9 9-7-4 0-7 3-9 7"/>
      </svg>
    ),
  },
  {
    value: '10,000+', unit: 'SHRUBS', desc: 'Home to Birds & Butterflies',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"/><path d="M12 13v9"/><path d="M8 17h8"/>
      </svg>
    ),
  },
  {
    value: '100%', unit: 'UNDERGROUND INFRASTRUCTURE', desc: 'No Overhead Wires. Just Open Sky.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/>
      </svg>
    ),
  },
  {
    value: '15,000', unit: 'SQ.FT. CLUBHOUSE', desc: 'Where the Neighbourhood Gathers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/>
        <rect x="9" y="13" width="6" height="8"/>
      </svg>
    ),
  },
  {
    value: '40+', unit: 'AMENITIES', desc: 'For Slow Mornings & Busy Weekends',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

/* ─── Stat card ──────────────────────────────────────────────────────────── */
function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="about-stat-card">
        <div className="about-stat-icon">{stat.icon}</div>
        <div>
          <div className="about-stat-value">{stat.value}</div>
          <div className="about-stat-unit">{stat.unit}</div>
          <div className="about-stat-desc">{stat.desc}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AboutSection({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <section id="about" style={{ background: '#F5F1EA', overflow: 'hidden' }}>
      <div style={{ padding: 'clamp(56px,8vh,96px) clamp(24px,8vw,120px)' }}>

        <div className="about-outer-grid">

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Eyebrow */}
            <Reveal delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(18px,2.5vh,26px)' }}>
                <span style={{ display: 'block', width: 32, height: 1, background: '#C9A84C', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C' }}>
                  The Riverine Way of Life
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={60}>
              <h2 style={{ fontFamily: "'DM Sans',Roboto,sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,3.8vw,3.4rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#1a2e1a', margin: '0 0 6px' }}>
                Welcome to
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <h2 style={{ fontFamily: "'DM Sans',Roboto,sans-serif", fontWeight: 700, fontSize: 'clamp(2rem,3.8vw,3.4rem)', lineHeight: 1.06, letterSpacing: '-0.02em', color: '#C9A84C', margin: '0 0 clamp(12px,1.8vh,20px)' }}>
                Riverine.
              </h2>
            </Reveal>

            {/* Accent rule */}
            <Reveal delay={120}>
              <div style={{ width: 40, height: 2, background: '#1a2e1a', marginBottom: 'clamp(18px,2.6vh,28px)', opacity: 0.35 }} />
            </Reveal>

            {/* Sub-headline */}
            <Reveal delay={150}>
              <p style={{ fontFamily: "'DM Sans',Roboto,sans-serif", fontWeight: 600, fontSize: 'clamp(0.95rem,1.2vw,1.05rem)', lineHeight: 1.45, color: '#1a2e1a', marginBottom: 'clamp(14px,2vh,20px)' }}>
                A Riverside Neighbourhood on the Kaveri,<br />Srirangapatna
              </p>
            </Reveal>

            {/* Body copy */}
            <Reveal delay={180}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vh,14px)' }}>
                <p style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem,0.9vw,0.9rem)', lineHeight: 1.85, color: 'rgba(26,46,26,0.68)', margin: 0 }}>
                  Riverine is a 21-acre neighbourhood beside the River Kaveri, planned so that the landscape comes first and everything else is built around it.
                </p>
                <p style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem,0.9vw,0.9rem)', lineHeight: 1.85, color: 'rgba(26,46,26,0.68)', margin: 0 }}>
                  Mornings begin under a canopy of 2,000+ native trees. Afternoons slow down in wellness groves and shaded walkways. Evenings end on the riverfront terraces, as the light turns gold over the water.
                </p>
                <p style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem,0.9vw,0.9rem)', lineHeight: 1.85, color: 'rgba(26,46,26,0.68)', margin: 0 }}>
                  Weekends belong to the sports arena, the 15,000 sq.ft. clubhouse and neighbours who become friends. Wide tree-lined streets and 100% underground infrastructure keep it all calm and uncluttered.
                </p>
                <p style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem,0.9vw,0.9rem)', lineHeight: 1.85, color: 'rgba(26,46,26,0.68)', margin: 0 }}>
                  And when the city calls, Bengaluru is 90 minutes away on the Expressway, with Mysuru closer still. You step away from the chaos without disconnecting from it.
                </p>
              </div>
            </Reveal>

            {/* Highlight quote box */}
            <Reveal delay={240}>
              <div style={{ marginTop: 'clamp(22px,3vh,32px)', display: 'flex', gap: 16, padding: 'clamp(14px,2vh,20px) clamp(16px,2vw,22px)', background: 'rgba(26,46,26,0.05)', borderRadius: 6, border: '1px solid rgba(26,46,26,0.08)' }}>
                {/* Target icon */}
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <p style={{ fontFamily: 'Roboto,sans-serif', fontWeight: 300, fontSize: 'clamp(0.8rem,0.88vw,0.88rem)', lineHeight: 1.8, color: 'rgba(26,46,26,0.65)', margin: 0 }}>
                  A place to slow down, reconnect with nature and live by the river, while staying close to everything that matters. This is{' '}
                  <strong style={{ fontWeight: 600, color: '#C9A84C', letterSpacing: '0.02em' }}>RIVERINE</strong>.
                </p>
              </div>
            </Reveal>

          </div>

          {/* ══ RIGHT COLUMN — stats grid ════════════════════════════════ */}
          <div className="about-stats-grid">
            {STATS.map((s, i) => (
              <StatCard key={i} stat={s} delay={100 + i * 60} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .about-outer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(36px, 6vw, 80px);
          align-items: start;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(26,46,26,0.12);
          border-left: 1px solid rgba(26,46,26,0.12);
        }

        .about-stat-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: clamp(16px,2.2vh,24px) clamp(14px,1.8vw,22px);
          border-right: 1px solid rgba(26,46,26,0.12);
          border-bottom: 1px solid rgba(26,46,26,0.12);
        }

        .about-stat-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A84C;
          margin-top: 2px;
        }

        .about-stat-value {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(1.35rem, 2.2vw, 2rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #1a2e1a;
          margin-bottom: 2px;
        }

        .about-stat-unit {
          font-family: Roboto, sans-serif;
          font-weight: 500;
          font-size: clamp(7px, 0.65vw, 9px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C9A84C;
          margin-bottom: 4px;
        }

        .about-stat-desc {
          font-family: Roboto, sans-serif;
          font-weight: 300;
          font-size: clamp(0.7rem, 0.72vw, 0.78rem);
          line-height: 1.5;
          color: rgba(26,46,26,0.5);
        }

        @media (max-width: 900px) {
          .about-outer-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(32px,4vh,48px) !important;
          }
        }

        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-stat-card {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
