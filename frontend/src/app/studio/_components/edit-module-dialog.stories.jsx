import { EditModuleDialogView } from './edit-module-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';
import { useEffect } from 'react';

const moduleSchema = z.object({
  moduleNumber: z.number().int().min(1, 'Must be at least 1'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  weightage: z.number().min(0).max(100).optional().nullable(),
  coMapping: z.string().max(50).optional().nullable(),
});

const meta = {
  title: 'Studio/Academics/EditModuleDialog',
  component: EditModuleDialogView,
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
    form: {
      description: 'The react-hook-form instance',
      control: false,
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, initialData, ...args }) => {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: initialData || {
      moduleNumber: 1,
      title: 'Introduction to Artificial Intelligence',
      description: 'Foundational concepts of AI, history, and applications.',
      weightage: 15,
      coMapping: 'CO1',
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

  return <EditModuleDialogView {...args} form={proxiedForm} />;
};

const mockModule = {
  moduleNumber: 2,
  title: 'Machine Learning Fundamentals',
  description:
    'Introduction to supervised and unsupervised learning algorithms.',
  weightage: 20,
  coMapping: 'CO2',
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    initialData: mockModule,
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
        moduleNumber: 0,
        title: '',
        description: 'Exceeding the character limit '.repeat(50),
        weightage: 150,
        coMapping:
          'CO_MAPPING_THAT_IS_TOO_LONG_FOR_THE_LIMIT_DEFINED_IN_SCHEMA',
      },
    });

    useEffect(() => {
      form.trigger();
    }, [form]);

    return <EditModuleDialogView {...args} form={form} />;
  },
  args: {
    ...Default.args,
  },
};
