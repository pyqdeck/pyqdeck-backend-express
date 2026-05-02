import { AddTopicDialogView } from './add-topic-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const topicSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
  order: z.number().int().default(0),
});

export default {
  title: 'Studio/Curriculum/AddTopicDialog',
  component: AddTopicDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      moduleId: 'mod1',
      title: '',
      description: '',
      slug: '',
      order: 0,
    },
  });

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      errors: form.formState.errors,
      isSubmitting: mockSubmitting,
    },
  };

  return <AddTopicDialogView {...args} form={proxiedForm} />;
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};
