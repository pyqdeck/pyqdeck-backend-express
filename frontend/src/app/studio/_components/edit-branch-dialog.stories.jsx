import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';
import { EditBranchDialogView } from './edit-branch-dialog.view';

const branchSchema = z.object({
  name: z.string().min(1, 'Branch name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  branchCode: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
});

const meta = {
  title: 'Studio/Academics/EditBranchDialog',
  component: EditBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    branch: {
      control: 'object',
      description: 'The branch object to edit',
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
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: args.branch?.name || '',
      shortName: args.branch?.shortName || '',
      branchCode: args.branch?.branchCode || '',
      slug: args.branch?.slug || '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (args.branch) {
      reset({
        name: args.branch.name || '',
        shortName: args.branch.shortName || '',
        branchCode: args.branch.branchCode || '',
        slug: args.branch.slug || '',
      });
    }
  }, [args.branch, reset]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
      errors: mockErrors
        ? {
            name: { message: 'Branch name is required' },
            shortName: { message: 'Short name is required' },
            slug: { message: 'Slug is required' },
          }
        : form.formState.errors,
    },
  };

  return <EditBranchDialogView {...args} form={proxiedForm} />;
};

const mockBranch = {
  id: 'b1',
  name: 'Computer Engineering',
  shortName: 'COMP',
  branchCode: '07',
  slug: 'computer-engineering',
  universityId: 'u1',
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    branch: mockBranch,
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
    branch: {
      ...mockBranch,
      name: '',
      shortName: '',
      slug: '',
    },
    mockErrors: true,
  },
};
