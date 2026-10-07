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

/* ─── Category data ──────────────────────────────────────────────────────── */
const C = '#003539';
const S = 34;
const SW = '1.4';
const svgProps = { width: S, height: S, viewBox: '0 0 24 24', fill: 'none', stroke: C, strokeWidth: SW, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

/* Custom SVG icons that accurately represent each amenity */
const ICONS: Record<string, React.ReactNode> = {
  // ─── Clubhouse ───
  'Café Lounge': (
    <svg {...svgProps}>
      <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  ),
  'Yoga Studio': (
    <svg {...svgProps}>
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v5"/>
      <path d="M8 21l4-10 4 10"/>
      <path d="M6 12l6-1 6 1"/>
    </svg>
  ),
  'Fitness Centre': (
    <svg {...svgProps}>
      <path d="M6.5 6.5a2 2 0 0 1 3 0L12 9l2.5-2.5a2 2 0 0 1 3 0"/>
      <path d="M4 14h16"/>
      <rect x="2" y="11" width="3" height="6" rx="1"/>
      <rect x="19" y="11" width="3" height="6" rx="1"/>
      <rect x="5" y="9" width="2" height="6" rx="0.5"/>
      <rect x="17" y="9" width="2" height="6" rx="0.5"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
    </svg>
  ),
  'Community Lounge': (
    <svg {...svgProps}>
      <path d="M2 16v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/>
      <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
      <path d="M2 16h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/>
      <line x1="6" y1="20" x2="6" y2="22"/><line x1="18" y1="20" x2="18" y2="22"/>
    </svg>
  ),
  'Event Lawns': (
    <svg {...svgProps}>
      <path d="M12 3v18"/>
      <path d="M12 7c-3 0-6-2-6-4 4 0 6 2 6 4z"/>
      <path d="M12 7c3 0 6-2 6-4-4 0-6 2-6 4z"/>
      <path d="M12 12c-4 0-7-3-7-5 4 0 7 3 7 5z"/>
      <path d="M12 12c4 0 7-3 7-5-4 0-7 3-7 5z"/>
      <path d="M8 21h8"/>
    </svg>
  ),
  'Indoor Games': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="12" cy="12" r="1"/>
      <line x1="12" y1="3" x2="12" y2="8"/>
      <line x1="12" y1="16" x2="12" y2="21"/>
    </svg>
  ),
  'Multipurpose Hall': (
    <svg {...svgProps}>
      <path d="M3 21h18"/>
      <path d="M5 21V7l7-4 7 4v14"/>
      <rect x="9" y="13" width="6" height="8"/>
      <line x1="9" y1="9" x2="15" y2="9"/>
    </svg>
  ),
  'Swimming Pool': (
    <svg {...svgProps}>
      <path d="M2 12c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0"/>
      <path d="M2 16c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0"/>
      <path d="M2 20c1-1 2-1 3 0s2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0 2-1 3 0"/>
      <circle cx="12" cy="6" r="2"/>
      <path d="M10 8l2 3 2-3"/>
    </svg>
  ),
  'Lounge Bar': (
    <svg {...svgProps}>
      <path d="M8 2l4 8h-8l4-8z"/>
      <line x1="12" y1="10" x2="12" y2="18"/>
      <path d="M8 18h8"/>
      <path d="M14 5h4l-2 4"/>
    </svg>
  ),
  'Party Lawn': (
    <svg {...svgProps}>
      <path d="M5 21L12 3l7 18"/>
      <path d="M12 3l1-1M10 5l-1-2M14 5l2-2"/>
      <line x1="8" y1="14" x2="16" y2="14"/>
      <path d="M4 21h16"/>
    </svg>
  ),
  'Sunset Deck': (
    <svg {...svgProps}>
      <path d="M2 16h20"/>
      <path d="M12 4v3"/>
      <path d="M5.6 8.6l2.1 2.1"/>
      <path d="M18.4 8.6l-2.1 2.1"/>
      <path d="M4 12h2"/><path d="M18 12h2"/>
      <path d="M7 16a5 5 0 0 1 10 0"/>
      <path d="M2 20h20"/>
    </svg>
  ),
  'Barbeque Zone': (
    <svg {...svgProps}>
      <path d="M8 4c0 2 2 3 2 5s-2 3-2 5"/>
      <path d="M12 4c0 2 2 3 2 5s-2 3-2 5"/>
      <path d="M16 4c0 2 2 3 2 5s-2 3-2 5"/>
      <rect x="4" y="14" width="16" height="3" rx="1"/>
      <line x1="8" y1="17" x2="8" y2="21"/><line x1="16" y1="17" x2="16" y2="21"/>
    </svg>
  ),
  // ─── Wellness Grove ───
  'Herb Garden': (
    <svg {...svgProps}>
      <path d="M12 22V10"/>
      <path d="M7 10c0-4 5-8 5-8s5 4 5 8c0 3-2 5-5 5s-5-2-5-5z"/>
      <path d="M9 15l3-3 3 3"/>
    </svg>
  ),
  'Zen Garden': (
    <svg {...svgProps}>
      <circle cx="12" cy="8" r="3"/>
      <path d="M4 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/>
      <path d="M4 17c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/>
      <circle cx="12" cy="8" r="1"/>
    </svg>
  ),
  'Hammock Grove': (
    <svg {...svgProps}>
      <path d="M3 5v14"/>
      <path d="M21 5v14"/>
      <path d="M3 8c4 8 14 8 18 0"/>
      <path d="M3 5l1 1"/>
      <path d="M21 5l-1 1"/>
      <path d="M9 12h6"/>
    </svg>
  ),
  'Aroma Garden': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 5c0-2 2-3 2-3s2 1 2 3-2 4-2 4"/>
      <path d="M12 5c0-2-2-3-2-3s-2 1-2 3 2 4 2 4"/>
      <path d="M12 9V5"/>
      <path d="M8 15l-3 3"/><path d="M16 15l3 3"/>
      <path d="M12 15v4"/>
    </svg>
  ),
  'Meditation Deck': (
    <svg {...svgProps}>
      <circle cx="12" cy="5" r="2"/>
      <path d="M8 22h8"/>
      <path d="M12 7v3"/>
      <path d="M8 14c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M6 18c0-3 3-4 6-4s6 1 6 4"/>
    </svg>
  ),
  'Reflexology Path': (
    <svg {...svgProps}>
      <path d="M9 3c0 1.5-1.5 3-1.5 4.5S9 10 9 11.5"/>
      <path d="M15 3c0 1.5 1.5 3 1.5 4.5S15 10 15 11.5"/>
      <ellipse cx="9" cy="14" rx="2" ry="3"/>
      <ellipse cx="15" cy="17" rx="2" ry="3"/>
      <circle cx="9" cy="19" r="1"/><circle cx="15" cy="22" r="1"/>
    </svg>
  ),
  'Wellness Pavilion': (
    <svg {...svgProps}>
      <path d="M4 21h16"/>
      <path d="M6 21V11"/>
      <path d="M18 21V11"/>
      <path d="M2 11l10-7 10 7"/>
      <path d="M9 21v-5h6v5"/>
    </svg>
  ),
  'Ferns Garden': (
    <svg {...svgProps}>
      <path d="M12 22V12"/>
      <path d="M12 12c-3-1-5-4-6-8 3 1 5 4 6 8z"/>
      <path d="M12 12c3-1 5-4 6-8-3 1-5 4-6 8z"/>
      <path d="M12 17c-2-1-4-3-5-6 2 1 4 3 5 6z"/>
      <path d="M12 17c2-1 4-3 5-6-2 1-4 3-5 6z"/>
    </svg>
  ),

  // ─── Sports Arena ───
  'Tennis Court': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3v18"/>
      <path d="M3.5 8h17"/>
      <path d="M3.5 16h17"/>
      <path d="M5 12c2-3 5-5 7-5s5 2 7 5"/>
      <path d="M5 12c2 3 5 5 7 5s5-2 7-5"/>
    </svg>
  ),
  'Basketball Court': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
      <path d="M5 12c0-4 3.5-7 7-7"/>
      <path d="M19 12c0-4-3.5-7-7-7"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  'Cricket Nets': (
    <svg {...svgProps}>
      <path d="M4 4l4 4"/>
      <path d="M6 2l10 10"/>
      <circle cx="18" cy="14" r="3"/>
      <line x1="14" y1="18" x2="10" y2="22"/>
      <line x1="16" y1="17" x2="20" y2="21"/>
      <path d="M3 8l5 5"/>
    </svg>
  ),
  'Cycling Track': (
    <svg {...svgProps}>
      <circle cx="6" cy="16" r="4"/>
      <circle cx="18" cy="16" r="4"/>
      <path d="M6 16l4-8h4l4 8"/>
      <circle cx="10" cy="8" r="1"/>
    </svg>
  ),
  'Outdoor Gym': (
    <svg {...svgProps}>
      <rect x="1" y="10" width="4" height="4" rx="1"/>
      <rect x="19" y="10" width="4" height="4" rx="1"/>
      <rect x="5" y="8" width="3" height="8" rx="1"/>
      <rect x="16" y="8" width="3" height="8" rx="1"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  'Jogging Track': (
    <svg {...svgProps}>
      <circle cx="12" cy="4" r="2"/>
      <path d="M14 10l-2-2-3 3-2-1"/>
      <path d="M14 10l1 5-4 2"/>
      <path d="M11 17l-1 5"/>
      <path d="M15 15l2 7"/>
    </svg>
  ),
  'Kids Adventure Play': (
    <svg {...svgProps}>
      <path d="M4 21l8-18 8 18"/>
      <path d="M7 14h10"/>
      <line x1="12" y1="8" x2="12" y2="14"/>
      <circle cx="8" cy="18" r="1"/>
      <circle cx="16" cy="18" r="1"/>
    </svg>
  ),
  'Open Turf Zone': (
    <svg {...svgProps}>
      <path d="M12 3c-3 0-6 3-6 6 0 5 6 12 6 12s6-7 6-12c0-3-3-6-6-6z"/>
      <circle cx="12" cy="9" r="2"/>
      <path d="M4 20h16"/>
    </svg>
  ),
  // ─── Biodiversity Park ───
  'Butterfly Garden': (
    <svg {...svgProps}>
      <path d="M12 3v18"/>
      <path d="M12 8c-3-3-8-2-8 2s5 5 8 2"/>
      <path d="M12 8c3-3 8-2 8 2s-5 5-8 2"/>
      <path d="M12 15c-2-2-6-1-6 1.5s4 3.5 6 1.5"/>
      <path d="M12 15c2-2 6-1 6 1.5s-4 3.5-6 1.5"/>
      <circle cx="11" cy="7" r="0.5" fill={C}/>
      <circle cx="13" cy="7" r="0.5" fill={C}/>
    </svg>
  ),
  'Herbal Garden': (
    <svg {...svgProps}>
      <path d="M12 22V12"/>
      <path d="M8 12c0-4 4-8 4-8s4 4 4 8"/>
      <path d="M8 12c-2 0-4-2-4-4 2 0 4 2 4 4z"/>
      <path d="M16 12c2 0 4-2 4-4-2 0-4 2-4 4z"/>
      <path d="M10 19h4"/>
    </svg>
  ),
  'Pollinator Meadow': (
    <svg {...svgProps}>
      <circle cx="12" cy="8" r="3"/>
      <circle cx="12" cy="8" r="1"/>
      <path d="M12 11v5"/>
      <path d="M9 14l-2 3"/><path d="M15 14l2 3"/>
      <path d="M8 20c2-1 3-1 4 0s2 1 4 0"/>
      <path d="M6 5l-1-2"/><path d="M18 5l1-2"/>
    </svg>
  ),
  'Bird Trail': (
    <svg {...svgProps}>
      <path d="M12 8c4 0 7-2 8-5-2 0-4 1-5 2l-3 3"/>
      <path d="M12 8l-4 4"/>
      <path d="M8 12l-4 2"/>
      <path d="M8 12l2 4"/>
      <path d="M10 16l-2 5"/>
      <path d="M10 16l4 1"/>
      <path d="M14 17l1 4"/>
    </svg>
  ),
  'Nature Walk': (
    <svg {...svgProps}>
      <path d="M12 22V14"/>
      <path d="M8 14c0-4 4-10 4-10s4 6 4 10"/>
      <path d="M12 14c-4 0-6-3-6-3l6-3"/>
      <path d="M12 14c4 0 6-3 6-3l-6-3"/>
      <path d="M9 22h6"/>
    </svg>
  ),
  'Flower Mounds': (
    <svg {...svgProps}>
      <circle cx="12" cy="7" r="3"/>
      <circle cx="8" cy="10" r="2.5"/>
      <circle cx="16" cy="10" r="2.5"/>
      <circle cx="12" cy="7" r="1" fill={C}/>
      <path d="M12 12v8"/>
      <path d="M9 16l3-4 3 4"/>
    </svg>
  ),
  'Citrus Grove': (
    <svg {...svgProps}>
      <circle cx="12" cy="14" r="5"/>
      <path d="M12 9V5"/>
      <path d="M12 5c1-2 3-3 5-3"/>
      <path d="M10 12a2 2 0 0 1 4 0"/>
      <path d="M12 12v3"/>
    </svg>
  ),
  'Rashi Vana': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3v18"/>
      <path d="M3 12h18"/>
      <path d="M5.6 5.6l12.8 12.8"/>
      <path d="M18.4 5.6L5.6 18.4"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),

  // ─── Riverfront Terraces ───
  'Promenade Walk': (
    <svg {...svgProps}>
      <circle cx="12" cy="4" r="2"/>
      <path d="M12 6v6"/>
      <path d="M8 9h8"/>
      <path d="M9 12l-2 9"/>
      <path d="M15 12l2 9"/>
      <path d="M7 21h10"/>
    </svg>
  ),
  'Sunrise Deck': (
    <svg {...svgProps}>
      <path d="M2 14h20"/>
      <circle cx="12" cy="8" r="4"/>
      <path d="M12 2v2"/>
      <path d="M4.9 4.9l1.4 1.4"/>
      <path d="M19.1 4.9l-1.4 1.4"/>
      <path d="M2 10h2"/><path d="M20 10h2"/>
      <path d="M4 18h16"/><path d="M6 21h12"/>
    </svg>
  ),
  'River Walk': (
    <svg {...svgProps}>
      <path d="M2 6c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 5-2"/>
      <path d="M2 12c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 5-2"/>
      <path d="M2 18c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 5-2"/>
    </svg>
  ),
  'Family Pods': (
    <svg {...svgProps}>
      <circle cx="8" cy="6" r="2"/>
      <circle cx="16" cy="6" r="2"/>
      <path d="M8 8v4"/><path d="M16 8v4"/>
      <path d="M5 12h6"/><path d="M13 12h6"/>
      <circle cx="12" cy="14" r="1.5"/>
      <path d="M12 15.5v3"/>
      <path d="M6 16l-2 5"/><path d="M10 16l-1 5"/>
      <path d="M14 16l1 5"/><path d="M18 16l2 5"/>
    </svg>
  ),
  'Birding Trail': (
    <svg {...svgProps}>
      <path d="M16 7c2-1 5-1 6-3-2 0-4 0-5 1"/>
      <ellipse cx="13" cy="9" rx="4" ry="3"/>
      <path d="M9 9l-4 2"/>
      <path d="M13 12l-1 4-2 0"/>
      <path d="M13 12l1 4 2 0"/>
      <circle cx="14.5" cy="8" r="0.5" fill={C}/>
    </svg>
  ),
  'Astro Deck': (
    <svg {...svgProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      <circle cx="8" cy="8" r="0.5" fill={C}/>
      <circle cx="14" cy="17" r="0.5" fill={C}/>
      <circle cx="17" cy="9" r="0.5" fill={C}/>
    </svg>
  ),
  'Terraced Lawns': (
    <svg {...svgProps}>
      <path d="M2 20h20"/>
      <path d="M4 20v-4h16v4"/>
      <path d="M6 16v-4h12v4"/>
      <path d="M8 12V8h8v4"/>
      <path d="M10 8V5h4v3"/>
    </svg>
  ),
  'Gazebo': (
    <svg {...svgProps}>
      <path d="M3 11l9-7 9 7"/>
      <line x1="5" y1="11" x2="5" y2="21"/>
      <line x1="19" y1="11" x2="19" y2="21"/>
      <line x1="12" y1="4" x2="12" y2="11"/>
      <path d="M3 21h18"/>
      <path d="M8 11v10"/><path d="M16 11v10"/>
    </svg>
  ),
  // ─── Community Spaces ───
  'Amphitheatre': (
    <svg {...svgProps}>
      <path d="M4 18c0-5 4-9 8-9s8 4 8 9"/>
      <path d="M6 15c0-3 3-6 6-6s6 3 6 6"/>
      <path d="M8 12c0-2 2-4 4-4s4 2 4 4"/>
      <path d="M2 21h20"/>
      <rect x="10" y="19" width="4" height="2"/>
    </svg>
  ),
  'Pollination Meadows': (
    <svg {...svgProps}>
      <circle cx="7" cy="7" r="2.5"/>
      <circle cx="7" cy="7" r="1" fill={C}/>
      <path d="M7 9.5v5"/>
      <circle cx="16" cy="9" r="2"/>
      <circle cx="16" cy="9" r="0.8" fill={C}/>
      <path d="M16 11v4"/>
      <circle cx="11" cy="12" r="1.8"/>
      <circle cx="11" cy="12" r="0.7" fill={C}/>
      <path d="M11 14v4"/>
      <path d="M3 20c3-1 6-1 9 0s6 1 9 0"/>
    </svg>
  ),
  'Rock Garden': (
    <svg {...svgProps}>
      <path d="M4 20l4-6 3 3 5-8 4 11"/>
      <circle cx="8" cy="18" r="2"/>
      <circle cx="14" cy="16" r="3"/>
      <path d="M2 21h20"/>
    </svg>
  ),
  'Pets Park': (
    <svg {...svgProps}>
      <circle cx="8" cy="5" r="2"/>
      <circle cx="16" cy="5" r="2"/>
      <circle cx="5" cy="10" r="2"/>
      <circle cx="19" cy="10" r="2"/>
      <path d="M12 17c3 0 5-2 5-5-2 0-3.5 1-5 2.5-1.5-1.5-3-2.5-5-2.5 0 3 2 5 5 5z"/>
      <path d="M12 17v4"/>
    </svg>
  ),
  'Palm Grove': (
    <svg {...svgProps}>
      <path d="M12 22V10"/>
      <path d="M12 10c-4 0-8-3-9-6 4 1 7 3 9 6z"/>
      <path d="M12 10c4 0 8-3 9-6-4 1-7 3-9 6z"/>
      <path d="M12 8c-2-3-2-6-1-8 2 2 2 5 1 8z"/>
      <path d="M10 22h4"/>
    </svg>
  ),
  'Lotus Pond': (
    <svg {...svgProps}>
      <path d="M12 20c-5 0-8-3-8-6 2 1 4 1 6 0"/>
      <path d="M12 20c5 0 8-3 8-6-2 1-4 1-6 0"/>
      <path d="M12 14c-2-2-3-5-2-8 2 2 3 5 2 8z"/>
      <path d="M12 14c2-2 3-5 2-8-2 2-3 5-2 8z"/>
      <path d="M2 18c3 1 6 1 10 0s7-1 10 0"/>
    </svg>
  ),
  'Aquatic Garden': (
    <svg {...svgProps}>
      <path d="M2 16c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0"/>
      <path d="M2 20c2-1 3-1 5 0s3 1 5 0 3-1 5 0 3 1 5 0"/>
      <path d="M7 12c0-3 2-5 5-8 3 3 5 5 5 8"/>
      <path d="M12 12V4"/>
      <path d="M9 10c1-1 2-1 3 0s2 1 3 0"/>
    </svg>
  ),
  'Pause Stations': (
    <svg {...svgProps}>
      <path d="M4 16h16"/>
      <path d="M6 16V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"/>
      <path d="M4 16c-1 0-2 1-2 2v1h20v-1c0-1-1-2-2-2"/>
      <line x1="8" y1="19" x2="8" y2="22"/><line x1="16" y1="19" x2="16" y2="22"/>
    </svg>
  ),

  // ─── Sustainable Infrastructure ───
  'Rainwater Harvesting': (
    <svg {...svgProps}>
      <path d="M4 8c0-3 3-5 5-5"/>
      <path d="M20 8c0-3-3-5-5-5"/>
      <path d="M9 3c1-1 2-1 3-1s2 0 3 1"/>
      <path d="M4 8c-1 0-2 1-2 2v3c0 1 1 2 2 2h16c1 0 2-1 2-2v-3c0-1-1-2-2-2"/>
      <path d="M8 15v2"/><path d="M12 15v4"/><path d="M16 15v2"/>
      <path d="M10 19v2"/><path d="M14 19v2"/>
    </svg>
  ),
  'Solar Lighting': (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/><path d="M12 20v2"/>
      <path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/>
      <path d="M2 12h2"/><path d="M20 12h2"/>
      <path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  'Grey Water Reuse': (
    <svg {...svgProps}>
      <path d="M7 19l3-3-3-3"/>
      <path d="M17 5l-3 3 3 3"/>
      <path d="M10 16h7a3 3 0 0 0 0-6h-1"/>
      <path d="M14 8H7a3 3 0 0 0 0 6h1"/>
    </svg>
  ),
  'Permeable Paving': (
    <svg {...svgProps}>
      <rect x="3" y="3" width="7" height="7" rx="0.5"/>
      <rect x="14" y="3" width="7" height="7" rx="0.5"/>
      <rect x="3" y="14" width="7" height="7" rx="0.5"/>
      <rect x="14" y="14" width="7" height="7" rx="0.5"/>
      <path d="M6 6v1"/><path d="M17 6v1"/><path d="M6 17v1"/><path d="M17 17v1"/>
    </svg>
  ),
  'Underground Utilities': (
    <svg {...svgProps}>
      <path d="M13 2l-1 5h4l-5 9 1-5H8l5-9z"/>
      <path d="M4 18h16"/>
      <path d="M6 21h12"/>
    </svg>
  ),
  'STP Technology': (
    <svg {...svgProps}>
      <path d="M6 3h12"/>
      <path d="M8 3v3a8 8 0 0 0 8 0V3"/>
      <path d="M12 6v4"/>
      <circle cx="12" cy="14" r="4"/>
      <path d="M12 18v3"/>
      <path d="M9 21h6"/>
      <path d="M10 13l2 2 2-2"/>
    </svg>
  ),
};

const CATEGORIES = [
  {
    id: 'clubhouse',
    label: 'Clubhouse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    items: [
      { name: 'Café Lounge', icon: '☕' },
      { name: 'Yoga Studio', icon: '🧘' },
      { name: 'Fitness Centre', icon: '💪' },
      { name: 'Community Lounge', icon: '🛋️' },
      { name: 'Event Lawns', icon: '🌿' },
      { name: 'Indoor Games', icon: '🎯' },
      { name: 'Multipurpose Hall', icon: '🏛️' },
      // { name: 'Swimming Pool', icon: '🏊' },
      { name: 'Lounge Bar', icon: '🍸' },
      { name: 'Party Lawn', icon: '🎉' },
      { name: 'Sunset Deck', icon: '🌅' },
      { name: 'Barbeque Zone', icon: '🔥' },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness Grove',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12"/><path d="M12 12C12 7 7 3 3 5c4 0 7 3 9 7"/><path d="M12 12c0-5 5-9 9-7-4 0-7 3-9 7"/>
      </svg>
    ),
    items: [
      { name: 'Herb Garden', icon: '🌱' },
      { name: 'Zen Garden', icon: '☯️' },
      { name: 'Hammock Grove', icon: '🪴' },
      { name: 'Aroma Garden', icon: '🌸' },
      { name: 'Meditation Deck', icon: '🧘' },
      { name: 'Reflexology Path', icon: '🦶' },
      { name: 'Wellness Pavilion', icon: '🏕️' },
      { name: 'Ferns Garden', icon: '🌿' },
    ],
  },
  {
    id: 'sports',
    label: 'Sports Arena',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/>
      </svg>
    ),
    items: [
      { name: 'Tennis Court', icon: '🎾' },
      { name: 'Basketball Court', icon: '🏀' },
      { name: 'Cricket Nets', icon: '🏏' },
      { name: 'Cycling Track', icon: '🚴' },
      { name: 'Outdoor Gym', icon: '🏋️' },
      { name: 'Jogging Track', icon: '🏃' },
      { name: 'Kids Adventure Play', icon: '🧗' },
      { name: 'Open Turf Zone', icon: '⚽' },
    ],
  },
  {
    id: 'biodiversity',
    label: 'Biodiversity Park',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/>
      </svg>
    ),
    items: [
      { name: 'Butterfly Garden', icon: '🦋' },
      { name: 'Herbal Garden', icon: '🌿' },
      { name: 'Pollinator Meadow', icon: '🐝' },
      { name: 'Bird Trail', icon: '🐦' },
      { name: 'Nature Walk', icon: '🌳' },
      { name: 'Flower Mounds', icon: '🌺' },
      { name: 'Citrus Grove', icon: '🍊' },
      { name: 'Rashi Vana', icon: '♈' },
    ],
  },
  {
    id: 'riverfront',
    label: 'Riverfront Terraces',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/><path d="M2 17c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2"/>
      </svg>
    ),
    items: [
      { name: 'Promenade Walk', icon: '🚶' },
      { name: 'Sunrise Deck', icon: '🌅' },
      { name: 'River Walk', icon: '💧' },
      { name: 'Family Pods', icon: '👨‍👩‍👧' },
      { name: 'Birding Trail', icon: '🦅' },
      { name: 'Astro Deck', icon: '🔭' },
      { name: 'Terraced Lawns', icon: '🌾' },
      { name: 'Gazebo', icon: '⛱️' },
    ],
  },
  {
    id: 'community',
    label: 'Community Spaces',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    items: [
      { name: 'Amphitheatre', icon: '🎭' },
      { name: 'Pollination Meadows', icon: '🌼' },
      { name: 'Rock Garden', icon: '🪨' },
      { name: 'Pets Park', icon: '🐕' },
      { name: 'Palm Grove', icon: '🌴' },
      { name: 'Lotus Pond', icon: '🪷' },
      { name: 'Aquatic Garden', icon: '💦' },
      { name: 'Pause Stations', icon: '🪑' },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Sustainable Infrastructure',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    items: [
      { name: 'Rainwater Harvesting', icon: '🌧️' },
      { name: 'Solar Lighting', icon: '☀️' },
      { name: 'Grey Water Reuse', icon: '♻️' },
      { name: 'Permeable Paving', icon: '🧱' },
      { name: 'Underground Utilities', icon: '⚡' },
      { name: 'STP Technology', icon: '🔬' },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AmenitiesSection() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  return (
    <section id="amenities" style={{ background: '#ffffff', overflow: 'hidden' }}>

      {/* ── Section header ───────────────────────────────────────────── */}
      <div style={{
        padding: 'clamp(48px, 7vh, 80px) clamp(24px, 8vw, 120px) clamp(28px, 4vh, 40px)',
      }}>
        <Reveal delay={0}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(18px, 2.5vh, 24px)' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'rgba(0,53,57,0.3)', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 500,
              fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: '#C9A84C',
            }}>
              Everyday Life at Riverine
            </span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{
              fontFamily: "'DM Sans', Roboto, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em', color: '#003539',
            }}>
              Slow Mornings. Full Weekends.<br />
              {/* <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Limited Plots Left.</span> */}
            </h2>
            <p style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 300,
              fontSize: '11px', letterSpacing: '0.12em',
              color: 'rgba(0,53,57,0.4)', textTransform: 'uppercase',
            }}>
              40+ Amenities · 15,000+ sq. ft. Clubhouse · 7 Zones
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Main: nav left + content right ────────────────────────────── */}
      <div style={{
        padding: '0 clamp(24px, 8vw, 120px) clamp(48px, 7vh, 80px)',
      }}>
        <div className="am-layout">

          {/* ── LEFT — vertical nav ── */}
          <div className="am-nav">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`am-nav-btn ${active === i ? 'am-nav-active' : ''}`}
              >
                <span className="am-nav-icon">{c.icon}</span>
                <span className="am-nav-label">{c.label}</span>
              </button>
            ))}
          </div>

          {/* ── RIGHT — amenity grid ── */}
          <div className="am-content" key={cat.id}>

            {/* Category title */}
            <div style={{ marginBottom: 'clamp(20px, 3vh, 28px)' }}>
              <h3 style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
                lineHeight: 1.1, letterSpacing: '-0.015em',
                color: '#003539', marginBottom: '6px',
              }}>
                {cat.label}
              </h3>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: '11px', letterSpacing: '0.1em',
                color: 'rgba(0,53,57,0.4)',
              }}>
                {cat.items.length} ways to spend your day
              </p>
            </div>

            {/* Items grid */}
            <div className="am-items-grid">
              {cat.items.map((item, i) => (
                <div key={i} className="am-item-card">
                  <span className="am-item-icon">{ICONS[item.name] || item.icon}</span>
                  <span className="am-item-name">{item.name}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <style>{`
        /* Main layout: nav left, content right */
        .am-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: start;
        }

        /* ── Vertical nav ── */
        .am-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-right: 1px solid rgba(0,53,57,0.08);
          padding-right: clamp(16px, 2.5vw, 28px);
          position: sticky;
          top: 88px;
        }
        .am-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: rgba(33,37,41,0.6);
          background: none;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          white-space: nowrap;
        }
        .am-nav-btn:hover {
          color: #003539;
          background: rgba(0,53,57,0.04);
        }
        .am-nav-btn.am-nav-active {
          font-weight: 600;
          color: #003539;
          border-left-color: #003539;
          background: rgba(0,53,57,0.06);
        }
        .am-nav-icon {
          color: rgba(0,53,57,0.35);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          transition: color 0.25s ease;
        }
        .am-nav-active .am-nav-icon {
          color: #003539;
        }
        .am-nav-label {
          line-height: 1.2;
        }

        /* ── Content area ── */
        .am-content {
          animation: amFadeIn 0.4s ease;
        }
        @keyframes amFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Items grid — 3 columns ── */
        .am-items-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(0,53,57,0.08);
          border: 1px solid rgba(0,53,57,0.08);
        }
        .am-item-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: clamp(20px, 3vw, 32px) clamp(12px, 2vw, 20px);
          background: #ffffff;
          text-align: center;
          transition: background 0.25s ease;
          cursor: default;
        }
        .am-item-card:hover {
          background: rgba(0,53,57,0.04);
        }
        .am-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          line-height: 1;
          opacity: 0.85;
          transition: opacity 0.25s ease;
        }
        .am-item-card:hover .am-item-icon {
          opacity: 1;
        }
        .am-item-name {
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: clamp(11px, 1vw, 12px);
          letter-spacing: 0.04em;
          color: rgba(33,37,41,0.75);
          line-height: 1.3;
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .am-layout {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .am-nav {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
            border-right: none;
            border-bottom: 1px solid rgba(0,53,57,0.1);
            padding-right: 0;
            padding-bottom: 0;
            margin-bottom: clamp(20px, 3vh, 28px);
            position: static;
            gap: 0;
          }
          .am-nav::-webkit-scrollbar { display: none; }
          .am-nav-btn {
            flex-shrink: 0;
            padding: 11px 14px;
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            white-space: nowrap;
            border-left: none;
            border-bottom: 2px solid transparent;
          }
          .am-nav-btn.am-nav-active {
            border-left-color: transparent;
            border-bottom-color: #003539;
          }
          .am-nav-icon {
            display: none;
          }
          .am-items-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* ── Tablet narrower: 2-col grid ── */
        @media (min-width: 561px) and (max-width: 768px) {
          .am-items-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 560px) {
          .am-items-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .am-nav-btn {
            padding: 8px 7px;
            font-size: 8px;
            letter-spacing: 0.02em;
          }
        }
      `}</style>
    </section>
  );
}
