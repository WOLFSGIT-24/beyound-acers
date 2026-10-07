import { Image } from '@/components/ui/image';
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

/* ─── Category tabs ──────────────────────────────────────────────────────── */
const TABS = ['Nature', 'Lifestyle', 'Education', 'Healthcare', 'Shopping', 'Work'] as const;
type TabType = typeof TABS[number];

/* ─── Landmark data grouped by category ──────────────────────────────────── */
const LANDMARKS: Record<TabType, { name: string; dist: string }[]> = {
  Education: [
    { name: 'Maharaja Institute of Technology', dist: '10 mins' },
    { name: 'JSS Science & Technology Univ.',   dist: '12 mins' },
    { name: 'Delhi Public School',              dist: '8 mins'  },
    { name: 'Manipal Educational Institutions', dist: '15 mins' },
    { name: 'Mysuru University Campus',         dist: '18 mins' },
    { name: 'International Schools Corridor',   dist: '10 mins' },
  ],
  Healthcare: [
    { name: 'Manipal Hospital',                 dist: '9 mins'  },
    { name: 'Columbia Asia Hospital',           dist: '12 mins' },
    { name: 'JSS Hospital',                     dist: '14 mins' },
    { name: 'Narayana Multispeciality',         dist: '12 mins' },
    { name: 'Diagnostic & Imaging Centres',     dist: '6 mins'  },
    { name: 'Emergency Care Facilities',        dist: '8 mins'  },
  ],
  Lifestyle: [
    { name: 'Payana Car Museum',                dist: '3 mins'  },
    { name: 'Mysuru Palace & Gardens',          dist: '20 mins' },
    { name: 'Brindavan Gardens · KRS Dam',      dist: '25 mins' },
    { name: 'Chamundi Hills',                   dist: '22 mins' },
    { name: 'Karanji Lake Nature Park',         dist: '18 mins' },
    { name: 'River Kaveri Riverfront',          dist: '2 mins'  },
  ],
  Shopping: [
    { name: 'Forum Mysuru Mall',                dist: '18 mins' },
    { name: 'Mysore Mall',                      dist: '15 mins' },
    { name: 'Supermarkets & Hypermarkets',      dist: '5 mins'  },
    { name: 'Multiplex Cinemas',                dist: '12 mins' },
    { name: 'Infosys Road Retail Strip',        dist: '8 mins'  },
    { name: 'Family Entertainment Zones',       dist: '10 mins' },
  ],
  Work: [
    { name: 'Infosys Mysuru Campus',            dist: '10 mins' },
    { name: 'Mysuru IT Park',                   dist: '15 mins' },
    { name: 'KIADB Industrial Zone',            dist: '14 mins' },
    { name: 'Hebbal Industrial Area',           dist: '12 mins' },
    { name: 'Bengaluru CBD',                    dist: '90 mins' },
  ],
  Nature: [
    { name: 'River Kaveri Riverfront',          dist: 'On-site' },
    { name: 'Bandipur National Park',           dist: '1.5 hrs' },
    { name: 'Kabini Jungle Lodges',             dist: '1.5 hrs' },
    { name: 'Coorg Nature Resorts',             dist: '2 hrs'   },
    { name: 'Nagarhole Wildlife Reserve',       dist: '1.5 hrs' },
  ],
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function LocationSection() {
  const [activeTab, setActiveTab] = useState<TabType>('Nature');
  const places = LANDMARKS[activeTab];

  return (
    <section id="location" className="loc-section" style={{ background: '#ffffff', overflow: 'hidden' }}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="loc-container-header">
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(18px, 2.5vh, 24px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Connected, Not Crowded
            </span>
          </div>
        </Reveal>

        <div className="loc-header-grid">
          <Reveal delay={60}>
            <h2 style={{
              fontFamily: "'DM Sans', Roboto, sans-serif",
              fontWeight: 700, fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              lineHeight: 1.05, letterSpacing: '-0.025em', color: '#003539',
            }}>
              90 Minutes from Bengaluru.<br />
              <span style={{ color: '#C9A84C' }}>A World Away From It.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              lineHeight: 1.9, color: 'rgba(33,37,41,0.6)', maxWidth: '420px',
            }}>
              Beside the Kaveri in Srirangapatna, just off the <strong style={{ fontWeight: 600, color: 'rgba(33,37,41,0.8)' }}>Bengaluru–Mysuru Expressway</strong>.
              Forests, wildlife and heritage on one side; hospitals, schools and workplaces on the other. A slower life that is never a disconnected one.
            </p>
          </Reveal>
        </div>
      </div>
      {/* ── Main: map left + tabs/cards right ─────────────────────────── */}
      <div className="loc-container-main">
        <div className="loc-main-grid">

          {/* ── LEFT — map + CTA ── */}
          <div className="loc-map-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
              <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,53,57,0.12)', width: '100%', maxWidth: '100%' }}>
                <Image src="https://static.wixstatic.com/media/cef78c_3b28d2d25235496c9b1eb38524ed88da~mv2.png" alt="Location map — Riverine by Beyond Acres" style={{ width: '100%', maxWidth: '100%', height: 'auto', display: 'block' }} />
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  background: '#003539', padding: '7px 12px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
                    Project Site
                  </span>
                </div>
              </div>

              {/* Google Maps CTA */}
              <a
                href="https://maps.app.goo.gl/kHkT4STSxwzspMud9?g_st=iw"
                target="_blank"
                rel="noopener noreferrer"
                className="loc-maps-btn"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>

          {/* ── RIGHT — tabs + filtered cards ── */}
          <div>

            {/* Category tabs */}
            <div className="loc-tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`loc-tab ${activeTab === tab ? 'loc-tab-active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filtered landmark cards */}
            <div className="loc-cards" key={activeTab}>
              {places.map((place, i) => (
                <div key={i} className="loc-card">
                  <span className="loc-card-name">
                    {place.name}
                  </span>
                  <span className="loc-badge">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(0,53,57,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {place.dist}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              marginTop: 'clamp(16px, 2.5vh, 20px)',
            }}>
              <span style={{ display: 'block', width: '16px', height: '1px', background: 'rgba(0,53,57,0.2)', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(0,53,57,0.3)',
              }}>
                Approximate travel times via road
              </span>
            </div>

          </div>

        </div>
      </div>
      <style>{`
        /* Containers */
        .loc-section {
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
        }
        .loc-container-header {
          max-width: 100%;
          margin: 0 auto;
          padding: clamp(48px, 7vh, 80px) clamp(24px, 8vw, 120px) clamp(24px, 3.5vh, 36px);
          box-sizing: border-box;
        }
        .loc-container-main {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 clamp(24px, 8vw, 120px) clamp(48px, 7vh, 80px);
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .loc-map-container {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          position: sticky;
          top: 88px;
        }
        .loc-map-container img {
          max-width: 100% !important;
          width: 100% !important;
          height: auto !important;
          display: block !important;
        }

        /* Header */
        .loc-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 5vw, 64px);
          align-items: end;
        }

        /* Main layout */
        .loc-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: clamp(28px, 4vw, 52px);
          align-items: start;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        /* Google Maps button */
        .loc-maps-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          background: #003539;
          color: #ffffff;
          font-family: Roboto, sans-serif;
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s ease;
          width: 100%;
          max-width: 100%;
          text-align: center;
          box-sizing: border-box;
        }
        .loc-maps-btn:hover {
          background: #004a50;
        }

        /* ── Tabs ── */
        .loc-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(0,53,57,0.1);
          margin-bottom: clamp(16px, 2.5vh, 24px);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .loc-tabs::-webkit-scrollbar { display: none; }

        .loc-tab {
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(33,37,41,0.5);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .loc-tab:hover {
          color: rgba(0,53,57,0.75);
        }
        .loc-tab-active {
          font-weight: 600;
          color: #003539;
          border-bottom-color: #003539;
        }

        /* ── Cards ── */
        .loc-cards {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid rgba(0,53,57,0.08);
          animation: locFadeIn 0.35s ease;
          width: 100%;
          overflow: hidden;
        }
        @keyframes locFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .loc-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(20px, 4vw, 48px);
          padding: 14px 0;
          border-bottom: 1px solid rgba(0,53,57,0.07);
          transition: background 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .loc-card:hover {
          background: rgba(0,53,57,0.03);
          padding-left: 12px;
          padding-right: 12px;
        }

        .loc-card-name {
          font-family: Roboto, sans-serif;
          font-weight: 500;
          font-size: clamp(0.82rem, 0.95vw, 0.9rem);
          color: #003539;
          line-height: 1.3;
          min-width: 0;
          flex: 1;
        }

        .loc-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: #003539;
          background: rgba(0,53,57,0.06);
          padding: 5px 10px;
          white-space: nowrap;
          flex-shrink: 0;
          font-variant-numeric: lining-nums tabular-nums;
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .loc-header-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .loc-main-grid   { grid-template-columns: 1fr !important; }
          .loc-map-container {
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .loc-tabs { justify-content: flex-start; }
          .loc-cards {
            width: 100%;
            min-width: 0;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .loc-section {
            overflow-x: hidden !important;
          }
          .loc-container-header {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .loc-container-main {
            padding-left: 16px !important;
            padding-right: 16px !important;
            overflow: hidden !important;
          }
          .loc-main-grid {
            min-width: 0;
            width: 100% !important;
          }
          .loc-main-grid > div {
            min-width: 0;
            width: 100%;
            overflow: hidden;
          }
          .loc-card {
            gap: 8px;
            padding: 12px 0;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }
          .loc-card:hover {
            padding-left: 0;
            padding-right: 0;
            background: none;
          }
          .loc-card-name {
            font-size: 0.82rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-width: 0;
            flex: 1 1 0;
          }
          .loc-badge {
            font-size: 10px;
            padding: 4px 8px;
            gap: 4px;
            flex-shrink: 0;
          }
          .loc-tab {
            padding: 10px 12px;
            font-size: 10px;
            letter-spacing: 0.08em;
          }
        }

        @media (max-width: 480px) {
          .loc-container-header {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .loc-container-main {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          .loc-tab {
            padding: 8px 8px;
            font-size: 9px;
            letter-spacing: 0.06em;
          }
          .loc-badge {
            font-size: 9px;
            padding: 3px 6px;
          }
          .loc-card-name {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </section>
  );
}
