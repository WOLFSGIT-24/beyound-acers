import { MapPin, Phone, Mail } from 'lucide-react';
import { Image } from '@/components/ui/image';

function scrollTo(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

const quickLinks = [
  { label: 'About The Project', href: '#about'          },
  { label: 'Key Features',      href: '#key-features'   },
  { label: 'Plot Offerings',    href: '#plot-offerings'  },
  { label: 'Neighbourhood',     href: '#neighbourhood'  },
  { label: 'Amenities',         href: '#amenities'       },
  { label: 'Sustainability',    href: '#sustainability'  },
  { label: 'Gallery',           href: '#gallery'         },
  { label: 'Contact',           href: '#contact'         },
];

export default function Footer() {
  return (
    <footer style={{ background: '#003539', color: '#fff' }}>

      {/* ── Main footer body ─────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-10 lg:gap-10">

          {/* ── Col 1: Brand ─────────────────────────────────────────── */}
          <div className="space-y-6">
            <Image src="https://static.wixstatic.com/media/cef78c_dab6f418d455446ebbb520dc3f38e1fa~mv2.png" alt="Beyond Acres" style={{ height: '72px', width: 'auto' }} />
            <p className="font-paragraph font-light text-white/60 leading-[1.8]"
              style={{ fontSize: '13px' }}>
              Karnataka's First Biodiversity-Led<br />
              Riverfront Township.<br />
              Bengaluru–Mysuru Expressway Corridor.
            </p>
            {/* RERA */}
            <div className="pt-2 space-y-1">
              <p className="font-paragraph font-medium text-white/40 tracking-[0.15em] uppercase"
                style={{ fontSize: '10px' }}>
                RERA Registration
              </p>
              <p className="font-paragraph font-light text-white/70 break-all"
                style={{ fontSize: '12px' }}>
                PRM/KA/RERA/1267/374/PR/230626/008745
              </p>
            </div>
          </div>

          {/* ── Col 2: Quick Links ───────────────────────────────────── */}
          <div className="space-y-5">
            <h4 className="font-paragraph font-medium tracking-[0.2em] uppercase text-white/40"
              style={{ fontSize: '10px' }}>
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-paragraph font-light text-white/65 hover:text-white
                    transition-colors duration-200"
                  style={{ fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Project Highlights ────────────────────────────── */}
          <div className="space-y-5">
            <h4 className="font-paragraph font-medium tracking-[0.2em] uppercase text-white/40"
              style={{ fontSize: '10px' }}>
              Project Highlights
            </h4>
            <div className="flex flex-col gap-3">
              {[
                '21 Acres Eco-Engineered Township',
                '331 Exclusive Premium Plots',
                '60+ Lifestyle Amenities',
                '100% Underground Utilities',
                'Riverfront Along the Kaveri',
                '90 Mins from Bengaluru',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-white/25 mt-1 flex-shrink-0" style={{ fontSize: '10px' }}>→</span>
                  <span className="font-paragraph font-light text-white/65"
                    style={{ fontSize: '13px' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 4: Contact ───────────────────────────────────────── */}
          <div className="space-y-5">
            <h4 className="font-paragraph font-medium tracking-[0.2em] uppercase text-white/40"
              style={{ fontSize: '10px' }}>
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-white/35 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-paragraph font-light text-white/65"
                    style={{ fontSize: '13px' }}>
                    +91 98869 26767
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-white/35 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph font-light text-white/65"
                  style={{ fontSize: '13px' }}>
                  info@beyondacres.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-white/35 flex-shrink-0 mt-0.5" />
                <p className="font-paragraph font-light text-white/65 leading-relaxed"
                  style={{ fontSize: '13px' }}>
                  Bengaluru–Mysuru Expressway Corridor,<br />
                  Karnataka, India
                </p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              className="font-paragraph font-semibold uppercase tracking-[0.14em] text-white
                transition-all duration-300 hover:opacity-85 active:scale-95 mt-2"
              style={{
                fontSize: '11px',
                padding: '11px 24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Book Virtual Tour
            </button>
          </div>

        </div>
      </div>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-6 md:px-8 py-6">
          <p className="font-paragraph font-light text-white/35 leading-[1.75]"
            style={{ fontSize: '11px' }}>
            <strong className="font-medium text-white/45">Disclaimer: </strong>
            The information herein i.e., master plan, specifications, dimensions, etc., are subject to change
            without notification as may be required by the relevant authorities or the developers and cannot
            form part of an offer or contract. Whilst every care is taken in providing this information, the
            developer and the managers cannot be held liable for variations. The items are subject to
            variations, modifications and substitutions as may be recommended by the company's relevant
            approving authority.
          </p>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container mx-auto px-6 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo — stacked: "Powered by" on top, logo below */}
          <div className="flex flex-col items-center sm:items-start flex-shrink-0" style={{ gap: '3px' }}>
            <span className="font-paragraph font-light text-white/35" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Powered by</span>
            <Image
              src="https://static.wixstatic.com/media/cef78c_5e50ffabd6224c0da03aadf6fcde6666~mv2.png"
              alt="Flow Logo"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          {/* Copyright center */}
          <p className="font-paragraph font-light text-white/35 text-center flex-1 order-last sm:order-none" style={{ fontSize: '12px', margin: 0 }}>
            © 2026 Beyond Acres. All rights reserved.
          </p>
          {/* Links */}
          <div className="flex gap-4 sm:gap-6 flex-shrink-0">
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a key={label} href="#"
                className="font-paragraph font-light text-white/35 hover:text-white/60
                  transition-colors duration-200"
                style={{ fontSize: '11px' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
