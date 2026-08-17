'use client';

import { useTheme } from '@/lib/theme-context';
import { themeContent } from '@/lib/content';
import Link from 'next/link';

export default function BrochurePage() {
  const { theme } = useTheme();
  const c = themeContent[theme];

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="eyebrow">RDH Globals E-Catalogue</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Export Product Brochure</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto' }}>
          Interactive digital catalogue for B2B buyers and international procurement partners.
        </p>
      </div>

      {/* Interactive Brochure Frame Container */}
      <div
        style={{
          background: 'var(--secondary)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(0,0,0,.08)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '50px',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            minHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,.06)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,.08)', paddingBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)' }}>RDH Globals — {theme === 'food' ? 'Food Division' : 'Home Textile Division'}</h2>
              <span style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Catalog Issue 2026-2027 • Standard Specification</span>
            </div>
            <span className="chip" style={{ background: 'var(--primary)', color: '#fff' }}>Verified Exporter</span>
          </div>

          <div style={{ margin: '30px 0' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Catalog Highlights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {c.defaultProducts.map((item, idx) => (
                <div key={idx} style={{ padding: '14px 18px', background: 'var(--secondary)', borderRadius: '10px', fontSize: '.9rem', fontWeight: 600 }}>
                  🔹 {typeof item === 'string' ? item : item.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,.08)' }}>
            <span style={{ fontSize: '.84rem', color: 'var(--text-muted)' }}>FSSAI • APEDA </span>
            <button
              className="btn btn-solid"
              onClick={() => alert('Brochure PDF download started. (RDH-Globals-2026-Catalog.pdf)')}
            >
              📥 Download PDF Brochure
            </button>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/products" className="btn btn-primary" style={{ background: 'var(--primary)', color: '#fff' }}>
          Explore Full Online Catalog
        </Link>
        <Link href="/home#contact" className="btn btn-ghost" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
          Request Custom Sample Kit →
        </Link>
      </div>
    </div>
  );
}
