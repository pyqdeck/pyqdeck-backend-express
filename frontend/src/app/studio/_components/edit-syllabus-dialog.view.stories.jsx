import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';
import { EditSyllabusDialogView } from './edit-syllabus-dialog.view';

const formSchema = z.object({
  description: z
    .string()
    .max(2000, 'Description too long')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/EditSyllabusDialog',
  component: EditSyllabusDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    syllabus: {
      control: 'object',
      description: 'The syllabus object to edit',
    },
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
    mockSubmitting: {
      control: 'boolean',
      description: 'Mock the submitting state',
      table: { category: 'Mocking', defaultValue: { summary: 'false' } },
    },
    mockErrors: {
      control: 'boolean',
      description: 'Mock validation errors',
      table: { category: 'Mocking', defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;

const FormWrapper = ({
  mockSubmitting = false,
  mockErrors = false,
  ...args
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: args.syllabus?.description || '',
      isActive: args.syllabus?.isActive ?? true,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (args.syllabus) {
      reset({
        description: args.syllabus.description || '',
        isActive: args.syllabus.isActive ?? true,
      });
    }
  }, [args.syllabus, reset]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
      errors: mockErrors
        ? {
            description: { message: 'Description too long' },
          }
        : form.formState.errors,
    },
  };

  return <EditSyllabusDialogView {...args} form={proxiedForm} />;
};

const mockSyllabus = {
  id: 'syl_1234567890abcdef12345678',
  description:
    'Complete syllabus for Computer Science Engineering, including core subjects and electives for the 2024 academic year.',
  isActive: true,
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    syllabus: mockSyllabus,
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

export const ValidationErrors = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockErrors: true,
  },
};

export const InactiveSyllabus = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    syllabus: {
      ...mockSyllabus,
      isActive: false,
    },
  },
};
