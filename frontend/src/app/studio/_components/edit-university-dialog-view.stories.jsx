import { EditUniversityDialogView } from './edit-university-dialog-view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const universitySchema = z.object({
  name: z.string().min(2),
  shortName: z.string().min(2).max(10),
  slug: z.string().min(2),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  state: z.string().min(2),
  country: z.string().default('India'),
  logo: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

export default {
  title: 'Studio/Academics/EditUniversityDialogView',
  component: EditUniversityDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockUniversity = {
  id: '1',
  name: 'University of Mumbai',
  shortName: 'MU',
  slug: 'mumbai-university',
  logo: '',
  state: 'Maharashtra',
  country: 'India',
  websiteUrl: 'https://mu.ac.in',
  description: 'A historic university in Mumbai.',
};

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
    },
  });

  // Override isSubmitting for visual testing
  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      errors: form.formState.errors,
      isSubmitting: mockSubmitting || form.formState.isSubmitting,
    },
  };

  return <EditUniversityDialogView {...args} form={proxiedForm} />;
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    university: mockUniversity,
    open: true,
    onOpenChange: fn(),
    onSubmit: async (data) => {
      console.log('Update submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};
