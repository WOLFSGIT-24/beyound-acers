import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';
import { buildTrackingPayload } from '@/lib/utm-tracker';

/* ─── Reveal ─────────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setOn(true), delay);
          io.unobserve(el);
        }
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : `translateY(${y}px)`,
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface ContactSectionProps {
  onFormSubmit: (data: {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    message: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  submitMessage: string;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function ContactSection({ onFormSubmit, isSubmitting, submitMessage }: ContactSectionProps) {
  const [form, setForm] = useState({ fullName: '', emailAddress: '', phoneNumber: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = buildTrackingPayload();
    await onFormSubmit({
      fullName: form.fullName,
      emailAddress: form.emailAddress,
      phoneNumber: form.phoneNumber,
      message: form.message,
      ...tracking,
    } as any);
    setForm({ fullName: '', emailAddress: '', phoneNumber: '', message: '' });
  };

  /* Shared underline-style input */
  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === field ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)'}`,
    color: '#ffffff',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 300,
    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
    padding: '10px 0 10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    letterSpacing: '0.02em',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '9px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.38)',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Full-bleed background ─────────────────────────────────────── */}
      <Image src="https://static.wixstatic.com/media/cef78c_09c4c71756fa40ed8a1051e1b116ac53~mv2.png" alt="" aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          zIndex: 0,
        }} />

      {/* Cinematic overlay — dark at top and bottom, lighter in centre */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(160deg, rgba(0,20,18,0.88) 0%, rgba(0,30,26,0.65) 50%, rgba(0,20,18,0.82) 100%)',
      }} />
      {/* Left vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to right, rgba(0,15,14,0.55) 0%, transparent 65%)',
      }} />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(72px, 11vh, 120px) clamp(24px, 5vw, 64px) clamp(36px, 5vh, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="cs-grid">

          {/* ── LEFT — editorial headline + info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3.5vh, 32px)' }}>

            {/* Eyebrow */}
            <Reveal delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'block', width: '28px', height: '1px', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                  fontSize: '10px', letterSpacing: '0.26em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                }}>
                  Get In Touch
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={80}>
              <h2 style={{
                fontFamily: "'DM Sans', Roboto, sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                textShadow: '0 4px 48px rgba(0,0,0,0.4)',
              }}>
                LET'S START<br />A<br />CONVERSATION
              </h2>
            </Reveal>

            {/* Rule */}
            <Reveal delay={160}>
              <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.25)' }} />
            </Reveal>

            {/* Body */}
            <Reveal delay={220}>
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: 'clamp(0.875rem, 1vw, 0.95rem)',
                lineHeight: 1.9, color: 'rgba(255,255,255,0.58)',
                maxWidth: '380px',
              }}>
                Interested in owning a plot at Codename: Unstoppable 2.0?
                Our team is ready to walk you through everything — from plot
                selection to investment potential. Reach out and we'll get
                back to you shortly.
              </p>
            </Reveal>

            {/* Contact details */}
            <Reveal delay={300}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' }}>
                {[
                  {
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    ),
                    label: 'Location',
                    value: 'Bengaluru–Mysuru Expressway Corridor, Karnataka',
                  },
                  {
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: 'Email',
                    value: 'info@beyondacres.com',
                  },
                  {
                    icon: (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                      </svg>
                    ),
                    label: 'Phone',
                    value: '+91 98765 43210',
                  },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ flexShrink: 0, marginTop: '2px' }}>{c.icon}</span>
                    <div>
                      <span style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 500,
                        fontSize: '9px', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                        display: 'block', marginBottom: '2px',
                      }}>
                        {c.label}
                      </span>
                      <span style={{
                        fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                        fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)',
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.5,
                      }}>
                        {c.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — luxury enquiry form ── */}
          <Reveal delay={120} y={32}>
            <div style={{
              background: 'rgba(0,20,18,0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 'clamp(28px, 4vw, 48px)',
            }}>

              {/* Form header */}
              <div style={{ marginBottom: 'clamp(24px, 3.5vh, 36px)' }}>
                <h3 style={{
                  fontFamily: "'DM Sans', Roboto, sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.015em',
                  color: '#ffffff',
                  marginBottom: '8px',
                }}>
                  Enquire Now
                </h3>
                <p style={{
                  fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                  fontSize: '11px', letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.35)',
                }}>
                  Our team will respond within 24 hours
                </p>
              </div>

              {/* Success / error */}
              {submitMessage && (
                <div style={{
                  marginBottom: '24px',
                  padding: '12px 16px',
                  background: submitMessage.includes('appreciate')
                    ? 'rgba(0,180,90,0.12)' : 'rgba(200,50,50,0.12)',
                  border: `1px solid ${submitMessage.includes('appreciate')
                    ? 'rgba(0,180,90,0.25)' : 'rgba(200,50,50,0.25)'}`,
                  fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                  fontSize: '13px', color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                }}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.8vh, 26px)' }}>

                {/* Full Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Your full name"
                    style={inputStyle('name')}
                  />
                </div>

                {/* Email + Phone — side by side on wider screens */}
                <div className="cs-form-row">
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.emailAddress}
                      onChange={e => setForm({ ...form, emailAddress: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      style={inputStyle('email')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phoneNumber}
                      onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                      placeholder="+91 00000 00000"
                      style={inputStyle('phone')}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message (Optional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('msg')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your requirements..."
                    style={{
                      ...inputStyle('msg'),
                      resize: 'none',
                      borderBottom: `1px solid ${focused === 'msg' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.22)'}`,
                    }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cs-submit-btn"
                  style={{
                    width: '100%',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(10px, 1.1vw, 12px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#003539',
                    background: isSubmitting ? 'rgba(255,255,255,0.75)' : '#ffffff',
                    border: 'none',
                    padding: 'clamp(14px, 2vh, 18px) 32px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                    marginTop: '4px',
                  }}
                  onMouseEnter={e => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.88)';
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = isSubmitting ? 'rgba(255,255,255,0.75)' : '#ffffff';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                  {!isSubmitting && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  )}
                </button>

              </form>

              {/* Privacy note */}
              <p style={{
                fontFamily: 'Roboto, sans-serif', fontWeight: 300,
                fontSize: '10px', letterSpacing: '0.06em',
                color: 'rgba(255,255,255,0.22)',
                marginTop: '16px', textAlign: 'center', lineHeight: 1.6,
              }}>
                Your information is kept strictly confidential and will never be shared.
              </p>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Bottom info bar ───────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(0,15,14,0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          padding: 'clamp(16px, 2.5vh, 22px) clamp(24px, 5vw, 64px)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
        }}>
          <span style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 400,
            fontSize: '10px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          }}>
            Codename: Unstoppable 2.0
          </span>
          <span style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 300,
            fontSize: '10px', letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
          }}>
            Bengaluru–Mysuru Expressway · 3 mins from Payana Museum · Karnataka
          </span>
        </div>
      </div>

      <style>{`
        /* Two-column layout */
        .cs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 96px);
          align-items: center;
          flex: 1;
        }
        /* Email + phone side by side */
        .cs-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2.5vw, 28px);
        }
        /* Placeholder colour */
        .cs-grid input::placeholder,
        .cs-grid textarea::placeholder {
          color: rgba(255,255,255,0.28);
          font-weight: 300;
        }
        /* Mobile */
        @media (max-width: 860px) {
          .cs-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(36px, 6vh, 52px) !important;
          }
          .cs-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
