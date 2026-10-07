import React, { useEffect, useRef, useState } from 'react';
import { PlotTypes } from '@/entities';
import { Image } from '@/components/ui/image';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; y?: number }> = ({
  children, delay = 0, y = 24,
}) => {
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
      transition: 'opacity 1s ease, transform 1s ease',
    }}>
      {children}
    </div>
  );
};

interface PlotOfferingsSectionProps {
  plotTypes: PlotTypes[];
  isLoading: boolean;
}

export default function PlotOfferingsSection({ plotTypes, isLoading }: PlotOfferingsSectionProps) {
  return (
    <section id="plot-offerings" style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ── Compact header — minimal text, image is the star ─────────── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(40px, 6vh, 64px) clamp(24px, 5vw, 64px) clamp(20px, 3vh, 28px)',
        textAlign: 'center',
      }}>
        {/* Eyebrow */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: 'clamp(14px, 2vh, 20px)' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: 'rgba(0,53,57,0.45)',
            }}>
              Master Plan
            </span>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
          </div>
        </Reveal>

        {/* Heading — centered, moderate size */}
        <Reveal delay={50}>
          <h2 style={{
            fontFamily: "'DM Sans', Roboto, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#003539',
            marginBottom: 'clamp(8px, 1.2vh, 12px)',
          }}>
            Designed for Life, Engineered for Value
          </h2>
        </Reveal>

        {/* Supporting line */}
        <Reveal delay={90}>
          <p style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
            fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
            lineHeight: 1.7, color: 'rgba(33,37,41,0.55)',
            maxWidth: '520px', margin: '0 auto',
          }}>
            21 acres · 331 plots · 40+ amenities · Riverfront on Kaveri · 100% underground utilities
          </p>
        </Reveal>
      </div>

      {/* ── Hero masterplan image — full width, maximum prominence ────── */}
      <Reveal delay={100} y={12}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(16px, 3vw, 40px) clamp(40px, 6vh, 64px)',
        }}>
          <div className="po-img-frame">
            <Image src="https://static.wixstatic.com/media/cef78c_2e0d6964e5844092b5e48ae7c5d7d705~mv2.png" alt="Codename Unstoppable 2.0 — Master Plan" className="po-masterplan-img" loading="lazy" />
          </div>

          {/* Caption below image */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '20px', marginTop: 'clamp(12px, 2vh, 18px)',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(0,53,57,0.35)',
            }}>
              Codename: Unstoppable 2.0 · Bengaluru–Mysuru Expressway
            </span>
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 400,
              fontSize: '10px', letterSpacing: '0.12em',
              color: 'rgba(0,53,57,0.25)',
            }}>
              Indicative layout · Subject to change
            </span>
          </div>
        </div>
      </Reveal>

      <style>{`
        /* Image frame — premium gallery presentation */
        .po-img-frame {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0,53,57,0.1);
          box-shadow: 0 8px 40px rgba(0,53,57,0.08), 0 2px 12px rgba(0,0,0,0.04);
          background: #ffffff;
          padding: 6px;
        }
        .po-masterplan-img {
          width: 100%;
          height: auto;
          display: block;
          /* No cropping — show full image */
          object-fit: contain;
        }

        /* Mobile: allow touch interaction */
        @media (max-width: 768px) {
          .po-img-frame {
            padding: 3px;
            /* Enable pinch-to-zoom on mobile */
            touch-action: pinch-zoom;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          }
          .po-masterplan-img {
            min-width: 600px; /* Allow horizontal scroll to see detail */
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .po-masterplan-img {
            min-width: 500px;
          }
        }
      `}</style>
    </section>
  );
}
