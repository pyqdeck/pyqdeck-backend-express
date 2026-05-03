'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

// Suppress React 19 "Encountered a script tag" warning caused by next-themes
// This is a known false positive as the script is needed for SSR theme flash prevention.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const fullConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Encountered a script tag')
    )
      return;
    fullConsoleError.apply(console, args);
  };
}

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props} suppressHydrationWarning>
      {children}
    </NextThemesProvider>
  );
}
