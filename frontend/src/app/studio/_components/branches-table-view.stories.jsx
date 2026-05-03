import { BranchesTableView } from './branches-table-view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/BranchesTableView',
  component: BranchesTableView,
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
};

const mockBranches = [
  {
    id: 'b1',
    name: 'Computer Engineering',
    shortName: 'COMP',
    slug: 'computer-engineering',
    branchCode: '07',
    isActive: true,
    universityId: {
      id: 'u1',
      name: 'University of Mumbai',
      shortName: 'MU',
    },
  },
  {
    id: 'b2',
    name: 'Information Technology',
    shortName: 'IT',
    slug: 'information-technology',
    branchCode: '10',
    isActive: true,
    universityId: {
      id: 'u1',
      name: 'University of Mumbai',
      shortName: 'MU',
    },
  },
  {
    id: 'b3',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    slug: 'mechanical-engineering',
    branchCode: '03',
    isActive: false,
    universityId: {
      id: 'u2',
      name: 'Indian Institute of Technology Bombay',
      shortName: 'IITB',
    },
  },
];

export const Default = {
  args: {
    branches: mockBranches,
    loading: false,
  },
};

export const Loading = {
  args: {
    branches: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    branches: [],
    loading: false,
  },
};

export const Searching = {
  args: {
    branches: [],
    loading: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Computer',
        },
      },
    },
  },
};
