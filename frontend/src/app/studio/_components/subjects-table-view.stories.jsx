import { SubjectsTableView } from './subjects-table-view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/SubjectsTableView',
  component: SubjectsTableView,
  tags: ['autodocs'],
  args: {
    onSearchChange: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

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
];

export const Default = {
  args: {
    subjects: mockSubjects,
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
