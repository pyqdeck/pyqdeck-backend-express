'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EditSyllabusDialogView } from './edit-syllabus-dialog.view';

const formSchema = z.object({
  description: z
    .string()
    .max(2000, 'Description too long')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean().default(true),
});

export function EditSyllabusDialog({ syllabus, open, onOpenChange, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: syllabus?.description || '',
      isActive: syllabus?.isActive ?? true,
    },
  });

  // Reset form when syllabus changes
  React.useEffect(() => {
    if (syllabus) {
      form.reset({
        description: syllabus.description || '',
        isActive: syllabus.isActive ?? true,
      });
    }
  }, [syllabus, form]);

  const onSubmit = async (data) => {
    if (!syllabus?.id && !syllabus?._id) return;
    try {
      await onUpdate(syllabus.id || syllabus._id, data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update syllabus:', error);
    }
  };

  return (
    <EditSyllabusDialogView
      syllabus={syllabus}
      form={form}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
    />
  );
}
