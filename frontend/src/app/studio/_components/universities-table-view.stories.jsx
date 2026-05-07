import { UniversitiesTableView } from './universities-table-view';
import { fn } from '@storybook/test';

/**
 * The `UniversitiesTableView` component provides a tabular view of academic institutions.
 * It supports loading states, empty states, searching, and pagination.
 */
const meta = {
  title: 'Studio/Universities/UniversitiesTable',
  component: UniversitiesTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    universities: {
      control: 'object',
      description: 'Array of university objects to display',
      table: {
        type: {
          summary: 'array',
          detail:
            'Array<{ id: string, name: string, shortName: string, slug: string, logo?: string, state?: string, country?: string, websiteUrl?: string, isActive: boolean }>',
        },
        defaultValue: { summary: '[]' },
      },
    },
    pagination: {
      control: 'object',
      description: 'Pagination state object',
      table: {
        type: {
          summary: 'object',
          detail: '{ total: number, pages: number, current: number }',
        },
      },
    },
    onEdit: {
      action: 'onEdit',
      description: 'Callback when edit button is clicked',
      table: {
        type: { summary: '(university: object) => void' },
      },
    },
    onDelete: {
      action: 'onDelete',
      description: 'Callback when delete button is clicked',
      table: {
        type: { summary: '(university: object) => void' },
      },
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

export default meta;

const mockUniversities = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d1',
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
    id: '64f1a2b3c4d5e6f7a8b9c0d2',
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
    id: '64f1a2b3c4d5e6f7a8b9c0d3',
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
    id: '64f1a2b3c4d5e6f7a8b9c0d4',
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
    loading: false,
  },
};

export const Loading = {
  args: {
    universities: [],
    loading: true,
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
    loading: false,
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
    loading: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Mumbai',
        },
      },
    },
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
    loading: false,
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
    loading: false,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          search: 'Something that does not exist',
        },
      },
    },
  },
};
