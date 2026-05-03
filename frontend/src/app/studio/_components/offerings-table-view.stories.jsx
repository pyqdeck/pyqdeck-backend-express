import { OfferingsTableView } from './offerings-table-view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Academics/OfferingsTableView',
  component: OfferingsTableView,
  tags: ['autodocs'],
  args: {
    onSearchChange: fn(),
    onDelete: fn(),
  },
};

const mockOfferings = [
  {
    id: 'o1',
    subjectId: { name: 'Data Structures', subjectCode: 'CS301' },
    universityId: { name: 'University of Mumbai', shortName: 'MU' },
    branchId: { name: 'Computer Engineering', shortName: 'COMP' },
    semesterId: { number: 3 },
    regulation: 'R2019',
    academicYear: '2023-24',
  },
  {
    id: 'o2',
    subjectId: { name: 'Operating Systems', subjectCode: 'CS401' },
    universityId: { name: 'University of Mumbai', shortName: 'MU' },
    branchId: { name: 'Computer Engineering', shortName: 'COMP' },
    semesterId: { number: 4 },
    regulation: 'R2019',
    academicYear: '2023-24',
  },
  {
    id: 'o3',
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
