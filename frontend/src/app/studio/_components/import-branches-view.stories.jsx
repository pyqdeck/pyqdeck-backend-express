import { fn } from '@storybook/test';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ImportBranchesView } from './import-branches-view';

const branchSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(20),
  branchCode: z.string().optional().or(z.literal('')),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/ImportBranchesDialog',
  component: ImportBranchesView,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    isImporting: { control: 'boolean' },
    universityName: { control: 'text' },
  },
  args: {
    open: true,
    onOpenChange: fn(),
    onFileChange: fn(),
    onPastedTextChange: fn(),
    onProcessPaste: fn(),
    onDataChange: fn(),
    onImport: fn(),
    setEditingIndex: fn(),
    onEditSubmit: fn(),
    branchSchema: branchSchema,
    universityName: 'University of Mumbai',
    data: [],
    errors: [],
    pastedText: '',
    file: null,
    editingIndex: null,
    isImporting: false,
  },
};

export default meta;

const FormWrapper = (args) => {
  const form = useForm({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      shortName: '',
      branchCode: '',
      slug: '',
      isActive: true,
    },
  });

  return <ImportBranchesView {...args} editForm={form} />;
};

const mockData = [
  {
    name: 'Computer Engineering',
    shortName: 'COMP',
    branchCode: 'CE101',
    slug: 'computer-engineering',
    isActive: true,
  },
  {
    name: 'Information Technology',
    shortName: 'IT',
    branchCode: 'IT202',
    slug: 'information-technology',
    isActive: true,
  },
  {
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    branchCode: 'ME303',
    slug: 'mechanical-engineering',
    isActive: true,
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: [],
  },
};

export const WithData = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: mockData,
  },
};

export const WithParsingWarnings = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: mockData,
    errors: [
      { row: 2, message: 'Invalid short name format' },
      { row: 4, message: 'Missing required field: slug' },
    ],
  },
};

export const WithInvalidRows = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: [
      ...mockData,
      {
        name: 'X', // Too short
        shortName: 'TOO_LONG_SHORT_NAME_BEYOND_20_CHARS',
        branchCode: 'INVALID',
        slug: 's', // Too short
        isActive: true,
      },
    ],
  },
};

export const Importing = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: mockData,
    isImporting: true,
  },
};

export const Editing = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: mockData,
    editingIndex: 0,
  },
};

export const PasteTab = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    data: [],
    pastedText:
      'Name,Short Name,Code,Slug\nComputer Engineering,COMP,CE101,comp-eng',
  },
};
