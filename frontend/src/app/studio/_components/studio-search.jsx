'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function StudioSearch({
  placeholder = 'Search...',
  paramName = 'search',
  initialValue = '',
  className = 'w-72',
}) {
  const [value, setValue] = React.useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Debounced URL update
  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      // Always reset to page 1 on search
      params.set('page', '1');

      const currentParamValue = searchParams.get(paramName) || '';
      if (params.get(paramName) !== currentParamValue) {
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [value, paramName, pathname, router, searchParams]);

  return (
    <div className={`relative ${className}`}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder={placeholder}
        className="font-roboto border-2 pl-9 focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
