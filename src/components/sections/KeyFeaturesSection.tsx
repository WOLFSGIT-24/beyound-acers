import React, { useEffect, useRef, useState } from 'react';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}> = ({ children, delay = 0, className = '', y = 28 }) => {
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
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : `translateY(${y}px)`,
        transition: 'opacity 0.95s ease, transform 0.95s ease',
      }}
    >
      {children}
    </div>
  );
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const metrics = [
  { value: '21',        sup: '',    unit: 'Acres',        label: 'Eco-Engineered Township'    },
  { value: '~50,000',   sup: '',    unit: 'sq. ft.',      label: 'Clubhouse & Social Realm'   },
  { value: '331',       sup: '+',   unit: '',             label: 'Exclusive Premium Plots'    },
  { value: '900–2400',  sup: '',    unit: 'sq. ft.',      label: 'Curated Plot Dimensions'    },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function KeyFeaturesSection() {
  return (
    <section
      id="key-features"
      style={{ background: '#ffffff', overflow: 'hidden' }}
    >
      {/* ── Top rule ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(33,37,41,0.1)' }} />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(36px, 5vh, 64px) clamp(24px, 5vw, 64px)',
        }}
      >
        {/* ── Section eyebrow ──────────────────────────────────────── */}
        <Reveal delay={0}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: 'clamp(40px, 6vh, 64px)',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '32px',
                height: '1px',
                background: 'rgba(33,37,41,0.35)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 500,
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C9A84C',
              }}
            >
              Key Features
            </span>
          </div>
        </Reveal>

        {/* ── Main two-column layout ────────────────────────────────── */}
        <div className="kf-grid">

          {/* LEFT — heading + editorial body */}
          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vh, 32px)' }}>

              <h2
                style={{
                  fontFamily: "'DM Sans', Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#003539',
                }}
              >
                Key Features
              </h2>

              {/* Accent rule */}
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  background: '#003539',
                  opacity: 0.4,
                }}
              />

              <p
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 300,
                  fontSize: 'clamp(0.875rem, 1vw, 0.975rem)',
                  lineHeight: 1.9,
                  color: 'rgba(33,37,41,0.72)',
                  maxWidth: '420px',
                }}
              >
                A first-of-its-kind biodiversity-led riverfront township on the{' '}
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.82)' }}>
                  Bengaluru–Mysuru Growth Corridor
                </strong>
                , where nature, wellness, and future-ready infrastructure converge
                into an extraordinary plotted living experience.
              </p>
            </div>
          </Reveal>

          {/* RIGHT — 2×2 metric grid */}
          <div className="kf-metrics-grid">
            {metrics.map((m, i) => (
              <Reveal key={i} delay={160 + i * 70}>
                <div
                  className="kf-metric-cell"
                  style={{
                    padding: 'clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 32px)',
                    borderTop: i >= 2 ? '1px solid rgba(33,37,41,0.1)' : 'none',
                    borderLeft: i % 2 === 1 ? '1px solid rgba(33,37,41,0.1)' : 'none',
                  }}
                >
                  {/* Big number */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px',
                      flexWrap: 'wrap',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', Roboto, sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.03em',
                        color: '#003539',
                      }}
                    >
                      {m.value}
                    </span>
                    {m.sup && (
                      <span
                        style={{
                          fontFamily: "'DM Sans', Roboto, sans-serif",
                          fontWeight: 600,
                          fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                          color: '#003539',
                          opacity: 0.7,
                          lineHeight: 1,
                        }}
                      >
                        {m.sup}
                      </span>
                    )}
                    {m.unit && (
                      <span
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 400,
                          fontSize: 'clamp(0.7rem, 1.1vw, 1rem)',
                          color: 'rgba(0,53,57,0.55)',
                          letterSpacing: '0.04em',
                          alignSelf: 'flex-end',
                          paddingBottom: '4px',
                        }}
                      >
                        {m.unit}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <p
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.88rem)',
                      color: 'rgba(33,37,41,0.55)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      lineHeight: 1.4,
                    }}
                  >
                    {m.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom rule */}
      <div style={{ borderBottom: '1px solid rgba(33,37,41,0.1)' }} />

      <style>{`
        .kf-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }
        .kf-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .kf-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .kf-metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .kf-metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
