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
      transition: 'opacity 1s ease, transform 1s ease',
    }}>{children}</div>
  );
}

/* ─── Card data ──────────────────────────────────────────────────────────── */
const CARDS = [
  {
    title: 'Land Is The Safest Wealth Store Right Now',
    image: 'https://static.wixstatic.com/media/cef78c_91f9f6d92dda4364934d98b54eab2bcc~mv2.png',
    desc: 'When stocks fluctuate, currencies devalue, and gold hits all-time highs, land holds. CODENAME UNSTOPPABLE 2.0 is an early-entry into a premium riverfront community before the corridor prices surge. Physical. Tangible. Appreciating.',
    tag: 'Safe Asset',
  },
  {
    title: 'The Bengaluru Overflow Is Coming to Mysuru',
    image: 'https://static.wixstatic.com/media/cef78c_044c57a6f28f46b2b1012ab34e27975d~mv2.png',
    desc: "Bengaluru is bursting at the seams. Investors, retirees, and second-home buyers are moving 90 minutes down the expressway. With ring road expansion, airport connectivity, and Infosys-driven demand, Mysuru is not a secondary market anymore. It's the next primary one.",
    tag: 'Growth Corridor',
  },
  {
    title: 'This Is Not Just Land. It Is a Living Ecosystem.',
    image: 'https://static.wixstatic.com/media/cef78c_a44ef116beae4bcdbc630261f525477c~mv2.png',
    desc: "Karnataka's first biodiversity-led plotted development. 2,000+ native trees, 40+ curated amenities, underground utilities, and 35% open green spaces. CODENAME UNSTOPPABLE 2.0 is built to the standard of a gated township, priced like early land. That gap will not stay open.",
    tag: 'Differentiated Product',
  },
  {
    title: 'Bengaluru Land Costs 50–70% More. Same Corridor.',
    image: 'https://static.wixstatic.com/media/cef78c_e6552a7b87f94bd9868ff4321cbc75ef~mv2.png',
    desc: "Comparable land on Bengaluru's outskirts: ₹8,000–₹20,000/sqft. Here: ₹3,099/sqft. On the same expressway. Same appreciation drivers. This is the arbitrage window, and it closes as infrastructure investment deepens and demand catches up.",
    tag: 'Price Arbitrage',
  },
];

/* ─── Gap calculator for 3D positioning ───────────────────────────────────── */
function calculateGap(width: number) {
  const minWidth = 640;
  const maxWidth = 1280;
  const minGap = 40;
  const maxGap = 80;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GrowthInfraSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const total = CARDS.length;

  const activeCard = useMemo(() => CARDS[activeIndex], [activeIndex]);

  // Responsive width
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 3D image positioning
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.7;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + total) % total === index;
    const isRight = (activeIndex + 1) % total === index;

    if (isActive) {
      return {
        zIndex: 3, opacity: 1, pointerEvents: 'auto',
        transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)',
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isRight) {
      return {
        zIndex: 2, opacity: 1, pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    return {
      zIndex: 1, opacity: 0, pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section id="reasons-to-invest" style={{ background: '#0a1f1e', overflow: 'hidden' }}>
      {/* GrowthInfraSection — updated heading v2 */}

      {/* ── Header ── */}
      <div style={{
        padding: 'clamp(56px, 8vh, 88px) clamp(24px, 8vw, 120px) clamp(28px, 4vh, 44px)',
      }}>
        {/* Eyebrow */}
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(18px, 2.8vh, 28px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.5)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '0.34em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Investment Edge
            </span>
          </div>
        </Reveal>

        {/* Main heading */}
        <Reveal delay={60}>
          <h2 style={{ fontFamily: "'DM Sans', Roboto, sans-serif", fontWeight: 800, fontSize: 'clamp(2.6rem, 5.2vw, 4.4rem)', lineHeight: 1.03, letterSpacing: '-0.02em', margin: '0 0 clamp(20px, 3vh, 30px)', maxWidth: '620px' }}>
            <span style={{ display: 'block', color: '#ffffff' }}>The Best Time</span>
            <span style={{ display: 'block', color: '#ffffff' }}>to Invest in</span>
            <span style={{ display: 'block', color: '#C9A84C' }}>Mysuru Is Now.</span>
          </h2>
        </Reveal>

        {/* Supporting line */}
        <Reveal delay={130}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', maxWidth: '480px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '3px' }}>
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300, fontSize: 'clamp(0.82rem, 1vw, 0.95rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              Secure premium land in Karnataka's fastest-growing corridor{' '}
              <span style={{ color: '#C9A84C', fontWeight: 600 }}>before the market catches up.</span>
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Carousel ── */}
      <div className="ri-carousel-wrap">
        <div className="ri-carousel-grid">

          {/* ── Images: 3D circular stack ── */}
          <div className="ri-images" ref={imageContainerRef}>
            {CARDS.map((card, index) => (
              <Image
                key={index}
                src={card.image}
                alt={card.title}
                className="ri-image"
                style={getImageStyle(index)}
              />
            ))}
          </div>

          {/* ── Content ── */}
          <div className="ri-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Tag */}
                <span className="ri-tag">{activeCard.tag}</span>

                {/* Title */}
                <h3 className="ri-title">{activeCard.title}</h3>

                {/* Description with word-by-word reveal */}
                <motion.p className="ri-desc">
                  {activeCard.desc.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ filter: 'blur(8px)', opacity: 0, y: 4 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, ease: 'easeInOut', delay: 0.02 * i }}
                      style={{ display: 'inline-block' }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* ── Arrow navigation ── */}
            <div className="ri-arrows">
              <button
                className="ri-arrow-btn"
                onClick={handlePrev}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                style={{ background: hoverPrev ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)' }}
                aria-label="Previous"
              >
                <ArrowLeft size={18} color="#fff" />
              </button>
              <span className="ri-counter">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <button
                className="ri-arrow-btn"
                onClick={handleNext}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                style={{ background: hoverNext ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)' }}
                aria-label="Next"
              >
                <ArrowRight size={18} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />

      <style>{`
        .ri-carousel-wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 clamp(24px, 8vw, 120px);
        }

        .ri-carousel-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }

        /* ── Image stack ── */
        .ri-images {
          position: relative;
          width: 100%;
          height: clamp(220px, 28vw, 380px);
          perspective: 1000px;
        }
        .ri-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center bottom;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }

        /* ── Content ── */
        .ri-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: clamp(220px, 28vw, 380px);
        }
        .ri-tag {
          display: inline-block;
          font-family: Roboto, sans-serif;
          font-weight: 500;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 14px;
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.1);
          width: fit-content;
        }
        .ri-title {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 700;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 16px;
        }
        .ri-desc {
          font-family: Roboto, sans-serif;
          font-weight: 300;
          font-size: clamp(0.75rem, 1vw, 0.9rem);
          line-height: 1.8;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* ── Arrows ── */
        .ri-arrows {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: clamp(24px, 3vh, 40px);
        }
        .ri-arrow-btn {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease;
          padding: 0;
        }
        .ri-arrow-btn:hover {
          border-color: rgba(255,255,255,0.3);
        }
        .ri-counter {
          font-family: Roboto, sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.3);
          min-width: 40px;
          text-align: center;
        }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .ri-carousel-grid {
            grid-template-columns: 1fr;
            gap: clamp(24px, 4vh, 40px);
          }
          .ri-images {
            height: clamp(200px, 45vw, 300px);
          }
          .ri-content {
            min-height: auto;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .ri-images {
            height: clamp(180px, 50vw, 240px);
          }
          .ri-title {
            font-size: clamp(1rem, 4.5vw, 1.3rem);
          }
          .ri-desc {
            font-size: 0.75rem;
            line-height: 1.7;
          }
          .ri-arrow-btn {
            width: 36px; height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
