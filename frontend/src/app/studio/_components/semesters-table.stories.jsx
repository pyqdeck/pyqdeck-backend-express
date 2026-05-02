import { SemestersTableView } from './semesters-table.view';
import { fn } from '@storybook/test';

export default {
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
};

const mockSemesters = [
  {
    id: 'sem1',
    number: 1,
    title: 'Semester 1',
    slug: 'semester-1',
    branchId: {
      id: 'b1',
      name: 'Computer Engineering',
      universityId: { shortName: 'MU' },
    },
  },
  {
    id: 'sem2',
    number: 2,
    title: 'Semester 2',
    slug: 'semester-2',
    branchId: {
      id: 'b1',
      name: 'Computer Engineering',
      universityId: { shortName: 'MU' },
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

export const Empty = {
  args: {
    semesters: [],
    onEdit: fn(),
    onDelete: fn(),
  },
};
