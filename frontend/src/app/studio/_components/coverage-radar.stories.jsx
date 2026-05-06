import { CoverageRadarView } from './coverage-radar-view';

const meta = {
  title: 'Studio/Analytics/CoverageRadar',
  component: CoverageRadarView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'The data to display in the radar chart',
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

const mockData = [
  { subject: 'Data Structures', A: 120, fullMark: 150 },
  { subject: 'Algorithms', A: 98, fullMark: 150 },
  { subject: 'Operating Systems', A: 86, fullMark: 150 },
  { subject: 'Database Systems', A: 99, fullMark: 150 },
  { subject: 'Computer Networks', A: 85, fullMark: 150 },
  { subject: 'Software Engineering', A: 65, fullMark: 150 },
];

export const Default = {
  args: {
    data: mockData,
    loading: false,
  },
};

export const Loading = {
  args: {
    data: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    data: [],
    loading: false,
  },
};
