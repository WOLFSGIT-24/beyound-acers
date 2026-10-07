import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Image } from '@/components/ui/image';


const navLinks = [
  { label: 'About',          href: '#about'          },
  { label: 'Why Riverine',   href: '#why-mysuru'     },
  { label: 'Location',       href: '#location'        },
  { label: 'Amenities',      href: '#amenities'       },
  { label: 'Sustainability', href: '#sustainability'  },
  { label: 'Gallery',        href: '#gallery'         },
  { label: 'FAQ',            href: '#faq'             },
];

function scrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const headerH = 72;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function Header({ onOpenPopup, onOpenBrochure }: { onOpenPopup: () => void; onOpenBrochure?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pastHero, setPastHero]     = useState(false);
  const [hidden, setHidden]         = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let heroHeight = 0;
    let ticking = false;

    // Measure hero height once it's available
    const measureHero = () => {
      const heroEl = document.querySelector('.hero-section') as HTMLElement | null;
      if (heroEl) {
        heroHeight = heroEl.offsetHeight - 80;
      } else {
        heroHeight = window.innerHeight - 80;
      }
    };

    // Get current scroll position
    const getScrollY = (): number => {
      return window.scrollY || window.pageYOffset || 0;
    };

    // Delay initial measurement to ensure hero is rendered
    const measureTimeout = setTimeout(measureHero, 100);

    const update = () => {
      const currentY = getScrollY();

      // Re-measure hero if we haven't got a valid value yet
      if (heroHeight <= 0) measureHero();

      const isPastHero = currentY > heroHeight;
      setPastHero(isPastHero);

      // Only hide/show after passing the hero
      if (isPastHero) {
        // Scrolling down → hide, scrolling up → show
        if (currentY > lastScrollY.current + 5) {
          setHidden(true);
        } else if (lastScrollY.current - currentY > 5) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Listen on window scroll only
    window.addEventListener('scroll', onScroll, { passive: true });

    // After a brief delay, do an initial state check
    const initTimeout = setTimeout(() => {
      measureHero();
      update();
    }, 200);

    return () => {
      clearTimeout(measureTimeout);
      clearTimeout(initTimeout);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out"
      style={{
        background: pastHero ? '#ffffff' : 'transparent',
        borderBottom: pastHero ? '1px solid rgba(0,53,57,0.08)' : '1px solid transparent',
        boxShadow: pastHero ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex-shrink-0 bg-none border-none cursor-pointer p-0">
            <Image src='https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png'
              alt="Beyond Acres" style={{
                height: 'clamp(48px, 5.5vw, 68px)',
                width: 'auto',
                transition: 'all 0.4s ease',
                filter: pastHero ? 'none' : 'brightness(0) invert(1)',
              }} />
          </button>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-paragraph font-medium tracking-wide transition-colors duration-300"
                style={{
                  fontSize: '12.5px',
                  color: pastHero ? 'rgba(33,37,41,0.75)' : 'rgba(255,255,255,0.88)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = pastHero ? '#003539' : '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = pastHero ? 'rgba(33,37,41,0.75)' : 'rgba(255,255,255,0.88)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── CTA + mobile toggle ───────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            {/* Download Brochure — ghost button, desktop only */}
            <button
              onClick={onOpenBrochure ?? onOpenPopup}
              className="hidden lg:flex items-center gap-2 font-paragraph font-semibold uppercase tracking-[0.13em]
                transition-all duration-300 active:scale-95"
              style={{
                fontSize: '11px',
                padding: '9px 18px',
                background: 'transparent',
                color: pastHero ? '#003539' : 'rgba(255,255,255,0.88)',
                border: pastHero ? '1px solid rgba(0,53,57,0.35)' : '1px solid rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = pastHero ? 'rgba(0,53,57,0.07)' : 'rgba(255,255,255,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {/* Download icon */}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Brochure
            </button>

            <button
              onClick={onOpenPopup}
              className="hidden md:block font-paragraph font-semibold uppercase tracking-[0.14em]
                transition-all duration-300 hover:opacity-90 active:scale-95"
              style={{
                fontSize: '11px',
                padding: '10px 22px',
                background: '#003539',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Book Virtual Tour
            </button>

            {/* Mobile: Download Brochure button beside menu */}
            <button
              onClick={onOpenBrochure ?? onOpenPopup}
              className="md:hidden p-2 transition-colors duration-300"
              style={{ color: pastHero ? '#003539' : '#ffffff' }}
              aria-label="Download Brochure"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen(v => !v)}
              className="lg:hidden p-2 transition-colors duration-300"
              style={{ color: pastHero ? '#003539' : '#ffffff' }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: isMenuOpen ? '480px' : '0px',
          background: '#ffffff',
          borderTop: isMenuOpen ? '1px solid rgba(0,53,57,0.08)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 py-5 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => { scrollTo(link.href); setIsMenuOpen(false); }}
              className="text-left font-paragraph font-medium text-foreground/75 hover:text-primary
                transition-colors duration-200 py-3 border-b border-foreground/[0.06] last:border-0"
              style={{ fontSize: '13px', background: 'none', cursor: 'pointer' }}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-3 flex gap-2.5">
            <button
              onClick={() => { onOpenPopup(); setIsMenuOpen(false); }}
              className="flex-1 font-paragraph font-semibold uppercase tracking-[0.14em] text-white
                transition-all duration-300 hover:opacity-90"
              style={{ fontSize: '11px', padding: '12px', background: '#003539' }}
            >
              Book Virtual Tour
            </button>
            <button
              onClick={() => { (onOpenBrochure ?? onOpenPopup)(); setIsMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 font-paragraph font-semibold uppercase tracking-[0.13em]
                transition-all duration-300 hover:bg-primary/10"
              style={{
                fontSize: '11px',
                padding: '12px',
                background: 'transparent',
                color: '#003539',
                border: '1px solid rgba(0,53,57,0.35)',
                cursor: 'pointer',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Brochure
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
