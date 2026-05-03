import { EditModuleDialogView } from './edit-module-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const moduleSchema = z.object({
  moduleNumber: z.number().int().min(1, 'Must be at least 1'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  weightage: z.number().min(0).max(100).optional().nullable(),
  coMapping: z.string().max(50).optional().nullable(),
});

export default {
  title: 'Studio/Curriculum/EditModuleDialog',
  component: EditModuleDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      moduleNumber: 1,
      title: 'Introduction to Artificial Intelligence',
      description: 'Foundational concepts of AI, history, and applications.',
      weightage: 15,
      coMapping: 'CO1',
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

  return <EditModuleDialogView {...args} form={proxiedForm} />;
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
