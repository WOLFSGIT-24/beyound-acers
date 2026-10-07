import React, { useEffect, useRef, useState } from 'react';

/* ─── Reveal Animation Component ─────────────────────────────────────────── */
function Reveal({
  children, delay = 0, y = 20,
}: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setOn(true), delay); io.unobserve(el); } },
      { threshold: 0.04 }
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

/* ─── SVG Icons for each benefit ──────────────────────────────────────────── */
const ICONS = {
  shield: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  document: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="15" y2="17"/>
    </svg>
  ),
  verified: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 12l2 2 4-4"/>
      <path d="M12 2a2.4 2.4 0 0 0-1.7.7L8.6 4.4a2.4 2.4 0 0 1-1.2.6l-2.2.5a2.4 2.4 0 0 0-1.8 1.8l-.5 2.2a2.4 2.4 0 0 1-.6 1.2L.7 12.3"/>
    </svg>
  ),
  lock: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>
  ),
  management: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F4F1EC" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

/* ─── Redesigned Key Points Data ─────────────────────────────────────────── */
const BRANDED_LAND_BENEFITS = [
  {
    icon: ICONS.shield,
    title: "Institutionally Backed Expertise",
    desc: "Founded by Rohit Tandon, with 26 years of institutional experience including 17 years at KPMG advising real estate and infrastructure. Financial rigour built into every decision."
  },
  {
    icon: ICONS.document,
    title: "100% Clear Titles. Zero Ambiguity.",
    desc: "Every plot comes with verified, encumbrance-free land titles. No litigation risk. No hidden dues. RERA-registered and bank-approved. Because trust is non-negotiable."
  },
  {
    icon: ICONS.verified,
    title: "Verified by Terra by Flow",
    subtitle: "Independent Project Review",
    desc: "Every claim, legal, infrastructure, environmental, independently verified. You buy with full transparency, not just a developer's promise."
  },
  {
    icon: ICONS.lock,
    title: "Grade A Infrastructure Delivery",
    desc: "Proven track record delivering Grade A+ plotted communities. Underground utilities, wide internal roads, boundary walls, all completed before handover. No delays. No compromises."
  },
  {
    icon: ICONS.management,
    title: "End-to-End Ownership Support",
    desc: "From booking to registration to construction, a professionally managed team handles every step. So your journey to Riverine is as calm as the place itself."
  }
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AboutUsMinimalSection() {
  return (
    <section id="about-minimal" style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div style={{
        padding: 'clamp(60px, 8vh, 100px) clamp(24px, 8vw, 120px)',
      }}>

        {/* ── Top Header Section ── */}
        <div style={{ maxWidth: '800px', marginBottom: 'clamp(48px, 6vh, 72px)' }}>
          {/* Eyebrow */}
          <Reveal delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 600,
                fontSize: '13px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(0,53,57,0.65)',
              }}>
                About Us
              </span>
            </div>
          </Reveal>

          {/* Main Title */}
          <Reveal delay={60}>
            <h2 style={{
              fontFamily: "'DM Sans', Roboto, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#003539',
              marginBottom: '16px',
            }}>
              The People Behind Riverine.<br />
              <span style={{ color: '#C9A84C', fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)', fontWeight: 600, letterSpacing: '-0.01em' }}>Built With Care. Delivered With Transparency.</span>
            </h2>
          </Reveal>

          {/* Editorial Lead Paragraph */}
          <Reveal delay={120}>
            <p style={{
              fontFamily: "'DM Sans', Roboto, sans-serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(0,53,57,0.65)',
              marginBottom: '24px'
            }}>
              Beyond Acres is led by Rohit Tandon, Co-founder of Purple Brick Estates LLP, with 26 years of institutional expertise including 17 years in KPMG leadership advising India's largest real estate and infrastructure businesses.
            </p>
          </Reveal>
          
          <Reveal delay={160}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(0,53,57,0.3)' }} />
          </Reveal>
        </div>

        {/* ── Redesigned 5-Column Grid ── */}
        <div className="branded-benefits-grid">
          {BRANDED_LAND_BENEFITS.map((benefit, i) => (
            <div key={i}>
              <Reveal delay={200 + i * 80} y={30}>
                <div className="benefit-card">
                
                  {/* Visual Icon Platform Pedestal */}
                  <div className="icon-platform-wrapper">
                    <div className="icon-pedestal">
                      <span className="benefit-icon">{benefit.icon}</span>
                    </div>
                  </div>

                  {/* Content Block */}
                  <h3 className="benefit-title">
                    {benefit.title}
                    {benefit.subtitle && <span className="benefit-subtitle">{benefit.subtitle}</span>}
                  </h3>
                
                  <p className="benefit-description">
                    {benefit.desc}
                  </p>

                </div>
              </Reveal>
            </div>
          ))}
        </div>

      </div>

      {/* ── Layout Styles ── */}
      <style>{`
        /* 5-Column Horizontal Flow Container */
        .branded-benefits-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(24px, 2.5vw, 40px);
          align-items: start;
        }

        .benefit-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Architectural Icon Platform Base Styles */
        .icon-platform-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }

        .icon-pedestal {
          position: relative;
          width: 88px;
          height: 12px;
          background: rgba(0, 53, 57, 0.08);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 36px;
        }

        .benefit-icon {
          position: absolute;
          bottom: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background: #003539;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 53, 57, 0.22);
        }

        /* Typography Styles matching your criteria */
        .benefit-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(1.05rem, 1.35vw, 1.25rem);
          line-height: 1.25;
          color: #003539;
          margin: 0 0 14px 0;
          letter-spacing: -0.01em;
        }

        .benefit-subtitle {
          display: block;
          font-size: 0.8em;
          opacity: 0.7;
          font-weight: 500;
          letter-spacing: 0;
        }

        .benefit-description {
          font-family: 'Roboto', sans-serif;
          font-weight: 300;
          font-size: clamp(0.82rem, 0.92vw, 0.88rem);
          line-height: 1.7;
          color: rgba(0, 53, 57, 0.6);
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .branded-benefits-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .branded-benefits-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .benefit-card {
            align-items: center;
            text-align: center;
          }
          .icon-platform-wrapper {
            justify-content: center;
            margin-bottom: 20px;
          }
          .benefit-title {
            font-size: 1.1rem !important;
          }
          .benefit-description {
            font-size: 0.88rem !important;
            max-width: 300px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .branded-benefits-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .benefit-card {
            align-items: center;
            text-align: center;
          }
          .icon-platform-wrapper {
            justify-content: center;
            margin-bottom: 18px;
          }
          .icon-pedestal {
            width: 88px;
            margin-top: 36px;
          }
          .benefit-icon {
            width: 64px;
            height: 64px;
            border-radius: 12px;
          }
          .benefit-title {
            font-size: 1.1rem !important;
            margin-bottom: 10px !important;
          }
          .benefit-description {
            font-size: 0.87rem !important;
            line-height: 1.65 !important;
            max-width: 280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}