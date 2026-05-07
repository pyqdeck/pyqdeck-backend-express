import { fn } from '@storybook/test';
import { BranchesTableView } from './branches-table-view';

export default {
  title: 'Studio/Academics/BranchesTable',
  component: BranchesTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    branches: {
      control: 'object',
      description: 'Array of branch objects to display',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    pagination: {
      control: 'object',
      description: 'Pagination state object',
    },
    onEdit: {
      action: 'onEdit',
      description: 'Callback when edit button is clicked',
    },
    onDelete: {
      action: 'onDelete',
      description: 'Callback when delete button is clicked',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the table is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
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
  {
    id: 'b4',
    name: 'Electronics and Telecommunication',
    shortName: 'EXTC',
    slug: 'electronics-telecommunication',
    branchCode: '12',
    isActive: true,
    universityId: {
      id: 'u1',
      name: 'University of Mumbai',
      shortName: 'MU',
    },
  },
  {
    id: 'b5',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    slug: 'civil-engineering',
    branchCode: '01',
    isActive: true,
    universityId: {
      id: 'u3',
      name: 'Savitribai Phule Pune University',
      shortName: 'SPPU',
    },
  },
];

export const Default = {
  args: {
    branches: mockBranches,
    loading: false,
    pagination: {
      total: 5,
      pages: 1,
      current: 1,
    },
  },
};

export const WithPagination = {
  args: {
    branches: mockBranches,
    loading: false,
    pagination: {
      total: 25,
      pages: 5,
      current: 1,
    },
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
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
  },
};

export const NoResults = {
  args: {
    branches: [],
    loading: false,
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'NonExistentBranch',
        },
      },
    },
  },
};
