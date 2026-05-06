import * as React from 'react';
import { AddSemesterDialogView } from './add-semester-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { fn } from '@storybook/test';

const semesterSchema = z.object({
  branchId: z.string().min(1, 'Please select a branch'),
  number: z
    .string()
    .transform((v) => parseInt(v, 10))
    .pipe(z.number().int().min(1).max(10)),
  title: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
});

const meta = {
  title: 'Studio/Academics/AddSemesterDialog',
  component: AddSemesterDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    branches: {
      description: 'List of available branches to associate with the semester',
      control: 'object',
    },
    form: {
      description: 'React Hook Form instance',
      control: false,
    },
    onSubmit: {
      description: 'Function called when the form is submitted',
    },
    open: {
      description: 'Whether the dialog is open',
      control: 'boolean',
    },
    onOpenChange: {
      description: 'Function called when the dialog open state changes',
    },
    trigger: {
      description: 'Whether to show the default trigger button',
      control: 'boolean',
    },
  },
  args: {
    onOpenChange: fn(),
    onSubmit: fn(),
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, initialData, ...args }) => {
  const form = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: initialData || {
      branchId: '',
      number: '',
      title: '',
      slug: '',
    },
  });

  const { watch, setValue } = form;
  const number = watch('number');

  React.useEffect(() => {
    if (number) {
      setValue('slug', `semester-${number}`);
      setValue('title', `Semester ${number}`);
    }
  }, [number, setValue]);

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
  {
    id: 'b1',
    name: 'Computer Engineering',
    universityId: { shortName: 'MU' },
  },
  {
    id: 'b2',
    name: 'Mechanical Engineering',
    universityId: { shortName: 'IITB' },
  },
  {
    id: 'b3',
    name: 'Electronics and Telecommunication',
    universityId: { shortName: 'MU' },
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    branches: mockBranches,
    open: true,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};

export const Closed = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    open: false,
  },
};

export const ValidationErrors = {
  render: (args) => {
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
        errors: {
          branchId: { message: 'Please select a branch' },
          number: { message: 'Semester number must be between 1 and 10' },
          slug: { message: 'Slug is required' },
        },
      },
    };

    return <AddSemesterDialogView {...args} form={proxiedForm} />;
  },
  args: {
    ...Default.args,
  },
};
