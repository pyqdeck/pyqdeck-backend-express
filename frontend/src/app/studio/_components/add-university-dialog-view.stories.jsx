import { AddUniversityDialogView } from './add-university-dialog-view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const universitySchema = z.object({
  name: z.string().min(2),
  shortName: z.string().min(2),
  slug: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default('India'),
});

export default {
  title: 'Studio/Academics/AddUniversityDialogView',
  component: AddUniversityDialogView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// A helper component to provide a real react-hook-form context
const FormWrapper = ({ mockSubmitting = false, ...props }) => {
  const form = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: '',
      shortName: '',
      slug: '',
      state: '',
      country: 'India',
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

  return <AddUniversityDialogView {...props} form={proxiedForm} />;
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
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
