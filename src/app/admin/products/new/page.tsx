'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'food',
    subcategory: '',
    description: '',
    shortDesc: '',
    gradeInfo: '',
    moq: '',
    packaging: '',
    hsCode: '',
    imageUrl: '',
    isFeatured: false,
  });

  const [specs, setSpecs] = useState<Array<{ key: string; val: string }>>([
    { key: 'Grade Size', val: '' },
    { key: 'Shelf Life', val: '' },
  ]);

  function handleSpecChange(idx: number, field: 'key' | 'val', value: string) {
    const updated = [...specs];
    updated[idx][field] = value;
    setSpecs(updated);
  }

  function addSpecField() {
    setSpecs([...specs, { key: '', val: '' }]);
  }

  function removeSpecField(idx: number) {
    setSpecs(specs.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const specificationsObject: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim()) specificationsObject[s.key.trim()] = s.val.trim();
      });

      const payload = {
        ...formData,
        specifications: specificationsObject,
        images: formData.imageUrl ? [{ url: formData.imageUrl, alt: formData.name }] : [],
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert('Product created successfully! It is now live in the catalog.');
        router.push('/admin/products');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (e) {
      console.error('Submit error:', e);
      alert('Failed to submit product.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>Add New Export Product</h1>
      <p style={{ opacity: 0.6, marginBottom: '32px' }}>
        Fill in the details to publish a new product to the RDH Globals export catalog.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: '36px',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Product Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Roasted Salted Makhana 6 Suta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            >
              <option value="food">Food Products (Makhana)</option>
              <option value="textile">Home Textiles</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Subcategory</label>
            <input
              type="text"
              placeholder="e.g. Raw Makhana, Bedsheets, Hotel Linen"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Grade / Spec Badge</label>
            <input
              type="text"
              placeholder="e.g. 6 Suta (Jumbo), 600 TC Sateen"
              value={formData.gradeInfo}
              onChange={(e) => setFormData({ ...formData, gradeInfo: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Short Summary</label>
          <input
            type="text"
            placeholder="One-line snippet for catalog card..."
            value={formData.shortDesc}
            onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Full Description *</label>
          <textarea
            required
            rows={4}
            placeholder="Detailed export product description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>MOQ</label>
            <input
              type="text"
              placeholder="e.g. 500 KG"
              value={formData.moq}
              onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Packaging</label>
            <input
              type="text"
              placeholder="e.g. 10kg Vacuum Carton"
              value={formData.packaging}
              onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>HS Code</label>
            <input
              type="text"
              placeholder="e.g. 0813.40.90"
              value={formData.hsCode}
              onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '.9rem' }}>Product Image URL</label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '.9rem' }}
          />
        </div>

        {/* Dynamic Specifications Key-Value Editor */}
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <label style={{ fontWeight: 600, fontSize: '.9rem' }}>Technical Specifications (Key-Value)</label>
            <button
              type="button"
              onClick={addSpecField}
              style={{ background: '#1B2A4A', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '.8rem' }}
            >
              + Add Spec Row
            </button>
          </div>
          {specs.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Spec Name (e.g. Moisture)"
                value={s.key}
                onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '.85rem' }}
              />
              <input
                type="text"
                placeholder="Value (e.g. < 8%)"
                value={s.val}
                onChange={(e) => handleSpecChange(idx, 'val', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '.85rem' }}
              />
              <button
                type="button"
                onClick={() => removeSpecField(idx)}
                style={{ background: '#FFEBEE', color: '#C62828', border: 'none', padding: '0 12px', borderRadius: '6px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#1B2A4A',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '.95rem',
            }}
          >
            {loading ? 'Publishing...' : 'Publish Product to Catalog'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            style={{ background: 'transparent', color: '#666', border: '1px solid #ccc', padding: '14px 24px', borderRadius: '8px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
