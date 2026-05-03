'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { OfferingsTable } from './offerings-table';
import { AddOfferingDialog } from './add-offering-dialog';
import { OfferingFilters } from './offering-filters';
import { Plus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownAction } from '@/components/dropdown-action';

export function OfferingManagement({
  initialOfferings = [],
  universities = [],
  branches = [],
  semesters = [],
  subjects = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('q') || '';

  const handleSearchChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleAdd = async (data) => {
    await api.subjectOfferings.createSubjectOffering(data);
    router.refresh();
  };

  const handleDelete = async (id) => {
    await api.subjectOfferings.deleteSubjectOffering(id);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Subject Offerings
          </h1>
          <p className="text-muted-foreground font-roboto">
            Deploy subjects to specific semesters and academic tracks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <OfferingFilters
            universities={universities}
            branches={branches}
            semesters={semesters}
          />
          <DropdownAction label="Management" tooltip="Offering Actions">
            <AddOfferingDialog
              subjects={subjects}
              universities={universities}
              branches={branches}
              semesters={semesters}
              onAdd={handleAdd}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
                >
                  <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
                  <span className="font-medium">Add Offering</span>
                </DropdownMenuItem>
              }
            />
          </DropdownAction>
        </div>
      </div>

      <OfferingsTable
        offerings={initialOfferings}
        pagination={pagination}
        search={search}
        onSearchChange={handleSearchChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
