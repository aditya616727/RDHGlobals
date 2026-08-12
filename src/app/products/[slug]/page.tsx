import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findFirst({ where: { slug } });
  if (!product) return {};

  return {
    title: `${product.name} — RDH Globals Exporter`,
    description: product.shortDesc || product.description.slice(0, 160),
    keywords: [product.name, product.category, product.subcategory || '', 'RDH Globals export'],
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug },
    include: { images: true },
  });

  if (!product) {
    notFound();
  }

  let parsedSpecs: Record<string, string> = {};
  if (product.specifications) {
    try {
      parsedSpecs = JSON.parse(product.specifications);
    } catch (e) {
      console.error('Failed to parse specifications:', e);
    }
  }

  // Schema.org Product JSON-LD (inspired by Quantyra Labs)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'RDH Globals',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      offerCount: '1000',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="wrap" style={{ padding: '60px 28px 100px' }}>
        {/* Breadcrumb Navigation */}
        <div style={{ marginBottom: '30px', fontSize: '.85rem', color: 'var(--text-muted)' }}>
          <Link href="/home" style={{ color: 'inherit' }}>Home</Link>
          {' / '}
          <Link href="/products" style={{ color: 'inherit' }}>Products</Link>
          {' / '}
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '50px', alignItems: 'start' }}>
          {/* Left Column: Image Gallery */}
          <div>
            <div
              style={{
                aspectRatio: '1/1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--secondary)',
                border: '1px solid rgba(0,0,0,.08)',
                marginBottom: '16px',
              }}
            >
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {product.category === 'food' ? '🌾' : '🧵'}
                </div>
              )}
            </div>

            {/* Thumbnail row if multiple images */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((img, i) => (
                  <div key={i} style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(0,0,0,.15)' }}>
                    <img src={img.url} alt={img.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification Details */}
          <div>
            <span className="eyebrow" style={{ color: 'var(--primary)' }}>
              RDH Globals Export Item
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '14px', lineHeight: 1.2 }}>{product.name}</h1>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {product.gradeInfo && <span className="chip">Grade: {product.gradeInfo}</span>}
              {product.moq && <span className="chip">MOQ: {product.moq}</span>}
              {product.hsCode && <span className="chip">HS Code: {product.hsCode}</span>}
            </div>

            <p style={{ lineHeight: 1.7, opacity: 0.8, fontSize: '1rem', marginBottom: '30px' }}>
              {product.description}
            </p>

            {/* Specifications Table */}
            {Object.keys(parsedSpecs).length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Technical Specifications</h3>
                <div style={{ border: '1px solid rgba(0,0,0,.1)', borderRadius: '12px', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.9rem' }}>
                    <tbody>
                      {Object.entries(parsedSpecs).map(([key, val], idx) => (
                        <tr key={key} style={{ background: idx % 2 === 0 ? 'var(--secondary)' : '#fff', borderBottom: '1px solid rgba(0,0,0,.06)' }}>
                          <td style={{ padding: '12px 16px', fontWeight: 600, width: '40%' }}>{key}</td>
                          <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Packaging & Shipping Details */}
            {product.packaging && (
              <div style={{ marginBottom: '30px', background: 'rgba(0,0,0,.03)', padding: '18px 20px', borderRadius: '12px' }}>
                <strong>Export Packaging:</strong> {product.packaging}
              </div>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href={`/home#contact?product=${encodeURIComponent(product.name)}`} className="btn btn-solid" style={{ padding: '16px 32px' }}>
                Request Wholesale Quote
              </Link>
              <Link href="/calculator" className="btn btn-ghost" style={{ color: 'var(--primary)', borderColor: 'var(--primary)', padding: '16px 28px' }}>
                Estimate Shipping Cost →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
