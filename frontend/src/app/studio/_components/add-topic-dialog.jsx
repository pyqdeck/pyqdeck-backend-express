'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddTopicDialogView } from './add-topic-dialog.view';

const topicSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
  order: z.number().int().default(0),
});

export function AddTopicDialog({
  moduleId,
  moduleName,
  onAdd,
  open,
  onOpenChange,
}) {
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      moduleId: moduleId || '',
      title: '',
      description: '',
      slug: '',
      order: 0,
    },
  });

  const { watch, setValue, reset } = form;
  const title = watch('title');

  // Sync moduleId if it changes
  React.useEffect(() => {
    if (moduleId) {
      setValue('moduleId', moduleId);
    }
  }, [moduleId, setValue]);

  // Auto-generate slug
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
      onOpenChange?.(false);
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  return (
    <AddTopicDialogView
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
      moduleName={moduleName}
    />
  );
}
