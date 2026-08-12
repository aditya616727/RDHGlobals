'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ productsCount: 0, foodCount: 0, textileCount: 0, inquiriesCount: 0 });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const prodRes = await fetch('/api/products');
        const prodData = await prodRes.json();
        if (prodData.success) {
          const prods = prodData.products;
          setStats((prev) => ({
            ...prev,
            productsCount: prods.length,
            foodCount: prods.filter((p: any) => p.category === 'food').length,
            textileCount: prods.filter((p: any) => p.category === 'textile').length,
          }));
        }

        const inqRes = await fetch('/api/inquiry');
        const inqData = await inqRes.json();
        if (inqData.success) {
          setStats((prev) => ({ ...prev, inquiriesCount: inqData.inquiries.length }));
          setRecentInquiries(inqData.inquiries.slice(0, 5));
        }
      } catch (e) {
        console.error('Error loading admin stats:', e);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Admin Dashboard</h1>
          <p style={{ opacity: 0.6, fontSize: '.9rem' }}>Overview of catalog products and incoming buyer leads.</p>
        </div>
        <Link
          href="/admin/products/new"
          style={{
            background: '#1B2A4A',
            color: '#fff',
            padding: '12px 22px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '.9rem',
          }}
        >
          + Add New Export Product
        </Link>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize: '.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '.05em' }}>Total Active Products</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1B2A4A', marginTop: '6px' }}>{stats.productsCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize: '.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '.05em' }}>Food Items (Makhana)</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#2F5233', marginTop: '6px' }}>{stats.foodCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize: '.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '.05em' }}>Home Textile Items</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#1B2A4A', marginTop: '6px' }}>{stats.textileCount}</div>
        </div>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
          <div style={{ fontSize: '.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '.05em' }}>Total Buyer Inquiries</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#C9A227', marginTop: '6px' }}>{stats.inquiriesCount}</div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Recent Buyer Inquiries</h2>
          <Link href="/admin/inquiries" style={{ fontSize: '.85rem', color: '#1B2A4A', fontWeight: 600 }}>
            View All Pipelines →
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#888', fontSize: '.9rem' }}>
            No buyer inquiries logged yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left', color: '#666' }}>
                <th style={{ padding: '12px 10px' }}>Company</th>
                <th style={{ padding: '12px 10px' }}>Email</th>
                <th style={{ padding: '12px 10px' }}>Country</th>
                <th style={{ padding: '12px 10px' }}>Product Interest</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600 }}>{inq.companyName}</td>
                  <td style={{ padding: '12px 10px' }}>{inq.email}</td>
                  <td style={{ padding: '12px 10px' }}>{inq.country}</td>
                  <td style={{ padding: '12px 10px' }}>{inq.productInterest || 'General'}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '.75rem', fontWeight: 600, background: '#E3F2FD', color: '#0D47A1' }}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
