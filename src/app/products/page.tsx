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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = '/api/products';
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (selectedSubcategory !== 'all') {
          params.append('subcategory', selectedSubcategory);
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
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  const foodSubcategories = ['Raw Makhana', 'Roasted Makhana', 'Flavoured Makhana'];
  const textileSubcategories = ['Bedsheets', 'Hotel Linen'];

  const currentSubcategories =
    selectedCategory === 'food'
      ? foodSubcategories
      : selectedCategory === 'textile'
      ? textileSubcategories
      : Array.from(new Set([...foodSubcategories, ...textileSubcategories]));

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <span className="eyebrow">RDH Globals Catalog</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', letterSpacing: '-0.02em' }}>Product Range</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Graded, laboratory-inspected, and container-ready food &amp; home textile export items for global markets.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '40px',
          background: 'var(--secondary)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Main Category Tabs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className={`btn ${selectedCategory === 'all' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: selectedCategory === 'all' ? '#fff' : 'var(--text)', padding: '8px 20px', fontSize: '.88rem' }}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubcategory('all');
              }}
            >
              All Products
            </button>
            <button
              className={`btn ${selectedCategory === 'food' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: selectedCategory === 'food' ? '#fff' : 'var(--text)', padding: '8px 20px', fontSize: '.88rem' }}
              onClick={() => {
                setSelectedCategory('food');
                setSelectedSubcategory('all');
                setTheme('food');
              }}
            >
              🌾 Food Division (Makhana)
            </button>
            <button
              className={`btn ${selectedCategory === 'textile' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: selectedCategory === 'textile' ? '#fff' : 'var(--text)', padding: '8px 20px', fontSize: '.88rem' }}
              onClick={() => {
                setSelectedCategory('textile');
                setSelectedSubcategory('all');
                setTheme('textile');
              }}
            >
              🧵 Home Textiles
            </button>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <input
              type="text"
              placeholder="Search by product, grade, or spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,.15)',
                fontSize: '.9rem',
                outline: 'none',
                background: '#fff',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '.85rem',
                  color: '#888',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Subcategory Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
          <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>
            Filter:
          </span>
          <button
            style={{
              padding: '4px 14px',
              borderRadius: '999px',
              border: selectedSubcategory === 'all' ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,.12)',
              background: selectedSubcategory === 'all' ? 'var(--primary)' : '#fff',
              color: selectedSubcategory === 'all' ? '#fff' : 'var(--text)',
              fontSize: '.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all .2s',
            }}
            onClick={() => setSelectedSubcategory('all')}
          >
            All Subcategories
          </button>
          {currentSubcategories.map((sub) => (
            <button
              key={sub}
              style={{
                padding: '4px 14px',
                borderRadius: '999px',
                border: selectedSubcategory === sub ? '1px solid var(--primary)' : '1px solid rgba(0,0,0,.12)',
                background: selectedSubcategory === sub ? 'var(--primary)' : '#fff',
                color: selectedSubcategory === sub ? '#fff' : 'var(--text)',
                fontSize: '.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all .2s',
              }}
              onClick={() => setSelectedSubcategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔄</div>
          Loading RDH Globals catalog...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--secondary)', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No products found</h3>
          <p style={{ opacity: 0.6, maxWidth: '400px', margin: '0 auto 20px', fontSize: '.9rem' }}>
            We couldn&apos;t find any items matching your current filters or search query.
          </p>
          <button
            className="btn btn-solid"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory('all');
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="prod-grid">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="prod-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="prod-thumb" style={{ position: 'relative', aspectRatio: '4/3' }}>
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
                        boxShadow: '0 2px 8px rgba(0,0,0,.15)',
                      }}
                    >
                      {p.gradeInfo}
                    </span>
                  )}
                </div>
                <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.04em' }}>
                    {p.subcategory || p.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text)', lineHeight: 1.35, fontWeight: 700 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '.86rem', opacity: 0.75, marginBottom: '20px', flexGrow: 1, lineHeight: 1.55, color: 'var(--text)' }}>
                    {p.shortDesc || p.description.slice(0, 95) + '...'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.82rem', fontWeight: 600, color: 'var(--primary)', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
                    <span>MOQ: {p.moq || 'Contact'}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      View Spec &rarr;
                    </span>
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
