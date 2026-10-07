import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';

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

/* ─── Category data ──────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'schools',
    label: 'Schools & Colleges',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Delhi Public School',              dist: '8 mins',  note: 'CBSE · K–12'              },
      { name: 'JSS Science & Technology Univ.',   dist: '12 mins', note: 'Premier Engineering'       },
      { name: 'Maharaja Institute of Technology', dist: '10 mins', note: 'Autonomous College'        },
      { name: 'Manipal Educational Institutions', dist: '15 mins', note: 'Multi-discipline Campus'   },
      { name: 'International Schools Corridor',   dist: '10 mins', note: 'IB & IGCSE Options'        },
      { name: 'Mysuru University Campus',         dist: '18 mins', note: 'State University'          },
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Wellness',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Manipal Hospital',                 dist: '9 mins',  note: 'Multi-Speciality'          },
      { name: 'Columbia Asia Hospital',           dist: '12 mins', note: 'Super-Speciality'          },
      { name: 'JSS Hospital',                     dist: '14 mins', note: 'Teaching Hospital'         },
      { name: 'Wellness & Ayurveda Centres',      dist: '5 mins',  note: 'Holistic Wellness'         },
      { name: 'Diagnostic & Imaging Centres',     dist: '6 mins',  note: 'Advanced Diagnostics'      },
      { name: 'Emergency Care Facilities',        dist: '8 mins',  note: '24/7 Access'               },
    ],
  },
  {
    id: 'shopping',
    label: 'Shopping & Entertainment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Mysore Mall',                      dist: '15 mins', note: 'Premium Retail Hub'        },
      { name: 'Forum Mysuru Mall',                dist: '18 mins', note: 'Multiplex & Dining'        },
      { name: 'Infosys Road Retail Strip',        dist: '8 mins',  note: 'Daily Conveniences'        },
      { name: 'Supermarkets & Hypermarkets',      dist: '5 mins',  note: 'Big Bazaar · More'         },
      { name: 'Multiplex Cinemas',                dist: '12 mins', note: 'PVR · INOX'                },
      { name: 'Family Entertainment Zones',       dist: '10 mins', note: 'Leisure & Gaming'          },
    ],
  },
  {
    id: 'work',
    label: 'Work Hubs',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Infosys Mysuru Campus',            dist: '10 mins', note: 'Largest IT Campus'         },
      { name: 'BLR–MYS Expressway Corridor',      dist: '0 mins',  note: 'Direct Access'             },
      { name: 'Hebbal Industrial Area',           dist: '12 mins', note: 'Industrial Zone'           },
      { name: 'Mysuru IT Park',                   dist: '15 mins', note: 'Emerging Tech Hub'         },
      { name: 'KIADB Industrial Zones',           dist: '14 mins', note: 'Manufacturing Belt'        },
      { name: 'Bengaluru CBD',                    dist: '90 mins', note: 'Via Expressway'            },
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Recreation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Payana Car Museum',                dist: '3 mins',  note: 'Iconic Landmark'           },
      { name: 'Mysuru Palace & Gardens',          dist: '20 mins', note: 'Heritage Destination'      },
      { name: 'Brindavan Gardens',                dist: '25 mins', note: 'KRS Dam · Illuminated'     },
      { name: 'Karanji Lake Nature Park',         dist: '18 mins', note: 'Birding & Walks'           },
      { name: 'Chamundi Hills',                   dist: '22 mins', note: 'Panoramic Views'           },
      { name: 'River Kaveri Riverfront',          dist: '2 mins',  note: 'On-site · Promenade'       },
    ],
  },
  {
    id: 'stays',
    label: 'Stays & Resorts',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop',
    places: [
      { name: 'Coorg Nature Resorts',             dist: '2 hrs',   note: 'India\'s Scotland'         },
      { name: 'Kabini Jungle Lodges',             dist: '1.5 hrs', note: 'Wildlife & Safari'         },
      { name: 'Bandipur Safari Resorts',          dist: '1.5 hrs', note: 'Tiger Reserve'             },
      { name: 'Nagarhole Luxury Camps',           dist: '1.5 hrs', note: 'Riverside Wilderness'      },
      { name: 'Mysuru Heritage Hotels',           dist: '20 mins', note: 'Royal Hospitality'         },
      { name: 'Highway Boutique Stays',           dist: '5 mins',  note: 'Expressway Corridor'       },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function NeighbourhoodSection() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  return (
    <section id="neighbourhood" style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ── Section header ───────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(36px, 5vh, 64px) clamp(24px, 5vw, 64px) clamp(28px, 4vh, 48px)',
      }}>
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(20px, 3vh, 32px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Neighbourhood
            </span>
          </div>
        </Reveal>

        <div className="nb-header-grid">
          <Reveal delay={60}>
            <h2 style={{
              fontFamily: "'DM Sans', Roboto, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 4.5vw, 4.4rem)',
              lineHeight: 0.92, letterSpacing: '-0.025em', color: '#003539',
            }}>
              Everything Within<br />Effortless Reach
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
              lineHeight: 1.9, color: 'rgba(33,37,41,0.68)', maxWidth: '440px',
            }}>
              At Codename: Unstoppable 2.0, life is designed around balance and connectivity.
              Located on the fast-growing{' '}
              <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.8)' }}>Bengaluru–Mysuru Expressway corridor</strong>,
              the township places education, healthcare, lifestyle, and recreation within effortless reach.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Category tabs ─────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(0,53,57,0.1)', borderBottom: '1px solid rgba(0,53,57,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 64px)' }}>
          <div className="nb-tabs">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`nb-tab-btn ${active === i ? 'nb-tab-active' : ''}`}
              >
                <span className="nb-tab-icon">
                  {c.icon}
                </span>
                <span className="nb-tab-label">
                  {c.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Active category panel ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(28px, 4vh, 48px) clamp(24px, 5vw, 64px)' }}>
        <div className="nb-panel-grid" key={cat.id}>

          {/* LEFT — category image + label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src={cat.image} alt={cat.label} style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 6s ease',
                }} className="nb-cat-img" />
              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,53,57,0.7) 0%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              {/* Category label on image */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                <span style={{
                  fontFamily: "'DM Sans', Roboto, sans-serif",
                  fontWeight: 700, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  color: '#ffffff', letterSpacing: '-0.01em',
                }}>
                  {cat.label}
                </span>
              </div>
            </div>

            {/* Stat strip */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              borderLeft: '1px solid rgba(0,53,57,0.1)',
              borderBottom: '1px solid rgba(0,53,57,0.1)',
            }}>
              {[
                { value: cat.places.length.toString(), label: 'Key Places' },
                { value: cat.places.filter(p => p.dist.includes('min')).length.toString() + '+', label: 'Within 20 mins' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '16px 18px', textAlign: 'center',
                  borderRight: '1px solid rgba(0,53,57,0.1)',
                  borderTop: '1px solid rgba(0,53,57,0.1)',
                  background: 'rgba(0,53,57,0.03)',
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', Roboto, sans-serif",
                    fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    lineHeight: 1, letterSpacing: '-0.02em', color: '#003539', display: 'block',
                  }}>{s.value}</span>
                  <span style={{
                    fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                    fontSize: '9px', letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'rgba(0,53,57,0.38)',
                    display: 'block', marginTop: '4px',
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — places list */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              paddingBottom: 'clamp(16px, 2.5vh, 22px)',
              marginBottom: 'clamp(16px, 2.5vh, 22px)',
              borderBottom: '1px solid rgba(0,53,57,0.1)',
            }}>
              <h3 style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontWeight: 700, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                lineHeight: 1, letterSpacing: '-0.02em', color: '#003539',
                marginBottom: '6px',
              }}>
                {cat.label}
              </h3>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: '11px', letterSpacing: '0.1em',
                color: 'rgba(0,53,57,0.4)',
              }}>
                {cat.places.length} curated destinations near Codename: Unstoppable 2.0
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {cat.places.map((place, i) => (
                <div
                  key={i}
                  className="nb-place-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: '16px',
                    padding: 'clamp(12px, 1.8vh, 16px) 0',
                    borderBottom: i < cat.places.length - 1 ? '1px solid rgba(0,53,57,0.07)' : 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539', display: 'block', marginBottom: '3px',
                    }}>
                      {place.name}
                    </span>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                      fontSize: '11px', color: 'rgba(33,37,41,0.45)',
                      letterSpacing: '0.04em',
                    }}>
                      {place.note}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    background: 'rgba(0,53,57,0.06)',
                    padding: '5px 10px', flexShrink: 0,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(0,53,57,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 600,
                      fontSize: '10px', letterSpacing: '0.1em',
                      color: 'rgba(0,53,57,0.65)', whiteSpace: 'nowrap',
                    }}>
                      {place.dist}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Header two-col */
        .nb-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: end;
        }

        /* ── Tab system ── */
        /* Desktop: horizontal scroll row */
        .nb-tabs {
          display: flex;
          overflow-x: auto;
          gap: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .nb-tabs::-webkit-scrollbar { display: none; }

        .nb-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 18px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: rgba(33,37,41,0.5);
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nb-tab-btn:hover {
          color: rgba(0,53,57,0.75);
        }
        .nb-tab-btn.nb-tab-active {
          font-weight: 600;
          color: #003539;
          border-bottom-color: #003539;
        }
        .nb-tab-icon {
          color: rgba(33,37,41,0.35);
          transition: color 0.25s ease;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .nb-tab-active .nb-tab-icon {
          color: #003539;
        }
        .nb-tab-label {
          line-height: 1.2;
        }

        /* ── Mobile tabs: 2-column grid ── */
        @media (max-width: 640px) {
          .nb-tabs {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 1px;
            overflow: visible;
            background: rgba(0,53,57,0.08);
            border: 1px solid rgba(0,53,57,0.08);
          }
          .nb-tab-btn {
            white-space: normal;
            padding: 14px 12px;
            font-size: 10px;
            letter-spacing: 0.1em;
            gap: 6px;
            background: #ffffff;
            border-bottom: none;
            border-left: 3px solid transparent;
            justify-content: flex-start;
            min-height: 48px;
          }
          .nb-tab-btn.nb-tab-active {
            background: rgba(0,53,57,0.06);
            border-left-color: #003539;
            border-bottom: none;
          }
          .nb-tab-label {
            font-size: 10px;
            line-height: 1.3;
          }
        }

        /* ── Tablet tabs: scrollable but bigger ── */
        @media (min-width: 641px) and (max-width: 860px) {
          .nb-tab-btn {
            padding: 14px 14px;
            font-size: 10px;
          }
        }

        /* Panel: image left, list right */
        .nb-panel-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: start;
          animation: nbFadeIn 0.45s ease;
        }
        @keyframes nbFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Ken Burns on category image */
        .nb-cat-img:hover { transform: scale(1.04); }

        /* Place row hover */
        .nb-place-row:hover { background: rgba(0,53,57,0.03); margin: 0 -8px; padding-left: 8px !important; padding-right: 8px !important; }

        /* Mobile */
        @media (max-width: 860px) {
          .nb-header-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .nb-panel-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
