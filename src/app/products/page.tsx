'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string | null;
  description: string;
  shortDesc: string | null;
  gradeInfo: string | null;
  moq: string | null;
  packaging: string | null;
  images: Array<{ url: string; alt: string | null }>;
}

export default function ProductsPage() {
  const { theme, setTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = '/api/products';
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchQuery) {
          params.append('q', searchQuery);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (e) {
        console.error('Error fetching catalog:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <span className="eyebrow">RDH Globals Catalog</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Product Range</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto' }}>
          Graded, quality-inspected, and container-ready food and home textile export items.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '40px',
          background: 'var(--secondary)',
          padding: '16px 24px',
          borderRadius: '14px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${selectedCategory === 'all' ? 'btn-solid' : 'btn-ghost'}`}
            style={{ color: selectedCategory === 'all' ? '#fff' : 'var(--text)', padding: '8px 18px', fontSize: '.85rem' }}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </button>
          <button
            className={`btn ${selectedCategory === 'food' ? 'btn-solid' : 'btn-ghost'}`}
            style={{ color: selectedCategory === 'food' ? '#fff' : 'var(--text)', padding: '8px 18px', fontSize: '.85rem' }}
            onClick={() => {
              setSelectedCategory('food');
              setTheme('food');
            }}
          >
            🌿 Food (Makhana)
          </button>
          <button
            className={`btn ${selectedCategory === 'textile' ? 'btn-solid' : 'btn-ghost'}`}
            style={{ color: selectedCategory === 'textile' ? '#fff' : 'var(--text)', padding: '8px 18px', fontSize: '.85rem' }}
            onClick={() => {
              setSelectedCategory('textile');
              setTheme('textile');
            }}
          >
            🧵 Home Textiles
          </button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(0,0,0,.15)',
            width: '260px',
            fontSize: '.9rem',
          }}
        />
      </div>

      {/* Product Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          Loading RDH Globals catalog...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h3>No products found</h3>
          <p style={{ opacity: 0.6, marginTop: '8px' }}>Try clearing your search query or selecting a different category.</p>
        </div>
      ) : (
        <div className="prod-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="prod-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="prod-thumb" style={{ position: 'relative' }}>
                  {p.images && p.images[0] ? (
                    <img src={p.images[0].url} alt={p.images[0].alt || p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                      {p.category === 'food' ? '🌾' : '🧵'}
                    </div>
                  )}
                  {p.gradeInfo && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'var(--primary)',
                        color: '#fff',
                        fontSize: '.72rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      {p.gradeInfo}
                    </span>
                  )}
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600, marginBottom: '6px' }}>
                    {p.subcategory || p.category}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--text)' }}>{p.name}</h3>
                  <p style={{ fontSize: '.84rem', opacity: 0.7, marginBottom: '16px', flexGrow: 1, lineHeight: 1.5 }}>
                    {p.shortDesc || p.description.slice(0, 90) + '...'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.8rem', fontWeight: 600, color: 'var(--primary)' }}>
                    <span>MOQ: {p.moq || 'Contact for MOQ'}</span>
                    <span>View Spec →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
