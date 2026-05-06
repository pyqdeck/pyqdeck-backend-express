import { EditTopicDialogView } from './edit-topic-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn, userEvent, within, expect } from '@storybook/test';

const topicSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().default(0),
});

const meta = {
  title: 'Studio/Academics/EditTopicDialog',
  component: EditTopicDialogView,
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
      description: 'Form submission handler',
    },
    form: {
      control: false,
      description: 'React Hook Form instance',
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, initialData, ...args }) => {
  const form = useForm({
    resolver: zodResolver(topicSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      order: 0,
    },
  });

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
    },
  };

  return <EditTopicDialogView {...args} form={proxiedForm} />;
};

const mockTopic = {
  title: 'Backpropagation Algorithm',
  description:
    'Detailed explanation of the backpropagation algorithm in neural networks, including partial derivatives and weight updates.',
  order: 4,
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    initialData: mockTopic,
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

export const ValidationErrors = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    initialData: {
      title: '',
      description: 'A'.repeat(1001),
      order: 0,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', { name: /update topic/i });
    await userEvent.click(submitButton);

    await expect(canvas.getByText(/title is required/i)).toBeInTheDocument();
    await expect(
      canvas.getByText(/string must contain at most 1000 character/i)
    ).toBeInTheDocument();
  },
};
