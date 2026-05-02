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
  title: 'Studio/Universities/AddUniversityDialogView',
  component: AddUniversityDialogView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// A helper component to provide a real react-hook-form context
const FormWrapper = (props) => {
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

  return <AddUniversityDialogView {...props} form={form} />;
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: () => {},
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    open: true,
  },
  parameters: {
    // We can simulate submitting state by manually manipulating the form if needed,
    // but the Default story already handles the async onSubmit.
  },
};
