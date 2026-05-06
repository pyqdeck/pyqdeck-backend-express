import { EditSubjectDialogView } from './edit-subject-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';
import { useEffect } from 'react';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional().nullable(),
  subjectCode: z.string().max(20).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  credits: z.number().min(0).optional().nullable(),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/EditSubjectDialog',
  component: EditSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    subject: {
      control: 'object',
      description: 'The subject data to edit',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description: 'Callback when the open state changes',
      action: 'onOpenChange',
    },
    onSubmit: {
      description: 'Callback when the form is submitted',
      action: 'onSubmit',
    },
    mockSubmitting: {
      control: 'boolean',
      description: 'Mock the submitting state of the form',
      table: { defaultValue: { summary: 'false' } },
    },
    mockErrors: {
      control: 'object',
      description: 'Mock form validation errors',
    },
  },
};

export default meta;

const FormWrapper = ({
  mockSubmitting = false,
  mockErrors = null,
  subject,
  ...args
}) => {
  const form = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: subject?.name || '',
      shortName: subject?.shortName || '',
      subjectCode: subject?.subjectCode || '',
      description: subject?.description || '',
      credits: subject?.credits || 0,
      isActive: subject?.isActive ?? true,
    },
  });

  // Sync form with subject prop changes
  useEffect(() => {
    if (subject) {
      form.reset({
        name: subject.name || '',
        shortName: subject.shortName || '',
        subjectCode: subject.subjectCode || '',
        description: subject.description || '',
        credits: subject.credits || 0,
        isActive: subject.isActive ?? true,
      });
    }
  }, [subject, form]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
      errors: mockErrors || form.formState.errors,
    },
  };

  return <EditSubjectDialogView {...args} subject={subject} form={proxiedForm} />;
};

const mockSubject = {
  id: 'subj-101',
  name: 'Advanced Data Structures',
  shortName: 'ADS',
  subjectCode: 'CS302',
  description:
    'In-depth study of advanced data structures including B-trees, Fibonacci heaps, and graph algorithms.',
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

export const ValidationError = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockErrors: {
      name: { message: 'Subject name is required' },
    },
  },
};
