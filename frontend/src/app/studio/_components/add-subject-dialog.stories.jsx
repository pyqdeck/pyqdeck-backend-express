import { AddSubjectDialogView } from './add-subject-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional(),
  subjectCode: z.string().max(20).optional(),
  description: z.string().max(1000).optional(),
  credits: z.number().min(0).optional(),
  slug: z.string().min(1, 'Slug is required').max(100),
  isActive: z.boolean().default(true),
});

export default {
  title: 'Studio/Academics/AddSubjectDialog',
  component: AddSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
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

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      errors: form.formState.errors,
      isSubmitting: mockSubmitting,
    },
  };

  return <AddSubjectDialogView {...args} form={proxiedForm} />;
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
