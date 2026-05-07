import { OfferingsTableView } from './offerings-table-view';
import { fn } from '@storybook/test';

const meta = {
  title: 'Studio/Academics/OfferingsTable',
  component: OfferingsTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    offerings: {
      control: 'object',
      description: 'List of subject offerings to display',
    },
    pagination: {
      control: 'object',
      description: 'Pagination state',
    },
    search: {
      control: 'text',
      description: 'Search query for filtering offerings',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the table',
      table: { defaultValue: { summary: 'false' } },
    },
    onDelete: {
      description: 'Callback when an offering is withdrawn',
    },
  },
  args: {
    onDelete: fn(),
    search: '',
  },
};

export default meta;

const mockOfferings = [
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d1',
    subjectId: { name: 'Data Structures', subjectCode: 'CS301' },
    universityId: { name: 'University of Mumbai', shortName: 'MU' },
    branchId: { name: 'Computer Engineering', shortName: 'COMP' },
    semesterId: { number: 3 },
    regulation: 'R2019',
    academicYear: '2023-24',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d2',
    subjectId: { name: 'Operating Systems', subjectCode: 'CS401' },
    universityId: { name: 'University of Mumbai', shortName: 'MU' },
    branchId: { name: 'Computer Engineering', shortName: 'COMP' },
    semesterId: { number: 4 },
    regulation: 'R2019',
    academicYear: '2023-24',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d3',
    subjectId: { name: 'Mathematics-III', subjectCode: 'MA301' },
    universityId: { name: 'IIT Bombay', shortName: 'IITB' },
    branchId: { name: 'Mechanical Engineering', shortName: 'MECH' },
    semesterId: { number: 3 },
    regulation: '2022',
    academicYear: '2024-25',
  },
];

export const Default = {
  args: {
    offerings: mockOfferings,
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
    offerings: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    offerings: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
    loading: false,
  },
};

export const WithPagination = {
  args: {
    offerings: mockOfferings,
    pagination: {
      total: 30,
      pages: 10,
      current: 1,
    },
    loading: false,
  },
};

export const NoResults = {
  args: {
    offerings: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
    search: 'Quantum Physics',
    loading: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Quantum Physics',
        },
      },
    },
  },
};
