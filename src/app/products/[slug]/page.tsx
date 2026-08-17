import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const BASE_URL = 'https://rdhglobals.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: { slug },
    include: { images: true },
  });

  if (!product) return {};

  const title = product.seoTitle || `${product.name} — B2B Wholesale Exporter | RDH Globals`;
  const description =
    product.seoDescription ||
    product.shortDesc ||
    product.description.slice(0, 160);

  const primaryImage = product.images?.[0]?.url
    ? product.images[0].url.startsWith('http')
      ? product.images[0].url
      : `${BASE_URL}${product.images[0].url}`
    : `${BASE_URL}/images/logo.jpeg`;

  const categoryLabel = product.category === 'food' ? 'Food & Makhana Export' : 'Home Textiles Export';
  const foodCountryKeywords = product.category === 'food' ? [
    'Makhana Supplier in India',
    'Makhana Supplier from India',
    'Makhana Exporter from India',
    'Makhana Manufacturer in India',
    'Roasted Makhana Supplier in USA',
    'Flavoured Makhana Supplier in USA',
    'Makhana Supplier from India to USA',
    'Makhana Exporter from India to USA',
    'Roasted Makhana Supplier in UAE',
    'Flavoured Makhana Supplier in UAE',
    'Makhana Supplier from India to UAE',
    'Makhana Exporter from India to UAE',
    'Makhana Supplier from India to UK',
    'Makhana Exporter from India to UK',
    'Makhana Supplier from India to Canada',
    'Makhana Exporter from India to Canada',
    'Makhana Supplier from India to Australia',
    'Makhana Exporter from India to Australia',
    'Makhana Supplier from India to Malaysia',
    'Makhana Exporter from India to Malaysia',
    'Makhana Supplier from India to Bangladesh',
    'Makhana Supplier from India to Maldives',
    'Makhana Supplier from India to Thailand',
    'Makhana Supplier from India to Sri Lanka',
  ] : [
    'Indian Home Textiles Exporter',
    'Hotel Linen Supplier from India to USA',
    'Egyptian Cotton Bedsheets Exporter to UK',
    'Hospitality Bedding Supplier to UAE',
    'Luxury Hotel Linen Supplier to Canada',
    'Bedsheets Exporter to Australia',
  ];

  const keywords = [
    product.name,
    product.subcategory || '',
    categoryLabel,
    'RDH Globals',
    'Indian Exporter',
    'Wholesale Exporter India',
    'Container Load Shipping',
    product.hsCode ? `HS Code ${product.hsCode}` : '',
    product.gradeInfo ? `Grade ${product.gradeInfo}` : '',
    product.category === 'food'
      ? 'APEDA Registered Makhana Exporter'
      : 'OEKO-TEX Certified Indian Textiles',
    'B2B Private Label Supplier',
    ...foodCountryKeywords,
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${BASE_URL}/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/products/${product.slug}`,
      siteName: 'RDH Globals — Premier Indian Export House',
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [primaryImage],
      site: '@rdhglobals',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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

  const primaryImage = product.images?.[0]?.url
    ? product.images[0].url.startsWith('http')
      ? product.images[0].url
      : `${BASE_URL}${product.images[0].url}`
    : `${BASE_URL}/images/logo.jpeg`;

  const allImages = product.images?.map((img) =>
    img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`
  ) || [primaryImage];

  // Schema.org Product Structured Data
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: allImages,
    category: product.subcategory || product.category,
    sku: product.hsCode || product.slug,
    mpn: product.slug,
    brand: {
      '@type': 'Brand',
      name: 'RDH Globals',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '100.00',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/products/${product.slug}`,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'RDH Globals',
        url: BASE_URL,
      },
    },
    additionalProperty: Object.entries(parsedSpecs).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
  };

  // Schema.org Breadcrumbs
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/home`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products Catalog',
        item: `${BASE_URL}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${BASE_URL}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="wrap" style={{ padding: '60px 28px 100px' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '30px', fontSize: '.85rem', color: 'var(--text-muted)' }}>
          <Link href="/home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          {' / '}
          <Link href="/products" style={{ color: 'inherit', textDecoration: 'none' }}>Products</Link>
          {' / '}
          <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '50px', alignItems: 'start' }}>
          {/* Left Column: Image Gallery */}
          <div>
            <div
              style={{
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'var(--secondary)',
                border: '1px solid rgba(0,0,0,.08)',
                marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,.04)',
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
              RDH Globals Export Item • {product.category === 'food' ? '🌾 Food Division' : '🧵 Textile Division'}
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
              {product.gradeInfo && <span className="chip" style={{ fontWeight: 600 }}>Grade: {product.gradeInfo}</span>}
              {product.moq && <span className="chip" style={{ fontWeight: 600 }}>MOQ: {product.moq}</span>}
              {product.hsCode && <span className="chip" style={{ fontWeight: 600 }}>HS Code: {product.hsCode}</span>}
              <span className="chip" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#0f7b3b', fontWeight: 600 }}>
                ✓ Export Ready
              </span>
            </div>

            <p style={{ lineHeight: 1.7, opacity: 0.82, fontSize: '1rem', marginBottom: '30px' }}>
              {product.description}
            </p>

            {/* Specifications Table */}
            {Object.keys(parsedSpecs).length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Technical Export Specifications</h3>
                <div style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: '12px', overflow: 'hidden' }}>
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
              <div style={{ marginBottom: '30px', background: 'var(--secondary)', padding: '18px 20px', borderRadius: '12px', border: '1px solid rgba(0,0,0,.06)' }}>
                <strong style={{ color: 'var(--primary)' }}>Export Packaging:</strong> {product.packaging}
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
