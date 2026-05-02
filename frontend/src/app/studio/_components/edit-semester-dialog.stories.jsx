import { EditSemesterDialogView } from './edit-semester-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const semesterSchema = z.object({
  number: z.number().int().min(1).max(10),
  title: z.string().optional(),
  slug: z.string().min(1),
});

export default {
  title: 'Studio/Academics/EditSemesterDialog',
  component: EditSemesterDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      number: args.semester?.number || 1,
      title: args.semester?.title || '',
      slug: args.semester?.slug || '',
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

  return <EditSemesterDialogView {...args} form={proxiedForm} />;
};

const mockSemester = {
  id: 'sem1',
  number: 5,
  title: 'Semester 5 (Final Year)',
  slug: 'semester-5',
  branchId: 'b1',
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    semester: mockSemester,
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
