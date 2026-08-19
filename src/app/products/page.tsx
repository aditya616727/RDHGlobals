'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTheme } from '@/lib/theme-context';
import { useSearchParams } from 'next/navigation';
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

const MAKHANA_SUBCATS = ['Raw Makhana', 'Roasted Makhana', 'Flavoured Makhana'];
const AMLA_SUBCATS = ['Fresh Amla', 'Amla Candy', 'Amla Powder', 'Amla Juice'];
const TEXTILE_SUBCATS = ['Bedsheets', 'Hotel Linen'];

function ProductsCatalog() {
  const { setTheme } = useTheme();
  const searchParams = useSearchParams();

  // Active division / product line: 'all' | 'makhana' | 'amla' | 'textile'
  const initialLineParam = searchParams.get('line');
  const initialCatParam = searchParams.get('category');
  const initialSubcatParam = searchParams.get('subcategory');

  const getInitialTab = (): 'all' | 'makhana' | 'amla' | 'textile' => {
    if (initialLineParam === 'makhana') return 'makhana';
    if (initialLineParam === 'amla') return 'amla';
    if (initialCatParam === 'textile') return 'textile';
    if (initialCatParam === 'food') return 'makhana';
    return 'all';
  };

  const [activeTab, setActiveTab] = useState<'all' | 'makhana' | 'amla' | 'textile'>(getInitialTab());
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcatParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let url = '/api/products';
        const params = new URLSearchParams();

        if (activeTab === 'textile') {
          params.append('category', 'textile');
        } else if (activeTab === 'makhana' || activeTab === 'amla') {
          params.append('category', 'food');
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
          let list: Product[] = data.products;

          // Enforce strict separation between Makhana and Amla if a specific product line is chosen
          if (activeTab === 'makhana') {
            list = list.filter((p) =>
              MAKHANA_SUBCATS.some((s) => s.toLowerCase() === (p.subcategory || '').toLowerCase()) ||
              p.name.toLowerCase().includes('makhana') ||
              p.name.toLowerCase().includes('fox nut')
            );
          } else if (activeTab === 'amla') {
            list = list.filter((p) =>
              AMLA_SUBCATS.some((s) => s.toLowerCase() === (p.subcategory || '').toLowerCase()) ||
              p.name.toLowerCase().includes('amla') ||
              p.name.toLowerCase().includes('gooseberry')
            );
          }

          setProducts(list);
        }
      } catch (e) {
        console.error('Error fetching catalog:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab, selectedSubcategory, searchQuery]);

  function handleTabChange(tab: 'all' | 'makhana' | 'amla' | 'textile') {
    setActiveTab(tab);
    setSelectedSubcategory('all');
    if (tab === 'makhana' || tab === 'amla') {
      setTheme('food');
    } else if (tab === 'textile') {
      setTheme('textile');
    }
  }

  const currentSubcategories =
    activeTab === 'makhana'
      ? MAKHANA_SUBCATS
      : activeTab === 'amla'
      ? AMLA_SUBCATS
      : activeTab === 'textile'
      ? TEXTILE_SUBCATS
      : [];

  const makhanaList = products.filter(
    (p) =>
      MAKHANA_SUBCATS.some((s) => s.toLowerCase() === (p.subcategory || '').toLowerCase()) ||
      p.name.toLowerCase().includes('makhana') ||
      p.name.toLowerCase().includes('fox nut')
  );

  const amlaList = products.filter(
    (p) =>
      AMLA_SUBCATS.some((s) => s.toLowerCase() === (p.subcategory || '').toLowerCase()) ||
      p.name.toLowerCase().includes('amla') ||
      p.name.toLowerCase().includes('gooseberry')
  );

  const textileList = products.filter((p) => p.category === 'textile');

  const renderProductCard = (p: Product) => (
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
  );

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <span className="eyebrow">RDH Globals Catalog</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', letterSpacing: '-0.02em' }}>Export Product Range</h1>
        <p style={{ opacity: 0.7, maxWidth: '680px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Graded, laboratory-tested, and container-ready food &amp; home textile export items for global markets.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          marginBottom: '40px',
          background: 'var(--secondary)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(0,0,0,.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Distinct Product Line Tabs */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className={`btn ${activeTab === 'all' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: activeTab === 'all' ? '#fff' : 'var(--text)', padding: '9px 18px', fontSize: '.88rem', fontWeight: 600 }}
              onClick={() => handleTabChange('all')}
            >
              All Categories
            </button>
            <button
              className={`btn ${activeTab === 'makhana' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: activeTab === 'makhana' ? '#fff' : 'var(--text)', padding: '9px 18px', fontSize: '.88rem', fontWeight: 600 }}
              onClick={() => handleTabChange('makhana')}
            >
              🌾 Makhana (Fox Nuts)
            </button>
            <button
              className={`btn ${activeTab === 'amla' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: activeTab === 'amla' ? '#fff' : 'var(--text)', padding: '9px 18px', fontSize: '.88rem', fontWeight: 600 }}
              onClick={() => handleTabChange('amla')}
            >
              🍈 Amla (Indian Gooseberry)
            </button>
            <button
              className={`btn ${activeTab === 'textile' ? 'btn-solid' : 'btn-ghost'}`}
              style={{ color: activeTab === 'textile' ? '#fff' : 'var(--text)', padding: '9px 18px', fontSize: '.88rem', fontWeight: 600 }}
              onClick={() => handleTabChange('textile')}
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

        {/* Subcategory Pills for the chosen Product Line */}
        {currentSubcategories.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
            <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>
              Filter by Subcategory:
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
              All {activeTab === 'makhana' ? 'Makhana' : activeTab === 'amla' ? 'Amla' : 'Textiles'}
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
        )}
      </div>

      {/* Product Cards Presentation */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔄</div>
          Loading catalog...
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
              setActiveTab('all');
              setSelectedSubcategory('all');
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : activeTab === 'all' && !searchQuery ? (
        /* When 'All Categories' is selected, show separated distinct sections */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* Section 1: Makhana Products */}
          {makhanaList.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid rgba(0,0,0,.06)', paddingBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🌾 Makhana Range (Fox Nuts)
                  </h2>
                  <span style={{ fontSize: '.88rem', opacity: 0.7 }}>
                    Hand-graded jumbo raw fox nuts, gourmet roasted, and infused export snacks.
                  </span>
                </div>
                <button
                  onClick={() => handleTabChange('makhana')}
                  className="btn btn-ghost"
                  style={{ fontSize: '.82rem', padding: '6px 14px' }}
                >
                  Filter Makhana Only →
                </button>
              </div>
              <div className="prod-grid">
                {makhanaList.map(renderProductCard)}
              </div>
            </div>
          )}

          {/* Section 2: Amla Products */}
          {amlaList.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid rgba(0,0,0,.06)', paddingBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🍈 Amla Range (Indian Gooseberry)
                  </h2>
                  <span style={{ fontSize: '.88rem', opacity: 0.7 }}>
                    Farm-fresh organic whole amla, antioxidant candy, pure powder, and cold-pressed virgin juice.
                  </span>
                </div>
                <button
                  onClick={() => handleTabChange('amla')}
                  className="btn btn-ghost"
                  style={{ fontSize: '.82rem', padding: '6px 14px' }}
                >
                  Filter Amla Only →
                </button>
              </div>
              <div className="prod-grid">
                {amlaList.map(renderProductCard)}
              </div>
            </div>
          )}

          {/* Section 3: Textile Products */}
          {textileList.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid rgba(0,0,0,.06)', paddingBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🧵 Home Textiles &amp; Hotel Linen
                  </h2>
                  <span style={{ fontSize: '.88rem', opacity: 0.7 }}>
                    High thread count Egyptian cotton bedsheets, satin finishes, and commercial hospitality linen.
                  </span>
                </div>
                <button
                  onClick={() => handleTabChange('textile')}
                  className="btn btn-ghost"
                  style={{ fontSize: '.82rem', padding: '6px 14px' }}
                >
                  Filter Textiles Only →
                </button>
              </div>
              <div className="prod-grid">
                {textileList.map(renderProductCard)}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Specific Tab / Search Mode Flat Grid */
        <div className="prod-grid">
          {products.map(renderProductCard)}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '80px 0' }}>Loading products catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
