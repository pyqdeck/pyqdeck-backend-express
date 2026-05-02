import { AddOfferingDialogView } from './add-offering-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';

const offeringSchema = z.object({
  universityId: z.string().min(1, 'University is required'),
  branchId: z.string().min(1, 'Branch is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  regulation: z.string().min(1, 'Regulation is required').max(20),
  academicYear: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  isActive: z.boolean().default(true),
});

export default {
  title: 'Studio/Academics/AddOfferingDialog',
  component: AddOfferingDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

const mockUniversities = [
  { id: 'u1', name: 'University of Mumbai', shortName: 'MU' },
  {
    id: 'u2',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IITB',
  },
];

const mockBranches = [
  {
    id: 'b1',
    name: 'Computer Engineering',
    shortName: 'COMP',
    universityId: 'u1',
  },
  {
    id: 'b2',
    name: 'Information Technology',
    shortName: 'IT',
    universityId: 'u1',
  },
  {
    id: 'b3',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    universityId: 'u2',
  },
];

const mockSemesters = [
  { id: 's1', number: 1, branchId: 'b1' },
  { id: 's2', number: 2, branchId: 'b1' },
  { id: 's3', number: 3, branchId: 'b1' },
  { id: 's4', number: 1, branchId: 'b3' },
];

const mockSubjects = [
  {
    id: 'sub1',
    name: 'Data Structures',
    subjectCode: 'CS301',
    slug: 'data-structures',
  },
  {
    id: 'sub2',
    name: 'Operating Systems',
    subjectCode: 'CS401',
    slug: 'operating-systems',
  },
  {
    id: 'sub3',
    name: 'Thermodynamics',
    subjectCode: 'ME201',
    slug: 'thermodynamics',
  },
];

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(offeringSchema),
    defaultValues: {
      universityId: '',
      branchId: '',
      semesterId: '',
      subjectId: '',
      regulation: '',
      academicYear: '',
      slug: '',
      isActive: true,
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

  return (
    <AddOfferingDialogView
      {...args}
      form={proxiedForm}
      universities={mockUniversities}
      branches={mockBranches}
      semesters={mockSemesters}
      subjects={mockSubjects}
    />
  );
};

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
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
