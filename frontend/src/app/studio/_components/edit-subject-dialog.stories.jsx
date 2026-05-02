import { EditSubjectDialogView } from './edit-subject-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional().nullable(),
  subjectCode: z.string().max(20).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  credits: z.number().min(0).optional().nullable(),
  isActive: z.boolean().default(true),
});

export default {
  title: 'Studio/Academics/EditSubjectDialog',
  component: EditSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: args.subject?.name || '',
      shortName: args.subject?.shortName || '',
      subjectCode: args.subject?.subjectCode || '',
      description: args.subject?.description || '',
      credits: args.subject?.credits || 0,
      isActive: args.subject?.isActive ?? true,
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

  return <EditSubjectDialogView {...args} form={proxiedForm} />;
};

const mockSubject = {
  id: 's1',
  name: 'Data Structures and Algorithms',
  shortName: 'DSA',
  subjectCode: 'CS301',
  description: 'Core course on data structures and algorithmic complexity.',
  credits: 4,
  isActive: true,
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    subject: mockSubject,
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
