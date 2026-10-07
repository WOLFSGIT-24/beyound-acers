import React, { useEffect, useRef, useState } from 'react';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 20,
}: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.unobserve(el); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 0.9s ease, transform 0.9s ease',
    }}>{children}</div>
  );
}

/* ─── Feature cards data ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    accent: 'location',
    titleParts: ['Walk the ', 'landscape', '.'],
    desc: 'See the Kaveri, the tree-lined avenues and the green spaces in person.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    accent: 'way of life',
    titleParts: ['Discover the ', 'way of life', '.'],
    desc: 'Clubhouse, wellness groves, riverfront terraces and the biodiversity park.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12C12 7 7 3 3 5c4 0 7 3 9 7"/>
        <path d="M12 12c0-5 5-9 9-7-4 0-7 3-9 7"/>
      </svg>
    ),
  },
  {
    accent: 'place',
    titleParts: ['Find your ', 'place', '.'],
    desc: 'Explore the masterplan, the avenues and the plot options.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    accent: 'confidence',
    titleParts: ['Make your decision with ', 'confidence', '.'],
    desc: 'Navigate pricing, paperwork & the buying process with ease.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

const TRUST = [
  {
    label: 'Free',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'No Obligation',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    label: '100% Confidential',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function BookCallSection({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <section style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div style={{
        padding: 'clamp(52px, 7vh, 80px) clamp(24px, 8vw, 120px) clamp(44px, 6vh, 68px)',
      }}>

        {/* ── Eyebrow ── */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(18px, 2.5vh, 26px)' }}>
            <span style={{ display: 'block', width: '28px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: '#C9A84C',
            }}>
              Come Experience Riverine
            </span>
          </div>
        </Reveal>

        {/* ── Main heading ── */}
        <Reveal delay={60}>
          <h2 style={{
            fontFamily: "'DM Sans', Roboto, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#003539',
            margin: '0 0 clamp(16px, 2.2vh, 22px)',
          }}>
            Some Places<br />You Have to Feel<br />
            <em style={{
              fontStyle: 'italic',
              color: '#8B6914',
              display: 'inline-block',
            }}>
              Before You Decide.
            </em>
          </h2>
        </Reveal>

        {/* Gold rule */}
        <Reveal delay={100}>
          <div style={{ width: '36px', height: '2px', background: '#8B6914', opacity: 0.75, marginBottom: 'clamp(14px, 2vh, 20px)' }} />
        </Reveal>

        {/* ── Supporting text ── */}
        <Reveal delay={130}>
          <p style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
            lineHeight: 1.75, color: 'rgba(33,37,41,0.65)',
            margin: '0 0 clamp(36px, 5vh, 52px)',
            maxWidth: '480px',
          }}>
            Book a personalised{' '}
            <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.82)' }}>guided visit</strong>{' '}
            and spend a morning at Riverine with our team.
          </p>
        </Reveal>

        {/* ── 4-column feature cards ── */}
        <Reveal delay={190}>
          <div className="bc-cards">
            {FEATURES.map((f, i) => (
              <div key={i} className="bc-card">
                {/* Icon circle */}
                <div className="bc-icon-circle">
                  {f.icon}
                </div>
                {/* Title */}
                <h3 className="bc-card-title">
                  {f.titleParts[0]}
                  <span style={{ color: '#8B6914', fontStyle: 'italic' }}>{f.titleParts[1]}</span>
                  {f.titleParts[2]}
                </h3>
                {/* Desc */}
                <p className="bc-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── CTA button ── */}
        <Reveal delay={260}>
          <div style={{ marginTop: 'clamp(36px, 5vh, 48px)' }}>
            <button
              className="bc-cta-btn"
              onClick={onOpenPopup}
            >
              {/* Calendar icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Book Your Site Visit</span>
              {/* Arrow icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: 'auto' }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            {/* Trust bar */}
            <div className="bc-trust-bar">
              {TRUST.map((t, i) => (
                <React.Fragment key={i}>
                  {i > 0 && (
                    <span style={{ width: '1px', height: '14px', background: 'rgba(0,53,57,0.2)', flexShrink: 0 }} />
                  )}
                  <span className="bc-trust-item">
                    <span style={{ color: 'rgba(0,53,57,0.4)' }}>{t.icon}</span>
                    <span>{t.label}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

      </div>

      <style>{`
        /* ── Feature cards grid ── */
        .bc-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid rgba(0,53,57,0.1);
          background: rgba(0,53,57,0.1); /* gap colour = separator */
          gap: 1px;
        }
        .bc-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          padding: clamp(22px,3.5vh,32px) clamp(14px,2vw,24px) clamp(24px,3.5vh,34px);
          background: #ffffff;
          transition: background 0.25s ease;
        }
        .bc-card:hover {
          background: #edeae3;
        }

        /* Icon circle */
        .bc-icon-circle {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: #0d2220;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 18px rgba(0,0,0,0.22);
          border: 1px solid rgba(201,168,76,0.2);
        }

        /* Card title */
        .bc-card-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #003539;
          margin: 0;
        }

        /* Card desc */
        .bc-card-desc {
          font-family: Roboto, sans-serif;
          font-weight: 300;
          font-size: clamp(0.76rem, 0.88vw, 0.84rem);
          line-height: 1.65;
          color: rgba(33,37,41,0.58);
          margin: 0;
        }

        /* ── CTA button ── */
        .bc-cta-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          max-width: 420px;
          padding: clamp(15px,2.2vh,19px) clamp(22px,3vw,32px);
          background: linear-gradient(135deg, #0d2220 0%, #1a3a32 60%, #0d2220 100%);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 6px;
          cursor: pointer;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(0.9rem, 1.1vw, 1rem);
          letter-spacing: 0.01em;
          color: #ffffff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .bc-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.26);
          background: linear-gradient(135deg, #122a28 0%, #1f4039 60%, #122a28 100%);
        }
        .bc-cta-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 12px rgba(0,0,0,0.18);
        }

        /* ── Trust bar ── */
        .bc-trust-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .bc-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(33,37,41,0.5);
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .bc-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Mobile ── */
        @media (max-width: 540px) {
          .bc-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .bc-cta-btn {
            max-width: 100%;
          }
          .bc-icon-circle {
            width: 52px; height: 52px;
          }
        }
        @media (max-width: 380px) {
          .bc-cards {
            grid-template-columns: 1fr;
          }
          .bc-card {
            align-items: flex-start;
            text-align: left;
            flex-direction: row;
            gap: 16px;
          }
          .bc-icon-circle {
            width: 44px; height: 44px; flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
