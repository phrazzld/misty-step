'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/lib/theme';

export function DarkModeToggle(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? '🌞' : '🌙'}
    </Button>
  );
}
