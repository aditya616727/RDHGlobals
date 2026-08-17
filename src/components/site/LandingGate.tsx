'use client';

import { useTheme } from '@/lib/theme-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingGate() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function enterSite(theme: 'food' | 'textile') {
    setTheme(theme);
    router.push('/home');
  }

  function smoothScroll(id: string) {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="intro-screen" id="intro-screen">
      {/* Premium Header */}
      <header className={`landing-header${scrolled ? ' landing-header--scrolled' : ''}`}>
        <div className="landing-header__inner">
          <Link href="/" className="landing-header__logo">
            <Image
              src="/images/logo.jpeg"
              alt="RDH Globals Logo"
              width={150}
              height={42}
              style={{ objectFit: 'contain', borderRadius: '6px' }}
              priority
            />
          </Link>

          <nav className="landing-header__nav" role="navigation">
            <button className="landing-nav__link" onClick={() => smoothScroll('about-us-landing')}>About</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-trust-section')}>Why Us</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-choose-section')}>Divisions</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-footer-section')}>Contact</button>
          </nav>

          <div className="landing-header__actions">
            <a href="mailto:export@rdhglobals.com" className="landing-header__cta">
              <span className="landing-header__cta-icon">✉</span>
              Get a Quote
            </a>
            <a
              href="https://wa.me/919877118868?text=Hello%20RDH%20Globals%2C%20I%27m%20interested%20in%20your%20export%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-header__wa"
              aria-label="WhatsApp"
            >
              💬
            </a>
          </div>

          <button
            className={`landing-header__burger${mobileNavOpen ? ' open' : ''}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileNavOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileNavOpen && (
          <div className="landing-header__mobile-menu">
            <button className="landing-nav__link" onClick={() => smoothScroll('about-us-landing')}>About</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-trust-section')}>Why Us</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-choose-section')}>Divisions</button>
            <button className="landing-nav__link" onClick={() => smoothScroll('intro-footer-section')}>Contact</button>
            <a href="mailto:export@rdhglobals.com" className="landing-header__cta" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
              <span className="landing-header__cta-icon">✉</span>
              Get a Quote
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="intro-hero">
        <div className="intro-eyebrow">RDH Globals — International Trade House</div>
        <h1>Crafted on Trust. Defined by Excellence. Trusted Worldwide.</h1>
        <p>
          We export Makhana (fox nuts) and home textiles to buyers across 12+
          countries, backed by government licensing, third-party quality checks,
          and a track record of on-time shipments.
        </p>
      </div>

      {/* Stats */}
      <div className="intro-stats">
        <div className="intro-stat">
          <div className="num">15+</div>
          <div className="lbl">Years of Experience</div>
        </div>
        <div className="intro-stat">
          <div className="num">12+</div>
          <div className="lbl">Countries Served</div>
        </div>
        <div className="intro-stat">
          <div className="num">500+</div>
          <div className="lbl">Shipments Delivered</div>
        </div>
        <div className="intro-stat">
          <div className="num">100%</div>
          <div className="lbl">Batches Quality-Tested</div>
        </div>
      </div>

      {/* About Us & Company Contact Details Section */}
      <div id="about-us-landing" style={{ maxWidth: '1000px', margin: '0 auto 70px', padding: '0 24px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: '20px', padding: '40px 36px', boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
          <div style={{ fontSize: '.75rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#2F5233', fontWeight: 700, marginBottom: '12px' }}>
            About RDH Globals — International Trade House
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', color: '#1F1F1F', marginBottom: '16px', lineHeight: 1.25 }}>
            Connecting Authentic Indian Production to Global B2B Markets
          </h2>
          <p style={{ fontSize: '.98rem', color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>
            <strong>RDH Globals</strong> is a premier Indian export house operating two specialized core divisions: <strong>Food Products (Makhana / Fox Nuts)</strong> and <strong>Home Textiles (Luxury Linens &amp; Hospitality Bedding)</strong>.
          </p>
          <p style={{ fontSize: '.98rem', color: '#555', lineHeight: 1.7, marginBottom: '24px' }}>
            Operating with complete farm-to-container traceability and certified quality compliance (FSSAI, APEDA), we manage end-to-end customs clearance, lab testing, private labeling, and ocean freight logistics to 12+ international destinations.
          </p>

          {/* Full Company Contact & Registration Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,.08)', fontSize: '.88rem', color: '#333' }}>
            <div>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#2F5233', fontWeight: 700, marginBottom: '6px' }}>
                📍 Corporate Office
              </div>
              <div>RDH Globals Trade House</div>
              <div style={{ opacity: 0.75 }}>SG Highway, Ahmedabad, Gujarat 380054, India</div>
            </div>

            <div>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#2F5233', fontWeight: 700, marginBottom: '6px' }}>
                📧 Direct Export Emails
              </div>
              <div><a href="mailto:export@rdhglobals.com" style={{ color: '#2F5233', fontWeight: 600, textDecoration: 'none' }}>export@rdhglobals.com</a></div>
              <div><a href="mailto:sales@rdhglobals.com" style={{ color: '#555', textDecoration: 'none' }}>sales@rdhglobals.com</a></div>
            </div>

            <div>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#2F5233', fontWeight: 700, marginBottom: '6px' }}>
                📞 Phone &amp; WhatsApp Desk
              </div>
              <div><a href="tel:+919877118868" style={{ color: '#2F5233', fontWeight: 600, textDecoration: 'none' }}>+91 98771 18868</a></div>
              <div><a href="tel:+919991036618" style={{ color: '#2F5233', fontWeight: 600, textDecoration: 'none' }}>+91 99910 36618</a></div>
              <div style={{ opacity: 0.75 }}>💬 WhatsApp B2B Export Line</div>
            </div>

            <div>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#2F5233', fontWeight: 700, marginBottom: '6px' }}>
                🏛️ Registrations &amp; Licensing
              </div>
              <div style={{ opacity: 0.85 }}>IEC: <strong>0510XXXXXX</strong></div>
              <div style={{ opacity: 0.85 }}>APEDA / FSSAI</div>
            </div>
          </div>
        </div>
        {/* Division Chooser */}
        <div className="intro-choose" id="intro-choose-section" style={{ marginTop: '40px', background: '#fff', border: '1px solid rgba(0,0,0,.08)', borderRadius: '20px', padding: '40px 36px', boxShadow: '0 4px 20px rgba(0,0,0,.04)' }} >
          <h2 className="intro-question">What are you looking for?</h2>
          <p className="intro-sub">
            Choose a category — the site adapts fully to that division.
          </p>
          <div className="intro-cards">
            <div
              className="intro-card food-card"
              onClick={() => enterSite('food')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && enterSite('food')}
            >
              <div className="ic">🌿</div>
              <h3>Food Products</h3>
              <p>
                Makhana &amp; agricultural exports, graded for premium
                international buyers.
              </p>
              <span className="go">Enter Food Products →</span>
            </div>
            <div
              className="intro-card textile-card"
              onClick={() => enterSite('textile')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && enterSite('textile')}
            >
              <div className="ic">🧵</div>
              <h3>Home Textiles</h3>
              <p>
                Bedsheets &amp; premium linens, woven for hospitality and
                retail markets.
              </p>
              <span className="go">Enter Home Textiles →</span>
            </div>
          </div>
          <div className="intro-footer-note" style={{ marginBottom: '40px' }}>
            You can switch categories anytime from the site header.
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="intro-trust" id="intro-trust-section">
        <div className="intro-trust-head">
          <h2>Why global buyers trust RDH Globals</h2>
          <p>
            Licensing, quality control, and logistics — handled the same way for
            every order.
          </p>
        </div>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="ic">📜</div>
            <h3>Licensed &amp; Compliant</h3>
            <p>
              Registered exporter with valid government export licensing and
              category-specific compliance for food and textile trade.
            </p>
          </div>
          <div className="trust-card">
            <div className="ic">🔍</div>
            <h3>Verified Quality</h3>
            <p>
              Every batch is lab-tested or inspected before packing, with quality
              reports available on request.
            </p>
          </div>
          <div className="trust-card">
            <div className="ic">🚢</div>
            <h3>Dependable Logistics</h3>
            <p>
              End-to-end documentation and freight handling, with a single point
              of contact from order to port.
            </p>
          </div>
        </div>
      </div>

      {/* Certification Badges */}
      <div className="badge-strip">
        <span className="badge">✓ FSSAI Licensed</span>
        <span className="badge">✓ APEDA Registered</span>
      </div>





      {/* Landing Gate Footer */}
      <footer id="intro-footer-section" style={{ background: '#162544', color: '#fff', padding: '50px 0 28px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ maxWidth: '300px' }}>
            <Image
              src="/images/logo.jpeg"
              alt="RDH Globals Logo"
              width={160}
              height={45}
              style={{ objectFit: 'contain', borderRadius: '4px', filter: 'brightness(1.1)' }}
            />
            <p style={{ fontSize: '.84rem', opacity: .75, marginTop: '12px', lineHeight: 1.6 }}>
              <strong>RDH Globals — International Trade House</strong><br />
              Premier Indian Exporter of Premium Makhana &amp; Luxury Home Textiles.
            </p>
            <div style={{ fontSize: '.8rem', opacity: .7, marginTop: '14px', lineHeight: 1.5 }}>
              📍 SG Highway, Ahmedabad, Gujarat 380054, India
            </div>
          </div>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: .6, marginBottom: '12px', fontWeight: 600 }}>
                Direct Contact
              </div>
              <a href="tel:+919877118868" style={{ display: 'block', color: '#fff', fontSize: '.85rem', fontWeight: 600, textDecoration: 'none', marginBottom: '8px' }}>
                📞 +91 98771 18868
              </a>
              <a href="tel:+919991036618" style={{ display: 'block', color: '#fff', fontSize: '.85rem', fontWeight: 600, textDecoration: 'none', marginBottom: '8px' }}>
                📞 +91 99910 36618
              </a>
              <a href="https://wa.me/919877118868" target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: '#25D366', fontSize: '.85rem', textDecoration: 'none', marginBottom: '8px' }}>
                💬 WhatsApp B2B Line
              </a>
              <a href="mailto:export@rdhglobals.com" style={{ display: 'block', color: 'rgba(255,255,255,.8)', fontSize: '.85rem', textDecoration: 'none', marginBottom: '6px' }}>
                📧 export@rdhglobals.com
              </a>
              <a href="mailto:sales@rdhglobals.com" style={{ display: 'block', color: 'rgba(255,255,255,.8)', fontSize: '.85rem', textDecoration: 'none' }}>
                ✉️ sales@rdhglobals.com
              </a>
            </div>

            <div>
              <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: .6, marginBottom: '12px', fontWeight: 600 }}>
                Export Licenses
              </div>
              <div style={{ fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>IEC: 0510XXXXXX</div>
              <div style={{ fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>APEDA Reg Exporter</div>
              <div style={{ fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>FSSAI Lic. 1002005100XXXX</div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1000px', margin: '30px auto 0', padding: '20px 24px 0', borderTop: '1px solid rgba(255,255,255,.1)', fontSize: '.78rem', opacity: .55, textAlign: 'center' }}>
          © 2026 RDH Globals — International Trade House. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
