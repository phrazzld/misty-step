'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/theme';

export default function ClientThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider>{children}</ThemeProvider>;
}
