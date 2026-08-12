'use client';

import { useState, useEffect } from 'react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInquiries() {
      try {
        const res = await fetch('/api/inquiry');
        const data = await res.json();
        if (data.success) {
          setInquiries(data.inquiries);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadInquiries();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>B2B Inquiry Pipeline</h1>
        <p style={{ opacity: 0.6, fontSize: '.9rem' }}>Track and manage inquiries submitted by international buyers.</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No inquiries submitted yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left', color: '#666' }}>
                <th style={{ padding: '12px 10px' }}>Company &amp; Contact</th>
                <th style={{ padding: '12px 10px' }}>Email &amp; Phone</th>
                <th style={{ padding: '12px 10px' }}>Country</th>
                <th style={{ padding: '12px 10px' }}>Product Interest</th>
                <th style={{ padding: '12px 10px' }}>Message</th>
                <th style={{ padding: '12px 10px' }}>Submitted Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 600 }}>
                    <div>{inq.companyName}</div>
                    <span style={{ fontSize: '.8rem', color: '#888', fontWeight: 400 }}>{inq.contactName}</span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <div>{inq.email}</div>
                    <span style={{ fontSize: '.8rem', color: '#888' }}>{inq.phone || '—'}</span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>{inq.country}</td>
                  <td style={{ padding: '14px 10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '.75rem', fontWeight: 600, background: '#F3ECDD', color: '#2F5233' }}>
                      {inq.productInterest || 'General'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', maxWidth: '280px', opacity: 0.8 }}>
                    {inq.message}
                  </td>
                  <td style={{ padding: '14px 10px', fontSize: '.8rem', color: '#888' }}>
                    {new Date(inq.createdAt).toLocaleDateString()}
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
