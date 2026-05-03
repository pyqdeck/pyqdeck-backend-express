'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { SemestersTable } from './semesters-table';
import { AddSemesterDialog } from './add-semester-dialog';
import { StudioSearch } from './studio-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function SemesterManagement({
  initialSemesters = [],
  branches = [],
  universities = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  // Sync filters from URL
  const selectedUniId = searchParams.get('universityId') || 'all';
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const search = searchParams.get('search') || '';

  // Filter branches based on selected university
  const filteredBranches =
    selectedUniId === 'all'
      ? branches
      : branches.filter(
          (b) => (b.universityId?.id || b.universityId) === selectedUniId
        );

  const handleUniChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('universityId');
    } else {
      params.set('universityId', value);
    }
    params.delete('branchId'); // Reset branch when university changes
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleBranchChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('branchId');
    } else {
      params.set('branchId', value);
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

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
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Semesters
          </h1>
          <p className="text-muted-foreground font-roboto">
            Define academic periods and curriculum stages.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-xs font-bold tracking-wider uppercase">
              Inst:
            </Label>
            <Select value={selectedUniId} onValueChange={handleUniChange}>
              <SelectTrigger className="font-roboto w-[160px] border-2 focus:ring-0">
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
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-xs font-bold tracking-wider uppercase">
              Branch:
            </Label>
            <Select value={selectedBranchId} onValueChange={handleBranchChange}>
              <SelectTrigger className="font-roboto w-[160px] border-2 focus:ring-0">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                <SelectItem value="all" className="font-roboto">
                  All Branches
                </SelectItem>
                {filteredBranches.map((branch) => (
                  <SelectItem
                    key={branch.id}
                    value={branch.id}
                    className="font-roboto"
                  >
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <StudioSearch
            placeholder="Search semesters..."
            initialValue={search}
          />
          <AddSemesterDialog
            branches={branches}
            defaultBranchId={selectedBranchId !== 'all' ? selectedBranchId : ''}
            onAdd={handleAdd}
          />
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
