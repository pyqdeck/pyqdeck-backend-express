import { fn } from '@storybook/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AddBranchDialogView } from './add-branch-dialog.view';

const branchSchema = z.object({
  universityId: z.string().min(1, 'Please select a university'),
  name: z.string().min(1, 'Branch name is required'),
  shortName: z.string().min(1, 'Short name is required'),
  branchCode: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/AddBranchDialog',
  component: AddBranchDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    universities: {
      control: 'object',
      description: 'List of universities to select from',
    },
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
    },
    onOpenChange: {
      description: 'Callback when open state changes',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
    },
    trigger: {
      control: 'boolean',
      description: 'Whether to show the default trigger button',
    },
  },
  args: {
    onOpenChange: fn(),
    onSubmit: fn(),
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
      isActive: true,
    },
  });

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      isSubmitting: mockSubmitting,
    },
  };

  return <AddBranchDialogView {...args} form={proxiedForm} />;
};

const mockUniversities = [
  {
    id: 'u1',
    name: 'University of Mumbai',
    shortName: 'MU',
  },
  {
    id: 'u2',
    name: 'Savitribai Phule Pune University',
    shortName: 'SPPU',
  },
  {
    id: 'u3',
    name: 'Gujarat Technological University',
    shortName: 'GTU',
  },
  {
    id: 'u4',
    name: 'Anna University',
    shortName: 'AU',
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    universities: mockUniversities,
    open: true,
    trigger: true,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};

export const Empty = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    universities: [],
  },
};

export const WithoutTrigger = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    trigger: false,
  },
};
