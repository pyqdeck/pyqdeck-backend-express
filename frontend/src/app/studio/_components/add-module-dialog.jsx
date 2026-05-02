'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddModuleDialogView } from './add-module-dialog.view';

const moduleSchema = z.object({
  syllabusId: z.string().min(1, 'Syllabus ID is required'),
  moduleNumber: z.number().int().min(1, 'Must be at least 1'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  weightage: z.number().min(0).max(100).optional().nullable(),
  coMapping: z.string().max(50).optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
});

export function AddModuleDialog({ syllabusId, onAdd }) {
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      syllabusId: syllabusId || '',
      moduleNumber: 1,
      title: '',
      description: '',
      weightage: 0,
      coMapping: '',
      slug: '',
    },
  });

  const { watch, setValue, reset } = form;
  const title = watch('title');

  // Sync syllabusId if it changes prop-side
  React.useEffect(() => {
    if (syllabusId) {
      setValue('syllabusId', syllabusId);
    }
  }, [syllabusId, setValue]);

  // Auto-generate slug from title
  React.useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, setValue]);

  const onSubmit = async (data) => {
    try {
      await onAdd(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create module:', error);
    }
  };

  return (
    <AddModuleDialogView
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={setOpen}
    />
  );
}
