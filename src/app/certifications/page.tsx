import Link from 'next/link';

export const metadata = {
  title: 'Certifications & Compliance | RDH Globals',
  description: 'FSSAI, APEDA, ISO 22000, ISO 9001, and OEKO-TEX export compliance certifications held by RDH Globals.',
};

export default function CertificationsPage() {
  const certs = [
    {
      title: 'FSSAI License',
      category: 'Food Safety',
      code: 'FSSAI Lic. No. 1002005100XXXX',
      authority: 'Food Safety and Standards Authority of India',
      desc: 'Mandatory food safety and hygiene licensing for manufacturing, grading, and exporting consumable agricultural produce.',
      icon: '📜',
    },
    {
      title: 'APEDA Registration',
      category: 'Agricultural Export',
      code: 'APEDA Reg. No. APEDA/AGR/2021/XXXX',
      authority: 'Agricultural & Processed Food Products Export Development Authority',
      desc: 'Government recognition for processed food products export, granting quality certification for international shipments.',
      icon: '🌾',
    },
    {
      title: 'ISO 22000:2018',
      category: 'Quality Management',
      code: 'Cert No. ISO-22000-RDH-2024',
      authority: 'International Organization for Standardization',
      desc: 'Food safety management system certification covering hazard analysis and critical control point (HACCP) protocols.',
      icon: '🛡️',
    },
    {
      title: 'ISO 9001:2015',
      category: 'Quality Assurance',
      code: 'Cert No. ISO-9001-RDH-2023',
      authority: 'International Organization for Standardization',
      desc: 'Quality management system certification ensuring standardized processing, trace-level inspection, and operational consistency.',
      icon: '🏅',
    },
    {
      title: 'OEKO-TEX Standard 100',
      category: 'Textile Safety',
      code: 'Test Report No. SHAO 084XXXX',
      authority: 'OEKO-TEX Association',
      desc: 'Global standard testing for harmful substances in textiles, certifying eco-friendly, hypoallergenic bedsheets and linens.',
      icon: '🧵',
    },
    {
      title: 'Export House Recognition',
      category: 'Government Certificate',
      code: 'IEC Code: 0510XXXXXX',
      authority: 'Directorate General of Foreign Trade (DGFT), India',
      desc: 'Recognized Star Export House status certifying export volume compliance and financial trade credentials.',
      icon: '🏛️',
    },
  ];

  return (
    <div className="wrap" style={{ padding: '60px 28px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span className="eyebrow">Trust &amp; Licensing</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Certifications &amp; Quality Compliance</h1>
        <p style={{ opacity: 0.7, maxWidth: '640px', margin: '0 auto' }}>
          Every shipment handled by RDH Globals adheres strictly to international compliance standards.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {certs.map((c, i) => (
          <div
            key={i}
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
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{c.icon}</div>
              <span style={{ fontSize: '.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 600 }}>
                {c.category}
              </span>
              <h3 style={{ fontSize: '1.2rem', margin: '6px 0 10px' }}>{c.title}</h3>
              <p style={{ fontSize: '.88rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '16px' }}>{c.desc}</p>
            </div>
            <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,.06)', fontSize: '.78rem', opacity: 0.6 }}>
              <div>{c.authority}</div>
              <strong style={{ color: 'var(--text)' }}>{c.code}</strong>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', background: 'var(--secondary)', padding: '40px', borderRadius: '16px' }}>
        <h2>Need Verified Test Reports for Your Customs Authority?</h2>
        <p style={{ opacity: 0.7, margin: '12px auto 24px', maxWidth: '540px' }}>
          We provide batch-specific NABL lab reports, phytosanitary certificates, and origin verification documentation upon order confirmation.
        </p>
        <Link href="/home#contact" className="btn btn-solid" style={{ background: 'var(--primary)', color: '#fff' }}>
          Request Compliance Documents
        </Link>
      </div>
    </div>
  );
}
