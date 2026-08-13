'use client';

import { useTheme } from '@/lib/theme-context';
import { themeContent } from '@/lib/content';
import Link from 'next/link';

export default function HomePage() {
  const { theme } = useTheme();
  const c = themeContent[theme];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,.8)' }}>
              Global Export, Est. Trust
            </span>
            <h1>{c.heroTitle}</h1>
            <p>{c.heroSub}</p>
            <div className="hero-cta">
              <Link href="#products" className="btn btn-primary">
                {c.heroCta1}
              </Link>
              <Link href="#contact" className="btn btn-ghost">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="emblem-wrap">
            <div className="emblem">
              <svg
                className="icon-food"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.3"
              >
                <path d="M12 2C8 6 5 9 5 13a7 7 0 0 0 14 0c0-4-3-7-7-11z" />
                <path d="M12 8v11" strokeLinecap="round" />
              </svg>
              <svg
                className="icon-textile"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.3"
              >
                <circle cx="12" cy="12" r="8" />
                <path
                  d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <div className="trust-bar">
        <div className="wrap">
          <div className="trust-bar-inner">
            <div className="trust-cert-row">
              <span className="trust-cert-label">Certified &amp; Compliant:</span>
              <div className="cert-badge">
                <span style={{ fontSize: '1.4rem' }}>📋</span>
                <span>FSSAI</span>
              </div>
              <div className="cert-badge">
                <span style={{ fontSize: '1.4rem' }}>🌱</span>
                <span>APEDA</span>
              </div>

            </div>
            <div className="logistics-pills">
              <div className="logistics-pill">
                <span className="lp-icon">🚢</span>
                <div className="lp-text">
                  <strong>FOB Indian Ports</strong>
                  <span>CIF Available</span>
                </div>
              </div>
              <div className="logistics-pill">
                <span className="lp-icon">🌍</span>
                <div className="lp-text">
                  <strong>12+ Countries</strong>
                  <span>Active Markets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ABOUT US ===== */}
      <section className="about" id="about" style={{ background: 'var(--bg)', padding: '100px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: '60px', alignItems: 'center', marginBottom: '50px' }}>
            <div className="about-visual" style={{ position: 'relative' }}>
              <div className="tag" style={{ background: 'rgba(255,255,255,.9)', borderRadius: '14px', boxShadow: 'var(--shadow-md)' }}>
                {c.aboutTag}
                <div style={{ fontSize: '.8rem', opacity: 0.7, marginTop: '6px', fontWeight: 500 }}>
                  Est. 2010 • Registered Star Exporter
                </div>
              </div>
            </div>

            <div>
              <span className="eyebrow" style={{ color: 'var(--primary)' }}>
                About RDH Globals — International Trade House
              </span>
              <h2 style={{ fontSize: '2.4rem', marginBottom: '20px', lineHeight: 1.2 }}>
                A premier Indian export house built on uncompromised quality &amp; complete traceability.
              </h2>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, opacity: 0.85, marginBottom: '16px' }}>
                Founded in 2010, <strong>RDH Globals</strong> operates as a leading International Trade House bridging authentic Indian manufacturing with B2B importers, hotel chains, and supermarket distributors across North America, Europe, the Middle East, and Asia-Pacific.
              </p>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.7, opacity: 0.85, marginBottom: '24px' }}>
                {c.aboutP1} {c.aboutP2} We maintain absolute quality control from raw material selection through export container sealing, giving global buyers total peace of mind.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/certifications" className="btn btn-solid" style={{ background: 'var(--primary)', color: '#fff' }}>
                  View Certifications &amp; Licenses →
                </Link>
                <Link href="/brochure" className="btn btn-ghost" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                  Download E-Catalogue
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginTop: '40px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(0,0,0,.08)',
            }}
          >
            <div style={{ background: 'var(--secondary)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🌾</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--primary)' }}>Direct Sourcing</h4>
              <p style={{ fontSize: '.86rem', opacity: 0.75, lineHeight: 1.5 }}>
                Direct partnerships with farming clusters in Bihar &amp; certified textile mills in Gujarat — zero middleman markup.
              </p>
            </div>

            <div style={{ background: 'var(--secondary)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🔬</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--primary)' }}>100% Lab Tested</h4>
              <p style={{ fontSize: '.86rem', opacity: 0.75, lineHeight: 1.5 }}>
                Every batch is NABL lab-tested for moisture, purity, and compliance (FSSAI, APEDA, ISO, OEKO-TEX certified).
              </p>
            </div>

            <div style={{ background: 'var(--secondary)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📦</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--primary)' }}>Private Label &amp; Packaging</h4>
              <p style={{ fontSize: '.86rem', opacity: 0.75, lineHeight: 1.5 }}>
                Custom retail pouches, nitrogen-flushed bags, and hotel linen packaging tailored to your brand specifications.
              </p>
            </div>

            <div style={{ background: 'var(--secondary)', padding: '24px', borderRadius: '14px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🚢</div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px', color: 'var(--primary)' }}>FOB &amp; CIF Global Freight</h4>
              <p style={{ fontSize: '.86rem', opacity: 0.75, lineHeight: 1.5 }}>
                Complete port clearance, Phytosanitary, Certificate of Origin, and ocean container logistics to 12+ countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why">
        <div className="wrap">
          <h2>Why Buyers Choose Us</h2>
          <div className="why-grid">
            {c.why.map((item, i) => (
              <div className="why-card" key={i}>
                <div className="ic">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="products" id="products">
        <div className="wrap">
          <span className="eyebrow">Catalog</span>
          <h2>{c.prodTitle}</h2>
          <p>{c.prodSub}</p>
          <div className="prod-grid">
            {c.defaultProducts.map((name, i) => (
              <div className="prod-card" key={i}>
                <div className="prod-thumb" />
                <div className="label">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process" id="process">
        <div className="wrap">
          <h2>{c.processTitle}</h2>
          <div className="steps">
            {c.steps.map((step, i) => (
              <div className="step" key={i}>
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPORT COUNTRIES ===== */}
      <section className="export" id="export">
        <div className="wrap">
          <span className="eyebrow">Reach</span>
          <h2>Where We Ship</h2>
          <p>Active export relationships across these markets.</p>
          <div className="countries">
            {[
              { flag: '🇺🇸', name: 'USA' },
              { flag: '🇨🇦', name: 'Canada' },
              { flag: '🇦🇪', name: 'UAE' },
              { flag: '🇬🇧', name: 'UK' },
              { flag: '🇦🇺', name: 'Australia' },
              { flag: '🇩🇪', name: 'Germany' },
              { flag: '🇸🇬', name: 'Singapore' },
              { flag: '', name: 'Middle East' },
            ].map((country, i) => (
              <span className="chip" key={i}>
                {country.flag} {country.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testi">
        <div className="wrap">
          {c.testimonials.map((t, i) => (
            <div className="testi-card" key={i}>
              <p className="quote">{t.quote}</p>
              <div className="who">{t.who}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact" id="contact">
        <div className="wrap">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2>Request a Quote</h2>
            <p className="lead">
              Tell us your volume, destination, and timeline — we&apos;ll respond
              with pricing and lead times within one business day.
            </p>
            <div className="contact-info">
              <div>📧 <strong>Primary Export Email:</strong> export@rdhglobals.com</div>
              <div>✉️ <strong>Sales Desk:</strong> sales@rdhglobals.com</div>
              <div>📞 <strong>Phone Desk:</strong> +91 93184 77263</div>
              <div>💬 <strong>WhatsApp Line:</strong> +91 93184 77263</div>
              <div>📍 <strong>Corporate Office:</strong> RDH Globals, SG Highway, Ahmedabad, Gujarat 380054, India</div>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! Your inquiry has been received. We will respond within 1 business day.');
            }}
          >
            <input type="text" placeholder="Company name" required />
            <input type="email" placeholder="Business email" required />
            <input type="text" placeholder="Destination country" required />
            <textarea placeholder="Product interest, quantity, target date" />
            <button
              type="submit"
              className="btn btn-solid"
              style={{ alignSelf: 'flex-start' }}
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
