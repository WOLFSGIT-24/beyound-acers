import React, { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.07 }
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

/* ─── Trust points ───────────────────────────────────────────────────────── */
const TRUST = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: 'Legally Secure Land',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    label: '100% Clear Titles',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    label: 'Verified by Terra by Flow',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: 'End-to-End Management',
  },
];

/* ... keep existing code ... */

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AboutUsSection({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <section id="about" style={{ background: '#ffffff', overflow: 'hidden' }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(48px, 7vh, 80px) clamp(24px, 5vw, 64px)',
      }}>

        {/* ── Eyebrow ── */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(20px, 3vh, 28px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: '#C9A84C',
            }}>
              About Us
            </span>
          </div>
        </Reveal>

        {/* ── Heading ── */}
        <Reveal delay={60}>
          <h2 style={{
            fontFamily: "'DM Sans', Roboto, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#003539',
            marginBottom: 'clamp(8px, 1.2vh, 12px)',
          }}>
            Beyond Acres
          </h2>
        </Reveal>

        {/* ── Accent rule ── */}
        <Reveal delay={100}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(0,53,57,0.3)', marginBottom: 'clamp(28px, 4vh, 40px)' }} />
        </Reveal>

        {/* ══════════════════════════════════════════════════════════════
            MAIN GRID: content left, trust points right
        ══════════════════════════════════════════════════════════════ */}
        <div className="about-main-grid">

          {/* ── LEFT — editorial body copy ── */}
          <Reveal delay={140}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vh, 18px)' }}>

              {/* Lead question */}
              <p style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                lineHeight: 1.4,
                color: '#003539',
              }}>
                We understand land and investment
              </p>

              {/* Italic lead */}
              <p style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                lineHeight: 1.7,
                color: 'rgba(0,53,57,0.5)',
              }}>
                Founded by industry veteran Rohit Tandon, drawing from 26 years of institutional expertise, including 17 years in KPMG leadership advising real estate and infrastructure businesses, the brand brings unmatched financial clarity and transparency to land banking.
              </p>

              {/* Body paragraphs */}
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.9, color: 'rgba(33,37,41,0.7)',
              }}>
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.85)' }}>Legally secure land.</strong> All plots are legally vetted and encumbrance-free.
              </p>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.9, color: 'rgba(33,37,41,0.7)',
              }}>
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.85)' }}>100% clear titles.</strong> Zero litigation, zero disputes. Guaranteed.
              </p>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.9, color: 'rgba(33,37,41,0.7)',
              }}>
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.85)' }}>Project verified by Terra by Flow.</strong> Independent third-party project verification.
              </p>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.85rem, 0.95vw, 0.92rem)',
                lineHeight: 1.9, color: 'rgba(33,37,41,0.7)',
              }}>
                <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.85)' }}>End to End Management.</strong> From acquisition to handover, fully managed.
              </p>

            </div>
          </Reveal>

          {/* ── RIGHT — trust points ── */}
          <div className="about-trust-grid">
            {TRUST.map((t, i) => (
              <Reveal key={i} delay={160 + i * 50}>
                <div className="about-trust-cell">
                  {/* Icon */}
                  <span style={{
                    color: 'rgba(0,53,57,0.6)',
                    display: 'block',
                    marginBottom: '12px',
                  }}>
                    {t.icon}
                  </span>
                  {/* Label */}
                  <span style={{
                    fontFamily: 'Roboto, sans-serif', fontWeight: 600,
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    color: '#003539',
                    display: 'block', lineHeight: 1.4,
                  }}>
                    {t.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        /* Main grid: content left, trust points right */
        .about-main-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: start;
        }

        /* Trust points grid */
        .about-trust-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(0,53,57,0.1);
          border-left: 1px solid rgba(0,53,57,0.1);
        }
        .about-trust-cell {
          padding: clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 24px);
          border-right: 1px solid rgba(0,53,57,0.1);
          border-bottom: 1px solid rgba(0,53,57,0.1);
        }

        /* Mobile: stack vertically */
        @media (max-width: 860px) {
          .about-main-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(28px, 4vh, 36px) !important;
          }
          .about-trust-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
