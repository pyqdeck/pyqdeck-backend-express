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

export function SemesterFilters({ universities = [], branches = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [uniSearch, setUniSearch] = React.useState('');
  const [branchSearch, setBranchSearch] = React.useState('');

  const currentUniId = searchParams.get('universityId') || 'all';
  const currentBranchId = searchParams.get('branchId') || 'all';

  // Filter universities based on search
  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
      uni.shortName?.toLowerCase().includes(uniSearch.toLowerCase())
  );

  // Filter branches based on selected university and search
  const filteredBranches = branches.filter((branch) => {
    const matchesUni =
      currentUniId === 'all' ||
      (branch.universityId?.id || branch.universityId) === currentUniId;
    const matchesSearch =
      branch.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
      branch.shortName?.toLowerCase().includes(branchSearch.toLowerCase());
    return matchesUni && matchesSearch;
  });

  const activeFiltersCount = [
    searchParams.get('universityId') &&
      searchParams.get('universityId') !== 'all',
    searchParams.get('branchId') && searchParams.get('branchId') !== 'all',
  ].filter(Boolean).length;

  const updateFilter = (name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    if (name === 'universityId') {
      params.delete('branchId'); // Reset branch when university changes
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('universityId');
    params.delete('branchId');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <DropdownAction
        label="Filter Semesters"
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
          Institution
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => updateFilter('universityId', 'all')}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>All Universities</span>
          {currentUniId === 'all' && (
            <Check className="text-primary size-3.5" />
          )}
        </DropdownMenuItem>
        {universities.length > 8 && (
          <div className="px-2 py-1.5">
            <input
              type="text"
              placeholder="Search institutions..."
              value={uniSearch}
              onChange={(e) => setUniSearch(e.target.value)}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-8 w-full rounded-md border px-2 text-xs focus-visible:ring-1 focus-visible:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredUniversities.map((uni) => (
            <DropdownMenuItem
              key={uni.id}
              onClick={() => updateFilter('universityId', uni.id)}
              className="flex cursor-pointer items-center justify-between"
            >
              <span>{uni.name}</span>
              {currentUniId === uni.id && (
                <Check className="text-primary size-3.5" />
              )}
            </DropdownMenuItem>
          ))}
          {filteredUniversities.length === 0 && (
            <div className="text-muted-foreground px-3 py-2 text-xs">
              No institutions found
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="my-2 border-b" />

        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-[10px] font-bold tracking-wider uppercase">
          Branch
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => updateFilter('branchId', 'all')}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>All Branches</span>
          {currentBranchId === 'all' && (
            <Check className="text-primary size-3.5" />
          )}
        </DropdownMenuItem>
        {branches.length > 8 && (
          <div className="px-2 py-1.5">
            <input
              type="text"
              placeholder="Search branches..."
              value={branchSearch}
              onChange={(e) => setBranchSearch(e.target.value)}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-8 w-full rounded-md border px-2 text-xs focus-visible:ring-1 focus-visible:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredBranches.map((branch) => (
            <DropdownMenuItem
              key={branch.id}
              onClick={() => updateFilter('branchId', branch.id)}
              className="flex cursor-pointer items-center justify-between"
            >
              <span>{branch.name}</span>
              {currentBranchId === branch.id && (
                <Check className="text-primary size-3.5" />
              )}
            </DropdownMenuItem>
          ))}
          {filteredBranches.length === 0 && (
            <div className="text-muted-foreground px-3 py-2 text-xs">
              No branches found
            </div>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator className="my-2 border-b" />
            <DropdownMenuItem
              onClick={clearFilters}
              className="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer font-medium"
            >
              <X className="mr-2 size-3.5" />
              Clear Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownAction>
    </div>
  );
}
