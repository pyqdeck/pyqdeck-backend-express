'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { OfferingsTable } from './offerings-table';
import { AddOfferingDialog } from './add-offering-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

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

  // Sync filters from URL
  const selectedUniId = searchParams.get('universityId') || 'all';
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const selectedSemesterId = searchParams.get('semesterId') || 'all';
  const search = searchParams.get('q') || '';

  // Hierarchical filtering for dropdowns
  const filteredBranches =
    selectedUniId === 'all'
      ? branches
      : branches.filter(
          (b) => (b.universityId?.id || b.universityId) === selectedUniId
        );

  const filteredSemesters =
    selectedBranchId === 'all'
      ? semesters
      : semesters.filter(
          (s) => (s.branchId?.id || s.branchId) === selectedBranchId
        );

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset dependent filters
    if (key === 'universityId') {
      params.delete('branchId');
      params.delete('semesterId');
    } else if (key === 'branchId') {
      params.delete('semesterId');
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
          {/* Institution Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Uni
            </Label>
            <Select
              value={selectedUniId}
              onValueChange={(v) => handleFilterChange('universityId', v)}
            >
              <SelectTrigger className="font-roboto w-[140px] border-2 text-xs focus:ring-0">
                <SelectValue placeholder="All Uni" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                <SelectItem value="all" className="font-roboto text-xs">
                  All Uni
                </SelectItem>
                {universities.map((uni) => (
                  <SelectItem
                    key={uni.id}
                    value={uni.id}
                    className="font-roboto text-xs"
                  >
                    {uni.shortName || uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Branch Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Branch
            </Label>
            <Select
              value={selectedBranchId}
              onValueChange={(v) => handleFilterChange('branchId', v)}
            >
              <SelectTrigger className="font-roboto w-[140px] border-2 text-xs focus:ring-0">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                <SelectItem value="all" className="font-roboto text-xs">
                  All Branches
                </SelectItem>
                {filteredBranches.map((branch) => (
                  <SelectItem
                    key={branch.id}
                    value={branch.id}
                    className="font-roboto text-xs"
                  >
                    {branch.shortName || branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Semester Filter */}
          <div className="flex items-center gap-2">
            <Label className="font-roboto text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
              Sem
            </Label>
            <Select
              value={selectedSemesterId}
              onValueChange={(v) => handleFilterChange('semesterId', v)}
            >
              <SelectTrigger className="font-roboto w-[140px] border-2 text-xs focus:ring-0">
                <SelectValue placeholder="All Sem" />
              </SelectTrigger>
              <SelectContent className="border-2 shadow-none">
                <SelectItem value="all" className="font-roboto text-xs">
                  All Sem
                </SelectItem>
                {filteredSemesters.map((sem) => (
                  <SelectItem
                    key={sem.id}
                    value={sem.id}
                    className="font-roboto text-xs"
                  >
                    Semester {sem.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AddOfferingDialog
            subjects={subjects}
            universities={universities}
            branches={branches}
            semesters={semesters}
            onAdd={handleAdd}
          />
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
