'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { SemestersTable } from './semesters-table';
import { AddSemesterDialog } from './add-semester-dialog';
import { StudioSearch } from './studio-search';
import { SemesterFilters } from './semester-filters';
import { Plus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownAction } from '@/components/dropdown-action';

export function SemesterManagement({
  initialSemesters = [],
  branches = [],
  universities = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('search') || '';

  const handleAdd = async (data) => {
    await api.branches.createSemester(data.branchId, data);
    router.refresh();
  };

  const handleUpdate = async (branchId, semesterId, data) => {
    await api.branches.updateSemester(branchId, semesterId, data);
    router.refresh();
  };

  const handleDelete = async (branchId, semesterId) => {
    await api.branches.deleteSemester(branchId, semesterId);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Semesters
          </h1>
          <p className="text-muted-foreground font-roboto">
            Define academic periods and curriculum stages.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Search semesters..."
            initialValue={search}
          />
          <SemesterFilters universities={universities} branches={branches} />
          <DropdownAction label="Management" tooltip="Semester Actions">
            <AddSemesterDialog
              branches={branches}
              defaultBranchId={searchParams.get('branchId') || ''}
              onAdd={handleAdd}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
                >
                  <Plus className="text-muted-foreground mr-3 size-4 transition-colors" />
                  <span className="font-medium">Add Semester</span>
                </DropdownMenuItem>
              }
            />
          </DropdownAction>
        </div>
      </div>

      <SemestersTable
        semesters={initialSemesters}
        pagination={pagination}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
