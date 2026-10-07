import React, { useState, useEffect, useRef } from 'react';

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
      { threshold: 0.06 }
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

/* ─── FAQ data ───────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Is Riverine the same project as Codename Unstoppable 2.0?',
    a: 'Yes. Codename Unstoppable 2.0 was the pre-launch name. Riverine is the permanent identity of the project, launching this Dussehra. The land, the masterplan, the RERA registration and the developer are all unchanged, and the 180+ families who joined during pre-launch are now part of Riverine.',
    tag: 'About Riverine',
  },
  {
    q: 'What is everyday life like at Riverine?',
    a: 'Quiet mornings under a canopy of 2,000+ native trees, afternoons in the wellness groves, evenings on the riverfront terraces along the Kaveri, and weekends at the clubhouse and sports arena. It is a place to slow down and reconnect with nature, with Bengaluru 90 minutes away and Mysuru closer still.',
    tag: 'Lifestyle',
  },
  {
    q: 'Are the plots at Riverine RERA-approved?',
    a: 'Yes, all eligible plots are RERA-approved, come with clear land titles, and have complete infrastructure development, so you can build your home whenever you are ready.',
    tag: 'Legal & Approvals',
  },
  {
    q: 'What makes Beyond Acres different from other real estate or land developers?',
    a: 'We bring together technology, trust, and transparency to deliver a truly modern land buying experience. Unlike traditional developers, we are a professionally managed company that provides tech-enabled services like digital bookings, verified documents, and real-time updates. The result is a seamless and premium land ownership journey.',
    tag: 'About Beyond Acres',
  },
  {
    q: 'How does the project integrate wellness and sustainability?',
    a: 'The project is thoughtfully planned around wellness, movement, and sustainable living. Features include aroma gardens, zen gardens, tree-lined avenues, cycle-friendly streets, hammock gardens, rainwater harvesting, solar lighting, grey water systems, and permeable paving. The riverside environment further enhances the calm, nature-led lifestyle experience.',
    tag: 'Sustainability',
  },
  {
    q: 'Who is the developer behind Riverine?',
    a: 'Riverine is developed by Beyond Acres, a new-age real estate company founded by Rohit Tandon, Co-founder of Purple Brick Estates LLP, known for creating Grade A+ communities. The company brings together deep expertise in finance, infrastructure, and real estate development with a focus on transparent transactions, sustainable planning, and future-ready communities.',
    tag: 'Developer',
  },
  {
    q: 'Where is Riverine located?',
    a: 'Riverine sits beside the River Kaveri in Srirangapatna, Mysuru, just off the Bengaluru–Mysuru Expressway. It is surrounded by nature and riverside calm, with easy access to Bengaluru, Mysuru city, Manipal Hospital Road, Mysuru Ring Road, Infosys, schools and lifestyle destinations.',
    tag: 'Location',
  },
  {
    q: 'Does a plot at Riverine hold long-term value?',
    a: 'Riverine is on the Bengaluru–Mysuru Expressway, with the Peripheral Ring Road and wider Mysuru connectivity on the way. Add a riverfront setting, 35% permanently open green space and clear, RERA-approved titles, and buyers can be confident in the long-term value of their plot as well as the life it offers.',
    tag: 'Investment',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0); // first item open by default

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  return (
    <section id="faq" style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ── Section header ───────────────────────────────────────────── */}
      <div style={{
        padding: 'clamp(36px, 5vh, 64px) clamp(24px, 8vw, 120px) clamp(40px, 6vh, 60px)',
      }}>
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(20px, 3vh, 32px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: '#C9A84C',
            }}>
              FAQ
            </span>
          </div>
        </Reveal>

        <div className="faq-header-grid">
          <Reveal delay={60}>
            <div>
              <h2 style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)',
                lineHeight: 0.92, letterSpacing: '-0.025em',
                color: '#003539',
                marginBottom: 'clamp(14px, 2vh, 20px)',
              }}>
                Frequently Asked<br />Questions.<br />
                <span style={{ color: '#C9A84C', fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontStyle: 'italic' }}>Then Come and See.</span>
              </h2>
              <div style={{ width: '40px', height: '1px', background: 'rgba(0,53,57,0.3)' }} />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
              lineHeight: 1.9, color: 'rgba(33,37,41,0.65)',
              maxWidth: '440px',
            }}>
              Everything you need to know about Riverine, from everyday life
              by the Kaveri and the location to sustainability, approvals
              and the people behind the project.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Accordion ────────────────────────────────────────────────── */}
      <div style={{
        padding: '0 clamp(24px, 8vw, 120px) clamp(36px, 5vh, 64px)',
      }}>
        <div style={{ borderTop: '1px solid rgba(0,53,57,0.1)' }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 35}>
                <div style={{ borderBottom: '1px solid rgba(0,53,57,0.1)' }}>

                  {/* ── Question row ── */}
                  <button
                    onClick={() => toggle(i)}
                    className="faq-question-btn"
                    style={{
                      width: '100%', textAlign: 'left', background: 'none',
                      border: 'none', cursor: 'pointer',
                      display: 'grid',
                      gridTemplateColumns: 'clamp(36px,4.5vw,52px) 1fr auto',
                      alignItems: 'center',
                      gap: 'clamp(14px, 2vw, 24px)',
                      padding: 'clamp(18px, 2.8vh, 26px) 0',
                    }}
                  >
                    {/* Index */}
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                      fontSize: '11px', letterSpacing: '0.08em',
                      color: 'rgba(0,53,57,0.25)', flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Question + tag */}
                    <div>
                      {/* Category tag */}
                      <span style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                        fontSize: '9px', letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: isOpen ? 'rgba(0,53,57,0.6)' : 'rgba(0,53,57,0.3)',
                        display: 'block', marginBottom: '6px',
                        transition: 'color 0.3s ease',
                      }}>
                        {faq.tag}
                      </span>
                      {/* Question text */}
                      <span style={{
                        fontFamily: "'DM Sans', Roboto, sans-serif",
                        fontWeight: 700,
                        fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)',
                        lineHeight: 1.2, letterSpacing: '-0.01em',
                        color: isOpen ? '#003539' : 'rgba(33,37,41,0.82)',
                        display: 'block',
                        transition: 'color 0.3s ease',
                      }}>
                        {faq.q}
                      </span>
                    </div>

                    {/* Toggle button */}
                    <div style={{
                      width: '32px', height: '32px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${isOpen ? '#003539' : 'rgba(0,53,57,0.18)'}`,
                      background: isOpen ? '#003539' : 'transparent',
                      color: isOpen ? '#ffffff' : 'rgba(0,53,57,0.4)',
                      transition: 'all 0.3s ease',
                    }}>
                      <svg
                        width="12" height="12" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round"
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

                  {/* ── Answer — animated expand ── */}
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? '360px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.5s ease, opacity 0.4s ease',
                  }}>
                    <div className="faq-answer-content" style={{
                      paddingLeft: 'clamp(50px, 6.5vw, 76px)',
                      paddingBottom: 'clamp(20px, 3vh, 28px)',
                      paddingRight: 'clamp(48px, 6vw, 72px)',
                    }}>
                      <p style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                        fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                        lineHeight: 1.9, color: 'rgba(33,37,41,0.68)',
                        margin: 0,
                      }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Bottom note ── */}
        <Reveal delay={300}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '16px',
            marginTop: 'clamp(28px, 4vh, 40px)',
            paddingTop: 'clamp(20px, 3vh, 28px)',
            borderTop: '1px solid rgba(0,53,57,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'block', width: '16px', height: '1px', background: 'rgba(0,53,57,0.2)', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'rgba(0,53,57,0.3)',
              }}>
                Have more questions? We're happy to help.
              </span>
            </div>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                fontSize: '10px', letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#003539',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '7px',
                opacity: 0.65, transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
            >
              Contact Us
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        .faq-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: end;
        }
        @media (max-width: 860px) {
          .faq-header-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 560px) {
          .faq-answer-content {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .faq-question-btn {
            grid-template-columns: 28px 1fr auto !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
