'use client';

import { useTheme } from '@/lib/theme-context';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <div className="nav">
          <Link href="/home" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/images/logo.jpeg"
              alt="RDH Globals"
              width={150}
              height={40}
              style={{ objectFit: 'contain', borderRadius: '4px' }}
              priority
            />
          </Link>

          <nav className="nav-links" role="navigation">
            <Link href="/home#about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/brochure">E-Catalogue</Link>
            <Link href="/certifications">Certifications</Link>
            <Link href="/blog">Insights</Link>
            <Link href="/home#contact">Contact</Link>
            <Link href="/admin" style={{ color: 'var(--primary)', fontWeight: 600 }}>Admin Portal</Link>
          </nav>

          <div className="toggle">
            <button
              className={theme === 'food' ? 'active' : ''}
              onClick={() => setTheme('food')}
            >
              🌿 Food
            </button>
            <button
              className={theme === 'textile' ? 'active' : ''}
              onClick={() => setTheme('textile')}
            >
              🧵 Textiles
            </button>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav
            className="nav-links"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 28px',
              background: '#fff',
              borderTop: '1px solid rgba(0,0,0,.06)',
              gap: '16px',
            }}
            role="navigation"
          >
            <Link href="/home#about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/products" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/brochure" onClick={() => setMobileOpen(false)}>E-Catalogue</Link>
            <Link href="/certifications" onClick={() => setMobileOpen(false)}>Certifications</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)}>Insights</Link>
            <Link href="/home#contact" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} style={{ color: 'var(--primary)' }}>Admin Portal</Link>
          </nav>
        )}
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap">
          <div style={{ maxWidth: '320px' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Image
                src="/images/logo.jpeg"
                alt="RDH Globals Logo"
                width={160}
                height={45}
                style={{ objectFit: 'contain', borderRadius: '4px', filter: 'brightness(1.1)' }}
              />
            </div>
            <p style={{ opacity: .7, fontSize: '.85rem', marginTop: '14px', lineHeight: 1.6 }}>
              <strong>RDH Globals — International Trade House</strong><br />
              Bridging authentic Indian agricultural &amp; home textile production to global B2B procurement.
            </p>
            <div style={{ marginTop: '16px', fontSize: '.8rem', opacity: .7, lineHeight: 1.6 }}>
              📍 <strong>Corporate Office:</strong><br />
              SG Highway, Ahmedabad, Gujarat 380054, India
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Company</h4>
              <Link href="/home#about">About Us</Link>
              <Link href="/certifications">Certifications</Link>
              <Link href="/home#export">Export Markets</Link>
              <Link href="/calculator">Cost Calculator</Link>
              <Link href="/admin">Admin Portal</Link>
            </div>

            <div className="footer-col">
              <h4>Products &amp; Catalog</h4>
              <Link href="/products?category=food" onClick={() => setTheme('food')}>Makhana &amp; Food</Link>
              <Link href="/products?category=textile" onClick={() => setTheme('textile')}>Home Textiles</Link>
              <Link href="/brochure">E-Catalogue Flipbook</Link>
              <Link href="/blog">Market Insights</Link>
            </div>

            <div className="footer-col">
              <h4>Direct Contact</h4>
              <a href="tel:+919877118868" style={{ fontWeight: 600, color: '#fff' }}>📞 +91 98771 18868</a>
              <a href="tel:+919991036618" style={{ fontWeight: 600, color: '#fff' }}>📞 +91 99910 36618</a>
              <a href="https://wa.me/919877118868" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>💬 WhatsApp Export Desk</a>
              <a href="mailto:export@rdhglobals.com">📧 export@rdhglobals.com</a>
              <a href="mailto:sales@rdhglobals.com">✉️ sales@rdhglobals.com</a>
            </div>

            <div className="footer-col">
              <h4>Compliance</h4>
              <span style={{ display: 'block', fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>IEC Code: 0510XXXXXX</span>
              <span style={{ display: 'block', fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>FSSAI: 1002005100XXXX</span>
              <span style={{ display: 'block', fontSize: '.82rem', opacity: .7, marginBottom: '6px' }}>APEDA Registered Exporter</span>
            </div>
          </div>
        </div>
        <div className="wrap fine">© 2026 RDH Globals — International Trade House. All rights reserved.</div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919800000000?text=Hello%20RDH%20Globals%2C%20I%27m%20interested%20in%20your%20export%20products"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp with RDH Globals Export Desk"
        title="Chat with RDH Globals Export Desk"
      >
        💬
      </a>
    </>
  );
}
