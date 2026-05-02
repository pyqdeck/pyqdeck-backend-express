import { UniversitiesTableView } from './universities-table-view';
import { fn } from '@storybook/test';

export default {
  title: 'Studio/Universities/UniversitiesTableView',
  component: UniversitiesTableView,
  tags: ['autodocs'],
  args: {
    onSearchChange: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
};

const mockUniversities = [
  {
    id: '1',
    name: 'University of Mumbai',
    shortName: 'MU',
    slug: 'mumbai-university',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/University_of_Mumbai_logo.png/220px-University_of_Mumbai_logo.png',
    state: 'Maharashtra',
    country: 'India',
    websiteUrl: 'https://mu.ac.in',
    isActive: true,
  },
  {
    id: '2',
    name: 'Delhi University',
    shortName: 'DU',
    slug: 'delhi-university',
    logo: '',
    state: 'Delhi',
    country: 'India',
    websiteUrl: 'https://du.ac.in',
    isActive: true,
  },
  {
    id: '3',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IITB',
    slug: 'iit-bombay',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png',
    state: 'Maharashtra',
    country: 'India',
    websiteUrl: 'https://iitb.ac.in',
    isActive: true,
  },
  {
    id: '4',
    name: 'Savitribai Phule Pune University',
    shortName: 'SPPU',
    slug: 'pune-university',
    logo: '',
    state: 'Maharashtra',
    country: 'India',
    websiteUrl: 'https://unipune.ac.in',
    isActive: false,
  },
];

export const Default = {
  args: {
    universities: mockUniversities,
    pagination: {
      total: 4,
      pages: 1,
      current: 1,
    },
    search: '',
  },
};

export const WithPagination = {
  args: {
    universities: mockUniversities,
    pagination: {
      total: 45,
      pages: 5,
      current: 2,
    },
    search: '',
  },
};

export const Searching = {
  args: {
    universities: [mockUniversities[0]],
    pagination: {
      total: 1,
      pages: 1,
      current: 1,
    },
    search: 'Mumbai',
  },
};

export const Empty = {
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
    search: '',
  },
};

export const NoResults = {
  args: {
    universities: [],
    pagination: {
      total: 0,
      pages: 0,
      current: 0,
    },
    search: 'Something that does not exist',
  },
};
