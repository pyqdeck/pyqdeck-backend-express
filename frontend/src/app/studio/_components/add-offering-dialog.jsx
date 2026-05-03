'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddOfferingDialogView } from './add-offering-dialog.view';

const offeringSchema = z.object({
  universityId: z.string().min(1, 'University is required'),
  branchId: z.string().min(1, 'Branch is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  regulation: z.string().min(1, 'Regulation is required').max(20),
  academicYear: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  isActive: z.boolean().default(true),
});

export function AddOfferingDialog({
  universities = [],
  branches = [],
  semesters = [],
  subjects = [],
  onAdd,
}) {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(offeringSchema),
    defaultValues: {
      universityId: '',
      branchId: '',
      semesterId: '',
      subjectId: '',
      regulation: '',
      academicYear: '',
      slug: '',
      isActive: true,
    },
  });

  const { watch, setValue } = form;
  const watched = watch();

  // Auto-generate slug: {uni}-{branch}-sem{num}-{subject}-{regulation}
  React.useEffect(() => {
    const { universityId, branchId, semesterId, subjectId, regulation } =
      watched;

    if (universityId && branchId && semesterId && subjectId && regulation) {
      const uni = universities.find((u) => u.id === universityId);
      const branch = branches.find((b) => b.id === branchId);
      const sem = semesters.find((s) => s.id === semesterId);
      const sub = subjects.find((s) => s.id === subjectId);

      if (uni && branch && sem && sub) {
        const uniPart = (uni.shortName || uni.name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        const branchPart = (branch.shortName || branch.name)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        const subPart =
          sub.slug || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const regPart = regulation.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const generatedSlug = `${uniPart}-${branchPart}-sem${sem.number}-${subPart}-${regPart}`;
        setValue('slug', generatedSlug, { shouldValidate: true });
      }
    }
  }, [
    watched.universityId,
    watched.branchId,
    watched.semesterId,
    watched.subjectId,
    watched.regulation,
    universities,
    branches,
    semesters,
    subjects,
    setValue,
  ]);

  const onSubmit = async (data) => {
    try {
      await onAdd(data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create subject offering:', error);
    }
  };

  return (
    <AddOfferingDialogView
      universities={universities}
      branches={branches}
      semesters={semesters}
      subjects={subjects}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={setOpen}
    />
  );
}
