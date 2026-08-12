'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error('Error fetching admin products:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to archive this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadProducts();
      }
    } catch (e) {
      console.error('Error deleting product:', e);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Product Management</h1>
          <p style={{ opacity: 0.6, fontSize: '.9rem' }}>Add, edit, and organize export catalog items.</p>
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
          + Add New Product
        </Link>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,.05)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading catalog products...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>No products found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left', color: '#666' }}>
                <th style={{ padding: '12px 10px' }}>Product Name</th>
                <th style={{ padding: '12px 10px' }}>Category</th>
                <th style={{ padding: '12px 10px' }}>Subcategory</th>
                <th style={{ padding: '12px 10px' }}>Grade / Spec</th>
                <th style={{ padding: '12px 10px' }}>MOQ</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {p.images && p.images[0] && (
                        <img src={p.images[0].url} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                      )}
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '.75rem', fontWeight: 600, background: p.category === 'food' ? '#E8F5E9' : '#E3F2FD', color: p.category === 'food' ? '#2E7D32' : '#1565C0' }}>
                      {p.category.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', color: '#666' }}>{p.subcategory || '—'}</td>
                  <td style={{ padding: '14px 10px', color: '#666' }}>{p.gradeInfo || '—'}</td>
                  <td style={{ padding: '14px 10px', color: '#666' }}>{p.moq || '—'}</td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(p.id)}
                      style={{ background: '#FFEBEE', color: '#C62828', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '.8rem' }}
                    >
                      Archive
                    </button>
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
