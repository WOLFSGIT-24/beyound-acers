import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      transition: 'opacity 0.9s ease, transform 0.9s ease',
    }}>{children}</div>
  );
}

/* ─── Feature data ───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    num: '01',
    title: 'Biodiversity-Led Living',
    desc: '2,000+ native trees and 10,000+ shrubs woven through the neighbourhood, not as decoration but as a living system that cools the air, cleans it, and brings birds and butterflies back to your street.',
    img: 'https://static.wixstatic.com/media/cef78c_60980dec95ed4dd2804a3e67900e1f89~mv2.png',
  },
  {
    num: '02',
    title: 'Zero Clutter. Open Skies.',
    desc: '100% underground utilities mean no overhead wires, no visible pipes, no visual noise. Wide 12m & 9m tree-lined roads and a 1.5 km+ boundary wall. Streets that feel calm the moment you arrive.',
    img: 'https://static.wixstatic.com/media/cef78c_ea42cef20a5b406e8cbf061952ea58ac~mv2.png',
  },
  {
    num: '03',
    title: 'Flood-Proof. Water-Smart.',
    desc: '50+ recharge pits engineered to handle 100 mm/hr rainfall. SBR-based STP technology, grey water reuse systems, and 100-year floodline planning. Not just green credentials. Hard infrastructure that keeps everyday life running through every monsoon.',
    img: 'https://static.wixstatic.com/media/cef78c_d830b0deb763462b90ac23cbdc631f05~mv2.png',
  },
  {
    num: '04',
    title: '35% Open Green. Always.',
    desc: '21 acres with 35% open spaces, including a 3.15-acre park ecosystem that cannot be built over. Biodiversity parks, wellness groves, riverfront terraces and shaded walkways. Room to breathe, for good.',
    img: 'https://static.wixstatic.com/media/cef78c_a36b0ff2c2f341b98b69e790eae1988e~mv2.png',
  },
  {
    num: '05',
    title: 'Aligned with Global Standards',
    desc: "Karnataka's 1st eco-engineered plotted development. 330+ plots, solar-assisted lighting, and planning certified against 14 of 17 UN SDGs. Built to a benchmark that makes everyday life better, and keeps it that way.",
    img: 'https://static.wixstatic.com/media/cef78c_2a0063ac73d84a8eaf43d50462944e9b~mv2.png',
  },
  {
    num: '06',
    title: 'Nature as Infrastructure',
    desc: 'Riverfront terraces, biodiversity parks, herbal gardens and pollination meadows are not add-ons. They are infrastructure. They shape daily life at Riverine, ease everyday stress, and make this a place that is genuinely hard to find anywhere else.',
    img: 'https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png',
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function SustainabilityIntroSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  /* ── Mobile circular carousel state ── */
  const [mobileIndex, setMobileIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(360);
  const mobileImgRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = FEATURES.length;

  const mobileCard = useMemo(() => FEATURES[mobileIndex], [mobileIndex]);

  useEffect(() => {
    function handleResize() {
      if (mobileImgRef.current) setContainerWidth(mobileImgRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay 4s (increased from 3s)
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setMobileIndex((p) => (p + 1) % total);
    }, 4000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [total]);

  const mobileNext = useCallback(() => {
    setMobileIndex((p) => (p + 1) % total);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [total]);

  const mobilePrev = useCallback(() => {
    setMobileIndex((p) => (p - 1 + total) % total);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [total]);

  function getMobileImageStyle(index: number): React.CSSProperties {
    const gap = Math.min(containerWidth * 0.12, 50);
    const stickUp = gap * 0.7;
    const isActive = index === mobileIndex;
    const isLeft = (mobileIndex - 1 + total) % total === index;
    const isRight = (mobileIndex + 1) % total === index;

    if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: 'auto', transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    if (isLeft) return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(15deg)`, transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    if (isRight) return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.85) rotateY(-15deg)`, transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
    return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
  }

  const quoteVariants = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };

  return (
    <section id="sustainability" style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ══════════════════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: 'clamp(64px, 9vh, 100px) clamp(24px, 8vw, 120px) clamp(48px, 6vh, 64px)',
      }}>
        {/* Eyebrow */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(28px, 4vh, 40px)' }}>
            <span style={{ display: 'block', width: '36px', height: '1.5px', background: '#003539', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '11px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: '#003539',
            }}>
              The Riverine Ecosystem
            </span>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={80}>
          <h2 style={{
            fontFamily: "'DM Sans', Roboto, sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#003539',
            margin: 0,
            marginBottom: 'clamp(20px, 3vh, 28px)',
            maxWidth: '750px',
          }}>
            Beauty Above. Thinking Below.<br />
            {/* <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Get In Before It's Too Late.</span> */}
          </h2>
        </Reveal>

        {/* Divider */}
        <Reveal delay={120}>
          <div style={{ width: '48px', height: '2px', background: '#003539', marginBottom: 'clamp(20px, 3vh, 28px)' }} />
        </Reveal>

        {/* Paragraph */}
        <Reveal delay={160}>
          <p style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.1vw, 1.08rem)',
            lineHeight: 1.85,
            color: 'rgba(33, 37, 41, 0.68)',
            margin: 0,
            maxWidth: '800px',
          }}>
            At Riverine, nature wasn’t added at the end. It was designed in from the start. Underground utilities that keep the sky clear, water systems that work with the monsoon, 2,000+ native trees that cool the air, and planning aligned with UN SDG standards. Proof, not promise.
          </p>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          POINTS (40%) LEFT  +  IMAGE (60%) RIGHT
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: '0 clamp(24px, 8vw, 120px) clamp(64px, 9vh, 100px)',
      }}>
        <Reveal delay={100} y={30}>
          <div className="sust-main-grid">

            {/* LEFT — Points list (40%) */}
            <div className="sust-points" style={{
              display: 'flex', flexDirection: 'column',
              background: '#ffffff',
              borderRadius: '4px 0 0 4px',
              overflow: 'hidden',
            }}>
              {FEATURES.map((f, i) => {
                const isActive = activeFeature === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    style={{
                      width: '100%', textAlign: 'left',
                      display: 'flex', alignItems: 'center',
                      gap: 'clamp(12px, 1.5vw, 18px)',
                      padding: 'clamp(16px, 2.2vh, 22px) clamp(18px, 2.2vw, 28px)',
                      background: isActive ? '#003539' : 'transparent',
                      borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(0,53,57,0.06)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.35s ease',
                      position: 'relative',
                    }}
                  >
                    {/* Active indicator bar */}
                    {isActive && (
                      <span style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: '3px', background: '#4CAF50',
                      }} />
                    )}

                    {/* Number */}
                    <span style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 500,
                      fontSize: '11px', letterSpacing: '0.06em',
                      color: isActive ? 'rgba(255,255,255,0.4)' : 'rgba(0,53,57,0.3)',
                      flexShrink: 0,
                      transition: 'color 0.35s ease',
                    }}>
                      {f.num}
                    </span>

                    {/* Title + description */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontFamily: "'DM Sans', Roboto, sans-serif",
                        fontWeight: 600,
                        fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)',
                        lineHeight: 1.3, letterSpacing: '-0.005em',
                        color: isActive ? '#ffffff' : '#003539',
                        margin: 0, transition: 'color 0.35s ease',
                      }}>
                        {f.title}
                      </h3>

                      {/* Expandable description */}
                      <div style={{
                        overflow: 'hidden',
                        maxHeight: isActive ? '200px' : '0px',
                        opacity: isActive ? 1 : 0,
                        transition: 'max-height 0.55s ease, opacity 0.4s ease',
                      }}>
                        <p style={{
                          fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                          fontSize: 'clamp(0.75rem, 0.85vw, 0.82rem)',
                          lineHeight: 1.7,
                          color: 'rgba(255,255,255,0.6)',
                          marginTop: '8px', marginBottom: 0,
                        }}>
                          {f.desc}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span style={{
                      color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(0,53,57,0.2)',
                      fontSize: '14px', flexShrink: 0,
                      transform: isActive ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.35s ease, color 0.35s ease',
                    }}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT — Image (60%) */}
            <div className="sust-image-panel" style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '0 4px 4px 0',
              background: '#e8e4dc',
            }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{
                  position: 'absolute', inset: 0,
                  opacity: activeFeature === i ? 1 : 0,
                  transform: activeFeature === i ? 'scale(1)' : 'scale(1.03)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                  zIndex: activeFeature === i ? 1 : 0,
                }}>
                  <Image
                    src={f.img}
                    alt={f.title}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center center',
                      display: 'block',
                    }}
                  />
                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '40%',
                    background: 'linear-gradient(to top, rgba(0,53,57,0.7) 0%, transparent 100%)',
                  }} />
                  {/* Label overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: 'clamp(24px, 3vw, 36px)',
                  }}>
                    <span style={{
                      fontFamily: 'Roboto, sans-serif', fontWeight: 400,
                      fontSize: '9px', letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                      display: 'block', marginBottom: '6px',
                    }}>
                      {f.num} / 06
                    </span>
                    <h4 style={{
                      fontFamily: "'DM Sans', Roboto, sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
                      lineHeight: 1.1, letterSpacing: '-0.015em',
                      color: '#ffffff', margin: 0,
                    }}>
                      {f.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE-ONLY: Circular slider (same as Growth Infra)
      ══════════════════════════════════════════════════════════════ */}
      <div className="sust-mobile-slider">
        <div style={{ padding: '0 24px' }}>
          {/* Image stack */}
          <div className="sust-mob-images" ref={mobileImgRef}>
            {FEATURES.map((f, i) => (
              <Image
                key={i}
                src={f.img}
                alt={f.title}
                className="sust-mob-img"
                style={getMobileImageStyle(i)}
              />
            ))}
          </div>

          {/* Content */}
          <div style={{ marginTop: '20px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <span style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                  fontSize: '9px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#C9A84C',
                  marginBottom: '8px', display: 'block',
                }}>
                  {mobileCard.num} / {String(total).padStart(2, '0')}
                </span>
                <h3 style={{
                  fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 700,
                  fontSize: 'clamp(1.1rem, 5vw, 1.4rem)',
                  lineHeight: 1.2, letterSpacing: '-0.01em',
                  color: '#003539', margin: '0 0 10px',
                }}>
                  {mobileCard.title}
                </h3>
                <motion.p style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                  fontSize: '0.78rem', lineHeight: 1.75,
                  color: 'rgba(0,53,57,0.6)', margin: 0,
                }}>
                  {mobileCard.desc.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: 'blur(6px)', opacity: 0, y: 3 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, ease: 'easeInOut', delay: 0.02 * i }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={mobilePrev}
                aria-label="Previous"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#003539', border: 'none', cursor: 'pointer',
                }}
              >
                <ArrowLeft size={16} color="#fff" />
              </button>
              <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(0,53,57,0.35)', minWidth: '40px', textAlign: 'center' }}>
                {String(mobileIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                onClick={mobileNext}
                aria-label="Next"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#003539', border: 'none', cursor: 'pointer',
                }}
              >
                <ArrowRight size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <div style={{
        padding: '0 clamp(24px, 8vw, 120px) clamp(48px, 6vh, 64px)',
      }}>
        <Reveal delay={200}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: 'rgba(0,53,57,0.25)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 400,
              fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(0,53,57,0.4)',
            }}>
              Eco-Engineered · Flood-Proof · Nature-First · UN SDG Aligned
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .sust-main-grid {
          display: grid;
          grid-template-columns: 40% 60%;
          min-height: 520px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,53,57,0.06);
        }
        .sust-image-panel {
          aspect-ratio: 16 / 10;
        }

        /* Mobile slider hidden by default */
        .sust-mobile-slider {
          display: none;
        }

        @media (max-width: 900px) {
          .sust-main-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .sust-points {
            border-radius: 4px 4px 0 0 !important;
          }
          .sust-image-panel {
            border-radius: 0 0 4px 4px !important;
            min-height: 300px;
            aspect-ratio: 16 / 9;
          }
        }

        /* Phone: hide desktop, show mobile slider */
        @media (max-width: 640px) {
          .sust-main-grid {
            display: none !important;
          }
          .sust-mobile-slider {
            display: block !important;
            padding-bottom: 32px;
          }
          .sust-mob-images {
            position: relative;
            width: 100%;
            height: clamp(180px, 50vw, 240px);
            perspective: 800px;
          }
          .sust-mob-img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
            border-radius: 6px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.25);
          }
        }
      `}</style>
    </section>
  );
}
