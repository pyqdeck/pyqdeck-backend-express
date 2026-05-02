'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EditSubjectDialogView } from './edit-subject-dialog.view';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional().nullable(),
  subjectCode: z.string().max(20).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  credits: z.number().min(0).optional().nullable(),
  isActive: z.boolean().default(true),
});

export function EditSubjectDialog({ subject, open, onOpenChange, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: '',
      shortName: '',
      subjectCode: '',
      description: '',
      credits: 0,
      isActive: true,
    },
  });

  // Reset form when subject changes
  React.useEffect(() => {
    if (subject && open) {
      form.reset({
        name: subject.name || '',
        shortName: subject.shortName || '',
        subjectCode: subject.subjectCode || '',
        description: subject.description || '',
        credits: subject.credits || 0,
        isActive: subject.isActive ?? true,
      });
    }
  }, [subject, open, form]);

  const onSubmit = async (data) => {
    try {
      await onUpdate(subject.id, data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  };

  return (
    <EditSubjectDialogView
      subject={subject}
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
