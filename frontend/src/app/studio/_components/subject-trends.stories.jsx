import { SubjectTrendsView } from './subject-trends-view';

/**
 * The `SubjectTrendsView` component displays a list of top-performing academic subjects
 * based on weekly engagement and trend metrics.
 */
const meta = {
  title: 'Studio/Analytics/SubjectTrends',
  component: SubjectTrendsView,
  tags: ['autodocs'],
  argTypes: {
    subjects: {
      control: 'object',
      description: 'Array of trending subject objects',
      table: {
        type: {
          summary: 'array',
          detail:
            'Array<{ id: string, name: string, views: string, trend: string, status: "up" | "down" }>',
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

const mockSubjects = [
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d1',
    name: 'Data Structures and Algorithms',
    views: '12.4k',
    trend: '+14%',
    status: 'up',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d2',
    name: 'Operating Systems',
    views: '8.2k',
    trend: '+8%',
    status: 'up',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d3',
    name: 'Database Management Systems',
    views: '7.1k',
    trend: '-2%',
    status: 'down',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d4',
    name: 'Computer Networks',
    views: '6.5k',
    trend: '+12%',
    status: 'up',
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d5',
    name: 'Theory of Computation',
    views: '5.2k',
    trend: '+5%',
    status: 'up',
  },
];

export const Default = {
  args: {
    subjects: mockSubjects,
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
    loading: false,
  },
};
