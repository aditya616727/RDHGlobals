'use client';

import dynamic from 'next/dynamic';

const LandingGateContent = dynamic(() => import('@/components/site/LandingGate'), {
  ssr: false,
  loading: () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FCFBF8',
    }}>
      <div style={{
        fontFamily: "'Fraunces', serif",
        fontSize: '1.3rem',
        color: '#2F5233',
        opacity: 0.6,
      }}>
        RVDH Globals — International Trade House
      </div>
    </div>
  ),
});

export default function Page() {
  return <LandingGateContent />;
}
