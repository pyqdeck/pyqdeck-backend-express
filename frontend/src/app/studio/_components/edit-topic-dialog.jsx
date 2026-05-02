'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EditTopicDialogView } from './edit-topic-dialog.view';

const topicSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().default(0),
});

export function EditTopicDialog({ topic, open, onOpenChange, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: topic?.title || '',
      description: topic?.description || '',
      order: topic?.order || 0,
    },
  });

  const { reset } = form;

  // Reset form when topic changes or dialog opens
  React.useEffect(() => {
    if (open && topic) {
      reset({
        title: topic.title,
        description: topic.description || '',
        order: topic.order || 0,
      });
    }
  }, [open, topic, reset]);

  const onSubmit = async (data) => {
    try {
      await onUpdate(topic.id || topic._id, data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update topic:', error);
    }
  };

  return (
    <EditTopicDialogView
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
