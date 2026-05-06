import { SubjectsTableView } from './subjects-table-view';
import { fn } from '@storybook/test';

/**
 * The `SubjectsTableView` component provides a tabular view of academic subjects.
 * It supports loading states, empty states, and pagination.
 */
const meta = {
  title: 'Studio/Academics/SubjectsTableView',
  component: SubjectsTableView,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the table is in a loading state',
    },
    subjects: {
      control: { type: 'object' },
      description: 'Array of subject objects to display',
    },
    pagination: {
      control: { type: 'object' },
      description: 'Pagination configuration object',
    },
    onEdit: { action: 'onEdit' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
  render: (args) => <SubjectsTableView {...args} />,
};

export default meta;

const mockSubjects = [
  {
    id: 's1',
    name: 'Data Structures and Algorithms',
    slug: 'data-structures-and-algorithms',
    code: 'CS301',
    isActive: true,
    units: [{}, {}, {}, {}],
  },
  {
    id: 's2',
    name: 'Computer Networks',
    slug: 'computer-networks',
    code: 'CS302',
    isActive: true,
    units: [{}, {}, {}],
  },
  {
    id: 's3',
    name: 'Operating Systems',
    slug: 'operating-systems',
    code: 'CS303',
    isActive: false,
    units: [{}, {}, {}, {}, {}],
  },
  {
    id: 's4',
    name: 'Database Management Systems',
    slug: 'dbms',
    code: 'CS304',
    isActive: true,
    units: [{}, {}, {}, {}],
  },
  {
    id: 's5',
    name: 'Software Engineering',
    slug: 'software-engineering',
    code: 'CS305',
    isActive: true,
    units: [{}, {}, {}, {}, {}, {}],
  },
];

export const Default = {
  args: {
    subjects: mockSubjects.slice(0, 3),
    pagination: {
      total: 3,
      pages: 1,
      current: 1,
    },
    loading: false,
  },
};

export const Loading = {
  args: {
    subjects: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    subjects: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
    loading: false,
  },
};

export const Paginated = {
  args: {
    subjects: mockSubjects,
    pagination: {
      total: 25,
      pages: 3,
      current: 1,
    },
    loading: false,
  },
};
