'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { StudioSearch } from './studio-search';
import { AddUniversityDialog } from './add-university-dialog';
import { DropdownAction } from '@/components/dropdown-action';
import { UniversityFilters } from './university-filters';

export function UniversitiesHeaderActions({ search }) {
  return (
    <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
      <StudioSearch
        placeholder="Search universities..."
        initialValue={search}
      />
      <UniversityFilters />
      <DropdownAction label="Management" tooltip="Studio Actions">
        <AddUniversityDialog
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
            >
              <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
              <span className="font-medium">Add University</span>
            </DropdownMenuItem>
          }
        />
      </DropdownAction>
    </div>
  );
}
