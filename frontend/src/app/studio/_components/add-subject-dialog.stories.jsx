import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';
import { AddSubjectDialogView } from './add-subject-dialog.view';

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  shortName: z.string().max(50).optional(),
  subjectCode: z.string().max(20).optional(),
  description: z.string().max(1000).optional(),
  credits: z.number().min(0).optional(),
  slug: z.string().min(1, 'Slug is required').max(100),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/AddSubjectDialog',
  component: AddSubjectDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description: 'Callback when open state changes',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
    },
    trigger: {
      control: 'boolean',
      description: 'Whether to show the trigger button',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;

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

  const name = form.watch('name');
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      form.setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [name, form]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
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
    trigger: true,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};

export const WithoutTrigger = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    trigger: false,
  },
};
