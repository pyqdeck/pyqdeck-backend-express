import { AddSemesterDialogView } from './add-semester-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const semesterSchema = z.object({
  branchId: z.string().min(1),
  number: z.number().int().min(1).max(10),
  title: z.string().optional(),
  slug: z.string().min(1),
});

export default {
  title: 'Studio/Academics/AddSemesterDialog',
  component: AddSemesterDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      branchId: '',
      number: '',
      title: '',
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

  return <AddSemesterDialogView {...args} form={proxiedForm} />;
};

const mockBranches = [
  { id: 'b1', name: 'Computer Engineering', universityId: { shortName: 'MU' } },
  {
    id: 'b2',
    name: 'Mechanical Engineering',
    universityId: { shortName: 'IITB' },
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    branches: mockBranches,
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
