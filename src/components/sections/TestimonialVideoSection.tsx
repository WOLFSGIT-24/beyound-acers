import React, { useState } from 'react';
import { Image } from '@/components/ui/image';
import { Reveal } from '@/components/riverine/reveal';
import { SUCCESS, TESTIMONIALS, type Testimonial } from '@/content/riverine';

const hasVideo = (t: Testimonial) => Boolean(t.youtubeId || t.src);

function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function TestimonialVideoSection() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [notice, setNotice] = useState(false);
  const current = TESTIMONIALS[active];
  const total = TESTIMONIALS.length;

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
    setNotice(false);
  };

  const play = () => {
    if (hasVideo(current)) setPlaying(true);
    else setNotice(true);
  };

  return (
    <section id="testimonials" className="tv-section">
      <div className="tv-inner">

        {/* ── Header ── */}
        <div className="tv-head">
          <div>
            <Reveal>
              <div className="tv-eyebrow">
                <span className="tv-eyebrow-rule" />
                <span>In Their Words</span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="tv-headline">
                Stories From the<br />
                <span className="tv-gold">Riverine Family.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="tv-intro">
              Hear from the {SUCCESS.families}+ families who joined Riverine before launch: why they chose it,
              and what it felt like the first time they stood by the Kaveri.
            </p>
          </Reveal>
        </div>

        {/* ── Player + playlist ── */}
        <Reveal delay={140}>
          <div className="tv-grid">

            {/* Featured player */}
            <div className="tv-stage">
              {playing && current.youtubeId ? (
                <iframe
                  className="tv-media"
                  src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={current.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : playing && current.src ? (
                <video className="tv-media" src={current.src} poster={current.poster} controls autoPlay playsInline />
              ) : (
                <button className="tv-poster" onClick={play} aria-label={`Play: ${current.title}`}>
                  {TESTIMONIALS.map((t, i) => (
                    <Image
                      key={t.poster + i}
                      src={t.poster}
                      alt=""
                      className="tv-poster-img"
                      style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.04)' }}
                    />
                  ))}
                  <span className="tv-poster-shade" />
                  <span className="tv-play">
                    <span className="tv-play-ring" />
                    <PlayIcon size={26} />
                  </span>
                  <span className="tv-caption">
                    <span className="tv-caption-count">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
                    <span className="tv-caption-title">“{current.title}”</span>
                    <span className="tv-caption-by">{current.byline}{current.duration ? ` · ${current.duration}` : ''}</span>
                  </span>
                  {notice && (
                    <span className="tv-notice" role="status">Video coming soon. The Riverine family is recording their stories.</span>
                  )}
                </button>
              )}
            </div>

            {/* Playlist */}
            <ul className="tv-list">
              {TESTIMONIALS.map((t, i) => (
                <li key={i}>
                  <button
                    className={`tv-item${i === active ? ' tv-item--active' : ''}`}
                    onClick={() => select(i)}
                    aria-current={i === active}
                  >
                    <span className="tv-thumb">
                      <Image src={t.poster} alt="" className="tv-thumb-img" />
                      <span className="tv-thumb-play"><PlayIcon size={12} /></span>
                    </span>
                    <span className="tv-item-text">
                      <span className="tv-item-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="tv-item-title">{t.title}</span>
                      <span className="tv-item-by">{hasVideo(t) ? (t.duration ?? t.byline) : 'Coming soon'}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

          </div>
        </Reveal>

      </div>

      <style>{`
        .tv-section { background: #0a1f1e; overflow: hidden; }
        .tv-inner { padding: clamp(64px,9vh,104px) clamp(24px,8vw,120px); }

        .tv-head {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(24px,5vw,64px); align-items: end;
          margin-bottom: clamp(36px,5vh,56px);
        }
        .tv-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: clamp(18px,2.5vh,24px);
          font-family: Roboto, sans-serif; font-weight: 500; font-size: 10px;
          letter-spacing: 0.3em; text-transform: uppercase; color: #C9A84C;
        }
        .tv-eyebrow-rule { display: block; width: 28px; height: 1px; background: rgba(201,168,76,0.6); flex-shrink: 0; }
        .tv-headline {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700;
          font-size: clamp(2.2rem, 4.2vw, 3.8rem); line-height: 1.05; letter-spacing: -0.025em;
          color: #ffffff; margin: 0;
        }
        .tv-gold { color: #C9A84C; }
        .tv-intro {
          font-family: Roboto, sans-serif; font-weight: 300;
          font-size: clamp(0.88rem, 1vw, 0.98rem); line-height: 1.85;
          color: rgba(255,255,255,0.62); margin: 0; max-width: 440px;
        }

        .tv-grid { display: grid; grid-template-columns: 1.7fr 1fr; gap: clamp(16px,2vw,28px); align-items: stretch; }

        /* Stage */
        .tv-stage {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: #051312;
          box-shadow: 0 30px 80px rgba(0,0,0,0.45);
          outline: 1px solid rgba(201,168,76,0.22);
        }
        .tv-media { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #000; }
        .tv-poster { position: absolute; inset: 0; width: 100%; height: 100%; padding: 0; border: 0; cursor: pointer; background: none; text-align: left; }
        .tv-poster:focus-visible { outline: 2px solid #C9A84C; outline-offset: -4px; }
        .tv-poster-img {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          transition: opacity 0.7s ease, transform 1.2s ease;
        }
        .tv-poster:hover .tv-poster-img { transform: scale(1.03) !important; }
        .tv-poster-shade {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(5,19,18,0.92) 0%, rgba(5,19,18,0.35) 45%, rgba(5,19,18,0.1) 100%);
        }

        .tv-play {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: clamp(64px,7vw,88px); height: clamp(64px,7vw,88px); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: #C9A84C; color: #0a1f1e; padding-left: 4px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.45);
          transition: transform 0.35s ease, background 0.25s ease;
        }
        .tv-poster:hover .tv-play { transform: translate(-50%,-50%) scale(1.08); background: #d8b95c; }
        .tv-play-ring {
          position: absolute; inset: -10px; border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.55);
          animation: tvRing 2.6s ease-out infinite;
        }
        @keyframes tvRing { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.45); opacity: 0; } }

        .tv-caption {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: clamp(18px,2.6vw,36px);
          display: flex; flex-direction: column; gap: 6px;
        }
        .tv-caption-count {
          font-family: Roboto, sans-serif; font-weight: 500; font-size: 10px;
          letter-spacing: 0.24em; color: rgba(255,255,255,0.5);
        }
        .tv-caption-title {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 700; font-style: italic;
          font-size: clamp(1.15rem, 2vw, 1.75rem); line-height: 1.2; letter-spacing: -0.015em;
          color: #ffffff; max-width: 560px;
        }
        .tv-caption-by {
          font-family: Roboto, sans-serif; font-weight: 500; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: #C9A84C;
        }
        .tv-notice {
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
          padding: 9px 16px; background: rgba(10,31,30,0.88); backdrop-filter: blur(8px);
          border: 1px solid rgba(201,168,76,0.35);
          font-family: Roboto, sans-serif; font-size: 11px; letter-spacing: 0.04em; color: rgba(255,255,255,0.85);
          white-space: nowrap; animation: tvFade 0.35s ease;
        }
        @keyframes tvFade { from { opacity: 0; transform: translate(-50%,-6px); } to { opacity: 1; transform: translate(-50%,0); } }

        /* Playlist */
        .tv-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.06); }
        .tv-list li { flex: 1; display: flex; }
        .tv-item {
          flex: 1; display: flex; align-items: center; gap: 16px;
          padding: 14px 16px; background: #0d2624; border: 0; border-left: 2px solid transparent;
          cursor: pointer; text-align: left; transition: background 0.25s ease, border-color 0.25s ease;
        }
        .tv-item:hover { background: #12302d; }
        .tv-item:focus-visible { outline: 2px solid #C9A84C; outline-offset: -2px; }
        .tv-item--active { background: #143532; border-left-color: #C9A84C; }
        .tv-thumb { position: relative; flex-shrink: 0; width: clamp(96px,9vw,128px); aspect-ratio: 16 / 10; overflow: hidden; }
        .tv-thumb-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .tv-item:hover .tv-thumb-img { transform: scale(1.06); }
        .tv-thumb-play {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(5,19,18,0.35); color: #ffffff;
        }
        .tv-item--active .tv-thumb-play { color: #C9A84C; }
        .tv-item-text { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .tv-item-num { font-family: 'DM Sans', Roboto, sans-serif; font-size: 10px; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); }
        .tv-item-title {
          font-family: 'DM Sans', Roboto, sans-serif; font-weight: 600;
          font-size: clamp(0.82rem, 0.95vw, 0.92rem); line-height: 1.35; color: rgba(255,255,255,0.88);
        }
        .tv-item--active .tv-item-title { color: #ffffff; }
        .tv-item-by {
          font-family: Roboto, sans-serif; font-weight: 400; font-size: 9.5px;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(201,168,76,0.8);
        }

        @media (prefers-reduced-motion: reduce) {
          .tv-play-ring { animation: none; }
          .tv-poster-img, .tv-thumb-img { transition: none; }
        }

        @media (max-width: 960px) {
          .tv-head { grid-template-columns: 1fr; align-items: start; }
          .tv-grid { grid-template-columns: 1fr; }
          .tv-list {
            flex-direction: row; overflow-x: auto; scroll-snap-type: x mandatory;
            background: none; border: 0; gap: 10px; scrollbar-width: none;
          }
          .tv-list::-webkit-scrollbar { display: none; }
          .tv-list li { flex: 0 0 min(72%, 280px); scroll-snap-align: start; }
          .tv-item { flex-direction: column; align-items: stretch; gap: 10px; padding: 10px; border-left: 0; border-top: 2px solid transparent; }
          .tv-item--active { border-top-color: #C9A84C; }
          .tv-thumb { width: 100%; }
        }
        @media (max-width: 560px) {
          .tv-notice { white-space: normal; width: calc(100% - 32px); text-align: center; }
          /* Short 16:9 stage on phones: keep the play button clear of the caption */
          .tv-play { top: 40%; width: 52px; height: 52px; }
          .tv-play-ring { inset: -7px; }
          .tv-caption { padding: 12px 14px; gap: 3px; }
          .tv-caption-count { display: none; }
          .tv-caption-title { font-size: 0.95rem; }
          .tv-caption-by { font-size: 9px; }
          .tv-list li { flex-basis: 64%; }
          .tv-thumb { aspect-ratio: 16 / 9; }
        }
      `}</style>
    </section>
  );
}
