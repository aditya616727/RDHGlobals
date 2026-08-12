'use client';

import { useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import HomePage from '../home/page';

export default function FoodDivisionPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('food');
  }, [setTheme]);

  return <HomePage />;
}
