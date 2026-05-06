import { useEffect } from 'react';
import { AddTopicDialogView } from './add-topic-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const topicSchema = z.object({
  moduleId: z.string().min(1, 'Module ID is required'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  slug: z.string().min(1, 'Slug is required'),
  order: z.number().int().default(0),
});

const meta = {
  title: 'Studio/Academics/AddTopicDialog',
  component: AddTopicDialogView,
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
      description: 'Callback called when the open state changes',
    },
    onSubmit: {
      description: 'Callback called when the form is submitted',
    },
    trigger: {
      control: 'boolean',
      description: 'Whether to show the default trigger button',
      table: { defaultValue: { summary: 'true' } },
    },
    moduleName: {
      control: 'text',
      description: 'Name of the module to which the topic is being added',
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      moduleId: args.moduleId || 'mod_adv_nn_123',
      title: '',
      description: '',
      slug: '',
      order: 0,
    },
  });

  const { watch, setValue } = form;
  const title = watch('title');

  // Auto-generate slug (matching AddTopicDialog container logic)
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  }, [title, setValue]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
    },
  };

  return <AddTopicDialogView {...args} form={proxiedForm} />;
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    moduleName: 'Advanced Neural Networks',
    trigger: false,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};

export const WithTrigger = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    open: false,
    trigger: true,
  },
};
