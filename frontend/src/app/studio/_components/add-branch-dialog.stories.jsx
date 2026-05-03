import { AddBranchDialogView } from './add-branch-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const branchSchema = z.object({
  universityId: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  branchCode: z.string().optional(),
  slug: z.string().min(1),
});

const meta = {
  title: 'Studio/Academics/AddBranchDialog',
  component: AddBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      universityId: '',
      name: '',
      shortName: '',
      branchCode: '',
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

  return <AddBranchDialogView {...args} form={proxiedForm} />;
};

const mockUniversities = [
  { id: 'u1', name: 'University of Mumbai', shortName: 'MU' },
  {
    id: 'u2',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IITB',
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    universities: mockUniversities,
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
