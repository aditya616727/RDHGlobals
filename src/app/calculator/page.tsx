'use client';

import { useState } from 'react';

export default function CalculatorPage() {
  const [category, setCategory] = useState('food');
  const [weightKg, setWeightKg] = useState(500);
  const [port, setPort] = useState('AE - Dubai / Jebel Ali');
  const [incoterm, setIncoterm] = useState('CIF');
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<any>(null);

  async function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, weightKg, port, incoterm }),
      });
      const data = await res.json();
      if (data.success) {
        setEstimate(data.estimate);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="eyebrow">Interactive Estimator</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>B2B Export Cost Calculator</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto' }}>
          Calculate indicative FOB (Free on Board) and CIF (Cost, Insurance &amp; Freight) estimates for your bulk order.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Form Panel */}
        <form
          onSubmit={handleCalculate}
          style={{
            background: '#fff',
            padding: '36px',
            borderRadius: '18px',
            border: '1px solid rgba(0,0,0,.08)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '.9rem' }}>
              Product Category
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className={`btn ${category === 'food' ? 'btn-solid' : 'btn-ghost'}`}
                style={{ flex: 1, color: category === 'food' ? '#fff' : 'var(--text)' }}
                onClick={() => setCategory('food')}
              >
                🌿 Makhana / Food
              </button>
              <button
                type="button"
                className={`btn ${category === 'textile' ? 'btn-solid' : 'btn-ghost'}`}
                style={{ flex: 1, color: category === 'textile' ? '#fff' : 'var(--text)' }}
                onClick={() => setCategory('textile')}
              >
                🧵 Home Textiles
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '.9rem' }}>
              Order Quantity / Weight (KG)
            </label>
            <input
              type="number"
              min={100}
              step={50}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,.15)', fontSize: '1rem' }}
              required
            />
            <span style={{ fontSize: '.78rem', opacity: 0.6, marginTop: '4px', display: 'block' }}>
              Volume discounts auto-apply at 1,000kg+ and 2,000kg+.
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '.9rem' }}>
              Destination Sea/Air Port
            </label>
            <select
              value={port}
              onChange={(e) => setPort(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,.15)', fontSize: '.95rem' }}
            >
              <option value="AE - Dubai / Jebel Ali">🇦🇪 UAE — Dubai / Jebel Ali Port</option>
              <option value="US - New York / Newark">🇺🇸 USA — New York / Newark Port</option>
              <option value="US - Los Angeles">🇺🇸 USA — Los Angeles / Long Beach</option>
              <option value="DE - Hamburg">🇩🇪 Germany — Hamburg Port</option>
              <option value="UK - Felixstowe">🇬🇧 UK — Felixstowe / London Gateway</option>
              <option value="AU - Sydney">🇦🇺 Australia — Port Jackson / Sydney</option>
              <option value="SG - Singapore">🇸🇬 Singapore — Singapore Port</option>
              <option value="MY - Malaysia">🇲🇾 Malaysia — Malaysia</option>
              <option value="SL - Sri Lanka">SL - Sri Lanka — Colombo Port</option>
              <option value="NP - Nepal">🇳🇵 Nepal — Kathmandu Port</option>
              <option value="NL - Netherlands">🇳🇱 Netherlands — Amsterdam Port</option>

            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '.9rem' }}>
              Preferred Delivery Terms
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '.9rem' }}>
                <input
                  type="radio"
                  name="incoterm"
                  value="CIF"
                  checked={incoterm === 'CIF'}
                  onChange={() => setIncoterm('CIF')}
                />
                CIF (Cost, Insurance &amp; Freight)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '.9rem' }}>
                <input
                  type="radio"
                  name="incoterm"
                  value="FOB"
                  checked={incoterm === 'FOB'}
                  onChange={() => setIncoterm('FOB')}
                />
                FOB (Free On Board Port)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-solid"
            disabled={loading}
            style={{ background: 'var(--primary)', color: '#fff', padding: '16px', fontSize: '1rem', marginTop: '10px' }}
          >
            {loading ? 'Calculating Estimate...' : 'Calculate Estimate Now →'}
          </button>
        </form>

        {/* Results Panel */}
        <div>
          {estimate ? (
            <div
              style={{
                background: 'var(--secondary)',
                padding: '36px',
                borderRadius: '18px',
                border: '1px solid rgba(0,0,0,.08)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span className="chip" style={{ background: 'var(--primary)', color: '#fff', marginBottom: '16px' }}>
                Quote Summary ({estimate.currency})
              </span>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '6px', color: 'var(--primary)' }}>
                ${incoterm === 'CIF' ? estimate.cifTotalUSD.toLocaleString() : estimate.fobTotalUSD.toLocaleString()} USD
              </h2>
              <span style={{ fontSize: '.84rem', opacity: 0.7, display: 'block', marginBottom: '24px' }}>
                Total Estimated Cost ({incoterm} {port}) for {estimate.weightKg} KG.
              </span>

              <div style={{ borderTop: '1px solid rgba(0,0,0,.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Cargo Rate:</span>
                  <strong>${estimate.pricePerKgUSD} / KG</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal Cargo:</span>
                  <strong>${estimate.cargoTotalUSD.toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Documentation &amp; Quarantine:</span>
                  <strong>${estimate.documentationUSD}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Ocean Freight ({port.slice(0, 2)}):</span>
                  <strong>${estimate.freightUSD}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Marine Cargo Insurance:</span>
                  <strong>${estimate.insuranceUSD}</strong>
                </div>
              </div>

              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,.1)' }}>
                <a
                  href={`/home#contact?estimate=${estimate.cifTotalUSD}&weight=${estimate.weightKg}&category=${category}`}
                  className="btn btn-solid"
                  style={{ width: '100%', textAlign: 'center', justifyContent: 'center', background: 'var(--primary)', color: '#fff' }}
                >
                  Lock In Official Formal Quote →
                </a>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(0,0,0,.02)',
                padding: '50px 30px',
                borderRadius: '18px',
                border: '2px dashed rgba(0,0,0,.1)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🧮</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Ready to Calculate</h3>
              <p style={{ opacity: 0.6, fontSize: '.9rem', maxWidth: '360px', margin: '0 auto' }}>
                Select your order weight and destination port to see transparent FOB &amp; CIF export costs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
