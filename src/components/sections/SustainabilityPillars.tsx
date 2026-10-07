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
      { threshold: 0.06 }
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

/* ─── Pillar data ────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    num: '01',
    title: 'Biodiversity-Led Living',
    body: [
      { text: '2,000+', highlight: true },
      { text: ' native trees and ', highlight: false },
      { text: '10,000+', highlight: true },
      { text: ' shrubs thoughtfully integrated across the township to create living green corridors inspired by Mysuru\'s natural ecology. Every street is designed as a micro-ecosystem named after native birds, butterflies, and pollinators, fostering biodiversity while naturally cooling the environment.', highlight: false },
    ],
  },
  {
    num: '02',
    title: 'Engineered Invisible Luxury',
    body: [
      { text: '100%', highlight: true },
      { text: ' underground utilities, ', highlight: false },
      { text: '1.5 km+', highlight: true },
      { text: ' compound wall infrastructure, and thoughtfully engineered road networks create a clutter-free, future-ready living experience. Wide ', highlight: false },
      { text: '12m & 9m', highlight: true },
      { text: ' roads, dedicated cycling tracks, pedestrian pathways, and permeable paving ensure seamless movement with sustainable planning built in.', highlight: false },
    ],
  },
  {
    num: '03',
    title: 'Intelligent Water Management',
    body: [
      { text: 'Designed with ', highlight: false },
      { text: '50+', highlight: true },
      { text: ' recharge pits capable of handling up to ', highlight: false },
      { text: '100 mm/hr', highlight: true },
      { text: ' rainfall, supported by RCC-structured irrigation canals and engineered stormwater systems. The development also features rainwater harvesting, SBR-based STP technology, grey water reuse for landscaping, and ', highlight: false },
      { text: '100-year floodline', highlight: true },
      { text: ' considerations for long-term resilience.', highlight: false },
    ],
  },
  {
    num: '04',
    title: 'Nature-First Streetscapes',
    body: [
      { text: 'Spread across ', highlight: false },
      { text: '21 acres', highlight: true },
      { text: ' with ', highlight: false },
      { text: '35%', highlight: true },
      { text: ' open spaces and a ', highlight: false },
      { text: '3.15-acre', highlight: true },
      { text: ' park ecosystem, the township blends biodiversity parks, wellness groves, riverfront terraces, herbal gardens, pollination meadows, and shaded walkways to create a healthier and more immersive outdoor lifestyle.', highlight: false },
    ],
  },
  {
    num: '05',
    title: 'Eco-Smart Infrastructure',
    body: [
      { text: 'Karnataka\'s ', highlight: false },
      { text: '1st', highlight: true },
      { text: ' eco-engineered plotted development with ', highlight: false },
      { text: '330+', highlight: true },
      { text: ' premium plots, solar-assisted street lighting, permeable landscape zones, sustainable drainage systems, and water-conscious planning aligned with ', highlight: false },
      { text: '14 out of 17', highlight: true },
      { text: ' UN Sustainable Development Goals, creating a self-sustaining community designed for the future.', highlight: false },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function SustainabilityPillars() {
  const [open, setOpen] = useState<number>(0); // First row open by default

  const toggle = (i: number) => setOpen(prev => prev === i ? -1 : i);

  return (
    <section id="sustainability" style={{ background: '#0a1f1e', overflow: 'hidden' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(48px, 7vh, 80px) clamp(24px, 5vw, 64px)',
      }}>

        {/* ── Section label ── */}
        <Reveal delay={0}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            marginBottom: 'clamp(36px, 5vh, 52px)',
          }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{
              fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
            }}>
              The Five Pillars of Sustainability
            </span>
          </div>
        </Reveal>

        {/* ── Accordion rows ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {PILLARS.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 40}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

                  {/* ── Row trigger ── */}
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      width: '100%', textAlign: 'left',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'grid',
                      gridTemplateColumns: 'clamp(36px, 5vw, 52px) 1fr 36px',
                      alignItems: 'center',
                      gap: 'clamp(12px, 2vw, 20px)',
                      padding: 'clamp(18px, 2.8vh, 26px) 0',
                    }}
                  >
                    {/* Number */}
                    <span style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
                      color: isOpen ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                      letterSpacing: '0.06em',
                      transition: 'color 0.3s ease',
                      fontVariantNumeric: 'lining-nums tabular-nums',
                    }}>
                      {p.num}
                    </span>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)',
                      lineHeight: 1.2, letterSpacing: '-0.01em',
                      color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.7)',
                      margin: 0,
                      transition: 'color 0.3s ease',
                    }}>
                      {p.title}
                    </h3>

                    {/* Plus/Minus icon */}
                    <div style={{
                      width: '36px', height: '36px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${isOpen ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}`,
                      color: isOpen ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}>
                      <svg
                        width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        style={{
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.35s ease',
                        }}
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </button>

                  {/* ── Expanded content ── */}
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.5s ease, opacity 0.4s ease',
                  }}>
                    <div className="sp-expanded-content" style={{
                      paddingLeft: 'clamp(48px, 7vw, 72px)',
                      paddingBottom: 'clamp(20px, 3vh, 28px)',
                      paddingRight: 'clamp(48px, 6vw, 72px)',
                    }}>
                      <p style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                        fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                        lineHeight: 1.9, color: 'rgba(255,255,255,0.5)',
                        margin: 0, maxWidth: '720px',
                      }}>
                        {p.body.map((segment, si) => (
                          segment.highlight ? (
                            <strong key={si} style={{
                              fontWeight: 600,
                              color: 'rgba(255,255,255,0.92)',
                            }}>
                              {segment.text}
                            </strong>
                          ) : (
                            <span key={si}>{segment.text}</span>
                          )
                        ))}
                      </p>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Footer tag ── */}
        <Reveal delay={300}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginTop: 'clamp(28px, 4vh, 40px)',
          }}>
            <span style={{ display: 'block', width: '20px', height: '1px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: '10px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
            }}>
              Eco-Engineered · Future-Ready · Nature-Led
            </span>
          </div>
        </Reveal>

      </div>

      <style>{`
        @media (max-width: 560px) {
          .sp-expanded-content {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
