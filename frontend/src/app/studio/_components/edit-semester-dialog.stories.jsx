import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';
import { EditSemesterDialogView } from './edit-semester-dialog.view';

const semesterSchema = z.object({
  number: z
    .string()
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().int().min(1).max(10)),
  title: z.string().optional().or(z.literal('')),
  slug: z.string().min(1, 'Slug is required'),
});

const meta = {
  title: 'Studio/Academics/EditSemesterDialog',
  component: EditSemesterDialogView,
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
    semester: {
      description: 'The semester object to edit',
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      number: args.semester?.number?.toString() || '',
      title: args.semester?.title || '',
      slug: args.semester?.slug || '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (args.semester) {
      reset({
        number: args.semester.number.toString(),
        title: args.semester.title || '',
        slug: args.semester.slug || '',
      });
    }
  }, [args.semester, reset]);

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
    },
  };

  return <EditSemesterDialogView {...args} form={proxiedForm} />;
};

const mockSemester = {
  id: 'sem5',
  number: 5,
  title: 'Fifth Semester (3rd Year)',
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
