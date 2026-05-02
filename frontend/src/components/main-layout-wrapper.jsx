'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

export function MainLayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide the global Header for the Admin Studio
  const isStudio = pathname?.startsWith('/studio');

  return (
    <>
      {!isStudio && <Header />}
      <main className={`flex-1 ${!isStudio ? 'pt-16' : ''}`}>{children}</main>
    </>
  );
}
