import React, { useEffect, useRef, useState } from 'react';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setOn(true), delay);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : `translateY(${y}px)`,
        transition: 'opacity 0.85s ease, transform 0.85s ease',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { value: '21',      sup: '',   unit: 'Acres',      label: 'Eco-Engineered Township'  },
  { value: '331',     sup: '',   unit: 'Plots',      label: 'Exclusive Premium Plots'  },
  { value: '40',      sup: '+',  unit: 'Amenities',  label: 'Wellness · Recreation · Nature' },
  { value: '15,000',  sup: '+',  unit: 'sq. ft.',    label: 'World-Class Clubhouse'    },
];

const CONFIGS = [
  { size: '1163',  unit: 'sq. ft.', tag: 'Standard' },
  { size: '1454',  unit: 'sq. ft.', tag: 'Premium'  },
  { size: '2000+', unit: 'sq. ft.', tag: 'Mansion'  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function StatsBar({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <div style={{ background: '#003539' }}>

      {/* ── Row 1 — four key stats ──────────────────────────────────── */}
      <Reveal delay={0} y={0}>
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="sb-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="sb-stat-cell">

                {/* Big number */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '3px',
                    justifyContent: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.03em',
                      color: '#ffffff',
                    }}
                  >
                    {s.value}
                  </span>
                  {s.sup && (
                    <span
                      style={{
                        fontFamily: "'DM Sans', Roboto, sans-serif",
                        fontWeight: 600,
                        fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1,
                      }}
                    >
                      {s.sup}
                    </span>
                  )}
                </div>

                {/* Unit */}
                <span
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(9px, 1vw, 11px)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.65)',
                    display: 'block',
                    marginBottom: '5px',
                  }}
                >
                  {s.unit}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(8px, 0.85vw, 10px)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    display: 'block',
                    lineHeight: 1.5,
                  }}
                >
                  {s.label}
                </span>

              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Row 2 — plot configurations + CTA ──────────────────────── */}
      <Reveal delay={100} y={14}>
        <div className="sb-config-row">

          {/* Left — eyebrow + tiles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.8vh, 18px)' }}>
            <span
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              Plot Configurations
            </span>

            <div style={{ display: 'flex', gap: 'clamp(8px, 1.2vw, 14px)', flexWrap: 'wrap' }}>
              {CONFIGS.map((c, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    padding: 'clamp(12px, 1.6vw, 18px) clamp(14px, 2vw, 24px)',
                    border: '1px solid rgba(255,255,255,0.11)',
                    background: 'rgba(255,255,255,0.04)',
                    minWidth: 'clamp(88px, 11vw, 124px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.9rem)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                    }}
                  >
                    {c.size}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.38)',
                    }}
                  >
                    {c.unit}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 500,
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.24)',
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — pull-line + CTA */}
          <div className="sb-cta-col">
            <p
              style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 'clamp(12px, 1.8vh, 18px)',
                maxWidth: '260px',
              }}
            >
              Secure your plot before prices rise.
            </p>

            <button
              onClick={onOpenPopup}
              className="sb-unlock-btn"
              onMouseEnter={e => {
                const b = e.currentTarget;
                b.style.background = 'rgba(255,255,255,0.88)';
                b.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget;
                b.style.background = '#ffffff';
                b.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
              }}
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(10px, 1vw, 11.5px)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#003539',
                background: '#ffffff',
                border: 'none',
                padding: 'clamp(12px, 1.5vw, 15px) clamp(24px, 3vw, 40px)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              Unlock Now
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </div>
      </Reveal>

      <style>{`
        /* ── Stats grid ── */
        .sb-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 64px);
          border-left: 1px solid rgba(255,255,255,0.07);
        }
        .sb-stat-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: clamp(32px, 5vh, 56px) clamp(12px, 2vw, 24px);
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        @media (max-width: 639px) {
          .sb-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sb-stat-cell:nth-child(3),
          .sb-stat-cell:nth-child(4) {
            border-top: 1px solid rgba(255,255,255,0.07);
          }
        }

        /* ── Config row ── */
        .sb-config-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 48px);
          flex-wrap: wrap;
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(28px, 4vh, 44px) clamp(24px, 5vw, 64px);
        }
        .sb-cta-col {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 640px) {
          .sb-config-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .sb-cta-col {
            width: 100%;
          }
          .sb-unlock-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
