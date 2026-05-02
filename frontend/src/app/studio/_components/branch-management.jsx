'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { BranchesTable } from './branches-table';
import { AddBranchDialog } from './add-branch-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function BranchManagement({
  initialBranches = [],
  universities = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  // Sync filters from URL
  const selectedUniId = searchParams.get('universityId') || 'all';
  const search = searchParams.get('q') || '';

  const handleUniChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('universityId');
    } else {
      params.set('universityId', value);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-xs font-bold tracking-wider uppercase">
              Institution:
            </Label>
            <Select value={selectedUniId} onValueChange={handleUniChange}>
              <SelectTrigger className="font-roboto w-[200px] border-2 focus:ring-0">
                <SelectValue placeholder="All Universities" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                <SelectItem value="all" className="font-roboto">
                  All Universities
                </SelectItem>
                {universities.map((uni) => (
                  <SelectItem
                    key={uni.id}
                    value={uni.id}
                    className="font-roboto"
                  >
                    {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AddBranchDialog
            universities={universities}
            defaultUniversityId={selectedUniId !== 'all' ? selectedUniId : ''}
            onAdd={handleAdd}
          />
        </div>
      </div>

      <BranchesTable
        branches={initialBranches}
        pagination={pagination}
        search={search}
        onSearchChange={handleSearchChange}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
