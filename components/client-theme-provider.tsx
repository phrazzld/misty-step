'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/theme';

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}
