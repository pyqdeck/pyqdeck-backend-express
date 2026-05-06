import { fn } from '@storybook/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AddUniversityDialogView } from './add-university-dialog-view';

const universitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(10, 'Too long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  state: z.string().min(2, 'State is required'),
  country: z.string().default('India'),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Universities/AddUniversityDialog',
  component: AddUniversityDialogView,
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
      description: 'Callback when the open state changes',
    },
    onSubmit: {
      description: 'Callback when the form is submitted',
    },
    trigger: {
      control: 'text',
      description: 'Custom trigger element (optional)',
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, ...props }) => {
  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: '',
      shortName: '',
      slug: '',
      websiteUrl: '',
      state: '',
      country: 'India',
      logo: '',
      description: '',
      isActive: true,
    },
  });

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting || form.formState.isSubmitting,
    },
  };

  return <AddUniversityDialogView {...props} form={proxiedForm} />;
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
