import { EditUniversityDialogView } from './edit-university-dialog-view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

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

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: args.university?.name || '',
      shortName: args.university?.shortName || '',
      slug: args.university?.slug || '',
      websiteUrl: args.university?.websiteUrl || '',
      state: args.university?.state || '',
      country: args.university?.country || 'India',
      logo: args.university?.logo || '',
      description: args.university?.description || '',
      isActive: args.university?.isActive ?? true,
    },
  });

  // Override isSubmitting for visual testing
  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting || form.formState.isSubmitting,
    },
  };

  return <EditUniversityDialogView {...args} form={proxiedForm} />;
};

const meta = {
  title: 'Studio/Academics/EditUniversityDialogView',
  component: EditUniversityDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: (args) => <FormWrapper {...args} />,
  args: {
    onOpenChange: fn(),
    onSubmit: fn(),
  },
  argTypes: {
    university: {
      control: 'object',
      description: 'The university object to edit',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description: 'Callback when the open state changes',
    },
    form: {
      control: false,
      description: 'React Hook Form instance',
    },
    onSubmit: {
      description: 'Callback when the form is submitted',
    },
  },
};

export default meta;

const mockUniversity = {
  id: '1',
  name: 'University of Mumbai',
  shortName: 'MU',
  slug: 'mumbai-university',
  logo: 'https://upload.wikimedia.org/wikipedia/en/b/b3/University_of_Mumbai_logo.png',
  state: 'Maharashtra',
  country: 'India',
  websiteUrl: 'https://mu.ac.in',
  description:
    'The University of Mumbai is one of the oldest and premier Universities in India. It was established in 1857 and is one of the first three Universities in India.',
  isActive: true,
};

export const Default = {
  args: {
    university: mockUniversity,
    open: true,
  },
};

export const Submitting = {
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};

export const Empty = {
  args: {
    university: {
      ...mockUniversity,
      name: '',
      shortName: '',
      slug: '',
      logo: '',
      description: '',
    },
    open: true,
  },
};
