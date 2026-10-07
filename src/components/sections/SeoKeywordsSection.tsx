import React from 'react';

const KEYWORDS = [
  'Riverine',
  'Riverine Beyond Acres',
  'Riverine Srirangapatna',
  'Beyond Acres',
  'Codename Unstoppable 2.0',
  'Beyond Acres Plots',
  'Plots near Bangalore',
  'Villa Plots near Bangalore',
  'Gated Community Plots',
  'Investment Plots near Bangalore',
  'Plots on Bangalore–Mysore Highway',
  'Plots on Bengaluru–Mysuru Expressway',
  'Riverfront Plots near Bangalore',
  'Eco Friendly Plots near Mysore',
  'Premium Villa Plots near Mysore Road',
  'Plots for Sale near Bangalore',
  'Riverside Living near Bangalore',
  'Plots in Mandya',
  'Plots in Srirangapatna',
  'Kaveri Riverfront Plots',
  'RERA Approved Plots Karnataka',
  'Nature Living near Mysore',
  'River Facing Plots Karnataka',
  'Biodiversity Township Karnataka',
  'Plots near River Kaveri',
  'NA Plots near Bangalore',
  'Residential Plots Mysuru Expressway',
];

export default function SeoKeywordsSection() {
  return (
    <section
      aria-label="Related property searches"
      style={{ background: '#faf9f6', borderTop: '1px solid rgba(0,53,57,0.07)' }}
    >
      <div style={{ padding: 'clamp(40px,5vh,60px) clamp(24px,8vw,120px)' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(20px,3vh,32px)' }}>
          <span style={{ width: 24, height: 1, background: '#C9A84C', display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C' }}>
            Explore by Search
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {KEYWORDS.map((kw, i) => (
            <div key={i} className="seo-tag">
              <span className="seo-tag-dot" />
              <span className="seo-tag-label">{kw}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .seo-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          background: #ffffff;
          border: 1px solid rgba(0,53,57,0.12);
          border-radius: 4px;
          cursor: default;
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.18s ease;
        }
        .seo-tag:hover {
          background: #003539;
          border-color: #003539;
          box-shadow: 0 4px 16px rgba(0,53,57,0.15);
          transform: translateY(-2px);
        }
        .seo-tag-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #C9A84C;
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .seo-tag:hover .seo-tag-dot {
          background: rgba(201,168,76,0.8);
        }
        .seo-tag-label {
          font-family: 'DM Sans', Roboto, sans-serif;
          font-weight: 500;
          font-size: clamp(11px, 1vw, 13px);
          letter-spacing: 0.02em;
          color: #003539;
          white-space: nowrap;
          transition: color 0.2s ease;
        }
        .seo-tag:hover .seo-tag-label {
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
