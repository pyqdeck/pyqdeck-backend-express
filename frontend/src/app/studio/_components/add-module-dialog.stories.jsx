import { AddModuleDialogView } from './add-module-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const moduleSchema = z.object({
  syllabusId: z.string().min(1, 'Syllabus ID is required'),
  moduleNumber: z.number().int().min(1, 'Must be at least 1'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  weightage: z.number().min(0).max(100).optional().nullable(),
  coMapping: z.string().max(50).optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
});

export default {
  title: 'Studio/Curriculum/AddModuleDialog',
  component: AddModuleDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      syllabusId: 'syl1',
      moduleNumber: 1,
      title: '',
      description: '',
      weightage: 0,
      coMapping: '',
      slug: '',
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

  return <AddModuleDialogView {...args} form={proxiedForm} />;
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

export const WithErrors = {
  render: (args) => {
    const form = useForm({
      resolver: zodResolver(moduleSchema),
      defaultValues: {
        syllabusId: '',
        moduleNumber: 0,
        title: '',
        description: 'Too long '.repeat(200),
        weightage: 150,
        coMapping: '',
        slug: '',
      },
    });

    // Manually trigger validation to show errors
    React.useEffect(() => {
      form.trigger();
    }, [form]);

    return <AddModuleDialogView {...args} form={form} />;
  },
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
  },
};
