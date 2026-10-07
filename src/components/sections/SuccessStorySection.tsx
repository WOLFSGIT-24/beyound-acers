import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/riverine/reveal';
import { PRICING, SUCCESS } from '@/content/riverine';

/* ─── Count-up + progress, triggered once when the panel scrolls into view ── */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => setN(to));
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

/* ─── Timeline ───────────────────────────────────────────────────────────── */
const MILESTONES = [
  { k: 'Pre-Launch',      t: 'Codename Unstoppable 2.0 opens to early buyers' },
  { k: 'Sold Out',        t: 'Every 1,163 sq.ft. plot is booked' },
  { k: `${SUCCESS.families}+ Families`, t: 'Join the community before launch' },
  { k: 'Dussehra 2026',   t: 'The grand launch as Riverine', now: true },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function SuccessStorySection({ onOpenPopup }: { onOpenPopup: () => void }) {
  const [panelRef, inView] = useInView<HTMLDivElement>();
  const pct = Math.round((SUCCESS.plotsBooked / SUCCESS.totalPlots) * 100);

  return (
    <section id="success-story" className="ss-section">
      <div className="ss-inner">

        <div className="ss-grid">
          {/* ── LEFT — story ── */}
          <div>
            <Reveal>
              <div className="ss-eyebrow">
                <span className="ss-eyebrow-rule" />
                <span>Pre-Launch Success Story</span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="ss-headline">
                {SUCCESS.families}+ Families Said Yes.<br />
                <span className="ss-gold">Before the Launch.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="ss-rule" />
              <p className="ss-body">
                Before Riverine had its name, it had believers. During the pre-launch,{' '}
                <strong>{SUCCESS.families}+ families</strong> walked the land by the Kaveri and chose to make it theirs,
                and every 1,163 sq.ft. plot was booked.
              </p>
              <p className="ss-body">
                This Dussehra, Riverine opens to everyone. The plots that remain are the ones still waiting for their families.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="ss-cta-row">
                <button className="ss-cta" onClick={onOpenPopup}>
                  Reserve Your Plot
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
                <span className="ss-cta-note">Limited plots remain for the launch</span>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — numbers panel ── */}
          <Reveal delay={100}>
            <div ref={panelRef} className="ss-panel">
              <div className="ss-panel-top">
                <div className="ss-big">
                  <CountUp to={SUCCESS.families} run={inView} />
                  <span className="ss-big-plus">+</span>
                </div>
                <div className="ss-big-label">Families on board{' '}<br />before launch</div>
              </div>

              <div className="ss-progress">
                <div className="ss-progress-head">
                  <span>Plots booked in pre-launch</span>
                  <span className="ss-progress-num">{SUCCESS.plotsBooked}+ / {SUCCESS.totalPlots}</span>
                </div>
                <div className="ss-track" role="progressbar" aria-valuemin={0} aria-valuemax={SUCCESS.totalPlots} aria-valuenow={SUCCESS.plotsBooked} aria-label="Plots booked in pre-launch">
                  <div className="ss-fill" style={{ transform: `scaleX(${inView ? pct / 100 : 0})` }} />
                </div>
              </div>

              <div className="ss-chips">
                <div className="ss-chip ss-chip--sold">
                  <span className="ss-chip-k">1,163 Sq.Ft.</span>
                  <span className="ss-chip-v"><span className="ss-dot ss-dot--sold" />Sold Out</span>
                </div>
                <div className="ss-chip">
                  <span className="ss-chip-k">{PRICING.availableSizes}</span>
                  <span className="ss-chip-v"><span className="ss-dot" />From {PRICING.startingPrice}*</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Timeline ── */}
        <Reveal delay={120}>
          <ol className="ss-timeline">
            {MILESTONES.map((m, i) => (
              <li key={i} className={`ss-step${m.now ? ' ss-step--now' : ''}`}>
                <span className="ss-step-dot" aria-hidden="true" />
                <span className="ss-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ss-step-k">{m.k}</span>
                <span className="ss-step-t">{m.t}</span>
              </li>
            ))}
          </ol>
        </Reveal>

      </div>

      <style>{`
        .ss-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 60% 70% at 85% 20%, rgba(201,168,76,0.10) 0%, transparent 60%),
            #003539;
        }
        .ss-inner { padding: clamp(64px,9vh,104px) clamp(24px,8vw,120px) clamp(56px,8vh,88px); }

        .ss-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(36px,6vw,88px);
          align-items: center;
        }

        .ss-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: clamp(18px,2.5vh,26px);
          font-family: Roboto, sans-serif; font-weight: 500;
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          color: #C9A84C;
        }
        .ss-eyebrow-rule { display: block; width: 32px; height: 1px; background: #C9A84C; flex-shrink: 0; }

        .ss-headline {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700;
          font-size: clamp(2.2rem, 4.2vw, 3.8rem);
          line-height: 1.05; letter-spacing: -0.025em;
          color: #ffffff; margin: 0; text-wrap: balance;
        }
        .ss-gold { color: #C9A84C; }
        .ss-rule { width: 40px; height: 2px; background: #C9A84C; opacity: 0.7; margin: clamp(20px,3vh,28px) 0; }
        .ss-body {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: clamp(0.88rem, 1vw, 0.98rem); line-height: 1.85;
          color: rgba(255,255,255,0.68); margin: 0 0 14px; max-width: 480px;
        }
        .ss-body strong { font-weight: 600; color: #ffffff; }

        .ss-cta-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-top: clamp(20px,3vh,30px); }
        .ss-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 26px; background: #C9A84C; color: #0f1f1c;
          font-family: Roboto, sans-serif; font-weight: 600; font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase;
          border: none; cursor: pointer; transition: background 0.25s ease, transform 0.25s ease;
        }
        .ss-cta:hover { background: #d8b95c; transform: translateY(-2px); }
        .ss-cta:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .ss-cta-note {
          font-family: Roboto, sans-serif; font-weight: 400; font-size: 11px;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.5);
        }

        /* Numbers panel */
        .ss-panel {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.28);
          padding: clamp(28px,3.5vw,44px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.28);
        }
        .ss-panel::before {
          content: ''; position: absolute; top: -1px; left: -1px; right: -1px; height: 3px;
          background: linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2));
        }
        .ss-panel-top { display: flex; align-items: flex-end; gap: 18px; margin-bottom: clamp(24px,3.5vh,36px); }
        .ss-big {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700;
          font-size: clamp(4.2rem, 8vw, 7.2rem); line-height: 0.85; letter-spacing: -0.04em;
          color: #ffffff; font-variant-numeric: tabular-nums;
        }
        .ss-big-plus { color: #C9A84C; }
        .ss-big-label {
          font-family: Roboto, sans-serif; font-weight: 500; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; line-height: 1.7;
          color: rgba(255,255,255,0.6); padding-bottom: 6px;
        }

        .ss-progress { margin-bottom: clamp(22px,3vh,30px); }
        .ss-progress-head {
          display: flex; justify-content: space-between; align-items: baseline; gap: 12px;
          font-family: Roboto, sans-serif; font-weight: 400; font-size: 11px;
          letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.55);
          margin-bottom: 10px;
        }
        .ss-progress-num {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700; font-size: 13px;
          letter-spacing: 0.02em; color: #C9A84C; font-variant-numeric: tabular-nums;
          white-space: nowrap; flex-shrink: 0;
        }
        .ss-track { height: 6px; background: rgba(255,255,255,0.1); overflow: hidden; }
        .ss-fill {
          height: 100%; width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #a8893a, #C9A84C 70%, #e6cc7e);
          transition: transform 1.8s cubic-bezier(.2,.7,.2,1);
        }

        .ss-chips { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); }
        .ss-chip { display: flex; flex-direction: column; gap: 6px; padding: 16px 18px; background: #0a3d41; }
        .ss-chip--sold { background: #07302f; }
        .ss-chip-k {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700;
          font-size: clamp(0.9rem, 1.1vw, 1.02rem); color: #ffffff; letter-spacing: -0.01em;
        }
        .ss-chip--sold .ss-chip-k { color: rgba(255,255,255,0.55); text-decoration: line-through; text-decoration-color: rgba(201,168,76,0.7); }
        .ss-chip-v {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: Roboto, sans-serif; font-weight: 500; font-size: 10px;
          letter-spacing: 0.16em; text-transform: uppercase; color: #C9A84C;
        }
        .ss-dot { width: 7px; height: 7px; border-radius: 50%; background: #6fcf97; box-shadow: 0 0 0 3px rgba(111,207,151,0.18); }
        .ss-dot--sold { background: #d9785f; box-shadow: 0 0 0 3px rgba(217,120,95,0.18); }

        /* Timeline */
        .ss-timeline {
          list-style: none; margin: clamp(52px,8vh,84px) 0 0; padding: 0;
          display: grid; grid-template-columns: repeat(4, 1fr);
          position: relative;
        }
        .ss-timeline::before {
          content: ''; position: absolute; top: 5px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.6), rgba(201,168,76,0.25) 75%, #C9A84C);
        }
        .ss-step { position: relative; display: flex; flex-direction: column; gap: 6px; padding: 30px 20px 0 0; }
        .ss-step-dot {
          position: absolute; top: 0; left: 0;
          width: 11px; height: 11px; border-radius: 50%;
          background: #003539; border: 1.5px solid #C9A84C;
        }
        .ss-step--now .ss-step-dot { background: #C9A84C; box-shadow: 0 0 0 5px rgba(201,168,76,0.2); animation: ssPulse 2.4s ease-in-out infinite; }
        @keyframes ssPulse { 0%,100% { box-shadow: 0 0 0 4px rgba(201,168,76,0.22); } 50% { box-shadow: 0 0 0 9px rgba(201,168,76,0.05); } }
        .ss-step-num {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 500; font-size: 11px;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.35);
        }
        .ss-step-k {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700;
          font-size: clamp(1rem, 1.3vw, 1.2rem); color: #ffffff; letter-spacing: -0.01em;
        }
        .ss-step--now .ss-step-k { color: #C9A84C; }
        .ss-step-t {
          font-family: Roboto, sans-serif; font-weight: 300; font-size: clamp(0.78rem, 0.9vw, 0.85rem);
          line-height: 1.6; color: rgba(255,255,255,0.58); max-width: 220px;
        }

        @media (prefers-reduced-motion: reduce) {
          .ss-fill { transition: none; }
          .ss-step--now .ss-step-dot { animation: none; }
        }

        @media (max-width: 900px) {
          .ss-grid { grid-template-columns: 1fr; }
          .ss-timeline { grid-template-columns: 1fr 1fr; row-gap: 32px; }
          .ss-timeline::before { display: none; }
          .ss-step { padding-top: 0; padding-left: 24px; }
          .ss-step-dot { top: 4px; }
        }
        @media (max-width: 480px) {
          .ss-panel-top { flex-direction: column; align-items: flex-start; gap: 10px; }
          .ss-big-label br { display: none; }
          .ss-big-label { padding-bottom: 0; }
          .ss-progress-head { font-size: 10px; letter-spacing: 0.08em; }
          .ss-chips { grid-template-columns: 1fr; }
          .ss-timeline { grid-template-columns: 1fr; row-gap: 24px; border-left: 1px solid rgba(201,168,76,0.35); margin-left: 5px; }
          .ss-step { padding-left: 22px; }
          .ss-step-dot { left: -6px; }
          .ss-step-t { max-width: none; }
        }
      `}</style>
    </section>
  );
}
