'use client';

import SiteLayout from '../home/layout';

export default function SubPageLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
