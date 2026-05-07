import { SemestersTableView } from './semesters-table.view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Academics/SemestersTable',
  component: SemestersTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    semesters: {
      description: 'Array of semester objects to display in the table',
      control: 'object',
    },
    pagination: {
      description: 'Pagination state and configuration',
      control: 'object',
    },
    loading: {
      description: 'Whether the table is in a loading state',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onEdit: {
      description: 'Callback function when the edit action is triggered',
      action: 'edited',
    },
    onDelete: {
      description: 'Callback function when the delete action is triggered',
      action: 'deleted',
    },
  },
};

export default meta;

const mockSemesters = [
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d1',
    number: 1,
    title: 'Autumn Semester 2023',
    slug: 'autumn-2023',
    branchId: {
      id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Computer Science & Engineering',
      universityId: {
        id: '65f1a2b3c4d5e6f7a8b9c0d3',
        shortName: 'MU',
      },
    },
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d4',
    number: 2,
    title: 'Spring Semester 2024',
    slug: 'spring-2024',
    branchId: {
      id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Computer Science & Engineering',
      universityId: {
        id: '65f1a2b3c4d5e6f7a8b9c0d3',
        shortName: 'MU',
      },
    },
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d5',
    number: 3,
    title: null,
    slug: 'semester-3',
    branchId: {
      id: '65f1a2b3c4d5e6f7a8b9c0d2',
      name: 'Computer Science & Engineering',
      universityId: {
        id: '65f1a2b3c4d5e6f7a8b9c0d3',
        shortName: 'MU',
      },
    },
  },
];

export const Default = {
  args: {
    semesters: mockSemesters,
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Empty = {
  args: {
    ...Default.args,
    semesters: [],
  },
};

export const Searching = {
  args: {
    ...Empty.args,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Advanced Mathematics',
        },
      },
    },
  },
};

export const Paginated = {
  args: {
    ...Default.args,
    pagination: {
      current: 1,
      pages: 5,
      total: 48,
    },
  },
};

export const MiddlePage = {
  args: {
    ...Default.args,
    pagination: {
      current: 3,
      pages: 5,
      total: 48,
    },
  },
};
