import { SearchGapsView } from './search-gaps-view';

const meta = {
  title: 'Studio/Analytics/SearchGaps',
  component: SearchGapsView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gaps: {
      control: 'object',
      description: 'Array of search gap objects containing query and count',
      table: {
        type: {
          summary: 'array',
          detail: '[{ query: string, count: number }]',
        },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const mockGaps = [
  { query: 'Advanced Quantum Computing', count: 142 },
  { query: 'Bioinformatics 2025 Paper', count: 86 },
  { query: 'Ethical Hacking Mumbai University', count: 64 },
  { query: 'Machine Learning Semester 8', count: 42 },
];

export const Default = {
  args: {
    gaps: mockGaps,
    loading: false,
  },
};

export const Loading = {
  args: {
    gaps: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    gaps: [],
    loading: false,
  },
};
