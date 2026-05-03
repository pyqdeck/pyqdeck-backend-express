'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddSubjectDialogView } from './add-subject-dialog.view';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional(),
  subjectCode: z.string().max(20).optional(),
  description: z.string().max(1000).optional(),
  credits: z.number().min(0).optional(),
  slug: z.string().min(1, 'Slug is required').max(100),
  isActive: z.boolean().default(true),
});

export function AddSubjectDialog({
  onAdd,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}) {
  'use no memo';
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange =
    controlledOnOpenChange !== undefined
      ? controlledOnOpenChange
      : setInternalOpen;

  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: '',
      shortName: '',
      subjectCode: '',
      description: '',
      credits: 0,
      slug: '',
      isActive: true,
    },
  });

  // Auto-generate slug from name
  const name = form.watch('name');
  React.useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [name, form]);

  const onSubmit = async (data) => {
    try {
      await onAdd(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to add subject:', error);
    }
  };

  return (
    <AddSubjectDialogView
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
