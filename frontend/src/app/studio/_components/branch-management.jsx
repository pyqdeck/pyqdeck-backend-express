'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { BranchesTable } from './branches-table';
import { AddBranchDialog } from './add-branch-dialog';
import { StudioSearch } from './studio-search';
import { BranchFilters } from './branch-filters';
import { Plus } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownAction } from '@/components/dropdown-action';

export function BranchManagement({
  initialBranches = [],
  universities = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const search = searchParams.get('search') || '';

  const handleAdd = async (data) => {
    const universityId = data.universityId;
    await api.universities.createBranch(universityId, data);
    router.refresh();
  };

  const handleUpdate = async (universityId, branchId, data) => {
    await api.universities.updateBranch(universityId, branchId, data);
    router.refresh();
  };

  const handleDelete = async (universityId, branchId) => {
    await api.universities.deleteBranch(universityId, branchId);
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Branches
          </h1>
          <p className="text-muted-foreground font-roboto">
            Manage academic courses and specializations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StudioSearch
            placeholder="Search branches..."
            initialValue={search}
          />
          <BranchFilters universities={universities} />
          <DropdownAction label="Management" tooltip="Branch Actions">
            <AddBranchDialog
              universities={universities}
              defaultUniversityId={selectedUniId !== 'all' ? selectedUniId : ''}
              onAdd={handleAdd}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
                >
                  <Plus className="text-muted-foreground group-hover:text-primary mr-3 size-4 transition-colors" />
                  <span className="font-medium">Add New Branch</span>
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem
              className="focus:bg-primary/5 group cursor-pointer rounded-md py-2.5"
              onClick={() => router.refresh()}
            >
              <RefreshCcw className="text-muted-foreground group-hover:text-success mr-3 size-4 transition-colors" />
              <span className="font-medium">Refresh Data</span>
            </DropdownMenuItem>
          </DropdownAction>
        </div>
      </div>

      <BranchesTable
        branches={initialBranches}
        pagination={pagination}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
