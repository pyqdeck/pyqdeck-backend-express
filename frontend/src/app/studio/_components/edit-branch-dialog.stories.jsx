import { EditBranchDialogView } from './edit-branch-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const branchSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  branchCode: z.string().optional(),
  slug: z.string().min(1),
});

export default {
  title: 'Studio/Academics/EditBranchDialog',
  component: EditBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: args.branch?.name || '',
      shortName: args.branch?.shortName || '',
      branchCode: args.branch?.branchCode || '',
      slug: args.branch?.slug || '',
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

  return <EditBranchDialogView {...args} form={proxiedForm} />;
};

const mockBranch = {
  id: 'b1',
  name: 'Computer Engineering',
  shortName: 'COMP',
  branchCode: '07',
  slug: 'computer-engineering',
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
