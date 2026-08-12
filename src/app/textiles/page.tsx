'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import HomePage from '../home/page';

export default function TextileDivisionPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('textile');
  }, [setTheme]);

  return <HomePage />;
}
