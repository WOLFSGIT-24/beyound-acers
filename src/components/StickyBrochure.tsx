import React, { useState, useEffect } from 'react';

interface StickyBrochureProps {
  onOpen: () => void;
}

export default function StickyBrochure({ onOpen }: StickyBrochureProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Appears once user scrolls past ~30vh */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > window.innerHeight * 0.3);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* ── BOTTOM-RIGHT corner — Enquire Now ── */
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Enquire Now"
      style={{
        position: 'fixed',
        right: 'clamp(16px, 3vw, 32px)',
        bottom: 'clamp(20px, 4vh, 36px)',
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        zIndex: 40,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease, background 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: hovered ? '#004d52' : '#003539',
        border: 'none',
        borderRadius: '100px',
        padding: 'clamp(10px,1.4vw,13px) clamp(16px,2vw,22px)',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,53,57,0.45), 0 2px 8px rgba(0,0,0,0.2)'
          : '0 4px 20px rgba(0,53,57,0.35), 0 1px 4px rgba(0,0,0,0.15)',
      }}
    >
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(10px, 1.1vw, 11.5px)',
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: '#ffffff',
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}>
        Enquire Now
      </span>
    </button>
  );
}
