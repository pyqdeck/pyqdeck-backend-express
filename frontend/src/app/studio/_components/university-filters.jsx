'use client';

import * as React from 'react';
import { Filter, X, Check } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { DropdownAction } from '@/components/dropdown-action';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function UniversityFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('isActive') || 'all';

  const activeFiltersCount = [
    searchParams.get('isActive') && searchParams.get('isActive') !== 'all',
    searchParams.get('state'),
    searchParams.get('country'),
  ].filter(Boolean).length;

  const updateFilter = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('isActive');
    params.delete('state');
    params.delete('country');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <DropdownAction
        label="Filter Universities"
        tooltip="Filter List"
        trigger={
          <Button variant="ghost" size="icon" className="relative size-10">
            <Filter className="size-4" />
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        }
      >
        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-wider uppercase">
          Status
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => updateFilter('isActive', 'all')}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>All Institutions</span>
          {currentStatus === 'all' && (
            <Check className="text-primary size-3.5" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateFilter('isActive', 'true')}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>Active Only</span>
          {currentStatus === 'true' && (
            <Check className="text-primary size-3.5" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateFilter('isActive', 'false')}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>Inactive Only</span>
          {currentStatus === 'false' && (
            <Check className="text-primary size-3.5" />
          )}
        </DropdownMenuItem>

        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator className="my-1 border-b" />
            <DropdownMenuItem
              onClick={clearFilters}
              className="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer font-medium"
            >
              <X className="mr-2 size-3.5" />
              Clear All Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownAction>
    </div>
  );
}
