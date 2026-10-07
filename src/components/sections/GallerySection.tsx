import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Image } from '@/components/ui/image';

const images = [
  'https://static.wixstatic.com/media/cef78c_a36b0ff2c2f341b98b69e790eae1988e~mv2.png',
  'https://static.wixstatic.com/media/cef78c_ce5a56c1ceb643d29dd01b9035a0adbc~mv2.png',
  'https://static.wixstatic.com/media/cef78c_ea42cef20a5b406e8cbf061952ea58ac~mv2.png',
  'https://static.wixstatic.com/media/cef78c_a04bb208b55d4907b260cee60cb59a6b~mv2.png',
  'https://static.wixstatic.com/media/cef78c_d830b0deb763462b90ac23cbdc631f05~mv2.png',
  'https://static.wixstatic.com/media/cef78c_f0d53aa098bc47399562cbdbaaf99ce9~mv2.png',
  'https://static.wixstatic.com/media/cef78c_2e0d6964e5844092b5e48ae7c5d7d705~mv2.png',
  'https://static.wixstatic.com/media/cef78c_4765d76568a24765acb90eb0d3f5b10d~mv2.png',
  'https://static.wixstatic.com/media/cef78c_2a0063ac73d84a8eaf43d50462944e9b~mv2.png',
  'https://static.wixstatic.com/media/cef78c_678b49a9a2824a54acad7f3a9663fc52~mv2.png',
  'https://static.wixstatic.com/media/cef78c_60980dec95ed4dd2804a3e67900e1f89~mv2.png',
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  /* auto-advance every 4s (increased from 3s) */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  /* keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const getIdx = (offset: number) => (current + offset + total) % total;

  /* Touch swipe support */
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      setPaused(true);
      setTimeout(() => setPaused(false), 5000);
    }
    touchStart.current = null;
  };

  return (
    <section
      id="gallery"
      className="gallery-section bg-secondary overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Section label ─────────────────────────────────────────────── */}
      <div className="gallery-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-primary/40" />
          <span className="font-paragraph font-medium tracking-[0.25em] uppercase text-primary/60"
            style={{ fontSize: '11px' }}>
            Gallery <span style={{ color: '#C9A84C', fontStyle: 'italic', textTransform: 'none', letterSpacing: '0.08em' }}>Imagine Your Life Here.</span>
          </span>
        </div>
        <span className="font-paragraph font-light text-foreground/40 tabular-nums"
          style={{ fontSize: '12px' }}>
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* ── Image carousel area ───────────────────────────────────────── */}
      <div className="gallery-carousel-wrapper">

        {/* Prev peek — desktop only */}
        <div
          className="gallery-peek gallery-peek-prev"
          onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
        >
          <Image src={images[getIdx(-1)]} alt="" className="w-full h-full object-cover scale-105 transition-transform duration-700" />
        </div>

        {/* Active image — main */}
        <div className="gallery-active-image" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-700 ease-in-out"
              style={{
                opacity: current === i ? 1 : 0,
                transform: current === i ? 'scale(1)' : 'scale(1.03)',
                zIndex: current === i ? 1 : 0,
              }}
            >
              <Image src={src} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)' }} />

          {/* Dot indicators — hidden on mobile */}
          <div className="gallery-dots absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
                aria-label={`Go to image ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  height: '5px',
                  borderRadius: '3px',
                  width: current === i ? '24px' : '5px',
                  background: current === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows inside the image */}
          <button
            onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
            className="gallery-arrow gallery-arrow-left absolute left-3 top-1/2 -translate-y-1/2 z-30
              flex items-center justify-center
              bg-white/80 hover:bg-white text-primary shadow-md
              transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ borderRadius: '2px' }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
            className="gallery-arrow gallery-arrow-right absolute right-3 top-1/2 -translate-y-1/2 z-30
              flex items-center justify-center
              bg-white/80 hover:bg-white text-primary shadow-md
              transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ borderRadius: '2px' }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Next peek — desktop only */}
        <div
          className="gallery-peek gallery-peek-next"
          onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
        >
          <Image src={images[getIdx(1)]} alt="" className="w-full h-full object-cover scale-105 transition-transform duration-700" />
        </div>

      </div>

      <style>{`
        /* ── Desktop: full viewport gallery ── */
        .gallery-section {
          position: relative;
          height: 100svh;
          min-height: 500px;
          max-height: 900px;
          display: flex;
          flex-direction: column;
        }

        .gallery-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 40px 16px;
          z-index: 20;
        }

        .gallery-carousel-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 32px 32px;
          min-height: 0;
        }

        .gallery-peek {
          flex-shrink: 0;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.5s ease;
          width: clamp(80px, 10vw, 140px);
          height: 65%;
          border-radius: 2px;
        }
        .gallery-peek:hover {
          opacity: 0.7;
        }

        .gallery-active-image {
          position: relative;
          overflow: hidden;
          flex: 1;
          height: 100%;
          max-width: 820px;
          border-radius: 2px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        .gallery-arrow {
          width: 36px;
          height: 36px;
        }

        /* ── Tablet ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-section {
            height: 70svh;
            min-height: 400px;
            max-height: 640px;
          }
          .gallery-header {
            padding: 24px 28px 14px;
          }
          .gallery-peek {
            width: clamp(64px, 9vw, 110px);
            height: 60%;
            opacity: 0.45;
          }
          .gallery-active-image {
            max-width: 100%;
            border-radius: 2px;
          }
          .gallery-carousel-wrapper {
            padding: 0 20px 20px;
            gap: 10px;
          }
          .gallery-arrow {
            width: 34px;
            height: 34px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .gallery-section {
            height: auto !important;
            min-height: unset !important;
            max-height: unset !important;
            padding-bottom: 24px;
          }

          .gallery-header {
            padding: 20px 16px 12px;
          }

          .gallery-carousel-wrapper {
            padding: 0;
            gap: 0;
            flex: none;
            min-height: 0;
          }

          .gallery-peek {
            display: none;
          }

          .gallery-dots {
            display: none !important;
          }

          .gallery-active-image {
            width: 100%;
            max-width: 100%;
            height: 0;
            padding-bottom: 62%;
            border-radius: 0;
            box-shadow: none;
          }

          .gallery-arrow {
            width: 32px;
            height: 32px;
            border-radius: 50% !important;
            background: rgba(255,255,255,0.9) !important;
          }
          .gallery-arrow-left {
            left: 12px;
          }
          .gallery-arrow-right {
            right: 12px;
          }
        }

        /* ── Small phones ── */
        @media (max-width: 480px) {
          .gallery-active-image {
            padding-bottom: 66%;
          }
          .gallery-header {
            padding: 16px 16px 10px;
          }
        }
      `}</style>
    </section>
  );
}
