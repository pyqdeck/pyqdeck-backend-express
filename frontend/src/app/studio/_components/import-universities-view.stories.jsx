import { fn } from '@storybook/test';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ImportUniversitiesView } from './import-universities-view';

const universitySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shortName: z
    .string()
    .min(2, 'Short name must be at least 2 characters')
    .max(10, 'Too long'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  websiteUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  state: z.string().min(2, 'State is required'),
  country: z.string().default('India'),
  logo: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
});

const meta = {
  title: 'Studio/Universities/ImportUniversitiesView',
  component: ImportUniversitiesView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    isImporting: { control: 'boolean' },
    editingIndex: { control: 'number' },
  },
};

export default meta;

const StateWrapper = ({
  initialData = [],
  initialFile = null,
  initialPastedText = '',
  initialErrors = [],
  initialEditingIndex = null,
  mockImporting = false,
  ...args
}) => {
  const [open, setOpen] = React.useState(args.open ?? true);
  const [file, setFile] = React.useState(initialFile);
  const [pastedText, setPastedText] = React.useState(initialPastedText);
  const [data, setData] = React.useState(initialData);
  const [errors, setErrors] = React.useState(initialErrors);
  const [editingIndex, setEditingIndex] = React.useState(initialEditingIndex);

  const editForm = useForm({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      name: '',
      shortName: '',
      slug: '',
      websiteUrl: '',
      state: '',
      country: 'India',
      logo: '',
      isActive: true,
      description: '',
    },
  });

  const handleEditSubmit = (values) => {
    if (editingIndex === null) return;
    const newData = [...data];
    newData[editingIndex] = values;
    setData(newData);
    setEditingIndex(null);
  };

  return (
    <ImportUniversitiesView
      {...args}
      open={open}
      onOpenChange={setOpen}
      file={file}
      onFileChange={setFile}
      pastedText={pastedText}
      onPastedTextChange={setPastedText}
      onProcessPaste={() => {
        // Simple mock processing
        setData([
          {
            name: 'Pasted University',
            shortName: 'PU',
            slug: 'pasted-university',
            state: 'Maharashtra',
            country: 'India',
            isActive: true,
          },
        ]);
        setPastedText('');
      }}
      data={data}
      onDataChange={setData}
      errors={errors}
      isImporting={mockImporting}
      onImport={fn()}
      editingIndex={editingIndex}
      setEditingIndex={setEditingIndex}
      editForm={editForm}
      onEditSubmit={handleEditSubmit}
      universitySchema={universitySchema}
    />
  );
};

const mockData = [
  {
    name: 'University of Mumbai',
    shortName: 'MU',
    slug: 'mumbai-university',
    websiteUrl: 'https://mu.ac.in',
    state: 'Maharashtra',
    country: 'India',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Mumbai_logo.png/220px-University_of_Mumbai_logo.png',
    isActive: true,
    description: 'One of the oldest universities in India.',
  },
  {
    name: 'Delhi University',
    shortName: 'DU',
    slug: 'delhi-university',
    websiteUrl: 'https://du.ac.in',
    state: 'Delhi',
    country: 'India',
    logo: '',
    isActive: true,
    description: 'Premier university of the country.',
  },
  {
    name: 'Savitribai Phule Pune University',
    shortName: 'SPPU',
    slug: 'pune-university',
    websiteUrl: 'https://unipune.ac.in',
    state: 'Maharashtra',
    country: 'India',
    logo: '',
    isActive: false,
    description: 'Oxford of the East.',
  },
];

export const Default = {
  render: (args) => <StateWrapper {...args} />,
  args: {
    open: true,
  },
};

export const PasteTab = {
  render: (args) => (
    <StateWrapper
      {...args}
      initialPastedText="Name,ShortName,Slug\nTest Uni,TU,test-uni"
    />
  ),
  args: {
    open: true,
  },
};

export const WithData = {
  render: (args) => <StateWrapper {...args} initialData={mockData} />,
  args: {
    open: true,
  },
};

export const WithErrors = {
  render: (args) => (
    <StateWrapper
      {...args}
      initialData={[
        ...mockData,
        {
          name: 'I', // Invalid: too short
          shortName: '', // Invalid: too short
          slug: 'inv',
          state: '',
          country: 'India',
          isActive: true,
        },
      ]}
      initialErrors={[
        { row: 4, message: 'Missing required fields: Name, Short Name, State' },
      ]}
    />
  ),
  args: {
    open: true,
  },
};

export const Importing = {
  render: (args) => (
    <StateWrapper {...args} initialData={mockData} mockImporting={true} />
  ),
  args: {
    open: true,
  },
};

export const EditingRow = {
  render: (args) => (
    <StateWrapper {...args} initialData={mockData} initialEditingIndex={0} />
  ),
  args: {
    open: true,
  },
};
