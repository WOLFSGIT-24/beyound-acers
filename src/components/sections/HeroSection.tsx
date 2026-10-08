import { Image } from '@/components/ui/image';
import React, { useEffect, useRef, useState } from 'react';

const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); io.unobserve(el); } },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
      {children}
    </div>
  );
};

interface HeroSectionProps {
  onFormSubmit?: (data: { fullName: string; emailAddress: string; phoneNumber: string; message: string }) => Promise<void>;
  isSubmitting?: boolean;
  submitMessage?: string;
  onOpenPopup: () => void;
}

export default function HeroSection({ onOpenPopup }: HeroSectionProps) {
  return (
    <section className="hero-section" style={{ position: 'relative', width: '100%', minHeight: '100svh', overflow: 'hidden', background: '#081225' }}>

      {/* Background Image & Overlays */}
      <Image 
        src="https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png" 
        alt="Riverine by Beyond Acres" 
        aria-hidden="true" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', zIndex: 0 }} 
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(10, 20, 40, 0.88) 0%, rgba(10, 20, 40, 0.65) 55%, rgba(10, 20, 40, 0.35) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(8, 18, 37, 0.9) 0%, transparent 50%)' }} />

      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'max(90px, calc(70px + 3vh)) clamp(20px, 5vw, 72px) clamp(24px, 4vh, 40px)' }}>

        {/* Top Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
          <Reveal delay={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#EAF2FF' }}>
                RERA Approved Project
              </span>
            </div>
          </Reveal>
        </div>

        {/* Center Main Hero Card */}
        <div style={{ maxWidth: 900, margin: '24px 0' }}>
          
          {/* Main Title: Thank You for an incredible response */}
          <Reveal delay={120}>
            <h1 style={{ fontFamily: "'Playfair Display', 'DM Sans', serif", fontWeight: 700, fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF', margin: '0 0 4px' }}>
              Thank You
            </h1>
          </Reveal>
          
          <Reveal delay={160}>
            <h2 style={{ fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 4vw, 3.4rem)', lineHeight: 1.15, color: '#EAF2FF', opacity: 0.95, margin: '0 0 clamp(20px, 3vh, 32px)' }}>
              for an incredible response
            </h2>
          </Reveal>

          {/* Sold Badge Pill - Golden Background & Black Text */}
          <Reveal delay={200}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 'clamp(12px, 2vw, 24px)', 
              background: '#C9A84C', 
              borderRadius: 14, 
              padding: 'clamp(12px, 1.8vh, 18px) clamp(20px, 3vw, 32px)', 
              boxShadow: '0 12px 35px rgba(201, 168, 76, 0.35)', 
              marginBottom: 'clamp(28px, 4vh, 44px)',
              border: '1px solid rgba(255, 255, 255, 0.4)'
            }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', color: '#0A162C', lineHeight: 1, letterSpacing: '-0.02em' }}>
                180+
              </span>
              <div style={{ width: 2, height: 'clamp(28px, 4vw, 42px)', background: '#0A162C', opacity: 0.3 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(11px, 1.2vw, 15px)', color: '#0A162C', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.2 }}>
                  PLOTS SOLD
                </span>
                <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: 'clamp(10px, 1vw, 13px)', color: '#0A162C', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3, opacity: 0.9 }}>
                  IN PRE-LAUNCH PHASE
                </span>
              </div>
            </div>
          </Reveal>

          {/* 3 Key Details Cards */}
          <Reveal delay={240}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', 
              gap: 16, 
              marginBottom: 36,
              maxWidth: 820
            }}>

              {/* Item 1: Price */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 14, 
                background: 'rgba(10, 22, 44, 0.65)', 
                backdropFilter: 'blur(16px)', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                borderRadius: 12, 
                padding: '16px 20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid rgba(201, 168, 76, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M8 8h7M8 12h6M8 12c2.5 0 4.5 1.5 4.5 4S10.5 18 8 18M11 12l4 6"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
                    STARTING
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: '#FFFFFF', marginTop: 2 }}>
                    ₹56 LAKHS+
                  </div>
                </div>
              </div>

              {/* Item 2: Plot Sizes */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 14, 
                background: 'rgba(10, 22, 44, 0.65)', 
                backdropFilter: 'blur(16px)', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                borderRadius: 12, 
                padding: '16px 20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid rgba(201, 168, 76, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <line x1="12" y1="3" x2="12" y2="21"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
                    PLOT SIZES
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: '#FFFFFF', marginTop: 2 }}>
                    1,454+ SQ.FT.
                  </div>
                </div>
              </div>

              {/* Item 3: Location */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 14, 
                background: 'rgba(10, 22, 44, 0.65)', 
                backdropFilter: 'blur(16px)', 
                border: '1px solid rgba(255, 255, 255, 0.15)', 
                borderRadius: 12, 
                padding: '16px 20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid rgba(201, 168, 76, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
                    3 MINS FROM
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginTop: 2, lineHeight: 1.2 }}>
                    PAYANA CAR MUSEUM, MYSORE
                  </div>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Action Buttons + Larger Grand Launch Box */}
          <Reveal delay={280}>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                onClick={onOpenPopup}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 10, 
                  padding: '18px 36px', 
                  background: '#C9A84C', 
                  color: '#0A162C', 
                  fontFamily: 'Roboto, sans-serif', 
                  fontWeight: 700, 
                  fontSize: '12px', 
                  letterSpacing: '0.16em', 
                  textTransform: 'uppercase', 
                  border: 'none', 
                  borderRadius: 8,
                  cursor: 'pointer', 
                  boxShadow: '0 6px 24px rgba(201, 168, 76, 0.35)',
                  transition: 'transform 0.2s ease, background 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#b8943e';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }} 
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C9A84C';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book a Site Visit
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>

              <button 
                onClick={onOpenPopup}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  padding: '18px 32px', 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF', 
                  fontFamily: 'Roboto, sans-serif', 
                  fontWeight: 600, 
                  fontSize: '12px', 
                  letterSpacing: '0.16em', 
                  textTransform: 'uppercase', 
                  border: '1.5px solid rgba(255, 255, 255, 0.3)', 
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')} 
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              >
                Enquire Now
              </button>

              {/* Increased Size Grand Launch Box */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 20,
                padding: '16px 28px',
                background: 'rgba(10, 22, 44, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(201, 168, 76, 0.55)',
                borderRadius: 10,
                boxShadow: '0 10px 36px rgba(0, 0, 0, 0.45)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: '13px', letterSpacing: '0.22em', color: '#C9A84C', textTransform: 'uppercase' }}>
                    Grand Launch
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '20px', color: '#FFFFFF', marginTop: 3, lineHeight: 1.1 }}>
                    This Dussehra
                  </span>
                </div>
                <div style={{ width: 1.5, height: 38, background: 'rgba(201, 168, 76, 0.45)' }} />
                <div style={{
                  padding: '8px 18px',
                  background: 'rgba(201, 168, 76, 0.18)',
                  border: '1px solid rgba(201, 168, 76, 0.5)',
                  borderRadius: 20,
                }}>
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#EAF2FF' }}>
                    Coming Soon
                  </span>
                </div>
              </div>

            </div>
          </Reveal>

        </div>

        {/* Bottom Footer Info Row */}
        <Reveal delay={320}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)', letterSpacing: '0.04em' }}>
                Pre-launch Phase Ongoing · Riverside Development, Srirangapatna
              </span>
            </div>

            <div style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.05em' }}>
              RERA PRM/KA/RERA/1267/374/PR/230626/008745
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
