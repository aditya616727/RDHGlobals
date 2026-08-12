'use client';

import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F4F5F7', color: '#1A1A1A' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          background: '#1B2A4A',
          color: '#fff',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '.02em' }}>
              RDH Globals
            </div>
            <div style={{ fontSize: '.72rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '2px' }}>
              Admin Management Portal
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link
              href="/admin"
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '.9rem',
                fontWeight: 500,
                background: 'rgba(255,255,255,.08)',
              }}
            >
              📊 Dashboard Overview
            </Link>
            <Link
              href="/admin/products"
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              📦 Product Management
            </Link>
            <Link
              href="/admin/products/new"
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              ➕ Add New Product
            </Link>
            <Link
              href="/admin/inquiries"
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '.9rem',
                fontWeight: 500,
              }}
            >
              📩 B2B Inquiry Pipeline
            </Link>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: '16px' }}>
          <Link
            href="/home"
            style={{
              color: 'rgba(255,255,255,.7)',
              fontSize: '.85rem',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            ← Return to Public Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>{children}</main>
    </div>
  );
}
