import Link from 'next/link';

export const metadata = {
  title: 'Export Market Insights & Trade Reports | RVDH Globals',
  description: 'Latest export industry insights, Makhana global market trends, cotton textile specifications, and customs trade advice.',
};

export default function BlogPage() {
  const posts = [
    {
      slug: 'global-demand-surge-for-indian-makhana-2026',
      title: 'Global Demand Surge for Indian Makhana in US & EU Supermarkets',
      category: 'Food Export',
      date: 'August 2026',
      excerpt: 'Why plant-based B2B distributors in North America and Europe are replacing conventional snacks with GI-tagged Mithila Makhana.',
      readTime: '4 min read',
    },
    {
      slug: 'understanding-thread-count-and-cotton-grades-for-hotel-procurement',
      title: 'Understanding Thread Count & Cotton Grades for Hotel Linen Procurement',
      category: 'Textile Trade',
      date: 'July 2026',
      excerpt: 'A comprehensive procurement guide comparing 300 TC Percale vs 600 TC Sateen for luxury hospitality chain purchasing.',
      readTime: '6 min read',
    },
    {
      slug: 'navigating-apeda-and-fssai-export-documentation-for-middle-east',
      title: 'Navigating APEDA & FSSAI Export Compliance for GCC Markets',
      category: 'Export Compliance',
      date: 'June 2026',
      excerpt: 'Key customs documentation checkpoints required when shipping food products to UAE, Saudi Arabia, and Qatar.',
      readTime: '5 min read',
    },
  ];

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="eyebrow">Industry Knowledge</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Export Market Insights</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto' }}>
          Industry trade reports, global market analysis, and export compliance guides from the RVDH Globals desk.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {posts.map((p) => (
          <article
            key={p.slug}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(0,0,0,.08)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '12px' }}>
                <span>{p.category}</span>
                <span style={{ opacity: 0.6 }}>{p.date}</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.35 }}>{p.title}</h3>
              <p style={{ fontSize: '.9rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '20px' }}>{p.excerpt}</p>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.84rem' }}>
              <span style={{ opacity: 0.5 }}>{p.readTime}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Read Article →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
