import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Download } from 'lucide-react';
import EnquiryPopup from '@/components/EnquiryPopup';
import { Image } from '@/components/ui/image';
import { PRICING } from '@/content/riverine';

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
      { threshold: 0.08 }
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

/* ─── Configuration Data ─────────────────────────────────────────────────── */
const CONFIGURATIONS = [
  {
    plotConfig: 'Standard Plot',
    plotSize: '1,163 Sq.Ft.',
    startingPrice: 'Sold Out',
    brochure: 'Download Brochure',
    soldOut: true,
  },
  {
    plotConfig: 'Premium Plot',
    plotSize: '1,454 Sq.Ft.',
    startingPrice: `${PRICING.startingPrice}* Onwards`,
    brochure: 'Download Brochure',
  },
  {
    plotConfig: 'Mansion Plot',
    plotSize: '2,000+ Sq.Ft.',
    startingPrice: 'On Request',
    brochure: 'Download Brochure',
    soldOut: false,
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ConfigurationSection() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <EnquiryPopup isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
      <section id="configuration" style={{ background: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{
          padding: 'clamp(48px, 7vh, 80px) clamp(24px, 8vw, 120px)',
        }}>

          {/* ── Heading row ── */}
          <Reveal delay={0}>
            <div className="cfg-heading-row">
              {/* Left: icon + title */}
              <div className="cfg-title-group">
                {/* Fire icon from brand assets — recolored to project gold via CSS filter */}
                <Image src="https://static.wixstatic.com/shapes/cef78c_42bf429bfc7e4451b210a2b5ca04db6c.svg" aria-hidden="true" width="22" height="22" style={{
                    flexShrink: 0,
                    marginTop: 1,
                    /* Converts any SVG color to #C9A84C gold:
                       brightness(0) → black, then sepia+saturate+hue-rotate → gold */
                    filter: 'brightness(0) saturate(100%) invert(71%) sepia(47%) saturate(600%) hue-rotate(3deg) brightness(95%) contrast(90%)',
                  }} />
                <h2 className="cfg-heading">
                  <span style={{ color: '#1a1a1a' }}>FIND YOUR PLACE IN RIVERINE. </span>
                  <span style={{ color: '#C9A84C' }}>180+ FAMILIES ALREADY HAVE.</span>
                </h2>
              </div>
              {/* Right: subheading */}
              {/* <p className="cfg-subheading">
                Limited inventory. High demand. Secure your plot today.
              </p> */}
            </div>
          </Reveal>

          {/* ── Divider ── */}
          <Reveal delay={60}>
            <div style={{ height: '1px', background: 'rgba(0,53,57,0.1)', marginBottom: 'clamp(28px, 4vh, 40px)' }} />
          </Reveal>

          {/* ── Table Container (Desktop) ── */}
          <Reveal delay={140}>
            <div className="config-table-desktop" style={{
              overflowX: 'auto',
              borderRadius: '8px',
              border: '1px solid rgba(0,53,57,0.1)',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              }}>
                {/* ── Table Header ── */}
                <thead>
                  <tr style={{
                    background: '#f5f5f5',
                    borderBottom: '1px solid rgba(0,53,57,0.15)',
                  }}>
                    <th style={{
                      padding: 'clamp(16px, 2.5vw, 24px)',
                      textAlign: 'left',
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539',
                      letterSpacing: '0.02em',
                    }}>
                      Plot Configuration
                    </th>
                    <th style={{
                      padding: 'clamp(16px, 2.5vw, 24px)',
                      textAlign: 'left',
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539',
                      letterSpacing: '0.02em',
                    }}>
                      Plot Size
                    </th>
                    <th style={{
                      padding: 'clamp(16px, 2.5vw, 24px)',
                      textAlign: 'left',
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539',
                      letterSpacing: '0.02em',
                    }}>
                      Starting Price
                    </th>
                    <th style={{
                      padding: 'clamp(16px, 2.5vw, 24px)',
                      textAlign: 'center',
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539',
                      letterSpacing: '0.02em',
                    }}>
                      Brochure
                    </th>
                    <th style={{
                      padding: 'clamp(16px, 2.5vw, 24px)',
                      textAlign: 'center',
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                      color: '#003539',
                      letterSpacing: '0.02em',
                    }}>
                      Enquire
                    </th>
                  </tr>
                </thead>

                {/* ── Table Body ── */}
                <tbody>
                  {CONFIGURATIONS.map((config, idx) => (
                    <tr
                      key={idx}
                      className={config.soldOut ? 'cfg-row-sold' : undefined}
                      style={{
                        borderBottom: '1px solid rgba(0,53,57,0.1)',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <td style={{
                        padding: 'clamp(16px, 2.5vw, 24px)',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        color: '#003539',
                      }}>
                        {config.plotConfig}
                      </td>
                      <td style={{
                        padding: 'clamp(16px, 2.5vw, 24px)',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 400,
                        color: 'rgba(33,37,41,0.8)',
                      }}>
                        {config.plotSize}
                      </td>
                      <td style={{
                        padding: 'clamp(16px, 2.5vw, 24px)',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 400,
                        color: 'rgba(33,37,41,0.8)',
                      }}>
                        {config.soldOut
                          ? <span className="cfg-sold-badge">Sold Out</span>
                          : <span className={config.startingPrice.startsWith('₹') ? 'cfg-price' : undefined}>{config.startingPrice}</span>}
                      </td>
                      <td style={{
                        padding: 'clamp(16px, 2.5vw, 24px)',
                        textAlign: 'center',
                      }}>
                        {config.soldOut ? <span className="cfg-na">—</span> : <button
                          onClick={() => setEnquiryOpen(true)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            background: '#003539',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1F3D3A';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#003539';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                          }}
                        >
                          <Download size={14} />
                          <span>Download</span>
                        </button>}
                      </td>
                      <td style={{
                        padding: 'clamp(16px, 2.5vw, 24px)',
                        textAlign: 'center',
                      }}>
                        {config.soldOut ? <span className="cfg-na">—</span> : <button
                          onClick={() => setEnquiryOpen(true)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 14px',
                            background: '#1F3D3A',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '4px',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#003539';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1F3D3A';
                            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                          }}
                        >
                          <MessageCircle size={14} />
                          <span>Enquire</span>
                        </button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Card Layout ── */}
            <div className="config-cards-mobile">
              {CONFIGURATIONS.map((config, idx) => (
                <div key={idx} className={`config-card${config.soldOut ? ' cfg-row-sold' : ''}`}>
                  <div className="config-card-row">
                    <span className="config-card-label">Configuration</span>
                    <span className="config-card-value">{config.plotConfig}</span>
                  </div>
                  <div className="config-card-row">
                    <span className="config-card-label">Plot Size</span>
                    <span className="config-card-value">{config.plotSize}</span>
                  </div>
                  <div className="config-card-row">
                    <span className="config-card-label">Starting Price</span>
                    <span className="config-card-value">
                      {config.soldOut ? <span className="cfg-sold-badge">Sold Out</span> : config.startingPrice}
                    </span>
                  </div>
                  {!config.soldOut && <div className="config-card-actions">
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: '#003539',
                        color: '#FFFFFF',
                        border: 'none',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <Download size={14} />
                      <span>Brochure</span>
                    </button>
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: '#1F3D3A',
                        color: '#FFFFFF',
                        border: 'none',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      <MessageCircle size={14} />
                      <span>Enquire</span>
                    </button>
                  </div>}
                </div>
              ))}
            </div>
            <p className="cfg-footnote">
              *Starting price for {PRICING.availableSizes} plots. Contact us for plot-wise pricing.
            </p>
          </Reveal>
        </div>

        <style>{`
          /* Sold-out row + price */
          .cfg-row-sold td:first-child, .cfg-row-sold td:nth-child(2),
          .cfg-row-sold .config-card-label, .cfg-row-sold .config-card-value { opacity: 0.55; }
          .cfg-row-sold .config-card-value:has(.cfg-sold-badge) { opacity: 1; }
          .cfg-row-sold td:nth-child(2) { text-decoration: line-through; text-decoration-color: rgba(0,53,57,0.35); }
          .cfg-sold-badge {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 5px 11px; border-radius: 2px;
            background: rgba(185,74,52,0.08); border: 1px solid rgba(185,74,52,0.35);
            color: #a2412d; font-family: Roboto, sans-serif; font-weight: 600;
            font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
          }
          .cfg-sold-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #c0553c; }
          .cfg-price { font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700; color: #003539; }
          .cfg-na { color: rgba(0,53,57,0.25); }
          .cfg-footnote {
            font-family: Roboto, sans-serif; font-weight: 300; font-size: 11px;
            letter-spacing: 0.04em; color: rgba(0,53,57,0.5); margin: 12px 0 0;
          }

          /* Desktop table */
          .config-table-desktop {
            display: block;
          }
          .config-cards-mobile {
            display: none;
          }

          @media (max-width: 768px) {
            .config-table-desktop {
              display: none !important;
            }
            .config-cards-mobile {
              display: flex !important;
              flex-direction: column;
              gap: 16px;
            }
            .config-card {
              border: 1px solid rgba(0,53,57,0.1);
              border-radius: 8px;
              padding: 20px;
              background: #f5f5f5;
            }
            .config-card-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 0;
              border-bottom: 1px solid rgba(0,53,57,0.06);
            }
            .config-card-row:last-child {
              border-bottom: none;
            }
            .config-card-label {
              font-family: Roboto, sans-serif;
              font-weight: 400;
              font-size: 0.8rem;
              color: rgba(33,37,41,0.6);
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }
            .config-card-value {
              font-family: 'DM Sans', Roboto, sans-serif;
              font-weight: 600;
              font-size: 0.9rem;
              color: #003539;
            }
            .config-card-actions {
              display: flex;
              gap: 10px;
              margin-top: 14px;
            }
            .config-card-actions button {
              flex: 1;
              padding: 12px 14px !important;
              font-size: 0.78rem !important;
              border-radius: 4px;
              min-height: 44px;
            }
          }

          /* ── New heading row ── */
          .cfg-heading-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: clamp(16px, 3vw, 40px);
            flex-wrap: wrap;
            margin-bottom: clamp(16px, 2.5vh, 22px);
          }
          .cfg-title-group {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }
          .cfg-heading {
            font-family: 'DM Sans', Roboto, sans-serif;
            font-weight: 800;
            font-size: clamp(1rem, 1.6vw, 1.3rem);
            line-height: 1.15;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin: 0;
          }
          .cfg-subheading {
            font-family: Roboto, sans-serif;
            font-weight: 400;
            font-size: clamp(0.8rem, 0.95vw, 0.9rem);
            line-height: 1.5;
            color: rgba(33,37,41,0.55);
            margin: 0;
            max-width: 280px;
            text-align: right;
          }

          @media (max-width: 640px) {
            .cfg-heading-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            .cfg-subheading {
              text-align: left;
              max-width: 100%;
              font-size: 0.82rem;
            }
            .cfg-heading {
              font-size: clamp(0.9rem, 4vw, 1.05rem);
            }
          }
        `}</style>
      </section>
    </>
  );
}
